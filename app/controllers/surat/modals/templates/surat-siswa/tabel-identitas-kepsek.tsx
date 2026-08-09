import useDataAtasan from "~/hooks/use-data-atasan";
import { currentTapel } from "~/lib/current-tapel";

export default function TabelIdentitasKepsek({tgl}:{tgl:Date}){
    
    const kepsek = useDataAtasan(tgl,'Guru Kelas')
    return (
        <table>
            <tbody>
                <tr>
                    <td className="pe-4 w-2/12">Nama</td>
                    <td className="pe-4">:</td>
                    <td className="pe-4 w-full">{kepsek.name}</td>
                </tr>
                <tr>
                    <td className="pe-4">NIP</td>
                    <td className="pe-4">:</td>
                    <td className="pe-4">{kepsek.nip_number}</td>
                </tr>
                <tr>
                    <td className="pe-4">Jabatan</td>
                    <td className="pe-4">:</td>
                    <td className="pe-4">{kepsek.jabatan}</td>
                </tr>
            </tbody>
        </table>
    )
}