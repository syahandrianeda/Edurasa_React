import type { jp_mapelApp } from "~/types/mapel/jp_mapel";
import type { DataSiswaBasedMapelInResponAllKategoriTagihanInterface } from "../types/kategori-tagihan-hasMany-respon-siswa/DataSiswaBasedMapelInResponAllKategoriTagihanInterface";
import type { CollectionNilaiMapel, DataResponSiswaTiapKategoriTagihan, KategoriTagihanHasManyResponSiswaType, RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan } from "../types";
import type { KategoriTagihanHasManyPesertaMapelType } from "../types/kategori-tagihan-hasMany-respon-siswa/KategoriTagihanHasManyPesertaMapelType";
import { dataSiswaInMapel } from "~/domain/penilaian/infrastucture/DataSiswaPerMapel";
import type { DataSiswaHasMapelType } from "~/domain/penilaian/infrastucture/dataSiswaHasMapel";
import type { KoleksiMapelBasedSiswaInResponAllKategoriTagihan } from "../types/kategori-tagihan-hasMany-respon-siswa/KoleksiMapelBasedSiswaInResponAllKategoriTagihan";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { getNumberFromString } from "~/lib/get-number";
import { currentTapelProperties } from "~/lib/current-tapel";
import { koleksiKategoriTagihanRaport } from "./KategoriTagihanRaportCollections";
import type { DataTipeAssesmenMapper, KoleksiPublikasiPaketPerMapel, MapelMapperInAllPublikasiPaket } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/StrukturKurikulumMapper";
import type { DetailPublikasiWithResponSiswaType } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/DetailPublikasiWithResponSiswaType";
import type { DataSkorSiswaByInstrumenType } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/DataSkorSiswaByInstrumenType";
import type { RefrensiTabResponTagihanJenjangType } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/RefrensiTabResponTagihanJenjangType";
import type { StrukturAtpType, StrukturCpType, StrukturMapeltype, StrukturTpType } from "~/domain/trees-struktur-kurikulum";
import type { KategoriTagihanType } from "../types/entities/KategoriTagihanType";
import type { SiswaType } from "~/types/siswa";
import type { CollectionNilaiCp } from "../types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiCp";

export default class  KategoriTagihanHasManyPesertaMapelBuillder{
    
