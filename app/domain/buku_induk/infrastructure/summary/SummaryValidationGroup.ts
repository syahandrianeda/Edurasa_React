import type { GroupIndukType } from "../../entities/GroupIndukType";


export default class SummaryValidationGroup {

  validate(groups: GroupIndukType[]): GroupIndukType[] {

    for (const group of groups) {
        // const indexCollection = group.dataNisIndex.map(m=>m.index)
        // const hasFirstIndex = indexCollection.includes(1);
        // group.summary.validGroup = hasFirstIndex;

        group.summary.countInvalid = 0;

        group.summary.countInvalidNis = 0;
        group.summary.countInvalidNisn = 0;

        group.summary.countInvalidNisDuplicate = 0;
        group.summary.countInvalidNisnDuplicate = 0;

        for (const siswa of group.data) {

            const invalidFormatNis = siswa.validation.errors.nis !== undefined;
            const invalidFormatNisn = siswa.validation.errors.nisn !== undefined;
            const duplicateNis = siswa.validation.duplicate.nis !== undefined;
            const duplicateNisn = siswa.validation.duplicate.nisn !== undefined;
            

            if (invalidFormatNis || duplicateNis) {
                group.summary.countInvalidNis++;
            }

            if (invalidFormatNisn || duplicateNisn) {
                group.summary.countInvalidNisn++;
            }

            if (duplicateNis) {
                group.summary.countInvalidNisDuplicate++;
            }

            if (duplicateNisn) {
                group.summary.countInvalidNisnDuplicate++;
            }

            if ( invalidFormatNis || invalidFormatNisn || duplicateNis || duplicateNisn ) {
                group.summary.countInvalid++;
            }

            

        }

    }

    return groups

  }

}