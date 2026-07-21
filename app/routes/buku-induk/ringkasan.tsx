import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/ringkasan";
import { sheetAkun_dataSiswa } from "~/domain/enloaded/intial-enloaded/by-sheet/akun";
import { useAppSelector, useAppStore } from "~/context-reduct/hook";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import { GroupNisInduk } from "~/context-reduct/selectores/induk-nis-selector";
import { selectAllSiswaDTO } from "~/context-reduct/selectores/data-siswa-aktif";
import { ValidationPreRequesiteRiwayatRaport } from "~/domain/buku_induk/infrastructure/riwayat-raport/validation-riwayat-raport";
import type { SiswaType } from "~/types/siswa";


export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Edurasa';
    
    return [
        {
            title: mainTitle + ' | Buku Induk'
        },
        { 
            name: "description", 
            content: "Welcome to React Router!" 
        },
    ];
}


export function clientLoader({}:Route.ComponentProps){
    
   
    return {
        titleTambahan:'Ringkasan',
        // controlKelas: settingRombel,
        // toolbarTabs: ConfigToolbarSelectMape
        pesanLoading:'Memanggil ringkasan Buku Induk',
        // addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:false},
        sheetNeeded: [sheetAkun_dataSiswa],
        mustLoadSheetNeedSiswaIfExist:true
    };
}

export default function RingkasanBukuIndukRoute({loaderData}:Route.ComponentProps){
    const group = useAppSelector(GroupNisInduk)
    console.log(group.group)
    // const dataSiswaSelector = useAppSelector(selectAllSiswaDTO)
    // const dataSiswa = dataSiswaSelector.find(s=>s.id === 529)
    // const test = new ValidationPreRequesiteRiwayatRaport(dataSiswa as SiswaType)
    // test.evaluate();
    // console.log('test', dataSiswa, test.dataValidation)
    return (
        <div className="p-1">
            <h3 className="font-bold uppercase text-center text-3xl">Ringkasan Buku Induk</h3>
            <TableWithScrolling>
                <thead>
                    <TRowEdura>
                        <ThEdura rowSpan={2}>Prefix Induk</ThEdura>
                        <ThEdura rowSpan={2}>Jumlah Data Terlacak</ThEdura>
                        <ThEdura colSpan={3}>Validasi NIS</ThEdura>
                        <ThEdura rowSpan={2}>NISN Invalid</ThEdura>
                    </TRowEdura>
                    <TRowEdura>
                        <ThEdura>Jumlah seharusnya*</ThEdura>
                        <ThEdura>NIS Invalid**</ThEdura>
                        <ThEdura>Keterangan</ThEdura>
                    </TRowEdura>
                </thead>
                <tbody>
                    {
                        group && group.group.map(({groupNis, data, summary, dataOrderedInduk},index)=>
                            <TRowEdura key={index}>
                                <TdEdura className="text-center">{groupNis}</TdEdura>
                                <TdEdura className="text-center">{data.length}</TdEdura>
                                <TdEdura className="text-center">{dataOrderedInduk.length}</TdEdura>
                                <TdEdura className="text-center">{summary.countInvalidNis ===0?'':summary.countInvalidNis}</TdEdura>
                                <TdEdura className="text-center">{!summary.validGroup ? "NIS Tidak Valid": (dataOrderedInduk.length - data.length)>0?  (dataOrderedInduk.length - data.length)+ " NIS tidak terlacak":""}</TdEdura>
                                <TdEdura className="text-center">{summary.countInvalidNisn===0?"":summary.countInvalidNisn}</TdEdura>
                            </TRowEdura>
                        )
                    }
                </tbody>
            </TableWithScrolling>
            <div className="text-xs">
                Keterangan:
                <ul className="list-disc ms-4 list-outside">
                    <li className="list-item">* Jumlah seharusnya ditentukan berdasarkan urutan 3 digit angka terakhir di kelompok prefix NIS. Misal, XXXX_XX_081 berarti ada jumlah data seharusnya ada 81</li>
                    <li className="list-item">** NIS Invalid maksudnya NIS tersebut bisa kosong, salah format, terdapat spasi, atau duplikat dengan milik siswa lain. NIS berupa angka 9 digit</li>
                </ul>
                Ringkasan data ini memvalidasi data NIS/NISN saja. Data per siswa sangat memungkinkan memiliki data INVALID selanjutnya seperti tidak singkron-nya tahun masuk siswa, awal kelas masuk, dll
            </div>
        </div>
    )
}