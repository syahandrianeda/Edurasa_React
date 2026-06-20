import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar";

export const ConfigToolbarMapel:TabsConfigProps =  {
        defaultValue:"tabTtd",
        tabList:TabConfigKopTtd.tabList,
        contentList:TabConfigKopTtd.contentList
        // tabList:[
        //     {
        //         value: 'tab1',
        //         label: 'Setting'
        //     },
        //     ...TabConfigKopTtd.tabList
        // ],
        // // tabList:TabConfigKopTtd.tabList,
        // // contentList:TabConfigKopTtd.contentList
        // contentList:[
        //     {
        //         value:'tab1',
        //         element:<SettingMapel/>
        //     },
        //     ...TabConfigKopTtd.contentList
        // ]
}
