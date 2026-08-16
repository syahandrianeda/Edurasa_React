import type { SerahTerimaDokumenAppType } from "~/types/galleries/serah-terima-dokumen-app-type";
import type { TransaksiSerahTerimaDokumenAppType } from "~/types/galleries/transaksi-serah-terima-dokumen";
import type { TransaksiEventType } from "./transaksi-event-type";

export interface SerahTerimaWithTransaksi extends SerahTerimaDokumenAppType{
    transaksi:TransaksiSerahTerimaDokumenAppType[]
    transaksiEvent:TransaksiEventType[]
}

export interface OrmSerahTerimaTransaksiInterface{
    readonly SerahTerima:SerahTerimaDokumenAppType[];
    readonly Transaksi:TransaksiSerahTerimaDokumenAppType[];
    // data:SerahTerimaWithTransaksi[]
    build:()=>void
}