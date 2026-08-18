import { useCreateItemSoalContext } from "../../reducer-item-soal/immer-reducer-context";
import { WrapperContentForm } from "../wrapper-content-form";

export function FieldInfoCp(){
    const {data} = useCreateItemSoalContext();
    
    return(
        <WrapperContentForm keyTitle='CP'>
                {
                    data.snapshot_kurikulum?.tp_as_cp_description
                }
            <span className={data.snapshot_kurikulum?.invalid?'bg-rose-400':''}>
            {
                data.snapshot_kurikulum?.message?.map((m,index)=><p key={index}>{m}</p>)
            }
            </span>
        </WrapperContentForm>
    )
}