import { useAppSelector } from "~/context-reduct/hook";
import { DataSiswaAktifWithValidation } from "~/context-reduct/selectores/data-siswa-aktif";
import { selectSiswaDapodik } from "~/context-reduct/selectores/siswa-dapodik-selector";
import { TableSiswaRombelWithValidation } from "~/controllers/data-siswa-controller/table-data-siswa-with-validation";
import { currentTapel } from "~/lib/current-tapel";


export default  function DataSiswaPage() {
    
    const allSiswa = useAppSelector(DataSiswaAktifWithValidation)
    const rombel = useAppSelector(state=>state.fokusRombel.value);
    
    return (
        <div className="p-1">
            <h3 className="text-2xl font-bold mb-0 text-center uppercase">Daftar Siswa Kelas {rombel}</h3>
            <h4 className="font-bold text-center mb-5">{currentTapel({variant:'full'})}</h4>
            <TableSiswaRombelWithValidation data={allSiswa}/>
        </div>
        
    );
}

{/* <TableSiswaRombel data={siswaktifRombel}/>
             */}