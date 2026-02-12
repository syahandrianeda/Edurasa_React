import { cn } from "~/lib/utils";
import ButtonTooltip from "../ui_edura/button-tooltip";
import type { CheckboxLabelProps } from "./checkbox-label";

export function SortirColumnControl({
    children,
    className,
    checked,
    onChange,
    ...props
    }: CheckboxLabelProps) {

    return (<div className="flex gap-1">
            <ButtonTooltip  asChild tooltip="Tampilkan Kontrol Sortir di Tabel" className={cn(
                'cursor-pointer rounded p-1 h-auto w-fit select-none border',
                "shadow-lg shadow-sky-300",
                "has-checked:bg-green-400 has-checked:text-sky-900",
                "[&>svg]:size-3",
                className
            )}>
                <label>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={onChange}
                        className="hidden peer"
                        {...props}
                    />

                    {children}
                </label>
            </ButtonTooltip>
        </div>
    )
}
