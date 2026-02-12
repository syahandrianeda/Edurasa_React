import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar";
import { SwitchSabtuLibur } from "~/components/toolbars/state-toolbar/comp-switch";

export const ConfigToolbarKeteranganKaldik:TabsConfigProps =  {
        defaultValue:"tab1",
        tabList:[
            {
                value: 'tab1',
                label: 'Info'
            },
            ...TabConfigKopTtd.tabList
        ],
        contentList:[
            {
                value:'tab1',
                element:<TabSwitchSabtuLibur/>
            },
            ...TabConfigKopTtd.contentList
        ]
}
function TabSwitchSabtuLibur(){
    return (
        <div className="mt-5 flex h-20 w-1/2 flex-col justify-center mx-auto border align-middle gap-2 items-center">
            <SwitchSabtuLibur/>
        </div>
    )
}