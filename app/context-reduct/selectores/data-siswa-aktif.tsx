import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { getNumberFromString } from "~/lib/get-number";
import { DTOSiswa } from "~/dtos/dto-siswa";
import type { SiswaType } from "~/types/siswa";

export const selectAllSiswa = (state: RootState) =>
  state.dataSiswa.allSiswa;

export const selectAllSiswaDTO = createSelector(
  [selectAllSiswa],
  // (dtos) => DTOSiswa.fromApiArray(dtos)
  (dtos) => {
    const data = DTOSiswa.fromApiArray(dtos);

    return [...data].sort((a, b) => {
      const namaA = a.pd_nama?.trim() ?? "";
      const namaB = b.pd_nama?.trim() ?? "";

      // taruh nama kosong di bawah
      if (!namaA && !namaB) return 0;
      if (!namaA) return 1;
      if (!namaB) return -1;

      return namaA.localeCompare(namaB, "id", { sensitivity: "base" });
    });
  }
);

export const DataSiswaAktifRombel = createSelector(
  [
    // (state: RootState) => state.dataSiswa.allSiswa,
    selectAllSiswaDTO,
    (state: RootState) => state.fokusRombel.value,
  ],
  (allSiswa, fokusRombel) => {
    if (!fokusRombel) return [];

    return allSiswa.filter(
      s =>
        s.aktif === "aktif" &&
        s.nama_rombel === fokusRombel &&
        s.jenjang === getNumberFromString(fokusRombel)
    );
  }
);

/**
 * @info SemuaDataSiswa baik aktif maupun non-aktif di rombel tertentu
 */
export const DataSiswaAllRombel = createSelector(
  [
    // (state: RootState) => state.dataSiswa.allSiswa,
    selectAllSiswaDTO,
    (state: RootState) => state.fokusRombel.value,
  ],
  (allSiswa, fokusRombel) => {
    if (!fokusRombel) return [];

    return allSiswa.filter(
      s =>
        s.nama_rombel === fokusRombel 
      // &&
      //   s.jenjang === getNumberFromString(fokusRombel)
    );
  }
);

export const DataSiswaAktifJenjang = createSelector(
  [
    // (state: RootState) => state.dataSiswa.allSiswa,
    selectAllSiswaDTO,
    (state: RootState) => state.fokusRombel.value,
  ],
  (allSiswa, fokusRombel) => {
    if (!fokusRombel) return [];

    return allSiswa.filter(
      s =>
        s.aktif === "aktif" &&
        // s.nama_rombel === fokusRombel &&
        s.jenjang === getNumberFromString(fokusRombel)
    );
  }
);

export const DataSiswaAktif = createSelector(
  [
    // (state: RootState) => state.dataSiswa.allSiswa,
    selectAllSiswaDTO,
    (state: RootState) => state.fokusRombel.value,
  ],
  (allSiswa, fokusRombel) => {
    if (!fokusRombel) return [];

    return allSiswa.filter(
      s =>
        s.aktif === "aktif" 
        
    );
  }
);

export interface SiswaWithValidation {
  data: SiswaType;

  validation: validationType
}
export interface validationType {
    isValid: boolean;

    errors: {
      nis?: string;
      nisn?: string;
    };

    duplicate: {
      nis?: {
        value: string;
        withIds: number[];
        withNames: string[];
      };
      nisn?: {
        value: string;
        withIds: number[];
        withNames: string[];
      };
    };
  }

const isValidNis = (nis?: string) =>
  typeof nis === "string" && /^\d{9}$/.test(nis);//nis.trim().length >= 4;

const isValidNisn = (nisn?: string) =>
  typeof nisn === "string" && /^\d{10}$/.test(nisn);

export const selectSiswaWithValidation = createSelector(
  [selectAllSiswaDTO],
  (siswaList): SiswaWithValidation[] => {

    // =========================
    // MAP DUPLIKAT
    // =========================
    const nisMap = new Map<string, number[]>();
    const nisnMap = new Map<string, number[]>();
    const nameMap = new Map<string, string[]>();

    siswaList.forEach(s => {
      if (isValidNis(s.nis)) {
        nisMap.set(s.nis, [...(nisMap.get(s.nis) ?? []), s.id]);
        nameMap.set(s.nis, [...(nameMap.get(s.nis) ?? []), s.pd_nama ?? '']);
      }
      
      if (isValidNisn(s.nis)) {

        nisnMap.set(s.nisn, [...(nisnMap.get(s.nisn) ?? []), s.id]);
        nameMap.set(s.nisn, [...(nameMap.get(s.nisn) ?? []), s.pd_nama ?? '']);
      }
    });

    // =========================
    // VALIDASI PER SISWA
    // =========================
    return siswaList.map(s => {
      const errors: {
        nis?: string;
        nisn?: string;
      } = {};

      const duplicate: {
        nis?: { value: string; withIds: number[]; withNames: string[] };
        nisn?: { value: string; withIds: number[]; withNames: string[] };
      } = {};

      // ---------- VALIDASI FORMAT ----------
      if (!isValidNis(s.nis)) {
        errors.nis = "NIS wajib diisi & memiliki 9 angka";
      }

      if (!isValidNisn(s.nisn)) {
        errors.nisn = "NISN wajib 10 digit angka";
      }
      // ---------- DUPLIKAT NIS ----------
      if (s.nis) {
        const nisIds = nisMap.get(s.nis) ?? [];
        if (nisIds.length > 1) {
          duplicate.nis = {
            value: s.nis,
            withIds: nisIds.filter(id => id !== s.id),
            withNames: nameMap.get(s.nis)?.filter(name=> name !== (s.pd_nama ?? '')) || []
          };
        }
      }

      // ---------- DUPLIKAT NISN ----------
      if (s.nisn) {
        const nisnIds = nisnMap.get(s.nisn) ?? [];
        if (nisnIds.length > 1) {
          duplicate.nisn = {
            value: s.nisn,
            withIds: nisnIds.filter(id => id !== s.id),
            withNames: nameMap.get(s.nisn)?.filter(name=> name !== (s.pd_nama ?? '')) || []
          };
        }
      }

      const isValid = Object.keys(errors).length === 0 && !duplicate.nis && !duplicate.nisn;

      return {
        data: s,
        validation: {
          isValid,
          errors,
          duplicate,
        },
      };
    });
  }
);

