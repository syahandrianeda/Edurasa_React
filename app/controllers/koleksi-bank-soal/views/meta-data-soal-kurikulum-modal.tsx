import { useFormEdura } from "~/components/form-custom/form-edura";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import TablePropertiKurikulum from "./tabel-properti-kurkulum";

export default function MetaDataSoalKurikulumModal(){
    const {currentData} = useFormEdura<BankSoalAppType>()
    return <TablePropertiKurikulum modeKeterangan={true} currentData={currentData}/>
}
