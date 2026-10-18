import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import type { GroupBentukSoalPropertiKurikulumInPublikasiAssesmenWithScore, GroupSebaranNoSoalFromPropertyKurikulumWithScore, KoleksiBentukSoalDanPropertyKurikulumBasedBentukSoal } from "../model/grouping-kurikulum-by-bentuksoal";

export default class SkorKdSebaranBuilder{
    static build(
        StrukturKurikulumPaketSoal:KoleksiBentukSoalDanPropertyKurikulumBasedBentukSoal,
        sumberRespon:RisponsePenilaianSiswa[]
    ):GroupSebaranNoSoalFromPropertyKurikulumWithScore{
        const dataResult:GroupBentukSoalPropertiKurikulumInPublikasiAssesmenWithScore[] = StrukturKurikulumPaketSoal.data.map(branchMapel=>{
            const objekSkorKd= Object.create(null);
            let skorMapel:number = 0;
            let jumlahSoalDinilai_mapel:number=0;
            let total_mapel:number = 0
           
            const dataCp =  branchMapel.dataCp.map(branchCp=>{
                    /**
                     * skor: number
                        total: number,
                        jumlahSoalDinilai: number,
                     */
                let skor_cp:number = 0;
                let total_cp:number = 0;
                let jumlahSoalDinilai_cp: number = 0
                const dataTp = branchCp.dataTp.map(branchTp=>{
                    /**
                     * skor: number
                        total: number,
                        jumlahSoalDinilai: number,
                     */
                    let skorTp:number = 0;
                    let total_tp:number = 0;
                    let jumlahSoalDinilai_tp:number = 0
                    const dataAtp = branchTp.dataAtp.map(branchAtp=>{
                        /**
                         * skor: number;
                            total: number,
                            jumlahSoalDinilai: number;
                                                
                         */
                        let SkorAtp:number = 0;
                        let totalATP:number= 0;
                        let jumlahSoalDinilai_atp:number = 0
                        const  dataBentukSoal = branchAtp.dataBentukSoal.map(item=>{
                            
                            const data = item.data.map(soal=>{
                                const updateSkor = sumberRespon.find(s=>s.no_prefix === soal.no_soal && s.bentuk_soal === item.bentukSoal);
                                const skor = updateSkor?.skor ?? 0;

                                totalATP+=skor;
                                jumlahSoalDinilai_atp++;

                                total_tp += skor;
                                jumlahSoalDinilai_tp++;

                                total_cp += skor;
                                jumlahSoalDinilai_cp++

                                total_mapel+=skor
                                jumlahSoalDinilai_mapel++;

                                return {
                                    ...soal,
                                    skor
                                }
                            })
                            return {
                                ...item,
                                data
                            }
                        })
                        SkorAtp = Number((totalATP/jumlahSoalDinilai_atp).toFixed(2));
                        const keyKodeMapel_idAtp =  `${branchMapel.kodeMapel}_${branchAtp.atp_id}`;
                        objekSkorKd[keyKodeMapel_idAtp] = SkorAtp;
                        return {
                            ...branchAtp,
                            skor:SkorAtp,
                            total:totalATP,
                            jumlahSoalDinilai:jumlahSoalDinilai_atp,
                            dataBentukSoal
                        }
                    })
                    skorTp = Number((total_tp/jumlahSoalDinilai_tp).toFixed(2))
                    return {
                        ...branchTp,
                        skor:skorTp,
                        total:total_tp,
                        jumlahSoalDinilai: jumlahSoalDinilai_tp,
                        dataAtp
                    }
                })
                skor_cp = Number((total_cp/jumlahSoalDinilai_cp).toFixed(2))
                return {
                    ...branchCp,
                    total: total_cp,
                    skor:skor_cp,
                    jumlahSoalDinilai: jumlahSoalDinilai_cp,
                    dataTp
                }
            });
            skorMapel = Number((total_mapel/jumlahSoalDinilai_mapel).toFixed(2));
            // const {mapelName, kodeMapel, slotRow} = branchMapel
            return {
                ...branchMapel,
                skor: skorMapel,
                total: total_mapel,
                jumlahSoalDinilai: jumlahSoalDinilai_mapel,
                objekSkorKd,
                dataCp,
            } 
        })
        
        return {
            ...StrukturKurikulumPaketSoal,
            data:dataResult
        }
        
    }
}