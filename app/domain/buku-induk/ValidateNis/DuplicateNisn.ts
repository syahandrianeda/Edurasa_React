// import type {
//   GropPefixNis,
//   ProblemValidate,
// } from "~/types";

import type { SiswaWithValidation } from "~/context-reduct/selectores/data-siswa-aktif";
import type { GropPefixNisType } from "../entities/group-prefix-nis-type";
import type { ProblemValidate } from "../infrastructures/ProblemValidate";

export default class DuplicateNisn {

  validate(groups: GropPefixNisType[]): GropPefixNisType[] {

    for (const group of groups) {
      const groupSiswa = group.data;
      this.validateInSiswaValidation(groupSiswa);
      
    }

    return groups;
  }
  
  validateInSiswaValidation(groupSiswa:SiswaWithValidation[]){
    const map = new Map<string, typeof groupSiswa>();

      for (const siswa of groupSiswa) {

        // Abaikan NISN yang sudah tidak valid
        if (siswa.validation.errors.nisn !== undefined) {
          continue;
        }

        const nisn = siswa.data.nisn;

        if (!map.has(nisn)) {
          map.set(nisn, []);
        }

        map.get(nisn)!.push(siswa);
      }

      for (const [nisn, list] of map) {

        if (list.length < 2) {
          continue;
        }

        const problem: ProblemValidate = {
          value: nisn,
          withIds: list.map(item => item.data.id),
          withNames: list.map(item => item.data.pd_nama),
        };

        for (const siswa of list) {
          siswa.validation.isValid = false;
          siswa.validation.duplicate.nisn = problem;
        }
      }
  }
}