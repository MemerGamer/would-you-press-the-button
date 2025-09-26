import { useTranslation } from "react-i18next"
import type { DeviceInfo } from "../types"
import { Row } from "./Row"

type Props = { info: DeviceInfo }

export function DeviceTab({ info }: Props) {
  const { t } = useTranslation()
  return (
    <div>
      <Row label={t("labels.os")} value={info.osName} />
      <Row
        label={t("labels.type")}
        value={
          <>
            {info.deviceType}{" "}
            {info.isMobile ? t("values.mobileDetected") : ""}
          </>
        }
      />
      <Row
        label={t("labels.cores")}
        value={info.hardwareConcurrency ?? t("values.unknown")}
      />
      <Row
        label={t("labels.deviceMemory")}
        value={info.deviceMemory ?? t("values.unknown")}
      />
      <Row
        label={t("labels.screen")}
        value={
          <>
            {info.screen.width}×{info.screen.height} (avail{" "}
            {info.screen.availWidth}×{info.screen.availHeight}), color depth{" "}
            {info.screen.colorDepth}, DPR {info.screen.pixelRatio}
          </>
        }
      />
      <Row
        label={t("labels.viewport")}
        value={`${info.screen.viewportWidth}×${info.screen.viewportHeight}`}
      />
      <Row
        label={t("labels.battery")}
        value={
          info.battery?.supported
            ? `Level: ${Math.round((info.battery.level ?? 0) * 100)}% | Charging: ${
                info.battery.charging ? t("values.yes") : t("values.no")
              }`
            : t("values.notSupported")
        }
      />
      <Row
        label={t("labels.timezone")}
        value={`${info.time.timezone} (offset ${info.time.timezoneOffsetMinutes} min)`}
      />
      <Row
        label={t("labels.userActivation")}
        value={
          info.navigation.userActivation
            ? t("values.active")
            : t("values.inactiveUnknown")
        }
      />
    </div>
  )
}