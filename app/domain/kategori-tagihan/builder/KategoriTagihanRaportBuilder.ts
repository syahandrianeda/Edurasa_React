import type { TagihanHasDataResponse } from "../../penilaian/type/tagihan-assesmen-type";
import type { DataSkorSiswaByInstrumenType } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/DataSkorSiswaByInstrumenType";
import type { DetailPublikasiWithResponSiswaType } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/DetailPublikasiWithResponSiswaType";
import MapperTagihanHasDataRespon from "~/domain/penilaian/infrastucture/MapperTagihanHasDataRespon";
import type { KategoriTagihanHasManyResponSiswaType } from "../types/kategori-tagihan-hasMany-respon-siswa/KategoriTagihanHasManyResponSiswaType";
import type { CollectionNilaiMapel, DataResponSiswaTiapKategoriTagihan, RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan } from "../types";
import type { CollectionNilaiCp } from "../types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiCp";
import type { CollectionNilaiTp } from "../types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiTp";
import type { CollectionNilaiAtp } from "../types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiAtp";
import type { DataTipeAssesmenMapper, KoleksiPublikasiPaketPerMapel, MapelMapperInAllPublikasiPaket } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/StrukturKurikulumMapper";
import type { SkorKdNullableType } from "~/domain/penilaian/type/SkorKdType";
import type { StrukturAtpType, StrukturCpType, StrukturTpType } from "~/domain/trees-struktur-kurikulum";


export default class KategoriTagihanRaportBuilder{
    /**
     * Class ini bertugas untuk mem-build seluruh data skor pada seluruh data respon yang telah dipublikasikan.
     * 'data respon' didapat dari 'publikasi_paket' dimana siswa mengirimkan respon.
     * setiap publikasi_paket mengirimkan informasi (terdapat informasi) struktur kurikulumnya. Seperti mapel, cp, tp, atp.
     * setiap publikasi_paket dilakukan mapping untuk mendapatkan mapel, cp, tp, atp secara keseluruhan. lalu digabungkan. Mapping ini dilakukan
     * di class 'TagihanPenilaianClass` saat membuild data dengan type 'TagihanHasDataResponse`; Method yang mengerjakan mapping ini
     * terdapat pada method 'colectionCountInstrumenSoalTiapAtpInPublikasiPaket'.
     * Sayangnya, tipe data `colectionCountInstrumenSoalTiapAtpInPublikasiPaket` tersebut, melibatkan mapel yang tidak dikenal. Penyebabnya
     * adalah sumber paket_soal yang tidak valid lolos dipublikasikan.
     * 
     * Method ini harus dilakukan setelah men-sanitize class `PenilaianTagihanClass` pada mapel yang berlaku untuk tiap jenjangnya.
     * Mapel yang berlaku ditetapkan pada fitur `kurikulum', dan subfitur. mapel;
     * 
     * Tugas membuild ini berarti mengolah data sheet dari tab `harian`, 'mid_semester', 'akhir_semester'
     */

