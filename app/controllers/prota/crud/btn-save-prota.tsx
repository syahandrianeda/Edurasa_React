import { Loader, SaveIcon } from "lucide-react";
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import type { ItemAtpAsProtaEditable, protaApp, protaSheetApp } from "~/types/kurikulum/prota-orm";

// export default function BtnSaveProta({dataSetter, dataAsal, dataServer}:{dataSetter:ItemAtpAsProtaEditable[], dataAsal:ItemAtpAsProtaEditable[], dataServer:protaSheetApp[]}){
export default function BtnSaveProta({isSubmitting, onClikButton}:{isSubmitting:boolean, onClikButton:()=>void}){
    
    return (
        <ButtonSaveAwesome 
            labelButton="Simpan server"  
            disabled={isSubmitting}
            className={`py-1 px-2 text-xs disabled:bg-gray-300 disabled:shadow-none mx-auto`} 
            onClick={onClikButton}>
                {
                    isSubmitting ? <Loader size={12} className="animate-spin self-center"/> : <SaveIcon size={12}/>
                } 
            </ButtonSaveAwesome>
    )
}