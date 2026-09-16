import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { AtpAsOrm } from "~/types/kurikulum/prota-orm";
import GroupingSoal from "./grouping-soal";
import type { AtpHasManySoalType, dataAtpMany, GroupingAtpHasManySoalType } from "../type";
import GroupedAtpHasManySOal from "./grouping-soal-atp-has-many-soal";


export default class AtpOrmHasManySoal{
    
    private _data: AtpHasManySoalType[] = [];
    private atpGroup:GroupingAtpHasManySoalType[]=[]
    
    constructor(private readonly kurikulum:AtpAsOrm[], private readonly koleksiSoal:BankSoalAppType[]){}
    
    build():this{
        this._data =  this.kurikulum.map((atp)=>({...atp, hasSoal:this.koleksiSoal.filter(s=>s.kd_id === atp.atp_as_tp_id)}))
        return this;
    }
    
    groupingBasedMapel():this{
        this.atpGroup = GroupedAtpHasManySOal.buildGroup(this._data)
        return this;
    }
    
    get data(){
        return this._data;
    }
    get dataGroup(){
        return this.atpGroup
    }

}