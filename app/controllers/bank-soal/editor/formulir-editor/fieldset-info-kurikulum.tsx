import { useCreateItemSoalContext } from "../../reducer-item-soal/immer-reducer-context";
import { WrapperContentForm } from "./content-wraper-fieldset";
import TableTaksonomiItemSoal from "~/controllers/koleksi-bank-soal/views/tabel-taksonomi-item-soal";

export function FieldInfoPropertiKurikulum(){
    const {data} = useCreateItemSoalContext();
    return (
            <WrapperContentForm keyTitle='Properti Kurikulum dan Taksonomi Bloom'>
                <TableTaksonomiItemSoal currentData={data}/>
            </WrapperContentForm>
        )
}