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
    console.log({dataTab});
    return (
        <FormEdura<SuratMasukAppType>  data={data}>
            <fieldset disabled={state.isSubmitting}>
                {/* <div className="grid grid-cols-1 gap-2 space-x-1 md:grid-cols-3 bg-linear-to-tl from-sky-600 to-sky-500 p-2  h-[calc(100vh-12.5rem)]  md:overflow-y-auto scrol-h-custom">
                    <FieldSuratMasukKolomSatu/>
                    <KolomDuaSamainSuratKeluar/>
                    <UnggahanFileSuratMasuk/>
                </div> */}
                    <GenerateTabsForModal {...dataTab}/>
                <ModalFooterEdura>
                    <ButtonUpdateSuratMasuk/>
                </ModalFooterEdura>

            </fieldset>
        </FormEdura>
    )
}