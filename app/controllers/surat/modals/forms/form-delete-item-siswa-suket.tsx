import { MoveLeft, TriangleAlert, X } from "lucide-react";
import { FormEdura } from "~/components/form-custom/form-edura";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import { useCrudSuratKeluar } from "../../crud/surat-keluar-crud-provider";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import { useModal } from "~/components/modals/modal-provider";
import type { SiswaType } from "~/types/siswa";
import ButtonDeleteItemSiswaSuratKeluar from "../../crud/button-delete-item-siswa-suket";
import { useAppSelector } from "~/context-reduct/hook";
import { DataOrmSuratKeluarSelector } from "~/context-reduct/selectores/surat-keluar-selector";
import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";

export default function FormDeleteItemSiswaSuratKeluar({data, surat_keluar}:{data:SiswaType, surat_keluar:DataOrmSuratKeluarType}){
    
        const {state:stateCrud} = useCrudSuratKeluar();
        const {state, actions, nextState} = useModal()
        const suratKeluarSelector = useAppSelector(DataOrmSuratKeluarSelector);
        
        const backButton = ()=>{
            const foundSelector = suratKeluarSelector.find(s=>s.idbaris === surat_keluar?.idbaris );
                actions.open('INFO', foundSelector, {closeOnOutsideClick:false})
            }

    return (
        <FormEdura<DataOrmSuratKeluarType>  data={surat_keluar}>
            <fieldset disabled={stateCrud.isSubmitting} className="h-98 flex items-center justify-center">
                <div className="border px-10 pt-2 pb-8  my-auto flex-col  text-center rounded-2xl bg-sky-100/50 border-sky-500 inset-shadow-sky-600 shadow-lg">
                    <div className="text-2xl font-extrabold">
                        <TriangleAlert size={72} className="text-rose-500 mx-auto"/>
                        Anda yakin akan menghapus {data.pd_nama} di Surat Keterangan ini?
                        {
                            stateCrud.isSubmitting?'Memproses':''
                        }
                    </div>
                </div>
                <ModalFooterEdura>
                    <ButtonDeleteAwesome labelButton="Kembali" onClick={backButton} className="px-4 py-0"><MoveLeft size={15}/></ButtonDeleteAwesome>
                    <ButtonDeleteItemSiswaSuratKeluar siswa={data}/>
                </ModalFooterEdura>
            </fieldset>
        </FormEdura>
    )
}