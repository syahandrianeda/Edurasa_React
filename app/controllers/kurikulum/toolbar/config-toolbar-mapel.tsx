import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar";
import { Field, FieldContent } from "~/components/ui/field";
import ButtonTooltip from "~/components/ui_edura/button-tooltip";
import { cn } from "~/lib/utils";

export const ConfigToolbarMapel:TabsConfigProps =  {
        defaultValue:"tab1",
        tabList:[
            {
                value: 'tab1',
                label: 'Setting'
            },
            ...TabConfigKopTtd.tabList
        ],
        contentList:[
            {
                value:'tab1',
                element:<SettingMapel/>
            },
            ...TabConfigKopTtd.contentList
        ]
}

function SettingMapel(){
    return (
        <div className="p-1 min-h-20">
            <div className="w-1/2 mx-auto border">
                <div className="font-semibold w-full">Pengaturan</div>
                <div className="relative flex gap-1">
                    <ButtonTooltip asChild tooltip="Atur Daftar Mata Pelajaran di Kelas Anda" className={cn(
                                    'cursor-pointer rounded p-1 h-auto select-none border',
                                    "shadow-lg shadow-sky-300",
                                    "has-checked:bg-green-400 has-checked:text-sky-900",
                                    "[&>svg]:size-3",
                                )}>
                            <label>
                                <input
                                    type="radio"
                                    name="setting_mapel"
                                    className="hidden peer"
                                    // checked={value === v}
                                    // onChange={() => onChange(v)}
                                />
                                Daftar Mata Pelajaran
                            </label>
                    </ButtonTooltip>
                    <ButtonTooltip asChild tooltip="Atur Daftar Mata Pelajaran di Kelas Anda" className={cn(
                                    'cursor-pointer rounded p-1 h-auto select-none border',
                                    "shadow-lg shadow-sky-300",
                                    "has-checked:bg-green-400 has-checked:text-sky-900",
                                    "[&>svg]:size-3",
                                )}>
                            <label>
                                <input
                                    type="radio"
                                    name="setting_mapel"
                                    className="hidden peer"
                                    // checked={value === v}
                                    // onChange={() => onChange(v)}
                                />
                                Urutan Mata Pelajaran
                            </label>
                    </ButtonTooltip>
                </div>
            </div>
        </div>
    )
}