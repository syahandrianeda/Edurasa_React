import type { TabsConfigProps } from "~/components/tabs/generate-tabs";

export const ConfigToolbarSinkronDapodik:TabsConfigProps  = 
    {
        defaultValue:'tab1',
        tabList:[
                    {
                        value: 'tab1',
                        label: 'Info'
                    },
                ],
        contentList:[
                    {
                        value: 'tab1',
                        element: <InfoSinkronDapodik/>
                    },
                ]
            }
function InfoSinkronDapodik(){
    return (
        <div className="bg-linear-to-tr text-xs from-sky-300 to-sky-200 dark:from-sky-800 dark:to-sky-700 px-2 py-2">
            Data siswa pada aplikasi ini perlu dicocokkan dengan data pada Dapodik. Hanya ada beberapa komponen penting yang harus disinkronkan. Yaitu:
            <ul className="list-decimal list-inside">
                <li className="list-item">Nama Siswa</li>
                <li className="list-item">Tempat Lahir</li>
                <li className="list-item">Tanggal Lahir</li>
                <li className="list-item">NISN</li>
                <li className="list-item">dan, Nama Ibu Kandung</li>
            </ul>
        </div>
    )
}