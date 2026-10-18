import type { ValidatedResponseSiswa } from "~/types/penilaian/rekap_sementara_sheet_type"
import type { JenisTagihanPenilaiantype } from "../asesmen-penilaian/jenis-tagihan-type";

export interface DetailSkorKdSource{
    skorDecision: number|null,
    keySkorKd: string,
    fromSource: 'respon'|'sheet'
    isSameValueBothResource:boolean;
    skorRespon: number|null;
    skorSheet: number|null

}
export interface DataSkorTemplateImport{
    [key:string]: number|null
}
export interface TemplateImportSkorToKd {
    siswa_id:number,
    nama_siswa: string,
    rombel: string,
    hasRespon:number,
    key:string[],
    dataSkorTemplateImport: DataSkorTemplateImport
    detailSkor:DetailSkorKdSource[]
    dataSkorDecision:DataSkorTemplateImport,
    jenisTagihan:JenisTagihanPenilaiantype['kode'],
    publikasi_id:number
}

export type DataUIFormatImportType = {
    index: number,
    siswa_id:number,
    nama_siswa: string,
    rombel: string,
    [key:string]: number | string

}
export interface DataUiTemplateImportSkorToKd {
    data: TemplateImportSkorToKd[],
    headerUi: KeyLabelTemplateImport[]
}

export interface KeyLabelTemplateImport{
    key: string, //keyof ValidatedResponseSiswa,
    label: string,
    type:string
}