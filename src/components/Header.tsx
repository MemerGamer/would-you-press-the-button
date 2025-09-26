import type { ReactNode } from "react"

type HeaderProps = {
    children: ReactNode
}

export function Header({ children }: HeaderProps) {
    return (
        <header className="sticky top-0 z-20 w-full">
            <div className="relative">
                <span
                    aria-hidden
                    className="
            pointer-events-none absolute inset-0 -z-10
            bg-[radial-gradient(60%_40%_at_50%_0%,rgba(16,185,129,0.15),transparent_60%)]
            opacity-60 blur-lg
          "
                />
                <div
                    className="
            w-full border-b border-white/10
            bg-neutral-900/50
            backdrop-blur-md
            shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
          "
                >
                    <span
                        aria-hidden
                        className="
              pointer-events-none absolute inset-x-0 top-0 h-px
              bg-white/10
            "
                    />
                    <div className="mx-auto max-w-4xl flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-4 py-4 md:px-6 md:py-6">
                        {children}
                    </div>
                </div>
            </div>
        </header>
    )
}