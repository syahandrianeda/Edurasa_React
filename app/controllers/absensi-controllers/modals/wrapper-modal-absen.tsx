import { ModalEdura } from "~/components/modals/modal-components";
import { useModal, type ModalState, type ModalType } from "~/components/modals/modal-provider";
import FormDataSiswa, { FormDataSiswaKhususAbsen } from "~/controllers/data-siswa-controller/form-data-siswa";
import FormSettingKaldik from "~/controllers/kaldik-controller/modal-kaldik/form-setting-kaldik";
import type OrmAbsensi from "~/domain/absensi/orm-absensi";
import FormModalAbsen from "./modal-absen";

/**
 * 
 * type ModalType =
    | 'INFO' -->
    | 'TAMBAH' ---> kaldik
    | 'EDIT' --->kaldik
    | 'EDIT-CUSTOM' --->kaldik (tidak dipake di fitur absne)
    | 'HAPUS'//'DELETE' -->kaldik
    | 'EDIT SISWA'
    | 'TAMBAH ABSEN'
    | 'EDIT ABSEN
    | 'HAPUS ABSEN'
    | null
 */

export default function ModalFiturAbsen(){
    
        const { state, actions } = useModal<OrmAbsensi>();
    
        return (
            <ModalEdura 
                state={state} 
                actions={actions} 
                className="sm:min-w-5xl  md:min-w-2xl lg:min-w-5xl gap-0 overflow-x-auto"
                title={()=>SwitchTitle(state)}
            >
                {state && <SwitchKontenModalAbsen state={state}/>}
                
            </ModalEdura>
        )
    
};
function SwitchKontenModalAbsen({state}:{state:ModalState}){
    const stateType = state.type;
    switch (stateType) {
        case 'INFO':
            return <FormSettingKaldik state={state}/>
        case 'EDIT':
            return <FormSettingKaldik state={state}/>
        case 'TAMBAH':
            return <FormSettingKaldik state={state}/>
        case 'HAPUS':
            return <FormSettingKaldik state={state}/>
        case 'EDIT PROFIL':
            return <FormDataSiswaKhususAbsen state={state}/>
        case 'EDIT SISWA':
            return <FormDataSiswa state={state}/>
        case 'TAMBAH ABSEN':
            return <FormModalAbsen state={state}/>;//<p>Tambah ABSEN</p>
        case 'HAPUS ABSEN':
            return <FormModalAbsen state={state}/>
        case 'EDIT ABSEN':
            return <FormModalAbsen state={state}/>
        
    }
}
function SwitchTitle(state:ModalState):string{
    const stateType:ModalType = state.type;
    switch (stateType) {
        case 'INFO':
            return 'Info Kalender Pendidikan';
        case 'EDIT':
            return 'Edit Agenda: '+((state.payload as { keterangan?: string })?.keterangan ?? '');
        case 'TAMBAH':
            return 'Tambah Kalendar Pendidikan'
        case 'HAPUS':
            return 'Hapus  Agenda: '+((state.payload as { keterangan?: string })?.keterangan ?? '')
        case 'EDIT PROFIL':
            return 'Setting Poto Profil : '  +((state.payload as { pd_nama?: string })?.pd_nama ?? '');
        case 'EDIT SISWA':
            return 'Edit Data: '  +((state.payload as { pd_nama?: string })?.pd_nama ?? '') 
        case 'TAMBAH ABSEN':
            return 'Tambah Absen '  +((state.payload as { name?: string })?.name ?? '') +' hari ' + ((state.payload as { Time_Stamp?: Date })?.Time_Stamp?.toLocaleString('id-ID', {dateStyle:'full'}) ?? '');
        case 'HAPUS ABSEN':
            return 'Hapus Absen '  +((state.payload as { name?: string })?.name ?? '') +' hari ' + ((state.payload as { Time_Stamp?: Date })?.Time_Stamp?.toLocaleString('id-ID', {dateStyle:'full'}) ?? '');
        case 'EDIT ABSEN':
            return 'Edit Absen ' +((state.payload as { name?: string })?.name ?? '') +' hari ' + ((state.payload as { Time_Stamp?: Date })?.Time_Stamp?.toLocaleString('id-ID', {dateStyle:'full'}) ?? '');
        default:
            return  'Modal tidak ada'
    }
}