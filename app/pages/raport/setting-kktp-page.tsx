import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session"
import TableKktpSetting from "./com-kktp/table-kktp"
import { currentTapel } from "~/lib/current-tapel";

export default function SettingKktpPage(){
    const rombel = getSessionRombel();
    const tapel = currentTapel({variant:'full'})
    return (
        <div className="p-1">
            <h3 className="font-bold mb-0 uppercase text-xl text-center">Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)</h3>
            <h4 className="font-bold mb-0 uppercase text-lg text-center">{tapel}</h4>
            <h4 className="font-bold mb-7 uppercase text-lg text-center">Kelas {rombel}</h4>
            <TableKktpSetting/>
            <div className="text-sm">
                Keterangan:
                <ol className="list-outside ps-5 text-[10px]">
                    <li>Kode Mapel adalah kode unik mata pelajaran di aplikasi ini</li>
                    <li>KKTP adalah nilai kriteria yang telah diputuskan oleh kurikulum sekolah</li>
                    <li>Pengayaan adalah nilai batas suatu nilai yang diperoleh siswa untuk dijadikan rujukan pelaksanaan pengayaan terhadap siswa tersebut</li>
                </ol>
            </div>
        </div>
    )
}