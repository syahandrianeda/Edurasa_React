import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import ImportFilePdController from "./import-file-pd-controller";
import ControlPreviewImport from "./control-preview-import";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import ButtonSaveDapodikSheet from "../dapodik/button-save-dapodik-sheet";

export const ConfigImportFilePD:TabsConfigProps  = 
    {
        defaultValue:'tab1',
        tabList:[
                    {
                        value: 'tab1',
                        label: 'Import'
                    },
                    {
                        value: 'tab2',
                        label: 'Tampilan'
                    },
                ],
        contentList:[
                    {
                        value: 'tab1',
                        element: <ImportFilePd/>
                    },
                    {
                        value: 'tab2',
                        element: <PreviewImport/>
                    },
                ]
    }

function ImportFilePd(){
    const {value} = useFilterContext();
    const formDapodik = value?.extra?.formDapodik as Record<string, unknown>;
    return (
        <div className="bg-linear-to-tr text-xs text-center from-sky-300 to-sky-200 dark:from-sky-800 dark:to-sky-700 px-2 py-2">
            <p>Silakan Import File PD dari Dapodik di sini</p>
            <ImportFilePdController/>
            {
                formDapodik && (<ButtonSaveDapodikSheet formDapodik={formDapodik}/>)
            }
            <p>Anda akan menemukan kecocokan antara data pada aplikasi dengan data di Dapodik, silakan buka tab tampilan untuk melihat berbagai format</p>
        </div>
    )
}
function PreviewImport(){
    
    return (
        <div className="bg-linear-to-br text-xs text-center from-sky-300 to-sky-200 dark:from-sky-800 dark:to-sky-700 px-2 py-2">
            <p>Silakan Pilih Moda Tampilan Berikut</p>
            <ControlPreviewImport/>
            <p>Anda akan menemukan kecocokan antara data pada aplikasi dengan data di Dapodik</p>
            
        </div>
    )
}