import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar";
import { SwitchIncludingHariEfektif, SwitchIsBottomKalendar, SwitchSabtuLibur } from "~/components/toolbars/state-toolbar/comp-switch";

export const ConfigToolbarKaldikSemester:TabsConfigProps =  {
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
        <div className="mt-5 flex  w-4/6 py-2 rounded-xl bg-linear-to-r from-sky-300 to-sky-100 flex-col justify-center mx-auto border border-sky-400/50 align-middle gap-2 items-center">
            <SwitchSabtuLibur/>
            <SwitchIsBottomKalendar/>
            <SwitchIncludingHariEfektif/>
        </div>
    )
}