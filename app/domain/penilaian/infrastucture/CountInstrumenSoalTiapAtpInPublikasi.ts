import type { CollactionMapelInAllPublikasiPaketType } from "../type/collection-kurikulum-in-all-publikasi/CollactionMapelInAllPublikasiPaketType";
import type { DataTipeAssesmenMapper, MapelMapperInAllPublikasiPaket } from "../type/collection-kurikulum-in-all-publikasi/StrukturKurikulumMapper";
import type { TagihanHasDataResponse } from "../type/tagihan-assesmen-type";
import MapperTagihanHasDataRespon from "./MapperTagihanHasDataRespon";


export default class CountInstrumenSoalTiapAtpInPublikasiPaket{
    /** 
     * @deprecated | class ini memanggil **MapperTagihanHasDataRespon**, seharusnya mapper tersebut dipanggil sekali saja di class Parent
     *  dan class ini cukup memanggil return dari class **MapperTagihanHasDataRespon*. Ini masih bisa dipakai jika class Parent-nya tidak harus
     *  dipanggil dari **selector**
    // static build(data:TagihanHasDataResponse[]):SebaranTagihanAssesmenKurikulumType[]{
     */
    static build(data:TagihanHasDataResponse[]):CollactionMapelInAllPublikasiPaketType[]{
        
        const {mapperKategoriTagihanPerAtpSkor:MapperTipeAssesmen, mapperStrukturKurikulum:mapMapel} = MapperTagihanHasDataRespon(data);
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
    static buildFromMapper(MapperTipeAssesmen:DataTipeAssesmenMapper,mapMapel:Map<string, MapelMapperInAllPublikasiPaket>):CollactionMapelInAllPublikasiPaketType[]{
        
        // const {mapperKategoriTagihanPerAtpSkor:MapperTipeAssesmen, mapperStrukturKurikulum:mapMapel} = MapperTagihanHasDataRespon(data);
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

