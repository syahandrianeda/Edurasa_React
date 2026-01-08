import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './global-state/auth-slice';
import fokusRombelReducer from './global-state/fokus-rombel-slice';
import dataSiswaReducer from './global-state/siswa-slice'

const rootReducer = combineReducers({
    auth: authReducer,
    fokusRombel: fokusRombelReducer,
    dataSiswa: dataSiswaReducer
})

export default rootReducer
