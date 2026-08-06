
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import { useFormEdura } from "~/components/form-custom/form-edura";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";
import { Ban, Loader, StepBackIcon } from "lucide-react";
import { useModal, type ModalState } from "~/components/modals/modal-provider";
import type { SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";
import { useCrudSuratKeluar } from "./surat-keluar-crud-provider";
import type { SuratKeluarSheetType } from "~/types/surat/surat-keluar-sheet-type";
import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";
import { useSppdCrudProvider } from "./sppd-crud-provider";
import type { SppdAppType } from "~/types/surat/sppd-app-type";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import { toast } from "sonner";
import type { SppdSheetType } from "~/types/surat/sppd-sheet-type";
import { useState } from "react";
import { useAppSelector } from "~/context-reduct/hook";
import { DataOrmSuratKeluarSelector } from "~/context-reduct/selectores/surat-keluar-selector";
import DtoSppd from "~/dtos/dto-sppd";

export default function ButtonUpdateTglSPPD({nextState}:{nextState?:ModalState<DataOrmSuratKeluarType>}){
    const {state:stateSppd, actions:postSppd} = useSppdCrudProvider();
    const {state:stateSuratKeluar, actions:postSuratKeluar} = useCrudSuratKeluar();
    const {actions:actionModal} = useModal<SppdAppType>();
    const suratKeluarSelector = useAppSelector(DataOrmSuratKeluarSelector);
    const [updateNextState, setUpdateNextState] = useState(nextState?.payload)
    const dataSuratKeluar = nextState?.payload
    
    const {currentData} = useFormEdura<SppdAppType>();

    const onSubmit = async()=>{
            if(!dataSuratKeluar) return ;
            const {idbaris:idSeuratKeluar, tglsurat, dataTemplate, perihal} = dataSuratKeluar
            if(dataTemplate?.personalSppdType === undefined) return
            
            
            /** melakukan 2 kali update:
             * - update pertama di sheet `surat` tab `surat_keluar`;
             *    * mengupdate: 
             *          - durasisppd
             *          - tglStart
             *    * parameter: -idbaris <sppd> dan <
             * - update kedua di sheet `surate` tab `sppd`
             */
            const {ptk_starttgl, ptk_durasisppd}= currentData;
            
            const dataUpdateSuratKeluar = {idbaris:idSeuratKeluar, tglsurat: ptk_starttgl.toString()}
            const dataSppd = dataTemplate?.personalSppdType?.map((m)=>({idbaris:m.idbaris, ptk_starttgl:ptk_starttgl.toString(), ptk_durasisppd}));
            
            toast.promise(
                postSppd.update(dataSppd),
                {
                    loading: 'Mengupdate SPPD',
                    success: (response) => {
                        // const data = response.data as SppdSheetType[];
                        console.log('respons sppd', response)
                        const {success,data,detailResponse} = response;
                        if(detailResponse){
                            DispatchingResponseToStore(success,data as SppdSheetType[],detailResponse)
                        }
                        
                        return 'Pemanggilan data telah selesai' 
                    },
                    error: `Gagal mengupdate SPDD`,
                    finally(){
                        
                    },
                    // closeButton:true,
                }
            )
            toast.promise(
                postSuratKeluar.update(dataUpdateSuratKeluar),
                {
                    loading: 'Mengupdate Surat Keluar',
                    success: (response) => {
                        // const data = response.data as SppdSheetType[];
                        const {success,data,detailResponse} = response;
                        if(detailResponse){
                            DispatchingResponseToStore(success,data as SuratKeluarSheetType[],detailResponse)
                        }
                        // const currentSuratkeluar = data.find(s=>s.idbaris)
                        return 'Pemanggilan data telah selesai' 
                    },
                    error: `Gagal mengupdate Surat Keluar`,
                    finally(){
                        
                    },
                    // closeButton:true,
                }
            )
            
        }
    const backButton=()=>{
        
        const foundSelector = suratKeluarSelector.find(s=>s.idbaris === currentData.refrensi_suratkeluar );
        actionModal.open('INFO', foundSelector, {closeOnOutsideClick:false})
    }
    return (
            <div className="flex w-full mt-2 gap-2">
                <ButtonDeleteAwesome className="px-2 py-0  bg-rose-500"  type='button' onClick={backButton} labelButton="Kembali"  
                    disabled={stateSppd.isSubmitting||stateSuratKeluar.isSubmitting}
                ><StepBackIcon size={12} className="self-center"/></ButtonDeleteAwesome>
                <ButtonSaveAwesome className="px-2 py-0 mx-auto"  type='button' onClick={onSubmit} labelButton="Simpan"  
                    disabled={stateSppd.isSubmitting||stateSuratKeluar.isSubmitting}
                >
                    {
                        (stateSppd.isSubmitting||stateSuratKeluar.isSubmitting) && <Loader size={12} className="animate-spin self-center"/>
                    }
                </ButtonSaveAwesome> 
            </div>
        
    )
}