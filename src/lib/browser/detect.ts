// src/lib/browser/detect.ts
import { getDynamicTranslation } from "../i18n";

export function deviceTypeFromUA(ua: string): string {
  // iOS detection
  if (/ipad|iphone|ipod/i.test(ua)) {
    return getDynamicTranslation("deviceTypes.ios", "iOS Device");
  }

  // Android detection
  if (/android/i.test(ua)) {
    return getDynamicTranslation("deviceTypes.android", "Android Device");
  }

  // Windows Phone detection
  if (/windows phone/i.test(ua)) {
    return getDynamicTranslation("deviceTypes.windowsPhone", "Windows Phone");
  }

  // Tablet detection
  if (/tablet|ipad/i.test(ua)) {
    return getDynamicTranslation("deviceTypes.tablet", "Tablet");
  }

  // Mobile detection
  if (/mobile/i.test(ua)) {
    return getDynamicTranslation("deviceTypes.mobile", "Mobile Device");
  }

  // Desktop is default
  return getDynamicTranslation("deviceTypes.desktop", "Desktop Computer");
}

export function detectOS(ua: string): string {
  // Windows
  if (/windows nt 10/i.test(ua))
    return getDynamicTranslation("os.windows.10", "Windows 10");
  if (/windows nt 6.3/i.test(ua))
    return getDynamicTranslation("os.windows.8_1", "Windows 8.1");
  if (/windows nt 6.2/i.test(ua))
    return getDynamicTranslation("os.windows.8", "Windows 8");
  if (/windows nt 6.1/i.test(ua))
    return getDynamicTranslation("os.windows.7", "Windows 7");
  if (/windows nt 6.0/i.test(ua))
    return getDynamicTranslation("os.windows.vista", "Windows Vista");
  if (/windows nt 5.1/i.test(ua))
    return getDynamicTranslation("os.windows.xp", "Windows XP");
  if (/windows/i.test(ua))
    return getDynamicTranslation("os.windows.generic", "Windows");

  // macOS
  if (/mac os x/i.test(ua)) {
    const version = ua.match(/mac os x (\d+)[._](\d+)/i);
    if (version) {
      return getDynamicTranslation(
        "os.macos.version",
        `macOS ${version[1]}.${version[2]}`
      );
    }
    return getDynamicTranslation("os.macos.generic", "macOS");
  }

  // Linux
  if (/linux/i.test(ua)) return getDynamicTranslation("os.linux", "Linux");

  // iOS
  if (/iphone|ipad|ipod/i.test(ua)) {
    const version = ua.match(/os (\d+)[._](\d+)/i);
    if (version) {
      return getDynamicTranslation(
        "os.ios.version",
        `iOS ${version[1]}.${version[2]}`
      );
    }
    return getDynamicTranslation("os.ios.generic", "iOS");
  }

  // Android
  if (/android/i.test(ua)) {
    const version = ua.match(/android (\d+([._]\d+)?)/i);
    if (version) {
      return getDynamicTranslation(
        "os.android.version",
        `Android ${version[1].replace("_", ".")}`
      );
    }
    return getDynamicTranslation("os.android.generic", "Android");
  }

  return getDynamicTranslation("os.unknown", "Unknown OS");
}

export function detectBrowser(ua: string): string {
  // Chrome
  if (/chrome|chromium/i.test(ua) && !/edg|opr/i.test(ua)) {
    return getDynamicTranslation("browser.chrome", "Chrome");
  }

  // Firefox
  if (/firefox|fxios/i.test(ua)) {
    return getDynamicTranslation("browser.firefox", "Firefox");
  }

  // Safari
  if (/safari/i.test(ua) && !/chrome|chromium|edg|opr/i.test(ua)) {
    return getDynamicTranslation("browser.safari", "Safari");
  }

  // Edge
  if (/edg/i.test(ua)) {
    return getDynamicTranslation("browser.edge", "Edge");
  }

  // Opera
  if (/opr/i.test(ua)) {
    return getDynamicTranslation("browser.opera", "Opera");
  }

  return getDynamicTranslation("browser.unknown", "Unknown Browser");
}

// Mobile detection helper
export function isMobileUA(ua: string): boolean {
  return /mobile|iphone|ipad|android/i.test(ua);
}
