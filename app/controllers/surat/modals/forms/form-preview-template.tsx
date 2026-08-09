import type { ModalState } from "~/components/modals/modal-provider";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import SppdResumePreview from "../templates/sppd-resume";
import SuratKeteranganResumePreview from "../templates/surat-keterangan-siswa-resume";
import InfoResumeSuratKeluarLainnya from "../templates/resume-surat-keluar-lainnya";

export default function FormPreviewTemplate({state}:{state:ModalState<DataOrmSuratKeluarType>}){
    const template = state.payload?.dataTemplate?.name
    switch(template){
        case 'SPPD':
            // return <SppdResumePreview state={state}/>;
            return <SppdResumePreview/>;
        case 'Surat Keterangan Berkelakuan Baik':
            return <SuratKeteranganResumePreview/>;
        case 'Surat Keterangan Aktif':
            return <SuratKeteranganResumePreview/>
        case 'Surat Keterangan NISN':
            return <SuratKeteranganResumePreview/>
        default:
            return <InfoResumeSuratKeluarLainnya/>
    }

}