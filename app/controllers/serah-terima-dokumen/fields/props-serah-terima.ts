import type { Updater } from "node_modules/use-immer/dist/index.mjs"
import type { SerahTerimaDokumenAppType } from "~/types/galleries/serah-terima-dokumen-app-type"

export type StringProps={
    value:string,
    setValue:(v:string)=>void
}

export type handleProps = {
    value:SerahTerimaDokumenAppType,
    setValue : Updater<SerahTerimaDokumenAppType>
    disabled?:boolean
    
}