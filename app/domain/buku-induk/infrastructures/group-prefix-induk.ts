// import ValidationBuilder from "../validation/ValidationBuilder";
// import ValidateNis from "../validation/ValidateNis";
// import ValidateNisn from "../validation/ValidateNisn";
import type { SiswaType } from "~/types/siswa";
import type { GropPefixNisType } from "../entities/group-prefix-nis-type";
import ValidateNis from "../ValidateNis/ValidateNis";
import ValidateNisn from "../ValidateNis/ValidateNisn";
import ValidationBuilder from "../ValidateNis/ValidationBuilder";
import type { SiswaWithValidation } from "~/context-reduct/selectores/data-siswa-aktif";

// import type {
//   GropPefixNis,
//   SummaryValidateIndukType,
//   SiswaType,
//   SiswaWithValidation,
// } from "../types";

export default class GroupPrefixInduk {
    constructor(
        private readonly validateNis = new ValidateNis(),
        private readonly validateNisn = new ValidateNisn()
    ) {}

    group(data: SiswaType[]): GropPefixNisType[] {
        const groups = new Map<string, GropPefixNisType>();

        for (const siswa of data) {
            const nis = this.validateNis.validate(siswa.nis);
            const nisn = this.validateNisn.validate(siswa.nisn);

            const validation = new ValidationBuilder()
                .setNis(nis)
                .setNisn(nisn)
                .build();

            const prefix = nis.valid
                ? siswa.nis.substring(0, 4)
                : "kosong";

            if (!groups.has(prefix)) {
                groups.set(prefix, {
                    groupNis: prefix,
                    data: [],
                    summary: {
                        countInvalid: 0,
                        countInvalidNis: 0,
                        countInvalidNisn: 0,
                        countInvalidNisDuplicate:0, 
                        countInvalidNisnDuplicate:0
                        
                    },
                });
            }

            const group = groups.get(prefix)!;

            const item: SiswaWithValidation = {
                data: siswa,
                validation,
            };

            group.data.push(item);

            if (!nis.valid) {
                group.summary.countInvalid++;
                group.summary.countInvalidNis++;
            }

            if (!nisn.valid) {
                group.summary.countInvalid++;
                group.summary.countInvalidNisn++;
            }
        }

        return [...groups.values()].sort((a,b)=>a.groupNis.localeCompare(b.groupNis))
    }
}