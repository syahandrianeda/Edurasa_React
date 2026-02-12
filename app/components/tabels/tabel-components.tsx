import type { ComponentProps } from "react";
import { cn } from "~/lib/utils";

export function TableEdura({className, ...props}:ComponentProps<'table'>){
    return (
        <table 
            className={cn("border-collapse border  border-zinc-600", className)}
            {...props}
        />
    )
}

export function ThEdura({className, style, ...props}: ComponentProps<'th'>){
    return (
        <th 
            style={style}
            className={cn("border border-zinc-600  bg-zinc-200 p-1 align-center text-center uppercase text-nowrap", className)}
            {...props}
        />
    )
}
export function THEduraFreeze({stateFreeze=false, className, style, ...props}:ComponentProps<'th'> & {stateFreeze?:boolean}){
    const classFreeze= stateFreeze?`sticky left-0 z-5 print:static
                        shadow-[inset_-0.5px_0px_rgb(221,221,221)]
                        border border-black ${className}`:`relative ${className}`;
    return(
        <ThEdura 
            style={style}
            className={cn(classFreeze)}
            {...props}
        />
    )
}
export function TdEduraFreeze({stateFreeze=false, className, style, ...props}:ComponentProps<'th'> & {stateFreeze?:boolean}){
    const classFreeze= stateFreeze?`sticky left-0 z-5 uppercase align-middle print:static
                        shadow-[inset_-0.5px_0px_rgb(221,221,221)]
                        border border-black ${className}`:`align-middle ${className}`;
    return(
        <TdEdura 
            style={style}
            className={cn(classFreeze)}
            {...props}
        />
    )
}
export function TRowEdura({className, ...props}:ComponentProps<'tr'>){
    return (
        <tr className={cn("odd:bg-zinc-100  even:bg-transparent print:odd:bg-transparent", className)
        }
        {...props}
        />
    )
}

export function TdEdura({className, children, ...props}: ComponentProps<'th'>){
    return (
        <td 
            className={cn("border border-zinc-600 py-1 px-2 z-10 align-top text-nowrap", className)}
            {...props}>{children}</td>
        
    )
}
