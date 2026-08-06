import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { TabsContent } from "~/components/ui/tabs";
import GroupTabAsalSurat from "./group-tab-asal-surat";
import GroupTabUploadSuratMasuk from "./group-tab-upload-surat-masuk";
import SppdResumePreview from "../templates/sppd-resume";
import GroupTabSuratKeluar from "./group-tab-surat-keluar";


export const ConfigModalTabSuratMasuk:TabsConfigProps = {
    defaultValue:'tab1',
    tabList:[
        {
            value: 'tab1',
            label: 'Asal Surat'
        },
        {
            value: 'tab2',
            label: 'Upload Surat'
        },
        {
            value: 'tab3',
            label: 'Diteruskan ke Surat Keluar'
        }
    ],
    contentList:[
        {
            value: 'tab1',
            element: <GroupTabAsalSurat/>
        },
        {
            value: 'tab2',
            element: <GroupTabUploadSuratMasuk/>
        },
        {
            value: 'tab3',
            element: <GroupTabSuratKeluar/>
        },
    ]
}