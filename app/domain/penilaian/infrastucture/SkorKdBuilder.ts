import type { GroupBentukSoalPropertiKurikulumInPublikasiAssesmenWithScore } from "../model/grouping-kurikulum-by-bentuksoal";

export default class SkorKdBuilder{
    static build(data:GroupBentukSoalPropertiKurikulumInPublikasiAssesmenWithScore[]):Record<string, number>{
        return data.map(m=>m.objekSkorKd).reduce((a,b)=>({...a,...b}))
    }
}