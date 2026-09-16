import type DataKisiKisi from "~/domain/paket-soal/infrastructure/data-kisi-kisi-class";
import {useMemo} from 'react';
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import type { DataSoalDesign } from "~/domain/paket-soal/result/session-soal";
import SoalItemFlex from "~/controllers/bank-soal/modal/soal-item-flex";
import { formatCurrency } from "~/lib/currency-format";

export default function  CaraPenskoran({KisiKisiInstance}:{KisiKisiInstance:DataKisiKisi}){
     const KisikisiMappingMapel = useMemo(()=>{
                if(!KisiKisiInstance)  return [];
                return KisiKisiInstance.generateKoleksiNoSoalPaket()
            }, [KisiKisiInstance]);
    return (
        <div>
            <h4 className="font-bold text-[10px]">Data Sebaran Kompentensi Soal</h4>
            {
                KisikisiMappingMapel.map((mapel, iMapel)=>
                    <TableWithScrolling inModal={true} key={iMapel} className="text-[8px]">
                        <thead>
                            <TRowEdura>
                                <ThEdura className="capitalize" rowSpan={2}>Mata Pelajaran</ThEdura>
                                <ThEdura rowSpan={2}>CP</ThEdura>
                                <ThEdura rowSpan={2}>TP</ThEdura>
                                <ThEdura rowSpan={2}>ATP</ThEdura>
                                <ThEdura className="text-wrap capitalize" colSpan={mapel.koleksiBentukSoal.length}>Sebaran no. Soal pada Bentuk Soal</ThEdura>
                                <ThEdura rowSpan={2} className="text-wrap capitalize">Skor Maksimal</ThEdura>
                            </TRowEdura>
                            <TRowEdura>
                                {
                                    mapel.koleksiBentukSoal.map((short_mapel, iShortMapel)=>
                                        <ThEdura className="capitalize" key={iShortMapel}>{short_mapel}</ThEdura>
                                    )
                                }
                            </TRowEdura>
                        </thead>
                        <tbody>
                            {
                                mapel.dataCp.map((cp, iCp)=>
                                    cp.dataTp.map((tp, iTp)=>
                                        tp.dataAtp.map((atp, iAtp)=>
                                            <TRowEdura key={iMapel + '' + iCp + ''+iTp+ ''+iAtp} className="odd:bg-white even:bg-white dark:text-black">
                                                {
                                                    iCp === 0 && iTp === 0 && iAtp === 0 && (
                                                        <TdEdura rowSpan={mapel.countRowMapel} className="text-wrap">{mapel.mapelName}</TdEdura>
                                                    )
                                                }        
                                                {
                                                     iTp === 0 && iAtp === 0 && (
                                                        <TdEdura rowSpan={cp.countRowCp} className="text-wrap"><p className="font-bold">{cp.elemen}</p>{cp.cp_description}</TdEdura>
                                                    )
                                                }  
                                                {
                                                    iAtp === 0 && (
                                                        <TdEdura rowSpan={tp.countRowTp} className="text-wrap">{tp.tp_description}</TdEdura>
                                                    )
                                                }    
                                                <TdEdura className="text-wrap">{atp.atp_description}</TdEdura>
                                               
                                                {
                                                    mapel.koleksiBentukSoal.map((bentukSoal, iBentukSoal)=>{
                                                        const noSoalCollection = atp.dataBentukSoal.find(s=>s.nameBentukSoal === bentukSoal);
                                                        return (
                                                            <TdEdura key={iBentukSoal}>{noSoalCollection?.noSoal?.join(',')}</TdEdura>
                                                        )
                                                    })
                                                }
                                                <TdEdura className="text-end font-bold">{formatCurrency(atp.skorMaksimalAtp)}</TdEdura>
                                            </TRowEdura>
                                        )
                                    )
                                )
                            }
                        </tbody>
                    </TableWithScrolling>
                )
            }
        </div>
    )
}