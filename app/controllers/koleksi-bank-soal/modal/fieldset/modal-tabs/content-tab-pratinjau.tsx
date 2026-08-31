import { useFormEdura } from "~/components/form-custom/form-edura"
import PratinjauItemSoalModal from "~/controllers/koleksi-bank-soal/views/pratinjau-soal-di-modal"
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type"
import type { PgKompleks } from "~/types/bank-soal/bentuk-soal-type"
import type { PgKompleksType } from "~/types/bank-soal/bentuk-soal/pg-kompleks-type"
import type { PgTunggalType } from "~/types/bank-soal/bentuk-soal/pg-type"

export default function ContentTabPratinjauSoalModal({currentData}:{currentData:BankSoalAppType}){
    
    return (
        <div className="overflow-y-auto text-xs">
            Misalnya soal ini diterapkan di nomor 4:
            <PratinjauItemSoalModal currentData={currentData}/>
        </div>
    )
}