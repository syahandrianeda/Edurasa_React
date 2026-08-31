import { useCreateItemSoalContext } from "../../reducer-item-soal/immer-reducer-context";
import { WrapperContentForm } from "./content-wraper-fieldset";

export function FieldInfoMapel(){
    const {data} = useCreateItemSoalContext();
    return (<WrapperContentForm keyTitle='Mata Pelajaran'>
        {
            data.mapel_name
        }
    </WrapperContentForm>)
}