import { useMemo, useState } from "react"
import type { TabKey } from "./types"
import { useCollectInfo } from "./hooks/useCollectInfo"
import { useTranslation } from "react-i18next"
import "./i18n/config"
import { LanguageSwitcher } from "./components/LanguageSwitcher"
import { Overview } from "./components/Overview"
import { Disclaimer } from "./components/Disclaimer"

import { Header } from "./components/Header"
import { Tabs } from "./components/Tabs"
import { BrowserTab } from "./components/BrowserTab"
import { DeviceTab } from "./components/DeviceTab"
import { NetworkTab } from "./components/NetworkTab"
import { StorageTab } from "./components/StorageTab"
import { LocationTab } from "./components/LocationTab"
import { Footer } from "./components/Footer"

export default function App() {
  const [tab, setTab] = useState<TabKey>("overview")
  const { data: info, isFetching, refetch } = useCollectInfo()
  const { t } = useTranslation()

  const tabs = useMemo((): { key: TabKey; label: string }[] => {
    return [
      { key: "overview", label: t("tabs.overview") },
      { key: "browser", label: t("tabs.browser") },
      { key: "device", label: t("tabs.device") },
      { key: "network", label: t("tabs.network") },
      { key: "storage", label: t("tabs.storage") },
      { key: "location", label: t("tabs.location") },
    ]
  }, [t])

  const pretty = (v: unknown) => JSON.stringify(v, null, 2)

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100">
      <Header>
        <div>
          <h1 className="text-2xl md:text-5xl font-bold tracking-tight">
            {t("title")}
          </h1>
          <p className="mt-2 text-neutral-300">{t("subtitle")}</p>
        </div>
        <div className="mt-2 md:mt-0 flex justify-end">
          <LanguageSwitcher />
        </div>
      </Header>

      <main className="flex-1 w-full">
        <div className="mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-10">
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4 md:p-6 relative">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="w-full flex justify-center sm:w-auto">
                <button
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className="relative inline-flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span
                    aria-hidden
                    className="
                      absolute inset-0 rounded-xl
                      bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400
                      opacity-60 blur-lg transition-all duration-1000
                      group-hover:opacity-100 group-hover:duration-200
                    "
                  />
                  <span
                    aria-hidden
                    className="
                      absolute inset-0 rounded-xl
                      bg-gray-900/80
                      backdrop-blur-md
                      ring-1 ring-white/10
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
                    "
                  />
                  <span
                    className="
                      relative inline-flex items-center justify-center
                      rounded-xl px-6 py-2.5
                      text-sm md:text-base font-semibold
                      text-white
                      transition-all duration-200
                      hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-600/30
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20
                    "
                  >
                    <span
                      aria-hidden
                      className="
                        pointer-events-none absolute inset-0 rounded-xl
                        bg-gradient-to-b from-white/10 to-transparent
                        mix-blend-overlay
                      "
                    />
                    {isFetching ? t("button.collecting") : t("button.press")}
                  </span>
                </button>
              </div>
              <p className="text-center sm:text-left text-xs md:text-sm text-neutral-400">
                {t("description")}
              </p>
            </div>

            {info && (
              <div className="mt-4 border-t border-neutral-800/60 pt-4 md:mt-5 md:pt-5">
                <Tabs
                  tabs={tabs}
                  activeKey={tab}
                  onSelect={setTab}
                />
                <div className="mt-5 md:mt-6">
                  {tab === "overview" && (
                    <Overview info={info} pretty={(v) => JSON.stringify(v, null, 2)} />
                  )}
                  {tab === "browser" && (
                    <BrowserTab info={info} pretty={pretty} />
                  )}
                  {tab === "device" && <DeviceTab info={info} />}
                  {tab === "network" && <NetworkTab info={info} />}
                  {tab === "storage" && <StorageTab info={info} />}
                  {tab === "location" && <LocationTab info={info} />}
                </div>
              </div>
            )}
          </div>
          <Disclaimer />
        </div>
      </main>

      <Footer />
    </div>
  )
}