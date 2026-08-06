import { TriangleAlert, X } from "lucide-react";
import { FormEdura } from "~/components/form-custom/form-edura";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import { useModal, type ModalState } from "~/components/modals/modal-provider";
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import { useCrudSuratMasuk } from "../../crud/surat-masuk-crud-provider";
import type { SuratMasukAppType } from "~/types/surat/surat-masuk-app-type";
import ButtonDeleteSuratMasuk from "../../crud/button-delete-surat-masuk";

export default function FormDeleteSuratMasuk({state}:{state:ModalState}){
    
        const {state:stateCrud} = useCrudSuratMasuk();
        const {actions} = useModal()
    return (
        <FormEdura<SuratMasukAppType>  data={state.payload as unknown as SuratMasukAppType}>
            <fieldset disabled={stateCrud.isSubmitting} className="h-98 flex items-center justify-center">
                    <div className="border px-10 pt-2 pb-8  my-auto flex-col  text-center rounded-2xl bg-sky-100/50 border-sky-500 inset-shadow-sky-600 shadow-lg">
                        <div className="text-2xl font-extrabold">
                            <TriangleAlert size={72} className="text-rose-500 mx-auto"/>
                            Anda yakin akan menghapus Surat Masuk Ini?
                        </div>
                    </div>
                <ModalFooterEdura>
                    <ButtonSaveAwesome labelButton="Batal" onClick={()=>actions.close()} className="px-4 py-0"><X size={15}/></ButtonSaveAwesome>
                    <ButtonDeleteSuratMasuk/>
                </ModalFooterEdura>
            </fieldset>

        </FormEdura>
    )
}