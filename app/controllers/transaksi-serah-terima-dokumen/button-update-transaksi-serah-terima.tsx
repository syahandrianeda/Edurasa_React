import { Loader } from "lucide-react";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";

export default function ButtonUpdateTransaksiSerahTerimaDokumen({onSubmit, disabled}:{onSubmit:()=>void, disabled:boolean}){
    return (
        <ButtonCommitAwesome
            className="py-0 px-4"
            labelButton="Simpan"
            onClick={onSubmit}
            disabled={disabled}
        >
            {
                    disabled && <Loader size={12} className="animate-spin self-center"/>
                }
        </ButtonCommitAwesome>
    )
}