import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import type { Data_response_bySiswaType } from "../penilaian/type/Data_response_bySiswaType";
import type { KelompokAtasBawah } from "./KelompokAtasBawah";
import { ListBentukSoal } from "../bank-soal/list-bentuk-soal";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { DataSumberResult, SumberData, JenisKelompokResponden, StrukturDataSoalSummary } from "./DataSumberResult";

export default class DataSumberResponBuilder{
    private static readonly PROPORSI_KELOMPOK = 0.3;
    /**
     * 
     * @param data adalah data_sebaran diambil dari tagihan property `data_response_bySiswa`
     */
    static build(data:Data_response_bySiswaType[]):DataSumberResult[]{
        // const result:DataSumberResult[]=[];
       
        const resultTemp:SumberData[]=this.buildSumberDataTemp(data);
        const tinggiRendah = this.generateKelompok(resultTemp);
        

        return  resultTemp.map(m=> {
            const dataFinal = m.data.map(r=>{
                return {
                    listBentukSoal: r.bentukSoal,
                    respon: r.collectionRisponse,
                }
            });
            const strukturSummarySoal:StrukturDataSoalSummary[] = dataFinal.map(ff=>({...ff, responCount:ff.respon.length}))
            const totalScore = m.totalScore;
            const isCorrecting = m.isCorrecting
            let namakelomppok:KelompokAtasBawah = m.kelompok;
            if(tinggiRendah.tinggi.has(m.siswa.id)){
                namakelomppok = 'atas'
            }
            if(tinggiRendah.rendah.has(m.siswa.id)){
                namakelomppok= 'bawah';
            }
            
            return {
                siswa: m.siswa,
                data:dataFinal,
                kelompokSiswa:namakelomppok,
                totalScore,
                isCorrecting,
                strukturSummarySoal
            }
            });
            // .sort((a, b) => {
            //         const namaA = a?.siswa?.pd_nama?.trim() ?? "";
            //         const namaB = b?.siswa?.pd_nama?.trim() ?? "";

            //         // taruh nama kosong di bawah
            //         if (!namaA && !namaB) return 0;
            //         if (!namaA) return 1;
            //         if (!namaB) return -1;

            //         return namaA.localeCompare(namaB, "id", { sensitivity: "base" });
            //         });
        
        
    }
    
    private static buildSumberDataTemp(data:Data_response_bySiswaType[]):SumberData[]{
        const resultTemp:SumberData[]=[];
        /** data_response_bySiswa difilter berdasarkan jumlah data > 0 */
        const hadDataCollection = data.filter(s=>s.data.length>0);

        
        for(const {data, siswa} of hadDataCollection){
            
            const lastData = data.at(-1);
            let totalScore:number=0
            const mappingBentukSoal = new Map<string, {bentukSoal:ListBentukSoalType, data:RisponsePenilaianSiswa[]}>();
            if(lastData){
                for(const r of lastData.respon){
                    /** property pada r (respon) */
                    const bentuk_soal = r.bentuk_soal;
                    const skor = r.skor ?? 0;
                    if(!mappingBentukSoal.has(bentuk_soal)){
                        const found = ListBentukSoal.find(s=>s.name === bentuk_soal)!
                        mappingBentukSoal.set(bentuk_soal, {
                            bentukSoal:found,
                            data:[]
                        });

                    };

                    const currentBentukSoal = mappingBentukSoal.get(bentuk_soal)!;
                    // currentBentukSoal.
                    totalScore += skor;
                    currentBentukSoal.data.push(r);

                    // if(!bentukSoalCollection.has(bentuk_soal)){
                    //     const found = ListBentukSoal.find(s=>s.name === bentuk_soal)!
                    //     bentukSoalCollection.set(bentuk_soal, found)
                    // }
                }
            }
            const dataMaping = [...mappingBentukSoal.values()].map(({bentukSoal, data})=>({ bentukSoal, collectionRisponse:data}))
            const isCorrecting = lastData?.sumber_respon === 'guru';
            // const strukturSummarySoal:StrukturDataSoalSummary[]=dataMaping.map((struktur)=>({listBentukSoal:struktur.bentukSoal, responCount:struktur.collectionRisponse.length}))
            resultTemp.push({
                siswa,
                data: dataMaping,
                totalScore,
                kelompok:'tengah', 
                isCorrecting,
                // strukturSummarySoal
            })
        }
        return resultTemp;
    }
    
    private static generateKelompok(data:SumberData[]):JenisKelompokResponden{
        const jumlahResponden = data.length;
        if(jumlahResponden=== 0){
            return {
                tinggi: new Map(), 
                rendah: new Map()
            }
        }

        const sortedByTotalScore = data.sort((a, b)=>b.totalScore - a.totalScore);
        const batasKelommpokTinggi = Math.max(1, Math.floor(jumlahResponden * this.PROPORSI_KELOMPOK))
        const tinggi = new Map(sortedByTotalScore.slice(0, batasKelommpokTinggi).map(m=>([m.siswa.id, m])));
        const rendah = new Map(sortedByTotalScore.slice(Math.max( 0, data.length - batasKelommpokTinggi )).map(m=>([m.siswa.id, m])));
        
        return { tinggi, rendah}
    }
    private static isValidBentukSoal(bentukSoal:ListBentukSoalType['name']){
        const foundValid = ListBentukSoal.find(s=>s.name === bentukSoal);
        if(foundValid) return true;
        return false;
            
    }
}