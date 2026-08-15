//https://uiverse.io/Uncannypotato69/loud-cow-23
import { Component, SaveAllIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "~/lib/utils";

export default function ButtonCommitAwesome({labelButton, className, children, ...props}:ComponentProps<'button'> & {labelButton:string, children?:ReactNode}){
    return (
        <button
            className={cn("flex h-fit w-fit items-center justify-center gap-[0.5em] rounded-full bg-sky-700 px-[2em] py-[1em] text-white shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),0px_0px_4px_1px_var(--color-sky-100),0px_4px_0px_0px_var(--color-sky-800)] duration-250 hover:translate-y-[0.25em] active:translate-y-[0.5em] active:shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),1px_0px_2px_1px_#f9d1d1]",className)}
            {...props}
            type="button"
        >
            {
                children || <Component size={15} className="font-extrabold"/>
            }
            <p className="[text-shadow:0px_1px_1px_0px_#950000]">{labelButton}</p>
        </button>
    )
}