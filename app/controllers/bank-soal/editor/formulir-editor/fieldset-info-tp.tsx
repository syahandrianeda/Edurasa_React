import { useCreateItemSoalContext } from "../../reducer-item-soal/immer-reducer-context";
import { WrapperContentForm } from "./content-wraper-fieldset";

export function FieldInfoTp(){
    const {data} = useCreateItemSoalContext();
    
    return (
            <WrapperContentForm keyTitle='TP'>
                {
                    data.kd_deskripsi
                }
            </WrapperContentForm>)
}