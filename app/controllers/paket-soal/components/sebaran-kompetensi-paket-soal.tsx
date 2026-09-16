import { TRowEdura, ThEdura, TdEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type { PaketSoalDesign } from "~/domain/paket-soal/result/paket-soal";
import {useMemo} from 'react';
import DataKisiKisi from "~/domain/paket-soal/infrastructure/data-kisi-kisi-class";
import type { SebaranPropertyKurikulumNoSoalPaket } from "~/domain/paket-soal/entities/sebaran-property-no-soal-paket";

export default function TableSebaranKompetensiPaketSoal({paketSoal}:{paketSoal:PaketSoalDesign}){
     const KisikisiMappingMapel:SebaranPropertyKurikulumNoSoalPaket[] = useMemo(()=>{
            if(!paketSoal) return []
    
            return new DataKisiKisi(paketSoal).generateKoleksiNoSoalPaket();
            },[paketSoal]);
    const isMultiple = paketSoal.setting?.koleksi_mapel?.isMultiple!!

    const bentukSoal = [...new Set([...KisikisiMappingMapel.map(m=>m.koleksiBentukSoal).flat()])]
    return (
        <TableWithScrolling className="text-8/12 text-[8px]">
            <thead>
                <TRowEdura>
                    {isMultiple && <ThEdura className="capitalize" rowSpan={2}>Mata Pelajaran</ThEdura>}
                    <ThEdura rowSpan={2}>CP</ThEdura>
                    <ThEdura rowSpan={2}>TP</ThEdura>
                    <ThEdura rowSpan={2}>ATP</ThEdura>
                    <ThEdura className="text-wrap capitalize" colSpan={bentukSoal.length}>Sebaran no. Soal pada Bentuk Soal</ThEdura>
                    
                </TRowEdura>
                <TRowEdura>
                    {
                        bentukSoal.map((short_mapel, iShortMapel)=>
                            <ThEdura className="capitalize" key={iShortMapel}>{short_mapel}</ThEdura>
                        )
                    }
                </TRowEdura>
            </thead>
            <tbody>
                {
                    KisikisiMappingMapel.map((mapel, iMapel)=>
                        mapel.dataCp.map((cp, iCp)=>
                            cp.dataTp.map((tp, iTp)=>
                                tp.dataAtp.map((atp, iAtp)=>
                                    <TRowEdura key={iMapel + '' + iCp + ''+iTp+ ''+iAtp} className="odd:bg-white even:bg-white dark:text-black">
                                        {
                                            iCp === 0 && iTp === 0 && iAtp === 0 && isMultiple && (
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
                                        
                                    </TRowEdura>
                                )
                            )
                        )
                    )
                }
            </tbody>
        </TableWithScrolling>
    )
}