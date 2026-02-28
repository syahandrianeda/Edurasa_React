
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import type { UserPtk } from "~/types";
import type { RootState } from "../store";

export function hydratePreloadedState(): Partial<RootState> {
  if (typeof window === "undefined") {
    return {};
  }

  const user = getSessionApp<UserPtk>();
  const fokusRombel = getSessionRombel();

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
    }


  };
}
