import { useAppSelector } from "~/context-reduct/hook"
import { DataKurikulumSelector, KurmerDtoSelector, PropertyKurikulumMapelAktifSelector } from "~/context-reduct/selectores/kurmer-selector";
import ButtonAddCp from "~/controllers/kurikulum/modals/button-add-cp";
import TableCp from "~/controllers/kurikulum/tabels/tabel-cp";
import { currentTapel } from "~/lib/current-tapel";

export default function ElemenCpPage(){
    const fokusMapel = useAppSelector(state=>state.fokusMapel.data);
    const data = useAppSelector(PropertyKurikulumMapelAktifSelector);
    const data2 = useAppSelector(DataKurikulumSelector);
    const data4 = useAppSelector(KurmerDtoSelector);
    
        return (
        <div className="p-1">
            <h3 className="text-2xl text-center font-extrabold uppercase mb-0">Capaian Pembelajaran (CP)</h3>
            <h3 className="text-xl text-center font-extrabold uppercase mb-0">{`${fokusMapel.nama}`}</h3>
            <h3 className="text-xl text-center font-extrabold uppercase mb-0">Fase {data.currentFase?.faseName} (Kelas {data.currentFase?.memberJenjang.join(' dan ')})</h3>
            <h5 className="text-base text-center font-extrabold uppercase mb-5">{currentTapel({variant:'full'})}</h5>
            <ButtonAddCp/>
            <TableCp/>
        </div>
    )
}