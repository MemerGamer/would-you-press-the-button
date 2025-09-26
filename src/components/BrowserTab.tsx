import { useTranslation } from "react-i18next"
import type { DeviceInfo } from "../types"
import { Row } from "./Row"
import { Code } from "./Code"

type Props = {
  info: DeviceInfo
  pretty: (v: unknown) => string
}

export function BrowserTab({ info, pretty }: Props) {
  const { t } = useTranslation()
  return (
    <div>
      <Row label={t("labels.browserName")} value={info.browserName} />
      <Row
        label={t("labels.userAgent")}
        value={<span className="break-all">{info.userAgent}</span>}
      />
      <Row
        label={t("labels.vendor")}
        value={String(info.vendor ?? t("values.unknown"))}
      />
      <Row
        label={t("labels.platform")}
        value={info.platform ?? t("values.unknown")}
      />
      <Row
        label={t("labels.languages")}
        value={
          info.languages?.join(", ") ||
          info.language ||
          t("values.unknown")
        }
      />
      <Row label={t("labels.doNotTrack")} value={String(info.doNotTrack)} />
      <Row label={t("labels.webDriver")} value={String(info.webdriver)} />
      <Row
        label={t("labels.performance")}
        value={
          info.navigation.performanceTiming ? (
            <Code>{pretty(info.navigation.performanceTiming)}</Code>
          ) : (
            t("values.unavailable")
          )
        }
      />
    </div>
  )
}