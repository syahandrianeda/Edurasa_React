import type { TabunganAppType } from "~/types/tabungan/tabungan-app-type";
import type { RekapBulananPerKelas } from "../value-objects/rekap-bulan-perkelas-type";
import type { transaksi_tabungan } from "../value-objects/transaksi-tabungan-type";
import type { DataRekapBulanan } from "../value-objects/data-rekap-bulanan-type";

export function createRekapBulananPerKelas(
    data: TabunganAppType[],
): RekapBulananPerKelas[] {

    const monthNames = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    type BulanData = {
        total: number;
        nama_bulan:string,
        transaksi: transaksi_tabungan[];
    };

    const siswaMap = new Map<
        number,
        {
            nama_siswa: string;
            bulan: Map<number, BulanData>;
        }
    >();

    for (const item of data) {

        if (item.status === "hapus") {
            continue;
        }

        const siswaId = item.siswa_id ?? 0;
        const namaSiswa = item.nama_siswa ?? "-";
        const bulan = new Date(item.time_stamp).getMonth();

        if (!siswaMap.has(siswaId)) {
            siswaMap.set(siswaId, {
                nama_siswa: namaSiswa,
                bulan: new Map<number, BulanData>(),
            });
        }

        const siswa = siswaMap.get(siswaId)!;

        if (!siswa.bulan.has(bulan)) {
            siswa.bulan.set(bulan, {
                total: 0,
                nama_bulan: item.time_stamp.toLocaleDateString('id-ID', {month:'long', year:'numeric'}),
                transaksi: [],
            });
        }

        const dataBulan = siswa.bulan.get(bulan)!;

        if ((item.masuk ?? 0) > 0) {
            dataBulan.total += item.masuk!;

            dataBulan.transaksi.push({
                tanggal: new Date(item.time_stamp),
                kolom: "masuk",
                nominal: item.masuk!,
            });
        }

        if ((item.keluar ?? 0) > 0) {
            dataBulan.total -= item.keluar!;

            dataBulan.transaksi.push({
                tanggal: new Date(item.time_stamp),
                kolom: "keluar",
                nominal: item.keluar!,
            });
        }
    }

    const hasil: RekapBulananPerKelas[] = [];

    for (const [siswa_id, value] of siswaMap) {

        const data_perbulan: DataRekapBulanan[] = [];
        let total = 0;

        [...value.bulan.entries()]
            .sort((a, b) => a[0] - b[0])
            .forEach(([bulan, dataBulan]) => {

                dataBulan.transaksi.sort((a, b) => {
                    return a.tanggal.getTime() - b.tanggal.getTime();
                });


                data_perbulan.push({
                    nama_bulan: dataBulan.nama_bulan,//monthNames[bulan],
                    index_bulan:bulan,
                    data_transaksi: dataBulan.transaksi,
                    total_tabungan: dataBulan.total,
                });

                total += dataBulan.total;
            });

        hasil.push({
            siswa_id,
            nama_siswa: value.nama_siswa,
            data_perbulan,
            total,
        });
    }

    hasil.sort((a, b) => a.nama_siswa.localeCompare(b.nama_siswa));

    return hasil;
}