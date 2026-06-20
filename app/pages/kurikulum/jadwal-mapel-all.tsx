import { Fragment } from "react/jsx-runtime";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useAppSelector } from "~/context-reduct/hook"
import { jadwalPelajaranAppSelectorAll } from "~/context-reduct/selectores/jadwal-pelajaran-selector"
import { DataRombelUI } from "~/domain/rombel/data-rombel";
import { currentTapel } from "~/lib/current-tapel";
import {groupBy } from "~/lib/group-by";


export default function JadwalMapelAll(){
    const data = useAppSelector(jadwalPelajaranAppSelectorAll);
    const grupData = groupBy(data, (item)=>item.namarombel);
    const friends = useAppSelector(state=>state.auth.user?.friends);
    
    return (
        <div className="p-1">
            <h3 className="text-2xl text-center font-extrabold uppercase mb-0">Jadwal Mata Pelajaran</h3>
            <h3 className="text-xl text-center font-extrabold uppercase mb-0">Seluruh Kelas</h3>
            <h5 className="text-base text-center font-extrabold uppercase mb-5">{currentTapel({variant:'full'})}</h5>
            {
                <TableWithScrolling>
                    <thead>
                        <TRowEdura>
                            <ThEdura rowSpan={2} className='w-2'>Jam Ke</ThEdura>
                            <ThEdura rowSpan={2}  className='w-2'>Waktu</ThEdura>
                            <ThEdura colSpan={6}>Hari/Keterangan</ThEdura>
                        </TRowEdura>
                        <TRowEdura>
                            <ThEdura>Senin</ThEdura>
                            <ThEdura>Selasa</ThEdura>
                            <ThEdura>Rabu</ThEdura>
                            <ThEdura>Kamis</ThEdura>
                            <ThEdura>Jumat</ThEdura>
                            <ThEdura>Sabtu</ThEdura>
                        </TRowEdura>
                    </thead>
                    <tbody>
                        {
                            DataRombelUI.filter(s=>s.active).map((rombel)=>
                                <Fragment key={rombel.id}>
                                    <TRowEdura key={rombel.id}>
                                        <TdEdura colSpan={2}  className="bg-sky-200 dark:bg-sky-700 align-middle text-center">Kelas {rombel.rombelName}</TdEdura>
                                        <TdEdura colSpan={6}  className="bg-sky-200 dark:bg-sky-700 text-xs">
                                            Guru Kelas : {friends?.find(s=>s.kode_mapel_ampu === rombel.rombelName)?.name||''}<br/>
                                            Guru PAI : {friends?.find(s=>s.kode_mapel_ampu === 'PAI' && s.kelas_ampu.includes(rombel.rombelName))?.name||''}<br/>
                                            Guru PJOK : {friends?.find(s=>s.kode_mapel_ampu === 'PJOK' && s.kelas_ampu.includes(rombel.rombelName))?.name||''}
                                        </TdEdura>
                                    </TRowEdura>
                                    {
                                        grupData[rombel.rombelName]? grupData[rombel.rombelName]?.filter(s=>s.status !=='hapus').map((row, index) => (
                                            <TRowEdura key={row.idbaris + '_' + index}>
                                                <TdEdura className="align-middle text-center">{row.jam_ke}</TdEdura>
                                                <TdEdura className="align-middle text-center">{row.waktu}</TdEdura>
                                                {
                                                    row.type_row === 'istirahat' ? (
                                                        <TdEdura colSpan={8} className="text-center font-semibold italic bg-yellow-100 dark:bg-yellow-700">
                                                            Istirahat - {row.waktu} ({row.namarombel})
                                                        </TdEdura>
                                                    ):(
                                                        <>
                                                            <TdEdura className="align-middle text-wrap text-center">{row.sn?.nama_mapel}</TdEdura>
                                                            <TdEdura className="align-middle text-wrap text-center">{row.sl?.nama_mapel}</TdEdura>
                                                            <TdEdura className="align-middle text-wrap text-center">{row.rb?.nama_mapel}</TdEdura>
                                                            <TdEdura className="align-middle text-wrap text-center">{row.km?.nama_mapel}</TdEdura>
                                                            <TdEdura className="align-middle text-wrap text-center">{row.jm?.nama_mapel}</TdEdura>
                                                            <TdEdura className="align-middle text-wrap text-center">{row.sb?.nama_mapel}</TdEdura>
                                                        </>
                                                    )
                                                }
                                            </TRowEdura>
                                        )):
                                        <TRowEdura>
                                            <TdEdura colSpan={8}>Tidak ditemukan</TdEdura>
                                        </TRowEdura>
                                    }
                                </Fragment>
                            )
                        }
                    </tbody>
                </TableWithScrolling>
            }
        </div>
    )
}