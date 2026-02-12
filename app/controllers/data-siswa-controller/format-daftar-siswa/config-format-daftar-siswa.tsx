
import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar";
import { ControlJudul, ControlParagrafAtas, ControlParagrafBawah } from "./control-text-editor";
import { ControlFilterSumberData } from "./control-sumber-data";
import { ControlToolbarDesignTabel } from "~/components/toolbars/state-toolbar/comp-design-table-edurasa";

export const ConfigFormatDaftarSiswa:TabsConfigProps =  {
    defaultValue:"tab1",
    tabList:[
        {
            value: 'tab1',
            label: 'Fitur'
        },
        {
            value: 'tab4',
            label: 'Judul'
        },
        {
            value: 'tab2',
            label: 'Sumber Data'
        },
        {
            value: 'tab3',
            label: 'Format Tabel'
        },
        ...TabConfigKopTtd.tabList
    ],
    contentList:[
        {
            value: 'tab1',
            element: <InfoDaftarSiswaToolbar/>
        },
        {
            value: 'tab4',
            element: <JudulDeskripsi/>
        },
        {
            value: 'tab2',
            element: <SumberData/>
        },
        {
            value: 'tab3',
            element: <FormatHeader/>
        },
        ...TabConfigKopTtd.contentList
    ]
}

function InfoDaftarSiswaToolbar(){
    

    return (
        <div className="bg-linear-to-br text-xs from-sky-300 to-sky-200 dark:from-sky-800 dark:to-sky-700 px-2 py-2">
            
            Fitur ini digunakan untuk membuat Daftar Siswa. Anda dapat memilih <strong>Sumber Data</strong> sebagai isian datanya, <strong>Format Tabel</strong> untuk Header tabel yang ingin ditampilkan.<br/>
            Fitur ini berguna untuk:
            <ol className="list-disc list-inside">
                <li className="list-item">Membuat Daftar Pengambilan Rapor</li>
                <li className="list-item">Membuat Daftar Hadir Ekstrakurikuler</li>
                <li className="list-item">Membuat Daftar Hadir Orang Tua Siswa</li>
                <li className="list-item">dll</li>
            </ol>
        </div>
    )
}
function SumberData(){
    return (
        <div className="bg-linear-to-br text-center text-xs from-sky-300 to-sky-200 dark:from-sky-800 dark:to-sky-700 px-2 py-2">
            Silakan pilih kriteria berikut untuk memfilter sumber data siswa yang akan ditampilkan.
            <div className="flex gap-x-2  bg-linear-to-bl from-sky-100 to-sky-400 dark:from-sky-600 dark:to-sky-500 inset-shadow-sky-800 rounded-2xl">
                <ControlFilterSumberData/>
            </div>
        </div>
    )
}
function FormatHeader(){
    return (
        <div className="bg-linear-to-br text-center text-xs from-sky-300 to-sky-200 dark:from-sky-800 dark:to-sky-700 px-2 py-2">
            Pilih Header Tabel sehingga bentuk tabel akan mempunyai Header sebagai berikut:
             <ControlHeaderTable/>
        </div>
    )
}
function JudulDeskripsi(){
    return (
        <div className="bg-linear-to-br text-center text-xs from-sky-300 to-sky-200 dark:from-sky-800 dark:to-sky-700 px-2 py-2">
            Ketikkan Judul Format Daftar. Anda dapat menambahkan Judul dan deskripsi di atas/di bawah tabel.
            <div className="flex flex-col gap-4 md:flex-row border m-1 px-2">
                <ControlJudul/>
                <div className="flex-1 flex-col">
                    <ControlParagrafAtas/>
                    <ControlParagrafBawah/>
                </div>
            </div>
        </div>
    )
}

function ControlHeaderTable(){
    
    return (
        <div className="flex flex-col min-h-50 text-start">
            <ControlToolbarDesignTabel/>
        </div>
    )
}