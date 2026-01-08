import { ModalEdura } from "~/components/modals/modal-components"
import { useModal } from "~/components/modals/modal-provider"
import type { SiswaType } from "~/types/siswa"
import FormDataSiswa from "./form-data-siswa"

export default function ModalDataSiswa(){
    const { state, actions } = useModal<SiswaType>()

    
    
    return (
        <ModalEdura 
            state={state} 
            actions={actions} 
            className="sm:min-w-5xl md:min-w-2xl lg:min-w-4xl gap-0"
            title = {()=>{
                const type = state?.type;
                const space = " " ;
                const ket = state?.payload?.pd_nama;
                const kelas = `(Kelas ${state?.payload?.nama_rombel})`;
                const titleFinal = type === 'EDIT'? type+space+ket+space+kelas:'Buat'+space+' Data Baru'
                return titleFinal;
            }}
            // description="Modal Data Siswa"
        >
            
            <FormDataSiswa state={state}/>
        </ModalEdura>
    )
}