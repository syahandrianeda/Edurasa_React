import { useState } from "react"
import { parseRoot } from "../parser/root-parser"
import { mapToDocx } from "../mapper/map-to-docx"
import { exportDocx } from "./docx-exporter"
// import { parseRoot } from "../infrastructure/parser/parseRoot"
// import { mapToDocx } from "../infrastructure/mapper/mapToDocx"
// import { exportDocx } from "../infrastructure/DocxExporter"

type UseWordExportOptions = {
    fileName?: string
    beforeExport?: () => Promise<void> | void
    afterExport?: () => void
    type:'portrait'|'landscape'
}

export function useWordExport(options: UseWordExportOptions) {
    const [isExporting, setIsExporting] = useState(false)

    const exportWord = async (element: HTMLElement | null) => {
        if (!element) return

        try {
        setIsExporting(true)

        // optional: force print mode
        if (options?.beforeExport) {
            await options.beforeExport()
        }

        // kecilkan delay agar DOM settle
        await new Promise(resolve => setTimeout(resolve, 50))

        const parsed = await parseRoot(element);
        console.log('parsed Roote', parsed);
        const doc = await mapToDocx(parsed, options.type)

        await exportDocx(doc, options?.fileName ?? "document.docx")

        options?.afterExport?.()
        } finally {
        setIsExporting(false)
        }
    }

    return {
        exportWord,
        isExporting
    }
}
