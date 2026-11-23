import type { StrukturKurikulumMapelWithSlotType } from "~/domain/trees-struktur-kurikulum/struktur-kurikulum-type";
import type { CollactionMapelInAllPublikasiPaketType } from "../type/collection-kurikulum-in-all-publikasi/CollactionMapelInAllPublikasiPaketType";
import type { CollectionCpInAllPublikasiPaketType } from "../type/collection-kurikulum-in-all-publikasi/CollectionCpInAllPublikasiPaketType";
import type { CollectionTpInAllPublikasiPaketType } from "../type/collection-kurikulum-in-all-publikasi/CollectionTpInAllPublikasiPaketType";
import type { CollectionAtpInAllPublikasiPaketType } from "../type/collection-kurikulum-in-all-publikasi/CollectionAtpInAllPublikasiPaketType";
import type { DataPublikasiPerTipeAssesmenType } from "../type/collection-kurikulum-in-all-publikasi/DataPublikasiPerTipeAssesmenType";
import type { KategoriAssesmenTagihanApp, KategoriTagihanType } from "~/domain/kategori-tagihan/types/entities/KategoriTagihanType";
import { KategoriAsseemenApp } from "~/domain/kategori-tagihan/builder/KategoriTagihanRaportCollections";
import type { DetailPublikasiWithResponSiswaType } from "../type/collection-kurikulum-in-all-publikasi/DetailPublikasiWithResponSiswaType";
import type { DataTipeAssesmenMapper } from "../type/collection-kurikulum-in-all-publikasi/StrukturKurikulumMapper";

type StrukturKurikulumWithPublishedKategoriAssesmen = CollactionMapelInAllPublikasiPaketType[];

export default class StrukturKurikulumBuilder {

     static strukturKurikulumWithPublishedTagihan(
        strukturKurikulum: StrukturKurikulumMapelWithSlotType[],
        kategoriAssesmen:KategoriTagihanType[],
        kategoriAssesmenHasTagihan:DataTipeAssesmenMapper

    ): StrukturKurikulumWithPublishedKategoriAssesmen {
        
        const KoleksiKategoriAssesmen: KategoriAssesmenTagihanApp = KategoriAsseemenApp;

        return strukturKurikulum.map((levelMapel) => {
            const { kodeMapel, mapelName, slotMapel, dataCp:sourceDataCp } = levelMapel;
            const  dataCp:CollectionCpInAllPublikasiPaketType[] = sourceDataCp.map(levelCp=>{
                const {cp_id, cp_description, slotCp, dataTp:sourceDataTp} = levelCp;
                const dataTp: CollectionTpInAllPublikasiPaketType[] =sourceDataTp.map(levelTp=>{
                    const {tp_id, slotTp, tp_description, dataAtp:sourceDataAtp} = levelTp;

                    const dataAtp:CollectionAtpInAllPublikasiPaketType[] = sourceDataAtp.map(levelAtp=>{
                        const {atp_id, atp_description} = levelAtp;
                        const keyMapelAtpId = `${kodeMapel}_${atp_id}`;

                        const dataTipeAssesmen: DataPublikasiPerTipeAssesmenType[] = kategoriAssesmen.map(tipe_assesmen=>{
                            const currentTagihanWithThisTipeAssesmen = kategoriAssesmenHasTagihan.get(tipe_assesmen);
                            const DetailPublikasiWithResponSiswa: DetailPublikasiWithResponSiswaType[] =[]
                            if(!currentTagihanWithThisTipeAssesmen){
                                return {
                                    tipe_assesmen,
                                    DetailPublikasiWithResponSiswa
                                }
                            };

                            return {
                                    tipe_assesmen,
                                    DetailPublikasiWithResponSiswa:currentTagihanWithThisTipeAssesmen.filter(s=>s.atp_id === atp_id)
                            }
                            
                        });

                        return {
                            atp_id,
                            atp_description,
                            dataTipeAssesmen
                        }
                    });

                    return {
                        tp_id,
                        tp_description,
                        slotRow: slotTp,
                        dataAtp
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
                slotRow: slotMapel,
                dataCp
            };
        });
    }
}