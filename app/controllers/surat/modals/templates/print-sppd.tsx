import type { SppdAppType } from "~/types/surat/sppd-app-type";
import KopDinasDepok from "./sppd-comp/kop-sppd";
import IdentitasLampiranSuratKeluar from "./sppd-comp/identitas-lampiran-surat";
import TableSppdHalSatu from "./sppd-comp/tabel-sppd-hal-satu";
import WrapperTitimangsaTtd from "./sppd-comp/wrapper-titimangsa-ttd";
import TableSppdHalDua from "./sppd-comp/tabel-sppd-hal-dua";
import PenandaTanganSppd from "./sppd-comp/penandatanganan-sppd";

export default function PrintSppd({data}:{data:SppdAppType}){
    
    const getPrefixNoSurat= ()=>data.ptk_nosppd.split('/')[0];
    const getNoSurat= ()=>data.ptk_nosppd.split('/')[1].split('-')[0];
    return (
        <>
            <div className="border print:border-0 h-[310mm] min-w-[200mm] md:min-w-100  p-2">
                <KopDinasDepok/>
                <IdentitasLampiranSuratKeluar lembarKe={1} prefix={getPrefixNoSurat()} nomorSurat={getNoSurat()}/>
                <h3 className="text-2xl font-arial font-extrabold uppercase text-center underline">Surat Perjalanan Dinas(SPD)</h3>
                <TableSppdHalSatu data={data}/>
                <WrapperTitimangsaTtd data={data}/>
            </div>
            <div className="print:break-before-page border min-w-[200mm] md:min-w-100 overflow-x-auto print:border-0 h-[310mm] p-2">
                <IdentitasLampiranSuratKeluar lembarKe={2} prefix={getPrefixNoSurat()} nomorSurat={getNoSurat()}/>
                <TableSppdHalDua data={data}/>
                <div className="mt-8 flex justify-end">
                    <PenandaTanganSppd atasan={data} className="text-center h-38"/>
                </div>
                
            </div>
        </>
    )
}