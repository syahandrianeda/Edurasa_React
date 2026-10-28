import MapperTagihanHasDataRespon from "~/domain/penilaian/infrastucture/MapperTagihanHasDataRespon";
import getOrCreateMap from "~/lib/getOrCreateMapper";
import type { detailNilaiSiswaAppType } from "~/types/penilaian/nilai-siswa-app-type";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import type { SiswaType } from "~/types/siswa";

// export type ResponAtpMapperType = Map<number,RisponsePenilaianSiswa[]>
export type ResponAtpMapperType = Map<number,{ref:detailNilaiSiswaAppType[],rispon:RisponsePenilaianSiswa[]}>
// export type MapperSiswaOnDataResponType = Map<number,  {siswa:SiswaType, ref:detailNilaiSiswaAppType[], responAtpMapper:ResponAtpMapperType}>
export type MapperSiswaOnDataResponType = Map<number,  {siswa:SiswaType,  responAtpMapper:ResponAtpMapperType}>
// export type MapperSiswaOnDataResponType = Map<number,  {siswa:SiswaType, responAtpMapper:RisponsePenilaianSiswa[]}>

export default class MapperSiswaOnDataResponBuilder{
    static build(data_respons:detailNilaiSiswaAppType[]):MapperSiswaOnDataResponType{
        const result:MapperSiswaOnDataResponType = new Map();
        for(const respon of data_respons){
            const {respon:sourceRespon, idbaris, siswa} = respon;
            const currentSiswa = getOrCreateMap(result,respon.siswa_id,()=>({
                siswa: respon?.siswa!,
                // siswa,
                // ref:[],
                responAtpMapper: new Map()
            }));
            // currentSiswa.ref.push(respon);
            // respon.respon.forEach(rsp=>{
            //     const dd = getOrCreateMap(currentSiswa.responAtpMapper, rsp.atp,()=>([]));
            //     dd.push(rsp)
            //     // const dd = getOrCreateMap(currentSiswa.responAtpMapper, rsp.atp, ()=>rsp)
            // });
            
            sourceRespon.forEach(rsp=>{
                const dd = getOrCreateMap(currentSiswa.responAtpMapper, rsp.atp, ()=>({
                    ref:[],
                    rispon:[]
                }));
                dd.rispon.push(rsp);
                dd.ref.push(respon)
            })
            
        }
        return result;
        
    }
}