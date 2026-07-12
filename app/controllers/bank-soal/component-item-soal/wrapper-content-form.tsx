import type { ComponentProps, ReactNode } from "react";
import { cn } from "~/lib/utils";

export function WrapperContentForm({keyTitle,children}:{keyTitle:string|ReactNode, children:ReactNode}){
    return (
        <>
            <TitleContenForm className="border-b mt-1">{keyTitle}</TitleContenForm>
            <ContentForm className="border-b border-s mt-1 bg-white">{children}</ContentForm>
        </>
    )
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