import type { SppdAppType } from "~/types/surat/sppd-app-type";
import IdentitasNotulaRapat from "./sppd-comp/identitas-notula-rapat";
import useDataAtasan, { type AtasanType } from "~/hooks/use-data-atasan";

export default function FormatNotulaRapartSppd({data, includeResume=false}:{data:SppdAppType, includeResume?:boolean}){
    const Pimpinan = useDataAtasan(data.ptk_starttgl, data.ptk_jabatan as AtasanType)
    return (
        <div className="border print:border-0 h-[310mm] p-2">
            <IdentitasNotulaRapat atasan={Pimpinan} data={data}/>
            
        <div
            className="relative w-full"
            style={{
                height: 900,
                backgroundImage: `
                    repeating-linear-gradient(
                        to bottom,
                        transparent 0,
                        transparent 20px,
                        #d1d5db 21px
                    )
                `,
            }}
        >
            <div className="absolute left-10 top-0 bottom-0 w-px bg-red-300" />
            <div className="ps-12 indent-8 mt-5 text-sm">
                <p className="mb-5">Berdasarkan tugas yang diberikan kepada saya melalui <strong>Surat Tugas Nomor {data.ptk_nosppd}</strong> tanggal <strong>{data.ptk_starttgl.toLocaleDateString('id-ID', {dateStyle:'long'})}</strong> tentang <strong>{data.ptk_maksudsppd}</strong>, maka dengan ini kami laporkan hasil perjalanan dinas tersebut:</p>
                {includeResume && <data dangerouslySetInnerHTML={{__html:data.resume}} className="mt-5"/>}
            </div>
            {/* <div className="bgsekolah w-full z-0 bg-transparent ps-12 bg-center h-full absolute">Hello</div> */}
        </div>
        </div>
    )
}