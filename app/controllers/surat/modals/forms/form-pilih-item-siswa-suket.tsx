import { FormEdura } from "~/components/form-custom/form-edura";
import type { ModalState } from "~/components/modals/modal-provider";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import FieldsetKolomPilihKelasSiswa from "../fieldset/field-pilih-edit-kelas-siswa";

export default function FormPilihSiswaSuket({state}:{state:ModalState<DataOrmSuratKeluarType>}){
    const dataForm = state.payload as DataOrmSuratKeluarType;

    return (
        <FormEdura<DataOrmSuratKeluarType>  data={dataForm}>
                <FieldsetKolomPilihKelasSiswa/>
        </FormEdura>
    )
}