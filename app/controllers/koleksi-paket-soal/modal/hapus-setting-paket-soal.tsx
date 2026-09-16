import { useFormEdura } from "~/components/form-custom/form-edura";
import HapusPaketSoalServer from "~/controllers/paket-soal/modal/hapus-paket-soal-server";
import DataKisiKisi from "~/domain/paket-soal/infrastructure/data-kisi-kisi-class";

export default function HapusSettingPaketSoalServer(){
    const {currentData:KisiKisiInstance} = useFormEdura<DataKisiKisi>();


    return (
        <HapusPaketSoalServer InstanceDataKisikisi={KisiKisiInstance} />
    )
}