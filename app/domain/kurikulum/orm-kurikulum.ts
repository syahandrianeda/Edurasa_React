import type {  faseMerdekaType, OrmAtp, OrmFaseKurikulumType, OrmKurikulumMerdekaType, resourcesKurikulum } from "~/types/kurikulum/kurikulum-type";
import type { ElemenCpType } from "~/types/kurikulum/elemen-cp";
import type { FaseKurikulumType } from "~/types/kurikulum/fase-kurikulum";
import type { AtpKurikulumType } from "~/types/kurikulum/atp-kurikulum";
import { KoleksiMapel } from "../mapel/koleksi-mapel";
import type { Agama } from "~/types/enums/agama";
import type { InterfaceMapel } from "~/types/mapel";
// export interface ormKurmer{
//     fase:faseMerdekaType,
//     dataPerMapel: mapelCpTpAtp[]
// }
// export interface mapelCpTpAtp{
//             mapel_nama:string,
//             mapel_kode:string,
//             mapel_kode_umum:string,
//             mapel_khusus_penganut?:Agama,
//             mapel_id:number, // digunakan untuk pengurutan di rapor
//             cp_tp_atp:OrmKurikulumMerdekaType[]
//         }
export interface ormKurikulum{
    mapel_nama:string,
    mapel_kode:string,
    mapel_kode_umum:string,
    mapel_khusus_penganut?:Agama,
    mapel_id:number, // digunakan untuk pengurutan di rapor
    fase: faseOrm[]

}
export interface faseOrm{
    faseName:faseMerdekaType,
    elemen_cp:OrmKurikulumMerdekaType[],
    countItems:number,

}
export default class OrmKurikulum{
    private dataKurikulum: ormKurikulum[] = [];
    constructor(private dataSelector:resourcesKurikulum){}
    createData(){
        const {
        cp, 
        fase, 
        atp
        } = this.dataSelector;
        /** kosongkan/bersihkan dataKurikulum */
        this.dataKurikulum = [];
        KoleksiMapel.forEach(({id,nama,kode, kode_umum,penganut})=>{
            // const filtering_cp_by_mapel = cp.filter(s=>s.kodemapel === kode);
            const dataPerFase:faseOrm[]=[];
            fase.forEach((dataFase)=>{
                let countMapel = 0
                const objekDataPerFase:faseOrm = {faseName:dataFase.fase, elemen_cp:[],countItems:0};
                const collectFaseOrmFase:OrmKurikulumMerdekaType[]=[];
                const filtering_cp_by_mapel_fase = cp.filter(s=>s.kodemapel === kode && s.fase === dataFase.fase);
                filtering_cp_by_mapel_fase.forEach((dataCp)=>{
                    const findTpInFase = dataFase?.data.filter(s=>s.foreignkey_elemencp === dataCp.idbaris && s.tp !=="");
                    const collectElemenCpInFase:OrmFaseKurikulumType[]=[];
                    let countFase = 0;
                    findTpInFase?.forEach((dataTp)=>{
                        const findAtpInCurrentTpFase = atp.filter(s=>s.foreignkey_elemencp === dataCp.idbaris && s.foreignkey_tp === dataTp.idbaris);
                        const collectAtp:OrmAtp[]=[];
                        let countAtp = 0;
                        findAtpInCurrentTpFase.forEach((atp)=>{
                                const objCollectAtp:OrmAtp = {
                                    idbaris_atp:atp.idbaris,
                                    atp:atp.atp,
                                    kelas:atp.kelas,
                                    source_atp:atp,
                                    countItem:1
                                };
                                collectAtp.push(objCollectAtp);
                                countAtp++
                            }
                        )
                        const dataElemenCpFase:OrmFaseKurikulumType={
                            idbaris_tp:dataTp.idbaris,
                            fase_name:dataCp.fase,
                            tp:dataTp.tp,
                            atp:collectAtp,
                            source_data_tp:dataTp,
                            countItem:countAtp,
                        };
                        collectElemenCpInFase.push(dataElemenCpFase)
                        countFase+= countAtp===0?1:countAtp
                    })
                    const objElemenCpInFase:OrmKurikulumMerdekaType={
                        id_elemen_cp:dataCp.idbaris,
                        kodemapel:kode,
                        elemen:dataCp.elemen,
                        tp_fase_properties:collectElemenCpInFase,
                        cp_utama:dataCp.cp_utama,
                        index:dataCp.kode_elemen,
                        countItem: countFase
                    }
                    collectFaseOrmFase.push(objElemenCpInFase);
                    countMapel+=countFase===0?1:countFase
                })
                objekDataPerFase.elemen_cp = collectFaseOrmFase;
                objekDataPerFase.countItems = countMapel;
                dataPerFase.push(objekDataPerFase);
                
            })
            // /** fase A */
            // const dataFaseA = fase.find(s=>s.fase === 'A');
            // const objekDataPerFaseA:faseOrm = { faseName:'A', elemen_cp:[] };
            // const collectFaseOrmFaseA:OrmKurikulumMerdekaType[]=[]
            // const collectElemenCpInFaseA:OrmFaseKurikulumType[]=[]
            // const filtering_cp_by_mapel_faseA = cp.filter(s=>s.kodemapel === kode && s.fase === 'A');
            // filtering_cp_by_mapel_faseA.forEach((dataCp)=>{
            //     const findTpInFaseA = dataFaseA?.data.filter(s=>s.foreignkey_elemencp === dataCp.idbaris && s.tp !=="");
            //     findTpInFaseA?.forEach(({idbaris, tp})=>{
            //         const dataElemenCpFaseA:OrmFaseKurikulumType={
            //             idbaris_tp:idbaris,
            //             fase_name:dataCp.fase,
            //             tp:tp
            //         };
            //         collectElemenCpInFaseA.push(dataElemenCpFaseA)

            //     })
            //     const objElemenCpInFaseA:OrmKurikulumMerdekaType={
            //         id_elemen_cp:dataCp.idbaris,
            //         kodemapel:kode,
            //         elemen:dataCp.elemen,
            //         tp_fase_properties:collectElemenCpInFaseA,
            //         cp_utama:dataCp.cp_utama,
            //         index:dataCp.kode_elemen
            //     }
            //     collectFaseOrmFaseA.push(objElemenCpInFaseA);
            // })
            // objekDataPerFaseA.elemen_cp = collectFaseOrmFaseA;
            // dataPerFase.push(objekDataPerFaseA);
            // /** fase B */
            // const dataFaseB = fase.find(s=>s.fase === 'B');
            // const objekDataPerFaseB:faseOrm = { faseName:'B', elemen_cp:[] };
            // const collectFaseOrmFaseB:OrmKurikulumMerdekaType[]=[]
            // const collectElemenCpInFaseB:OrmFaseKurikulumType[]=[]
            // const filtering_cp_by_mapel_faseB = cp.filter(s=>s.kodemapel === kode && s.fase === 'B');
            // filtering_cp_by_mapel_faseB.forEach((dataCp)=>{
            //     const findTpInFaseB = dataFaseB?.data.filter(s=>s.foreignkey_elemencp === dataCp.idbaris && s.tp !=="");
            //     findTpInFaseB?.forEach(({idbaris, tp})=>{
            //         const dataElemenCpFaseB:OrmFaseKurikulumType={
            //             idbaris_tp:idbaris,
            //             fase_name:dataCp.fase,
            //             tp:tp
            //         };
            //         collectElemenCpInFaseB.push(dataElemenCpFaseB)

            //     })
            //     const objElemenCpInFaseB:OrmKurikulumMerdekaType={
            //         id_elemen_cp:dataCp.idbaris,
            //         kodemapel:kode,
            //         elemen:dataCp.elemen,
            //         tp_fase_properties:collectElemenCpInFaseB,
            //         cp_utama:dataCp.cp_utama,
            //         index:dataCp.kode_elemen
            //     }
            //     collectFaseOrmFaseB.push(objElemenCpInFaseB);
            // })
            // objekDataPerFaseB.elemen_cp = collectFaseOrmFaseB;
            // dataPerFase.push(objekDataPerFaseB);
            // /** fase C */
            // const dataFaseC = fase.find(s=>s.fase === 'C');
            // const objekDataPerFaseC:faseOrm = { faseName:'C', elemen_cp:[] };
            // const collectFaseOrmFaseC:OrmKurikulumMerdekaType[]=[]
            // const collectElemenCpInFaseC:OrmFaseKurikulumType[]=[]
            // const filtering_cp_by_mapel_faseC = cp.filter(s=>s.kodemapel === kode && s.fase === 'C');
            // filtering_cp_by_mapel_faseC.forEach((dataCp)=>{
            //     const findTpInFaseC = dataFaseC?.data.filter(s=>s.foreignkey_elemencp === dataCp.idbaris && s.tp !=="");
            //     findTpInFaseC?.forEach(({idbaris, tp})=>{
            //         const dataElemenCpFaseC:OrmFaseKurikulumType={
            //             idbaris_tp:idbaris,
            //             fase_name:dataCp.fase,
            //             tp:tp
            //         };
            //         collectElemenCpInFaseC.push(dataElemenCpFaseC)

            //     })
            //     const objElemenCpInFaseC:OrmKurikulumMerdekaType={
            //         id_elemen_cp:dataCp.idbaris,
            //         kodemapel:kode,
            //         elemen:dataCp.elemen,
            //         tp_fase_properties:collectElemenCpInFaseC,
            //         cp_utama:dataCp.cp_utama,
            //         index:dataCp.kode_elemen
            //     }
            //     collectFaseOrmFaseC.push(objElemenCpInFaseC);
            // })
            // objekDataPerFaseC.elemen_cp = collectFaseOrmFaseC;
            // dataPerFase.push(objekDataPerFaseC);
            

            const objMapel:ormKurikulum = {
                mapel_nama:nama,
                mapel_kode:kode,
                mapel_kode_umum:kode_umum,
                mapel_id:id,
                mapel_khusus_penganut:penganut,
                fase:dataPerFase
            }
            this.dataKurikulum.push(objMapel);
        })
        
        return this.dataKurikulum;
    }

    
}
