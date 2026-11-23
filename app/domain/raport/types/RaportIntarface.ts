import type { FormatKategoriAssesmenTable } from "~/controllers/rekap-tagihan-harian/toolbar/FormatKategoriAssesmenTable";
import type { SiswaType } from "~/types/siswa";
import type { JenisKurikulumType } from "../../kurikulum/jenis-kurikulum-type";
import type { InterfaceMapel } from "~/types/mapel/mapel";
import type { KategoriTagihanType } from "~/domain/kategori-tagihan/types/entities/KategoriTagihanType";
import type { CollectionNilaiMapel, RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan } from "~/domain/kategori-tagihan/types";
import type { StrukturAtpInterface, StrukturAtpType, StrukturCpInterface, StrukturCpType, StrukturTpInterface, StrukturTpType } from "~/domain/trees-struktur-kurikulum";
import type { SkorKdNullableType } from "~/domain/penilaian/type/SkorKdType";
import type { SkorNilaiFromResponWithSource } from "../infrastructures/accumulator-nilai/SkorNilaiFromResponWithSourceType";
import type { SkorNilaiFromSheetKdWithSource } from "../infrastructures/accumulator-nilai/SkorNilaiFromSheetKdWithSource";
import type { KoleksiSktrukturWithSourceSkorAndStateMaxMin, KoleksiStrukturWithSourceSkor } from "../infrastructures/builder/KoleksiStrukturWithSourceSkor";

export type TypeStrukturRefrenceDescription =  'cp'|'tp'|'atp';
export interface RefrenceDescriptionNilaiRaport{
     typeStruktur: TypeStrukturRefrenceDescription,
     idStruktur: number,
     description:string|null
     status: 'max'|'min'
}
export interface SourceNilaiKatetoriTagihanType{
    type:KategoriTagihanType,
    nilai: number|null,
    collectionsData?: CollectionNilaiMapel,
    strukturKurikulum?:RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan
    // refrenceDescription: RefrenceDescriptionNilaiRaport[]
    skorKd_atp?: SkorKdNullableType,
    skorKd_cp?: SkorKdNullableType,
    skorKd_tp?: SkorKdNullableType

}
// interface SourcesNilaiRaportInterface{
//     nilaiRaport: number|null;
//     source: SourceNilaiKatetoriTagihanType[]
// }
export interface CpDescriptionRefrence extends StrukturCpInterface {
    skorCp:number;
}
export interface TpDescriptionRefrence extends StrukturTpInterface {
    skorTp:number;
}
export interface AtpDescriptionRefrence extends StrukturAtpInterface {
    skorAtp:number;
}
export interface MakMinAtp {
    max: AtpDescriptionRefrence|null,
    min: AtpDescriptionRefrence|null
}
export interface MakMinTp {
    max: TpDescriptionRefrence|null,
    min: TpDescriptionRefrence|null
}
export interface MakMinCp {
    max: CpDescriptionRefrence|null,
    min: CpDescriptionRefrence|null
}
export interface NilaiRaportInterface{
    mapel: InterfaceMapel,
    nilaiRaport: number|null;
    nilaiRaportAtp:number|null;
    nilaiRaportCp:number|null;
    nilaiRaportTp:number|null;
    
    atpDescriptionRefrence?: MakMinAtp
    tpDescriptionRefrence?: MakMinTp
    cpDescriptionRefrence?: MakMinCp

    typeStruktur?: TypeStrukturRefrenceDescription,

    source: SourceNilaiKatetoriTagihanType[],
    sourceResponse?:SkorNilaiFromResponWithSource|SkorNilaiFromSheetKdWithSource,
    collectionAtp:StrukturAtpType[],
    collectionTp:StrukturTpType[],
    collectionCp:StrukturCpType[],

    // sourceKoleksiStrukturAtp?:KoleksiStrukturWithSourceSkor[]
    // sourceKoleksiStrukturTp?:KoleksiStrukturWithSourceSkor[]
    // sourceKoleksiStrukturCp?:KoleksiStrukturWithSourceSkor[]
    
    sourceKoleksiStrukturAtp?:KoleksiSktrukturWithSourceSkorAndStateMaxMin[]
    sourceKoleksiStrukturTp?:KoleksiSktrukturWithSourceSkorAndStateMaxMin[]
    sourceKoleksiStrukturCp?:KoleksiSktrukturWithSourceSkorAndStateMaxMin[]
    


    
    skorKd_atp?      : SkorKdNullableType,
    skorKd_tp?       : SkorKdNullableType,
    skorKd_cp?       : SkorKdNullableType,
    
    /**
     * skorKdSheet_atp dkk ini seharusnya tidak ada dn tetap menggunakaan skorKd_atp (tanpa `sheet`) saja
     * karena ini berlaku untuk data dari `respon` mapun `sheetKd`
     */

    /**
     * @deprecated
     */
    skorKdSheet_atp? : SkorKdNullableType,
    /**
     * @deprecated
     */
    skorKdSheet_tp?  : SkorKdNullableType,
    /** @deprecated */
    skorKdSheet_cp?  : SkorKdNullableType,

    
}
export interface TinggiBadanRaportInterface{
    semester:number,
    tinggiBadan:number|null
}
export interface BeratBadanRaportInterface{
    semester:number,
    beratBadan:number|null
}
export interface PrestasiRaportInterface{
    namaPrestasi:string
    keteranganPrestasi: string
}
export interface EkstrakurikulerRaportInterface{
    nama:string
    keterangan:string
    nilai:string
}
export interface KesehatanRaportInterface{
    pendengaran:string,
    penglihatan:string,
    gigi:string,
    lainnya:string
}
export interface RaportIntarface {
    dataSiswa:SiswaType,
    dataNilaiRaportResponSiswa:NilaiRaportInterface[]
    dataNilaiRaportSheetKd: NilaiRaportInterface[],
    dataNilaiRaport:NilaiRaportInterface[],
    dataTinggiBadan:TinggiBadanRaportInterface[]
    dataBeratBadan: BeratBadanRaportInterface[]
    dataPrestasi: PrestasiRaportInterface[]
    dataEkstrakurikuler: EkstrakurikulerRaportInterface[]
    dataKesehatan: KesehatanRaportInterface[];
    waliKelasNama:string,
    waliKelasNip:string,
    kepsekNama:string,
    nipKepsek:string,
    kurikulum:JenisKurikulumType
    saran:string,
    titimangsaRapor:Date
}
