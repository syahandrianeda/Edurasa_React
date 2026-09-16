import { useFormEdura } from "~/components/form-custom/form-edura"
import CetakPembahasanDanPenskoran from "~/controllers/paket-soal/modal/cetak-pembahasan-penskoran";
import DataKisiKisi from "~/domain/paket-soal/infrastructure/data-kisi-kisi-class";

export default function PembahasanPenskoranServer(){
    const {currentData:KisiKisiInstance} = useFormEdura<DataKisiKisi>();


    return (
        <CetakPembahasanDanPenskoran KisiKisiInstance={KisiKisiInstance}/>
    )
}