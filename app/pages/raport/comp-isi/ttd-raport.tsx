import SelTtdGuru from "~/components/ttd/sel-ttd-guru";
import SelTtdKepsek from "~/components/ttd/sel-ttd-kepsek";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { currentTapelProperties } from "~/lib/current-tapel";
import type{ UserPtk } from "~/types";

type Props={
    showStempel:boolean
    showTtdKepsek:boolean,
    showTtdWalas:boolean,
    titimangsa:Date
}
export default function TtdRaport({showStempel, showTtdKepsek, showTtdWalas, titimangsa}:Props){
    const user = getSessionApp<UserPtk>();
    const rombel = getSessionRombel();
    const findWalas = user?.friends.find(s=>s.kode_mapel_ampu === rombel);
    const jabatanGuru = findWalas?.jabatan ?? '';
    const mapel_or_kelas_ampu = findWalas?.kode_mapel_ampu?? ''
    const namaGuru = findWalas?.name ?? '';
    const nipGuru = findWalas?.nip ?? '';
    const idTtd = findWalas?.id_ttd ?? ''
    const semester = currentTapelProperties({variant:'getSemester'});
    return (
        <table className="w-full leading-7 mt-12 mb-2">
            <tbody>
                <tr>
                    <td className="text-center">
                        <div className="flex flex-col  min-h-32 justify-between items-center">
                            <p className="text-center">Orang Tua/Wali Murid</p>
                            <p className="w-10/12 mx-auto border-b border-black text-white">.</p>
                        </div>
                    </td>
                    <td className="min-w-1/3"></td>
                    <td className="text-center">
                        <SelTtdGuru 
                            id_ttd={idTtd}
                            showTtd={showTtdWalas} 
                            typeTitimangsa='titimangsa' 
                            jabatan={jabatanGuru} 
                            kode_mapel_ampu={mapel_or_kelas_ampu}
                            namaGuru={namaGuru}
                            nipGuru={nipGuru}
                        />
                    </td>
                </tr>
                {
                    semester === 2 && (
                                <tr>
                                    <td/>
                                    <td>
                                        <SelTtdKepsek 
                                            showStempel={showStempel} 
                                            typeTitimangsa='mengetahui' 
                                            showTtd={showTtdKepsek} 
                                            titimangsa={titimangsa}
                                            className=""
                                            />
                                    </td>
                                    <td/>
                                </tr>
                        
                    )
                }

            </tbody>
        </table>
    )
}