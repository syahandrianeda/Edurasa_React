import * as React from 'react';
import type { dataColum, ttdKontenType } from './config-ttd';
import { SampleKontenTtdType } from './default-ttd';
import { useAppSelector } from '~/context-reduct/hook';
import type{ kopKontentType } from './config-kop';
import { SampleDefaultKontenKop } from './default-kop';
import { cn } from '~/lib/utils';
import { DAERAH_INDUK, IDENTITAS_SEKOLAH } from '~/domain/identitas_sekolah/identitas-sekolah';

export type ToolbarKopTtdType={
    configTtd: readonly ttdKontenType[];
    ttdType: ttdKontenType | null;
    setTtdType: (value: ttdKontenType) => void;
    configKop: readonly kopKontentType[],
    kopType: kopKontentType | null,
    setKopType: (value:kopKontentType)=>void;

}

export const ToolbarKopTtdContext = React.createContext<ToolbarKopTtdType|undefined>(undefined);

export function useToolbarKopTtd() {
    const context = React.useContext(ToolbarKopTtdContext);
    if(!context){
        throw new Error('should be use ToolbarTTdProvider');
    }
    return context;
}

export interface ToolbarKopTtdProps{
    children: React.ReactNode,
    configTtd?: ttdKontenType[],
    configKop?: kopKontentType[],
}

export function ToolbarKopTtdProvider({
    children,
    configTtd = SampleKontenTtdType,
    configKop = SampleDefaultKontenKop
}:ToolbarKopTtdProps){
    const user = useAppSelector((state)=> state.auth.user);
    const userRole = user?.roles;
    
    /** === setting Ttd === */ 
    const [ttdType, setTtdType] = React.useState<ttdKontenType|null>(null);

    React.useEffect(()=>{
        if (!userRole) return;

        const defaultTtd = configTtd.find((item) =>
        item.forRole.includes(userRole)
        );

        setTtdType(defaultTtd ?? null);
    },[userRole, configTtd]);

    const handleSetTtdType = React.useCallback((value: ttdKontenType) => {
            setTtdType(value);
        }, []);
    
    /** === setting Kop */
    const [kopType, setKopType] = React.useState<kopKontentType|null>(null);
    React.useEffect(()=>{
        const defaultKop = configKop.find((item)=>item.type === 'none');
        
        setKopType(defaultKop ?? null);
        
    },[])

    const handleSetKopType = React.useCallback((value:kopKontentType)=>{
        setKopType(value);
    },[])

    const value = React.useMemo<ToolbarKopTtdType>(
    ()=>(
        {
            ttdType,
            setTtdType: handleSetTtdType,
            configTtd,
            kopType,
            setKopType: handleSetKopType,
            configKop,
            
            
        }
    ),[
        ttdType, 
        handleSetTtdType,
        configTtd,
        kopType,
        setKopType,
        configKop,
        handleSetKopType,
            
    ]);

    return (
        <ToolbarKopTtdContext.Provider value={value}>
            {children}
        </ToolbarKopTtdContext.Provider>
    )
}

