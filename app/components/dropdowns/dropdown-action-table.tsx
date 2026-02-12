import { cn } from "~/lib/utils"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import {  Settings, type LucideIcon } from "lucide-react"
import type { ReactNode } from "react"


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
                <Button
                    className={cn("bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent shadow-none border-0 outline-0 ring-0", className)}
                    variant="outline"   
                    size="icon"
                    asChild
                >
                    <Settings className="h-4 w-4 outline-0 border-0 ring-0 border-transparent mx-auto"/>
                </Button>
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

export function ActionButtonTable<T>({data, trigger}:ActionDropdownTable<T>){
    return (
        <DropdownButtonsModal>
            <DropdownMenuContent  align="start" className="bg-transparent shadow-none border-0 outline-1">
                {
                    trigger.map(({label, icon:Icon, callback}, index)=>(
                        <DropdownMenuItem 
                            key={index} 
                            className="group w-60 md:w-10 overflow-hidden rounded-none first-of-type:rounded-t-lg md:first-of-type:rounded-t-full last-of-type:rounded-b-lg md:last-of-type:rounded-b-full border-l    bg-linear-to-l from-sky-500 to-sky-100 border-sky-950 transition-width duration-300 md:hover:w-30 hover:border-gray-200 hover:shadow-lg hover:rounded-e-full first-of-type:hover:rounded-t-full last-of-type:hover:rounded-b-full has-focus:w-60 focus:bg-gray-500 hover:bg-gray-100 has-focus:shadow-lg"
                            >
                                <button
                                    onClick={()=>callback(data)}
                                    className="peer flex w-full cursor-pointer items-center gap-2.5 p-1 text-left text-sky-900 transition-width active:scale-95"
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
