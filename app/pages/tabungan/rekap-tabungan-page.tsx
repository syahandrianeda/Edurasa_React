import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import type { JenisRekapType } from "~/controllers/tabungan/toolbar/jenis-rekap-keuangan";
import SwitchRekapBulanan from './rekap-bulanan/switch-kelompok-data'
import SwitchRekapTotal from './rekap-total/switch-total-rekap-tabungan'
import { useAppSelector } from "~/context-reduct/hook";
import { DtoDataTabunganCurrentRombel, PureDataTabunganAllRombel } from "~/context-reduct/selectores/data-tabungan-selector";
import { useMemo } from "react";
import { createRekapBulananPerKelas } from "~/domain/tabungan/service/create-rekap-tabungan";
import SwitchSnapshot from "./snapshot/switch-snapshot";

export default function RekapTabunganPage(){
    const DataTabungan = useAppSelector(DtoDataTabunganCurrentRombel)
    const {value} = useFilterContext<{
            jenisRekap?:JenisRekapType,
        }>();
    const RekapDataTabungan = useMemo(()=>{
        return createRekapBulananPerKelas(DataTabungan)
    },[DataTabungan]);
    

    const jenisRekap = value?.extra?.jenisRekap?.value;

    switch(jenisRekap){
        case 'bulanan':
            return <SwitchRekapBulanan/>;
        case 'total':
            return <SwitchRekapTotal/>;
        case 'snapshot':
            return <SwitchSnapshot/>;//<TabelTotalTabungan/>;
        default:
            return <p>Tidak ditemukan</p>
    }
    
}