    /**
     * @deprecated | gunakan method **buildFromMapper** dengan parameter bertype **Mapper** (dari new Map)
     * @param data :TagihanHasDataResponse
     * @returns 
     */
    static build(data:TagihanHasDataResponse[]):KategoriTagihanHasManyResponSiswaType[]{
         const {mapperKategoriTagihanPerAtpSkor, mapperStrukturKurikulum} = MapperTagihanHasDataRespon(data);
        //  console.log({mapperKategoriTagihanPerAtpSkor,mapperStrukturKurikulum});
         const koleksiAtpInMapel:RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan[] = [...mapperStrukturKurikulum.values()].map(mapel=>{
                const {dataCpMapper} = mapel
                const collection_Cp:StrukturCpType[] = [];
                const collection_Tp:StrukturTpType[] = [];
                const collection_Atp:StrukturAtpType[] = [];
                [...dataCpMapper.values()].forEach(cp=>{
                    const {dataTpMapper, cp_description, cp_id} = cp;
                    collection_Cp.push({cp_description, cp_id});
                    [...dataTpMapper.values()].forEach(tp=>{
                        const {tp_description, tp_id, dataAtpMapper} = tp;
                        collection_Tp.push({tp_id, tp_description});
                        [...dataAtpMapper.values()].forEach(atp=>{
                            const {atp_description, atp_id}=atp
                            collection_Atp.push({atp_id, atp_description})
                        })
                    })
                });
                return{
                    kodeMapel:mapel.kodeMapel,
                    collection_Atp,
                    collection_Cp,
                    collection_Tp

                }
            })
         return [...mapperKategoriTagihanPerAtpSkor.entries()].map(([tipe_assesmen, tagihanPerAtp])=>{
             const siswaMap = new Map<number, Map<number, DetailPublikasiWithResponSiswaType[]>>();
             
             const koleksiPublikasiPaketMapper = new Map<number, KoleksiPublikasiPaketPerMapel>()
            
            tagihanPerAtp.forEach(tagihanAtp=>{
                
                const {kodeMapel, cp_id, tp_id, atp_id, dataResponSiswa,idbaris, namaPublikasi,koleksiMapel,countResponByPublikasi} = tagihanAtp;
                if(!koleksiPublikasiPaketMapper.has(idbaris)){
                    koleksiPublikasiPaketMapper.set(idbaris, {idbaris, namaPublikasi,koleksiMapel, countRespon:countResponByPublikasi})
                }
                for(const responSiswa of dataResponSiswa){
                    if(!siswaMap.has(responSiswa.siswa_id)){
                        siswaMap.set(responSiswa.siswa_id, new Map())
                    }
                    const currentSiswa = siswaMap.get(responSiswa.siswa_id);
                    if(!currentSiswa?.has(atp_id)){
                        currentSiswa?.set(atp_id, [])
                    }
                    const dataResponCurrentSiswa = dataResponSiswa.filter(s=>s.siswa_id === responSiswa.siswa_id)
                    const tagihanCurrentSiswa = {...tagihanAtp, dataResponSiswa:dataResponCurrentSiswa}
                    // currentSiswa?.get(atp_id)?.push(tagihanAtp)
                    currentSiswa?.get(atp_id)?.push(tagihanCurrentSiswa)
                }


            });
            const koleksiPaketSoal= [...koleksiPublikasiPaketMapper.values()];
           
            const data:DataResponSiswaTiapKategoriTagihan[]=[]
            for(const [idSiswa, mapAtp] of siswaMap.entries()){
                const obData:DataResponSiswaTiapKategoriTagihan = Object.create(null);
                const koleksiMapel:CollectionNilaiMapel[] = [];
                
                for(const [keyMapel, struktur] of mapperStrukturKurikulum.entries()){
                    const sumberPaketSoal:KoleksiPublikasiPaketPerMapel[] = koleksiPaketSoal.filter(s=>s.koleksiMapel.includes(struktur.mapelName))
                    const obMapel:CollectionNilaiMapel = Object.create(null);
                    obMapel.kodeMapel = keyMapel;
                    obMapel.mapelName = struktur.mapelName;
                    obMapel.sumberPaketSoal = sumberPaketSoal;
                    let totalMapel:number|null = null;
                    let countSoalMapel:number|null = null;

                    const koleksiCp:CollectionNilaiCp[] = [];
                    const koleksiCpId: number[] = [...struktur.dataCpMapper.keys()];
                    const koleksiTpId: number[]=[];
                    const koleksiAtpId: number[]=[];

                    
                    const obSkorKdTpNullable:SkorKdNullableType = Object.create(null);
                    const obSkorKdCpNullable:SkorKdNullableType = Object.create(null);
                    const obSkorKdAtpNullable:SkorKdNullableType = Object.create(null);
                    
                    for(const [cpId, dataCp] of struktur.dataCpMapper.entries()) {
                        const obCp:CollectionNilaiCp = Object.create(null);
                        obCp.cp_id = cpId;
                        obCp.cp_description= dataCp.cp_description;
                        let totalCp:number|null = null;
                        let countSoalCp:number|null = null;

                        const koleksiTp:CollectionNilaiTp[] = [];
                        const currentKoleksiTpId = [...dataCp.dataTpMapper.keys()];
                        koleksiTpId.push(...currentKoleksiTpId)
                        for(const [tpId, dataTp] of dataCp.dataTpMapper.entries()){
                            const obTp:CollectionNilaiTp = Object.create(null);
                            obTp.tp_id = tpId;
                            obTp.tp_description = dataTp.tp_description
                            
                            let skorTp:number|null = null;
                            let totalTp:number|null = null;
                            let countSoalTp:number|null = null

                            const koleksiAtp:CollectionNilaiAtp[] = [];
                            
                            const currentKoleksiAtpId = [...dataTp.dataAtpMapper.keys()];
                            koleksiAtpId.push(...currentKoleksiAtpId)
                            for(const [atpId, dataAtp] of dataTp.dataAtpMapper.entries()){
                                const obAtp:CollectionNilaiAtp = Object.create(null);
                                const detailResponMapper = mapAtp.get(atpId);
                                obAtp.atp_id= atpId;
                                obAtp.atp_description = dataAtp.atp_description
                                // obAtp.skorAtp = 0;
                                
                                // obAtp.totalAtp = 0;
                                // obAtp.countSoalAtp = 0;

                                let skorAtp:number|null = null;
                                let totalAtp:number|null = null;
                                let countSoal:number|null = null;
                                const sourceTabTagihanResponJenjang:DataSkorSiswaByInstrumenType[]=[]
                                if(detailResponMapper){
                                    for(const itemDetailRespon of detailResponMapper){
                                        const {dataResponSiswa} = itemDetailRespon;
                                        dataResponSiswa.forEach(dataPublikasiWithRespon=>{
                                            skorAtp = (skorAtp ?? 0) + dataPublikasiWithRespon.skor;
                                            totalAtp = (totalAtp ?? 0) + dataPublikasiWithRespon.total;
                                            countSoal = (countSoal ?? 0) + dataPublikasiWithRespon.countSoal; 
                                        })
                                        if(dataResponSiswa.length > 0) sourceTabTagihanResponJenjang.push(...dataResponSiswa)

                                    }
                                     
                                };

                                if (totalAtp !== null){
                                    totalTp = (totalTp ?? 0) + totalAtp;
                                    totalCp = (totalCp ?? 0) + totalAtp;
                                    totalMapel = (totalMapel ?? 0) + totalAtp;
                                };

                                if (countSoal !== null){
                                     countSoalTp = (countSoalTp ?? 0) + countSoal;
                                     countSoalCp = (countSoalCp ?? 0) + countSoal;
                                     countSoalMapel = (countSoalMapel ?? 0) + countSoal;
                                    };

                                if(countSoal && totalAtp){
                                    const reSkorAtp = Number((totalAtp/countSoal).toFixed(2))
                                    obAtp.skorAtp= reSkorAtp;
                                    obSkorKdAtpNullable[keyMapel+'_'+atpId] = reSkorAtp;
                                }

                                obAtp.totalAtp=totalAtp;
                                obAtp.countSoalAtp=countSoal;

                                obAtp.detail = sourceTabTagihanResponJenjang;
                                koleksiAtp.push(obAtp)

                            }
                            obTp.koleksiAtp = koleksiAtp;

                            if(totalTp && countSoalTp){
                                const skoring = Number((totalTp/countSoalTp).toFixed(2));
                                obTp.skorTp = skoring;//Number((totalTp/countSoalTp).toFixed(2));
                                obSkorKdTpNullable[keyMapel+'_'+tpId] = skoring;
                            }
                            obTp.totalTp = totalTp;
                            obTp.countSoalTp = countSoalTp;

                            koleksiTp.push(obTp);
                        }
                        obCp.koleksiTp = koleksiTp;

                        if(totalCp && countSoalCp){
                            const skoring = Number((totalCp/countSoalCp).toFixed(2));
                            obCp.skorCp = skoring;
                            obSkorKdCpNullable[keyMapel+'_'+cpId] = skoring;
                        }
                        obCp.totalCp = totalCp;
                        obCp.countSoalCp = countSoalCp;

                        koleksiCp.push(obCp);
                    }
                    obMapel.collection_cp_id = koleksiCpId;
                    obMapel.collection_tp_id = koleksiTpId;
                    obMapel.collection_atp_id = koleksiAtpId;
                    obMapel.skorKd_atp = Object.keys(obSkorKdAtpNullable).length===0? undefined:obSkorKdAtpNullable;
                    obMapel.skorKd_cp = Object.keys(obSkorKdCpNullable).length === 0? undefined:obSkorKdCpNullable;
                    obMapel.skorKd_tp = Object.keys(obSkorKdTpNullable).length===0? undefined: obSkorKdTpNullable;
                    obMapel.dataCp = koleksiCp
                    if(totalMapel && countSoalMapel){
                        obMapel.skorMapel = Number((totalMapel/countSoalMapel).toFixed(2));

                    }
                    obMapel.totalMapel = totalMapel;
                    obMapel.countSoalMapel = countSoalMapel;
                    koleksiMapel.push(obMapel);
                }
                obData.mapel = koleksiMapel;
                // const koleksiAtpInCurrentMapel = koleksiMapel.map(m=>(koleksiAtpInMapel.find(koleksi=>koleksi.kodeMapel === m.kodeMapel)??[]) as RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan);
                // obData.koleksiAtpInMapel = koleksiMapel.map(m=>koleksiAtpInMapel.find(koleksi=>koleksi.kodeMapel === m.kodeMapel)!);
                obData.koleksiAtpInMapel = koleksiAtpInMapel
            
                obData.idSiswa = idSiswa,
                

                data.push(obData)
            }
            return {
                type:tipe_assesmen,
                data,
                koleksiPaketSoal,
                koleksiAtpInMapel
            }
         })
         
    }
    static buildFromMapper(mapperKategoriTagihanPerAtpSkor:DataTipeAssesmenMapper,mapperStrukturKurikulum:Map<string, MapelMapperInAllPublikasiPaket>):KategoriTagihanHasManyResponSiswaType[]{
        //  const {mapperKategoriTagihanPerAtpSkor, mapperStrukturKurikulum} = MapperTagihanHasDataRespon(data);
        //  console.log({mapperKategoriTagihanPerAtpSkor,mapperStrukturKurikulum});
          const koleksiAtpInMapel:RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan[] = [...mapperStrukturKurikulum.values()].map(mapel=>{
                const {dataCpMapper} = mapel
                const collection_Cp:StrukturCpType[] = [];
                const collection_Tp:StrukturTpType[] = [];
                const collection_Atp:StrukturAtpType[] = [];
                [...dataCpMapper.values()].forEach(cp=>{
                    const {dataTpMapper, cp_description, cp_id} = cp;
                    collection_Cp.push({cp_description, cp_id});
                    [...dataTpMapper.values()].forEach(tp=>{
                        const {tp_description, tp_id, dataAtpMapper} = tp;
                        collection_Tp.push({tp_id, tp_description});
                        [...dataAtpMapper.values()].forEach(atp=>{
                            const {atp_description, atp_id}=atp
                            collection_Atp.push({atp_id, atp_description})
                        })
                    })
                });
                return{
                    kodeMapel:mapel.kodeMapel,
                    collection_Atp,
                    collection_Cp,
                    collection_Tp

                }
            })
         return [...mapperKategoriTagihanPerAtpSkor.entries()].map(([tipe_assesmen, tagihanPerAtp])=>{
             const siswaMap = new Map<number, Map<number, DetailPublikasiWithResponSiswaType[]>>();
             
             const koleksiPublikasiPaketMapper = new Map<number, KoleksiPublikasiPaketPerMapel>()
            
            tagihanPerAtp.forEach(tagihanAtp=>{
                
                const {kodeMapel, cp_id, tp_id, atp_id, dataResponSiswa,idbaris, namaPublikasi,koleksiMapel,countResponByPublikasi} = tagihanAtp;
                if(!koleksiPublikasiPaketMapper.has(idbaris)){
                    koleksiPublikasiPaketMapper.set(idbaris, {idbaris, namaPublikasi,koleksiMapel, countRespon:countResponByPublikasi})
                }
                for(const responSiswa of dataResponSiswa){
                    if(!siswaMap.has(responSiswa.siswa_id)){
                        siswaMap.set(responSiswa.siswa_id, new Map())
                    }
                    const currentSiswa = siswaMap.get(responSiswa.siswa_id);
                    if(!currentSiswa?.has(atp_id)){
                        currentSiswa?.set(atp_id, [])
                    }
                    const dataResponCurrentSiswa = dataResponSiswa.filter(s=>s.siswa_id === responSiswa.siswa_id)
                    const tagihanCurrentSiswa = {...tagihanAtp, dataResponSiswa:dataResponCurrentSiswa}
                    // currentSiswa?.get(atp_id)?.push(tagihanAtp)
                    currentSiswa?.get(atp_id)?.push(tagihanCurrentSiswa)
                }


            });
            const koleksiPaketSoal= [...koleksiPublikasiPaketMapper.values()];
           
            const data:DataResponSiswaTiapKategoriTagihan[]=[]
            for(const [idSiswa, mapAtp] of siswaMap.entries()){
                const obData:DataResponSiswaTiapKategoriTagihan = Object.create(null);
                const koleksiMapel:CollectionNilaiMapel[] = [];
                
                for(const [keyMapel, struktur] of mapperStrukturKurikulum.entries()){
                    const sumberPaketSoal:KoleksiPublikasiPaketPerMapel[] = koleksiPaketSoal.filter(s=>s.koleksiMapel.includes(struktur.mapelName))
                    const obMapel:CollectionNilaiMapel = Object.create(null);
                    obMapel.kodeMapel = keyMapel;
                    obMapel.mapelName = struktur.mapelName;
                    obMapel.sumberPaketSoal = sumberPaketSoal;
                    let totalMapel:number|null = null;
                    let countSoalMapel:number|null = null;

                    const koleksiCp:CollectionNilaiCp[] = [];
                    const koleksiCpId: number[] = [...struktur.dataCpMapper.keys()];
                    const koleksiTpId: number[]=[];
                    const koleksiAtpId: number[]=[];

                    
                    const obSkorKdTpNullable:SkorKdNullableType = Object.create(null);
                    const obSkorKdCpNullable:SkorKdNullableType = Object.create(null);
                    const obSkorKdAtpNullable:SkorKdNullableType = Object.create(null);
                    
                    for(const [cpId, dataCp] of struktur.dataCpMapper.entries()) {
                        const obCp:CollectionNilaiCp = Object.create(null);
                        obCp.cp_id = cpId;
                        obCp.cp_description= dataCp.cp_description;
                        let totalCp:number|null = null;
                        let countSoalCp:number|null = null;

                        const koleksiTp:CollectionNilaiTp[] = [];
                        const currentKoleksiTpId = [...dataCp.dataTpMapper.keys()];
                        koleksiTpId.push(...currentKoleksiTpId)
                        for(const [tpId, dataTp] of dataCp.dataTpMapper.entries()){
                            const obTp:CollectionNilaiTp = Object.create(null);
                            obTp.tp_id = tpId;
                            obTp.tp_description = dataTp.tp_description
                            
                            let skorTp:number|null = null;
                            let totalTp:number|null = null;
                            let countSoalTp:number|null = null

                            const koleksiAtp:CollectionNilaiAtp[] = [];
                            
                            const currentKoleksiAtpId = [...dataTp.dataAtpMapper.keys()];
                            koleksiAtpId.push(...currentKoleksiAtpId)
                            for(const [atpId, dataAtp] of dataTp.dataAtpMapper.entries()){
                                const obAtp:CollectionNilaiAtp = Object.create(null);
                                const detailResponMapper = mapAtp.get(atpId);
                                obAtp.atp_id= atpId;
                                obAtp.atp_description = dataAtp.atp_description
                                // obAtp.skorAtp = 0;
                                
                                // obAtp.totalAtp = 0;
                                // obAtp.countSoalAtp = 0;

                                let skorAtp:number|null = null;
                                let totalAtp:number|null = null;
                                let countSoal:number|null = null;
                                const sourceTabTagihanResponJenjang:DataSkorSiswaByInstrumenType[]=[]
                                if(detailResponMapper){
                                    for(const itemDetailRespon of detailResponMapper){
                                        const {dataResponSiswa} = itemDetailRespon;
                                        dataResponSiswa.forEach(dataPublikasiWithRespon=>{
                                            skorAtp = (skorAtp ?? 0) + dataPublikasiWithRespon.skor;
                                            totalAtp = (totalAtp ?? 0) + dataPublikasiWithRespon.total;
                                            countSoal = (countSoal ?? 0) + dataPublikasiWithRespon.countSoal; 
                                        })
                                        if(dataResponSiswa.length > 0) sourceTabTagihanResponJenjang.push(...dataResponSiswa)

                                    }
                                     
                                };

                                if (totalAtp !== null){
                                    totalTp = (totalTp ?? 0) + totalAtp;
                                    totalCp = (totalCp ?? 0) + totalAtp;
                                    totalMapel = (totalMapel ?? 0) + totalAtp;
                                };

                                if (countSoal !== null){
                                     countSoalTp = (countSoalTp ?? 0) + countSoal;
                                     countSoalCp = (countSoalCp ?? 0) + countSoal;
                                     countSoalMapel = (countSoalMapel ?? 0) + countSoal;
                                    };

                                    obSkorKdAtpNullable[keyMapel+'_'+atpId] = 0;
                                if(countSoal && totalAtp){
                                    const reSkorAtp = Number((totalAtp/countSoal).toFixed(2))
                                    obAtp.skorAtp= reSkorAtp;
                                    obSkorKdAtpNullable[keyMapel+'_'+atpId] = reSkorAtp;
                                }

                                obAtp.totalAtp=totalAtp;
                                obAtp.countSoalAtp=countSoal;

                                obAtp.detail = sourceTabTagihanResponJenjang;
                                koleksiAtp.push(obAtp)

                            }
                            obTp.koleksiAtp = koleksiAtp;
                            obSkorKdTpNullable[keyMapel+'_'+tpId] = 0
                            if(totalTp && countSoalTp){
                                const skoring = Number((totalTp/countSoalTp).toFixed(2));
                                obTp.skorTp = skoring;//Number((totalTp/countSoalTp).toFixed(2));
                                obSkorKdTpNullable[keyMapel+'_'+tpId] = skoring;
                            }
                            obTp.totalTp = totalTp;
                            obTp.countSoalTp = countSoalTp;

                            koleksiTp.push(obTp);
                        }
                        obCp.koleksiTp = koleksiTp;
                        
                        obSkorKdCpNullable[keyMapel+'_'+cpId] = 0;
                        if(totalCp && countSoalCp){
                            const skoring = Number((totalCp/countSoalCp).toFixed(2));
                            obCp.skorCp = skoring;
                            obSkorKdCpNullable[keyMapel+'_'+cpId] = skoring;
                        }
                        obCp.totalCp = totalCp;
                        obCp.countSoalCp = countSoalCp;

                        koleksiCp.push(obCp);
                    }
                    obMapel.collection_cp_id = koleksiCpId;
                    obMapel.collection_tp_id = koleksiTpId;
                    obMapel.collection_atp_id = koleksiAtpId;
                    obMapel.skorKd_atp = Object.keys(obSkorKdAtpNullable).length===0? undefined:obSkorKdAtpNullable;
                    obMapel.skorKd_cp = Object.keys(obSkorKdCpNullable).length === 0? undefined:obSkorKdCpNullable;
                    obMapel.skorKd_tp = Object.keys(obSkorKdTpNullable).length===0? undefined: obSkorKdTpNullable;
                    obMapel.dataCp = koleksiCp
                    if(totalMapel && countSoalMapel){
                        obMapel.skorMapel = Number((totalMapel/countSoalMapel).toFixed(2));

                    }
                    obMapel.totalMapel = totalMapel;
                    obMapel.countSoalMapel = countSoalMapel;
                    koleksiMapel.push(obMapel);
                }
                obData.mapel = koleksiMapel;
                // const koleksiAtpInCurrentMapel = koleksiMapel.map(m=>(koleksiAtpInMapel.find(koleksi=>koleksi.kodeMapel === m.kodeMapel)??[]) as RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan);
                obData.koleksiAtpInMapel = koleksiMapel.map(m=>koleksiAtpInMapel.find(koleksi=>koleksi.kodeMapel === m.kodeMapel)!);
            
                obData.idSiswa = idSiswa,
                

                data.push(obData)
            }
            return {
                type:tipe_assesmen,
                data,
                koleksiPaketSoal,
                koleksiAtpInMapel
            }
         })
         
    }
   
}