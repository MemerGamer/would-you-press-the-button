export function Footer() {
    return (
        <footer className="relative w-full">
            <span
                aria-hidden
                className="
            pointer-events-none absolute inset-0 -z-10
            bg-[radial-gradient(70%_50%_at_50%_100%,rgba(16,185,129,0.12),transparent_60%)]
            opacity-60 blur-xl
          "
            />
            <div
                className="
            border-t border-white/10
            bg-neutral-900/50
            backdrop-blur-md
            shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
            py-6 text-center text-neutral-300 text-xs md:text-sm
          "
            >
                © {new Date().getFullYear()} Kovács Bálint Hunor. All rights reserved.
                <a
                    href="https://www.kovacsbalinthunor.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-neutral-100 ml-1 transition-colors"
                >
                    www.kovacsbalinthunor.com
                </a>
            </div>
        </footer>
    )
}