import { ListBentukSoal } from "~/domain/bank-soal/list-bentuk-soal";
import type { CollactionMapelInAllPublikasiPaketType, DataRefrensiPerBentukSoal, DataSkorSiswaByInstrumenType, DataSoalNaskah, DataTipeAssesmenMapper, DetailPublikasiWithResponSiswaType, MapelMapperInAllPublikasiPaket, RefrensiTabResponTagihanJenjangType } from "../type/CountInstrumenSoalTiapAtpInPublikasiPaketType";
import type { TagihanHasDataResponse } from "../type/tagihan-assesmen-type";
import type { SebaranTagihanAssesmenKurikulumType } from "./sebaran-tagihan-kurikulum-class";


export default class CountInstrumenSoalTiapAtpInPublikasiPaket{
    // static build(data:TagihanHasDataResponse[]):SebaranTagihanAssesmenKurikulumType[]{
    static build(data:TagihanHasDataResponse[]):CollactionMapelInAllPublikasiPaketType[]{
        const koleksi = data.map(m=>({
            sebaran: m.sebaranNoSoalFromPropertyKurikulumWithScore,//m.sebaran_kurikulum_by_bentuk_soal,
            tipe_assesmen: m.tipe_assesmen,
            nama_publikasi: m.nama_publikasi,
            data_respons: m.data_respons,
            mapelNaskah: m.koleksi_mapelName.join(', '),
            data_response_bySiswa: m.data_response_bySiswa,
            currentTagihan:m
        }))


        const MapperTipeAssesmen:DataTipeAssesmenMapper = new Map();
        MapperTipeAssesmen.set('harian', []);
        MapperTipeAssesmen.set('mid_semester',[]);
        MapperTipeAssesmen.set('akhir_semester', []);
        MapperTipeAssesmen.set('remedial_pengayaan', [])
        MapperTipeAssesmen.set('ujian_sekolah', []);
        /**
         * 
        namaPublikasi:string,
       counstInstrumen: number,
       dataResponSiswa: DataSkorSiswaByInstrumenType[],
         */
    
        const mapMapel = new Map<string, MapelMapperInAllPublikasiPaket>()
        for(const item of koleksi){
            const {sebaran, tipe_assesmen, nama_publikasi, data_respons, mapelNaskah,data_response_bySiswa} = item;
            
            

            for(const mapel of sebaran.data){
                const {mapelName, kodeMapel, dataCp, slotRow, total, skor, jumlahSoalDinilai} = mapel;
                if(!mapMapel.has(kodeMapel)){
                    mapMapel.set(kodeMapel, {
                        kodeMapel,
                        mapelName,
                        
                        dataCpMapper: new Map()
                    })
                }

                const currentMapel = mapMapel.get(kodeMapel);

               
                const tipeAsesmen = MapperTipeAssesmen.get(tipe_assesmen);

                
                for(const cp of dataCp){
                    const {dataTp, cp_id, cp_description, total, skor, jumlahSoalDinilai} = cp;
                    if(!currentMapel?.dataCpMapper.has(cp_id)){
                        currentMapel?.dataCpMapper.set(cp_id, {
                            cp_id,
                            cp_description,
                            dataTpMapper: new Map()
                        })
                    }
                    
                    const currentCp = currentMapel?.dataCpMapper.get(cp_id);
                    
                    for(const tp of dataTp){
                        const {dataAtp, tp_id, tp_description, slotRow, total, skor, jumlahSoalDinilai} = tp;
                    
                        if(!currentCp?.dataTpMapper.has(tp_id)){
                            currentCp?.dataTpMapper.set(tp_id, {
                                tp_id,
                                tp_description, 
                                dataAtpMapper: new Map()
                            })
                        };

                        const currentTp = currentCp?.dataTpMapper.get(tp_id);
                        
                        for(const atp of dataAtp){
                            const {atp_id, atp_description, total, skor, jumlahSoalDinilai, dataBentukSoal} = atp;

                            if(!currentTp?.dataAtpMapper.has(atp_id)){
                                currentTp?.dataAtpMapper.set(atp_id, {
                                    atp_id,
                                    atp_description,
                                    // dataTipeAssesmenMapper: new Map()
                                })
                            };
                            const currentAtp = currentTp?.dataAtpMapper.get(atp_id);

                            const dataResponSiswa2:DataSkorSiswaByInstrumenType[]= data_response_bySiswa.filter(s=>s.data.length>0).map(mr=>{
                                const {siswa, data} = mr;
                                const lastDataSkor = data.at(-1);
                                const key= kodeMapel+'_'+atp_id
                                if(lastDataSkor){

                                    const dataRefrensiTabResponTagihanJenjang:RefrensiTabResponTagihanJenjangType[] = lastDataSkor.skorKdSebaran.data.flatMap(m=>m.dataCp.flatMap(cp=>cp.dataTp.flatMap(tp=>tp.dataAtp))).filter(s=>s.atp_id === atp_id).map(atp=>{
                                        return  atp.dataBentukSoal.map(m=>{
                                            return m.data.map(sk=>{
                                                const responJawaban = lastDataSkor.respon.find(s=>s.atp === sk.kd_id && s.no_prefix === sk.no_soal && s.bentuk_soal === sk.bentuk_soal)
                                                return {
                                                    responId: lastDataSkor.idbaris,
                                                    skor: sk.skor,
                                                    noSoal: sk.no_soal,
                                                    atp_id: sk.kd_id,
                                                    responJawaban: responJawaban?.respon ?? '',
                                                    bentukSoal: responJawaban?.bentuk_soal!,
                                                    kunciJawabanPg:responJawaban?.bentuk_soal! === 'pg'? sk.jawaban.join(''):''
                                                }
                                            })
                                        })
                                        
                                     }).flat(2);
                                    
                                    const dataPerBentukSoal:DataRefrensiPerBentukSoal[] = dataBentukSoal.map(m=>{
                                                    
                                                    const data:RefrensiTabResponTagihanJenjangType[]= dataRefrensiTabResponTagihanJenjang.filter(s=>s.bentukSoal === m.bentukSoal)
                                                    return {
                                                        bentukSoal: m.bentukSoal,
                                                        data
                                                    }
                                                });
                                    const countSoal = dataRefrensiTabResponTagihanJenjang.length;
                                    const total = dataRefrensiTabResponTagihanJenjang.length === 0? 0 : dataRefrensiTabResponTagihanJenjang.map(m=>Number(m.skor)).reduce((a,b)=>Number(a)+ Number(b));
                                    
                                    const skor = Number((total/countSoal).toFixed(2));
                                    const skorKd ={[key]: skor}
                                    return {
                                        siswa_id: siswa.id,
                                        namaSiswa:siswa.pd_nama,
                                        total,
                                        dataRefrensiTabResponTagihanJenjang,
                                        dataPerBentukSoal,
                                        countSoal,
                                        skor,
                                        skorKd
                                    }

                                }
                                return {
                                        siswa_id: siswa.id,
                                        namaSiswa:siswa.pd_nama,
                                        total: 0,
                                        dataRefrensiTabResponTagihanJenjang:[],
                                        dataPerBentukSoal:[],
                                        countSoal: 0,
                                        skor:0,
                                        skorKd: {[key]:0}
                                    }
                            })                
                                          
                            const dataSoalNaskah:DataSoalNaskah[]  = dataBentukSoal.map(bs=>{
                                const bentukSoal = ListBentukSoal.find(s=>s.name === bs.bentukSoal)!;
                                const koleksiNoSoal = bs.data.map(noSoal=>noSoal.no_soal);
                                return {
                                    bentukSoal,
                                    koleksiNoSoal
                                }
                            })

                            const dataPublikasiPaket:DetailPublikasiWithResponSiswaType = {
                                namaPublikasi: nama_publikasi,
                                counstInstrumen: jumlahSoalDinilai,
                                dataResponSiswa:dataResponSiswa2,
                                atp_id,
                                dataSoalNaskah,
                                mapelNaskah
                            }
                            tipeAsesmen?.push(dataPublikasiPaket);

                            
                        }

                    }
                }
            }
        }

        return [...mapMapel.values()].map(mapel=>{
            const {kodeMapel, mapelName, dataCpMapper}= mapel;
            let slotMapel:number = 0;
            const dataCp = [...dataCpMapper.values()].map(cp=>{
                const {cp_id, cp_description,dataTpMapper} = cp;
                let slotCp:number = 0
                const dataTp = [...dataTpMapper.values()].map(tp=>{
                    const {tp_id, tp_description, dataAtpMapper}= tp;
                    let slotTp:number = 0;
                    const dataAtp = [...dataAtpMapper.values()].map(atp=>{
                        const {atp_id, atp_description}=atp;
                        slotMapel++;
                        slotCp++;
                        slotTp++;
                        const dataTipeAssesmen = [...MapperTipeAssesmen.entries()].map(([tipe_assesmen, detailPublikasi])=>{
                            const DetailPublikasiWithResponSiswa = detailPublikasi.filter(s=>s.atp_id === atp_id)
                            return {
                                tipe_assesmen,
                                DetailPublikasiWithResponSiswa
                            }
                        })
                        return {
                            atp_id,
                            atp_description,
                            dataTipeAssesmen
                        }
                    })
                    return {
                        tp_id,
                        tp_description, 
                        slotRow: slotTp,
                        dataAtp,
                    }
                })
                return {
                    cp_id, 
                    cp_description, 
                    slotRow: slotCp,
                    dataTp
                }
            })
            return {
                kodeMapel,
                mapelName,
                slotRow:slotMapel,
                dataCp
            }
        })
    }
}

