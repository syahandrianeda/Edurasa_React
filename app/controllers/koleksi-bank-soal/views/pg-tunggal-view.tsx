import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { FormatElemen } from "~/types/bank-soal/bentuk-soal-type";
import type { PgTunggalType } from "~/types/bank-soal/bentuk-soal/pg-type";

export default function PgPreview({data, setDisplay}:{data:BankSoalAppType, setDisplay?:FormatElemen}){
    switch(setDisplay){
        case 'vertical': 
            return (
                <ol start={1} className="list-[upper-alpha] list-outside pl-5 align-top">
                            {
                                data.json_alat_jawab && (data.json_alat_jawab as PgTunggalType).OpsiPilihanJawaban.map((m,i)=>
                                        <li className="align-top ps-2" key={m.index + "_"+ i}>
                                            <div className="text-wrap editor-document" dangerouslySetInnerHTML={{__html:m.content}}/>
                                        </li>
                                
                                )
                            }
                        </ol>
            );
        case 'square':
            return (
                <div className="columns-2">
                    <ol start={1} className="list-[upper-alpha] list-outside pl-5 align-top">
                            {
                                data.json_alat_jawab && (data.json_alat_jawab as PgTunggalType).OpsiPilihanJawaban.map((m,i)=>
                                        <li className="align-top ps-2" key={m.index + "_"+ i}>
                                            <div className="text-wrap editor-document" dangerouslySetInnerHTML={{__html:m.content}}/>
                                        </li>
                                
                                )
                            }
                        </ol>
                </div>
            )
        case 'horizontal':
            return (
                    <ol start={1} className="list-[upper-alpha] flex flex-row gap-2 overflow-y-auto scrol-h-custom @container list-outside pl-5 align-top">
                            {
                                data.json_alat_jawab && (data.json_alat_jawab as PgTunggalType).OpsiPilihanJawaban.map((m,i)=>
                                        <li className="align-top ps-2 w-full text-[clamp(12px,2cqw,14px)]" key={m.index + "_"+ i}>
                                            <div className="text-wrap editor-document" dangerouslySetInnerHTML={{__html:m.content}}/>
                                        </li>
                                
                                )
                            }
                        </ol>
                
            )
        default:
            return (
                <ol start={1} className="list-[upper-alpha] list-outside pl-5 align-top">
                        {
                            data.json_alat_jawab && (data.json_alat_jawab as PgTunggalType).OpsiPilihanJawaban.map((m,i)=>
                                    <li className="align-top ps-2" key={m.index + "_"+ i}>
                                        <div className="text-wrap editor-document" dangerouslySetInnerHTML={{__html:m.content}}/>
                                    </li>
                            
                            )
                        }
                    </ol>
            )
    }
    
    
}