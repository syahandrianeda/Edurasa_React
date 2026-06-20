import { useAppSelector } from "~/context-reduct/hook";
import { OrmMapelSelector } from "~/context-reduct/selectores/mapel-rombel-selector";
import { currentTapel } from "~/lib/current-tapel";
import type { settingJadwalApp } from "~/types/setting_jadwal/setting_jadwal";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import TabelJadwalPelajaran from "~/controllers/jadwal_pelajaran/tabel/tabel-jadwal";
import { useMemo } from "react";
import { jadwalPelajaranAppSelector} from "~/context-reduct/selectores/jadwal-pelajaran-selector";

export default function JadwalMapelPage() {
    const rombel = useAppSelector(state=>state.fokusRombel.value);
    const mapelSelector = useAppSelector(OrmMapelSelector);
    const jadwal = useAppSelector(jadwalPelajaranAppSelector);
    const mapel = useMemo(()=>{
        return mapelSelector.mapelRombelUnique??[];
    }, [mapelSelector]);
    const {value} = useFilterContext<settingJadwalApp>();
    return (
        <div className="p-1">
            <h3 className="text-2xl text-center font-extrabold uppercase mb-0">Jadwal Mata Pelajaran</h3>
            <h3 className="text-xl text-center font-extrabold uppercase mb-0">kelas {rombel}</h3>
            <h5 className="text-base text-center font-extrabold uppercase mb-5">{currentTapel({variant:'full'})}</h5>
            <TabelJadwalPelajaran />
        </div>
    )
}