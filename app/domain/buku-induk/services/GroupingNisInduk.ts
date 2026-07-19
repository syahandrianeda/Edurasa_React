import type { SiswaType } from "~/types/siswa";
import DuplicateNis from "../ValidateNis/DuplicateNis";
import GroupPrefixInduk from "../infrastructures/group-prefix-induk";
import DuplicateNisn from "../ValidateNis/DuplicateNisn";
import type { GropPefixNisType } from "../entities/group-prefix-nis-type";
import SummaryValidation from "./SummaryValidation";

export  class GroupingNisInduk{
    private readonly groupPrefixNis = new GroupPrefixInduk();
    private readonly duplicateNis = new DuplicateNis();
    private readonly duplicateNisn = new DuplicateNisn();
    private readonly SummaryValidationing = new SummaryValidation();

    constructor(private readonly siswa:SiswaType[]){}

    group(): GropPefixNisType[] {

        const grouped = this.groupPrefixNis.group(this.siswa);

        this.duplicateNis.validate(grouped);
        this.duplicateNisn.validate(grouped);
        this.SummaryValidationing.validate(grouped);

    return grouped;

    }
}