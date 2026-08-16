import { useModal } from "~/components/modals/modal-provider";
import FormSerahTerimaDokumen from "./fieldsets/form-serah-terima-dokumen";
import InfoSerahTerimaDokumen from "./fieldsets/info-serah-terima-dokument";
import FormEditSerahTerimaDokumen from "./fieldsets/form-edit-serah-terima";
import FormDeleteSerahTerimaDokumen from "./fieldsets/form-delete-serah-terima";
import FormTransaksiSerahTerimaDokumen from "../../transaksi-serah-terima-dokumen/form-transaksi-serah-terima-dokumen";
import FieldsetTransaksiSerahTerima from "../../transaksi-serah-terima-dokumen/fieldset-transaksi-serah-terima";

export default function SwitchFieldsetSerahTerimaDokumen(){
    const {state}=useModal()
    switch(state.type){
        case 'INFO':
            return <FormSerahTerimaDokumen><InfoSerahTerimaDokumen/></FormSerahTerimaDokumen>
        case 'EDIT':
            return <FormSerahTerimaDokumen><FormEditSerahTerimaDokumen/></FormSerahTerimaDokumen>
        case 'HAPUS':
            return <FormSerahTerimaDokumen><FormDeleteSerahTerimaDokumen/></FormSerahTerimaDokumen>
        case "EDIT TRANSAKSI SERAH TERIMA":
            return <FormTransaksiSerahTerimaDokumen><FieldsetTransaksiSerahTerima/></FormTransaksiSerahTerimaDokumen>
        default:
            return null
    }
}