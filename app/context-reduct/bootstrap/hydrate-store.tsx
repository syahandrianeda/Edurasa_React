
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import type { UserPtk } from "~/types";
import type { RootState } from "../store";
import { KoleksiIdFileByApp } from "~/types/absensi-siswa";
import { KoleksiMapel } from "~/domain/mapel/koleksi-mapel";
import type { InterfaceMapel } from "~/types/mapel/mapel";
import { initialUiFokusCollection } from "../global-state/ui-fokus/ui-fokus-collection";

export function hydratePreloadedState(): Partial<RootState> {
  if (typeof window === "undefined") {
    return {};
  }

  const user = getSessionApp<UserPtk>();
  const fokusRombel = getSessionRombel();
  const defaultFokusmapel = KoleksiMapel.find(s=>s.kode === 'PKN') as InterfaceMapel;
  const mapelByUser = KoleksiMapel.find(s=>s.kode === user?.kode_mapel_ampu) as InterfaceMapel
  const mapelFokus = user?.jabatan === 'Guru Mapel'?mapelByUser:defaultFokusmapel;

  return {
    auth: {
      user: user ?? null,
      loaded:false,
      name:'auth'
    },
    fokusRombel: {
      value: fokusRombel ?? null,
      name:'fokusRombel',
      loaded:false
    },
    dataSiswa:{
      name:'datasiswa',
      data: [],
      loaded:false,
      loading:true
    },
    loadedApi:{
      loaded:false,
      name:'loaded_animation',
    },
    kaldik:{
      loaded:false,
      name:'kalender',
      data:[]
    },
    absensiSiswa:{
      dataAbsensi:[],
      name:'absensi',
      loaded:false
    },
    uiPreference:{
      sabtuLibur:false,
      name:'isSabtuLibur',
      loaded:true
    },
    /** kurmer akan deprecated */
    // kurmer:{
    //   dataCp:[],
    //   loadedCp:false,
    //   dataTpFaseA:[],
    //   loadedTpFaseA:false,
    //   dataTpFaseB:[],
    //   loadedTpFaseB:false,
    //   dataTpFaseC:[],
    //   loadedTpFaseC:false,
    //   dataAtp:[],
    //   loadedAtp:false
    // },
    fokusMapel:{
      data: mapelFokus,
      disabled:user?.jabatan === 'Guru Mapel',
      name:'fokusMapel',
      loaded:false
    },
    mapel:{
      data:[],
      name:'mapel',
      loaded:false
    },
    jpMapel:{
      // dataMapelRombel:[],
      data:[],
      name:'jp_mapel',
      loaded:false
    },
    jadwalPelajaran:{
      // dataJadwalPelajaran:[],
      loaded:false,
      data:[],
      name:'jadwal_mapel',
    },
    settingJadwalMapel:{
      name:'setting_jadwal',
      data:[],
      loaded:false
    },
    jadwalPembiasaan:{
      name:'kegiatan_nonkbm',
      data:[],
      loaded:false
    },
    faseA:{
      name:'faseA',
      data:[],
      loaded:false
    },
    faseB:{
      name:'faseB',
      data:[],
      loaded:false
    },
    faseC:{
      name:'faseC',
      data:[],
      loaded:false
    },
    Atp:{
      name:'Atp',
      data:[],
      loaded:false
    },
    CP:{
      name:'elemen_cp',
      data:[],
      loaded:false
    },
    prota:{
      data:[],
      name:'prota',
      loaded:false
      
    },
    bankSoal:{
      data:[],
      name:'bank_soal',
      loaded:false
    },
    //anggap keuangan kelas itu tabungan
    kategoriKeuangan:{
      data:[
        {
          idbaris:0,
          user_id: null,
          kategori:'tabungan',
          nama_user:'',
          akses_kelas:''
        }
      ],
      name:'kategori_akses',
      loaded:false
    },
    fokusKategoriKeuangan:{
      value:undefined,
      name:'fokusRombelKategoriKeuangan',
      loaded:false
    },
    keuangan: {
        data:[],
        name:'keuangan',
        loaded:false
    },
    tabungan: {
        data:[],
        name:'tabungan',
        loaded:false
    },
    suratKeluar:{
      data: [],
      name:'surat_keluar',
      loaded:false
    },
    riwayatIdAkun:{
      data: [],
      name:'riwayat_id_akun',
      loaded:false
    },
    sppd:{
      data: [],
      name:'sppd',
      loaded:false
    },
    pangkatGolongan:{
      name:'pangkat_golongan',
      data:[],
      loaded:false
    },
    suratMasuk:{
      data: [],
      name:'surat_masuk',
      loaded:false
    },
    riwayatRombel:{
      data: [],
      name:'riwayat_rombel',
      loaded:false
    },
    serahTerimaDokumen:{
      data:[],
      name:'serah_terima_dokumen',
      loaded:false
    },
    transaksiSerahterimaDokumen:{
      data: [],
      name: 'transaksi_serah_terima',
      loaded:false
    },
    uiFokusToolbar:{
      data:initialUiFokusCollection,
      name:'UiFokus',
      loaded:true
    }


  };
}
