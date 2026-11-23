import type { ReactNode } from "node_modules/@types/react"

type DetailCompProps={
    titleSummary: string,
    children:ReactNode
}
export default function DetailComp({titleSummary, children}:DetailCompProps){
    return (
        <details
            className="group rounded-md border bg-slate-100"
            title="Klik untuk membuka/menutup informasi selengkapnya"
        >
            <summary className="flex cursor-pointer list-none items-center gap-3 p-3 [&::-webkit-details-marker]:hidden">
                <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-sky-300/50 text-xs font-semibold">
                    
                </span>

                <span className="flex-1 text-xs font-medium">
                    {
                        titleSummary
                    }
                </span>

                <span
                    aria-hidden="true"
                    className="text-muted-foreground transition-transform group-open:rotate-180"
                >
                    🔽
                </span>
            </summary>

            <div className="space-y-2 border-t px-2 py-3 text-sm leading-3 text-muted-foreground bg-white dark:text-black">
                {
                    children
                }
            </div>
        </details>
        )
}