import {  type ComponentProps, type ReactNode } from "react";
import { cn } from "~/lib/utils";

export type RadioLabelProps = {
    children: ReactNode
    className?: string
} & Omit<ComponentProps<'input'>, 'type' | 'children'>

export default function RadioboxLabels({
    children,
    className,

    checked,
    onChange,
    ...props
    }: RadioLabelProps) {
    

    return (
        
            <label
                className={cn(
                "cursor-pointer rounded p-1 select-none",
                "shadow-lg shadow-sky-300",
                "border",
                // "peer-checked:bg-green-400 peer-checked:text-sky-900",
                "has-checked:bg-green-400 has-checked:text-sky-900",
                "[&>svg]:size-4",
                className
                )}
            >
                <input
                    
                    type="radio"
                    // name="radio_name"
                    checked={checked}
                    onChange={onChange}
                    className="hidden peer"
                    {...props}
                />

                    {children}
        </label>
        
    )
}