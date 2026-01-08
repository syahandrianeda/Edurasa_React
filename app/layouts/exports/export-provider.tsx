import * as React from 'react'
import { useReactToPrint } from 'react-to-print'
import { useExportTarget } from './export-target-provider'

type Orientation = 'portrait' | 'landscape'

type ExportContextValue = {
  print: (orientation: Orientation) => void
}

const ExportContext = React.createContext<ExportContextValue | null>(null)

export function ExportProvider({ children }: { children: React.ReactNode }) {
  const { getTarget } = useExportTarget()

  const printRef = React.useRef<HTMLElement | null>(null)
  const orientationRef = React.useRef<Orientation>('portrait')

  const date = new Date().toLocaleDateString('id-ID')
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Dokumen (${orientationRef.current}) - ${date}`
    ,
    pageStyle:`
      @page {
        size: ${orientationRef.current};
        margin: 16px;
      }
    `,
  })

  const print = React.useCallback(
    (orientation: Orientation) => {
      const target = getTarget('print-area')
      if (!target) return

      orientationRef.current = orientation
      printRef.current = target

      // ⚠️ penting: trigger setelah ref updated
      requestAnimationFrame(() => {
        handlePrint()
      })
    },
    [getTarget, handlePrint]
  )

  return (
    <ExportContext.Provider value={{ print }}>
      {children}
    </ExportContext.Provider>
  )
}

export function useExport() {
  const ctx = React.useContext(ExportContext)
  if (!ctx) throw new Error('useExport must be used inside ExportProvider')
  return ctx
}
