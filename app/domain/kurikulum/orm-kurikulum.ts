import type {  faseOrm, OrmAtp, OrmFaseKurikulumType, ormKurikulumInterface, OrmKurikulumMerdekaType, resourcesKurikulum } from "~/types/kurikulum/kurikulum-type";
import type { InterfaceMapel } from "~/types/mapel/mapel";

export default class OrmKurikulum{
    private dataKurikulum: ormKurikulumInterface[] = [];
    private readonly namaKurikulum = 'kurmer'
    constructor(private dataSelector:resourcesKurikulum, private mapelKoleksi:InterfaceMapel[]){}
    createData(){
        const { cp, fase, atp } = this.dataSelector;
        
        /** kosongkan/bersihkan dataKurikulum */
        this.dataKurikulum = [];
        
        //KoleksiMapel
        this.mapelKoleksi.forEach(({id,nama,kode, kode_umum,penganut})=>{
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
                            idbaris_tp:dataTp?.idbaris,
                            fase_name:dataCp?.fase,
                            tp:dataTp?.tp,
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
                        countItem: countFase,
                        lingkup_materi:dataCp.lingkup_materi
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

    atpOrm(){
        const { cp, fase:faseSelector, atp } = this.dataSelector;
        const koleksiMapel = new Map<number, ormKurikulumInterface>()
        atp.forEach(itemAtp=>{
            /** temukan fase dari Cp */
            const relationCp = cp.find(s=>s.idbaris === itemAtp.foreignkey_elemencp);
            if(relationCp){
                const {idbaris, kodemapel, fase} = relationCp;
                const mapelServerProperty= this.mapelKoleksi?.find(s=>s.kode === kodemapel && s.kelompok === this.namaKurikulum);
                if(mapelServerProperty){
                    if(!koleksiMapel.has(mapelServerProperty.id)){
                        koleksiMapel.set(mapelServerProperty.id, {
                                mapel_nama:mapelServerProperty.nama,
                                mapel_kode:mapelServerProperty.kode,
                                mapel_kode_umum:mapelServerProperty.kode_umum,
                                mapel_khusus_penganut:mapelServerProperty.penganut,
                                mapel_id: mapelServerProperty.id,
                                fase: []
                                
                        })
                    };

                }

                const findFaseInDataSelector = faseSelector.find(s=>s.fase === fase);


                
            }

        })
    }
    
}
