import {useCallback, useEffect, useMemo, useState, type ChangeEvent, type SetStateAction} from 'react';
import { InputText } from '~/components/fields/fields';
import { TdEdura, ThEdura, TRowEdura } from '~/components/tabels/tabel-components';
import TableWithScrolling from '~/components/tabels/table-with-scrolling';
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar"
import { Field } from '~/components/ui/field';
import { useAppSelector } from '~/context-reduct/hook';
import { AtpHasManySoalSelector, KoleksiSoalInstanceSelector } from '~/context-reduct/selectores/bank-soal-selector';
import { CurrentMapelInActiveRombel } from '~/context-reduct/selectores/mapel-rombel-selector';
import { OrmPromesInstanceSelector } from '~/context-reduct/selectores/orm-promes-selector';
import QueryAtpHasItemSoal from '~/domain/bank-soal/relational-soal/services/query-atp-has-many-soal';
import type { AtpHasManySoalType } from '~/domain/bank-soal/relational-soal/type';
import {type PraSettingPaket } from "~/domain/paket-soal/entities/pra-setting-paket"
import { getNumberFromString } from '~/lib/get-number';

export default function ToolbarContentKurikulum(){
    const mapelSelector = useAppSelector(CurrentMapelInActiveRombel);
    const dataKurikulum = useAppSelector(OrmPromesInstanceSelector);
    const kurikulumHasManySoal = useAppSelector(AtpHasManySoalSelector)
    const currentJenjang = useAppSelector(s=>getNumberFromString(s.fokusRombel.value))
    const {value:data, updateExtra} = useFilterContext<PraSettingPaket>();
    const [isMultiMapel, setIsMultiMapel] = useState<boolean>(data.extra?.koleksi_mapel?.isMultiple ?? false);
    const [koleksiMapel, setKoleksiMapel] = useState<string[]>(data.extra?.koleksi_mapel?.data ??[]);
    const [koleksiAtp, setKoleksiAtp] = useState<AtpHasManySoalType[]>(data.extra?.kurikulum ?? []);
    
    const handleMultiple = (e:ChangeEvent<HTMLInputElement>)=>{
        const {checked} = e.currentTarget;
        setIsMultiMapel(checked);
        setKoleksiMapel(prev=>{
            if(prev.length > 1){
                return prev.slice(0, 1);
            }
            return prev
        });
        setKoleksiAtp([]);
    }
    
    const handleIdentitasMultiMapel =(e:ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.currentTarget;
        updateExtra(draft=>{
            draft.identitas = {...draft.identitas, dataIdentitas:value}
        })
    }

    const handleCheckedMapel = (e:ChangeEvent<HTMLInputElement>) =>{
        const {type, checked, value} = e.currentTarget;
        const mapelKoleksi = checked ? [...koleksiMapel, value] : koleksiMapel.filter(s=> s!==value);
        if(type === 'checkbox'){
            setKoleksiMapel(mapelKoleksi)
            setKoleksiAtp(prev=>prev.filter(s=>s.mapelname && mapelKoleksi.includes(s.mapelname)));
        }else{
            setKoleksiMapel([value]);
            setKoleksiAtp(prev=>prev.filter(s=>s.mapelname === value));
        }
    }

    const koleksiMapelMemo = useMemo(()=>{
                return {isMultiple:isMultiMapel, data:koleksiMapel}
    }, [isMultiMapel, koleksiMapel]);;

    const kurikulumKelasUI = useMemo(()=>{
        
        if(!kurikulumHasManySoal) return [];
        const dataGroup = kurikulumHasManySoal.dataGroup;
        const query = new QueryAtpHasItemSoal(dataGroup).filteringMapel(...koleksiMapel).get();//.filteringKelas(currentJenjang).get();
        
        return query
    },[kurikulumHasManySoal, koleksiMapel, currentJenjang]);

    useEffect(()=>{
        
        updateExtra(draft=>{
            draft.koleksi_mapel = koleksiMapelMemo;
        })
    }, [koleksiMapelMemo, updateExtra]);
    
    const checkedCollectionAtp = useCallback(( checked:boolean, value:AtpHasManySoalType,)=>{
        const newKoleksi = checked ? [...koleksiAtp, value] : koleksiAtp.filter(s=>s.atp_as_tp_id !== value.atp_as_tp_id);
        setKoleksiAtp(newKoleksi)
    }, [koleksiAtp, setKoleksiAtp])

    useEffect(()=>{
        updateExtra(draft=>{
            draft.kurikulum = koleksiAtp;
        })  
    }, [koleksiAtp, updateExtra]);

    
    return (
        <div className="grid md:grid-cols-3 grid-cols-1 bg-linear-to-br from-sky-400 to-sky-300  dark:from-sky-800 dark:to-sky-700 px-1 py-6 gap-1">
            <div className='inner-shadow-sky-700 text-xs md:col-span-1 border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-lg outline-ring py-2 px-2'>
                <div className='mt-4 relative border shadow shadow-sky-100 rounded min-h-12'>
                    <div className='absolute -top-4 left-0 ps-1 pe-4 bg-white dark:bg-sky-700 dark:text-sky-100 rounded-tr-2xl'>Koleksi Mapel</div>
                    <Field orientation="horizontal" className='absolute -top-4 right-0 ps-4 pe-1 w-fit rounded-tl-2xl bg-white dark:bg-sky-700 dark:text-sky-100'>
                        <input type="checkbox" id="is-multiple" checked={isMultiMapel} onChange={handleMultiple}/>
                        <label htmlFor='is-multiple' className='w-full'>Lintas Mapel</label>
                    </Field>
                    <div className='px-2 text-[10px] align-top leading-4'>
                        {
                            mapelSelector.data.map((mapel, index)=>
                                <Field orientation="horizontal" key={'id_'+mapel.kode+'_'+index} className=' dark:bg-sky-700 dark:text-sky-100'>
                                    <input id={'id_'+mapel.kode+'_'+index} className='h-3 w-3' type={isMultiMapel?'checkbox':'radio'} value={mapel.nama_mapel} checked={koleksiMapel.includes(mapel.nama_mapel)} name="mapel_kolection" onChange={handleCheckedMapel}/>
                                    <label htmlFor={'id_'+mapel.kode+'_'+index} className='border-b w-full'>{mapel.nama_mapel}</label>
                                </Field>
                            )
                        }
                    </div>
                </div>
                {
                    isMultiMapel && (
                        <div className='mt-4'>Untuk Lintas Mata Pelajaran, identitas paket menggunakan Tema, sialakan isi nama tema di sini:
                            <Field className='relative mt-4'>
                                <InputText label="Tema:" type='text' value={data.extra?.identitas.dataIdentitas ?? ''} onChange={handleIdentitasMultiMapel}/>
                            </Field>
                        </div>
                    )
                }
            </div>
            <div className='inner-shadow-sky-700 text-xs md:col-span-2 max-h-[calc(100vh-22rem)] border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-lg outline-ring py-2 px-2 overflow-y-auto scrol-h-custom'>
                Tujuan Pembelajaran: {!isMultiMapel && koleksiMapel.join()}
                <TableWithScrolling className='text-[10px]'>
                    <thead>
                        <TRowEdura>
                            {
                                isMultiMapel 
                                ? (
                                    <>
                                        <ThEdura>Mapel</ThEdura>
                                        <ThEdura className="text-wrap text-[10px]">Capaian Pembelajaran (TP)</ThEdura>
                                        <ThEdura className="text-wrap text-[10px]">Tujuan Pembelajaran (ATP)</ThEdura>
                                        <ThEdura className="text-wrap text-[10px]">Ketersediaan Soal</ThEdura>
                                        <ThEdura>Pilih</ThEdura>
                                    </>
                                ):(
                                    <>
                                        <ThEdura className="text-wrap text-[10px]">Capaian Pembelajaran (TP)</ThEdura>
                                        <ThEdura className="text-wrap text-[10px]">Tujuan Pembelajaran (ATP)</ThEdura>
                                        <ThEdura className="text-wrap text-[10px]">Ketersediaan Soal</ThEdura>
                                        <ThEdura>Pilih</ThEdura>
                                    </>
                                )
                            }
                        </TRowEdura>
                    </thead>
                    <tbody>
                        {
                            isMultiMapel
                            ? (
                                kurikulumKelasUI.map((mapel, index)=>
                                    mapel.hasTp.map((tp, iTp)=>
                                        tp.hasAtp.map((atp, iAtp)=>
                                            <TRowEdura key={index+'_'+iTp+'_'+iAtp} className="[&:has(:checked)>td]:bg-amber-300">
                                                {
                                                    (iTp === 0 && iAtp === 0) && (
                                                        <TdEdura className='text-wrap' rowSpan={mapel.countAtp}>{mapel.mapelName}</TdEdura>
                                                    )
                                                }
                                                {
                                                    (iAtp === 0) &&(<TdEdura className='text-wrap' rowSpan={tp.hasAtp.length}>{tp.tp_description}</TdEdura>)

                                                }
                                                <TdEdura className='text-wrap'>({atp.kelas.join(' dan ')}) {atp.atp_description}</TdEdura>    
                                                <TdEdura className='text-wrap peer-has-checked:bg-amber-300'>
                                                    {
                                                        atp.hasSoal.map(({bentukSoal, data},iSoal)=><div className='flex justify-between' key={iSoal}><span>{bentukSoal.shortName}: </span><span>{data.length}</span></div>)
                                                    }
                                                </TdEdura>
                                                <TdEdura className='align-middle'>
                                                    <input 
                                                        type="checkbox" 
                                                        className="peer" 
                                                        id={'atp_'+atp.atp_id} 
                                                        value={atp.atp_id}
                                                        checked={koleksiAtp.some(s=>s.atp_as_tp_id === atp.atp_id)}
                                                        onChange={(e)=>checkedCollectionAtp(e.currentTarget.checked, atp.source)}
                                                        />
                                                </TdEdura>
                                            </TRowEdura>
                                        )
                                    )
                                )
                            ):(
                                kurikulumKelasUI.map((mapel, index)=>
                                    mapel.hasTp.map((tp, iTp)=>
                                        tp.hasAtp.map((atp, iAtp)=>
                                            <TRowEdura key={index+'_'+iTp+'_'+iAtp} className="[&:has(:checked)>td]:bg-amber-300">
                                                {
                                                    (iAtp === 0) &&(<TdEdura className='text-wrap' rowSpan={tp.hasAtp.length}>{tp.tp_description}</TdEdura>)

                                                }
                                                <TdEdura className='text-wrap'>({atp.kelas.join(' dan ')}) {atp.atp_description}</TdEdura>  
                                                <TdEdura className='text-wrap'>
                                                    {
                                                        atp.hasSoal.map(({bentukSoal, data},iSoal)=><div className='flex justify-between' key={iSoal}><span>{bentukSoal.shortName}: </span><span>{data.length}</span></div>)
                                                    }
                                                </TdEdura>  
                                                <TdEdura className='align-middle'>
                                                    <input 
                                                        type="checkbox" 
                                                        className="peer" 
                                                        id={'atp_'+atp.atp_id} 
                                                        value={atp.atp_id}
                                                        checked={koleksiAtp.some(s=>s.atp_as_tp_id === atp.atp_id)}
                                                        onChange={(e)=>checkedCollectionAtp(e.currentTarget.checked, atp.source)}
                                                        />
                                                </TdEdura>  
                                            </TRowEdura>
                                        )
                                    )
                                )
                            )
                        }
                    </tbody>
                </TableWithScrolling>
            </div>
        </div>
    )
}