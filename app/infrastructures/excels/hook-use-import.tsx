import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar"
import type { typeImportDapodik } from "./detect-header-dapodik"
import type { SiswaType } from "~/types/siswa"
import type { SiswaTypeDapodik } from "~/types/siswa-dapodik"

export function useImportDapodik(){
    const { value } = useFilterContext()

    return (value.extra ?? {}) as typeImportDapodik<SiswaTypeDapodik>
}