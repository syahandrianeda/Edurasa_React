import { ModalEdura} from "~/components/modals/modal-components";
import { useModal, type ModalState, type ModalType } from "~/components/modals/modal-provider";
import OrmKurikulum from "~/domain/kurikulum/orm-kurikulum";
import type { ormKurikulumInterface } from "~/types/kurikulum/kurikulum-type";
import FormContentCp from "./form-cp";
import FormContentFaseTp from "./form-tp";
import FormContentAtp from "./form-atp";
import FormMapelRombel from "../../mapel/modal/form-mapel-rombel";
import FormModifikasiProta from "~/controllers/prota/modal/form-prota";


export default function ModalFiturKurikulum(){
    
        const { state, actions } = useModal<ormKurikulumInterface>();
    
        return (
            <ModalEdura 
                state={state} 
                actions={actions} 
                className="sm:min-w-5xl  md:min-w-2xl lg:min-w-5xl gap-0 overflow-x-auto"
                title={()=>switchJudulModalKurikulum(state.type)}
            >
                <SwitchContentForm state={state}/>
            </ModalEdura>
        )
};
function switchJudulModalKurikulum(stateType:ModalType){
    switch(stateType){
        case 'EDIT':
            return 'Edit Capaian Pembelajaran (CP)';
        case 'TAMBAH':
            return 'Tambah Capaian Pembelajaran (CP)';
        case 'HAPUS':
            return 'Hapus Capaian Pembelajaran (CP)';
        case 'EDIT TP':
            return 'Edit Tujuan Pembelajaran (TP)';
        case 'TAMBAH TP':
            return 'Tambah Tujuan Pembelajaran (TP)';
        case 'HAPUS TP':
            return 'Hapus Tujuan Pembelajaran (TP)';
        case 'EDIT ATP':
            return 'Edit Alur Tujuan Pembelajaran (ATP)';
        case 'TAMBAH ATP':
            return 'Tambah Alur Tujuan Pembelajaran (ATP)';
        case 'HAPUS ATP':
            return 'Hapus Alur Tujuan Pembelajaran (ATP)';
        case 'EDIT MAPEL ROMBEL':
            return 'Edit Mata pelajaran di kelas Anda';
        case 'TAMBAH MAPEL ROMBEL':
            return 'Tambah Mata pelajaran di kelas Anda';
        case 'HAPUS MAPEL ROMBEL':
            return 'Hapus Mata pelajaran di kelas Anda';
        case 'EDIT PROTA':
            return 'Edit Prota';
        default:
            return 'MODAL'
    }
}
function SwitchContentForm({state}:{state:ModalState}){
    const stateType = state.type as string;
    if(['EDIT','TAMBAH','HAPUS'].includes(stateType)){
        return(
            <FormContentCp state={state}/>
        )
    }
    if(['EDIT TP','TAMBAH TP', 'HAPUS TP'].includes(stateType)){
        return (
            <FormContentFaseTp state={state}/>
        )
    }
    if(['EDIT ATP','TAMBAH ATP', 'HAPUS ATP'].includes(stateType)){
        return (
            <FormContentAtp state={state}/>
        )
    }
    if(['EDIT MAPEL ROMBEL','TAMBAH MAPEL ROMBEL', 'HAPUS MAPEL ROMBEL'].includes(stateType)){
        return (
            <FormMapelRombel state={state}/>
        )
    }
    if(stateType === 'EDIT PROTA'){
        return (
            <FormModifikasiProta state={state}/>
        )
    }
    return <div className="bg-sky-50">Menyusul</div>
}

/**
 * 
    | 'TAMBAH MAPEL ROMBEL'
    | 'EDIT MAPEL ROMBEL'
    | 'HAPUS MAPEL ROMBEL'
 */