import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import type { BulanType, JenisRekapType } from "~/controllers/tabungan/toolbar/jenis-rekap-keuangan";
import TotalTabunganPerSiswa from "./total-per-siswa";
import TotalTabunganPerKelas from "./total-per-kelas";

export default function(){
    
        const {value} = useFilterContext<{
                    jenisKelompokData?:JenisRekapType,
                    fokusBulan?:BulanType
                }>();
        
    
        const kelompokData = value?.extra?.jenisKelompokData?.value;
        switch(kelompokData){
            case 'perKelas':
                return <TotalTabunganPerKelas fokusBulan = {value?.extra?.fokusBulan}/>;
            case 'perSiswa':
                return <TotalTabunganPerSiswa fokusBulan ={value?.extra?.fokusBulan}/>
            default:
                return <p>Data Belum Siap</p>
        }
}