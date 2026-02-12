import { Fragment, useMemo } from "react";
import { TableEdura, TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import { useAppSelector } from "~/context-reduct/hook"
import { DataSiswaAktif } from "~/context-reduct/selectores/data-siswa-aktif"
import KesiswaanData from "~/domain/kesiswaan/kesiswaan-data";
import { DataRombelUI } from "~/domain/rombel/data-rombel";
import { currentTapel } from "~/lib/current-tapel";
import { groupBy } from "~/lib/group-by";
import { Gender } from "~/types/enums/gender";

export default function StatistikUmurPage(){
    const Siswa = useAppSelector(DataSiswaAktif);
    
    const SiswaStatistik = useMemo(()=>{
        return new KesiswaanData(Siswa)
    },[
        Siswa
    ]);

    const groupedByJenjang = groupBy(
        DataRombelUI.filter(item => item.active),
        item => item.jenjang
    );

    return (
        <div className="mt-2">
            <h3 className="text-2xl font-bold mb-0 text-center leading-normal uppercase">Data Siswa Berdasarkan Umur</h3>
            <h4 className="font-bold text-center mb-5">{currentTapel({variant:'full'})}</h4>
            <TableEdura className="w-full text-xs">
                <thead>
                    <TRowEdura>
                        <ThEdura colSpan={2} rowSpan={2}>Kelas</ThEdura>
                        <ThEdura colSpan={9}>Kelompok Umur</ThEdura>
                        <ThEdura rowSpan={3}>Jumlah</ThEdura>
                        <ThEdura rowSpan={3}>Total</ThEdura>
                    </TRowEdura>
                    <TRowEdura>
                        <ThEdura colSpan={3}>≤6 Tahun</ThEdura>
                        <ThEdura colSpan={3}>7 - 12 Tahun</ThEdura>
                        <ThEdura colSpan={3}>≥13 Tahun</ThEdura>
                    </TRowEdura>
                    <TRowEdura>
                        <ThEdura>Jenjang</ThEdura>
                        <ThEdura>Rombel</ThEdura>
                        <ThEdura>L</ThEdura>
                        <ThEdura>P</ThEdura>
                        <ThEdura>Jumlah</ThEdura>
                        <ThEdura>L</ThEdura>
                        <ThEdura>P</ThEdura>
                        <ThEdura>Jumlah</ThEdura>
                        <ThEdura>L</ThEdura>
                        <ThEdura>P</ThEdura>
                        <ThEdura>Jumlah</ThEdura>
                    </TRowEdura>
                </thead>
                <tbody>
                    {
                        Object.entries(groupedByJenjang).map(([jenjang, rombels]) => (
                            <Fragment key={jenjang}>
                            {rombels.map((r, index) => (
                                <TRowEdura key={r.id}>
                                {/* Jenjang hanya di baris pertama */}
                                {index === 0 && (
                                    <TdEdura className="text-center align-middle" rowSpan={rombels.length}>
                                    {jenjang}
                                    </TdEdura>
                                )}
                                    <TdEdura className="text-center">{r.rombelName}</TdEdura>
                                    <TdEdura className="text-center">{SiswaStatistik.countUmurGender('<=6',Gender.LAKI_LAKI,r.rombelName)}</TdEdura>
                                    <TdEdura className="text-center">{SiswaStatistik.countUmurGender('<=6',Gender.PEREMPUAN,r.rombelName)}</TdEdura>
                                    <TdEdura className="text-center">{SiswaStatistik.countUmurGenders('<=6',[Gender.PEREMPUAN, Gender.LAKI_LAKI, Gender.UNKNOWN],r.rombelName)}</TdEdura>
                                    <TdEdura className="text-center">{SiswaStatistik.countUmurGender('7-12',Gender.LAKI_LAKI,r.rombelName)}</TdEdura>
                                    <TdEdura className="text-center">{SiswaStatistik.countUmurGender('7-12',Gender.PEREMPUAN,r.rombelName)}</TdEdura>
                                    <TdEdura className="text-center">{SiswaStatistik.countUmurGenders('7-12',[Gender.PEREMPUAN, Gender.LAKI_LAKI, Gender.UNKNOWN],r.rombelName)}</TdEdura>
                                    <TdEdura className="text-center">{SiswaStatistik.countUmurGender('>=13',Gender.LAKI_LAKI,r.rombelName)}</TdEdura>
                                    <TdEdura className="text-center">{SiswaStatistik.countUmurGender('>=13',Gender.PEREMPUAN,r.rombelName)}</TdEdura>
                                    <TdEdura className="text-center">{SiswaStatistik.countUmurGenders('>=13',[Gender.PEREMPUAN, Gender.LAKI_LAKI, Gender.UNKNOWN],r.rombelName)}</TdEdura>
                                    <TdEdura className="text-center">{SiswaStatistik.countByRombel(r.rombelName)}</TdEdura>
                                    
                                    {
                                        index === 0 && (
                                            <TdEdura className="text-center align-middle" rowSpan={rombels.length}>
                                            {SiswaStatistik.countByJenjang(r.rombelName)}
                                            </TdEdura>
                                        )
                                    }
                                </TRowEdura>
                            ))}
                            </Fragment>
                        ))}
                    </tbody>
                    <tfoot>
                        <TRowEdura>
                            <ThEdura colSpan={2}>Jumlah</ThEdura>
                            <ThEdura>{SiswaStatistik.countUmurRentangGender('<=6',Gender.LAKI_LAKI)}</ThEdura>
                            <ThEdura>{SiswaStatistik.countUmurRentangGender('<=6',Gender.PEREMPUAN)}</ThEdura>
                            <ThEdura>{SiswaStatistik.countUmurRentangGenders('<=6',[Gender.LAKI_LAKI, Gender.UNKNOWN,Gender.PEREMPUAN])}</ThEdura>
                            <ThEdura>{SiswaStatistik.countUmurRentangGender('7-12',Gender.LAKI_LAKI)}</ThEdura>
                            <ThEdura>{SiswaStatistik.countUmurRentangGender('7-12',Gender.PEREMPUAN)}</ThEdura>
                            <ThEdura>{SiswaStatistik.countUmurRentangGenders('7-12',[Gender.LAKI_LAKI, Gender.UNKNOWN,Gender.PEREMPUAN])}</ThEdura>
                            <ThEdura>{SiswaStatistik.countUmurRentangGender('>=13',Gender.LAKI_LAKI)}</ThEdura>
                            <ThEdura>{SiswaStatistik.countUmurRentangGender('>=13',Gender.PEREMPUAN)}</ThEdura>
                            <ThEdura>{SiswaStatistik.countUmurRentangGenders('>=13',[Gender.LAKI_LAKI, Gender.UNKNOWN,Gender.PEREMPUAN])}</ThEdura>
                            <ThEdura colSpan={2}>{Siswa.length}</ThEdura>
                        </TRowEdura>
                    </tfoot>
            </TableEdura>                            
        </div>
    )
}