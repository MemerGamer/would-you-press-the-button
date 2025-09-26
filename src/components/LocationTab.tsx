
import { useTranslation } from "react-i18next"
import type { DeviceInfo } from "../types"
import { Row } from "./Row"
import { useLocation } from "../hooks/useLocation"

type Props = { info: DeviceInfo }

export function LocationTab({ info }: Props) {
  const { t } = useTranslation()
  const base = info.location
  const { data: locLive, isFetching, refetch, error } = useLocation()

  const effective = locLive
    ? locLive.granted === true
      ? {
          granted: true,
          coords: {
            latitude: locLive.coords?.latitude ?? null,
            longitude: locLive.coords?.longitude ?? null,
            accuracy: locLive.coords?.accuracy ?? null,
          },
          error: locLive.error,
        }
      : locLive.granted === false
      ? {
          granted: false,
          coords: { latitude: null, longitude: null, accuracy: null },
          error: locLive.error,
        }
      : {
          granted: null,
          coords: { latitude: null, longitude: null, accuracy: null },
          error: locLive.error,
        }
    : base

  const topError =
    error instanceof Error
      ? error.message
      : typeof error === "string"
      ? error
      : undefined

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="rounded-md bg-sky-500 px-4 py-2 text-sm md:text-base font-semibold text-neutral-900 hover:bg-sky-400 disabled:opacity-60"
        >
          {isFetching ? t("location.requesting") : t("location.requestButton")}
        </button>
        <span className="text-xs md:text-sm text-neutral-400">
          {t("location.onlyOnRequest")}
        </span>
      </div>

      {!window.isSecureContext && (
        <div className="text-xs text-amber-400">{t("location.httpsWarning")}</div>
      )}

      {effective.error === "Position unavailable" && (
        <div className="text-xs text-amber-400">{t("location.accuracyTip")}</div>
      )}

      {topError && <div className="text-xs text-red-400">Error: {topError}</div>}

      <Row
        label={t("labels.permission")}
        value={
          effective.granted == null
            ? t("location.permission.notRequested")
            : effective.granted
            ? t("location.permission.granted")
            : t("location.permission.denied")
        }
      />
      <Row
        label={t("labels.coordinates")}
        value={
          effective.coords.latitude != null &&
          effective.coords.longitude != null ? (
            <div>
              lat: {effective.coords.latitude}, lon: {effective.coords.longitude} (±
              {effective.coords.accuracy} m)
            </div>
          ) : (
            effective.error || t("values.unavailable")
          )
        }
      />
      <p className="mt-2 text-sm text-neutral-400">
        {t("location.onlyWithPermission")}
      </p>
    </div>
  )
}