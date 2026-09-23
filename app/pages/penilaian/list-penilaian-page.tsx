import TableDaftarTagihanPenilaian from "../../controllers/assesmen-penilaian/tabel/tabel-daftar-penilaian";
import TagihanPenilaianClass from "~/domain/penilaian/infrastucture/tagihan-penilian-class";
import TriggerAddTagihanNonPaket from "~/controllers/assesmen-penilaian/triggers/trigger-add-tagihan";

export default function ListpenilaianPage({instansiasi}:{instansiasi?:TagihanPenilaianClass}){
   
    return (
        <>
        <div className="flex justify-end mb-2 items-center">
            {/* <div className="p-2 border-2 rounded-2xl">Kolom Filter</div> */}
            {
                instansiasi && <TriggerAddTagihanNonPaket instansiasi={instansiasi}/>
            }
        </div>
        <TableDaftarTagihanPenilaian instanceClass={instansiasi}/>
        </>
    )
}