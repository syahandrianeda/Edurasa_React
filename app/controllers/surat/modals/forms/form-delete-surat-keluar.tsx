import { TriangleAlert, X } from "lucide-react";
import { FormEdura} from "~/components/form-custom/form-edura";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import { useCrudSuratKeluar } from "../../crud/surat-keluar-crud-provider";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import { useModal, type ModalState } from "~/components/modals/modal-provider";
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import ButtonDeleteSuratKeluar from "../../crud/button-delete-surat-keluar";

export default function FormDeleteSuratKeluar({state}:{state:ModalState}){
    const {state:stateCrud} = useCrudSuratKeluar();
    const {actions} = useModal()
    
    return (
        <FormEdura<DataOrmSuratKeluarType>  data={state.payload as unknown as DataOrmSuratKeluarType}>
            <fieldset disabled={stateCrud.isSubmitting} className="h-98 flex items-center justify-center">
                    <div className="border px-10 pt-2 pb-8  my-auto flex-col  text-center rounded-2xl bg-sky-100/50 border-sky-500 inset-shadow-sky-600 shadow-lg">
                        <div className="text-2xl font-extrabold">
                            <TriangleAlert size={72} className="text-rose-500 mx-auto"/>
                            Anda yakin akan menghapus Surat Keluar Ini?
                        </div>
                    </div>
                <ModalFooterEdura>
                    <ButtonSaveAwesome labelButton="Batal" onClick={()=>actions.close()} className="px-4 py-0"><X size={15}/></ButtonSaveAwesome>
                    <ButtonDeleteSuratKeluar/>
                </ModalFooterEdura>
            </fieldset>

        </FormEdura>
    )
}