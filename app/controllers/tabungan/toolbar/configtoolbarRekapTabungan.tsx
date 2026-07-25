import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar";
import JenisRekapKeuangan from "./jenis-rekap-keuangan";

export const ConfigToolbarRekapTabungan:TabsConfigProps =  {
    defaultValue: 'tab1',
    tabList:[
        {
            value: 'tab1',
            label: 'Jenis Rekap'
        },
        ...TabConfigKopTtd.tabList
    ],
    contentList:[
        {
            value: 'tab1',
            element: <JenisRekapKeuangan/>
        },
        ...TabConfigKopTtd.contentList
    ]
}