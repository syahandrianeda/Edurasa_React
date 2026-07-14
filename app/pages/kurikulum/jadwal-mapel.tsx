import { useAppSelector } from "~/context-reduct/hook";
import { currentTapel } from "~/lib/current-tapel";
import TabelJadwalPelajaran from "~/controllers/jadwal_pelajaran/tabel/tabel-jadwal";
export default function JadwalMapelPage() {
    const rombel = useAppSelector(state=>state.fokusRombel.value);
    return (
        <div className="p-1">
            <h3 className="text-2xl text-center font-extrabold uppercase mb-0">Jadwal Mata Pelajaran</h3>
            <h3 className="text-xl text-center font-extrabold uppercase mb-0">kelas {rombel}</h3>
            <h5 className="text-base text-center font-extrabold uppercase mb-5">{currentTapel({variant:'full'})}</h5>
            <TabelJadwalPelajaran />
        </div>
    )
}