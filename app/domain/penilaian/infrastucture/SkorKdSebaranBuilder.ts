import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import type { GroupBentukSoalPropertiKurikulumInPublikasiAssesmenWithScore, GroupSebaranNoSoalFromPropertyKurikulumWithScore, KoleksiBentukSoalDanPropertyKurikulumBasedBentukSoal } from "../model/grouping-kurikulum-by-bentuksoal";
import Decimal from "decimal.js";

export default class SkorKdSebaranBuilder{
    static build(
        StrukturKurikulumPaketSoal:KoleksiBentukSoalDanPropertyKurikulumBasedBentukSoal,
        sumberRespon:RisponsePenilaianSiswa[],
        sumnber_respon:string
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
                    // const dataAtp = branchTp.dataAtp.map(branchAtp=>{
                    const dataAtp = branchTp.dataAtp.filter(s=>s.atp_id !==0).map(branchAtp=>{
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

                                // totalATP+=skor;
                                // total_tp += skor;
                                // total_cp += skor;
                                // total_mapel+=skor
                                totalATP = Decimal.sum(totalATP, skor).toDecimalPlaces(0).toNumber();
                                total_tp = Decimal.sum(total_tp, skor).toDecimalPlaces(0).toNumber();
                                total_cp = Decimal.sum(total_cp, skor).toDecimalPlaces(0).toNumber();
                                total_mapel = Decimal.sum(total_mapel, skor).toDecimalPlaces(0).toNumber();

                                jumlahSoalDinilai_atp++;
                                jumlahSoalDinilai_tp++;
                                jumlahSoalDinilai_cp++
                                jumlahSoalDinilai_mapel++;

                                return {
                                    ...soal,
                                    skor,
                                }
                            })

                            return {
                                ...item,
                                data,
                                source:sumnber_respon
                            }
                        })
                        // SkorAtp = Number((totalATP/jumlahSoalDinilai_atp).toFixed(2));
                        SkorAtp = Decimal(totalATP).div(jumlahSoalDinilai_atp).toDecimalPlaces(2).toNumber();
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
                    // skorTp = Number((total_tp/jumlahSoalDinilai_tp).toFixed(2))
                    skorTp = Decimal(total_tp).div(jumlahSoalDinilai_tp).toDecimalPlaces(2).toNumber();
                    return {
                        ...branchTp,
                        skor:skorTp,
                        total:total_tp,
                        jumlahSoalDinilai: jumlahSoalDinilai_tp,
                        dataAtp
                    }
                })
                // skor_cp = Number((total_cp/jumlahSoalDinilai_cp).toFixed(2))
                skor_cp = Decimal(total_cp).div(jumlahSoalDinilai_cp).toDecimalPlaces(2).toNumber();
                return {
                    ...branchCp,
                    total: total_cp,
                    skor:skor_cp,
                    jumlahSoalDinilai: jumlahSoalDinilai_cp,
                    dataTp
                }
            });
            // skorMapel = Number((total_mapel/jumlahSoalDinilai_mapel).toFixed(2));
            // const {mapelName, kodeMapel, slotRow} = branchMapel
            skorMapel = Decimal(total_mapel).div(jumlahSoalDinilai_mapel).toDecimalPlaces(2).toNumber();
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