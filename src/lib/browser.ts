// src/lib/browser.ts
import type {
  DeviceInfo,
  LocationResult,
  NavigatorWithBattery,
  NavigatorWithStorage,
} from "../types";

export function detectBrowser(ua: string): string {
  const u = ua.toLowerCase();
  if (u.includes("edg/") || u.includes("edg ")) return "Microsoft Edge";
  if (u.includes("opera") || u.includes("opr/")) return "Opera";
  if (u.includes("chrome") && !u.includes("chromium") && !u.includes("edg"))
    return "Google Chrome";
  if (u.includes("safari") && !u.includes("chrome")) return "Safari";
  if (u.includes("firefox")) return "Firefox";
  if (u.includes("chromium")) return "Chromium";
  return "Unknown";
}

export function detectOS(ua: string): string {
  const u = ua.toLowerCase();
  if (u.includes("windows nt 10.0")) return "Windows 10/11";
  if (u.includes("windows nt 6.3")) return "Windows 8.1";
  if (u.includes("windows nt 6.2")) return "Windows 8";
  if (u.includes("windows nt 6.1")) return "Windows 7";
  if (u.includes("mac os x")) return "macOS";
  if (u.includes("android")) return "Android";
  if (u.includes("iphone") || u.includes("ipad") || u.includes("ipod"))
    return "iOS/iPadOS";
  if (u.includes("linux")) return "Linux";
  return "Unknown";
}

export function isMobileUA(ua: string): boolean {
  return /Mobi|Android|iPhone|iPad|iPod|Mobile/i.test(ua);
}

export function deviceTypeFromUA(ua: string): DeviceInfo["deviceType"] {
  const u = ua.toLowerCase();
  if (/ipad|tablet/.test(u)) return "tablet";
  if (/mobi|iphone|ipod|android/.test(u)) return "mobile";
  if (u) return "desktop";
  return "unknown";
}

export async function getPublicIP(): Promise<string | undefined> {
  try {
    const res = await fetch("https://api.ipify.org?format=json", {
      cache: "no-store",
    });
    const data: { ip?: string } = await res.json();
    return data?.ip;
  } catch {
    return undefined;
  }
}

export async function getBatteryInfo(): Promise<DeviceInfo["battery"]> {
  const nav = navigator as NavigatorWithBattery;
  if (!nav.getBattery) return { supported: false };
  try {
    const batt = await nav.getBattery();
    return {
      supported: true,
      charging: batt.charging,
      level: batt.level,
      chargingTime: batt.chargingTime,
      dischargingTime: batt.dischargingTime,
    };
  } catch {
    return { supported: false };
  }
}

export async function getIndexedDbEstimate(): Promise<
  DeviceInfo["storage"]["indexedDbEstimate"]
> {
  const nav = navigator as NavigatorWithStorage;
  if (!nav.storage?.estimate) return {};
  try {
    const est = await nav.storage.estimate();
    return { quota: est.quota, usage: est.usage };
  } catch {
    return {};
  }
}

export function getLocalStorageBytes(): number | null {
  try {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      const val = localStorage.getItem(key) ?? "";
      total += key.length + val.length;
    }
    return total;
  } catch {
    return null;
  }
}

export function getSessionStorageBytes(): number | null {
  try {
    let total = 0;
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (!key) continue;
      const val = sessionStorage.getItem(key) ?? "";
      total += key.length + val.length;
    }
    return total;
  } catch {
    return null;
  }
}

export function getPerformanceTiming():
  | DeviceInfo["navigation"]["performanceTiming"]
  | undefined {
  const entry = performance.getEntriesByType("navigation").at(0) as
    | PerformanceNavigationTiming
    | undefined;
  if (!entry) return undefined;
  return {
    startTime: Math.round(entry.startTime),
    domContentLoaded: Math.round(
      entry.domContentLoadedEventEnd - entry.startTime
    ),
    loadEventEnd: Math.round(entry.loadEventEnd - entry.startTime),
  };
}

export async function getLocation(): Promise<LocationResult> {
  try {
    if (!("geolocation" in navigator)) {
      return { granted: null, error: "Geolocation not supported" };
    }

    const result = await new Promise<LocationResult>((resolve) => {
      let resolved = false;
      const done = (value: LocationResult) => {
        if (!resolved) {
          resolved = true;
          resolve(value);
        }
      };

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          done({
            granted: true,
            coords: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              accuracy: pos.coords.accuracy,
            },
          });
        },
        (err) => {
          // Map well-known error codes
          const permDenied = err.code === err.PERMISSION_DENIED;
          const timeout = err.code === err.TIMEOUT;
          const posUnavailable = err.code === err.POSITION_UNAVAILABLE;

          let msg = err.message || "Location error";
          if (permDenied) msg = "Permission denied";
          else if (timeout) msg = "Location request timed out";
          else if (posUnavailable) msg = "Position unavailable";

          done({
            granted: permDenied ? false : null,
            error: msg,
          });
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: 12000, // give it a bit more time
        }
      );

      // Just in case something odd happens, enforce a cap
      setTimeout(() => {
        done({ granted: null, error: "Location request did not complete" });
      }, 20000);
    });

    return result;
  } catch {
    // If anything throws, return a well-formed result instead of throwing
    return { granted: null, error: "Unexpected error requesting location" };
  }
}
