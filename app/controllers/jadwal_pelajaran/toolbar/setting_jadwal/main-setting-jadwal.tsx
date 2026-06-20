import { InputText } from "~/components/fields/fields";
import { Field, FieldLabel } from "~/components/ui/field";
import { Switch } from "~/components/ui/switch";
import { useAppSelector } from "~/context-reduct/hook";
import { DtoSettingJadwalMapelSelector } from "~/context-reduct/selectores/setting-jadwal-mapel";
import { useSettingAndJadwal } from "./use-setting-and-jadwal";
import { OrmMapelSelector } from "~/context-reduct/selectores/mapel-rombel-selector";
import { jadwalPelajaranAppSelector } from "~/context-reduct/selectores/jadwal-pelajaran-selector";
import { useEffect, useMemo } from "react";
import type { settingJadwalApp } from "~/types/setting_jadwal/setting_jadwal";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import BtnSaveSettingJadwal from "../../crud/btn-save-setting-jadwal";
import { useSettingAndJadwalRefactor } from "./use-setting-and-jadwal-refactor";
import type { UserPtk } from "~/types";
import { NAMA_HARI_LABEL } from "~/types/hari";

export default function MainSettingJadwal(){
    const mapelSelector = useAppSelector(OrmMapelSelector);
    const sebaranTabelJadwal = useAppSelector(jadwalPelajaranAppSelector);
    const allDataSettingJadwal = useAppSelector(DtoSettingJadwalMapelSelector);
    const rombel = useAppSelector(state=>state.fokusRombel.value??'1A');
    const user = useAppSelector(state=>state.auth.user);
    
    const {setValue, value} = useFilterContext<settingJadwalApp>();
    const mapel = useMemo(()=>{
            return mapelSelector.mapelRombelUnique()??[];
        }, [mapelSelector,rombel]);
    const {
        settingJadwal,
        changeJamAwal,
        changeHasRestTime,
        changeMenitIstirahat,
        changeIntervalMenit,
        changeIncludeSabtu,
        changeCountJpHari,
        changeShowType,
        showType,
        dataJadwal,
        dataPresentation,
        hariAktif,
        disableDropdown  
    } = useSettingAndJadwalRefactor(
        allDataSettingJadwal,
        sebaranTabelJadwal,
        mapel,
        [],
        rombel,
        user as UserPtk
    )
    
    useEffect(()=>{
        if(settingJadwal){
            setValue({
                // settingJadwalMapelToolbar:settingJadwal,
                extra:{
                                dataSetting:settingJadwal,
                                dataJadwal:dataPresentation,
                                hariAktif: hariAktif,
                                namaHari:NAMA_HARI_LABEL
                            }
            })
        }
    },[settingJadwal,dataPresentation]);
    
    return (
        <div className="bg-linear-to-br from-sky-300 to-sky-200  dark:from-sky-800 dark:to-sky-700 px-2 py-6 gap-1">
            <div className='inner-shadow-sky-700  border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-lg outline-ring py-2'>
                <h1 className="text-lg font-bold text-center">Pengaturan Jadwal Pelajaran</h1>
                <div className="border-b-2 border-dotted dark:border-sky-200 gap-2 flex justify-around items-center py-1">
                    <p className="md:w-1/2 w-full text-xs border-e-2 pe-2">
                        Atur mulai pukul berapa KBM dimulai. Biasanya, KBM kelas pagi dimulai pukul 06:30, pukul kelas siang 12:20
                    </p>
                    <Field orientation="horizontal" className="md:w-1/6 w-1/2 relative">
                        <InputText type="time" 
                            label="Jam Mulai KBM"
                            className="border border-gray-300 rounded-2xl p-1 shadow-2xl shadow-black focus:ring-0 focus:outline-none max-w-xs" 
                            id="input_jam_mulai"
                            value={settingJadwal?.jam_awal || ''}
                            onChange={(e) => changeJamAwal(e.target.value)}
                            disabled={disableDropdown}
                            />
                    </Field>
                </div>
                <div className="border-b-2 border-dotted dark:border-sky-200 gap-2 flex justify-around items-center py-1">
                    <p className="md:w-1/2 w-full text-xs border-e-2 pe-2">
                        Tentukan jumlah Jam KBM. Jam KBM termasuk pembiasaan dan kegiatan lain yang diprogramkan sekolah <strong>namun tidak termasuk jam istirahat</strong>
                    </p>
                    <Field orientation="horizontal" className="md:w-1/6 w-1/2 relative">
                        <InputText type="number" 
                            label="Jumlah Jam KBM"
                            className="border border-gray-300 rounded-2xl text-center p-1 shadow-2xl shadow-black focus:ring-0 focus:outline-none max-w-xs" 
                            id="input_jumlah_jam_kbm"
                            value={settingJadwal?.count_jp_hari || ''}
                            onChange={(e) => changeCountJpHari(Number(e.target.value))}
                            disabled={disableDropdown}
                            />
                    </Field>
                </div>
                <div className="border-b-2 border-dotted dark:border-sky-200 gap-2 flex justify-around items-center py-1">
                    <p className="md:w-1/2 w-full text-xs border-e-2 pe-2">
                        Tentukan durasi untuk 1 Jam Pembelajaran (1 JP)
                    </p>
                    <Field orientation="horizontal" className="md:w-1/6 w-1/2 relative">
                        <InputText type="number" 
                            label="Durasi JP(menit)"
                            className="border border-gray-300 rounded-2xl text-center p-1 shadow-2xl shadow-black focus:ring-0 focus:outline-none max-w-xs" 
                            id="input_durasi_jp"
                            value={settingJadwal?.interval_menit || ''}
                            onChange={(e) => changeIntervalMenit(Number(e.target.value))}
                            disabled={disableDropdown}
                            />
                    </Field>
                </div>
                <div className="border-b-2 border-dotted dark:border-sky-200 gap-2 flex justify-around items-center py-1">
                    <p className="md:w-1/2 w-full text-xs border-e-2 pe-2">
                        Apakah disediakan jam istirahat? Jika iya, maka jam istirahat ditentukan di jam ke-5 dan Anda bisa atur durasi jam istirahat di pengaturan berikutnya.                    
                    </p>
                    <Field orientation="horizontal" className="md:w-1/6 w-1/2">
                        <Switch id="switch-jam-istirahat" 
                            size="default" 
                            defaultChecked={false} 
                            checked={settingJadwal?.has_rest_time as boolean??false}
                            onCheckedChange={(checked) => changeHasRestTime(checked)}
                            disabled={disableDropdown}
                            />     
                        <FieldLabel htmlFor="switch-jam-istirahat">Jam Istirahat</FieldLabel> 
                    </Field>
                </div>
                {settingJadwal?.has_rest_time && (
                    <div className="border-b-2 border-dotted dark:border-sky-200 gap-2 flex justify-around items-center py-2">
                        <p className="md:w-1/2 w-full text-xs border-e-2 pe-2">
                            Berapa lama durasi jam istirahat?
                            <br/>
                            Permendikbud Nomor 23 Tahun 2017 tentang Hari Sekolah menyatakan bahwa durasi jam istirahat minimal 30 menit untuk sekolah dengan jumlah jam pembelajaran 6 jam atau lebih, dan minimal 15 menit untuk sekolah dengan jumlah jam pembelajaran kurang dari 6 jam.
                        </p>
                    
                        <Field orientation="horizontal" className="md:w-1/6 w-1/2 relative">
                            <InputText type="number" 
                                label="Durasi(menit)"
                                className="border border-gray-300 rounded-2xl text-center p-1 shadow-2xl shadow-black focus:ring-0 focus:outline-none max-w-xs" 
                                id="input_durasi_jam_istirahat"
                                value={settingJadwal?.menit_istirahat || 0}
                                onChange={(e) => changeMenitIstirahat(Number(e.target.value))}
                                disabled={disableDropdown}
                                />
                        </Field>
                </div>
                )}
                
                <div className="border-b-2 border-dotted dark:border-sky-200 gap-2 flex justify-around items-center py-1">
                    <p className="md:w-1/2 w-full text-xs border-e-2 pe-2">
                        Apakah Anda ingin mengatur Jadwal Pelajaran hingga hari Sabtu? Secara default, jadwal pelajaran diatur selama 5 hari dalam satu minggu, namun Anda dapat mengaturnya untuk hari kegiatan hari Sabtu.
                    </p>
                    <Field orientation="horizontal" className="md:w-1/6 w-1/2">
                        <Switch id="switch-hari-sabtu" 
                            size="default" 
                            defaultChecked={false} 
                            checked={settingJadwal?.include_sabtu as boolean??false}
                            onCheckedChange={(checked) => changeIncludeSabtu(checked)}
                            disabled={disableDropdown}
                            />     
                        <FieldLabel htmlFor="switch-hari-sabtu">Hari Sabtu</FieldLabel> 
                    </Field>
                </div>
                <div className="border-b-2 border-dotted dark:border-sky-200 gap-2 flex justify-around items-center py-1">
                    <p className="md:w-1/2 w-full text-xs border-e-2 pe-2">
                        Tampilkan nama mapel/kegiatan berdasarkan Kode atau nama mapel/kegiatan lengkap?
                    </p>
                    <Field orientation="horizontal" className="md:w-1/6 w-1/2">
                        <Switch id="switch-tampilkan-nama-mapel" 
                            size="default" 
                            defaultChecked={false} 
                            checked={showType}
                            onCheckedChange={(checked) => changeShowType(checked)}
                            disabled={disableDropdown}
                            />     
                        <FieldLabel htmlFor="switch-tampilkan-nama-mapel">{showType ? "Kode" : "Mapel/Kegiatan Lengkap"}</FieldLabel> 
                    </Field>
                </div>
                {
                    !disableDropdown && (
                        <div className="border-b-2 border-dotted dark:border-sky-200 gap-2 flex justify-around items-center py-1">
                            {settingJadwal && <BtnSaveSettingJadwal data={settingJadwal}/>}
                        </div>
                    )
                }
            </div>
        </div>
    )
}