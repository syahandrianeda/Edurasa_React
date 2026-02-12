import { createContext, useContext, useState } from "react"
import type { EditorFormatState, EditorSectionKey } from "./interface-toolbar-edtor"
import type { TypeComponent } from "./interface-title-description"
import type { FilterSumberData } from "./interface-filter-sumber-data"
import type { KeyModelTable, ThType } from "~/components/tabels/table-interface"
import type { OptionDesignTableToolbar } from "./interface-design-table"
import { useImmer } from "use-immer"
import { OptionsDesignTableDefaultProps } from "./data-opsi-header-custom"
import type { modeTampilanAbsenType } from "~/controllers/absensi-controllers/toolbar/mode-tampilan-absen-type"

// domain/filter/FilterContext.ts

/* =======================
 * TYPES
 * ======================= */

export type FilterContextValue<T = any> = {
  tahun?: number
  bulan?: Date
  mode?: "semester" | "tapel"
  // fitur kaldik
  sabtuLibur?:boolean
  isBottomKalendar?:boolean
  includingHariEfektif?:boolean
  kaldikSatuTahun?:boolean
  //fitur absen
  modeTampilanAbsen?: modeTampilanAbsenType
  // fitur lain
  extra?: Record<string, unknown>
  filterSumberData?: FilterSumberData[]
  dataFilterToolbar?: T[]

  // TABLE DESIGN
  draftOptionHeaderTable?: OptionDesignTableToolbar<T>[]
  desainFormatheader?: ThType<T>[]

  designKeyDataColumn?:KeyModelTable<T>[]

  additionalColumns?:{
    terpilih:boolean,
    jumlah:number
  }


  // EDITOR
  editorFormat?: EditorFormatState
  activeEditorKey?: EditorSectionKey
  activeJudulType?: TypeComponent
}

/**
 * API CONTEXT
 * - value + setValue (legacy, tetap dipakai)
 * - updater terfokus (best practice)
 */
export type FilterContextType<T = any> = {
  value: FilterContextValue<T>

  /** API LAMA — WAJIB DIPERTAHANKAN */
  setValue: (v: Partial<FilterContextValue<T>>) => void

  /** API BARU — DOMAIN-BASED */
  updateHeaderOptions: (
    updater: (draft: OptionDesignTableToolbar<T>[]) => void
  ) => void

  updateHeaderDesign: (
    updater: (draft: ThType<T>[]) => void
  ) => void

  updateKeyDataColum: (
    update: (draft:KeyModelTable<T>[])=>void
  )=>void
}

/* =======================
 * CONTEXT
 * ======================= */

const ToolbarFilterContext = createContext<FilterContextType<any> | null>(null)

/* =======================
 * PROVIDER
 * ======================= */ 

export function ToolbarFilterProvider<T>({
  children,
}: {
  children: React.ReactNode
}) {
  const [value, updateValue] = useImmer<FilterContextValue>({
  draftOptionHeaderTable: OptionsDesignTableDefaultProps,
  desainFormatheader: [],
  designKeyDataColumn: []
})

  /* -----------------------
   * API LAMA (STABLE)
   * ----------------------- */
  const setValue = (v: Partial<FilterContextValue<T>>) => {
    updateValue(draft => {
      Object.assign(draft, v)
    })
  }

  /* -----------------------
   * HELPER INTERNAL
   * ----------------------- */
  const updateDraftArray = <K extends keyof FilterContextValue<T>>(
    key: K,
    initializer: () => NonNullable<FilterContextValue<T>[K]>,
    updater: (draft: NonNullable<FilterContextValue<T>[K]>) => void
  ) => {
    updateValue(draft => {
      if (!draft[key]) {
        draft[key] = initializer() as any
      }
      updater(draft[key] as any)//as any)
    })
  }

  /* -----------------------
   * API BARU (DOMAIN-BASED)
   * ----------------------- */

  const updateHeaderOptions = (
    updater: (draft: OptionDesignTableToolbar<T>[]) => void
  ) =>
    updateDraftArray(
      "draftOptionHeaderTable",
      () => [],
      updater
    )

  const updateHeaderDesign = (
    updater: (draft: ThType<T>[]) => void
  ) =>
    updateDraftArray(
      "desainFormatheader",
      () => [],
      updater
    )
  const updateKeyDataColum = (
    updater: (draft: KeyModelTable<T>[]) => void
  ) =>
    updateDraftArray(
      "designKeyDataColumn",
      () => [],
      updater
    )

  return (
    <ToolbarFilterContext.Provider
      value={{
        value,
        setValue,
        updateHeaderOptions,
        updateHeaderDesign,
        updateKeyDataColum
      }}
    >
      {children}
    </ToolbarFilterContext.Provider>
  )
}

/* =======================
 * HOOK
 * ======================= */

export function useFilterContext<T =any>() {
  const ctx = useContext(ToolbarFilterContext)
  if (!ctx) {
    throw new Error("useFilterContext must be inside ToolbarFilterProvider")
  }
  return ctx as FilterContextType<T>;
}

