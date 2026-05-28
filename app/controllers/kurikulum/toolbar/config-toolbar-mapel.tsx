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
        // tabList:TabConfigKopTtd.tabList,
        // contentList:TabConfigKopTtd.contentList
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
                <div className="font-semibold w-full">Daftar Mata Pelajaran di Kelas Anda</div>
                
            </div>
        </div>
    )
}