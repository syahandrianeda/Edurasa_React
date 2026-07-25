
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import { useCrudTabunganProvider } from "./crud-tabungan-provider";
import { useFormEdura } from "~/components/form-custom/form-edura";
import type{ SnapshotTabungan, TabunganAppType } from "~/types/tabungan/tabungan-app-type";
import DtoTabungan from "~/dtos/dto-tabungan";
import { namaTab } from "~/lib/nama-tab-environment";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import type { TabunganSheetType } from "~/types/tabungan/tabungan-sheet-type";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";
import { Loader } from "lucide-react";
import { useModal } from "~/components/modals/modal-provider";
import { FokusRombelKeuangan } from "~/context-reduct/selectores/rombel-tabungan-selector";
import { useAppSelector } from "~/context-reduct/hook";
import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";

export default function ButtonDeleteTabungan(){
    const {state, actions} = useCrudTabunganProvider();
    const {actions:actionModal} = useModal<TabunganAppType>();
    const keuangan = useAppSelector(FokusRombelKeuangan)
    const {currentData:tabunganItem, setCurrentData} = useFormEdura<TabunganAppType>();

    const onSubmit = async()=>{
    
    const snapshotBaru:SnapshotTabungan={
                                time_stamp:new Date(),
                                penginput:tabunganItem.penginput,
                                kategori:tabunganItem.kategori,
                                keterangan:tabunganItem.keterangan ?? '',
                                nominal:tabunganItem.masuk ?? tabunganItem.keluar ?? 0,
                                kolom: (tabunganItem.masuk ? 'masuk': 'keluar') as keyof TabunganAppType,
                                status:'hapus'
                            }
            const snapshot:SnapshotTabungan[] = tabunganItem.snapshot ? 
                                                [ ...tabunganItem.snapshot, snapshotBaru ] 
                                                : 
                                                [snapshotBaru];
                        
            const formData = {
                        ...tabunganItem, 
                        status:'hapus',
                        snapshot
            }
                    
            const dto  = DtoTabungan.toSheet(formData);
            const argService = {
                data: dto,
                tab: namaTab(keuangan?.kategori!) +"_" +keuangan?.rombel
            }
            const response = await actions.update(argService);
            if(response.success){
                const {success, data, detailResponse} = response;
                if(detailResponse){
                    DispatchingResponseToStore(success, data as TabunganSheetType[], detailResponse, keuangan?.rombel)
                }
                ShowToasterSuccess('Berhasil disimpan');
                actionModal.close();
            }else{
                ShowToasterError('Oups, Gagal Menyimpan data');
            }
            
        }
    return (
            <div className="flex justify-center mt-2">
                <ButtonDeleteAwesome className="px-2 py-0"  type='button' onClick={onSubmit} labelButton="Hapus"  
                    disabled={state.isSubmitting}
                >
                    {
                        state.isSubmitting && <Loader size={12} className="animate-spin self-center"/>
                    }
                </ButtonDeleteAwesome> 
            </div>
        
    )
}