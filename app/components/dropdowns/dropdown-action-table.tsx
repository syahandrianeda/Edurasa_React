import { cn } from "~/lib/utils"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import {  Settings, type LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
import TooltipComp from "../ui_edura/tooltip-comp"
import ButtonCommitAwesome from "../button-awesome/commit-button"


export interface ActionDropdownTable<T>{
    data: T,
    trigger:TriggerTable<T>[]
}

export interface TriggerTable<T>{
    label: string
    icon: LucideIcon
    callback:(m:T)=>void
}

export function DropdownButtonsModal({
    className,
    children
}:{
    className?:string,
    children:React.ReactNode
}){

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <TooltipComp content={`Aksi`}>
                    <Button
                        className={cn("flex h-fit w-fit px-2 py-1 items-center justify-center gap-[0.5em] rounded-ful",
                                    "bg-sky-700 text-white shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),0px_0px_4px_1px_var(--color-sky-100),0px_4px_0px_0px_var(--color-sky-800)]",
                                    "active:shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),1px_0px_2px_1px_#f9d1d1]", 
                                    "duration-250 hover:translate-y-[0.25em] active:translate-y-[0.5em]",
                                    className)}
                        variant="outline"   
                        size="icon"
                        asChild
                    >
                        <Settings size={12} className="h-2 w-2 outline-0 border-0 ring-0 border-transparent mx-auto"/>
                    </Button>
                    {/* <ButtonCommitAwesome className={cn('px-2 py-0 border-0 outline-0 ring-0 justify-center', className)} labelButton="">
                        <Settings className="h-3 w-3 outline-0 border-0 ring-0 border-transparent mx-auto" size={10}/>
                    </ButtonCommitAwesome> */}
                </TooltipComp> 
            </DropdownMenuTrigger>
            {children}
        </DropdownMenu>
    )
}

export function DropdownButtonsModalNonIcon({
    label,
    className,
    children
}:{
    label:string|number,
    className?:string,
    children:React.ReactNode
}){

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {label}
            </DropdownMenuTrigger>
            {children}
        </DropdownMenu>
    )
}

export function ActionButtonTable<T>({data, trigger,
    className,
    tooltipMessage,
    IconButton,
    labelButton,
}:ActionDropdownTable<T> & {
     className?:string,
    tooltipMessage?:string
    IconButton?:LucideIcon,
    labelButton?: string
}){
    return (
        <DropdownButtonsModalCustom className={className} tooltipMessage={tooltipMessage} IconButton={IconButton} labelButton={labelButton}>
            <DropdownMenuContent  align="start" className="bg-transparent shadow-none border-0 outline-1">
                {
                    trigger.map(({label, icon:Icon, callback}, index)=>(
                        <DropdownMenuItem 
                            key={index} 
                            tabIndex={-1}
                            className="group w-60 md:w-10 overflow-hidden rounded-none first-of-type:rounded-t-lg md:first-of-type:rounded-t-full last-of-type:rounded-b-lg md:last-of-type:rounded-b-full border-l    bg-linear-to-l from-sky-500 to-sky-100 border-sky-950 transition-width duration-300 md:hover:w-56 hover:border-gray-200 hover:shadow-lg hover:rounded-e-full first-of-type:hover:rounded-t-full last-of-type:hover:rounded-b-full has-focus:w-fit focus:bg-gray-500 hover:bg-gray-100 has-focus:shadow-lg"
                            >
                                
                                    <button
                                        tabIndex={-1}
                                        onClick={()=>callback(data)}
                                        className="peer flex w-full select-none cursor-pointer items-center gap-2.5 p-1 text-left text-sky-900 transition-width active:scale-95"
                                        >
                                        <Icon  className="aspect-square size-4 text-sky-900" />
                                        <div className="text-xs text-nowrap">{label}</div>
                                    </button>
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownButtonsModalCustom>
    )
}

export function ActionButtonTableMini<T>({data, trigger}:ActionDropdownTable<T>){
    return (
        <DropdownButtonsModal className=" bg-green-700 text-white shadow-[inset_0px_-4px_4px_0px_var(--color-green-600),0px_0px_4px_1px_var(--color-green-100),0px_4px_0px_0px_var(--color-green-800)] active:shadow-[inset_0px_-4px_4px_0px_var(--color-green-600),1px_0px_2px_1px_#f9d1d1]">
            <DropdownMenuContent  align="start" className="bg-transparent shadow-none border-0 outline-1">
                {
                    trigger.map(({label, icon:Icon, callback}, index)=>(
                        <DropdownMenuItem 
                            key={index} 
                            tabIndex={-1}
                            className="group w-60 md:w-10 overflow-hidden rounded-none first-of-type:rounded-t-lg md:first-of-type:rounded-t-full last-of-type:rounded-b-lg md:last-of-type:rounded-b-full border-l    bg-linear-to-l from-sky-500 to-sky-100 border-sky-950 transition-width duration-300 md:hover:w-30 hover:border-gray-200 hover:shadow-lg hover:rounded-e-full first-of-type:hover:rounded-t-full last-of-type:hover:rounded-b-full has-focus:w-60 focus:bg-gray-500 hover:bg-gray-100 has-focus:shadow-lg"
                            >
                                
                                    <button
                                        tabIndex={-1}
                                        onClick={()=>callback(data)}
                                        className="peer flex w-full select-none cursor-pointer items-center gap-2.5 p-1 text-left text-sky-900 transition-width active:scale-95"
                                        >
                                        <Icon  className="aspect-square size-4 text-sky-900" />
                                        <div className="text-xs text-nowrap">{label}</div>
                                    </button>
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownButtonsModal>
    )
}

export function ActionButtonTableNonIcon<T>({data,trigger, konten}:ActionDropdownTable<T> &{konten:string|number}){
    return (
        <DropdownButtonsModalNonIcon label={konten}>
            <DropdownMenuContent  align="start" className="bg-transparent shadow-none border-0 outline-1">
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
        </DropdownButtonsModalNonIcon>
    )
}


export function DropdownButtonsModalCustom({
    className,
    children,
    tooltipMessage,
    IconButton,
    labelButton
}:{
    className?:string,
    children:React.ReactNode,
    tooltipMessage?:string
    IconButton?:LucideIcon,
    labelButton?: string
}){

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <TooltipComp content={tooltipMessage ?? 'Aksi'}>
                    <Button
                        className={cn("flex h-fit w-fit items-center justify-center gap-[0.5em] rounded-full bg-sky-700 px-4 py-0 text-white shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),0px_0px_4px_1px_var(--color-sky-100),0px_4px_0px_0px_var(--color-sky-800)] duration-250 hover:translate-y-[0.25em] active:translate-y-[0.5em] active:shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),1px_0px_2px_1px_#f9d1d1]",
                                    className)}
                        variant="outline"   
                        size="icon"
                        asChild
                    >
                        <div>
                        {
                            IconButton ? (
                                <IconButton size={12} className="font-extrabold"/>

                            ):(
                                <Settings size={12} className="font-extrabold"/>
                            )
                        }
                        {
                            labelButton && (
                                <p className="[text-shadow:0px_1px_1px_0px_#950000]">{labelButton}</p>

                            )
                        }
                        </div>
                    </Button>
                    {/* <ButtonCommitAwesome className={cn('px-2 py-0 border-0 outline-0 ring-0 justify-center', className)} labelButton="">
                        <Settings className="h-3 w-3 outline-0 border-0 ring-0 border-transparent mx-auto" size={10}/>
                    </ButtonCommitAwesome> */}
                </TooltipComp> 
            </DropdownMenuTrigger>
            {children}
        </DropdownMenu>
    )
}
