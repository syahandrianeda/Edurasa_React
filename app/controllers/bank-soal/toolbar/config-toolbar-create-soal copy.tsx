import { useEffect, useMemo, useCallback } from "react";
import { SelectField } from "~/components/fields/fields";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { Field } from "~/components/ui/field";
import { setFokusMapel } from "~/context-reduct/global-state/kurikulum/fokus-mapel-slice";
import { useAppDispatch, useAppSelector } from "~/context-reduct/hook";
import { jadwalPelajaranAppSelector } from "~/context-reduct/selectores/jadwal-pelajaran-selector";
import { instanceOfKaldik } from "~/context-reduct/selectores/kaldik-selector";
import { KurmerDtoSelector } from "~/context-reduct/selectores/kurmer-selector";
import { CurrentMapelInActiveRombel } from "~/context-reduct/selectores/mapel-rombel-selector";
import { DtoProtaSelector } from "~/context-reduct/selectores/prota-selector";
import { ListBentukSoal } from "~/domain/bank-soal/list-bentuk-soal";
import { ListEditorSoal } from "~/domain/bank-soal/list-editor-soal";
import OrmPromes from "~/domain/kurikulum/orm-promes";
import { KoleksiMapel } from "~/domain/mapel/koleksi-mapel";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { currentTapelProperties } from "~/lib/current-tapel";
import { groupBy, groupByToArray } from "~/lib/group-by";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { EditorSoalType } from "~/types/bank-soal/editor-soal";
import type { AtpAsOrm } from "~/types/kurikulum/prota-orm";
import type { InterfaceMapel } from "~/types/mapel/mapel";

