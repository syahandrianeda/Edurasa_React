import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import type { jp_mapelApp } from "~/types/mapel/jp_mapel";
import type { InterfaceMapel } from "~/types/mapel/mapel";
import MapelUmumRaportBuilder from "../mapper/MapperKodeUmumMapelType";
import type { MapelWithNilaiRaportRombel, RaportRombelAsal } from "../../RekapRaportAsal";
import type { MakMinAtp, MakMinCp, MakMinTp, NilaiRaportInterface, SourceNilaiKatetoriTagihanType } from "../../types/RaportIntarface";
import Decimal from 'decimal.js';
import CalculatedNilaiStrukturKurikulum from "./CalculatedNilaiStrukturKurikulum";
import TagihanHasDataResponseMapperBuilder from "~/domain/TagihanHasDataResponMapper/TagihanHasDataResponMapperBuilder";
// import { getMinMax } from "~/lib/get-min-max-on-array-object";
import type { SkorNilaiFromResponWithSource } from "./SkorNilaiFromResponWithSourceType";
import type { SkorNilaiFromSheetKdWithSource } from "./SkorNilaiFromSheetKdWithSource";
import KoleksiKategoriAssesmenOnJenjang from "~/domain/kategori-tagihan/builder/KoleksiKategoriAssesmenOnJenjang";
import { getMinMax } from "~/lib/get-min-max-on-array-object";
import calculateNilaiRaportKompetensi from "./CalculateNilaiRaportKompetensi";

export class CalclutatedNilaiRaport{
    
    constructor(private readonly tagihan:TagihanHasDataResponse[], private readonly mapelRombel:jp_mapelApp[]){};

   public dataRaport:MapelWithNilaiRaportRombel[]=[];
    get koleksiKodeMapelRaport():InterfaceMapel['kode'][]{
        return this.mapelRombel.map(m=>m.kode)
    }

    build(){
        

    }

  
    test():this{
        const koleksiAssesmenKelas = KoleksiKategoriAssesmenOnJenjang.build();
        const mapper= new TagihanHasDataResponseMapperBuilder(this.tagihan, this.mapelRombel, koleksiAssesmenKelas).build();

        const kodeUmumMapel = MapelUmumRaportBuilder.buildMapper(this.mapelRombel);
        const koleksiMapelMapper = mapper.mapelMapperWithTagihanHasDataResponse;
        const strukturKurikulumRaport = mapper.strukturKurikulumWithSlot;
        const sumberRespon = mapper.siswaAsRespondenHasResponTagihan;
        const sumberSheetKd = mapper.siswaHasSheetKd;
        
        const dataMapelWithNilaiRaportSiswa:MapelWithNilaiRaportRombel[]=[];
        for(const mapel of this.mapelRombel){
            const {source:mapelInterface, data_students, kode}= mapel;
            const raportSiswa:RaportRombelAsal[] = [];
            const kurikulumCurrentMapel = strukturKurikulumRaport.find(s=>s.kodeMapel === kode);
            const currentKoleksiTagihan = koleksiMapelMapper.get(kode);

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

                const dataNilaiRaportResponSiswa= CalclutatedNilaiRaport.calculatedNilairespon(mapelInterface, nilaiRespon);
                const dataNilaiRaportSheetKd:NilaiRaportInterface = CalclutatedNilaiRaport.calculatedNilaiSheetKd(mapelInterface, nilaiSheetKd);
                
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
                strukturKurikulumRaport:kurikulumCurrentMapel,
                sourceTagihan: currentKoleksiTagihan ?? [],
                collectionAtp:[],
                collectionCp :[],
                collectionTp :[]
            };
        
            dataMapelWithNilaiRaportSiswa.push(objCurrentMapel);
        }
        this.dataRaport = dataMapelWithNilaiRaportSiswa;
        console.log({
            // kodeMapel: this.koleksiKodeMapelRaport, 
            // mapelUmum: [...kodeUmumMapel.values()],
            dataMapelWithNilaiRaportSiswa,
            // resultMapper,
            // mapperMapelSiswaResponSheetKd 
        })

