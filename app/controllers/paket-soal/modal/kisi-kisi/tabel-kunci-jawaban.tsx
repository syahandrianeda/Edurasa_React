import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type DataKisiKisi from "~/domain/paket-soal/infrastructure/data-kisi-kisi-class";
import {Fragment, useMemo} from 'react'
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import PreviewKunciJawaban from "~/controllers/koleksi-bank-soal/views/preview-kunci-jawaban-pembahasan";
type Props = {
    KisiKisiInstance?:DataKisiKisi

}
export default function TableKunciJawabanPembahasan({ KisiKisiInstance}:Props){
    const KisikisiMappingMapel = useMemo(()=>{
            if(!KisiKisiInstance)  return [];
            return KisiKisiInstance.dataKontenSoal
        }, [KisiKisiInstance]);
    return (
        
            <ol className="list-[upper-roman] list-outside ps-4 text-[10px] mb-4">
                {
                    KisikisiMappingMapel?.map((data, index)=>
                        <li key={index} className="mb-4">
                            <h3 className="font-bold">{data.bentukSoal.description}</h3>
                            <p>Cara Koreksi: {data.bentukSoal.way_correction}</p>
                            <TableWithScrolling inModal={true} className="text-[10px]">
                                <thead>
                                    <TRowEdura>
                                        <ThEdura className="text-wrap w-5">No. Soal</ThEdura>
                                        {
                                            ['pg', 'pg_kompleks', 'menjodohkan'].includes(data.bentukSoal.name) && (
                                                <ThEdura className="text-wrap">Kunci Jawaban</ThEdura>
                                            )
                                        }
                                        
                                        <ThEdura>Pembahasan / Penskoran</ThEdura>
                                        <ThEdura className="text-wrap">Skor Maksimal (Skala 0-100)</ThEdura>
                                    </TRowEdura>
                                </thead>
                                <tbody>
                                    {
                                        data?.dataSoal?.map((soal, iSoal)=>
                                            <TRowEdura key={iSoal}>
                                                <TdEdura className="text-center ">{soal.no_soal}.</TdEdura>
                                                {
                                                     ['pg', 'pg_kompleks'].includes(data.bentukSoal.name) && (
                                                            <TdEdura className="text-wrap text-center max-w-5">{soal.data_soal?.jawaban.join(', ')}</TdEdura>
                                                        )
                                                }
                                                {
                                                     data.bentukSoal.name === 'menjodohkan' && (
                                                            <TdEdura className="text-wrap">
                                                                {
                                                                    (soal.data_soal?.jawaban as string[][]).map((jodoh, iJodoh)=><p key={iJodoh}>{jodoh.join(' = ')}</p>)
                                                                }
                                                            </TdEdura>
                                                        )
                                                }
                                                <TdEdura className="text-wrap">
                                                     {soal.data_soal && <div dangerouslySetInnerHTML={{__html:soal.data_soal?.pembahasan_penskoran}} className='text-wrap'/>}
                                                </TdEdura>
                                                <TdEdura className="text-center w-24">100</TdEdura>
                                            </TRowEdura>
                                        )
                                    }
                                </tbody>
                            </TableWithScrolling>
                        </li>
                    )
                }
            </ol>
            
       
    )
}