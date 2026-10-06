import TableDaftarTagihanPenilaian from "../../controllers/assesmen-penilaian/tabel/tabel-daftar-penilaian";
import TagihanPenilaianClass from "~/domain/penilaian/infrastucture/tagihan-penilian-class";
import TriggerAddTagihanNonPaket from "~/controllers/assesmen-penilaian/triggers/trigger-add-tagihan";
import TriggerReloadResponTagihan from "~/controllers/assesmen-penilaian/triggers/trigger-reload-tagihan";

export default function ListpenilaianPage({instansiasi}:{instansiasi?:TagihanPenilaianClass}){
   
    return (
        <>
        <div className="flex justify-between w-full mb-2 items-center">

            {
                instansiasi && <TriggerReloadResponTagihan/>
            }
            {
                instansiasi && <TriggerAddTagihanNonPaket instansiasi={instansiasi}/>
            }
        </div>
        <TableDaftarTagihanPenilaian instanceClass={instansiasi}/>
        </>
    )
}