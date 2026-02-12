import { useMemo } from "react";
import { useAppSelector } from "~/context-reduct/hook";
import { DataSiswaAktifJenjangWithValidation } from "~/context-reduct/selectores/data-siswa-aktif";
import { TableSiswaJenjangWithValidation } from "~/controllers/data-siswa-controller/table-data-siswa-jenjang-validation";
import { currentTapel } from "~/lib/current-tapel";
import { getNumberFromString } from "~/lib/get-number";

export default function DataSiswaPerJenjangPage() {
    const siswaktifJenjang = useAppSelector(DataSiswaAktifJenjangWithValidation);
    const rombel = useAppSelector(state=>state.fokusRombel.value);
    const jenjang = useMemo(()=>{
        if(!rombel)  return

        return getNumberFromString(rombel)
    },[
        rombel
    ])
    return (
        <div className="p-1">
            <h3 className="text-2xl font-bold mb-0 text-center uppercase">Daftar Siswa Kelas {jenjang}</h3>
            <h4 className="font-bold text-center mb-5">{currentTapel({variant:'full'})}</h4>
            <TableSiswaJenjangWithValidation data={siswaktifJenjang}/>
        </div>
    );
}