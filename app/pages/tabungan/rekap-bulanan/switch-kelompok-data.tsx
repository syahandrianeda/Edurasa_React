import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import type { BulanType, JenisRekapType } from "~/controllers/tabungan/toolbar/jenis-rekap-keuangan";
import RekapPerKelasBulanan from "./per-kelas-bulanan";
import RekapPerSiswaBulanan from "./per-siswa-bulanan";

export default function(){
    
    const {value} = useFilterContext<{
                jenisKelompokData?:JenisRekapType,
                fokusBulan?:BulanType
            }>();
    

    const kelompokData = value?.extra?.jenisKelompokData?.value;
    switch(kelompokData){
        case 'perKelas':
            return <RekapPerKelasBulanan fokusBulan = {value?.extra?.fokusBulan}/>;
        case 'perSiswa':
            return <RekapPerSiswaBulanan fokusBulan ={value?.extra?.fokusBulan}/>
        default:
            return <p>Data Belum Siap</p>
    }
}