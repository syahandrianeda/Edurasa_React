
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import type { UserPtk } from "~/types";
import type { RootState } from "../store";
import { KoleksiIdFileByApp } from "~/types/absensi-siswa";
import { KoleksiMapel } from "~/domain/mapel/koleksi-mapel";
import type { InterfaceMapel } from "~/types/mapel";

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
    },
    fokusRombel: {
      value: fokusRombel ?? null,
    },
    dataSiswa:{
      allSiswa: [],
      loaded:false,
      loading:true
    },
    loadedApi:{
      loaded:false
    },
    kaldik:{
      loaded:false,
      data:[]
    },
    absensiSiswa:{
      dataAbsensi:[]
    },
    uiPreference:{
      sabtuLibur:true
    },
    kurmer:{
      dataCp:[],
      loadedCp:false,
      dataTpFaseA:[],
      loadedTpFaseA:false,
      dataTpFaseB:[],
      loadedTpFaseB:false,
      dataTpFaseC:[],
      loadedTpFaseC:false,
      dataAtp:[],
      loadedAtp:false
    },
    fokusMapel:{
      data: mapelFokus,
      disabled:user?.jabatan === 'Guru Mapel'
    }

  };
}
