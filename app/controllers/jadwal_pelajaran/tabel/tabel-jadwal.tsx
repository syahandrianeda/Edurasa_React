import { useState } from "react";
import { TableEdura, TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { generateDataJadwal } from "~/domain/jadwal_mapel/data-jadwal";
import type { jp_mapelApp } from "~/types/mapel/jp_mapel";
import type { jadwalMapelAccordTableApp, jadwalMapelApp } from "~/types/setting_jadwal/jadwal_mapel";
import type { settingJadwalApp } from "~/types/setting_jadwal/setting_jadwal";

export default function TabelJadwalPelajaran({setting, mapel, jadwalServer}:{setting:settingJadwalApp, mapel: jp_mapelApp[], jadwalServer:jadwalMapelAccordTableApp[]}) {
    const dataJadwal = generateDataJadwal(setting, mapel, jadwalServer);
    console.log('data jadwal', dataJadwal, 'setting', setting, 'mapel', mapel, 'jadwalServer', jadwalServer);
    
    return ( 
        <TableWithScrolling>
            <thead>
                <TRowEdura>
                    <ThEdura rowSpan={2} className="w-2 text-wrap text-center">Jam Ke</ThEdura>
                    <ThEdura rowSpan={2} className="w-3">Waktu</ThEdura>
                    <ThEdura colSpan={setting?.include_sabtu ? 6 : 5}>Hari {setting?.has_rest_time?'(Dengan Istirahat)':''}</ThEdura>
                </TRowEdura>
                <TRowEdura>
                    <ThEdura>Senin</ThEdura>
                    <ThEdura>Selasa</ThEdura>
                    <ThEdura>Rabu</ThEdura> 
                    <ThEdura>Kamis</ThEdura>
                    <ThEdura>Jumat</ThEdura>
                    {setting?.include_sabtu && <ThEdura>Sabtu</ThEdura>}
                </TRowEdura>
            </thead>
            <tbody>
                {dataJadwal.map((item, index)=>(
                    <TRowEdura key={index}>
                        <TdEdura className="text-center">{item.jam_ke}</TdEdura>
                        <TdEdura>{item.waktu}</TdEdura>
                        <TdEdura className="text-wrap text-center">{item.sn}</TdEdura>
                        <TdEdura className="text-wrap text-center">{item.sl}</TdEdura>            
                        <TdEdura className="text-wrap text-center">{item.rb}</TdEdura>
                        <TdEdura className="text-wrap text-center">{item.km}</TdEdura>
                        <TdEdura className="text-wrap text-center">{item.jm}</TdEdura>
                        {setting?.include_sabtu && <TdEdura>{item.sb}</TdEdura>}
                    </TRowEdura>
                ))} 
                
            </tbody>
        </TableWithScrolling>
    )
}