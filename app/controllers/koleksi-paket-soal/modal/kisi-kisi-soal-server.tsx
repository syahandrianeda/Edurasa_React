import { useFormEdura } from "~/components/form-custom/form-edura"
import CetakKisiKisiSoal from "~/controllers/paket-soal/modal/cetak-kisi-kisi-soal"
import DataKisiKisi from "~/domain/paket-soal/infrastructure/data-kisi-kisi-class";

export default function KisiKisiSoalServer({version}:{version:'v1'|'v2'}){
    const {currentData:KisiKisiInstance} = useFormEdura<DataKisiKisi>();


    return (
        <CetakKisiKisiSoal KisiKisiInstance={KisiKisiInstance} version={version}/>
    )
}