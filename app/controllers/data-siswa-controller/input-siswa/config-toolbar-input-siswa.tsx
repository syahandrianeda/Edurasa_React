import type { TabsConfigProps } from "~/components/tabs/generate-tabs";

export const ConfigToolbarInputSiswa:TabsConfigProps =  {
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
            element: <InfoInputToolbar/>
        },
    ]
}

function InfoInputToolbar(){
    return (
        <div className="bg-linear-to-br text-xs text-center min-h-10 align-middle from-sky-300 to-sky-200 dark:from-sky-800 dark:to-sky-700 px-2 py-2">
            
            Fitur ini digunakan untuk membuat menginput siswa baru. Pastikan siswa tersebut baru saja pindah/daftar di sekolah ini. Jika siswa telah lama ada (bukan siswa baru/pindahan), maka cari dulu di fitur pencarian untuk mengubah <strong>status</strong> atau <strong>pindah kelas</strong>.
            
        </div>
    )
}