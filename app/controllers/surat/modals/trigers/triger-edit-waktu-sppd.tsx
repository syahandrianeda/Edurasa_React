import { Calendar1Icon } from "lucide-react";
import { useModal, type ModalState } from "~/components/modals/modal-provider";
import { Button } from "~/components/ui/button";
import TooltipComp from "~/components/ui_edura/tooltip-comp";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import type { SppdAppType } from "~/types/surat/sppd-app-type";

export default function TriggerEditWaktuSppd({dataForm, state}:{dataForm:DataOrmSuratKeluarType, state:ModalState}){
    const { actions} = useModal<SppdAppType>();
    return(
        <div className="flex items-center gap-2 w-full justify-between border-b-2 border-sky-500 border-dotted">
            <span>{dataForm?.tglsurat?.toLocaleDateString('id-ID', {dateStyle:'long'})}</span>
            <TooltipComp content={`Edit Hari Pelaksanaan`}>
                <Button role="button" variant="outline" className="h-6 cursor-pointer text-[8px] text-sky-600 font-bold p-0 m-0" onClick={()=>actions.open('EDIT JUMLAH HARI', dataForm.dataTemplate?.personalSppdType?.[0], {closeOnOutsideClick:false, backToModalType:state}   )}>
                    <Calendar1Icon className="size-6 text-sky-600"/>
                </Button>
            </TooltipComp>
        </div>
    )
}