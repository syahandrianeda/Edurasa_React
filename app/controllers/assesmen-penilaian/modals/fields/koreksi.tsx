

import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type { detailNilaiSiswaAppType, ResumeInfoResponse } from "~/types/penilaian/nilai-siswa-app-type";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import type { TemplateKoreksiSiswaType } from "~/types/penilaian/TemplateKoreksiSiswaType";
import type { HandleUpdateResponKoreksi } from "~/domain/bank-soal/koreksi";
import { KoreksiPgHeader } from "./KoreksiPgHeader";
import { KoreksiPgBody } from "./KoreksiPgBody";
import { KoreksiIsianSingkat } from "./KoreksiIsianSingkat";
import { KoreksiEssay } from "./KoreksiEssay";

type Props={
    data:detailNilaiSiswaAppType,
    responSiswa:RisponsePenilaianSiswa[],
    handleUpdate: HandleUpdateResponKoreksi
}
export default function KoreksiWrapper({data, responSiswa, handleUpdate}:Props){
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-2 px-2 text-[10px]  border-b-6 border-double border-sky-300">
           {
            data.templateKoreksiSiswa.map((sistem)=>
                    <SwitchFieldKoreksiByBentukSoal key={sistem.bentuk_soal.name} data={mergeResponLive(sistem, responSiswa)} handleUpdate={handleUpdate}/>
            )
           } 
        </div>
    )
}

/**
 * Gabungkan respon live (state updateRespon hasil koreksi) ke template koreksi
 * berdasarkan bentuk_soal + no_prefix, sehingga child selalu membaca data terbaru.
 */
function mergeResponLive(sistem:TemplateKoreksiSiswaType, responSiswa:RisponsePenilaianSiswa[]):TemplateKoreksiSiswaType{
    return {
        ...sistem,
        data: sistem.data.map(item=>({
            ...item,
            respon: responSiswa.find(r=> r.bentuk_soal === sistem.bentuk_soal.name && r.no_prefix === item.no_prefix)
        }))
    }
}

function SwitchFieldKoreksiByBentukSoal({data, handleUpdate}:{data:TemplateKoreksiSiswaType, handleUpdate: HandleUpdateResponKoreksi }){
    switch(data.bentuk_soal.name){
        case 'pg':
            return <div className="col-span-1 text-[10px]">
                <p className="text-base">{data.bentuk_soal.description}</p>
                <TableWithScrolling className="text-[10px]" inModal={true}>
                        <KoreksiPgHeader data={data.data}/>
                        <KoreksiPgBody data={data.data} handleUpdate={handleUpdate}/>
                </TableWithScrolling>   
                </div>
                        

        case 'essay':
            return <div className="md:col-span-2 col-span-1">
                <p className="text-base">{data.bentuk_soal.description}</p>
                <KoreksiEssay template={data} handleUpdate={handleUpdate}/>
            </div>
        case 'isian_singkat':
            return <div className="md:col-span-2 col-span-1">
                <p className="text-base">{data.bentuk_soal.description}</p>
                <KoreksiIsianSingkat template={data} handleUpdate={handleUpdate}/>
            </div>
        
        default:
            return null
    }
}

