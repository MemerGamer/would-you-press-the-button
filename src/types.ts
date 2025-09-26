export type RowBaseProps = { label: string };
export type RowProps = RowBaseProps & { value: React.ReactNode };
export type PrettyFn = (v: unknown) => string;
export type DeviceInfo = {
  userAgent: string;
  platform: string | null;
  language: string | null;
  languages: readonly string[] | null; // note: readonly to match Navigator.languages
  doNotTrack: string | null;
  online: boolean;
  vendor: string | null;
  webdriver: boolean | null;
  deviceMemory: number | null;
  hardwareConcurrency: number | null;

  browserName: string;
  osName: string;
  isMobile: boolean;
  deviceType: "mobile" | "tablet" | "desktop" | "unknown";

  screen: {
    width: number;
    height: number;
    availWidth: number;
    availHeight: number;
    colorDepth: number;
    pixelRatio: number;
    viewportWidth: number;
    viewportHeight: number;
  };

  time: {
    timezone: string;
    timezoneOffsetMinutes: number;
  };

  location: {
    granted: boolean | null;
    coords: {
      latitude: number | null;
      longitude: number | null;
      accuracy: number | null;
    };
    error?: string;
  };

  network: {
    online: boolean;
    effectiveType?: string;
    downlinkMbps?: number;
    rttMs?: number;
    saveData?: boolean;
    ip?: string;
  };

  battery?: {
    supported: boolean;
    charging?: boolean;
    level?: number;
    chargingTime?: number;
    dischargingTime?: number;
  };

  storage: {
    cookiesEnabled: boolean;
    localStorageBytes: number | null;
    sessionStorageBytes: number | null;
    indexedDbEstimate?: {
      quota?: number;
      usage?: number;
    };
  };

  navigation: {
    referrer: string;
    url: string;
    userActivation?: boolean;
    performanceTiming?: {
      startTime?: number;
      domContentLoaded?: number;
      loadEventEnd?: number;
    };
  };
};

export type TabKey =
  | "overview"
  | "browser"
  | "device"
  | "network"
  | "storage"
  | "location";

export type LocationResult =
  | {
      granted: true | false;
      coords?: { latitude: number; longitude: number; accuracy: number };
      error?: string;
    }
  | { granted: null; error?: string };

// Optional: typed Navigator augments we will use elsewhere to avoid "any"
export type NavigatorWithBattery = Navigator & {
  getBattery?: () => Promise<{
    charging: boolean;
    level: number;
    chargingTime: number;
    dischargingTime: number;
  }>;
};

export type NavigatorWithStorage = Navigator & {
  storage?: {
    estimate?: () => Promise<{ quota?: number; usage?: number }>;
  };
};

export type NavigatorWithConnection = Navigator & {
  connection?: {
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
  };
};

export type NavigatorWithUserActivation = Navigator & {
  userActivation?: { isActive?: boolean };
};
