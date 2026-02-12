import { Fragment, useMemo } from "react";
import { TableEdura, TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import { useAppSelector } from "~/context-reduct/hook"
import { DataSiswaAktif } from "~/context-reduct/selectores/data-siswa-aktif"
import KesiswaanData from "~/domain/kesiswaan/kesiswaan-data";
import { DataRombelUI } from "~/domain/rombel/data-rombel";
import { currentTapel } from "~/lib/current-tapel";
import { groupBy } from "~/lib/group-by";
import { Agama } from "~/types/enums/agama";
import { Gender } from "~/types/enums/gender";

export default function StatistikAgamaPage(){
    const Siswa = useAppSelector(DataSiswaAktif);
    
    const SiswaStatistik = useMemo(()=>{
        return new KesiswaanData(Siswa)
    },[
        Siswa
    ]);
    const koleksiAgama = SiswaStatistik.collectAgama
    
    const groupedByJenjang = groupBy(
        DataRombelUI.filter(item => item.active),
        item => item.jenjang
    );

    
    return (
        <div className="mt-2">
            <h3 className="text-2xl font-bold mb-0 text-center leading-normal uppercase">Data Siswa Berdasarkan Agama</h3>
            <h4 className="font-bold text-center mb-5">{currentTapel({variant:'full'})}</h4>
            <TableEdura className="w-full text-xs">
                <thead>
                    <TRowEdura>
                        <ThEdura colSpan={2} rowSpan={3}>Kelas</ThEdura>
                        <ThEdura colSpan={koleksiAgama.length * 3}>Agama Yang Dianut Siswa</ThEdura>
                        <ThEdura rowSpan={3}>Jumlah</ThEdura>
                        <ThEdura rowSpan={3}>Total</ThEdura>
                    </TRowEdura>
                    <TRowEdura>
                        {
                            koleksiAgama.map((agama,index)=>(
                                <ThEdura colSpan={3} key={index}>{agama}</ThEdura>
                            ))
                        }
                    </TRowEdura>
                    <TRowEdura>
                        {
                            koleksiAgama.map((_,index)=>(
                                <Fragment key={index}>
                                    <ThEdura>L</ThEdura>
                                    <ThEdura>P</ThEdura>
                                    <ThEdura>Jumlah</ThEdura>
                                </Fragment>
                            ))
                        }
                    </TRowEdura>
                </thead>
                <tbody>
                    {
                        Object.entries(groupedByJenjang).map(([jenjang, rombels]) => (
                            <Fragment key={jenjang}>
                            {rombels.map((r, index) => (
                                <TRowEdura key={r.id}>
                                {index === 0 && (
                                    <TdEdura className="text-center align-middle" rowSpan={rombels.length}>
                                    {jenjang}
                                    </TdEdura>
                                )}
                                    <TdEdura className="text-center">{r.rombelName}</TdEdura>
                                    {
                                        koleksiAgama.map((m,i)=>(
                                            <Fragment key={i}>
                                                <TdEdura className="text-center">{SiswaStatistik.countAgamaGenderRombel(m as Agama,Gender.LAKI_LAKI,r.rombelName)}</TdEdura>
                                                <TdEdura className="text-center">{SiswaStatistik.countAgamaGenderRombel(m as Agama,Gender.PEREMPUAN,r.rombelName)}</TdEdura>
                                                <TdEdura className="text-center">{SiswaStatistik.countAgamaGendersRombel(m as  Agama,[Gender.PEREMPUAN, Gender.UNKNOWN,Gender.LAKI_LAKI],r.rombelName)}</TdEdura>
                                            </Fragment>
                                        ))
                                    }
                                    <TdEdura className="text-center">{SiswaStatistik.countByRombel(r.rombelName)}</TdEdura>
                                    {
                                        index === 0 && (
                                        <TdEdura className="text-center align-middle" rowSpan={rombels.length}>
                                            {SiswaStatistik.countByJenjang(r.rombelName)}
                                        </TdEdura>
                                    )}
                                </TRowEdura>
                            ))}
                            </Fragment>
                        ))}
                    </tbody>
                    <tfoot>
                        <TRowEdura>
                            <ThEdura colSpan={2}>Jumlah</ThEdura>
                            {
                                        koleksiAgama.map((m,i)=>(
                                            <Fragment key={i}>
                                                <ThEdura className="text-center">{SiswaStatistik.countAgamaGender(Gender.LAKI_LAKI,m as Agama)}</ThEdura>
                                                <ThEdura className="text-center">{SiswaStatistik.countAgamaGender(Gender.PEREMPUAN,m as Agama)}</ThEdura>
                                                <ThEdura className="text-center">{SiswaStatistik.countAgamaGenders([Gender.PEREMPUAN, Gender.UNKNOWN,Gender.LAKI_LAKI],m as Agama)}</ThEdura>
                                            </Fragment>
                                        ))
                                    }
                            <ThEdura colSpan={2}>{Siswa.length}</ThEdura>
                        </TRowEdura>
                    </tfoot>
            </TableEdura>                            
        </div>
    )
}