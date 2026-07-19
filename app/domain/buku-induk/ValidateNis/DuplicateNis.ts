import type { GropPefixNisType } from "../entities/group-prefix-nis-type";
import type GroupPrefixInduk from "../infrastructures/group-prefix-induk";
import type { ProblemValidate } from "../infrastructures/ProblemValidate";

export default class DuplicateNis {

  validate(groups: GropPefixNisType[]): GropPefixNisType[] {

    for (const group of groups) {

      const map = new Map<string, typeof group.data>();

      for (const siswa of group.data) {

        // abaikan NIS yang sudah dinyatakan tidak valid
        if (siswa.validation.errors.nis !== undefined) {
          continue;
        }

        const nis = siswa.data.nis;

        if (!map.has(nis)) {
          map.set(nis, []);
        }

        map.get(nis)!.push(siswa);
      }

      for (const [nis, list] of map) {

        if (list.length < 2) {
          continue;
        }

        const problem: ProblemValidate = {
          value: nis,
          withIds: list.map(item => item.data.id),
          withNames: list.map(item => item.data.pd_nama),
        };

        for (const siswa of list) {
          siswa.validation.isValid = false;
          siswa.validation.duplicate.nis = problem;
        }

      }
    }

    return groups;
  }

}