import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import type { jp_mapelApp } from "~/types/mapel/jp_mapel";
import type { InterfaceMapel } from "~/types/mapel/mapel";
import MapelUmumRaportBuilder from "../mapper/MapperKodeUmumMapelType";
import AtpWitTagihanBankSoal from "~/domain/atp-mapper/AtpWithTagihanBankSoal";
import type { MapelWithNilaiRaportRombel, RaportRombelAsal } from "../../RekapRaportAsal";
import type { MakMinAtp, MakMinCp, MakMinTp, NilaiRaportInterface, SourceNilaiKatetoriTagihanType } from "../../types/RaportIntarface";
import StrukturKurikulumInTagihanHasDataResponBuilder from "~/domain/struktur-kurikulum/tagihan-has-data-response/StrukturKurikulumInTagihanHasDataResponBuilder";
import SumberKoleksiNilaiRapor from "../sumber-nilai/SumberKoleksiNilaiRapor";
import { type sourceResponAtp } from "../sumber-nilai/mapperSiswaWithDetailNilaiResponAppType";
import type { detailNilaiSiswaAppType } from "~/types/penilaian/nilai-siswa-app-type";
import Decimal from 'decimal.js';
import CalculatedNilaiStrukturKurikulum from "./CalculatedNilaiStrukturKurikulum";
import TagihanHasDataResponseMapperBuilder from "~/domain/TagihanHasDataResponMapper/TagihanHasDataResponMapperBuilder";
import type { StrukturKurikulumMapelWithSlotType } from "~/domain/trees-struktur-kurikulum/struktur-kurikulum-type";
import type { CollectionNilaiMapel, RekapAtpInKoleksiMapelOnRespoonseTiapKategoriTagihan } from "~/domain/kategori-tagihan/types";
import type { StrukturAtpType, StrukturCpType, StrukturTpType } from "~/domain/trees-struktur-kurikulum";
import { getMinMax } from "~/lib/get-min-max-on-array-object";
import type { SkorNilaiFromResponWithSource } from "./SkorNilaiFromResponWithSourceType";

export class CalclutatedNilaiRaport{
    
    constructor(private readonly tagihan:TagihanHasDataResponse[], private readonly mapelRombel:jp_mapelApp[]){};

   
    get koleksiKodeMapelRaport():InterfaceMapel['kode'][]{
        return this.mapelRombel.map(m=>m.kode)
    }

