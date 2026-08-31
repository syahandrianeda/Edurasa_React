import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type"
import OpsiSoalPreview from "../../koleksi-bank-soal/views/opsi-soal-preview"

type Props = {
    noDisplay: number,
    withOpsi:boolean,
    withPembahasan?:boolean,
    data:BankSoalAppType
}
export default function SoalItemFlex({noDisplay, withOpsi, withPembahasan, data}:Props){
    return (
        <div className="flex flex-row gap-0">
            <div className="w-fit px-2">{noDisplay}.</div>
            <div className="w-full px-2 flex flex-col gap-1">
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
            {
                withPembahasan && (
                    <div>
                        <p className="font-bold text-[10px] border ps-1 pe-4 w-fit rounded-tr-2xl border-green-400">Jawaban/Pembahasan:</p>
                        <div
                            className="border p-1 text-[10px] rounded-tr-2xl rounded-b-2xl border-green-400"
                            dangerouslySetInnerHTML={{
                                __html:
                                    (data.pembahasan_penskoran ?? ""),
                            }}
                        /> 

                    </div>
                    
                )
            }

            </div>
        </div>
    )
}