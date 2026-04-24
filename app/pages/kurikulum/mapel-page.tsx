import { useAppSelector } from "~/context-reduct/hook";
import TableMapel from "~/controllers/mapel/tabels/tabel-mapel";
import TableMapelCheckbox from "~/controllers/mapel/tabels/tabel-mapel-checkbox";
import TableMapelOrm from "~/controllers/mapel/tabels/tabel-mapel-orm";
import { currentTapel } from "~/lib/current-tapel";

export default function MapelPage(){
    const rombel = useAppSelector(state=>state.fokusRombel.value);
    return (
        <div className="p-1">
            <h3 className="text-2xl text-center font-extrabold uppercase mb-0">Daftar Mata Pelajaran</h3>
            <h3 className="text-xl text-center font-extrabold uppercase mb-0">kelas {rombel}</h3>
            <h5 className="text-base text-center font-extrabold uppercase mb-5">{currentTapel({variant:'full'})}</h5>
            {/* <TableMapelCheckbox/> */}
            <TableMapelOrm/>
            {/* <TableMapel/> */}
        </div>
    )
}