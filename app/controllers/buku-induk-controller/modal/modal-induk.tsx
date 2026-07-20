import { ModalEdura } from "~/components/modals/modal-components"
import { useModal, type ModalState } from "~/components/modals/modal-provider"
import FormDataSiswa from "~/controllers/data-siswa-controller/form-data-siswa"
import FormPesertaDidikDapodik from "~/controllers/data-siswa-controller/form-peserta-didik"
import type { SiswaType } from "~/types/siswa"

export default function ModalDataIndukSiswa<T=SiswaType>(){
    const { state, actions } = useModal<T>()

    return (
        <ModalEdura 
            state={state} 
            actions={actions} 
            className="sm:min-w-5xl  md:min-w-2xl lg:min-w-4xl gap-0 overflow-x-auto"
            title={()=>TitleModalInduk(state)}
            // description="Modal Data Siswa"
        >
            
            <SwitchFormIndukModal state={state}/>
            
        </ModalEdura>
    )
}
function TitleModalInduk<T>(state:ModalState<T>):string{
    switch(state.type){
        case "EDIT":{
                const type = state?.type;
                const space = " " ;
                const ket = (state.payload  as unknown as SiswaType).pd_nama;
                const kelas = `(Kelas  ${(state.payload  as unknown as SiswaType).nama_rombel})`;
                const titleFinal = type === 'EDIT'? type+space+ket+space+kelas:'info'+space+' Fitur Baru'
                return titleFinal;
            }
        default:
            return 'Modal Induk'
    }
    
    
}
function SwitchFormIndukModal<T>({state}:{state: ModalState<T>}){
    switch(state.type){
        case "EDIT":
            return <FormDataSiswa state={state}/>;
        case "INFO":
            return <FormPesertaDidikDapodik state={state}/>
        default:
            return <div className="h-full w-full flex justify-center items-center">On Proses</div>
    }
}