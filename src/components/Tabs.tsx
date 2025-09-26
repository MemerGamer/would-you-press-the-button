import type { TabKey } from "../types"

type TabsProps = {
  tabs: { key: TabKey; label: string }[]
  activeKey: TabKey
  onSelect: (key: TabKey) => void
}

export function Tabs({ tabs, activeKey, onSelect }: TabsProps) {
  return (
    <div className="-mx-2 px-2 md:mx-0 md:px-0 flex gap-2 overflow-x-auto border-b border-neutral-800 pb-2">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onSelect(t.key)}
          className={
            "shrink-0 rounded-full px-4 py-2 text-sm md:text-base " +
            (activeKey === t.key
              ? "bg-neutral-800 text-white"
              : "text-neutral-200 bg-neutral-800/30 hover:bg-neutral-800/50")
          }
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}