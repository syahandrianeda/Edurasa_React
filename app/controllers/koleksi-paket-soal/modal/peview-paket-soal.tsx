import { useFormEdura } from "~/components/form-custom/form-edura"
import CetakPaketSoalServer from "~/controllers/paket-soal/modal/cetak-paket-soal-server";
import DataKisiKisi from "~/domain/paket-soal/infrastructure/data-kisi-kisi-class";

export default function PreviewPaketSoalServer(){
    const {currentData:KisiKisiInstance} = useFormEdura<DataKisiKisi>();


    return (
        <CetakPaketSoalServer InstanceDataKisikisi={KisiKisiInstance}/>
    )
}