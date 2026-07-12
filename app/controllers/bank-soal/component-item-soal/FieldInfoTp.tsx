import { useCreateItemSoalContext } from "../reducer-item-soal/immer-reducer-context";
import { WrapperContentForm } from "./wrapper-content-form";

export function FieldInfoTp(){
    const {data} = useCreateItemSoalContext();
    
    return (
            <WrapperContentForm keyTitle='TP'>
                {
                    data.kd_deskripsi
                }
            </WrapperContentForm>)
}