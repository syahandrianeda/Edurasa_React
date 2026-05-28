import React, { useState, useMemo, useEffect } from 'react';
import type { jp_mapelApp } from '~/types/mapel/jp_mapel';
import type { jadwalMapelAccordTableApp } from '~/types/setting_jadwal/jadwal_mapel';
import type { settingJadwalApp } from '~/types/setting_jadwal/setting_jadwal';

// List hari untuk mempermudah looping kolom
const LIST_HARI: Array<keyof Pick<jadwalMapelAccordTableApp, 'sn' | 'sl' | 'rb' | 'km' | 'jm' | 'sb'>> = [
  'sn', 'sl', 'rb', 'km', 'jm', 'sb'
];

const NAMA_HARI_LABEL = { sn: 'Senin', sl: 'Selasa', rb: 'Rabu', km: 'Kamis', jm: 'Jumat', sb: 'Sabtu' };

// ==========================================
// 2. MOCK DATA (UNTUK COBA LANGSUNG)
// ==========================================
// const mockSetting: settingJadwalApp = {
//   idbaris: 1,
//   rombel: 'XA',
//   jam_awal: '07:00',
//   has_rest_time: true, // Istirahat di jam_ke 5
//   include_sabtu: false, // Hanya Senin - Jumat
//   count_jp_hari: 8, // Ada 8 jam pelajaran sehari
//   interval_menit: 45
// };

// const mockMapelRombel: jp_mapelApp[] = [
//   { idbaris: 1, kode: 'MTK', idmapel: 101, nama_mapel: 'Matematika', jp_perminggu: 4, following_students: 36, nama_mapel_ijazah: 'Matematika', status: 'Wajib', index_in_rombel: 1 },
//   { idbaris: 2, kode: 'BIN', idmapel: 102, nama_mapel: 'Bahasa Indonesia', jp_perminggu: 3, following_students: 36, nama_mapel_ijazah: 'Bahasa Indonesia', status: 'Wajib', index_in_rombel: 2 },
//   { idbaris: 3, kode: 'ING', idmapel: 103, nama_mapel: 'Bahasa Inggris', jp_perminggu: 2, following_students: 36, nama_mapel_ijazah: 'Bahasa Inggris', status: 'Wajib', index_in_rombel: 3 },
// ];

// const mockKegiatanSekolah: jp_mapelApp[] = [
//   { idbaris: 99, kode: 'UPC', idmapel: 901, nama_mapel: 'Upacara Bendera', jp_perminggu: 1, following_students: 36, nama_mapel_ijazah: '-', status: 'Kegiatan', index_in_rombel: 0 },
//   { idbaris: 98, kode: 'LIT', idmapel: 902, nama_mapel: 'Literasi / Kebersihan', jp_perminggu: 1, following_students: 36, nama_mapel_ijazah: '-', status: 'Kegiatan', index_in_rombel: 0 },
// ];

// const mockJadwalServerAwal: jadwalMapelAccordTableApp[] = [
//   // Anggap server mengirimkan data awal yang baru terisi Sebagian (Contoh: Upacara di jam 1 senin)
//   {
//     idbaris: 1,
//     jam_ke: 1,
//     waktu: '07:00 - 07:45',
//     namarombel: 'XA',
//     sn: mockKegiatanSekolah[0] // Upacara sudah terisi dari server
//   }
// ];

