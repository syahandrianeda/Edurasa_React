import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar";


export const ConfigToolbarJadwalMapelAll:TabsConfigProps =  {
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
                element:<InfoJadwalMapelAll/>
            },
            
            ...TabConfigKopTtd.contentList
        ]
}

function InfoJadwalMapelAll(){
    return (
        <div>
            <p className="text-center mt-5">Menampilkan seluruh data jadwal yang telah dibuat Guru Kelas (data yang disimpan di server saja)</p>
        </div>
    )
}   