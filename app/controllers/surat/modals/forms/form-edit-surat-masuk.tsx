import { FormEdura } from "~/components/form-custom/form-edura";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import type { SuratMasukAppType } from "~/types/surat/surat-masuk-app-type";
import { useCrudSuratMasuk } from "../../crud/surat-masuk-crud-provider";
import ButtonUpdateSuratMasuk from "../../crud/button-update-surat-masuk";
import { GenerateTabsForModal } from "~/components/tabs/generate-tabs";
import { ConfigModalTabSuratMasuk } from "../tabs/surat-masuk-tab";

export default function FormEditSuratMasuk({data}:{data:SuratMasukAppType}){
    const {state} = useCrudSuratMasuk();
    const dataTab = ConfigModalTabSuratMasuk;
    
    return (
        <FormEdura<SuratMasukAppType>  data={data}>
            <fieldset disabled={state.isSubmitting}>
                <GenerateTabsForModal {...dataTab}/>
                <ModalFooterEdura>
                    <ButtonUpdateSuratMasuk/>
                </ModalFooterEdura>

            </fieldset>
        </FormEdura>
    )
}