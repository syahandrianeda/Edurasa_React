import FormPesertaDidikBaru from "~/controllers/data-siswa-controller/input-siswa/comp-form-input-siswa";
import { getIsianSiswa } from "~/infrastructures/session-storage/isian-siswa"

export default function CreateNewSiswaPage(){
    const dataKosong = getIsianSiswa();
    
    return (
        <div className="border mb-5">
            <h4 className="text-2xl text-center font-extrabold uppercase mb-2">Formulir Peserta Didik Baru</h4>
            <FormPesertaDidikBaru data={dataKosong}/>
        </div>
    )
}