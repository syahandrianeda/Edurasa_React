import { ModalEdura } from "~/components/modals/modal-components"
import { useModal } from "~/components/modals/modal-provider"
import type { SiswaType } from "~/types/siswa"
import FormDataSiswa from "./form-data-siswa"
import FormPesertaDidikDapodik from "./form-peserta-didik"

export default function ModalDataSiswa(){
    const { state, actions } = useModal<SiswaType>()

    
    
    return (
        <ModalEdura 
            state={state} 
            actions={actions} 
            className="sm:min-w-5xl  md:min-w-2xl lg:min-w-4xl gap-0 overflow-x-auto"
            title = {()=>{
                const type = state?.type;
                const space = " " ;
                const ket = state?.payload?.pd_nama;
                const kelas = `(Kelas ${state?.payload?.nama_rombel})`;
                const titleFinal = type === 'EDIT'? type+space+ket+space+kelas:'info'+space+' Fitur Baru'
                return titleFinal;
            }}
            // description="Modal Data Siswa"
        >
            
            {state.type === 'EDIT' && <FormDataSiswa state={state}/>}
            {state.type === 'INFO' && <FormPesertaDidikDapodik state={state}/>}
        </ModalEdura>
    )
}