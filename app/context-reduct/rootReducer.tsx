import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './global-state/auth-slice';
import fokusRombelReducer from './global-state/fokus-rombel-slice';
import dataSiswaReducer from './global-state/siswa-slice'
import loadedApiReducer from './global-state/loaded-slice'
import siswaDapodikReducer from './global-state/sheet-dapodik-slice'
import kaldikReducer from './global-state/kaldik-slice';
import absensiSiswaReducer from './global-state/absensi-slice'

const rootReducer = combineReducers({
    auth: authReducer,
    fokusRombel: fokusRombelReducer,
    dataSiswa: dataSiswaReducer,
    loadedApi: loadedApiReducer,
    siswaDapodik: siswaDapodikReducer,
    kaldik:kaldikReducer,
    absensiSiswa:absensiSiswaReducer
})

export default rootReducer
