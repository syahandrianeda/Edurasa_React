import { useAppSelector } from "~/context-reduct/hook";
import { PropertyKurikulumMapelAktifSelector } from "~/context-reduct/selectores/kurmer-selector";
import TableAtp from "~/controllers/kurikulum/tabels/tabel-atp";
import { currentTapel } from "~/lib/current-tapel";

export default function AtpPage(){
    const fokusMapel = useAppSelector(state=>state.fokusMapel.data);
    const data = useAppSelector(PropertyKurikulumMapelAktifSelector);
    
    return (
        <div className="p-1">
            <h3 className="text-2xl text-center font-extrabold uppercase mb-0">Alur Tujuan Pembelajaran (ATP)</h3>
            <h3 className="text-xl text-center font-extrabold uppercase mb-0">{`${fokusMapel?.nama}`}</h3>
            <h3 className="text-xl text-center font-extrabold uppercase mb-0">Fase {data.currentFase?.faseName} (Kelas {data.currentFase?.memberJenjang.join(' dan ')})</h3>
            <h5 className="text-base text-center font-extrabold uppercase mb-5">{currentTapel({variant:'full'})}</h5>
            {/* <ButtonAddAtp/> */}
            <TableAtp/>
        </div>
    )
}