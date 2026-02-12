import { FormEdura, useFormEdura } from "~/components/form-custom/form-edura";
import type { ModalState, ModalType } from "~/components/modals/modal-provider";
import type OrmAbsensi from "~/domain/absensi/orm-absensi";
import type { AbsensiSiswaType } from "~/types/absensi-siswa";
import { useAppSelector } from "~/context-reduct/hook";
import { selectAllSiswaDTO } from "~/context-reduct/selectores/data-siswa-aktif";
import ButtonSetAsProfile from "../crud-provider/send-update-poto-profile";
import { ImageProfileOrAbsen } from "./image-profile-or-absen";
import PreviewGambar from "./column-preview-absen";
import ColumnControlPresensi from "./column-control-presensi";
import ColumnPreviewStatusData from "./column-preview-status-data";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import SendAbsen from "../crud-provider/send-absen";

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




