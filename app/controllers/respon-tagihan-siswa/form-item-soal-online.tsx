import type { DisplayFormatItemSoal } from "~/domain/paket-soal/result/display-format-item-soal-type";
import InputOpsiJawabanOnline from "./input-opsi-jawaban-online";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";

type Props = {
    data:DisplayFormatItemSoal, 
    no_prefix:number,
    dataRespon: RisponsePenilaianSiswa,
    handleChange: (field:RisponsePenilaianSiswa, value:string, skor:number)=>void
}
export default function FormITemSoalOnline({data, no_prefix, dataRespon, handleChange}:Props){
    return (
        <>
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
                                data.data_soal && ( <InputOpsiJawabanOnline data={data.data_soal} dataRespon={dataRespon} no_prefix={no_prefix} handleChange={handleChange}/> )
                            }
                            </>
    )
}
