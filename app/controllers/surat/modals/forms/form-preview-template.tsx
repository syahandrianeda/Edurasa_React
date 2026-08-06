import type { ModalState } from "~/components/modals/modal-provider";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import SppdResumePreview from "../templates/sppd-resume";

export default function FormPreviewTemplate({state}:{state:ModalState<DataOrmSuratKeluarType>}){
    const template = state.payload?.dataTemplate?.name
    switch(template){
        case 'SPPD':
            // return <SppdResumePreview state={state}/>;
            return <SppdResumePreview/>;
        case 'Surat Keterangan Berkelakuan Baik':
            return <p>SKKB</p>;
        case 'Surat Keterangan Aktif':
            return <p>Suket NISN</p>
        case 'Surat Keterangan NISN':
            return <p>Suket NISN</p>
        default:
            return <p>Not Found</p>
    }

}