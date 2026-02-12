import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar";

export const ConfigToolbarStatistikUmur:TabsConfigProps =  {
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
            value: 'tab1',
            element: <InfoStatistikUmur/>
        },
        ...TabConfigKopTtd.contentList
    ]
}
export function InfoStatistikUmur(){
    return (
        <div className="flex h-30 w-full justify-center items-center">Menampilkan Data Statistik Berdasarkan Umur</div>
    )
}