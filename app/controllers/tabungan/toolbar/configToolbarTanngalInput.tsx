import { TdEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar";
import { useAppSelector } from "~/context-reduct/hook";
import { DataDtoKategoriKeuangan, KategoriKeuanganCurrentAkun } from "~/context-reduct/selectores/kategori-keuangan-selector";
import { FokusRombelKeuangan } from "~/context-reduct/selectores/rombel-tabungan-selector";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";

import TanggalInput from "./tanggal-input-keuangan";

export const ConfigToolbarTanggalInput:TabsConfigProps =  {
    defaultValue: 'tab1',
    tabList:[
        {
            value: 'tab1',
            label: 'Setting Tanggal'
        },
        {
            value: 'tab2',
            label: 'Akses Kelas'
        },
        ...TabConfigKopTtd.tabList
    ],
    contentList:[
        {
            value: 'tab1',
            element: <TanggalInput/>
        },
        {
            value: 'tab2',
            element: <AksesKelas/>
        },
        ...TabConfigKopTtd.contentList
    ]
}
function AksesKelas(){
    const hakAkses = useAppSelector(KategoriKeuanganCurrentAkun);
    const fokus = useAppSelector(FokusRombelKeuangan);
    const DtoHakAkses = useAppSelector(DataDtoKategoriKeuangan)
    const aksesTabungan = hakAkses.find(s=>s.kategori === fokus?.kategori);
    const PengaksesLainKelasIni = DtoHakAkses.filter(s=>s.akses_kelas.includes(fokus?.rombel ?? getSessionRombel()))
    return (
    <div className="flex h-30">
        <div className="border-2 border-dashed rounded-2xl p-2 w-5/6 mx-auto">
            <TableWithScrolling className="bg-white border-0 rounded">
                <tbody>
                    <TRowEdura>
                        <TdEdura className="border-b border-t-0 border-s-0 border-e-0 w-5">Jenis Keuangan</TdEdura>
                        <TdEdura className="border-b border-t-0 border-s-0 border-e-0 w-1">:</TdEdura>
                        <TdEdura className="border-b border-t-0 border-s-0 border-e-0">Tabungan</TdEdura>
                    </TRowEdura>
                    <TRowEdura>
                        <TdEdura className="border-b border-t-0 border-s-0 border-e-0">Hak Akses Kelas Anda</TdEdura>
                        <TdEdura className="border-b border-t-0 border-s-0 border-e-0">:</TdEdura>
                        <TdEdura className="border-b border-t-0 border-s-0 border-e-0">{aksesTabungan?.akses_kelas?.join(', ')}</TdEdura>
                    </TRowEdura>
                    <TRowEdura>
                        <TdEdura className="border-b border-t-0 border-s-0 border-e-0">Penginput</TdEdura>
                        <TdEdura className="border-b border-t-0 border-s-0 border-e-0">:</TdEdura>
                        <TdEdura className="border-b border-t-0 border-s-0 border-e-0">{PengaksesLainKelasIni?.map((m, i)=><p key={i}>{m.nama_user}</p>)}</TdEdura>
                    </TRowEdura>
                </tbody>
            </TableWithScrolling>
        </div>
    </div>
    )
}
/**
 * {
        currentTgalInput:Date
    }
 */