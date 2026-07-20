import type { SiswaType } from "~/types/siswa";
import { GroupingInduk } from "./GroupingInduk";

import DuplicateNis from "~/domain/buku-induk/ValidateNis/DuplicateNis";
import DuplicateNisn from "~/domain/buku-induk/ValidateNis/DuplicateNisn";

import SummaryValidationGroup from "../infrastructure/summary/SummaryValidationGroup";
import type { GroupIndukType } from "../entities/GroupIndukType";
import { OrderedListInduk } from "../infrastructure/list-induk/ordered-list-indux";

export class GroupingIndukBuilder{
        private readonly groupPrefixNis: GroupIndukType[];//InstanceType<GroupingInduk>;//= new GroupPrefixInduk();
        private readonly duplicateNis = new DuplicateNis();
        private readonly duplicateNisn = new DuplicateNisn();
        private readonly SummaryValidationing = new SummaryValidationGroup();
        private readonly orderedListInduk = new OrderedListInduk()
    
        constructor(private readonly siswa:SiswaType[]){
            this.groupPrefixNis = new GroupingInduk(siswa).group()
        }
        build():this{
        // group():GroupIndukType[]{
    
            const grouped = this.groupPrefixNis;
    
            this.duplicateNis.validate(grouped);
            this.duplicateNisn.validate(grouped);
            this.SummaryValidationing.validate(grouped);
            this.orderedListInduk.validate(grouped);
            /**
             * this.predictableRiwayatRapor.build(grouped)
             */
    
        // return grouped;
        return this;
    
        }

        get group(){
            return this.groupPrefixNis
        }
}