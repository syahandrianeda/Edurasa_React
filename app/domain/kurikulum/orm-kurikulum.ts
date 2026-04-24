import type {  faseMerdekaType, faseOrm, OrmAtp, OrmFaseKurikulumType, ormKurikulumInterface, OrmKurikulumMerdekaType, resourcesKurikulum } from "~/types/kurikulum/kurikulum-type";
import { KoleksiMapel } from "../mapel/koleksi-mapel";
import type { Agama } from "~/types/enums/agama";

export default class OrmKurikulum{
    private dataKurikulum: ormKurikulumInterface[] = [];
    constructor(private dataSelector:resourcesKurikulum){}
    createData(){
        const { cp, fase, atp } = this.dataSelector;
        
        /** kosongkan/bersihkan dataKurikulum */
        this.dataKurikulum = [];
        
        KoleksiMapel.forEach(({id,nama,kode, kode_umum,penganut})=>{
            const dataPerFase:faseOrm[]=[];
            
            fase.forEach((dataFase)=>{
                let countMapel = 0
                const objekDataPerFase:faseOrm = {faseName:dataFase.fase, elemen_cp:[],countItems:0,memberJenjang:dataFase.memberJenjang};
                const collectFaseOrmFase:OrmKurikulumMerdekaType[]=[];
                const filtering_cp_by_mapel_fase = cp.filter(s=>s.kodemapel === kode && s.fase === dataFase.fase && s.status ==='').sort((a,b)=>a.kode_elemen - b.kode_elemen);
                
                filtering_cp_by_mapel_fase.forEach((dataCp)=>{
                    const findTpInFase = dataFase?.data.filter(s=>s.foreignkey_elemencp === dataCp.idbaris &&  s.status === "");
                    const collectElemenCpInFase:OrmFaseKurikulumType[]=[];
                    let countFase = 0;
                    
                    findTpInFase?.forEach((dataTp)=>{
                        const findAtpInCurrentTpFase = atp.filter(s=>s.foreignkey_elemencp === dataCp.idbaris && s.foreignkey_tp === dataTp.idbaris && s.status === "");
                        const collectAtp:OrmAtp[]=[];
                        let countAtp = 0;
                        
                        findAtpInCurrentTpFase.forEach((atp)=>{
                                const objCollectAtp:OrmAtp = {
                                    idbaris_atp:atp.idbaris,
                                    atp:atp.atp,
                                    kelas:atp.kelas,
                                    source_atp:atp,
                                    countItem:1,
                                    status:atp.status
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
            
            const objMapel:ormKurikulumInterface = {
                mapel_nama:nama,
                mapel_kode:kode,
                mapel_kode_umum:kode_umum,
                mapel_id:id,
                mapel_khusus_penganut:penganut,
                fase:dataPerFase
            }

            this.dataKurikulum.push(objMapel);
        })
        
        return this
    }
    get data():ormKurikulumInterface[]{
        return this.dataKurikulum
    }

    
}
