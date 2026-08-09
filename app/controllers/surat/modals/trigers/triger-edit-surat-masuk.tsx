import {  LucideFolderArchive } from "lucide-react";
import { type ModalState, useModal } from "~/components/modals/modal-provider";
import{ Button } from "~/components/ui/button";
import TooltipComp from "~/components/ui_edura/tooltip-comp";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import type { SuratMasukAppType } from "~/types/surat/surat-masuk-app-type";

export default function TriggerEditSuratMasuk({dataForm, state}:{dataForm:DataOrmSuratKeluarType, state:ModalState}){
    const { actions} = useModal<SuratMasukAppType>();
    
    return(
        <div className="flex items-center gap-2 w-full justify-between border-b-2 border-sky-500 border-dotted">
            <span>{dataForm.dataSuratMasuk?.asalsurat} No {dataForm.dataSuratMasuk?.nosurat} (id: {dataForm?.dataSuratMasuk?.idbaris})</span>
            <TooltipComp content={`Edit Surat Masuk`}>
                <Button role="button" variant="outline" className="h-6 cursor-pointer text-[8px] text-sky-600 font-bold p-0 m-0" onClick={()=>actions.open('EDIT SURAT MASUK', dataForm.dataSuratMasuk, {closeOnOutsideClick:false, backToModalType:state}   )}>
                    <LucideFolderArchive className="size-6 text-sky-600"/>
                </Button>
            </TooltipComp>
        </div>
    )
    
}