    build(){
        

    }

  
    test():this{
        const mapper= new TagihanHasDataResponseMapperBuilder(this.tagihan, this.mapelRombel).build();

        const kodeUmumMapel = MapelUmumRaportBuilder.buildMapper(this.mapelRombel);
        const strukturKurikulumRaport = mapper.strukturKurikulumWithSlot;//StrukturKurikulumInTagihanHasDataResponBuilder.buildWithSlot(this.tagihan);
        const sumberRespon = mapper.siswaAsRespondenHasResponTagihan;//new SumberKoleksiNilaiRapor(this.tagihan).build();//.mapperSiswaRespon
        const sumberSheetKd = mapper.siswaHasSheetKd;
        
        const dataMapelWithNilaiRaportSiswa:MapelWithNilaiRaportRombel[]=[];
        for(const mapel of this.mapelRombel){
            const {source:mapelInterface, data_students, kode}= mapel;
            const raportSiswa:RaportRombelAsal[] = [];
            const kurikulumCurrentMapel = strukturKurikulumRaport.find(s=>s.kodeMapel === kode);

            for(const siswaa of data_students){
                const sumberResponCurrentSiswa = sumberRespon?.get(siswaa.id);
                const sumberSheetKdCurrentSiswa =  sumberSheetKd;//.get(siswaa.id);
                
                // if(!sumberResponCurrentSiswa) continue;
                // const sumberNilai = CalculatedNilaiStrukturKurikulum(
                //                         );
                const nilaiRespon = CalculatedNilaiStrukturKurikulum.getNilaiFromResponse(
                                                            kurikulumCurrentMapel?.dataCp ?? [],
                                                            siswaa.id,
                                                            mapelInterface,
                                                            sumberResponCurrentSiswa);
                const nilaiSheetKd = CalculatedNilaiStrukturKurikulum.getNilaiFromSheetKd(
                                                            kurikulumCurrentMapel?.dataCp ?? [],
                                                            siswaa.id,
                                                            mapelInterface,
                                                            sumberSheetKdCurrentSiswa );

                const dataNilaiRaportResponSiswa= this.calculatedNilairespon(mapelInterface, nilaiRespon);
                const dataNilaiRaportSheetKd:NilaiRaportInterface = Object.create(null);
                
                // /** SELESAI */
                const objRaportSiswa:RaportRombelAsal = {
                    dataSiswa:siswaa,
                    dataNilaiRaportResponSiswa,
                    dataNilaiRaportSheetKd,
                    // nilaiSheetKd,
                    // nilaiRespon,
                    
                }
        
                raportSiswa.push(objRaportSiswa);
            }
        
            const objCurrentMapel:MapelWithNilaiRaportRombel ={
                mapel:mapelInterface,
                raportSiswa,
                strukturKurikulumRaport:kurikulumCurrentMapel
            };
        
            dataMapelWithNilaiRaportSiswa.push(objCurrentMapel);
        }
        
        console.log({
            // kodeMapel: this.koleksiKodeMapelRaport, 
            // mapelUmum: [...kodeUmumMapel.values()],
            dataMapelWithNilaiRaportSiswa,
            // resultMapper,
            // mapperMapelSiswaResponSheetKd 
        })

        return this;
    }
    calculatedNilairespon(mapelInterface:InterfaceMapel, nilaiRespon: SkorNilaiFromResponWithSource):NilaiRaportInterface{
        const {
                    totalMapel, 
                    countSoalMapel, 
                    skorMapel, 
                    dataCp, 
                    sourcesByGroupKategoriAssesmen, 
                    dataCpWithSource, 
                    sourceResponGroupTagihan,
                    skorKd_atp,
                    skorKd_cp,
                    skorKd_tp,
                    sourceResponGroupTagihanLevelCp,
                    sourceResponGroupTagihanLevelAtp,
                    sourceResponGroupTagihanLevelTp

                } = nilaiRespon;
                const sourceRespon:SourceNilaiKatetoriTagihanType[] = sourcesByGroupKategoriAssesmen.map(m=>{
                    const {type, tagihanWithRespon} = m;
                    const koleksiSkor = tagihanWithRespon.flatMap(m=>m.collectionCurrentTagihanAtp.map(n=>n.skor ?? 0));
                    const nilai = Decimal.sum(...koleksiSkor).div(koleksiSkor.length).toDecimalPlaces(2).toNumber();
                    
                    return {
                        type,
                        nilai,
                    }
                });
                /** start */
                
                const cpCollection = sourceResponGroupTagihanLevelCp.map(({cp, skorRespon})=>({cp_id:cp.cp_id, cp_description:cp.cp_description, skorCp:skorRespon ?? 0}));
                const tpCollection = sourceResponGroupTagihanLevelTp.map(({tp, skorRespon})=>({tp_id:tp.tp_id, tp_description:tp.tp_description, skorTp:skorRespon ?? 0}));
                const atpCollection = sourceResponGroupTagihanLevelAtp.map(({atp, skorRespon})=>({atp_id:atp.atp_id, atp_description:atp.atp_description, skorAtp:skorRespon ?? 0}));
                
                const { min: minAtp, max: maxAtp } = getMinMax(atpCollection, 'skorAtp');
                const { min: minTp, max: maxTp } = getMinMax(tpCollection, 'skorTp');
                const { min: minCp, max: maxCp } = getMinMax(cpCollection, 'skorCp');
                const getMaxMinAtp: MakMinAtp = {
                    min:minAtp,
                    max:maxAtp,
                }
                
                const getMaxMinTp: MakMinTp = {
                    min:minTp,
                    max: maxTp
                }
        
                const getMaxMinCp: MakMinCp= {
                    min: minCp,
                    max: maxCp
                }
                
                /** e nd */
                return  {
                    mapel:mapelInterface,
                    nilaiRaport: skorMapel,
                    source:sourceRespon,
                    atpDescriptionRefrence: getMaxMinAtp,
                    tpDescriptionRefrence: getMaxMinTp,
                    cpDescriptionRefrence: getMaxMinCp,
                    skorKd_atp,
                    skorKd_cp,
                    skorKd_tp,
                    sourceResponse:nilaiRespon
                }


    }
}