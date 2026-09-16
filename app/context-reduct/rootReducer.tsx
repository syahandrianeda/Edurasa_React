import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './global-state/auth-slice';
import fokusRombelReducer from './global-state/fokus-rombel-slice';
import dataSiswaReducer from './global-state/siswa-slice'
import loadedApiReducer from './global-state/loaded-slice'
import siswaDapodikReducer from './global-state/sheet-dapodik-slice'
import kaldikReducer from './global-state/kaldik-slice';
import absensiSiswaReducer from './global-state/absensi-slice'
import sabtuLiburReducer from './global-state/sabtu-libur';
/** kurmerReducer akan deprecated, diganti CP, FaseA, FaseB, FaseC, dan ATP */
import kurmerReducer from './global-state/kurikulum/kurmer-slice';
/** ------------------------------------------------------ */
import fokusMapelReducer from './global-state/kurikulum/fokus-mapel-slice';
import mapelReducer from './global-state/mapel/mapel-slice';
import mapelRombelReducer from './global-state/mapel/mapel-rombel-slice'
import jadwalPelajaranReducer from './global-state/mapel/jadwal-pelajaran';
import settingJadwalMapelReducer from './global-state/mapel/setting-jadwal-mapel-slice';
import jadwalPembiasaanReducer from './global-state/pembiasaan-kegiatan-sekolah/jadwal-pembiasaan';
import protaReducer from './global-state/prota/prota-slice';

import cPReducer from './global-state/kurikulum/cp-slice';
import faseAReducer from './global-state/kurikulum/tp-fase-a';
import faseBReducer from './global-state/kurikulum/tp-fase-b';
import faseCReducer from './global-state/kurikulum/tp-fase-c';
import AtpReducer from './global-state/kurikulum/atp-slice'

import BankSoalReducer from './global-state/bank-soal/bank-soal-slice';
import taksonomiBloomReducer from './global-state/taksonomi/taksonomi-slice';

import kategoriKeuanganReducer from './global-state/tabungan/kategori-keuangan-slice'
import fokusKategoriKeuanganReducer from './global-state/tabungan/ui-akses-keuangan-slice'

import tabunganReducer from './global-state/tabungan/tabungan-slice'
import keuanganReducer from './global-state/tabungan/keuangan-slice'

import suratKeluarReducer from './global-state/surat/surat-keluar-slice'

import riwayatIdAkunReducer from './global-state/tendik/riwayat-id-akun-slice'
import sppdReducer from './global-state/surat/sppd-slice';
import pangkatGolonganReducer from './global-state/tendik/pangkat-golongan-slice'
import suratMasukReducer from './global-state/surat/surat-masuk-slice'   

import riwayatRombelReducer from './global-state/buku-induk/riwayat-rombel-slice';
import serahTerimaDokumenReducer from './global-state/galleries/serah-terima-dokumen-slice'
import transaksiSerahTerimaDokumenReducer from './global-state/galleries//transaksi-serah-terima-dokumen-slice'

import uiFokusReducer from './global-state/ui-fokus/ui-fokus-slice';
import paketSoalReducer from './global-state/bank-soal/paket-soal-slice';
import publikasiPaketReducer from './global-state/bank-soal/publikasi-paket-slice'

const rootReducer = combineReducers({
    auth: authReducer,
    fokusRombel: fokusRombelReducer,
    dataSiswa: dataSiswaReducer,
    loadedApi: loadedApiReducer,
    dapodik: siswaDapodikReducer,
    kaldik:kaldikReducer,
    absensiSiswa:absensiSiswaReducer,
    uiPreference: sabtuLiburReducer,
    // kurmer:kurmerReducer,
    fokusMapel: fokusMapelReducer,
    mapel:mapelReducer,
    // mapelRombel:mapelRombelReducer,
    // jpRombel:mapelRombelReducer,
    jpMapel:mapelRombelReducer,
    settingJadwalMapel: settingJadwalMapelReducer,
    jadwalPelajaran: jadwalPelajaranReducer,
    jadwalPembiasaan: jadwalPembiasaanReducer,
    prota:protaReducer , // reducer jadwal pembiasaan sama dengan jadwal pelajaran, karena bentuk datanya sama, yaitu array of jp_mapelSheet, sehingga untuk mempersingkat waktu, saya menggunakan reducer yang sama, namun dengan nama yang berbeda untuk membedakan antara jadwal pelajaran dan jadwal pembiasaan
    CP:cPReducer,
    faseA: faseAReducer,
    faseB: faseBReducer,
    faseC: faseCReducer,
    Atp: AtpReducer,
    bankSoal:BankSoalReducer,
    taksonomiBloom:taksonomiBloomReducer,
    kategoriKeuangan:kategoriKeuanganReducer,
    fokusKategoriKeuangan:fokusKategoriKeuanganReducer,
    tabungan: tabunganReducer,
    keuangan: keuanganReducer,
    suratKeluar: suratKeluarReducer,
    riwayatIdAkun: riwayatIdAkunReducer,
    sppd: sppdReducer,
    pangkatGolongan: pangkatGolonganReducer,
    suratMasuk: suratMasukReducer,
    riwayatRombel: riwayatRombelReducer,
    serahTerimaDokumen: serahTerimaDokumenReducer,
    transaksiSerahterimaDokumen: transaksiSerahTerimaDokumenReducer,
    uiFokusToolbar: uiFokusReducer,
    paketSoal: paketSoalReducer,
    publikasiPaket: publikasiPaketReducer
})

export default rootReducer
