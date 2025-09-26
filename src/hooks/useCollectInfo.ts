// src/hooks/useCollectInfo.ts
import { useQuery } from "@tanstack/react-query";
import type {
  DeviceInfo,
  NavigatorWithConnection,
  NavigatorWithUserActivation,
} from "../types";
import {
  detectBrowser,
  detectOS,
  isMobileUA,
  deviceTypeFromUA,
  getPublicIP,
  getBatteryInfo,
  getIndexedDbEstimate,
  getLocalStorageBytes,
  getSessionStorageBytes,
  getPerformanceTiming,
} from "../lib/browser";

function asConnection(nav: Navigator): NavigatorWithConnection["connection"] {
  return (nav as NavigatorWithConnection).connection ?? {};
}

function userActivation(nav: Navigator): boolean | undefined {
  return (nav as NavigatorWithUserActivation).userActivation?.isActive;
}

async function collectInfo(): Promise<DeviceInfo> {
  const ua = navigator.userAgent || "";
  const browserName = detectBrowser(ua);
  const osName = detectOS(ua);
  const isMobile = isMobileUA(ua);
  const deviceType = deviceTypeFromUA(ua);

  const [ip, battery, indexedDbEstimate] = await Promise.all([
    getPublicIP(),
    getBatteryInfo(),
    getIndexedDbEstimate(),
  ]);

  const conn = asConnection(navigator);
  const perf = getPerformanceTiming();

  return {
    userAgent: ua,
    platform: navigator.platform || null,
    language: navigator.language || null,
    languages: navigator.languages || null,
    doNotTrack:
      ((navigator as unknown as { doNotTrack?: string }).doNotTrack ??
        (window as unknown as { doNotTrack?: string }).doNotTrack ??
        (navigator as unknown as { msDoNotTrack?: string }).msDoNotTrack ??
        null) ||
      null,
    online: navigator.onLine,
    vendor:
      (navigator as unknown as { vendor?: string }).vendor !== undefined
        ? (navigator as unknown as { vendor?: string }).vendor!
        : null,
    webdriver:
      (navigator as unknown as { webdriver?: boolean }).webdriver !== undefined
        ? (navigator as unknown as { webdriver?: boolean }).webdriver!
        : null,
    deviceMemory:
      (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? null,
    hardwareConcurrency: navigator.hardwareConcurrency ?? null,

    browserName,
    osName,
    isMobile,
    deviceType,

    screen: {
      width: window.screen.width,
      height: window.screen.height,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
      colorDepth: window.screen.colorDepth,
      pixelRatio: window.devicePixelRatio || 1,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
    },

    time: {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffsetMinutes: new Date().getTimezoneOffset(),
    },

    // Neutral location block (no prompt)
    location: {
      granted: null,
      coords: { latitude: null, longitude: null, accuracy: null },
      error: undefined,
    },

    network: {
      online: navigator.onLine,
      effectiveType: conn?.effectiveType,
      downlinkMbps: conn?.downlink,
      rttMs: conn?.rtt,
      saveData: conn?.saveData,
      ip,
    },

    battery,

    storage: {
      cookiesEnabled: navigator.cookieEnabled,
      localStorageBytes: getLocalStorageBytes(),
      sessionStorageBytes: getSessionStorageBytes(),
      indexedDbEstimate,
    },

    navigation: {
      referrer: document.referrer,
      url: location.href,
      userActivation: userActivation(navigator),
      performanceTiming: perf,
    },
  };
}

export function useCollectInfo() {
  return useQuery({
    queryKey: ["collect-info"],
    queryFn: collectInfo,
    enabled: false,
    staleTime: Infinity,
    gcTime: 0,
    retry: false,
  });
}
