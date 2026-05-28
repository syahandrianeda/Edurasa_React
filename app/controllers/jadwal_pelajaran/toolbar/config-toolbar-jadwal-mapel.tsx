
import { SaveIcon } from "lucide-react"
import {  useEffect, useMemo } from "react"
import ButtonAddAwesome from "~/components/button-awesome/add-button"
import ButtonSaveAwesome from "~/components/button-awesome/save-button"
import { InputText, SelectField } from "~/components/fields/fields"
import type { TabsConfigProps } from "~/components/tabs/generate-tabs"
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar"
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar"
import { Field, FieldLabel } from "~/components/ui/field"
import { Switch } from "~/components/ui/switch"

import { DtoSettingJadwalMapelSelector } from "~/context-reduct/selectores/setting-jadwal-mapel"
import ButtonAddMapel from "~/controllers/mapel/crud/send-add_mapel"
import { type settingJadwalApp } from "~/types/setting_jadwal/setting_jadwal"
import BtnSaveSettingJadwal from "../crud/btn-save-setting-jadwal"
import TableWithScrolling from "~/components/tabels/table-with-scrolling"
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components"
import SchedulePage from "./schedule-page"
import PengaturanSebaranJadwal from "./schedule-gemini"
import { jadwalPelajaranAppSelector } from "~/context-reduct/selectores/jadwal-pelajaran-selector"
import { OrmMapelSelector } from "~/context-reduct/selectores/mapel-rombel-selector"
import { useAppSelector } from "~/context-reduct/hook"

