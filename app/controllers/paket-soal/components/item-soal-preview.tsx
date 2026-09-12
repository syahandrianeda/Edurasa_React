import OpsiSoalPreview from "~/controllers/koleksi-bank-soal/views/opsi-soal-preview";
import type { DisplayFormatItemSoal } from "~/domain/paket-soal/result/display-format-item-soal";

export default function ItemSoalPreview({data}:{data:DisplayFormatItemSoal}){
    
    return (
        <>
            {/* stimulus */}
            {
                (data.showStimulus && data.data_soal?.stimulus && data.data_soal?.stimulus !=="") && (
                    <div className="editor-document [&>p]:m-0 [&>img]:m-0"
                        dangerouslySetInnerHTML={{__html:data.data_soal?.stimulus}}/>
                )
            }
            {
                data.data_soal?.pertanyaan && <div className="editor-document [&>p]:m-0 [&>img]:m-0"
                    dangerouslySetInnerHTML={{__html: data.data_soal?.pertanyaan}}/>
            }
            
            {
                data.data_soal && ( <OpsiSoalPreview data={data.data_soal} setDisplay={data.format_display}/> )
            }
        </>
    )
}