import { useTranslation } from "react-i18next"
import type { DeviceInfo } from "../types"
import { Row } from "./Row"

type Props = { info: DeviceInfo }

export function StorageTab({ info }: Props) {
  const { t } = useTranslation()
  return (
    <div>
      <Row
        label={t("labels.cookiesEnabled")}
        value={info.storage.cookiesEnabled ? t("values.yes") : t("values.no")}
      />
      <Row
        label={t("labels.localStorageSize")}
        value={info.storage.localStorageBytes ?? t("values.unknown")}
      />
      <Row
        label={t("labels.sessionStorageSize")}
        value={info.storage.sessionStorageBytes ?? t("values.unknown")}
      />
      <Row
        label={t("labels.indexedDbEstimate")}
        value={
          info.storage.indexedDbEstimate?.usage != null ||
          info.storage.indexedDbEstimate?.quota != null ? (
            <div>
              usage: {info.storage.indexedDbEstimate?.usage ?? "?"} | quota:{" "}
              {info.storage.indexedDbEstimate?.quota ?? "?"}
            </div>
          ) : (
            t("values.unavailable")
          )
        }
      />
      <p className="mt-2 text-sm text-neutral-400">{t("storage.note")}</p>
    </div>
  )
}