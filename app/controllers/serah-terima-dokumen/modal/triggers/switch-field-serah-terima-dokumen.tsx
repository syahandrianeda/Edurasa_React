import { useModal } from "~/components/modals/modal-provider";
import FormSerahTerimaDokumen from "../fieldsets/form-serah-terima-dokumen";
import InfoSerahTerimaDokumen from "../fieldsets/info-serah-terima-dokument";
import FormEditSerahTerimaDokumen from "../fieldsets/form-edit-serah-terima";
import FormDeleteSerahTerimaDokumen from "../fieldsets/form-delete-serah-terima";

export default function SwitchFieldsetSerahTerimaDokumen(){
    const {state}=useModal()
    switch(state.type){
        case 'INFO':
            return <FormSerahTerimaDokumen><InfoSerahTerimaDokumen/></FormSerahTerimaDokumen>
        case 'EDIT':
            return <FormSerahTerimaDokumen><FormEditSerahTerimaDokumen/></FormSerahTerimaDokumen>
        case 'HAPUS':
            return <FormSerahTerimaDokumen><FormDeleteSerahTerimaDokumen/></FormSerahTerimaDokumen>
        default:
            return null
    }
}