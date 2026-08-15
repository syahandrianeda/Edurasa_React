import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar";
import ControlKoleksiFormSerahTerimaDokumen from "./control-koleksi-form-serah-terima";

export const ConfigToolbarKoleksiSerahTerimaDokumen:TabsConfigProps =  {
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
                element:<ControlKoleksiFormSerahTerimaDokumen/>
            },
            
            ...TabConfigKopTtd.contentList
        ]
}