export const ConfigToolbarDesainPraSoal:TabsConfigProps =  {
        defaultValue:"tab1",
        tabList:[
            {
                value: 'tab1',
                label: 'Setting'
            },
            ...TabConfigKopTtd.tabList
            
        ],
        contentList:[
            {
                value:'tab1',
                element:<TabPraDesainItemSoal/>
            },
            ...TabConfigKopTtd.contentList
        ]
}
function TabPraDesainItemSoal(){
    const fokusMapel = useAppSelector(state=>state.fokusMapel.data);
    const disabled =  useAppSelector(state=>state.fokusMapel.disabled);
    const user = useAppSelector(state=>state.auth.user);
    const mapelSelector = useAppSelector(CurrentMapelInActiveRombel);
    const dispatch = useAppDispatch();
    const ormKaldik = useAppSelector(instanceOfKaldik);
    const jadwal = useAppSelector(jadwalPelajaranAppSelector);
    const cpFaseAtp = useAppSelector(KurmerDtoSelector);
    const rombel = useAppSelector(state=>state.fokusRombel.value);
    const prota = useAppSelector(DtoProtaSelector);
    const {value, setValue, updateExtra} = useFilterContext<{
        fokusBentukSoal?: ListBentukSoalType;
        fokusAtp?: AtpAsOrm | undefined;
        fokusEditor?:EditorSoalType
    }>();
    //const semester = value.semester?? currentTapelProperties({variant:'getSemester'}) as number ;
    
    
    
    const promes = useMemo(()=>{
        const kaldik = ormKaldik;
        const inprota = user && new OrmPromes(cpFaseAtp,jadwal,kaldik,fokusMapel,rombel ?? getSessionRombel(),user,prota).init();//.buildPromes(2);//.createKoleksiMapelInJadwal().koleksiMapelInJadwal
        
        const fokusAtp = inprota?.dataAtpValidInRombel||[];
        return fokusAtp.length>0? groupByToArray(fokusAtp,item=>item?.tp_as_cp_description ||''):[];    
        },[user,rombel,fokusMapel,cpFaseAtp,jadwal,prota]);
    

    
    const mapelRombel = useMemo(()=>{
        return mapelSelector.data?.map(m=>m.source);
    },[mapelSelector]);
    
    const handleChangeMapel = useCallback((e:React.ChangeEvent<HTMLSelectElement>)=>{
        // const fokus = KoleksiMapel.find(s=>s.kode === e.currentTarget.value) as InterfaceMapel;
        const fokus = mapelRombel?.find(s=>s.kode === e.currentTarget.value) as InterfaceMapel;
        
        dispatch(setFokusMapel({
            data:fokus,
            disabled,
            name:'fokusMapel',
            loaded:true
            // user?.roles !== "Guru Mapel"?true:false
        }))
    },[mapelRombel, dispatch, disabled]);
    
    useEffect(()=>{
        const fokus = user?.roles === 'Guru Mapel'?KoleksiMapel.find(s=>s.kode === user?.kode_mapel_ampu) as InterfaceMapel:KoleksiMapel.find(s=>s.kode === 'PKN') as InterfaceMapel;
        
        dispatch(setFokusMapel({
            data:fokus,
            disabled,
            name:'fokusMapel',
            loaded:true
            // user?.roles !== "Guru Mapel"?true:false
        }))
    },[user,KoleksiMapel]);
    
    useEffect(()=>{
        if(!(value?.extra?.fokusBentukSoal)){
            updateExtra(draft=>{
                draft.fokusBentukSoal = ListBentukSoal[0]
            })
        }
    },[updateExtra, value?.extra?.fokusBentukSoal])
    
    useEffect(()=>{
        if(!(value?.extra?.fokusEditor)){
            updateExtra(draft=>{
                draft.fokusEditor = ListEditorSoal[0]
            })
        }
    },[updateExtra, value?.extra?.fokusEditor])
    
    useEffect(()=>{
        if(promes.length === 0){
            updateExtra(draft=>{
                draft.fokusAtp = undefined
            })
        }
        if(!(value?.extra?.fokusAtp) && promes.length>0){
            
            updateExtra(draft=>{
                draft.fokusAtp = promes[0].data[0]
            })
        }
    },[
        promes
    ])

    return (
        <div className="grid md:grid-cols-3 grid-cols-1 bg-linear-to-br from-sky-300 to-sky-200  dark:from-sky-800 dark:to-sky-700 px-1 py-6 gap-1">
            <div className='inner-shadow-sky-700  border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-lg outline-ring py-2 px-2'>
                <Field className="relative mt-2">
                    <SelectField 
                        id="selectMapel"
                        name="selectMapel"
                        labelSelect="Pilih Mata Pelajaran"
                        value={fokusMapel.kode}
                        onChange={handleChangeMapel}
                        disabled={user?.roles === 'Guru Mapel'}
                        >
                            {
                                mapelRombel?.map(({id,nama,kode})=>
                                    <option key={id} value={kode}>{nama}</option>
                                )
                            }
                        </SelectField>
                </Field>
                <Field className="relative mt-2">
                    <div className="text-xs absolute bg-white dark:text-gray-100 text-gray-500 dark:bg-sky-900 dark:border-gray-600 dark:placeholder-gray-400 duration-300 transform -translate-y-4 rounded-3xl scale-75 top-2 z-10 origin-left  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 inset-s-1">Pilih Bentuk Soal</div>
                    <ol className="list-none list-inside bg-white p-2 rounded dark:bg-sky-900">
                        {
                            ListBentukSoal.map((m,index)=>(
                                    <li key={m.name+'_'+index} className="flex justify-between py-1 has-checked:underline">
                                        <label htmlFor={m.name} className="flex gap-2 text-xs cursor-pointer has-checked:font-bold has-checked:text-blue-800 dark:has-checked:text-yellow-300">
                                            <input
                                                type="radio"
                                                value={m.name}
                                                name="bentuksoal"
                                                id={m.name}
                                                checked={m.name === value?.extra?.fokusBentukSoal?.name}
                                                onChange={() => updateExtra(draft=>{ draft.fokusBentukSoal = m })}
                                            />
                                            {m.description}
                                        </label>
                                            <span className="capitalize text-[8px] has-checked:text-xs">{m.way_correction}</span>
                                    </li>
                                )
                            )
                        }
                    </ol>
                </Field>
                
                <Field className="relative mt-2">
                    <div className="text-xs absolute bg-white dark:text-gray-100 text-gray-500 dark:bg-sky-900 dark:border-gray-600 dark:placeholder-gray-400 duration-300 transform -translate-y-4 rounded-3xl scale-75 top-2 z-10 origin-left  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 inset-s-1">Pilih Editor</div>
                    <ol className="list-none list-inside bg-white p-2 rounded dark:bg-sky-900">
                        {
                            ListEditorSoal.map((m, index)=>
                                <li key={m.name+'_'+index} className="py-1 has-checked:underline">
                                        <label htmlFor={m.name} className="flex gap-2 text-xs cursor-pointer capitalize has-checked:font-bold has-checked:text-blue-800 dark:has-checked:text-yellow-300">
                                            <input
                                                type="radio"
                                                value={m.name}
                                                name="editorsoal"
                                                id={m.name}
                                                checked={m.name === value?.extra?.fokusEditor?.name}
                                                onChange={() => updateExtra(draft=>{ draft.fokusEditor = m })}
                                            />
                                            {m.label}
                                        </label>
                                            {/* <span className="capitalize text-[8px] has-checked:text-xs">{m.way_correction}</span> */}
                                    </li>
                            )
                        }
                    </ol>
                </Field>
            </div>
            <div className='md:col-span-2 inner-shadow-sky-700 max-h-90 overflow-y-scroll scrol-h-custom border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-lg outline-ring py-2 px-2'>
                <TableWithScrolling className="text-[10px]">
                    <thead>
                        <TRowEdura>
                            <ThEdura className="text-wrap">Capaian Pembelajaran (CP)</ThEdura>
                            
                            <ThEdura className="text-wrap capitalize" colSpan={2}>Tujuan Pembelajaran (TP)<br/>(Klik untuk memilih)</ThEdura>
                        </TRowEdura>
                    </thead>
                    <tbody>
                        {
                            promes.length>0 && promes.map((m, index)=>
                                
                                    
                                        m.data.map((tp,ii)=>
                                            <TRowEdura key={tp.atp_as_tp_id} className="odd:bg-white even:bg-white">
                                                
                                                {
                                                    ii === 0 && 
                                                    <TdEdura className="text-wrap w-2/5" rowSpan={ m.data.length===0 ?1:m.data.length}>
                                                    {m.key}
                                                    </TdEdura>
                                                }
                                                <TdEdura className=" peer:has-checked:bg-amber-300">{index+1}.{ii+1}</TdEdura>
                                                <TdEdura className="text-wrap  has-checked:bg-amber-300 px-1">
                                                        <input
                                                            type="radio"
                                                            name="fokusAtp"
                                                            className="hidden peer"
                                                            id={'atp_'+tp.atp_as_tp_id}
                                                            checked={value?.extra?.fokusAtp?.atp_as_tp_id === tp.atp_as_tp_id}
                                                            onChange={() => updateExtra(draft=>{ draft.fokusAtp = tp })}
                                                        />
                                                    <label htmlFor={'atp_'+tp.atp_as_tp_id} className="cursor-pointer w-full">
                                                        {tp.atp_as_tp_description}
                                                    </label>
                                                </TdEdura>
                                                
                                            </TRowEdura>
                                        )
                                    
                                
                            )
                        }
                    </tbody>
                </TableWithScrolling>        
            </div>
        </div>
    )
}
