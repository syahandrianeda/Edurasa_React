import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import ToolbarContentIdentitas from "./toolbar-content-identitas";
import ToolbarContentTargetPaket from "./toolbar-content-target-paket";
import ToolbarContentKurikulum from "./toolbar-content-kurikulum";
import ToolbarContentJumlahSoal from "./toolbar-content-jumlah-soal";
import ToolbarContentKop from "./toolbar-content-kop";
import ToolbarContentDraft from "./toolbar-content-draft";
import ToolbarReset from "./toolbar-reset";

export const ConfigCreatePaketSoal:TabsConfigProps = {
    defaultValue:'tab1',
    tabList:[
        {
            value:'tab1',
            label:'Identitas'
        },
        {
            value:'tab2',
            label:'Kurikulum'
        },
        {
            value:'tab3',
            label:'Target Paket Soal'
        },  
        {
            value:'tab4',
            label:'Struktur Soal'
        },
        {
            value:'tab5',
            label: 'Elemen KOP'
        },
        {
            value:'tab6',
            label: 'Draft'
        },
        {
            value:'tab7',
            label: 'Reset'
        }
    ],
    contentList:[
        {
            value:'tab1',
            element:<ToolbarContentIdentitas/>
        },
        {
            value:'tab2',
            element:<ToolbarContentKurikulum/>
        },
        {
            value:'tab3',
            element:<ToolbarContentTargetPaket/>
        },
        {
            value:'tab4',
            element:<ToolbarContentJumlahSoal/>
        },
        {
            value:'tab5',
            element:<ToolbarContentKop/>
        },
        {
            value:'tab6',
            element:<ToolbarContentDraft/>
        },
        {
            value:'tab7',
            element:<ToolbarReset/>
        }
    ]
}