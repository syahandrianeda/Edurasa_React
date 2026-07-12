import { useAppSelector } from "~/context-reduct/hook";
import { useSettingAndJadwalRefactor } from "./use-setting-and-jadwal-refactor";
import { OrmMapelSelector } from "~/context-reduct/selectores/mapel-rombel-selector";
import { jadwalPelajaranAppSelector, jadwalPelajaranPureSelector } from "~/context-reduct/selectores/jadwal-pelajaran-selector";
import { DtoSettingJadwalMapelSelector } from "~/context-reduct/selectores/setting-jadwal-mapel";
import type { settingJadwalApp } from "~/types/setting_jadwal/setting_jadwal";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { useEffect, useMemo } from "react";
import { Field } from "~/components/ui/field";
import { SelectField } from "~/components/fields/fields";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import { DtoJadwalPembelajaranTo_jp_mapelApp, jadwalPembiasaanPureSelector } from "~/context-reduct/selectores/jadwal-pembiasaan-kegiatan";
import BtnSaveSettingMapel from "../../crud/btn-save-setting-mapel";
import { NAMA_HARI_LABEL } from "~/types/hari";
import type { UserPtk } from "~/types";

export default function MainSettingMapel() {
    const mapelSelector = useAppSelector(OrmMapelSelector);
    const sebaranTabelJadwal = useAppSelector(jadwalPelajaranAppSelector);
    const allDataSettingJadwal = useAppSelector(DtoSettingJadwalMapelSelector);
    const rombel = useAppSelector(state=>state.fokusRombel.value??'1A');
    const pembiasaan = useAppSelector(DtoJadwalPembelajaranTo_jp_mapelApp);
    const user = useAppSelector(state=>state.auth.user);
    const {setValue, value} = useFilterContext<settingJadwalApp>();
    // const NAMA_HARI_LABEL = { sn: 'Senin', sl: 'Selasa', rb: 'Rabu', km: 'Kamis', jm: 'Jumat', sb: 'Sabtu' };

    const mapel = useMemo(()=>{
            return mapelSelector.mapelRombelUnique()??[];
        }, [mapelSelector,rombel]);
    const {
        hariAktif,
        opsiDropdown,
        selectedItem,
        setSelectedItem,
        dataJadwal,
        propertyCheckbox,
        handleCheckboxToggle,
        settingJadwal,
        dataPresentation,
        disableDropdown
    } = useSettingAndJadwalRefactor(
        allDataSettingJadwal,
        sebaranTabelJadwal,
        
        mapel,
        pembiasaan,
        rombel,
        user as UserPtk
    )
    
    useEffect(()=>{
        setValue({
            // presentationJadwalPelajaran:dataPresentation,
            extra:{
                dataSetting:settingJadwal,
                dataJadwal:dataPresentation,
                hariAktif:hariAktif,
                namaHari:NAMA_HARI_LABEL
            }
        }as unknown as { extra: settingJadwalApp }) 
    },[dataPresentation]);
    
    return (
        <div className="grid md:grid-cols-3 grid-cols-1 bg-linear-to-br from-sky-300 to-sky-200  dark:from-sky-800 dark:to-sky-700 px-1 py-6 gap-1">
            <div className='inner-shadow-sky-700  border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-lg outline-ring py-2 px-2'>
                <div className="text-center font-bold text-sm mb-2">Pilih Mapel/Kegiatan untuk disebarkan</div>
                <Field className="relative mt-2" >
                    <SelectField 
                        labelSelect="Pilih Mapel/Kegiatan" 
                        onChange={(e) => {
                            const val = e.target.value;
                            const item = opsiDropdown.find(o => o.idbaris === Number(val));
                            setSelectedItem(item || null);
                        }}
                        className="text-xs"
                        value={selectedItem?.idbaris}
                        disabled={disableDropdown}
                        >   
                        <option value="">Pilih Mapel/Kegiatan</option>
                        {
                            opsiDropdown.map((item,index) => (
                                <option key={item.idbaris+'_'+index} value={item.idbaris}>
                                {item.nama_mapel} ({item.idbaris>1000? `Non-KBM-${item.jp_perminggu} JP` : `Mapel-${item.jp_perminggu} JP`})
                                </option>
                            ))
                        }
                    </SelectField>
                </Field>
                <div className="border rounded-md p-2 mt-4 bg-white/50 text-center text-sm">
                    <p className="font-semibold">Info:</p>
                    <p className="text-xs">- Pilih mapel atau kegiatan yang ingin disebarkan ke jadwal.</p>
                    <p className="text-xs">- Setelah memilih, klik pada sel jadwal untuk menempatkan mapel/kegiatan tersebut.</p>
                    <p className="text-xs">- Pastikan jumlah JP yang dipilih sesuai dengan kebutuhan penyebaran.</p>
                </div>
            </div>
            <div className='md:col-span-2 inner-shadow-sky-700  border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-lg outline-ring py-2 px-2'>
                <div className="text-center font-bold text-sm mb-2">Sebarkan Mapel/Kegiatan Di sini</div>
                <TableWithScrolling className="mx-auto text-xs">
                    <thead>
                        <TRowEdura>
                            <ThEdura className="dark:text-black">Jam Ke</ThEdura>
                            <ThEdura className="dark:text-black">Waktu</ThEdura>
                            {
                                hariAktif.map((hari, index) => (
                                    <ThEdura  className="dark:text-black" key={hari + '_' + index}>{NAMA_HARI_LABEL[hari] || hari}</ThEdura>
                                ))
                            }
                        </TRowEdura>
                    </thead>
                    <tbody>
                        {
                            dataJadwal.filter(s=> s.status !=='hapus').map((row,index) => (
                                <TRowEdura className="even:bg-white even:dark:bg-gray-100 dark:text-black" key={row.idbaris +'_'+ index}>
                                    <TdEdura className="w-1 align-middle text-center">{row.jam_ke}</TdEdura>
                                    <TdEdura className="w-2 align-middle">{row.waktu}</TdEdura>
                                    {
                                        row.type_row === 'istirahat' ? (
                                            <TdEdura colSpan={hariAktif.length} className="text-center font-semibold italic bg-yellow-100 dark:bg-yellow-700">
                                                Istirahat - {row.waktu}
                                            </TdEdura>
                                        ) :
                                        hariAktif.map(hari => {
                                            const cellData = propertyCheckbox(row, hari);
                                            return (
                                                <TdEdura key={hari} className="text-center align-baseline">
                                                    <div className="flex flex-col items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={cellData.checked}
                                                            disabled={cellData.disabled}
                                                            onChange={(e) => handleCheckboxToggle(row.jam_ke, hari, e.target.checked)}
                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-800 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        />
                                                        {
                                                            row && (
                                                            <span style={{ fontSize: '8px', fontWeight: 'bold', color: cellData.isFilledByOther ? '#777' : '#0056b3' }}>
                                                                {row[hari]?.['kode']}
                                                            </span>
                                                            )
                                                        }
                                                    </div>
                                                </TdEdura>
                                            )
                                        })
                                    }   
                                </TRowEdura>
                            ))
                        }                            
                    </tbody>
                </TableWithScrolling>
            </div>
            <div className='md:col-span-3 flex justify-center inner-shadow-sky-700  border shadow-sky-300 shadow-sm  bg-linear-to-tl from-sky-400 to-sky-300 dark:from-sky-800 dark:to-sky-700 rounded-lg outline-ring py-2 px-2'>
                <BtnSaveSettingMapel data={dataJadwal}/>
            </div>
        </div>
    )
}