    static build(
        mapperKategoriTagihanPerAtpSkor:DataTipeAssesmenMapper,
        mapperStrukturKurikulum:Map<string, MapelMapperInAllPublikasiPaket>, 
        dataSiswaHasMapel:DataSiswaHasMapelType[], 
        koleksiKodeMapel:string[]
    ): KategoriTagihanHasManyPesertaMapelType[]{
        const rombelAktif = getSessionRombel();
        const jenjang = getNumberFromString(rombelAktif);
        const semester = currentTapelProperties({variant:'getSemester', tgl:new Date()})
        const type_tagihan = koleksiKategoriTagihanRaport(jenjang, semester as number);
        
        /** Mapper Helper */
        // const mapperStrukturKurikulumInCurrentTypeAssesmen = new Map<string, MapelMapperInAllPublikasiPaket>
        type DetailPublikasiWithResponSiswaMapperType = Map<number, { 
                                                            detail:DetailPublikasiWithResponSiswaType, 
                                                            mapperResponSiswa: Map<number, {
                                                                detailResponSiswa:DataSkorSiswaByInstrumenType, 
                                                                maperAtpInPublikasi:Map<number, RefrensiTabResponTagihanJenjangType[]>
                                                            } >,
                                                            strukturMapel: Map<string, MapelMapperInAllPublikasiPaket>
                                                    }>;
        type mapperResponSiswaInAllResponsType = Map<number, {
                                    detailResponSiswa:DataSkorSiswaByInstrumenType, 
                                    maperAtpInPublikasi:Map<number, RefrensiTabResponTagihanJenjangType[]>
                                }>
        const newTypeTagihanMapper = new Map<KategoriTagihanType, {
            detailPublikasiMapper: DetailPublikasiWithResponSiswaMapperType, 
            mapelMapper:Map<string, MapelMapperInAllPublikasiPaket>}>()
        for(const [type, dataPublikasi] of [...mapperKategoriTagihanPerAtpSkor.entries()]){
            const newMapperTagihan = new Map<string, {detailMapper:DetailPublikasiWithResponSiswaMapperType}>()
            const mapperStrukturKurikulumInCurrentTypeAssesmen = new Map<string, MapelMapperInAllPublikasiPaket>

            const DetailPublikasiWithResponSiswaMapper:DetailPublikasiWithResponSiswaMapperType= new Map();
            /** 
             * responSiswa tiap publikasi itu berbeda-beda. Tidak semua siswa menjawab/merespon tagihan yang dipublikasikan
             * */
            const mapperResponSiswaInAllRespons:mapperResponSiswaInAllResponsType = new Map();
            
            for(const itemDataPubliasi of dataPublikasi){

                const {idbaris, mapelName, namaPublikasi,koleksiMapel,countResponByPublikasi, kodeMapel, cp_id, cp_description, tp_id, tp_description, atp_id, atp_description,
                     dataResponSiswa, ...otherItemPublikasi} = itemDataPubliasi;
                
                if(!mapperStrukturKurikulumInCurrentTypeAssesmen.has(kodeMapel)){
                    mapperStrukturKurikulumInCurrentTypeAssesmen.set(kodeMapel, {
                        kodeMapel, 
                        mapelName,
                        dataCpMapper: new Map(),
                        koleksiPublikasiPaket:[]
                    })
                }
                const cpMapperCurrentTypeAssesmen = mapperStrukturKurikulumInCurrentTypeAssesmen.get(kodeMapel);
                cpMapperCurrentTypeAssesmen?.koleksiPublikasiPaket.push({
                        idbaris, 
                        namaPublikasi,
                        koleksiMapel: koleksiMapel,
                        countRespon:countResponByPublikasi,
                })
                if(!cpMapperCurrentTypeAssesmen?.dataCpMapper.has(cp_id)){
                    cpMapperCurrentTypeAssesmen?.dataCpMapper.set(cp_id, {
                        cp_id, cp_description, dataTpMapper: new Map()
                    })
                }
                const tpMapperCurrentTypeAssesmen = cpMapperCurrentTypeAssesmen?.dataCpMapper.get(cp_id);
                if(!tpMapperCurrentTypeAssesmen?.dataTpMapper.has(tp_id)){
                    tpMapperCurrentTypeAssesmen?.dataTpMapper.set(tp_id, {
                        tp_id, tp_description, dataAtpMapper: new Map()
                    })
                }
                const atpMapperCurrentTypeAssesmen = tpMapperCurrentTypeAssesmen?.dataTpMapper.get(tp_id);
                if(!atpMapperCurrentTypeAssesmen?.dataAtpMapper.has(atp_id)){
                    atpMapperCurrentTypeAssesmen?.dataAtpMapper.set(atp_id,{
                        atp_id, atp_description
                    })
                }
                /** selesai buat struktur mapel untuk satu type asessmen */
                const mapperStrukturKurikulumInCurrentDataPublikasi = new Map<string, MapelMapperInAllPublikasiPaket>
                /** mapper struktur kurikulum in Data Publikasi */
                if(!mapperStrukturKurikulumInCurrentDataPublikasi.has(kodeMapel)){
                    mapperStrukturKurikulumInCurrentDataPublikasi.set(kodeMapel, {
                        kodeMapel, 
                        mapelName,
                        dataCpMapper: new Map(),
                        koleksiPublikasiPaket:[]
                    })
                }
                const cpMapperCurrentDataPublikasi = mapperStrukturKurikulumInCurrentDataPublikasi.get(kodeMapel);
                cpMapperCurrentDataPublikasi?.koleksiPublikasiPaket.push({
                        idbaris, 
                        namaPublikasi,
                        koleksiMapel: koleksiMapel,
                        countRespon:countResponByPublikasi,
                })
                if(!cpMapperCurrentDataPublikasi?.dataCpMapper.has(cp_id)){
                    cpMapperCurrentDataPublikasi?.dataCpMapper.set(cp_id, {
                        cp_id, cp_description, dataTpMapper: new Map()
                    })
                }
                const tpMapperCurrentDataPublikasi = cpMapperCurrentDataPublikasi?.dataCpMapper.get(cp_id);
                if(!tpMapperCurrentDataPublikasi?.dataTpMapper.has(tp_id)){
                    tpMapperCurrentDataPublikasi?.dataTpMapper.set(tp_id, {
                        tp_id, tp_description, dataAtpMapper: new Map()
                    })
                }
                const atpMapperCurrentDataPublikasi= tpMapperCurrentDataPublikasi?.dataTpMapper.get(tp_id);
                if(!atpMapperCurrentDataPublikasi?.dataAtpMapper.has(atp_id)){
                    atpMapperCurrentDataPublikasi?.dataAtpMapper.set(atp_id,{
                        atp_id, atp_description
                    })
                }
                /** selesai buat struktur mapel untuk satu paket soal */

                

                if(!DetailPublikasiWithResponSiswaMapper.has(idbaris)){
                    DetailPublikasiWithResponSiswaMapper.set(idbaris, {
                        detail: itemDataPubliasi,
                        mapperResponSiswa: new Map(),
                        strukturMapel:mapperStrukturKurikulumInCurrentDataPublikasi//new Map()//mapperStrukturKurikulumInCurrentTypeAssesmen
                    })
                }

                const currentDetailPublikasi = DetailPublikasiWithResponSiswaMapper.get(idbaris);

                for(const currentResponSiswa of dataResponSiswa){
                    const {siswa_id, dataRefrensiTabResponTagihanJenjang, ...otherDataTabSheetTagihan} = currentResponSiswa;
                    if(!currentDetailPublikasi?.mapperResponSiswa.has(siswa_id)){
                        currentDetailPublikasi?.mapperResponSiswa.set(siswa_id, {
                            detailResponSiswa: currentResponSiswa,
                            maperAtpInPublikasi: new Map()
                        } )
                    }

                    
                    

                    if(!mapperResponSiswaInAllRespons.has(siswa_id)){
                        mapperResponSiswaInAllRespons.set(siswa_id, {
                            detailResponSiswa: currentResponSiswa,
                            maperAtpInPublikasi: new Map()
                        })
                    }
                    const mapperAtpInPublikasi = currentDetailPublikasi?.mapperResponSiswa.get(siswa_id);
                    const mapperAtpinAllPublikasi = mapperResponSiswaInAllRespons.get(siswa_id)
                    for(const itemRefrensi of dataRefrensiTabResponTagihanJenjang){
                        const {atp_id, responId, ...other} = itemRefrensi;

                        if(!mapperAtpInPublikasi?.maperAtpInPublikasi.has(atp_id)){
                            mapperAtpInPublikasi?.maperAtpInPublikasi.set(atp_id, [])
                        };
                        if(!mapperAtpinAllPublikasi?.maperAtpInPublikasi.has(atp_id)){
                            mapperAtpinAllPublikasi?.maperAtpInPublikasi.set(atp_id, [])
                        }
                        
                        const currentAtp = mapperAtpInPublikasi?.maperAtpInPublikasi.get(atp_id);
                        currentAtp?.push(itemRefrensi);

                        const collectionAtp = mapperAtpinAllPublikasi?.maperAtpInPublikasi.get(atp_id);
                        collectionAtp?.push(itemRefrensi);


                    }



                }
            }
            
            if(!newTypeTagihanMapper.has(type)){
                newTypeTagihanMapper.set(type, {
                    detailPublikasiMapper:DetailPublikasiWithResponSiswaMapper,
                    mapelMapper:mapperStrukturKurikulumInCurrentTypeAssesmen
                })
            }
            
        }
        return type_tagihan.map(type=>{
            const dataMaperTypeKategoriTagihan = newTypeTagihanMapper.get(type)
            const data:KoleksiMapelBasedSiswaInResponAllKategoriTagihan[] = [];
            const koleksiPaketSoal:KoleksiPublikasiPaketPerMapel[] = []
            const koleksiAtpInMapel: RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan[] = []

            // const {detailPublikasiMapper, mapelMapper} = dataMaperTypeKategoriTagihan.entries()
            for(const kodeMapel of koleksiKodeMapel){
                const mapelMapper = dataMaperTypeKategoriTagihan?.mapelMapper.get(kodeMapel);
                const detailPublikasiMapper = dataMaperTypeKategoriTagihan?.detailPublikasiMapper
                const dataSiswaBasedOnMemberMapel:SiswaType[]= dataSiswaHasMapel.filter(s=>s.mapel.some(hasMapel=>hasMapel.kode === kodeMapel)).map(m=>m.dataSiswa);
                // const dataTemp:KoleksiMapelBasedSiswaInResponAllKategoriTagihan[] = [];
                if(mapelMapper){
                    /** loop strukturKurikulum */
                    const {kodeMapel, mapelName, dataCpMapper} = mapelMapper;
                    const collection_Cp:StrukturCpType[] = [];
                    const collection_Tp:StrukturTpType[] = [];
                    const collection_Atp:StrukturAtpType[] = [];
                    [...dataCpMapper.values()].forEach(cp=>{
                        const {cp_id, cp_description, dataTpMapper}= cp;
                        collection_Cp.push({cp_id, cp_description});

                        [...dataTpMapper.values()].forEach(tp=>{
                            const {tp_id, tp_description, dataAtpMapper} = tp;
                            collection_Tp.push({tp_id, tp_description});
                            [...dataAtpMapper.values()].forEach(atp=>{
                                
                                collection_Atp.push(atp)
                            })
                        })
                    });
                    
                    const koleksiAtpInMapel: RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan ={
                        kodeMapel:kodeMapel,
                        collection_Cp,
                        collection_Tp,
                        collection_Atp,
                    };
                    
                    const dataNilai:DataSiswaBasedMapelInResponAllKategoriTagihanInterface[]=dataSiswaBasedOnMemberMapel.map(siswa=>{
                        const totalMapel:number|null= null
                        const countSoalMapel:number|null= null;
                        const skorMapel: number|null = null;
                        const dataCp: CollectionNilaiCp[]= []
                        const sumberPaketSoal:KoleksiPublikasiPaketPerMapel[]=[]
                        const collection_atp_id:number[]=collection_Atp.map(m=>m.atp_id)
                        const collection_tp_id: number[]=collection_Tp.map(m=>m.tp_id);
                        const collection_cp_id: number[]=collection_Cp.map(m=>m.cp_id);
                        
                        if(detailPublikasiMapper){
                           [...detailPublikasiMapper.values()].forEach((maper)=>{
                               const {detail,mapperResponSiswa, strukturMapel}= maper;
                               const {idbaris,namaPublikasi,koleksiMapel} = detail;
                               const countRespon = mapperResponSiswa.size;

                               sumberPaketSoal.push({idbaris,namaPublikasi,koleksiMapel,countRespon});
                            
                                const dataNilaiCurrentSiswa = mapperResponSiswa.get(siswa.id);
                                if(dataNilaiCurrentSiswa){
                                    const {detailResponSiswa, maperAtpInPublikasi}=dataNilaiCurrentSiswa;
                                     [...dataCpMapper.values()].forEach(cp=>{
                                        const {cp_id, cp_description, dataTpMapper}= cp;
                                        
                                        
                                        [...dataTpMapper.values()].forEach(tp=>{
                                            const {tp_id, tp_description, dataAtpMapper} = tp;

                                            /** koleksikan seluruh nilai dari sini */
                                            
                                            // export interface CollectionNilaiAtp extends StrukturAtpInterface {
                                            //     totalAtp: number|null
                                            //     skorAtp: number|null
                                            //     countSoalAtp: number|null
                                            //     detail: DataSkorSiswaByInstrumenType[]
                                            // }
                                            
                                            let totalAtp:number = 0;
                                            let countSoalAtp:number = 0;
                                            
                                            [...dataAtpMapper.values()].forEach(atp=>{
                                                
                                                const koleksiNilaiAtp = maperAtpInPublikasi.get(atp.atp_id);
                                                countSoalAtp+=koleksiNilaiAtp?.length ?? 0;
                                                if(koleksiNilaiAtp){

                                                    koleksiNilaiAtp?.forEach(tabRespon=>{
                                                        const {responId, atp_id, skor, responJawaban} = tabRespon;
                                                        totalAtp+= (skor ?? 0);

                                                    })
                                                }
                                            });

                                        })
                                    });
                                    

                                }
                           })
                        }

                        const collectionNilaiMapel:CollectionNilaiMapel={
                            kodeMapel,
                            mapelName,
                            totalMapel,
                            countSoalMapel, 
                            skorMapel,
                            dataCp,
                            sumberPaketSoal,
                            collection_atp_id,
                            collection_tp_id,
                            collection_cp_id
                        }

                        return {
                            idSiswa:siswa.id,
                            namaSiswa: siswa.pd_nama,
                            rombel: siswa.nama_rombel,
                            koleksiAtpInMapel,
                            mapel:collectionNilaiMapel

                        }
                    })

                    const koleksiMapelBasedOnResponsSiswa:KoleksiMapelBasedSiswaInResponAllKategoriTagihan = {
                        mapel: kodeMapel,
                        dataNilai,
                        koleksiAtpInMapel
                    };

                    data.push(koleksiMapelBasedOnResponsSiswa);


                }
               
            }
            
            
            return {
                type,
                data,
                koleksiPaketSoal,
                koleksiAtpInMapel
            }
        })
    }