export function TtdCollectionTrigger(){
    const {configTtd, ttdType, setTtdType} = useToolbarKopTtd()
    return (
        <div className="bg-linear-to-br from-sky-300 to-sky-200  dark:from-sky-800 dark:to-sky-700 grid grid-cols-1 md:grid-cols-2 px-2 py-6 gap-1">
            <div className='relative flex flex-col ps-2 inner-shadow-sky-700  border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-t-lg rounded-bl-lg border-b-none border-e-none'>
                <div className='absolute top-0 -translate-y-6 left-1 w-fit bg-linear-to-bl px-2 from-sky-400 to-sky-300  dark:from-sky-800 dark:to-sky-700 rounded-t-lg inner-shadow-sky-800 shadow-2xl border-t shadow-sky-100' >Tanda tangan ({configTtd.length} tipe)</div>
                <div className='mt-2'>
                    {configTtd.map((m,index)=>(
                        <div key={index} className='flex justify-start items-center w-full gap-2'>
                            <input 
                                name="ttd" 
                                type="radio" 
                                id={`ttd_${m.type}`} 
                                value={m.type}
                                checked = {ttdType?.type === m.type}
                                onChange={()=>setTtdType(m)}
                                />
                            <label htmlFor={`ttd_${m.type}`}>
                                {m.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className='inner-shadow-sky-700  border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-lg outline-ring p-4'>
                {ttdType && ttdType?.description}
            </div>
            
        </div>
    )
}

export function KopCollectionTrigger(){
    const {configKop, kopType, setKopType} = useToolbarKopTtd()
    return (
        <div className="bg-linear-to-br from-sky-300 to-sky-200  dark:from-sky-800 dark:to-sky-700 grid grid-cols-1 md:grid-cols-2 px-2 py-6 gap-1">
            <div className='relative flex flex-col ps-2 inner-shadow-sky-700  border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-t-lg rounded-bl-lg border-b-none border-e-none'>
                <div className='absolute top-0 -translate-y-6 left-1 w-fit bg-linear-to-bl px-2 from-sky-400 to-sky-300  dark:from-sky-800 dark:to-sky-700 rounded-t-lg inner-shadow-sky-800 shadow-2xl border-t shadow-sky-100' >Kepala Surat (KOP ada {configKop.length} tipe)</div>
                <div className='mt-2'>
                    {configKop.map((m,index)=>(
                        <div key={index} className='flex justify-start items-center w-full gap-2'>
                            <input 
                                name="kop" 
                                type="radio" 
                                id={`kop_${m.type}`} 
                                value={m.type}
                                checked = {kopType?.type === m.type}
                                onChange={()=>setKopType(m)}
                                />
                            <label htmlFor={`kop_${m.type}`}>
                                {m.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className='inner-shadow-sky-700  border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-lg outline-ring p-4'>
                {kopType && kopType?.description}
            </div>
            
        </div>
    )
}

export function KomponenTtd({type, dataColumns}:ttdKontenType){
    if(type === 'none') return null;
    const columns = dataColumns ?? [];
    const left = columns.find(s=>s.side === 'left');
    const middle = columns.find(s=>s.side === 'middle');
    const right = columns.find(s=>s.side === 'right');
    return (
        <table className='table table-borderless w-full mt-14'> 
            <tbody>
                <tr>
                    {dataColumns?.length === 1?(
                            <>
                                <td className='w-full'></td>
                                <td className='w-fit text-nowrap align-top'>
                                    <KontenTopTtd side={right?.side} typePerson={right?.typePerson}/>
                                        {
                                            [...Array(right?.countBreak)].map((item,i)=>(
                                                <br key={i}/>
                                            ))
                                        }
                                    <KontenBottomTtd side={right?.side} typePerson={right?.typePerson}/>
                                </td>
                            </>
                        ):(
                            <>
                            
                            { left && 
                                <td className='w-fit text-nowrap align-top'>
                                    <KontenTopTtd side={left?.side} typePerson={left?.typePerson}/>
                                        {
                                            [...Array(left?.countBreak)].map((item,i)=>(
                                                <br key={i}/>
                                            ))
                                        }
                                    <KontenBottomTtd side={left?.side} typePerson={left?.typePerson}/>
                                </td>
                            }
                            { middle ?(

                                    <td className='w-full text-nowrap align-top'>
                                        <KontenTopTtd side={middle?.side} typePerson={middle?.typePerson}/>
                                            {
                                                [...Array(middle?.countBreak)].map((item,i)=>(
                                                    <br key={i}/>
                                                ))
                                            }
                                        <KontenBottomTtd  side={middle?.side} typePerson={middle?.typePerson}/>
                                    </td>
                                ):(
                                    <td className='w-full'></td>
                                ) 
                            }
                            { right && 
                                <td className='w-fit text-nowrap align-top'>
                                    <KontenTopTtd side={right?.side} typePerson={right?.typePerson}/>
                                        {
                                            [...Array(right?.countBreak)].map((item,i)=>(
                                                <br key={i}/>
                                            ))
                                        }
                                    <KontenBottomTtd  side={right?.side} typePerson={right?.typePerson}/>
                                </td>
                            }
                            </>
                        )
                    }
                </tr>
            </tbody>
        </table>
    )
}

export function KontenTopTtd({side, typePerson}:Partial<dataColum>){
    const saya = useAppSelector(state => state.auth.user);
    const fokusRombel = useAppSelector(state=> state.fokusRombel.value);
    const jabatan_saya = saya?.roles;
    const kodemapel = saya?.kode_mapel_ampu;
    let pertama = null;

    let kedua = jabatan_saya;
    if(side === 'right'){
        pertama = `${DAERAH_INDUK}, ${new Date().toLocaleDateString('id-ID',{
                            dateStyle:'long'
                        })}`;
        if(typePerson==='Kepala Sekolah'){
            kedua = 'Kepala ' + IDENTITAS_SEKOLAH;
        }
        if(typePerson === 'saya'){
            if(jabatan_saya === 'Kepala Sekolah'){
                kedua = 'Kepala ' + IDENTITAS_SEKOLAH;
            }else if(jabatan_saya === 'Guru Kelas'){
                kedua = jabatan_saya +' ' + fokusRombel;
            }else if(jabatan_saya === 'Guru Mapel'){
                kedua = 'Guru Bidang Studi '+ <br/> + kodemapel;
            }else{
                kedua = jabatan_saya;
            }
            
        }
        if(typePerson === 'ortu'){
            kedua = 'Orang Tua/Wali (Forkom/Korlas)'
        }
        if(typePerson === 'walas'){
            kedua = 'Guru Kelas ' + fokusRombel;
        }
    };
    if(side === 'left'){
        
        if(typePerson==='Kepala Sekolah'){
            pertama = 'Mengetahui,'
            kedua = 'Kepala ' + IDENTITAS_SEKOLAH;
        }
        if(typePerson === 'saya'){
            if(jabatan_saya === 'Kepala Sekolah'){
                pertama = 'Mengetahui,'
                kedua = 'Kepala ' + IDENTITAS_SEKOLAH;
            }else if(jabatan_saya === 'Guru Kelas'){
                pertama = null;
                kedua = jabatan_saya +' ' + fokusRombel;
            }else if(jabatan_saya === 'Guru Mapel'){
                pertama = 'Guru Bidang Studi ';
                kedua = kodemapel;
            }else{
                pertama = null
                kedua = jabatan_saya;
            }
            
        }
        if(typePerson === 'ortu'){
            pertama = 'Orang Tua/Wali'
            kedua = '(Forkom/Korlas)'
        }
        if(typePerson === 'walas'){
            pertama = null;
            kedua = 'Guru Kelas ' + fokusRombel;
        }
    };
    if(side === 'middle'){
        
        if(typePerson==='Kepala Sekolah'){
            pertama = 'Kepala'
            kedua = '' + IDENTITAS_SEKOLAH;
        }
        if(typePerson === 'saya'){
            if(jabatan_saya === 'Kepala Sekolah'){
                pertama = 'Kepala'
                kedua = '' + IDENTITAS_SEKOLAH;
            }else if(jabatan_saya === 'Guru Kelas'){
                pertama = <br/>;
                kedua = jabatan_saya +' ' + fokusRombel;
            }else if(jabatan_saya === 'Guru Mapel'){
                pertama = 'Guru Bidang Studi ';
                kedua = kodemapel;
            }else{
                pertama = <br/>
                kedua = jabatan_saya;
            }
            
        }
        if(typePerson === 'ortu'){
            pertama = <br/>;
            kedua = 'Orang Tua/Wali (Forkom/Korlas)'
        }
        if(typePerson === 'walas'){
            pertama = <br/>;
            kedua = 'Guru Kelas ' + fokusRombel;
        }
    };

    return (
        <>
            {pertama && <p className='text-center mb-0' contentEditable={true} suppressContentEditableWarning>{pertama}</p>}
            <p className='text-center' contentEditable={true} suppressContentEditableWarning>{kedua}</p>
        </>
    )
}
export function KontenBottomTtd({side, typePerson}:Partial<dataColum>){
    const saya = useAppSelector(state => state.auth.user);
    const fokusRombel = useAppSelector(state=> state.fokusRombel.value);
    const friends = saya?.friends ?? [];
    const walas = friends.find(s=>s.kode_mapel_ampu === fokusRombel);
    const kepsek = friends.find(s=>s.jabatan === 'Kepala Sekolah');
    let pertama = saya?.name;
    let kedua = saya?.nip === ''?'NIP. -':'NIP. '+ saya?.nip;

    if(typePerson === 'ortu'){
        pertama = '___________________________';
        kedua = '';
    }

    if(typePerson === 'walas'){
        pertama = walas?.name ||'-';
        kedua = walas?.nip ===''?'NIP. -':'NIP. '+ walas?.nip;
    }
    if(typePerson === 'Kepala Sekolah'){
        pertama = kepsek?.name ||'-';
        kedua = kepsek?.nip ===''?'NIP. -':'NIP. '+ kepsek?.nip;
    }


    return (
        <>
            {pertama && <p className='text-center font-bold underline mb-0' contentEditable={true} suppressContentEditableWarning>{pertama}</p>}
            <p className='text-center' suppressContentEditableWarning contentEditable={true}>{kedua}</p>
        </>
    )
}

export function KomponenKop({type, dataColumn}: kopKontentType){
    if(type === 'none') return null;
    return (
        <table className='w-full mb-14'>
            <tbody>
                <tr>
                    {
                        dataColumn?.map((item,index)=>(
                            
                            <td className={cn('text-center align-top border-b-8 border-double pb-1 border-black',
                                item.isLogo ? 'w-1/6':'w-auto'
                            )} key={index}>
                                {
                                    item.isLogo?(
                                        <img src={item.srcLogo} className='h-31.25 w-auto mx-auto'/>
                                    ):(
                                        item.content
                                    )
                                }
                            </td>
                        ))
                    }
                </tr>
            </tbody>
        </table>
    )
}