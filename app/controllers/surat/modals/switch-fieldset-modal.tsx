import { useModal} from "~/components/modals/modal-provider";
import FormSuratKeluar from "./forms/form-surat-keluar";
import FormPreviewTemplate from "./forms/form-preview-template";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import FormDeleteSuratKeluar from "./forms/form-delete-surat-keluar";
import InfoSuratMasuk from "./templates/info-surat-masuk";
import type { SuratMasukAppType } from "~/types/surat/surat-masuk-app-type";
import FormEditSuratMasuk from "./forms/form-edit-surat-masuk";
import FormDeleteSuratMasuk from "./forms/form-delete-surat-masuk";

export default function SwitchFieldsetModalSurat(){
    const {state, actions } = useModal<DataOrmSuratKeluarType>()
    const {type, payload} = state;
    switch(type){
        case "EDIT":
            return <FormSuratKeluar state={state}/>
        case "INFO":
            return <FormPreviewTemplate state={state}/>
        case "HAPUS":
            return <FormDeleteSuratKeluar state={state}/>
        case "HAPUS SURAT MASUK":
            return <FormDeleteSuratMasuk state={state}/>
        case "INFO SURAT MASUK":
            return <InfoSuratMasuk data={state.payload as unknown as SuratMasukAppType}/>
        case "EDIT SURAT MASUK":
            return <FormEditSuratMasuk data={state.payload as unknown as SuratMasukAppType}/>
        default:
            return <p>Test Dulu</p>
    }
}
    