// ==========================================
// 3. KOMPONEN UTAMA
// ==========================================
export default function PengaturanSebaranJadwal({
    mockSetting,
    mockMapelRombel,
    mockKegiatanSekolah,
    mockJadwalServerAwal
}:{
    mockSetting: settingJadwalApp,
    mockMapelRombel: jp_mapelApp[],
    mockKegiatanSekolah: jp_mapelApp[],
    mockJadwalServerAwal: jadwalMapelAccordTableApp[]
}) {
  // --- ISSUE #1: Inisialisasi Kerangka Jadwal ---
  const generateInitialJadwal = (): jadwalMapelAccordTableApp[] => {
    const dataJadwal: jadwalMapelAccordTableApp[] = [];
    
    for (let i = 1; i <= mockSetting.count_jp_hari; i++) {
      // Cari apakah server sudah punya data untuk jam_ke ini
      const serverRow = mockJadwalServerAwal.find(s => s.jam_ke === i);
      
      if (serverRow) {
        dataJadwal.push({ ...serverRow });
      } else {
        // Buat baris kosong baru sesuai setting rombel
        dataJadwal.push({
          idbaris: i,
          jam_ke: i,
          waktu: `Jam ke-${i}`, // Sederhananya di-string dulu
          namarombel: mockSetting.rombel,
          sn: undefined, sl: undefined, rb: undefined, km: undefined, jm: undefined, sb: undefined
        });
      }
    }
    return dataJadwal;
  };

  const [jadwal, setJadwal] = useState<jadwalMapelAccordTableApp[]>(generateInitialJadwal);
  const [selectedItem, setSelectedItem] = useState<jp_mapelApp | null>(null);

  // --- ISSUE #2: Sumber Dropdown Tergabung ---
  const opsiDropdown = useMemo(() => {
    return [...mockMapelRombel, ...mockKegiatanSekolah];
  }, []);

  // --- ISSUE #4: Hitung Distribusi Terpakai ---
  const hitungJpTerpakai = useMemo(() => {
    if (!selectedItem) return 0;
    let count = 0;
    
    jadwal.forEach(row => {
      // Lewati hitungan jika jam istirahat
      if (mockSetting.has_rest_time && row.jam_ke === 5) return;

      LIST_HARI.forEach(hari => {
        if (!mockSetting.include_sabtu && hari === 'sb') return;
        if (row[hari]?.idmapel === selectedItem.idmapel) {
          count++;
        }
      });
    });
    
    return count;
  }, [jadwal, selectedItem]);

  // --- ISSUE #5: Action Handler Toggle Checkbox ---
  const handleCheckboxToggle = (jamKe: number, hari: keyof jadwalMapelAccordTableApp, checked: boolean) => {
    if (!selectedItem) return;

    setJadwal(prevJadwal => {
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
  const hariAktif = LIST_HARI.filter(hari => mockSetting.include_sabtu || hari !== 'sb');
  useEffect(() => {
    // 1. Reset dropdown menjadi kosong kembali
    setSelectedItem(null); 
    
    // 2. Generate ulang kerangka tabel berdasarkan data rombel baru
    setJadwal(generateInitialJadwal()); 
    
  }, [mockJadwalServerAwal, mockSetting]);
  const onClickSimpan = () => {  
    
    console.log('Payload yang akan dikirim ke server:', jadwal);
    // Di sini Anda bisa panggil API untuk menyimpan data ke server
  };
  return (
    <div style={{ padding: '24px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Fitur Sebaran Jadwal Rombel {mockSetting.rombel}</h2>
      <hr />

      {/* --- UI ISSUE #2: Komponen Select --- */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
          Pilih Mata Pelajaran / Kegiatan:
        </label>
        <select 
          style={{ padding: '8px', width: '350px', fontSize: '14px' }}
          onChange={(e) => {
            const val = e.target.value;
            const item = opsiDropdown.find(o => o.idmapel === Number(val));
            setSelectedItem(item || null);
          }}
          defaultValue=""
        >
          <option value="" disabled>-- Pilih Mapel/Kegiatan --</option>
          {opsiDropdown.map(item => (
            <option key={item.idmapel} value={item.idmapel}>
              {item.nama_mapel} ({item.status === 'Kegiatan' ? 'Kegiatan - 1 JP' : `${item.jp_perminggu} JP`})
            </option>
          ))}
        </select>

        {selectedItem && (
          <div style={{ marginTop: '8px', fontSize: '14px', color: '#555' }}>
            Status Alokasi: <strong>{hitungJpTerpakai}</strong> dari <strong>{selectedItem.jp_perminggu}</strong> JP Terpasang.
            {hitungJpTerpakai === selectedItem.jp_perminggu && (
              <span style={{ color: 'green', marginLeft: '10px', fontWeight: 'bold' }}>✓ Kuota Terpenuhi</span>
            )}
          </div>
        )}
      </div>

      {/* --- UI ISSUE #3: Komponen Tabel Jadwal --- */}
      <table border={1} cellPadding={10} style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'center' }}>
        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            <th>Jam Ke</th>
            {hariGridAktif(hariAktif)}
          </tr>
        </thead>
        <tbody>
          {jadwal.map((row) => {
            // --- UI ISSUE #3: Kondisi Khusus Istirahat ---
            if (mockSetting.has_rest_time && row.jam_ke === 5) {
              return (
                <tr key={row.jam_ke} style={{ backgroundColor: '#ffe6e6', fontWeight: 'bold' }}>
                  <td>{row.jam_ke}</td>
                  <td colSpan={hariAktif.length}>☕ ISTIRAHAT</td>
                </tr>
              );
            }

            return (
              <tr key={row.jam_ke}>
                <td style={{ fontWeight: 'bold', backgroundColor: '#f9f9f9' }}>{row.jam_ke}</td>
                {hariAktif.map((hari) => {
                  const cellData = row[hari] as jp_mapelApp | undefined;
                  
                  // --- LOGIKA ISSUE #4: Validasi & Status Checkbox ---
                  const isChecked = cellData?.idmapel === selectedItem?.idmapel && selectedItem !== null;
                  const isFilledByOther = cellData !== undefined && cellData.idmapel !== selectedItem?.idmapel;
                  const isQuotaFull = selectedItem ? hitungJpTerpakai >= selectedItem.jp_perminggu : true;
                  
                  // Checkbox di-disable jika:
                  // 1. Belum ada mapel yang dipilih di dropdown
                  // 2. Sel sudah diisi oleh mapel/kegiatan lain
                  // 3. Kuota JP mapel terpilih sudah habis DAN sel ini posisinya masih kosong
                  const isDisabled = !selectedItem || isFilledByOther || (isQuotaFull && !isChecked);

                  return (
                    <td key={hari} style={{ backgroundColor: isFilledByOther ? '#f0f0f0' : 'white' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          disabled={isDisabled}
                          style={{ cursor: isDisabled ? 'not-allowed' : 'pointer', width: '18px', height: '18px' }}
                          onChange={(e) => handleCheckboxToggle(row.jam_ke, hari, e.target.checked)}
                        />
                        {/* Menampilkan label text mapel jika sudah terisi */}
                        {cellData && (
                          <span style={{ fontSize: '11px', fontWeight: 'bold', color: isFilledByOther ? '#777' : '#0056b3' }}>
                            {cellData.kode}
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <button    onClick = {onClickSimpan} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Simpan Perubahan</button>  
    </div>
  );
}

// Helper untuk render Header Hari
function hariGridAktif(hariAktif: Array<keyof typeof NAMA_HARI_LABEL>) {
  return hariAktif.map(hari => <th key={hari}>{NAMA_HARI_LABEL[hari]}</th>);
}