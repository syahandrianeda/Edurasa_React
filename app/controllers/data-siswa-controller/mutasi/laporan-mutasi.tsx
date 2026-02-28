import { Info, PencilIcon } from "lucide-react";
import { useMemo } from "react";
import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { useModal } from "~/components/modals/modal-provider";
import { TableEdura, TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import type { FilterContextValue } from "~/components/toolbars/state-toolbar/state-toolbar";
import type KesiswaanData from "~/domain/kesiswaan/kesiswaan-data";
import { currentTapel, currentTapelProperties } from "~/lib/current-tapel";
import { formatStringBulanTahun } from "~/lib/date-helper";
import { Gender } from "~/types/enums/gender";
import type { SiswaType } from "~/types/siswa";


export function IdentitasLaporanMutasi({data, context, rombel}:{data: KesiswaanData, context:FilterContextValue, rombel:string}){
    const bulan = context?.bulan|| new Date();
    const dataSiswaMasuk = useMemo(()=>{
        return data.laporanMutasiMasuk(bulan);
        // return bulan?.getMonth() === 6? data?.filterAllDataByDateRange(bulan):data?.filterAllDataWhenCheckInThisMonth(bulan);
    },[bulan,data])
    const dataSiswaKeluar = useMemo(()=>{
        return data?.filterAllDataWhenCheckOutThisMonth(bulan);
    }, [data,bulan]);

    const keadaanAwal = useMemo(()=>{
        return data.laporanKeadaanAwal(bulan);
    },[data, bulan])
    
    
    const keadaanAkhir = useMemo(()=>{
        return data.laporanKeadaanAkhir(bulan);
    },[data, bulan])
    
    const {actions} = useModal<SiswaType>()

    const ActionTrigger: TriggerTable<SiswaType>[] = [
        {
            label: 'Edit',
            icon: PencilIcon,
            callback: (m) => actions.open('EDIT', m,{closeOnOutsideClick:false})
        },
        {
            label: 'Info',
            icon: Info,
            callback: (m) => actions.open('INFO', m)
        },
    ]

    return (
        <div className=" flex flex-col text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="px-4">
                    <table className="border-collapse leading-normal">
                        <tbody>
                            <tr>
                                <td className="w-15">Kelas</td>
                                <td className="w-0">:</td>
                                <td className="px-2">{rombel}</td>
                            </tr>
                            <tr>
                                <td>Bulan</td>
                                <td>:</td>
                                <td className="px-2">{formatStringBulanTahun(bulan)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <TableWithScrolling className="text-[8px] w-full">
                        
                            <thead>
                                <TRowEdura>
                                    <ThEdura rowSpan={2} className="print:hidden">Aksi</ThEdura>
                                    <ThEdura colSpan={9}>Mutasi Masuk</ThEdura>
                                </TRowEdura>
                                <TRowEdura>
                                    <ThEdura className="capitalize">No</ThEdura>
                                    <ThEdura className="capitalize">Masuk Tanggal</ThEdura>
                                    <ThEdura className="capitalize">N I S</ThEdura>
                                    <ThEdura className="capitalize">NISN</ThEdura>
                                    <ThEdura className="capitalize">Nama Siswa</ThEdura>
                                    <ThEdura className="capitalize">L/P</ThEdura>
                                    <ThEdura className="capitalize">Asal Sekolah</ThEdura>
                                    <ThEdura className="capitalize">Awal Kelas</ThEdura>
                                    <ThEdura className="capitalize">Keterangan</ThEdura>
                                </TRowEdura>
                            </thead>
                            <tbody>
                                {
                                    dataSiswaMasuk.length === 0?(
                                        <TRowEdura>
                                            <TdEdura colSpan={10} className="h-50 overflow-hidden align-middle">
                                                <div className="-rotate-45 text-2xl  w-fit mx-auto  h-20 font-extrabold tracking-widest font-mono text-center ">Nihil</div>
                                            </TdEdura>
                                        </TRowEdura>
                                    ):(
                                        dataSiswaMasuk.map((item, index)=>(
                                            <TRowEdura 
                                                key={index}
                                                className={item.aktif !== 'aktif'?"text-red-500 print:text-inherit":item.riwayat_fisik === 'siswa baru'?'odd:bg-sky-200 even:bg-sky-200':''}
                                                >
                                                <TdEdura className="print:hidden">
                                                    <ActionButtonTable<SiswaType>
                                                        data={item}
                                                        trigger={ActionTrigger}
                                                    />
                                                </TdEdura>
                                                <TdEdura>{index + 1}</TdEdura>
                                                <TdEdura>{item.masuk_tgl?.toLocaleDateString('id-ID', {dateStyle:'medium'})}</TdEdura>
                                                <TdEdura>{item.nis}</TdEdura>
                                                <TdEdura>{item.nisn}</TdEdura>
                                                <TdEdura>{item.pd_nama}</TdEdura>
                                                <TdEdura>{item.pd_jk}</TdEdura>
                                                <TdEdura>{item.dapo_sekolahasal}</TdEdura>
                                                <TdEdura>{item.awal_kelas}</TdEdura>
                                                <TdEdura>{item.riwayat_fisik}</TdEdura>
                                            </TRowEdura>
                                        ))
                                    )
                                }
                            </tbody>
                        {/* </TableEdura> */}
                    </TableWithScrolling>
                </div>
                <div className="px-4">
                    <table className="border-collapse ms-auto leading-normal">
                        <tbody>
                            <tr>
                                <td className="w-25 text-nowrap">Tahun Pelajaran</td>
                                <td className="w-0">:</td>
                                <td className="px-2">{currentTapel({variant:"onlyTapel"})}</td>
                            </tr>
                            <tr>
                                <td>Semester</td>
                                <td>:</td>
                                <td className="px-2 text-nowrap">{currentTapelProperties({variant:'getSemesterWithGanjilGenap'})}</td>
                            </tr>
                        </tbody>
                    </table>
                    <TableWithScrolling className="text-[8px] w-full">
                        {/* <TableEdura className="text-[8px] w-full"> */}
                            <thead>
                                <TRowEdura>
                                    <ThEdura colSpan={8}>Mutasi Keluar</ThEdura>
                                </TRowEdura>
                                <TRowEdura>
                                    <ThEdura className="capitalize">No</ThEdura>
                                    <ThEdura className="capitalize">Keluar Tanggal</ThEdura>
                                    <ThEdura className="capitalize">N I S</ThEdura>
                                    <ThEdura className="capitalize">NISN</ThEdura>
                                    <ThEdura className="capitalize">Nama Siswa</ThEdura>
                                    <ThEdura className="capitalize">L/P</ThEdura>
                                    <ThEdura className="capitalize">Akhir Kelas</ThEdura>
                                    <ThEdura className="capitalize">Alasan</ThEdura>
                                </TRowEdura>
                            </thead>
                            <tbody>
                                {
                                    dataSiswaKeluar.length === 0 ? (
                                        <TRowEdura>
                                            <TdEdura colSpan={8} className="h-50 overflow-hidden align-middle">
                                                <div className="-rotate-45 text-2xl  w-fit mx-auto  h-20 font-extrabold tracking-widest font-mono text-center ">Nihil</div>
                                            </TdEdura>
                                        </TRowEdura>
                                    ):(
                                        
                                        dataSiswaKeluar.map((item, index)=>(
                                            <TRowEdura key={index}>
                                                <TdEdura className="text-center">{index + 1}</TdEdura>
                                                <TdEdura className="text-center">{item.keluar_tgl?.toLocaleDateString('id-ID', {dateStyle:'medium'})}</TdEdura>
                                                <TdEdura className="text-center">{item.nis}</TdEdura>
                                                <TdEdura className="text-center">{item.nisn}</TdEdura>
                                                <TdEdura className="text-start">{item.pd_nama}</TdEdura>
                                                <TdEdura className="text-center">{item.pd_jk}</TdEdura>
                                                <TdEdura className="text-center">{item.kelas_keluar}</TdEdura>
                                                <TdEdura className="text-center">{item.alasan_keluar}</TdEdura>
                                            </TRowEdura>
                                        ))
                                    )
                                }
                            </tbody>
                        {/* </TableEdura> */}
                    </TableWithScrolling>
                </div>
            </div>
            <div className="flex justify-center mt-2 overflow-x-auto">
                <div className="border w-1/2">
                    <TableEdura className="text-[8px] w-full">
                        <thead>
                            <TRowEdura>
                                <ThEdura colSpan={12} className="text-center">Rekapitulasi Mutasi Siswa Bulan {formatStringBulanTahun(bulan)}</ThEdura>
                            </TRowEdura>
                            <TRowEdura>
                                <ThEdura colSpan={3}>
                                    keadaan awal
                                </ThEdura>
                                <ThEdura colSpan={3}>
                                    Masuk
                                </ThEdura>
                                <ThEdura colSpan={3}>
                                    Keluar
                                </ThEdura>
                                <ThEdura colSpan={3}>
                                    Keadaan Akhir
                                </ThEdura>
                            </TRowEdura>
                            <TRowEdura>
                                <ThEdura>L</ThEdura>
                                <ThEdura>P</ThEdura>
                                <ThEdura>Jumlah</ThEdura>
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
                            <TRowEdura className="h-15 text-sm font-bold">
                                <TdEdura className="text-center align-middle">
                                    {
                                        // data?.countByGenderBetweenThisMonth(bulan, Gender.LAKI_LAKI)
                                        keadaanAwal.laki
                                    }
                                </TdEdura>
                                <TdEdura className="text-center align-middle">
                                    {
                                        keadaanAwal.perempuan//data?.countByGenderBetweenThisMonth(bulan, Gender.PEREMPUAN)
                                    }
                                </TdEdura>
                                <TdEdura className="text-center align-middle">
                                    {
                                        keadaanAwal.total//;data?.countByGendersBetweenThisMonth(bulan,[ Gender.PEREMPUAN,Gender.LAKI_LAKI, Gender.UNKNOWN])
                                    }
                                </TdEdura>
                                <TdEdura className="text-center align-middle">
                                    {
                                        data?.countByGenderCheckInThisMonth(bulan, Gender.LAKI_LAKI)
                                    }
                                </TdEdura>
                                <TdEdura className="text-center align-middle">
                                    {
                                        data?.countByGenderCheckInThisMonth(bulan, Gender.PEREMPUAN)
                                    }
                                </TdEdura>
                                <TdEdura className="text-center align-middle">
                                    {
                                        data?.countByGendersCheckInThisMonth(bulan,[ Gender.PEREMPUAN,Gender.LAKI_LAKI, Gender.UNKNOWN])
                                    }
                                </TdEdura>
                                <TdEdura className="text-center align-middle">
                                    {
                                        data?.countByGenderCheckOutThisMonth(bulan, Gender.LAKI_LAKI)
                                    }
                                </TdEdura>
                                <TdEdura className="text-center align-middle">
                                    {
                                        data?.countByGenderCheckOutThisMonth(bulan, Gender.PEREMPUAN)
                                    }
                                </TdEdura>
                                <TdEdura className="text-center align-middle">
                                    {
                                        data?.countByGendersCheckOutThisMonth(bulan,[ Gender.PEREMPUAN,Gender.LAKI_LAKI, Gender.UNKNOWN])
                                    }
                                </TdEdura>
                                <TdEdura className="text-center align-middle">
                                    {
                                        keadaanAkhir.laki//data?.countByGenderUntilThisDate(bulan, Gender.LAKI_LAKI)
                                    }
                                </TdEdura>
                                <TdEdura className="text-center align-middle">
                                    {
                                        keadaanAkhir.perempuan//data?.countByGenderUntilThisDate(bulan, Gender.PEREMPUAN)
                                    }
                                </TdEdura>
                                <TdEdura className="text-center align-middle">
                                    {
                                        keadaanAkhir.total//data?.countByGendersUntilThisDate(bulan,[ Gender.PEREMPUAN,Gender.LAKI_LAKI, Gender.UNKNOWN])
                                    }
                                </TdEdura>
                            </TRowEdura>
                        </tbody>
                    </TableEdura>
                </div>
            </div>
        </div>
    )
}