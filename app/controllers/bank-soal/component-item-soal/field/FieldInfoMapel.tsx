import { useCreateItemSoalContext } from "../../reducer-item-soal/immer-reducer-context";
import { WrapperContentForm } from "../wrapper-content-form";

export function FieldInfoMapel(){
    const {data} = useCreateItemSoalContext();
    return (<WrapperContentForm keyTitle='Mata Pelajaran'>
        {
            data.mapel_name
        }
    </WrapperContentForm>)
}