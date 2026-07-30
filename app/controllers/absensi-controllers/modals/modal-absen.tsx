import { FormEdura} from "~/components/form-custom/form-edura";
import type { ModalState } from "~/components/modals/modal-provider";
import type { AbsensiSiswaType } from "~/types/absensi-siswa";
import PreviewGambar from "./column-preview-absen";
import ColumnControlPresensi from "./column-control-presensi";
import ColumnPreviewStatusData from "./column-preview-status-data";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import SendAbsen from "../crud-provider/send-absen";
import type { ModalType } from "~/components/modals/modal-type";

export default function FormModalAbsen({state}:{state:ModalState}){
    
    return (
        <FormEdura<AbsensiSiswaType> data={state.payload as unknown as AbsensiSiswaType}>
            <FieldsAbsen stateType={state.type}/>
            <ModalFooterEdura>
                <SendAbsen stateType={state.type}/>
            </ModalFooterEdura>
        </FormEdura>
    )
}

function FieldsAbsen({stateType}:{stateType?:ModalType}){
    return (
        <div className="grid grid-cols-1 gap-2 space-x-1 md:grid-cols-3 bg-linear-to-tl from-sky-600 to-sky-500 p-2  h-[calc(100vh-12.5rem)]  md:overflow-y-auto scrol-h-custom">
            <PreviewGambar type={stateType}/>
            <ColumnControlPresensi/>
            <ColumnPreviewStatusData/>
        </div>
    )
};




