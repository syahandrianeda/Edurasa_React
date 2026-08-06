import { useModal, type ModalState } from "~/components/modals/modal-provider";
import type { SppdAppType } from "~/types/surat/sppd-app-type";
import PrintSppd from "../surat/modals/templates/print-sppd";
import PrintSuratTugasSppd from "../surat/modals/templates/print-surat-tugas";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import FormatNotulaRapartSppd from "../surat/modals/templates/format-notula-sppd";

export default function SwitchPrintPreviewPage(){
    const {state} = useModal()
    const type:ModalState['type'] = state.type;
    switch(type){
        case "PRINT PREVIEW SPPD":
            return <PrintSppd data={state.payload as unknown as SppdAppType}/>
        
        case "PRINT PREVIEW SURAT TUGAS":
            return <PrintSuratTugasSppd data={state.payload as unknown as DataOrmSuratKeluarType}/>
        case "NOTULA RAPAT":
            return <FormatNotulaRapartSppd data={state.payload as unknown as SppdAppType}  includeResume={false}/>
        case "PRINT NOTULA RAPAT":
            return <FormatNotulaRapartSppd data={state.payload as unknown as SppdAppType} includeResume={true}/>
        default:
        return <p>PRINT PREVIEW</p>
    }
}