export function validateSiswaList(
  siswaList: SiswaType[]
): SiswaWithValidation[] {

  // =========================
  // MAP DUPLIKAT
  // =========================
  const nisMap = new Map<string, number[]>();
  const nisnMap = new Map<string, number[]>();
  const nameMap = new Map<string, string[]>();

  siswaList.forEach(s => {
    if (isValidNis(s.nis)) {
      nisMap.set(s.nis, [...(nisMap.get(s.nis) ?? []), s.id]);
      nameMap.set(s.nis, [...(nameMap.get(s.nis) ?? []), s.pd_nama ?? '']);
    }

    if (isValidNisn(s.nisn)) {
      nisnMap.set(s.nisn, [...(nisnMap.get(s.nisn) ?? []), s.id]);
      nameMap.set(s.nisn, [...(nameMap.get(s.nisn) ?? []), s.pd_nama ?? '']);
    }
  });

  // =========================
  // VALIDASI PER SISWA
  // =========================
  return siswaList.map(s => {
    const errors: {
      nis?: string;
      nisn?: string;
    } = {};

    const duplicate: {
      nis?: { value: string; withIds: number[]; withNames: string[] };
      nisn?: { value: string; withIds: number[]; withNames: string[] };
    } = {};

    // ---------- FORMAT ----------
    if (!isValidNis(s.nis)) {
      errors.nis = "NIS wajib diisi & memiliki 9 angka";
    }

    if (!isValidNisn(s.nisn)) {
      errors.nisn = "NISN wajib 10 digit angka";
    }

    // ---------- DUPLIKAT ----------
    if (isValidNis(s.nis)) {
      const ids = nisMap.get(s.nis)!;
      if (ids.length > 1) {
        duplicate.nis = {
          value: s.nis,
          withIds: ids.filter(id => id !== s.id),
          withNames: nameMap.get(s.nis)?.filter(name=> name !== (s.pd_nama ?? '')) || []
        };
      }
    }

    if (isValidNisn(s.nisn)) {
      const ids = nisnMap.get(s.nisn)!;
      if (ids.length > 1) {
        duplicate.nisn = {
          value: s.nisn,
          withIds: ids.filter(id => id !== s.id),
          withNames: nameMap.get(s.nisn)?.filter(name=> name !== (s.pd_nama ?? '')) || []
        };
      }
    }

    const isValid =
      Object.keys(errors).length === 0 &&
      !duplicate.nis &&
      !duplicate.nisn;

    return {
      data: s,
      validation: {
        isValid,
        errors,
        duplicate,
      },
    };
  });
}
export const DataSiswaAktifWithValidation = createSelector(
  [
    // (state: RootState) => state.dataSiswa.allSiswa,
    selectAllSiswaDTO,
    (state: RootState) => state.fokusRombel.value,
  ],
  (allSiswa, fokusRombel) => {
    if (!fokusRombel) return [];

    const dataSiswa = validateSiswaList(allSiswa).filter(
      s =>
        s.data.aktif === "aktif" &&
        s.data.nama_rombel === fokusRombel &&
        s.data.jenjang === getNumberFromString(fokusRombel)
    );

    return dataSiswa;
  }
);
export const DataSiswaAktifJenjangWithValidation = createSelector(
  [
    // (state: RootState) => state.dataSiswa.allSiswa,
    selectAllSiswaDTO,
    (state: RootState) => state.fokusRombel.value,
  ],
  (allSiswa, fokusRombel) => {
    if (!fokusRombel) return [];

    const dataSiswa = validateSiswaList(allSiswa).filter(
      s =>
        s.data.aktif === "aktif" &&
        s.data.jenjang === getNumberFromString(fokusRombel)
    );

    return dataSiswa;
  }
);