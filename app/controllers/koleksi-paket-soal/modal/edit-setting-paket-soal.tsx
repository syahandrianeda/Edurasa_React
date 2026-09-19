import { useFormEdura } from "~/components/form-custom/form-edura"
import EditPaketSoalServer from "~/controllers/paket-soal/modal/edit-paket-soal-server";
import DataKisiKisi from "~/domain/paket-soal/infrastructure/data-kisi-kisi-class";

export default function EditSettingPaketSoalServer(){
    const {currentData:KisiKisiInstance} = useFormEdura<DataKisiKisi>();


    return (
        <EditPaketSoalServer InstanceDataKisikisi={KisiKisiInstance} />
    )
}