export const ConfigToolbarJadwalMapel:TabsConfigProps =  {
        defaultValue:"tab1",
        tabList:[
            {
                value: 'tab1',
                label: 'Format Jadwal'
            },
            {
                value: 'tab2',
                label: 'Setting Mapel'
            },
            ...TabConfigKopTtd.tabList
        ],
        contentList:[
            {
                value:'tab1',
                element:<TabSettingJadwal/>
            },
            {
                value:'tab2',
                element:<TabSettingMapel/>
            },
            ...TabConfigKopTtd.contentList
        ]
}
function TabSettingJadwal(){
    const allDataSettingJadwal = useAppSelector(DtoSettingJadwalMapelSelector);
    const rombel = useAppSelector(state=>state.fokusRombel.value??'1A');
    const {setValue, value} = useFilterContext<settingJadwalApp>();
    
    useEffect(()=>{
        if(allDataSettingJadwal.length === 0) return;
        const currentRombel = allDataSettingJadwal.find(item=>item.rombel === rombel);
        if(currentRombel) {
            setValue({
                settingJadwalMapelToolbar:currentRombel
            })
            return;
        }
        setValue({
            settingJadwalMapelToolbar:{
                idbaris:0,
                rombel:rombel,  
                jam_awal:'06:30',
                has_rest_time:true,
                include_sabtu:false,
                count_jp_hari:8,
                interval_menit:35
            }
        })  
    },[allDataSettingJadwal, rombel]);    
    
    const onSwitchChange = (checked:boolean)=>{
        setValue({
            settingJadwalMapelToolbar:{ 
                ...value?.settingJadwalMapelToolbar,
                has_rest_time:checked
            } as settingJadwalApp
        })
    }   
    const onSwitchChangeSabtu = (checked:boolean)=>{
        setValue({
            settingJadwalMapelToolbar:{ 
                ...value?.settingJadwalMapelToolbar,
                include_sabtu:checked
            } as settingJadwalApp
        })
    }   

    return (
        <>
            <div className="mt-5 flex flex-col md:flex-row w-4/6 py-2 rounded-xl bg-linear-to-r from-sky-300 to-sky-100 justify-center mx-auto border border-sky-400/50 align-middle gap-2 items-center">
                
                    <Field orientation="horizontal" className="w-1/2">
                        {/* <Switch id="switch-jadwal-mapel" size="default" defaultChecked={true} checked={value?.settingJadwalMapelToolbar?.has_rest_time ??false}  /> */}
                        
                        <FieldLabel htmlFor="switch-jadwal-mapel">{`Jam Mulai KBM`}</FieldLabel>   
                        <input type="time" 
                        className="border border-gray-300 rounded-2xl p-1 shadow-2xl shadow-black focus:ring-0 focus:outline-none max-w-xs" value={value?.settingJadwalMapelToolbar?.jam_awal??''} onChange={(e)=>{
                            const newJamAwal = e.target.value;
                            setValue({  
                                settingJadwalMapelToolbar:{
                                    ...value?.settingJadwalMapelToolbar,
                                    jam_awal:newJamAwal
                                } as settingJadwalApp
                            })
                        }} />
                        </Field>
                    <Field className="relative w-1/3 md:w-1/5 top-1">
                        <InputText type="number" label="Total KBM" value={value?.settingJadwalMapelToolbar?.count_jp_hari??0} onChange={(e)=>{
                            const newCountJpHari = e.target.value;
                            setValue({  
                                settingJadwalMapelToolbar:{
                                    ...value?.settingJadwalMapelToolbar,
                                    count_jp_hari:Number(newCountJpHari)
                                } as settingJadwalApp
                            })
                        }
                        }/>
                    </Field>
                    <Field className="relative w-1/3 md:w-1/5 top-1">
                        <InputText type="number" label="Menit per JP" value={value?.settingJadwalMapelToolbar?.interval_menit} onChange={(e)=>{
                            const newIntervalMenit = e.target.value;
                            setValue({  
                                settingJadwalMapelToolbar:{
                                    ...value?.settingJadwalMapelToolbar,
                                    interval_menit:Number(newIntervalMenit)
                                } as settingJadwalApp
                            })
                        }
                        }/>
                    </Field>
                
            </div>
            <div className="mt-1 flex flex-col md:flex-row px-4 w-4/6 py-2 rounded-xl bg-linear-to-r from-sky-300 to-sky-100  justify-center mx-auto border border-sky-400/50 align-middle gap-2 items-center">
                
                    <Field orientation="horizontal" className="w-1/2">
                        {/* <Switch id="switch-jadwal-mapel" size="default" defaultChecked={true} checked={value?.settingJadwalMapelToolbar?.has_rest_time ??false}  /> */}
                        <Switch id="switch-jadwal-mapel" 
                            size="default" 
                            defaultChecked={false} 
                            checked={value?.settingJadwalMapelToolbar?.has_rest_time as boolean??true} 
                            onCheckedChange={onSwitchChange}
                            />     
                        <FieldLabel htmlFor="switch-jadwal-mapel">{`Jam Istirahat ${value?.settingJadwalMapelToolbar?.has_rest_time ? 'ditampilkan' : 'disembunyikan'} `}</FieldLabel> 
            
                    </Field>
                
            {/* </div>
            <div className="mt-1 flex w-4/6 py-2 rounded-xl bg-linear-to-r from-sky-300 to-sky-100 flex-col justify-center mx-auto border border-sky-400/50 align-middle gap-2 items-center"> */}
                
                    <Field orientation="horizontal" className="w-1/2">
                        {/* <Switch id="switch-jadwal-mapel" size="default" defaultChecked={true} checked={value?.settingJadwalMapelToolbar?.has_rest_time ??false}  /> */}
                        <Switch id="switch-jadwal-sabtu" 
                            size="default" 
                            defaultChecked={false} 
                            checked={value?.settingJadwalMapelToolbar?.include_sabtu as boolean??false} 
                            onCheckedChange={onSwitchChangeSabtu}
                            />     
                        <FieldLabel htmlFor="switch-jadwal-sabtu">{`Hari Sabtu ${value?.settingJadwalMapelToolbar?.include_sabtu ? 'ditampilkan' : 'disembunyikan'} `}</FieldLabel> 
            
                    </Field>
            </div>
            <div className="mt-1 flex flex-col md:flex-row px-4 w-4/6 py-2 rounded-xl bg-linear-to-r from-sky-300 to-sky-100  justify-center mx-auto border border-sky-400/50 align-middle gap-2 items-center">
                {value?.settingJadwalMapelToolbar && <BtnSaveSettingJadwal data={value?.settingJadwalMapelToolbar}/>}
            </div>
        </>
    )
}
function TabSettingMapel(){ 
    
    const mapelSelector = useAppSelector(OrmMapelSelector);
    const jadwal = useAppSelector(jadwalPelajaranAppSelector);
    const allDataSettingJadwal = useAppSelector(DtoSettingJadwalMapelSelector);
    const rombel = useAppSelector(state=>state.fokusRombel.value??'1A');
    const {setValue, value} = useFilterContext<settingJadwalApp>();
    
    useEffect(()=>{
        if(allDataSettingJadwal.length === 0) return;
        const currentRombel = allDataSettingJadwal.find(item=>item.rombel === rombel);
        if(currentRombel) {
            setValue({
                settingJadwalMapelToolbar: currentRombel,
            })
            return;
        }
        setValue({
            settingJadwalMapelToolbar:{
                idbaris:0,
                rombel:rombel,  
                jam_awal:'06:30',
                has_rest_time:true,
                include_sabtu:false,
                count_jp_hari:8,
                interval_menit:35
            }
        })  
    },[allDataSettingJadwal, rombel]);    
    
    const mapel = useMemo(()=>{
        return mapelSelector.mapelRombelUniqe()??[];
    }, [mapelSelector,rombel]);
    return (
        // <SchedulePage/>
        <PengaturanSebaranJadwal
        mockSetting={value?.settingJadwalMapelToolbar as settingJadwalApp}
        mockMapelRombel={mapel}
        mockKegiatanSekolah={[]}
        mockJadwalServerAwal={jadwal}
        />
        // <div className="mt-1 flex flex-col px-4 w-5/6 py-2 rounded-xl bg-linear-to-r from-sky-300 to-sky-100  mx-auto border border-sky-400/50 align-middle gap-2 items-center">
        //     <Field className="w-full relative">
        //         <SelectField labelSelect="Pilih Mapel">
        //             <option value="">Pilih Mapel/Kegiatan</option>
        //             <option value="matematika">Matematika</option>
        //             <option value="bahasa_indonesia">Bahasa Indonesia</option>
        //             <option value="bahasa_inggris">Bahasa Inggris</option>
        //         </SelectField>
        //     </Field>
        // <TableWithScrolling className="w-full">
        //     <thead>
        //         <TRowEdura>
        //             <ThEdura>Jam ke</ThEdura>
        //             <ThEdura>Senin</ThEdura>
        //             <ThEdura>Selasa</ThEdura>
        //             <ThEdura>Rabu</ThEdura>
        //             <ThEdura>Kamis</ThEdura>
        //             <ThEdura>Jumat</ThEdura>
        //             <ThEdura>Sabtu</ThEdura>
        //         </TRowEdura>
        //     </thead>
        //     <tbody>
        //         <TRowEdura>
        //             <TdEdura/>
        //             <TdEdura><input type="checkbox" className="w-4 h-4"/></TdEdura>
        //             <TdEdura><input type="checkbox" className="w-4 h-4"/></TdEdura>
        //             <TdEdura><input type="checkbox" className="w-4 h-4"/></TdEdura>
        //             <TdEdura><input type="checkbox" className="w-4 h-4"/></TdEdura>
        //             <TdEdura><input type="checkbox" className="w-4 h-4"/></TdEdura>
        //             <TdEdura><input type="checkbox" className="w-4 h-4"/></TdEdura>
        //         </TRowEdura>
        //     </tbody>
        // </TableWithScrolling>
        
        // </div>
    )
}