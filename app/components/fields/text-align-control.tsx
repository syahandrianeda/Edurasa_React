import { AlignCenter, AlignLeft, AlignRight, type LucideIcon } from "lucide-react"
import { cn } from "~/lib/utils";
import type { EditorSectionKey } from "../toolbars/state-toolbar/interface-toolbar-edtor";
import ButtonTooltip from "../ui_edura/button-tooltip";
type domain = {
    icon: LucideIcon,
    value: string,
    label:string
}
const  TEXT_ALIGN_DOMAIN: domain[] = [
    {
        label:'Rata Kiri',
        icon: AlignLeft,
        value: 'text-start'
    },
    {   
        label: 'Rata Tengah',
        icon: AlignCenter,
        value: 'text-center'
    },
    {
        label: 'Rata Kanan',
        icon: AlignRight,
        value: 'text-end'
    },
];

export const TEXT_ALIGN = TEXT_ALIGN_DOMAIN.map(f => f.value) as readonly string[];

export function RadioTextAlign({
    value,
    onChange,
    sectionKey
    }: {
    value?: string
    onChange: (value?: string) => void
    sectionKey?: EditorSectionKey
    }) {

    return (
        <div className="flex gap-1">
            {
                TEXT_ALIGN_DOMAIN.map(({ icon: Icon, value: v, label }) => (
                    <ButtonTooltip key={v} asChild tooltip={label} className={cn(
                                'cursor-pointer rounded p-1 h-auto w-fit select-none border',
                                "shadow-lg shadow-sky-300",
                                "has-checked:bg-green-400 has-checked:text-sky-900",
                                "[&>svg]:size-3",
                            )}>
                        <label>
                            <input
                                type="radio"
                                name={`text-align-${sectionKey}`}
                                className="hidden peer"
                                checked={value === v}
                                onChange={() => onChange(v)}
                            />
                            <Icon />
                        </label>
                    </ButtonTooltip>
                ))
            }
        </div>
    )
}
