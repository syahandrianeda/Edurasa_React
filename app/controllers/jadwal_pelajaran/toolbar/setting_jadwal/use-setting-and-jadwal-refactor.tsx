import { useCallback, useEffect, useMemo, useState } from "react";
import { generateScheduleGrid, getInitialSetting } from "~/domain/jadwal_mapel/jadwal-utils";
import type { UserPtk } from "~/types";
import type { jp_mapelApp } from "~/types/mapel/jp_mapel";
import type { pembiasaanSheet } from "~/types/pembiasaan/pembiasaan";
import type { jadwalMapelAccordTableApp } from "~/types/setting_jadwal/jadwal_mapel";
import type { settingJadwalApp } from "~/types/setting_jadwal/setting_jadwal";

const LIST_HARI: Array<keyof Pick<jadwalMapelAccordTableApp, 'sn' | 'sl' | 'rb' | 'km' | 'jm' | 'sb'>> = [
  'sn', 'sl', 'rb', 'km', 'jm', 'sb'
];

export function useSettingAndJadwalRefactor(
  settingServer: settingJadwalApp[],
  jadwalServer: jadwalMapelAccordTableApp[],
  mapelRombel: jp_mapelApp[],
  kegiatanSekolah: jp_mapelApp[],
  rombel: string,
  user?:UserPtk
) {
  const [settingJadwal, setSettingJadwal] = useState<settingJadwalApp | null>(null);

  // 1. Sync setting saat data server atau rombel berubah
  useEffect(() => {
    const currentSetting = settingServer.find(s => s.rombel === rombel);
    setSettingJadwal(currentSetting || getInitialSetting(rombel));
  }, [settingServer, rombel]);

  // 2. Generic Updater: Menangani semua perubahan field dengan satu fungsi
  // Menggunakan useCallback agar referensi fungsi stabil saat dikirim ke komponen child
  const updateSetting = useCallback(<K extends keyof settingJadwalApp>(
    key: K, 
    value: settingJadwalApp[K]
  ) => {
    setSettingJadwal(prev => {
      if (!prev) return null;
      const next = { ...prev, [key]: value };

      // Logika Ketergantungan (Business Logic)
      if (key === 'has_rest_time') {
        next.menit_istirahat = value ? 30 : 0;
        next.index_jam_istirahat = value ? 4 : -1;
      }
      
      return next;
    });
  }, []);

  // 3. Derived State: Grid dihitung otomatis menggunakan useMemo
  // Tidak perlu lagi useEffect dan useState manual untuk dataJadwal
  // const dataJadwal = useMemo(() => {
  //   if (!settingJadwal) return [];
  //   return generateScheduleGrid(settingJadwal, jadwalServer, rombel);
  // }, [settingJadwal, jadwalServer, rombel]);

  // 4. UI-Friendly Derived State
  const showType = settingJadwal?.show_type === 'kode';
  const showCompMenitIstirahat = !!settingJadwal?.has_rest_time;

  // 5. Action Wrappers (Untuk kemudahan penggunaan di UI)
  const actions = {
    changeJamAwal: (val: string) => updateSetting('jam_awal', val),
    changeHasRestTime: (val: boolean) => updateSetting('has_rest_time', val),
    changeMenitIstirahat: (val: number) => updateSetting('menit_istirahat', val),
    changeIncludeSabtu: (val: boolean) => updateSetting('include_sabtu', val),
    changeCountJpHari: (val: number) => updateSetting('count_jp_hari', val),
    changeIntervalMenit: (val: number) => updateSetting('interval_menit', val),
    changeShowType: (val: boolean) => updateSetting('show_type', val ? 'kode' : 'nama_mapel'),
  };

  
  const [dataJadwal, setDataJadwal] = useState<jadwalMapelAccordTableApp[]>([]);
  const [selectedItem, setSelectedItem] = useState<jp_mapelApp  | null>(null);
  const [disableDropdown, setDisableDropdown] = useState(false);


  // --- ISSUE #2: Sumber Dropdown Tergabung ---
  const opsiDropdown = useMemo(() => {
    return [...mapelRombel, ...kegiatanSekolah];
  }, [mapelRombel, kegiatanSekolah]);

  const hitungJpTerpakai = useMemo(() => {
    if (!selectedItem) return 0;
    let count = 0;
    
    dataJadwal.forEach(row => {
      // Lewati hitungan jika jam istirahat
      if (settingJadwal?.has_rest_time && row.jam_ke === 5) return;

      LIST_HARI.forEach(hari => {
        if (!settingJadwal?.include_sabtu && hari === 'sb') return;
        if (row[hari]?.idbaris === selectedItem.idbaris) {
          count++;
        }
      });
    });
    
    return count;
  }, [dataJadwal, selectedItem, rombel]);

  // --- ISSUE #5: Action Handler Toggle Checkbox ---
  const handleCheckboxToggle = (jamKe: number, hari: keyof jadwalMapelAccordTableApp, checked: boolean) => {
    if (!selectedItem) return;

    setDataJadwal(prevJadwal => {
      return prevJadwal.map(row => {
        if (row.jam_ke === jamKe) {
          return {
            ...row,
            [hari]: checked ? selectedItem : undefined
          };
        }
        return row;
      });
    });
  };

  // Filter hari yang aktif berdasarkan setting include_sabtu
  const hariAktif = LIST_HARI.filter(hari => settingJadwal?.include_sabtu || hari !== 'sb');
  
  // Bungkus fungsi ini dalam useCallback agar stabil
  const propertyCheckbox = useCallback((row: jadwalMapelAccordTableApp, hari: keyof jadwalMapelAccordTableApp) => {
    const cellData = row[hari] as jp_mapelApp | undefined;
    
    const isChecked = !!selectedItem && cellData?.idbaris === selectedItem.idbaris;
    const isFilledByOther = !!cellData && cellData.idbaris !== selectedItem?.idbaris;
    const isQuotaFull = !!selectedItem && hitungJpTerpakai >= selectedItem.jp_perminggu;
    
    return {
      isQuotaFull,
      checked: isChecked,
      disabled: !selectedItem || isFilledByOther || (isQuotaFull && !isChecked),
      isFilledByOther
    };
  }, [selectedItem, hitungJpTerpakai]);


  useEffect(() => {
    // 1. Reset dropdown menjadi kosong kembali
    if(user?.roles === "Guru Mapel"){
      const mapelGMP = opsiDropdown.find(s=>s.kode === user?.kode_mapel_ampu);
      console.log('cek user di effex', user, mapelGMP)
      if(mapelGMP) {
        setSelectedItem(mapelGMP); 
        setDisableDropdown(true)
      }else{
        setSelectedItem(null); 
        setDisableDropdown(false)
      }


    }else{
      setSelectedItem(null); 

    }
    
    // 2. Generate ulang kerangka tabel berdasarkan data rombel baru
    setDataJadwal(
      generateScheduleGrid(
          settingJadwal ?? getInitialSetting(rombel),
          jadwalServer,
          rombel
        )
    ); 
    
  }, [jadwalServer, settingJadwal, rombel,user]);

  const dataPresentation = useMemo(() => {
    if (!dataJadwal) return [];
    return dataJadwal.map(row => {
      const isInvalid = row.type_row === 'istirahat' || row.status === 'hapus';
      const key = settingJadwal?.show_type === 'kode' ? 'kode' : 'nama_mapel';
      const data = {
        ...row,
        sn: isInvalid ? undefined : (row.sn?.[key]??''),
        sl: isInvalid ? undefined : (row.sl?.[key]??''),
        rb: isInvalid ? undefined : (row.rb?.[key]??''),
        km: isInvalid ? undefined : (row.km?.[key]??''),
        jm: isInvalid ? undefined : (row.jm?.[key]??''),
        sb: isInvalid ? undefined : (row.sb?.[key]??''),
      };
      if(!settingJadwal?.include_sabtu){
        delete data.sb
      }
      return data
    });
  }, [dataJadwal,settingJadwal?.show_type]);

  return {
    settingJadwal,
    dataJadwal,
    showType,
    showCompMenitIstirahat,
    disableDropdown,
    
    handleCheckboxToggle,
    
    propertyCheckbox,
    
    hariAktif,
    opsiDropdown,
    selectedItem,
    setSelectedItem,
    dataPresentation,
    ...actions
  };
}