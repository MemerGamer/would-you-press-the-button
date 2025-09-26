import type { RowProps } from "../types"

export function Row({ label, value }: RowProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3 border-b border-neutral-800/80">
            <div className="text-neutral-400 text-sm sm:text-base">{label}</div>
            <div className="sm:col-span-2 text-sm sm:text-base">{value}</div>
        </div>
    )
}