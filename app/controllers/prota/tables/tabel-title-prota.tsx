import type OrmProta from "~/domain/kurikulum/orm-prota"
import { currentTapel } from "~/lib/current-tapel"

export default function TableTitleProta({prota}:{prota:OrmProta }){
    return (
        <table className="w-full" data-word="ignore-parse">
            <tbody>
                <tr>
                    <td className="border-none text-nowrap pe-2">Mata Pelajaran</td>
                    <td className="border-none w-1 pe-2">:</td>
                    <td className="border-none ps-1 text-nowrap w-full">{prota.namaMapel ?? ''}</td>
                </tr>
                <tr>
                    <td className="border-none text-nowrap">Fase/Kelas</td>
                    <td className="border-none">:</td>
                    <td className="border-none ps-1 text-nowrap"><p>{prota.faseAbjad} / {prota.namaJenjang} / {prota.namaRombel}</p></td>
                </tr>
                <tr>
                    <td className="border-none text-nowrap pe-2">Pengajar/Pengampu Mapel</td>
                    <td className="border-none w-1">:</td>
                    <td className="border-none ps-1 text-nowrap">{prota.pengampuMapel}</td>
                </tr>
                <tr>
                    <td className="border-none text-nowrap pe-2">Tahun Pelajaran</td>
                    <td className="border-none w-1">:</td>
                    <td className="border-none ps-1 text-nowrap">{currentTapel({variant:'onlyTapel'})}</td>
                </tr>
            </tbody>
        </table>
    )
}