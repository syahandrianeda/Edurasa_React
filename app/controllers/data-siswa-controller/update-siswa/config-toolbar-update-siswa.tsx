import type { TabsConfigProps } from "~/components/tabs/generate-tabs";

export const ConfigUpdateDataSiswa:TabsConfigProps  = 
    {
        defaultValue:'tab1',
        tabList:[
                    {
                        value: 'tab1',
                        label: 'Memproses'
                    },
                ],
        contentList:[
                    {
                        value: 'tab1',
                        element: <ProsesTab/>
                    },
                ]
            }

function ProsesTab(){
    return (
        <div className="bg-sky-300">Sedang Memproses</div>
    )
}