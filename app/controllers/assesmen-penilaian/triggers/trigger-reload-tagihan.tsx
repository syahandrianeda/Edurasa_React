import { Loader } from "lucide-react";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import AppScriptSheet, { type ParamRequestAppScript } from "~/configs/appscript-sheet";
import type { DataSheetNeeeded } from "~/domain/enloaded/data-sheet-needed-type";
import { defineNilaiPerKategori, defineNilaiTabTagihanRespon } from "~/domain/enloaded/intial-enloaded/by-route-page/nilai/nilai-rombel-needed";
import EnsurLoadedApiService from "~/infrastructures/ensure-loaded-api/EnsureLoadedApiService";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import {toast} from 'sonner';
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";


export default function TriggerReloadResponTagihan(){

    const handleReload = async()=>{
        const rombel = getSessionRombel();
        const service = new EnsurLoadedApiService();
        const AppSheet = new AppScriptSheet();
        const reqParam:ParamRequestAppScript[] = [];
        const tabNilai = defineNilaiTabTagihanRespon(rombel);
        const tabNilaiHarian = defineNilaiPerKategori(rombel, 'harian');
        const tabMidSemester = defineNilaiPerKategori(rombel, 'mid_semester');
        const tabAkhirSemester = defineNilaiPerKategori(rombel, 'akhir_semester');
        
        const sheetToBeParam:DataSheetNeeeded[] = [
            tabNilai,
            tabNilaiHarian, 
            tabMidSemester,
            tabAkhirSemester
        ];
        

        sheetToBeParam.forEach(({sheet, tab, ...params})=>{
            const idss = AppSheet.currentMacro['ss_'+sheet];
                const ob:ParamRequestAppScript = {
                    idss,
                    tab,
                    ...params
                };
            reqParam.push(ob);
        });
            
        

        console.log({reqParam, sheetToBeParam});
        const reqPromise = toast.promise(
                        service.callNeeded(reqParam),
                        {
                            loading: "Sedang memperbarui data respon",
        
                            success: data => {
                                
                                
                                return 'Data respon berhasil diperbarui';
                            },
        
                            error:  data=>`Gagal memuat data  \r`+ data,
        
                            closeButton: true,
                        }
                    );
        const data = await reqPromise.unwrap();
        if (data && Array.isArray(data)) {
            const decidedRombel = rombel;
            data.forEach(({ success, data, detailResponse, }) => {

                if (detailResponse) {
                    DispatchingResponseToStore(
                        success,
                        data,
                        detailResponse,
                        decidedRombel
                    );
                }
            }
            );
        }

    }
    return (
        <ButtonCommitAwesome labelButton="Update Data Respon" className="px-4 py-0 text-[10px]" onClick={handleReload}><Loader size={12}/></ButtonCommitAwesome>
    )
}