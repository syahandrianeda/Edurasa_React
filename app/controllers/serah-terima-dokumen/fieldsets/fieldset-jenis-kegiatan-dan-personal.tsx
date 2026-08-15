import type { handleProps } from "../fields/props-serah-terima";
import SelectTypeJenisKegiatan from "../fields/select-type-jenis-kegiatan";
import SelectTypeTargetPersonal from "../fields/select-type-target-personal";

export default function FieldsetJenisKegiatanDanPersonal({value,setValue,disabled:aksesDenied}:handleProps){
    return (
        <div className="mt-4 flex flex-col md:flex-row gap-2 bg-linear-to-bl from-sky-200 to-purple-400 rounded-2xl p-2 shadow-lg shadow-purple-500">
            <SelectTypeJenisKegiatan disabled={aksesDenied} value={value} setValue={setValue}/>
            <SelectTypeTargetPersonal disabled={aksesDenied} value={value} setValue={setValue}/>
        </div>
    )
}