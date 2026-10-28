import {useCallback, useMemo} from 'react';
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useFilterContext } from '~/components/toolbars/state-toolbar/state-toolbar';
import type { CollectionNilaiMapel, RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan } from '~/domain/kategori-tagihan/types';
import type { DataSiswaBasedMapelInResponAllKategoriTagihanInterface } from '~/domain/kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/DataSiswaBasedMapelInResponAllKategoriTagihanInterface';
import type { KategoriTagihanHasManyPesertaMapelType } from '~/domain/kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/KategoriTagihanHasManyPesertaMapelType';
import type { StrukturAtpType } from '~/domain/trees-struktur-kurikulum';
import type { InterfaceMapel } from '~/types/mapel/mapel';
import type { FokusStrukturKurikulumPresentation, FokusStrukturKurikulumSelected } from '../toolbar/RadioChooseFokusStrukturKurikulum';
import type { FormatKategoriAssesmenPreview, FormatKategoriAssesmenTable } from '../toolbar/RadioChooseFormatKategirAssesmen';
import type { SkorKdNullableType } from '~/domain/penilaian/type/SkorKdType';

type keyLabelType = {
    key:string, 
    label:string
    idStruktur: number
}

type dataPresentation = {
    headerTable:keyLabelType[];
    data?: DataSiswaBasedMapelInResponAllKategoriTagihanInterface[]
}

type Props = {
    fokusMapel:InterfaceMapel, 
    kategoriTagihan?:KategoriTagihanHasManyPesertaMapelType
};

