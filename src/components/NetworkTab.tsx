import { useTranslation } from "react-i18next"
import type { DeviceInfo } from "../types"
import { Row } from "./Row"

type Props = { info: DeviceInfo }

export function NetworkTab({ info }: Props) {
    const { t } = useTranslation()
    return (
        <div>
            <Row
                label={t("labels.online")}
                value={info.network.online ? t("values.yes") : t("values.no")}
            />
            <Row
                label={t("labels.effectiveType")}
                value={info.network.effectiveType ?? t("values.unknown")}
            />
            < Row
                label={t("labels.downlink")}
                value={info.network.downlinkMbps ?? t("values.unknown")}
            />
            <Row label={t("labels.rtt")} value={info.network.rttMs ?? t("values.unknown")} />
            <Row
                label={t("labels.saveData")}
                value={String(info.network.saveData ?? t("values.unknown"))}
            />
            <Row
                label={t("labels.publicIp")}
                value={info.network.ip ?? t("values.unavailable")}
            />
            <Row
                label={t("labels.referrer")}
                value={info.navigation.referrer || t("values.none")}
            />
            <Row label={t("labels.currentUrl")} value={info.navigation.url} />
        </div>
    )
}