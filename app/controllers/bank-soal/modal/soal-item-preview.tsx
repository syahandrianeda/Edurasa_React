import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type"
import OpsiSoalPreview from "../../koleksi-bank-soal/views/opsi-soal-preview"

type Props = {
    noDisplay: number,
    withOpsi:boolean,
    data:BankSoalAppType
}
export default function SoalItemPreviewhtml({
    noDisplay=1,
    data,
    withOpsi
    }:Props){
    return (
        <ol start={noDisplay} className="align-top :marker:align-top list-decimal list-outside pl-6 editor-document">
            <li className="align-top ps-2">
                {
                        data.stimulus !=="" && (<div className="editor-document [&>p]:m-0 [&>img]:m-0"
                            dangerouslySetInnerHTML={{
                                __html:
                                    (data.stimulus ?? ""),
                            }}
                        />)
                    }
                    <div
                        
                        dangerouslySetInnerHTML={{
                            __html:
                                (data.pertanyaan ?? ""),
                        }}
                    />
                

                
                {
                    withOpsi && (<OpsiSoalPreview data={data}/>)
                }
            </li>
        </ol>
    )
}