        return this;
    }
    static calculatedNilairespon(mapelInterface:InterfaceMapel, nilaiRespon: SkorNilaiFromResponWithSource):NilaiRaportInterface{
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
                
                const nilaiRaportAtp = calculateNilaiRaportKompetensi(skorKd_atp);
                const nilaiRaportCp = calculateNilaiRaportKompetensi(skorKd_cp);
                const nilaiRaportTp = calculateNilaiRaportKompetensi(skorKd_tp);
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
                    sourceResponse:nilaiRespon,
                    nilaiRaportAtp,
                    nilaiRaportTp,
                    nilaiRaportCp,
                    collectionAtp:[],
                    collectionTp:[],
                    collectionCp:[]
                    
                }


    }
    
    static calculatedNilaiSheetKd(mapelInterface:InterfaceMapel, nilaiSheetKd: SkorNilaiFromSheetKdWithSource):NilaiRaportInterface{
        const {
            totalMapel_sheet,
            skorMapel_sheet,
            countSoalMapel_sheet,
            sourceSheetKdGroupTagihan,
            skorKd_atp_sheet:skorKd_atp,
            skorKd_tp_sheet: skorKd_tp,
            skorKd_cp_sheet: skorKd_cp,
            sourceSheetKdGroupTagihanLevelAtp,
            sourceSheetKdGroupTagihanLevelTp,
            sourceSheetKdGroupTagihanLevelCp,
            sourcesByGroupKategoriAssesmen
        } = nilaiSheetKd;
 
        const source:SourceNilaiKatetoriTagihanType[] = [...sourcesByGroupKategoriAssesmen.entries()].map(([type,valueType])=>{
            return {
                type,
                nilai:skorMapel_sheet
            }
        });
        
        /** max/min atp */
        const atpDescriptionRefrenceSource = sourceSheetKdGroupTagihanLevelAtp.map(({atp_id, atp_description, skorAtp})=>(({atp_id, atp_description, skorAtp:skorAtp??0})))
        const {min:minAtp, max:maxAtp} = getMinMax(atpDescriptionRefrenceSource, 'skorAtp');
        const atpDescriptionRefrence = {
            min:minAtp,
            max:maxAtp
        };
        
        /** max/min tp */
        const tpDescriptionRefrenceSource = sourceSheetKdGroupTagihanLevelTp.map(({tp_id, tp_description, skorTp})=>(({tp_id, tp_description, skorTp:skorTp??0})));
        const {min:minTp, max:maxTp} = getMinMax(tpDescriptionRefrenceSource, 'skorTp');
        const tpDescriptionRefrence = {
            min:minTp,
            max:maxTp
        };

        /** max/min cp */
        const cpDescriptionRefrenceSource = sourceSheetKdGroupTagihanLevelCp.map(({cp_id, cp_description, skorCp})=>(({cp_id, cp_description, skorCp:skorCp??0})));
        const {min:minCp, max:maxCp} = getMinMax(cpDescriptionRefrenceSource, 'skorCp');
        const cpDescriptionRefrence = {
            min:minCp,
            max:maxCp
        };
        const nilaiRaportAtp = calculateNilaiRaportKompetensi(skorKd_atp);
        const nilaiRaportCp = calculateNilaiRaportKompetensi(skorKd_cp);
        const nilaiRaportTp = calculateNilaiRaportKompetensi(skorKd_tp);
        return  {
            mapel:mapelInterface,
            nilaiRaport: skorMapel_sheet,
            source,
            atpDescriptionRefrence,
            tpDescriptionRefrence,
            cpDescriptionRefrence,
            skorKd_atp,
            skorKd_cp,
            skorKd_tp,
            sourceResponse:nilaiSheetKd,
            nilaiRaportAtp,
            nilaiRaportTp,
            nilaiRaportCp, 
            collectionAtp:[],
            collectionTp:[],
            collectionCp:[],
            
        }
    }
    
    
}