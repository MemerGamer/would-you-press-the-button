import { useTranslation } from "react-i18next";
import type { DeviceInfo } from "../types";
import { Code } from "./Code";
import { Row } from "./Row";

export function Overview({
    info,
    pretty,
}: {
    info: DeviceInfo
    pretty: (v: unknown) => string
}) {
    const { t } = useTranslation()

    return (
        <div className="relative rounded-xl border border-white/10 bg-neutral-900/40 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            {/* Under-glow (subtle) */}
            <span
                aria-hidden
                className="
          pointer-events-none absolute inset-0 -z-10
          bg-[radial-gradient(70%_60%_at_10%_0%,rgba(99,102,241,0.10),transparent_60%),radial-gradient(60%_50%_at_90%_100%,rgba(16,185,129,0.10),transparent_60%)]
          blur-lg
        "
            />

            {/* Top sheen */}
            <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10"
            />

            <div className="p-4 md:p-6">
                <Row
                    label={t('labels.browser')}
                    value={
                        <span>
                            {info.browserName} — UA:{' '}
                            <span className="break-all text-neutral-300">{info.userAgent}</span>
                        </span>
                    }
                />
                <Row label={t('labels.os')} value={info.osName} />
                <Row
                    label={t('labels.deviceType')}
                    value={
                        <>
                            {info.deviceType} {info.isMobile ? t('values.mobileDetected') : ''}
                        </>
                    }
                />
                <Row label={t('labels.publicIp')} value={info.network.ip ?? t('values.unavailable')} />
                <Row label={t('labels.timezone')} value={info.time.timezone} />
                <Row label={t('labels.referrer')} value={info.navigation.referrer || t('values.none')} />
                <Row label={t('labels.currentUrl')} value={info.navigation.url} />
                <Row
                    label={t('labels.online')}
                    value={
                        <>
                            {info.online ? t('values.online') : t('values.offline')}{' '}
                            {info.network.effectiveType ? `(${info.network.effectiveType})` : ''}
                        </>
                    }
                />
                <Row
                    label={t('labels.screenViewport')}
                    value={`${info.screen.width}×${info.screen.height} px screen, viewport ${info.screen.viewportWidth}×${info.screen.viewportHeight} @ DPR ${info.screen.pixelRatio}`}
                />
                <Row
                    label={t('labels.storageSnapshot')}
                    value={`LocalStorage ≈ ${info.storage.localStorageBytes ?? 0} bytes, SessionStorage ≈ ${info.storage.sessionStorageBytes ?? 0
                        } bytes, IndexedDB usage/quota ≈ ${info.storage.indexedDbEstimate?.usage ?? '?'
                        }/${info.storage.indexedDbEstimate?.quota ?? '?'}`}
                />

                <details className="mt-4 group">
                    <summary
                        className="
              inline-flex cursor-pointer select-none items-center gap-2 rounded-lg
              border border-white/10 bg-white/5 px-3 py-2 text-neutral-200
              transition-all duration-200 hover:bg-white/10 hover:text-white
              [list-style:none]
            "
                    >
                        <span className="i-lucide:code-2 h-4 w-4 opacity-70 group-open:rotate-90 transition-transform" />
                        {t('labels.rawData')}
                    </summary>
                    <div className="mt-3 rounded-lg border border-white/10 bg-black/30 p-3 backdrop-blur-sm">
                        <Code>{pretty(info)}</Code>
                    </div>
                </details>
            </div>
        </div>
    )
}