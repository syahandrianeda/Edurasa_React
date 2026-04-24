import { Plus } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "~/lib/utils";

export default function ButtonAddAwesome({labelButton, className, ...props}:ComponentProps<'button'> & {labelButton:string}){
    return (
        <button 
            className={cn("group flex items-center mb-1 justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1",className)}
            {...props}
            >
                <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                    <Plus size={15} className="font-extrabold"/>
                </div>
                <div className="absolute right-5 transform translate-x-full opacity-0 text-xs font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    {labelButton}
                </div>
            </button>
    )
}