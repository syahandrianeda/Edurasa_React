import type { ModalState } from "~/components/modals/modal-provider";
import FormDurasiHariSppd from "../forms/form-durasi-hari-sppd";
import type { SppdAppType } from "~/types/surat/sppd-app-type";
import FormSppd from "../forms/form-sppd";
import FormPtkYangDiperintah from "../forms/form-ptk-diperintah-sppd";
import FormDetailPtk from "../forms/form-detail-ptk";
import FormEditTempatSppd from "../forms/form-edit-tempat-sppd";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import FormDeleteItemSiswaSuratKeluar from "../forms/form-delete-item-siswa-suket";
import type { SiswaType } from "~/types/siswa";
import FormPilihSiswaSuket from "../forms/form-pilih-item-siswa-suket";


export default function SwitchFormTemplate({state}:{state:ModalState}){
    const type = state.type;
    switch(type){
        case "EDIT-CUSTOM":
            return <FormSppd state={state as unknown as ModalState<SppdAppType>}><FormDetailPtk /></FormSppd>
        case "EDIT SPPD":
            return <FormSppd  state={state as unknown as ModalState<SppdAppType>}><FormPtkYangDiperintah/></FormSppd>
        case "EDIT JUMLAH HARI":
            return <FormSppd  state={state as unknown as ModalState<SppdAppType>}><FormDurasiHariSppd  /></FormSppd>
        case "EDIT TEMPAT SPPD":
            return <FormSppd  state={state as unknown as ModalState<SppdAppType>}><FormEditTempatSppd/></FormSppd>
        
        case 'HAPUS SUKET ITEM SISWA':
            return <FormDeleteItemSiswaSuratKeluar data={(state.payload as {data:SiswaType}).data } surat_keluar={(state.payload as {surat_keluar:DataOrmSuratKeluarType}).surat_keluar } />
        case 'EDIT SUKET ITEM SISWA':
            return <FormPilihSiswaSuket state={state as unknown as ModalState<DataOrmSuratKeluarType>}/>
        default:
            return null
    }
}

