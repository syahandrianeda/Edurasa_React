import { MapPin } from "lucide-react";
import { useModal, type ModalState } from "~/components/modals/modal-provider";
import { Button } from "~/components/ui/button";
import TooltipComp from "~/components/ui_edura/tooltip-comp";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import type { SppdAppType } from "~/types/surat/sppd-app-type";

export default function TriggerEditTempatSppd({dataForm, state}:{dataForm:DataOrmSuratKeluarType, state:ModalState}){
    const { actions} = useModal<SppdAppType>();
    return(
        <div className="flex items-center gap-2 w-full justify-between border-b-2 border-sky-500 border-dotted">
            <span>{dataForm?.ditujukkankepada}</span>
            <TooltipComp content={`Edit Tempat Pelaksanaan`}>
                <Button role="button" variant="outline" className="h-6 cursor-pointer text-[8px] text-sky-600 font-bold p-0 m-0" onClick={()=>actions.open('EDIT TEMPAT SPPD', dataForm.dataTemplate?.personalSppdType?.[0], {closeOnOutsideClick:false, backToModalType:state}   )}>
                    <MapPin className="size-6 text-sky-600"/>
                </Button>
            </TooltipComp>
        </div>
    )
}