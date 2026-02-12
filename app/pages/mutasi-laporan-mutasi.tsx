import { useMemo } from "react";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { useAppSelector } from "~/context-reduct/hook";
import { selectAllSiswaDTO } from "~/context-reduct/selectores/data-siswa-aktif";
import { IdentitasLaporanMutasi } from "~/controllers/data-siswa-controller/mutasi/laporan-mutasi";
import type KesiswaanData from "~/domain/kesiswaan/kesiswaan-data";
import { StatistikAllStatusPerRombel } from "~/domain/kesiswaan/kesiswaan-statistik";



export default  function MutasiLaporanMutasiPage() {
    const {value} = useFilterContext();
    const rombel = useAppSelector(state=>state.fokusRombel.value);
    const allSiswa = useAppSelector(selectAllSiswaDTO);

    const data = useMemo(()=>{
            if(!rombel) return null
            return StatistikAllStatusPerRombel(allSiswa, rombel);
        },[
            allSiswa,rombel,value
        ]) as KesiswaanData;
    
    return (
        <div className="p-1">
            <h3 className="text-2xl font-bold mb-5 text-center leading-normal uppercase">Daftar Mutasi Siswa</h3>
            <IdentitasLaporanMutasi data={data} context={value} rombel={rombel as string}/>
        </div>
        
    );
}
