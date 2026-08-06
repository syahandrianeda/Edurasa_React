import { KABUPATEN_KOTA } from "~/domain/identitas_aplikasi/identitas-aplikasi";
import type { SppdAppType } from "~/types/surat/sppd-app-type";

export default function TitiMangsaSppd({data}:{data:SppdAppType}){
    return (
        <table className="w-full leading-5">
            <tbody>
                <tr>
                    <td className="pe-4">Dikeluarkan di</td>
                    <td>:</td>
                    <td className="px-4">{KABUPATEN_KOTA}</td>
                </tr>
                <tr>
                    <td className="pe-4">Pada Tanggal</td>
                    <td>:</td>
                    <td className="px-4">{data.ptk_starttgl.toLocaleDateString('id-ID', {dateStyle:'long'})}</td>
                </tr>
            </tbody>
        </table>
    )
}