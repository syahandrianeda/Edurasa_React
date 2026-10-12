import { getGlobalIndex } from "~/domain/paket-soal/infrastructure/create-design";
import type { PaketSoalDesign } from "~/domain/paket-soal/result/paket-soal-design-type";
import ItemSoalPreview from "../paket-soal/components/item-soal-preview";
import { useCurrentTime } from "~/hooks/use-current-time";
import FormITemSoalOnline from "./form-item-soal-online";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import TimerSoal from "./timer-soal";

type Props={
    paketSoal:PaketSoalDesign, 
    collectionRespon:RisponsePenilaianSiswa[],
    handleChange: (field:RisponsePenilaianSiswa, value:string, skor:number)=>void
}
export default function PreviewSoalOnline({paketSoal, collectionRespon, handleChange}:Props){
    
    /**
     * index: number,
         respon: string,
         skor: number,
         no_prefix: number,
         bentuk_soal:ListBentukSoalType['name']
         atp?: AtpAsOrm,
         soal_id?: BankSoalAppType
     */
    return (
            paketSoal?.setting?.identitas && paketSoal?.setting?.count_bentuk_soal && paketSoal?.setting?.count_bentuk_soal.length>0) && (
                        <div>
                            <TimerSoal/>
                            <ol className="list-[upper-roman] list-outside ps-4">
        
                                {
                                    paketSoal?.setting?.count_bentuk_soal?.map((soal, indexBentuk) => {
                                        
                                        const cekStartNumber = paketSoal?.data?.[indexBentuk]?.startNumber
                                        const dataSoal =  paketSoal?.data?.find( item => item.bentukSoal.name === soal.dataBentukSoal.name ) ?.dataSoal;
                                        
                                        return (
                                                <li key={indexBentuk + "_"+soal.dataBentukSoal.name}><strong>{soal.dataBentukSoal.description}</strong>
                                                    <ol start={cekStartNumber} className="list-decimal ps-4 marker:font-normal">
                                                        {Array.from(
                                                            { length: soal.count },
                                                            (_, indexSoal) => {
        
                                                                const globalIndex = getGlobalIndex(
                                                                    paketSoal?.setting!,
                                                                    indexBentuk,
                                                                    indexSoal
                                                                )
        
                                                                const dataItem = dataSoal?.find(
                                                                    item => item.index === globalIndex
                                                                )
                                                                const dataRespon = collectionRespon.find(s=>s.index === globalIndex) ?? {
                                                                    index:globalIndex,
                                                                    no_prefix: (indexSoal+1),
                                                                    bentuk_soal: dataItem?.bentuk_soal?.name ?? '',
                                                                    atp: dataItem?.data_soal?.kd_id,
                                                                    soal_id:dataItem?.data_soal?.idbaris,
                                                                    
                                                                    respon:null,
                                                                    skor:0
                                                                } as RisponsePenilaianSiswa;
                                                               
                                                                return (
                                                                    <li
                                                                        key={indexSoal +"_"+ (dataItem?.data_soal?.idbaris ?? 0)}
                                                                        
                                                                        className="cursor-pointer align-top mb-3"
                                                                    >
                                                                        {
        
                                                                            dataItem && <FormITemSoalOnline data={dataItem} dataRespon={dataRespon} no_prefix={indexSoal+1} handleChange={handleChange}/>
                                                                        }
        
                                                                    </li>
                                                                )
                                                            }
                                                        )}
                                                    </ol>
                                                </li>
                                            )
                                        }
                                    )
                                }
                            </ol>
                            
                        </div>
                    
                
    )
}