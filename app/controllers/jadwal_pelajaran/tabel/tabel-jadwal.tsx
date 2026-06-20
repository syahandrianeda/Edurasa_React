import { memo, useMemo } from "react";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { NAMA_HARI_LABEL } from "~/types/hari";

import type { jadwalMapelAccordTableApp } from "~/types/setting_jadwal/jadwal_mapel";
import type { settingJadwalApp } from "~/types/setting_jadwal/setting_jadwal";

/**
 * TabelJadwalPelajaran dioptimasi dengan React.memo untuk mencegah re-render dari parent
 * yang tidak berhubungan dengan data jadwal.
 */
const TabelJadwalPelajaran = memo(function TabelJadwalPelajaran() {
    const { value } = useFilterContext();
    const extra = value?.extra;

    // Menggunakan useMemo untuk mengekstrak dan memfilter data hanya jika 'extra' di context berubah.
    const { dataDisplay, hariAktif, hariLabel, dataSetting } = useMemo(() => {
        const rawData = (extra?.dataJadwal as Record<string, any>[]) || [];
        return {
            dataDisplay: rawData.filter(s => s.status !== 'hapus'),
            hariAktif: extra?.hariAktif as Array<keyof Pick<jadwalMapelAccordTableApp, 'sn' | 'sl' | 'rb' | 'km' | 'jm' | 'sb'>>,
            hariLabel: (extra?.namaHari as typeof NAMA_HARI_LABEL) || NAMA_HARI_LABEL,
            dataSetting: (extra?.dataSetting as settingJadwalApp) || {}
        };
    }, [extra]);
    
    return (
        <TableWithScrolling>
            <thead>
                <TRowEdura>
                    <ThEdura rowSpan={2} className="dark:text-black w-2">Jam Ke</ThEdura>
                    <ThEdura rowSpan={2} className="dark:text-black w-1">Waktu</ThEdura>
                    <ThEdura className="dark:text-black w-2" colSpan={dataSetting?.include_sabtu?6:5}>Hari</ThEdura>
                </TRowEdura>
                <TRowEdura>
                    {
                        hariAktif?.map((hari, index) => (
                            <ThEdura key={hari + '_' + index}>{hariLabel[hari]}</ThEdura>
                        ))
                    }
                </TRowEdura>
            </thead>
            <tbody>
                {
                    dataDisplay.map((row, index) => (    
                        <TRowEdura key={row.idbaris + '_' + index}>
                            <TdEdura className="    align-middle text-center">{row.jam_ke}</TdEdura>
                            <TdEdura className="align-middle text-center">{row.waktu}</TdEdura>
                            {
                                row.type_row === 'istirahat' ? (
                                    <TdEdura colSpan={hariAktif.length} className="text-center font-semibold italic bg-yellow-100 dark:bg-yellow-700">
                                        Istirahat - {row.waktu}
                                    </TdEdura>
                                ) :
                                hariAktif.map(hari => (
                                    <TdEdura key={hari} className="text-center align-baseline">
                                        {row[hari]}
                                        </TdEdura>
                                ))
                            }
                        </TRowEdura>
                    ))
                            
                }
            </tbody>
        </TableWithScrolling>
    )
});

export default TabelJadwalPelajaran;