import { useAppSelector } from "~/context-reduct/hook";
import { DtoSettingJadwalMapelSelector, settingJadwalMapelPureSelector } from "~/context-reduct/selectores/setting-jadwal-mapel";
import { OrmMapelSelector } from "~/context-reduct/selectores/mapel-rombel-selector";
import DtoSettingJadwalMapel from "~/dtos/dto-setting-jadwal-mapel";
import { currentTapel } from "~/lib/current-tapel";
import type { settingJadwalApp } from "~/types/setting_jadwal/setting_jadwal";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { settingJadwalMapelSlice } from "~/context-reduct/global-state/mapel/setting-jadwal-mapel-slice";
import TabelJadwalPelajaran from "~/controllers/jadwal_pelajaran/tabel/tabel-jadwal";
import { useMemo } from "react";
import { jadwalPelajaranAppSelector, jadwalPelajaranPureSelector } from "~/context-reduct/selectores/jadwal-pelajaran-selector";

export default function JadwalMapelPage() {
    const rombel = useAppSelector(state=>state.fokusRombel.value);
    const mapelSelector = useAppSelector(OrmMapelSelector);
    const jadwal = useAppSelector(jadwalPelajaranAppSelector);
    const mapel = useMemo(()=>{
        return mapelSelector.mapelRombelUniqe()??[];
    }, [mapelSelector]);
    const {value} = useFilterContext<settingJadwalApp>();
    // const jadwal = ''
    // const allDataSettingJadwal = useAppSelector(settingJadwalMapelPureSelector);
    // console.log('cek asal', allDataSettingJadwal);
    // console.log('cek jadwal', jadwal)
    return (
        <div className="p-1">
            <h3 className="text-2xl text-center font-extrabold uppercase mb-0">Jadwal Mata Pelajaran</h3>
            <h3 className="text-xl text-center font-extrabold uppercase mb-0">kelas {rombel}</h3>
            <h5 className="text-base text-center font-extrabold uppercase mb-5">{currentTapel({variant:'full'})}</h5>
            <p className="text-center text-sm italic text-gray-500 mb-5">Apakah jadwal punya waktu istirahat?<b>{value?.settingJadwalMapelToolbar?.has_rest_time?'Ya':'Tidak'}</b></p>
            <TabelJadwalPelajaran 
                jadwalServer={jadwal}
                mapel={mapel} 
                setting={value?.settingJadwalMapelToolbar as settingJadwalApp} 
                />
        </div>
    )
}