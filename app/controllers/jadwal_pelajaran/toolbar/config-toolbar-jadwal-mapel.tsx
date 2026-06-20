
import type { TabsConfigProps } from "~/components/tabs/generate-tabs"
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar"
import MainSettingJadwal from "./setting_jadwal/main-setting-jadwal"
import MainSettingMapel from "./setting_jadwal/main-setting-mapel"

export const ConfigToolbarJadwalMapel:TabsConfigProps =  {
        defaultValue:"tab1",
        tabList:[
            {
                value: 'tab1',
                label: 'Setting Mapel'
            },
            {
                value: 'tab2',
                label: 'Format Jadwal'
            },
            ...TabConfigKopTtd.tabList
        ],
        contentList:[
            {
                value:'tab1',
                element:<MainSettingMapel/>
            },
            {
                value:'tab2',
                element:<MainSettingJadwal/>
            },
            ...TabConfigKopTtd.contentList
        ]
}

