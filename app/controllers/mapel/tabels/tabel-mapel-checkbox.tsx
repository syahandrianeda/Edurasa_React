import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useAppSelector } from "~/context-reduct/hook";
import { DtoMapelSelector } from "~/context-reduct/selectores/mapel-selector";

export default function TableMapelCheckbox(){
    
    const dataMapel = useAppSelector(DtoMapelSelector);
    

    return (
        <>
            <TableWithScrolling>
                <thead>
                    <TRowEdura>
                        <ThEdura>No</ThEdura>
                        <ThEdura>Kode</ThEdura>
                        <ThEdura>Nama Mapel</ThEdura>
                        <ThEdura>Kelompok</ThEdura>
                        <ThEdura>Keterangan</ThEdura>
                        <ThEdura>Aksi</ThEdura>
                    </TRowEdura>
                </thead>
                <tbody>
                    {
                        dataMapel.filter(s=>s.kurikulum === 'kurmer').map((data, index)=>
                            <TRowEdura key={data.id}>
                                <TdEdura>{index+1}</TdEdura>
                                <TdEdura>{data.kode}</TdEdura>
                                <TdEdura>{data.nama}</TdEdura>
                                <TdEdura>{data.kelompok}</TdEdura>
                                <TdEdura></TdEdura>
                                <TdEdura>aksi</TdEdura>
                            </TRowEdura>
                        )
                    }
                </tbody>
            </TableWithScrolling>
            <div className="p-2 border text-xs">
                Keterangan:
                <ul className="list-decimal list-outside ms-2">
                    <li className="list-item">
                        Aplikasi ini mengelompokkan mata pelajaran berdasarkan 3 kelompok utama: <strong>Agama, Umum, dan Pilihan</strong>
                    </li>
                    <li className="list-item">
                        Mata pelajaran Agama adalah mata pelajaran yang disediakan berdasarkan agama yang dianut murid dalam satu rombel
                    </li>
                    <li className="list-item">
                        Mata pelajaran Umum adalah mata pelajaran muatan Nasional yang harus ada dalam kurikulum
                    </li>
                    <li className="list-item">
                        Mata pelajaran Pilihan adalah mata pelajaran muatan Nasional maupun lokal yang dipilih berdasarkan KSP masing-masing sekolah. Khusus mata pelajaran PJOK, mata pelajaran ini dikategorikan pilihan karena mengacu pada Lampiran 2 Permendikbud No. 13 Tahun 2025 (dan/atau Permendikbudristek No. 12 Tahun 2024) yang menyebutkan bahwa:
                        <blockquote className="border-s-4 p-3 rounded-tl-4xl border-t-2 mt-3 italic font-semibold tracking-tight text-heading">
                            Muatan Lokal merupakan muatan pembelajaran tentang potensi dan keunikan lokal berupa:.
                            <ul className="list-[lower-alpha] list-inside">
                                <li className="list-item">Seni Budaya</li>
                                <li className="list-item">Prakarya</li>
                                <li className="list-item">Pendidikan jasmani, olahraga, dan kesehatan</li>
                                <li className="list-item">teknologi</li>
                            </ul>
                        </blockquote>
                    </li>
                </ul>
            </div>
        </>
    )
}