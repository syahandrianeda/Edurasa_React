import {Fragment, useCallback, useEffect, useMemo, useState, type ChangeEvent} from 'react';
import { useFormEdura } from "~/components/form-custom/form-edura";
import { TdEdura, TRowEdura } from '~/components/tabels/tabel-components';
import TableWithScrolling from '~/components/tabels/table-with-scrolling';
import GroupedAtpHasManySOal from "~/domain/bank-soal/relational-soal/services/grouping-soal-atp-has-many-soal";
import type { AtpHasManySoalType } from "~/domain/bank-soal/relational-soal/type";
import {type DisplayFormatItemSoal } from "~/domain/paket-soal/result/display-format-item-soal";
import type { BankSoalAppType } from '~/types/bank-soal/bank-soal-type';
import PaginationSoalProvider from './pagination-soal-provider';
import ModalFooterButtonTambahBaruItemSoal from './footer-button-tambah-baru-item-soal';
import { useAppSelector } from '~/context-reduct/hook';
import { AtpHasManySoalSelector } from '~/context-reduct/selectores/bank-soal-selector';

export default function SidebarKurikulumControl({
    data, 
    koleksiSoalHasImplemented, 
    triggerUpsert
}:{
    data:AtpHasManySoalType[], 
    koleksiSoalHasImplemented: DisplayFormatItemSoal[],
    triggerUpsert:(v:DisplayFormatItemSoal)=>void
}){
    const {currentData} = useFormEdura<DisplayFormatItemSoal>();
    const [itemAtpSelected, setItemAtpSelected] = useState<AtpHasManySoalType>();
    const KurikulumHasMany = useAppSelector(AtpHasManySoalSelector)
    
    
    const displayKurikulum = useMemo(()=>{
        if(!data || !KurikulumHasMany) return []
        
        const updateData =  KurikulumHasMany.data.filter(s=>data.map(m=>m.atp_as_tp_id).includes(s.atp_as_tp_id));
        return GroupedAtpHasManySOal.buildGroup(updateData)
    },[data])
    
    const koleksiIdSoalHasImplemented = useMemo(()=>{
        return koleksiSoalHasImplemented.map(m=>m.data_soal?.idbaris ?? 0);
    }, [koleksiSoalHasImplemented]);

    const koleksiSoal = useMemo(
        ()=>{
            let idSoalHasImplemented:number[]=koleksiIdSoalHasImplemented
            
            const yetImplemented =  itemAtpSelected?.hasSoal .filter(s=>
                                                s.bentuk_soal === currentData.bentuk_soal?.name &&
                                                !idSoalHasImplemented.includes(s.idbaris)
                                            );
            
           if (currentData.data_soal) {
                if (itemAtpSelected?.atp_as_tp_id === currentData.data_soal.kd_id) {
                    return [
                        currentData.data_soal,
                        ...(yetImplemented ?? [])
                    ];
                }

                return yetImplemented
            }

            return yetImplemented;
            
        }, [itemAtpSelected, currentData.bentuk_soal?.name, currentData.data_soal, koleksiIdSoalHasImplemented, data])
    
    const handleSelectAtp = useCallback((checked:boolean, atp:AtpHasManySoalType)=>{
        if(checked){
            setItemAtpSelected(atp);
        }

    },[]);

    const countSoalHasImplemented = useCallback((dataSource:BankSoalAppType[])=>{
        
            return dataSource.map(m=>m.idbaris).filter(s=>koleksiIdSoalHasImplemented.includes(s)).length
    },[koleksiIdSoalHasImplemented])

    useEffect(()=>{
        if(currentData.data_soal?.kd_id){
            const currentAtp = data.find(s=>s.atp_as_tp_id === currentData.data_soal?.kd_id);
            setItemAtpSelected(currentAtp)
            return;
        }
        setItemAtpSelected(data[0])
    }, [])
    
       
    return (
        <>
            <div className="max-h-[calc(100vh-4rem)] h-[calc(100vh-3rem)] md:h-[calc(100vh-12rem)] flex justify-center items-stretch">
                <div className="w-2/6 p-1 overflow-y-auto scrol-h-custom">
                <TableWithScrolling inModal={true} className='text-[8px]'>
                    <tbody>
                        {
                            displayKurikulum.map((mapel, index)=>
                                <Fragment key={index}>
                                    <TRowEdura>
                                        <TdEdura colSpan={4} className='text-center'>{mapel.mapelName}</TdEdura>
                                    </TRowEdura>
                                    <TRowEdura>
                                        <TdEdura className='text-center text-wrap'>CP</TdEdura>
                                        <TdEdura className='text-center text-wrap'>TP</TdEdura>
                                        <TdEdura className='text-center text-wrap'>Ketersediaan</TdEdura>
                                        <TdEdura className='text-center text-wrap'>Pilih</TdEdura>
                                    </TRowEdura>
                                    {
                                        mapel.hasTp.map((tp, iTp)=>
                                            tp.hasAtp.map((atp, iAtp)=>
                                                <TRowEdura key={index+'_'+iTp+'_'+iAtp} className="[&:has(:checked)>td]:bg-amber-300">
                                                    {
                                                        (iAtp === 0) &&(<TdEdura className='text-wrap' rowSpan={tp.hasAtp.length}>{tp.tp_description}</TdEdura>)

                                                    }
                                                    <TdEdura className='text-wrap'>({atp.kelas.join(' dan ')}) {atp.atp_description}</TdEdura>    
                                                    <TdEdura className='text-nowrap peer-has-checked:bg-amber-300 w-3/12'>
                                                        {
                                                            atp.hasSoal.map(({bentukSoal, data},iSoal)=>
                                                                <div className={`flex border-b border-dashed border-gray-400 justify-between ${(data.length === countSoalHasImplemented(data))?'text-rose-500 font-bold':(bentukSoal.name === currentData.bentuk_soal?.name) ?'font-bold text-green-800':'text-yellow-500'}`} key={iSoal}>
                                                                    <span>{bentukSoal.shortName}: </span>
                                                                    <span>{data.length}/{countSoalHasImplemented(data)}</span>
                                                                </div>)
                                                        }
                                                    </TdEdura>
                                                    <TdEdura className='align-middle'>
                                                        <input 
                                                            type="radio" 
                                                            className="peer" 
                                                            name='select_atp'
                                                            id={'atp_'+atp.atp_id} 
                                                            value={atp.atp_id}
                                                            checked={itemAtpSelected?.atp_as_tp_id === atp.atp_id}
                                                            onChange={(e)=>handleSelectAtp(e.currentTarget.checked, atp.source)}
                                                            />
                                                    </TdEdura>
                                                </TRowEdura>
                                            )
                                        )
                                        
                                    }
                                </Fragment>
                            )
                        }
                    </tbody>
                </TableWithScrolling>
                </div>
                <div className="flex-2 overflow-y-auto scrol-h-custom">
                    <PaginationSoalProvider data={koleksiSoal ?? []} trigger={triggerUpsert}/>
                </div>
            </div>
            {
                itemAtpSelected && (
                    <ModalFooterButtonTambahBaruItemSoal currentData={currentData} AtpAsOrm={itemAtpSelected}/>
                )
            }
        </>
    )
}