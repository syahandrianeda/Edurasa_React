import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type"
import type { ReducerCommand } from "./reducer-commander"
import type { initializeItemSoal, removeJson_alat_jawab, resetItemSoal, setBentukSoal, setCreatorItemSoal, setIdbaris, setItemSoal, setPropertyKurikulum } from "./action-type-item-soal"
import type { Draft } from "node_modules/immer/dist/immer";
import type { FormatElemen } from "~/types/bank-soal/bentuk-soal-type";
import { initialCreateItemSoal } from "./Initial-item-soal";

export class setIdbarisReducer implements ReducerCommand<BankSoalAppType,setIdbaris>{
    
    execute( state: Draft<BankSoalAppType>, action: setIdbaris, ) {

        state.idbaris = action.payload;

    }
}
export class removeJson_alat_jawabReducer implements ReducerCommand<BankSoalAppType,removeJson_alat_jawab> {
    
    execute( state: Draft<BankSoalAppType>, action: removeJson_alat_jawab, ) {
        delete state.json_alat_jawab;
        // delete state[action.type]
        // state.json_alat_jawab = undefined;
    }
};
export class setPropertyKurikulumReducer implements ReducerCommand<BankSoalAppType, setPropertyKurikulum>{
    // type:'propertyKurikulum',
    // payload:AtpAsOrm
    execute(state: Draft<BankSoalAppType>, action: setPropertyKurikulum): void 
            {
        state.fase_jenjang = action.payload.kelas;
        state.kd_id = action.payload.atp_as_tp_id;
        state.kd_deskripsi = action.payload.atp_as_tp_description;
        state.kurikulum = 'kurmer'
        state.kode_mapel = action.payload.kodemapel ?? '';
        state.snapshot_kurikulum = action.payload
        // if(!state.indikator_soal){
            const text = `Siswa dapat ${action.payload.atp_as_tp_description} dengan benar`;
            state.indikator_soal = text;
        // }

    }
}
export class setBentukSoalReducer implements ReducerCommand<BankSoalAppType,setBentukSoal>{
    // type:'bentuk_soal',
    // payload:string
    execute(state: Draft<BankSoalAppType>, action: setBentukSoal): void {
        state.bentuk_soal = action.payload.name;
        state.auto_koreksi = action.payload.way_correction;
        /** Jika action.payload.name === 'pg' */
        if(action.payload.name === 'pg' ){
            state.json_alat_jawab = {
                OpsiPilihanJawaban:[],
                formatOpsi:'vertical',
                tableHeader:undefined,
                valid:[0],
                // type: 'radio',
            }
        };
        
        /** action.payload === 'menjodohkan' */
        if(action.payload.name === 'menjodohkan'){
            state.json_alat_jawab = {
                opsiKiri:[],
                opsiKanan:[],
            }
        };

        /** action.payload.name === 'benar_salah' */
        if(action.payload.name === 'benar_salah'){
            state.json_alat_jawab = {
                listPernyataan:[],
                formatTampilan:'vertical',
            }
        };
        
        /** jika bukan ['pg', 'pg_kompleks', 'benar_salah', 'menjodohkan']  atau 
         * action.payload.name ['essay','isian_singkat'], maka hapus 'json_alat_jawab'
        */
        if(action.payload.name === 'essay' || action.payload.name === 'isian_singkat'){
            delete state.json_alat_jawab;
        }

    }
}
export class setCreatorItemSoalReducer implements ReducerCommand<BankSoalAppType,setCreatorItemSoal>{
    execute(state: Draft<BankSoalAppType>, action: setCreatorItemSoal): void {
        state.oleh = action.payload;
    }
}
export class setItemSoalReducer implements ReducerCommand<BankSoalAppType, setItemSoal>{
    execute(state: Draft<BankSoalAppType>, action: setItemSoal): void {
        
        Object.assign(state, action.payload);
        
    }
}
export class resetItemSoalReducer implements ReducerCommand<BankSoalAppType, resetItemSoal>{
    execute(state: Draft<BankSoalAppType>, action: resetItemSoal):  Draft<BankSoalAppType> {
        
        return structuredClone(
            initialCreateItemSoal,
        );
    }
}
export class InitializeItemSoalReducer implements ReducerCommand<BankSoalAppType, initializeItemSoal>{
    execute(state:Draft<BankSoalAppType>, action: initializeItemSoal):void{
        
        const { kurikulum, 
                bentukSoal,
                creator,
                jenjang,
                mapel} = action.payload;

        state.fase_jenjang  = kurikulum.kelas;
        state.kd_id         = kurikulum.atp_as_tp_id;
        state.kd_deskripsi  = kurikulum.atp_as_tp_description;
        state.kurikulum     = 'kurmer'
        state.kode_mapel    = kurikulum.kodemapel ?? '';
        state.snapshot_kurikulum = kurikulum;

        
        state.bentuk_soal = bentukSoal.name;
        state.auto_koreksi = bentukSoal.way_correction
        
        state.oleh = creator;
        state.jenjang_khusus  = jenjang;
        state.mapel_name = mapel;
    }
}
export const RegistryItemSoalReducer = {
    idbaris: new setIdbarisReducer(),
    remove_json_alat_jawab: new removeJson_alat_jawabReducer(),
    propertyKurikulum: new setPropertyKurikulumReducer(),
    creator: new setCreatorItemSoalReducer(),
    bentuk_soal: new setBentukSoalReducer(),
    set_item_soal: new setItemSoalReducer(),
    reset: new resetItemSoalReducer(),
    initialize: new InitializeItemSoalReducer()
} as const;