import type { ComponentProps, ReactNode } from "react";
import { cn } from "~/lib/utils";

export function WrapperContentForm({keyTitle,children}:{keyTitle:string|ReactNode, children:ReactNode}){
    return (
        <WrapRelative className="rounded-tr-2xl pe-2 mt-6 shadow-md shadow-sky-800">  
            <div className="absolute -top-5 left-0 ps-1 pe-4 font-bold bg-linear-to-tl from-sky-300 via-amber-300 to-purple-300 rounded-tr-2xl">{keyTitle}</div>
            <div className="border-b border-s mt-1">{children}</div>
        </WrapRelative>
    )
}

export function WrapRelative({className, ...props}:ComponentProps<'div'>){
    return <div 
                className={cn("relative text-sm col-span-12 mt-4 mb-2 py-2 bg-linear-to-tr from-sky-300 via-purple-300 to-amber-300", className)}
                {...props}
                />
}
export function TitleContenForm({className, ...props}:ComponentProps<'div'>){
    return <div 
                className={cn("md:col-span-3", className)}
                {...props}
                />
}
export function ContentForm({className, ...props}:ComponentProps<'div'>){
    return<div
                className={cn("md:col-span-9 ps-2", className)}
                {...props}
                />
}