    static buildRaport(KategoriTagihanHasManyResponSiswa:KategoriTagihanHasManyResponSiswaType[], dataSiswaHasMapel:DataSiswaHasMapelType[], koleksiKodeMapel:string[]): KategoriTagihanHasManyPesertaMapelType[]{
        const rombelAktif = getSessionRombel();
        const jenjang = getNumberFromString(rombelAktif);
        const semester = currentTapelProperties({variant:'getSemester', tgl:new Date()})
        const type_tagihan = koleksiKategoriTagihanRaport(jenjang, semester as number);
        
        
        
        return type_tagihan.map(type=>{
            const kategori = KategoriTagihanHasManyResponSiswa.find(s=>s.type === type);
            const koleksiAtpInMapel: RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan[] = kategori?.koleksiAtpInMapel ?? []
            const koleksiMapelBasedSiswa:KoleksiMapelBasedSiswaInResponAllKategoriTagihan[] = koleksiKodeMapel.map(kodeMapel=>{
                const siswaAsMemberMapel:DataSiswaBasedMapelInResponAllKategoriTagihanInterface[] = dataSiswaHasMapel.filter(s=>s.mapel.some(mapelSiswa=>mapelSiswa.kode === kodeMapel)).map(siswaHasMapel=>{
                    const {dataSiswa, mapel} = siswaHasMapel
                    if(kategori?.data){
                        const foundSiswaInTagihan = kategori.data.find(s=>s.idSiswa === dataSiswa.id);
                        if(foundSiswaInTagihan){
                            const mapelResponCurrentSiswa = foundSiswaInTagihan.mapel.find(s=>s.kodeMapel === kodeMapel)
                            return {
                                idSiswa:foundSiswaInTagihan.idSiswa,
                                namaSiswa:dataSiswa.pd_nama,
                                rombel: dataSiswa.nama_rombel,
                                mapel:mapelResponCurrentSiswa,
                                koleksiAtpInMapel: koleksiAtpInMapel.find(s=>s.kodeMapel === kodeMapel)
                            }
                        }
                    }
                    return {
                        idSiswa:dataSiswa.id,
                        namaSiswa: dataSiswa.pd_nama,
                        rombel: dataSiswa.nama_rombel,
                        // mapel,
                        koleksiAtpInMapel: koleksiAtpInMapel.find(s=>s.kodeMapel === kodeMapel)
                    }
                })
                return {
                    mapel: kodeMapel,
                    dataNilai: siswaAsMemberMapel,
                    koleksiAtpInMapel: koleksiAtpInMapel.find(s=>s.kodeMapel === kodeMapel)
                }
            })
                        
            
            
            return {
                type,
                data:koleksiMapelBasedSiswa,
                koleksiPaketSoal:kategori?.koleksiPaketSoal ?? [],
                koleksiAtpInMapel
            }
        })
    }
}


