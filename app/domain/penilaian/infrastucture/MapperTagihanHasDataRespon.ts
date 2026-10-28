import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import type { TagihanHasDataResponse } from "../type/tagihan-assesmen-type";
import { getNumberFromString } from "~/lib/get-number";
import { currentTapelProperties } from "~/lib/current-tapel";
import type { DataTipeAssesmenMapper, MapelMapperInAllPublikasiPaket } from "../type/collection-kurikulum-in-all-publikasi/StrukturKurikulumMapper";
import type { RefrensiTabResponTagihanJenjangType } from "../type/collection-kurikulum-in-all-publikasi/RefrensiTabResponTagihanJenjangType";
import type { DataRefrensiPerBentukSoal } from "../type/collection-kurikulum-in-all-publikasi/DataRefrensiPerBentukSoal";
import type { DataSkorSiswaByInstrumenType } from "../type/collection-kurikulum-in-all-publikasi/DataSkorSiswaByInstrumenType";
import type { DataSoalNaskah } from "../type/collection-kurikulum-in-all-publikasi/DataSoalNaskah";
import type { DetailPublikasiWithResponSiswaType } from "../type/collection-kurikulum-in-all-publikasi/DetailPublikasiWithResponSiswaType";
import { ListBentukSoal } from "~/domain/bank-soal/list-bentuk-soal";
import { koleksiKategoriTagihanRaport } from "~/domain/kategori-tagihan/builder/KategoriTagihanRaportCollections";
import type { KategoriTagihanType } from "~/domain/kategori-tagihan/types/entities/KategoriTagihanType";
import type { MapperTagihanHasDataResponWithKategoriTagihan } from "./MapperTagihanHasDataResponWithKategoriTagihan";
import dtoTagihanAssesmenTypeFromTagihanHasDataRespon from "../struktur-tagihan-respon/infrastructure/dtoTagihanAssesmenTypeFromTagihanHasDataRespon";
// import { dtoTagihanAssesmenTypeFromTagihanHasDataRespon } from "../struktur-tagihan-respon/services/dtoTagihanAssesmenTypeFromTagihanHasDataRespon";


export default function MapperTagihanHasDataRespon(data:TagihanHasDataResponse[]):MapperTagihanHasDataResponWithKategoriTagihan{
    const koleksi = data.map(m=>({
                idbaris: m.idbaris,
                sebaran: m.sebaranNoSoalFromPropertyKurikulumWithScore,//m.sebaran_kurikulum_by_bentuk_soal,
                tipe_assesmen: m.tipe_assesmen,
                nama_publikasi: m.nama_publikasi,
                data_respons: m.data_respons,
                mapelNaskah: m.koleksi_mapelName.join(', '),
                koleksiMapel: m.koleksi_mapelName,
                data_response_bySiswa: m.data_response_bySiswa,
                currentTagihan:dtoTagihanAssesmenTypeFromTagihanHasDataRespon.fromTagihanHasDataResponse(m)
            }))
    
            const rombelAktif = getSessionRombel();
            const jenjang = getNumberFromString(rombelAktif);
            const semester = currentTapelProperties({variant:'getSemester', tgl:new Date()})
            const MapperTipeAssesmen:DataTipeAssesmenMapper = new Map();
            const KategoriTagihanRaport:KategoriTagihanType[] = koleksiKategoriTagihanRaport(jenjang, semester as number);
            KategoriTagihanRaport.forEach(kategori=>{
                MapperTipeAssesmen.set(kategori, []);
            })
            
            
        
            const mapMapel = new Map<string, MapelMapperInAllPublikasiPaket>()
            for(const item of koleksi){
                const {sebaran, idbaris, tipe_assesmen, nama_publikasi, data_respons, koleksiMapel, mapelNaskah,data_response_bySiswa, currentTagihan} = item;
                
                
    
                for(const mapel of sebaran.data){
                    const {mapelName, kodeMapel, dataCp, slotRow, total, skor, jumlahSoalDinilai} = mapel;
                    if(!mapMapel.has(kodeMapel)){
                        mapMapel.set(kodeMapel, {
                            kodeMapel,
                            mapelName,
                            koleksiPublikasiPaket: [],
                            dataCpMapper: new Map()
                        })
                    }
    
                    const currentMapel = mapMapel.get(kodeMapel);
                    currentMapel?.koleksiPublikasiPaket.push({idbaris, namaPublikasi:nama_publikasi,koleksiMapel, countRespon:data_respons.length})
                   
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
    
                                const dataResponSiswa2:DataSkorSiswaByInstrumenType[]= data_response_bySiswa.filter(s=>s.data.length> 0).map(mr=>{
                                    const {siswa, data} = mr;
                                    const lastDataSkor = data.at(-1);
                                    const key= kodeMapel+'_'+atp_id;
                                    
                                    const dataSumberPublikasiPaket=currentTagihan;
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
                                                        kunciJawabanPg:responJawaban?.bentuk_soal! === 'pg'? sk.jawaban.join(''):'',
                                                        dataPublikasi:lastDataSkor.publikasi
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
                                            rombel:siswa.nama_rombel,
                                            total,
                                            dataRefrensiTabResponTagihanJenjang,
                                            dataSumberPublikasiPaket,
                                            dataPerBentukSoal,
                                            countSoal,
                                            skor,
                                            skorKd
                                        }
    
                                    }
                                    return {
                                            siswa_id: siswa.id,
                                            namaSiswa:siswa.pd_nama,
                                            rombel:siswa.nama_rombel,
                                            total: 0,
                                            dataRefrensiTabResponTagihanJenjang:[],
                                            dataSumberPublikasiPaket,
                                            dataPerBentukSoal:[],
                                            countSoal: 0,
                                            skor:0,
                                            skorKd: {[key]:0}
                                        }
                                })                
                                              
                                const dataSoalNaskah:DataSoalNaskah[]  = dataBentukSoal.map(bs=>{
                                    const bentukSoal = ListBentukSoal.find(s=>s.name === bs.bentukSoal)!;
                                    const koleksiNoSoal = bs.data.map(noSoal=>noSoal.no_soal);
                                    const koleksiJawaban = bs.data.map(jwbn=>jwbn.bentuk_soal === 'pg'?jwbn.jawaban.join(''):'')
                                    return {
                                        bentukSoal,
                                        koleksiNoSoal,
                                        koleksiJawaban
                                    }
                                })
                                const countResponByPublikasi = data_respons.length;
                                const dataPublikasiPaket:DetailPublikasiWithResponSiswaType = {
                                    idbaris:idbaris,
                                    namaPublikasi: nama_publikasi,
                                    counstInstrumen: jumlahSoalDinilai,
                                    dataResponSiswa:dataResponSiswa2,
                                    dataSumberPublikasiPaket: [],
                                    atp_id,
                                    cp_id,
                                    tp_id,
                                    kodeMapel,
                                    mapelName,
                                    tp_description, 
                                    cp_description,
                                    atp_description,
                                    dataSoalNaskah,
                                    mapelNaskah,
                                    koleksiMapel,
                                    countResponByPublikasi
                                }
                                tipeAsesmen?.push(dataPublikasiPaket);
    
                                
                            }
    
                        }
                    }
                }
            }
    return { mapperKategoriTagihanPerAtpSkor: MapperTipeAssesmen, mapperStrukturKurikulum: mapMapel }
}
