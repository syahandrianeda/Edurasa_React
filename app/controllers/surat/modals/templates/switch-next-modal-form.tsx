import type { ModalState } from "~/components/modals/modal-provider";
import FormDurasiHariSppd from "../forms/form-durasi-hari-sppd";
import type { SppdAppType } from "~/types/surat/sppd-app-type";
import FormSppd from "../forms/form-sppd";
import FormPtkYangDiperintah from "../forms/form-ptk-diperintah-sppd";
import FormDetailPtk from "../forms/form-detail-ptk";
import FormEditTempatSppd from "../forms/form-edit-tempat-sppd";


export default function SwitchFormTemplate({state}:{state:ModalState<SppdAppType>}){
    const type = state.type;
    switch(type){
        case "EDIT-CUSTOM":
            return <FormSppd state={state}><FormDetailPtk /></FormSppd>
        case "EDIT SPPD":
            return <FormSppd state={state}><FormPtkYangDiperintah/></FormSppd>
        case "EDIT JUMLAH HARI":
            return <FormSppd state={state}><FormDurasiHariSppd  /></FormSppd>
        case "EDIT TEMPAT SPPD":
            return <FormSppd state={state}><FormEditTempatSppd/></FormSppd>
        default:
            return <p>Not Found</p> 
    }
}

