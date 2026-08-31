import type { ComponentProps } from "react";
import  { cn } from "~/lib/utils";

export default function GroupToolbar({children, className, ...props}:ComponentProps<"div">){

    return <div className={cn("flex flex-col justify-between border text-xs bg-slate-100 rounded px-2 w-full dark:has-[&>svg]:text-black", className)} {...props}>
        {children}
    </div>
}