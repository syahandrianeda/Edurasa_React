import {  type ComponentProps, type ReactNode } from "react";
import { cn } from "~/lib/utils";

export type CheckboxLabelProps = {
    children: ReactNode
    className?: string
} & Omit<ComponentProps<'input'>, 'type' | 'children'>

export default function CheckboxLabel({
    children,
    className,
    checked,
    onChange,
    ...props
    }: CheckboxLabelProps) {
    

    return (
        
            <label
                className={cn(
                "cursor-pointer rounded p-1 select-none",
                "shadow-lg shadow-sky-300",
                "border",
                // "peer-checked:bg-green-400 peer-checked:text-sky-900",
                "has-checked:bg-green-400 has-checked:text-sky-900",
                "[&>svg]:size-3",
                className
                )}
            >
                <input
                    
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="hidden peer"
                    {...props}
                />

                    {children}
        </label>
        
    )
}