import type { GroupingAtpHasManySoalType } from "../type";

export default class QueryAtpHasItemSoal{
    
    constructor(private source:GroupingAtpHasManySoalType[]){}
    
    filteringMapel(...mapel:string[]):this{
        
        this.source =  this.source.filter(s=>mapel.includes(s.mapelName));
        return this;
    }
    filteringKelas(...kelas:number[]):this {
        this.source =  this.source
                        .map((mapel)=>({
                            ...mapel,
                            hasTp: mapel.hasTp
                                            .map((atp)=>(
                                                {
                                                    ...atp,
                                                    hasAtp:atp.hasAtp.filter(s=>s.kelas.some(k=>kelas.includes(k)))
                                                }
                                            ))
                                            .filter(s=> s.hasAtp.length > 0),
                            
                        }))
                        .filter(mapel=>mapel.hasTp.length > 0)
        return this;
    }
    get(){
        return this.source;
    }
}