export default function TableRekapKategoriAssesmen({fokusMapel, kategoriTagihan}:Props){
    const {value} = useFilterContext<FokusStrukturKurikulumPresentation & FormatKategoriAssesmenPreview >();
   
    const dataNilai:dataPresentation|undefined= useMemo(()=>{
        if(!kategoriTagihan || !value?.extra?.FokusStrukturKurikulum) return ;
        const {keyLabel, keyFokusStruktur, keyStrukturKurikulum} = value?.extra?.FokusStrukturKurikulum;
            const data = kategoriTagihan?.data?.find(s=> s.mapel===fokusMapel.kode)?.dataNilai ?? [];//.flatMap(m=>m.dataNilai);
            const Mapel_IdStruktur = kategoriTagihan?.koleksiAtpInMapel?.find(s=>s.kodeMapel === fokusMapel.kode)
            const collectionStrukturKurikulum = kategoriTagihan?.koleksiAtpInMapel?.find(s=>s.kodeMapel === fokusMapel.kode);
            const fokusStrutktur = collectionStrukturKurikulum?.[keyFokusStruktur];
            const headerTable = Array.isArray(fokusStrutktur)? fokusStrutktur.map(m=>({label:`${keyLabel} ${String((m as unknown as Record<string, unknown>)[keyStrukturKurikulum] ?? '')}`, key:keyLabel, idStruktur:(m as unknown as Record<string, number>)[keyStrukturKurikulum]})): []
            return {
                data,
                headerTable
            }
        },[fokusMapel.kode, kategoriTagihan, value?.extra?.FokusStrukturKurikulum]);

    const getNilaiBasedOnTypeStruktur = useCallback((dataMapel:CollectionNilaiMapel, type:string, idStruktur:number):string|null=>{
        
        if(!value?.extra?.formatKategoriAssesmen || !dataMapel) return null;

        const format: FormatKategoriAssesmenTable= value?.extra?.formatKategoriAssesmen;
        const mapel_id= `${dataMapel.kodeMapel}_${idStruktur}` as keyof SkorKdNullableType
        /**
         * skorKd_atp_sheet?:SkorKdNullableType
             skorKd_cp_sheet?:SkorKdNullableType
             skorKd_tp_sheet?:SkorKdNullableType
         */
        const keySheetKd = `skorKd_${type.toLowerCase()}_sheet` as keyof CollectionNilaiMapel;
        const keyRespon = `skorKd_${type.toLowerCase()}` as keyof CollectionNilaiMapel;
        const nilaiAkhirSheetKdNumberNull = (dataMapel[keySheetKd] as SkorKdNullableType | null | undefined)?.[mapel_id] ?? null;
        const nilaiAkhirResponNumberNull = (dataMapel[keyRespon] as SkorKdNullableType | null | undefined)?.[mapel_id] ?? null;
        const nilaiAkhirSheetKd = nilaiAkhirSheetKdNumberNull !== null ? String(nilaiAkhirSheetKdNumberNull.toFixed(2)):null
        const nilaiAkhirRespon = nilaiAkhirResponNumberNull !== null ? String(nilaiAkhirResponNumberNull.toFixed(2)):null
        switch(format){
            case 'decision':
                return nilaiAkhirSheetKd;
            case 'responSiswa':
                return nilaiAkhirRespon;
            case 'dataServer':
                return nilaiAkhirSheetKd;
            default:
                return null
        }

    },[value?.extra?.formatKategoriAssesmen]);
    const getNilaiMapel = useCallback((dataMapel?:CollectionNilaiMapel):string|null=>{
        
        if(!value?.extra?.formatKategoriAssesmen || !dataMapel) return null;
        
        const format: FormatKategoriAssesmenTable= value?.extra?.formatKategoriAssesmen;
        
        const nilaiAKhirSheetKdNumberNull = dataMapel?.skorMapel_sheet ?? null;
        const nilaiAkhirSheetKd = nilaiAKhirSheetKdNumberNull!==null? String(nilaiAKhirSheetKdNumberNull.toFixed(2)):null;
        const nilaiAKhirResponNumberNull = dataMapel?.skorMapel ?? null;
        const nilaiAkhirRespon = nilaiAKhirResponNumberNull!==null? String(nilaiAKhirResponNumberNull.toFixed(2)):null;
        switch(format){
            case 'decision':
                return nilaiAkhirSheetKd
            case 'responSiswa':
                return nilaiAkhirRespon
            case 'dataServer':
                return nilaiAkhirSheetKd
            default:
                return null
        }

    },[value?.extra?.formatKategoriAssesmen])
        
    return (
        <TableWithScrolling className='text-xs'>
            <thead>
                <TRowEdura>
                    <ThEdura className='w-8' rowSpan={2}>No</ThEdura>
                    <ThEdura className='w-12 text-wrap' rowSpan={2}>Token Siswa</ThEdura>
                    <ThEdura className='max-w-5/12' rowSpan={2}>Nama Siswa</ThEdura>
                    <ThEdura className='w-12 text-wrap' rowSpan={2}>Nilai Mapel</ThEdura>
                    <ThEdura colSpan={dataNilai?.headerTable?.length===0?1:dataNilai?.headerTable?.length}>Data Nilai Per {value?.extra?.FokusStrukturKurikulum!.keyLabel ?? ''}</ThEdura>
                </TRowEdura>
                <TRowEdura>
                    {
                        dataNilai?.headerTable?.length === 0 ? (
                            <ThEdura>Belum ada tagihan assesmen yang dilaksanakan</ThEdura>
                        ):(
                            dataNilai?.headerTable?.map((header, iHeader)=>
                                <ThEdura key={header+'_'+iHeader}>{header.label}</ThEdura>
                            )
                        )
                        
                    }
                </TRowEdura>
            </thead>
            <tbody>
                {
                    dataNilai?.data?.length === 0 ? (
                        <TRowEdura>
                            <TdEdura colSpan={5} className="text-center">Tidak ada tagihan assesmen untuk mapel ini</TdEdura>
                        </TRowEdura> 
                    ):(
                        dataNilai?.data?.map((siswa, iSiswa)=>
                            <TRowEdura key={siswa.idSiswa}>
                                <TdEdura>{iSiswa+1}</TdEdura>
                                <TdEdura>{siswa.idSiswa}</TdEdura>
                                <TdEdura>{siswa.namaSiswa}</TdEdura>
                                <TdEdura>{getNilaiMapel(siswa?.mapel)}</TdEdura>
                                
                                {
                                    dataNilai?.headerTable?.length === 0 ? (
                                        <TdEdura>Belum ada tagihan assesm yang dilaksanakan</TdEdura>
                                    ):(
                                        dataNilai?.headerTable?.map((header, iHeader)=>
                                            // <TdEdura key={header+'_'+iHeader}>{siswa?.mapel?.[header.key as keyof NonNullable<typeof siswa.mapel>] as string ?? ''}</TdEdura>
                                            <TdEdura key={header+'_'+iHeader} className='text-center'>{siswa?.mapel &&getNilaiBasedOnTypeStruktur(siswa?.mapel,header.key, header.idStruktur)}</TdEdura>
                                        )
                                    )
                                    
                                }
                            </TRowEdura>
                        )
                    )
                }
            </tbody>
        </TableWithScrolling>
    )
};