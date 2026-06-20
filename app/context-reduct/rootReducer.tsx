import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './global-state/auth-slice';
import fokusRombelReducer from './global-state/fokus-rombel-slice';
import dataSiswaReducer from './global-state/siswa-slice'
import loadedApiReducer from './global-state/loaded-slice'
import siswaDapodikReducer from './global-state/sheet-dapodik-slice'
import kaldikReducer from './global-state/kaldik-slice';
import absensiSiswaReducer from './global-state/absensi-slice'
import sabtuLiburReducer from './global-state/sabtu-libur'
import kurmerReducer from './global-state/kurikulum/kurmer-slice'
import fokusMapelReducer from './global-state/kurikulum/fokus-mapel-slice'
import mapelReducer from './global-state/mapel/mapel-slice';
import mapelRombelReducer from './global-state/mapel/mapel-rombel-slice'
import jadwalPelajaranReducer from './global-state/mapel/jadwal-pelajaran';
import settingJadwalMapelReducer from './global-state/mapel/setting-jadwal-mapel-slice';
import jadwalPembiasaanReducer from './global-state/pembiasaan-kegiatan-sekolah/jadwal-pembiasaan';
import protaReducer from './global-state/prota/prota-slice';

const rootReducer = combineReducers({
    auth: authReducer,
    fokusRombel: fokusRombelReducer,
    dataSiswa: dataSiswaReducer,
    loadedApi: loadedApiReducer,
    siswaDapodik: siswaDapodikReducer,
    kaldik:kaldikReducer,
    absensiSiswa:absensiSiswaReducer,
    uiPreference: sabtuLiburReducer,
    kurmer:kurmerReducer,
    fokusMapel: fokusMapelReducer,
    mapel:mapelReducer,
    mapelRombel:mapelRombelReducer,
    settingJadwalMapel: settingJadwalMapelReducer,
    jadwalPelajaran: jadwalPelajaranReducer,
    jadwalPembiasaan: jadwalPembiasaanReducer,
    prota:protaReducer // reducer jadwal pembiasaan sama dengan jadwal pelajaran, karena bentuk datanya sama, yaitu array of jp_mapelSheet, sehingga untuk mempersingkat waktu, saya menggunakan reducer yang sama, namun dengan nama yang berbeda untuk membedakan antara jadwal pelajaran dan jadwal pembiasaan
})

export default rootReducer
