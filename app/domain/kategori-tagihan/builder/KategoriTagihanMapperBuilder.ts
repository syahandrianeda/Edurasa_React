import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { currentTapelProperties } from "~/lib/current-tapel";
import { getNumberFromString } from "~/lib/get-number";
import { koleksiKategoriTagihanRaport } from "./KategoriTagihanRaportCollections";
import type { MapperTagihanHasDataResponWithKategoriTagihan } from "~/domain/penilaian/infrastucture/MapperTagihanHasDataResponWithKategoriTagihan";
import type { KategoriTagihanType } from "../types/entities/KategoriTagihanType";
import type { CollactionMapelInAllPublikasiPaketType } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/CollactionMapelInAllPublikasiPaketType";
import type { DetailPublikasiWithResponSiswaType } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/DetailPublikasiWithResponSiswaType";
import type { DataSkorSiswaByInstrumenType } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/DataSkorSiswaByInstrumenType";
import type { RefrensiTabResponTagihanJenjangType } from "~/domain/penilaian/type/collection-kurikulum-in-all-publikasi/RefrensiTabResponTagihanJenjangType";

export type KategoriTagihanMapperType = MapperTagihanHasDataResponWithKategoriTagihan & {
    mapperKategoriTagihanPerKategoriTagihan: Map<KategoriTagihanType, TagihanHasDataResponse>
}


export default class KategoriTagihanMapperBuilder{

    static build(data:CollactionMapelInAllPublikasiPaketType[]){

        const rombelAktif = getSessionRombel();
        const jenjang = getNumberFromString(rombelAktif);
        const semester = currentTapelProperties({variant:'getSemester', tgl:new Date()})
        const DataKoleksiTagihanRaport = koleksiKategoriTagihanRaport(jenjang, semester as number);

        const mapperKoleksiTagihan = new Map<KategoriTagihanType, {
                mapperDetailPublikasi:Map<number, {
                        detailPublikasi:DetailPublikasiWithResponSiswaType, 
                            mapperResponSiswa:Map<number, {
                                dataResponSiswa:DataSkorSiswaByInstrumenType, 
                                    mapperRefrensiAtp:Map<number, {

                                        dataRefrensi:RefrensiTabResponTagihanJenjangType[]
                                    }>}>,
                
                                }>}>
        for(const tipe_assesmen of DataKoleksiTagihanRaport){
            if(!mapperKoleksiTagihan.has(tipe_assesmen)){
                mapperKoleksiTagihan.set(tipe_assesmen, {
                    mapperDetailPublikasi: new Map()
                })
            }
        }
        const flatingMap = data.flatMap(m=>m.dataCp.flatMap(n=>n.dataTp.flatMap(o=>o.dataAtp.flatMap(p=>p.dataTipeAssesmen))));
        
        
        /** result Mapper */
        for(const dataTipeAssesmen of flatingMap){
            const {tipe_assesmen, DetailPublikasiWithResponSiswa } = dataTipeAssesmen;
            const currentTipeAssesmenMapper = mapperKoleksiTagihan.get(tipe_assesmen);
            for(const itemDetailPublikasiWithResponsSiswa of DetailPublikasiWithResponSiswa){
                const {idbaris, dataResponSiswa, ...other} = itemDetailPublikasiWithResponsSiswa;
                if(!currentTipeAssesmenMapper?.mapperDetailPublikasi.has(idbaris)){
                    currentTipeAssesmenMapper?.mapperDetailPublikasi.set(idbaris, {
                        detailPublikasi:itemDetailPublikasiWithResponsSiswa,
                        mapperResponSiswa: new Map()
                    })
                }

                const mapperDetailPublikasi = currentTipeAssesmenMapper?.mapperDetailPublikasi.get(idbaris);
                for(const itemDataResponSiswa of dataResponSiswa){
                    const {siswa_id, dataRefrensiTabResponTagihanJenjang}=itemDataResponSiswa;
                    if(!mapperDetailPublikasi?.mapperResponSiswa.has(siswa_id)){
                        mapperDetailPublikasi?.mapperResponSiswa.set(siswa_id, {
                            dataResponSiswa: itemDataResponSiswa,
                            mapperRefrensiAtp: new Map()
                        })
                    }
                    const mapperItemSiswa = mapperDetailPublikasi?.mapperResponSiswa.get(siswa_id);
                    for(const itemDataRefrensiResponTagihanJenjang of dataRefrensiTabResponTagihanJenjang){
                        const {atp_id, skor, dataPublikasi} = itemDataRefrensiResponTagihanJenjang;
                        if(!mapperItemSiswa?.mapperRefrensiAtp.has(atp_id)){
                            mapperItemSiswa?.mapperRefrensiAtp.set(atp_id, {
                                dataRefrensi: []
                            })
                        }
                        const resultDataRefrensi = mapperItemSiswa?.mapperRefrensiAtp.get(atp_id);
                        resultDataRefrensi?.dataRefrensi.push(itemDataRefrensiResponTagihanJenjang)
                    }
                }


            }
        };

        console.log({flatingMap, data, koleksi:[...mapperKoleksiTagihan.entries()].map(([type,dataPublikasi])=>({
                                                    type, 
                                                    dataPublikasi:[...dataPublikasi.mapperDetailPublikasi.values()].map(pub=>({
                                                                publikasi:pub.detailPublikasi, 
                                                                responSiswa: [...pub.mapperResponSiswa.values()].map(m=>({
                                                                    dataResponSiswa: m.dataResponSiswa,
                                                                    refrensiAtp: [...m.mapperRefrensiAtp.entries()].map(([atp, tabResponAtp])=>({atp, detail:[...tabResponAtp.dataRefrensi]}))

                                                                }))
                                                            })
                                                        )})
                                                    )});
        
        /**
         * butuh Data dengan format/struktur:
         * {
         *  type:
         *  data:
         *  koleksiAtp;
         *  
         * }
         */

        /** kita bentuk dari data mapel yang ada di kelas secara keselurhan */
        for(const type of DataKoleksiTagihanRaport){
            const currentTypeAsessmenMapper = mapperKoleksiTagihan.get(type);
            /**looping dari data Mapel   */
        }
        
    }
}