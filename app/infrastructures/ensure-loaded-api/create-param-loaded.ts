import type { RootState } from '../../context-reduct/store'
import AppScriptSheet, { type ParamRequestAppScript } from '~/configs/appscript-sheet'
import type { DataSheetNeeeded } from '../../domain/enloaded/data-sheet-needed-type';
import type { dataAbsensiTypeSlice } from '~/context-reduct/global-state/absensi-slice';

/** 
 * - ditempatkan bersamaan dengan toolbar 
 * - dijadikan sumber data untuk menyeleksi array mana yang sudah dipanggil dan belum dipanggil
 * - yang belum dipanggil dikumpulkan datanya jadi array
 * - dibuatkan parameter AppSriptnya
 * - dipanggil service
 * - jika berhasil ditangkap/disimpan di redux
 * */


export interface ResultParamEnloade{
    unStated:DataSheetNeeeded[], 
    param:ParamRequestAppScript[],
    needCall:boolean,
    stateNotLaoded:Record<string, any>[], 
    notProvidedState :DataSheetNeeeded[],
    dataAbsensiKelasIni?:dataAbsensiTypeSlice
}
export  function createParamEnloaded(state:RootState , data:DataSheetNeeeded[]=[]):ResultParamEnloade{

    /** kita harus dapatkan state Redux */
    const KeyOfState = Object.values(state).filter(s=> s.hasOwnProperty('name'));//.filter(s=> !s.loaded);
    const AppSheet = new AppScriptSheet();

    /** helper namaTab environment */
    const isDev = import.meta.env.DEV;
    const namaTab = (namaTab:string)=> isDev? namaTab.replace('trial_','') :namaTab
    
    /** jika ada  permintaan pemanggilan dataSiswa, cegah dulu. Periksa di indexDb ada atau tidak*/
    


    const notProvidedState = data.filter(s=>KeyOfState.findIndex(k=>k.name === namaTab(s.tab)) === -1);
    /** untuk sheet absensi, state redux hanya menyediakan `name=absensi`, 
     * jadi, request data sheet dan tab ini harus tetap dipanggil 
     *  */
    const notProvidedAbsensiState = notProvidedState.filter(s=>s.sheet ==='absensi');

    /**data absensi per kelas itu berada di dalam `notProviderAbsensiState` */
    const dataAbsensiKelasIni =  state.absensiSiswa.dataAbsensi.find(s=>s.nama_rombel == state.fokusRombel.value);

    const stateNotLaoded = KeyOfState.filter(s=>!s.loaded);
    /** carikan data yang belum diloaded oleh state dari `DataSheetNeed` 
     * Jika dataAbsensiIndi ditemukan, janagan masuk
    */
    const unStated = dataAbsensiKelasIni ? 
                    data.filter(s=>KeyOfState.findIndex(k=>k.name === namaTab(s.tab) && !k.loaded)>-1)
                    .filter(ss=>notProvidedAbsensiState.map(m=>m.sheet).includes(ss.sheet))
                    :
                    [...notProvidedAbsensiState, ...data.filter(s=>KeyOfState.findIndex(k=>k.name === namaTab(s.tab) && !k.loaded)>-1)];
    /** buat parameter untuk AppScript */
    const param:ParamRequestAppScript[]=[];
   
    unStated.forEach(({sheet, tab, params},index)=>{
        const idss = AppSheet.currentMacro['ss_'+sheet];
        
        const ob:ParamRequestAppScript = {
            idss,
            tab,
            ...params
        };
        param.push(ob);
    })

    const needCall = param.length>0;
    // console.log({KeyOfState, idss:AppSheet.sheetKurikulum}, shouldBeCall, testFindIndex)

    return {unStated, needCall,param,stateNotLaoded, notProvidedState, dataAbsensiKelasIni }
}
