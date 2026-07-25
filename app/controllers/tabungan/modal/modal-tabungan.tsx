import { ModalEdura } from "~/components/modals/modal-components"
import { useModal, type ModalState } from "~/components/modals/modal-provider"
import type { SiswaType } from "~/types/siswa"
import type { TabunganAppType } from "~/types/tabungan/tabungan-app-type"
import FormTabungan from "./FormTabungan"
import FormKeuangan from "./FormKeuangan"
import ModalFieldHapusTabungan from "./fieldset/modal-field-hapus-tabungan"

export default function ModalKeuangan<T=TabunganAppType>(){
    const { state, actions } = useModal<T>()

    return (
        <ModalEdura 
            state={state} 
            actions={actions} 
            className="sm:min-w-5xl  md:min-w-2xl lg:min-w-4xl gap-0 overflow-x-auto"
            title={()=>TitleModalKeuangan(state)}
            // description="Modal Data Siswa"
        >
            
            <SwitchFormKeuanganModal state={state}/>
            
        </ModalEdura>
    )
}

function TitleModalKeuangan<T>(state:ModalState<T>):string{
    switch(state.type){
        case "EDIT":
            return 'Edit Tabungan'
        case "HAPUS":
            return 'Hapus Tabungan'
        case "INFO":
            return 'SNAPSHOT (Riwayat Penginputan)'
        default:
            return 'Modal Keuangan'
    }
    
    
}
function SwitchFormKeuanganModal<T>({state}:{state: ModalState<T>}){
    switch(state.type){
        /** Edit Tabungan */
        case "EDIT": 
        return <FormTabungan state={state}/>;

        /** Hapus Tabungan */
        case "HAPUS":
            return <FormTabungan state={state}/>;
        /** INFO Log Tabungan */
        case "INFO":
            return <FormTabungan state={state}/>
        /** Edit Tabungan */
        case "EDIT KEUANGAN": 
        return <FormKeuangan state={state}/>;

        /** Hapus Tabungan */
        case "HAPUS KEUANGAN":
            return <FormKeuangan state={state}/>
        /** INFO Log Tabungan */
        case "INFO KEUANGAN":
            return <FormKeuangan state={state}/>
        default:
            return <div className="h-full w-full flex justify-center items-center">On Proses</div>
    }
}