import { useModal } from "~/components/modals/modal-provider";
import { Button } from "~/components/ui/button";
import TooltipComp from "~/components/ui_edura/tooltip-comp";
import type { SppdAppType } from "~/types/surat/sppd-app-type";

export default function CellPersonalTypeTemplate({data}:{data:SppdAppType[]}){
    const {state, actions} = useModal<SppdAppType>();
    // if(data.length === 0) return ;//<span className="text-[8px] text-sky-600 font-bold">Tidak ada data PTK yang diperintah</span>
    return (
        <div className="text-[8px] text-sky-600 font-bold">
            PTK yang diperintah: 
            <ul className="list-disc list-inside">
                {
                    data.map((m, i)=>
                        <li key={i}>
                            <TooltipComp content={`Cetak SPPD ${m.ptk_nama}`}>
                                <Button role="button" variant="ghost" className="h-4 cursor-pointer text-[8px] text-sky-600 font-bold p-0 m-0" onClick={()=>actions.open('PRINT PREVIEW SPPD', m, {closeOnOutsideClick:false}   )}>
                                    {m.ptk_nama}
                                </Button>

                            </TooltipComp>
                        </li>
                    )
                }
            </ul>
        </div>
    )
    
}