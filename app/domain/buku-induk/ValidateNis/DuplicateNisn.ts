// import type {
//   GropPefixNis,
//   ProblemValidate,
// } from "~/types";

import type { GropPefixNisType } from "../entities/group-prefix-nis-type";
import type { ProblemValidate } from "../infrastructures/ProblemValidate";

export default class DuplicateNisn {

  validate(groups: GropPefixNisType[]): GropPefixNisType[] {

    for (const group of groups) {

      const map = new Map<string, typeof group.data>();

      for (const siswa of group.data) {

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

    return groups;
  }

}