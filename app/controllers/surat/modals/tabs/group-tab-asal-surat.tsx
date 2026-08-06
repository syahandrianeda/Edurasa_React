import FieldSuratMasukKolomSatu from "../fieldset/surat-masuk-kolom-satu";
import KolomDuaSamainSuratKeluar from "../fieldset/perihal-tujuan-surat"

export default function GroupTabAsalSurat(){
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
            <FieldSuratMasukKolomSatu/>
            <KolomDuaSamainSuratKeluar/>
        </div>
    )
}