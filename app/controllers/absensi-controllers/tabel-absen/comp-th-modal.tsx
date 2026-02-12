import { DropdownMenu, DropdownMenuContent } from "@radix-ui/react-dropdown-menu"
import { PencilIcon, Plus, Trash } from "lucide-react"
import type { CSSProperties, ReactNode } from "react"
import type { TriggerTable } from "~/components/dropdowns/dropdown-action-table"
import { useModal } from "~/components/modals/modal-provider"
import { ThEdura } from "~/components/tabels/tabel-components"
import { DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import TooltipComp from "~/components/ui_edura/tooltip-comp"
import type OrmKaldik from "~/domain/kaldik/orm-kaldik"
import type { keteranganLabelKaldik } from "~/domain/kaldik/type-output-kaldik"
import { ShortDayName } from "~/lib/date-helper"
import type { KaldikType } from "~/types/kaldik"

export default function ThSettingKalendar({
    keteranganKaldik,
    tgl, 
    date, 
    isLibur, 
    eventYet,
    style,
    ormKaldik,
}:{
    keteranganKaldik:keteranganLabelKaldik[],
    tgl: number, 
    date: Date, 
    isLibur: boolean, 
    eventYet: boolean,
    style?: CSSProperties,
    ormKaldik:OrmKaldik
}){

    let teksKonten: string[]= [];
    const objekKosong = ormKaldik.dataTemplate();
    const {actions} = useModal();
    const draftAction:TriggerTable<KaldikType>[]=[];
    const objekNew = Object.assign({}, objekKosong, {idbaris:0, start_tgl:date, end_tgl:date, libur:isLibur});
    const objekTamnbah:TriggerTable<KaldikType>={
            label:'Tambah',
            icon: Plus,
            callback: () => actions.open('TAMBAH', objekNew,{closeOnOutsideClick:false})
        }

    draftAction.push(objekTamnbah);
    
    keteranganKaldik.forEach(({keterangan, idbaris, labelTanggal})=>{
        const teks = `${keterangan} (${labelTanggal})`;
        teksKonten.push(teks);

        const findData = ormKaldik.data.find(s=>s.idbaris === idbaris);
            const objekEdit:TriggerTable<KaldikType>={
                label:'Edit '+findData?.keterangan,
                icon: PencilIcon,
                callback: () => actions.open('EDIT', findData,{closeOnOutsideClick:false})
            }
            const objekHapus:TriggerTable<KaldikType>={
                label:'Hapus '+findData?.keterangan,
                icon: Trash,
                callback: () => actions.open('HAPUS', findData,{closeOnOutsideClick:false})
            }
            draftAction.push(objekEdit);
            draftAction.push(objekHapus);
    });

    if(eventYet){
        return (
            <TooltipComp content={keteranganKaldik.length>0?{children:<TooltipContentKeteranganKalendar kontenTooltip={teksKonten}/>}:''}>
                <ThEdura style={style} className="relative ring-0 outline-0 select-none">
                    {
                        (!isLibur && !eventYet)&& (
                            <span className="rounded-full bg-green-500 h-2 w-2 absolute top-0.5 right-0.5 print:hidden" title="Hari Efektif"></span>
                        )
                    }
                    <div className="flex flex-col capitalize mt-1">
                        <span className="text-[10px]">
                            {date.getDate()}
                        </span>
                        <span className="text-[8px]">
                            {ShortDayName[date.getDay()]}
                        </span>
                    </div>
                </ThEdura>
            </TooltipComp>
        )
    }

    if(teksKonten.length === 0){
        return (
                <ThEdura style={style} className="relative ring-0 outline-0 select-none">
                    <DropdownThKalendar 
                        isLibur={isLibur}
                        eventYet={eventYet}
                        data={objekKosong}
                        trigger={draftAction}
                        date={date}
                        />
                </ThEdura>
            )
    }

    return (
        <TooltipComp content={{children:<TooltipContentKeteranganKalendar kontenTooltip={teksKonten}/>}}>
            <ThEdura style={style} className="relative select-none ring-0 outline-0">
                    <DropdownThKalendar 
                        isLibur={isLibur}
                        eventYet={eventYet}
                        data={objekKosong}
                        trigger={draftAction}
                        date={date}
                        />
                </ThEdura>
        </TooltipComp>
    );
}

function TooltipContentKeteranganKalendar ({kontenTooltip}:{kontenTooltip:string[]}){
    return (
        <div className="p-1">
            {
                kontenTooltip.map((m,i)=>(
                    <p key={i}>{m}</p>
                ))
            }
        </div>
    )
}

function DropdownThKalendar({
    date,
    isLibur,
    eventYet,
    data,
    trigger,
    
}:{
    date:Date
    isLibur:boolean,
    eventYet:boolean,
    data:KaldikType,
    trigger:TriggerTable<KaldikType>[],
}){
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="select-none  ring-0 outline-0">
                {
                    (!isLibur && !eventYet) && (
                        <span className="rounded-full bg-green-500 h-2 w-2 absolute top-0.5 right-0.5 print:hidden" title="Hari Efektif"></span>
                    )
                }
                <div className="flex flex-col capitalize mt-1">
                    <span className="text-[10px]">
                        {date.getDate()}
                    </span>
                    <span className="text-[8px]">
                        {ShortDayName[date.getDay()]}
                    </span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent  align="start" className="bg-transparent shadow-none border-0 outline-1 z-10">
                {
                    trigger.map(({label, icon:Icon, callback}, index)=>(
                        <DropdownMenuItem 
                            key={index} 
                            className="group w-60 md:w-10 overflow-hidden rounded-none first-of-type:rounded-t-lg md:first-of-type:rounded-t-full last-of-type:rounded-b-lg md:last-of-type:rounded-b-full border-l    bg-linear-to-l from-sky-500 to-sky-100 border-sky-950 transition-width duration-300 md:hover:w-30 hover:border-gray-200 hover:shadow-lg hover:rounded-e-full first-of-type:hover:rounded-t-full last-of-type:hover:rounded-b-full has-focus:w-60 focus:bg-gray-500 hover:bg-gray-100 has-focus:shadow-lg"
                            >
                                <button
                                    onClick={(e)=>callback(data)}
                                    className="peer flex w-full cursor-pointer items-center gap-2.5 p-1 text-left text-sky-900 transition-width active:scale-95"
                                    >
                                        <Icon  className="aspect-square size-4 text-sky-900" />
                                        <div className="text-xs text-nowrap">{label}</div>
                                </button>
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}