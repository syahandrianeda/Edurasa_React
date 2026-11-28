import { DataSiswaAktifRombel } from "~/context-reduct/selectores/data-siswa-aktif";
import ExportTujuanPembelajaran from "./comp-e-raport-helper/export-tujuan-pembelajaran";
import { useAppSelector } from "~/context-reduct/hook";
import ExportNilaiUntukERaport from "./comp-e-raport-helper/export-nilai-untuk-e-raport";

export default function ERaportHelperPage(){
    const dataSiswa = useAppSelector(DataSiswaAktifRombel);
    return (
        <div className="p-1">
            <h3 className="uppercase text-center font-bold">Contoh Format Tujuan Pembelajaran E-Raport</h3>
            <ExportTujuanPembelajaran/>
            <h3 className="uppercase text-center font-bold">Contoh Format Tujuan Pembelajaran E-Raport</h3>
            <ExportNilaiUntukERaport siswa={dataSiswa ?? []}/>
        </div>
    )
}