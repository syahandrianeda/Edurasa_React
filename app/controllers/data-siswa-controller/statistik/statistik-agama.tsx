import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar";

export const ConfigToolbarStatistikAgama:TabsConfigProps =  {
    defaultValue:'tab1',
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
            element: <InfoStatistikAgama/>
        },
        ...TabConfigKopTtd.contentList
    ]
}
export function InfoStatistikAgama(){
    return (
        <div className="flex h-30 w-full justify-center items-center">Menampilkan Data Statistik Berdasarkan Agama</div>
    )
}