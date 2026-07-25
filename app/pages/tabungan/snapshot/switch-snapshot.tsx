import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import type { BulanType, JenisRekapType } from "~/controllers/tabungan/toolbar/jenis-rekap-keuangan";
import SnapshotPerKelasBulanan from "./snapshot-perkelas-bulanan";
import SnapshotPerSiswaBulanan from "./snapshot-persiswa-bulanan";

export default function(){
    
    const {value} = useFilterContext<{
                jenisKelompokData?:JenisRekapType,
                fokusBulan?:BulanType
            }>();
    

    const kelompokData = value?.extra?.jenisKelompokData?.value;
    switch(kelompokData){
        case 'perKelas':
            return <p className="text-center font-bold text-2xl mt-7">~Tidak ada snapshot Per Kelas~</p>;
        case 'perSiswa':
            return <SnapshotPerSiswaBulanan fokusBulan ={value?.extra?.fokusBulan}/>
        default:
            return <p>Data Belum Siap</p>
    }
}