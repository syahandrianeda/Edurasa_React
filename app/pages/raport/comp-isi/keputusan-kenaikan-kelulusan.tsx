import { currentTapelProperties } from "~/lib/current-tapel"
import type { SiswaType } from "~/types/siswa"

type Props = {
    namaSiswa: SiswaType['pd_nama'],
    keputusan:string
}
export default function KeputusanKenaikanKelulusan({namaSiswa, keputusan}:Props){
    const semester = currentTapelProperties({variant:'getSemester'});
    if(semester == 2){
        return null;
    }
    return (
        <div className="text-center my-3">
            <p>Berdasarkan pencapaian kompetensi selama menempuh pembelajaran, peserta didik atas nama:</p>
            <p className="text-lg text-center font-bold">{namaSiswa}</p>
            <p>dengan ini dinyatakan:</p>
            <p className="text-xl font-extrabold text-center">{keputusan}</p>
        </div>
    )
}