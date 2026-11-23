import type { jp_mapelApp } from "~/types/mapel/jp_mapel";
import type { KategoriTagihanHasManyPesertaMapelType } from "../kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/KategoriTagihanHasManyPesertaMapelType";
import type { MakMinAtp, MakMinCp, MakMinTp, NilaiRaportInterface, SourceNilaiKatetoriTagihanType } from "./types/RaportIntarface";
import type { InterfaceMapel } from "~/types/mapel/mapel";
import KoleksiKategoriAssesmenOnJenjang from "../kategori-tagihan/builder/KoleksiKategoriAssesmenOnJenjang";
import type { KategoriTagihanType } from "../kategori-tagihan/types/entities/KategoriTagihanType";
import { getMinMax } from "~/lib/get-min-max-on-array-object";
import type { SiswaType } from "~/types/siswa";
import type { StrukturKurikulumMapelWithSlotType } from "../trees-struktur-kurikulum/struktur-kurikulum-type";
import type { TagihanHasDataResponse } from "../penilaian/type/tagihan-assesmen-type";
import type TagihanHasDataResponseMapperBuilder from "../TagihanHasDataResponMapper/TagihanHasDataResponMapperBuilder";
import CalculatedNilaiStrukturKurikulum from "./infrastructures/accumulator-nilai/CalculatedNilaiStrukturKurikulum";
import { CalclutatedNilaiRaport } from "./infrastructures/accumulator-nilai/CalclutatedNilaiRaport";
import Decimal from "node_modules/decimal.js/decimal";
import type { StrukturAtpType, StrukturCpType, StrukturTpType } from "../trees-struktur-kurikulum";


// export type RaportRombelAsal = Pick<RaportIntarface, 'dataSiswa'|'dataNilaiRaportResponSiswa'|'dataNilaiRaportSheetKd'>
export type RaportRombelAsal = {
    dataSiswa:SiswaType,
    dataNilaiRaportResponSiswa:NilaiRaportInterface,
    dataNilaiRaportSheetKd:NilaiRaportInterface
}
export type MapelWithNilaiRaportRombel = {
    mapel:InterfaceMapel,
    raportSiswa: RaportRombelAsal[] 
    strukturKurikulumRaport?: StrukturKurikulumMapelWithSlotType,
    sourceTagihan:TagihanHasDataResponse[],
    collectionAtp:StrukturAtpType[],
    collectionTp:StrukturTpType[],
    collectionCp:StrukturCpType[],
}

export default class RekapRaportAsal{
    // private readonly RekapRaportAsal:Pick<RaportIntarface, 'dataSiswa'|'dataNilaiRaportResponSiswa'|'dataNilaiRaportSheetKd'>[]=[]
    private  dataNilaiRaportRombel:MapelWithNilaiRaportRombel[]= []
    constructor(
        private readonly dataKategoriAssesmen:KategoriTagihanHasManyPesertaMapelType[],
        private readonly mapelRombel:jp_mapelApp[]
    ){};
    get dataRapor():MapelWithNilaiRaportRombel[]{
        return this.dataNilaiRaportRombel
    }
    buildNilaiRaportRombel(){
        this.dataNilaiRaportRombel = [];
        
        const koleksiKategoriAssesmen = KoleksiKategoriAssesmenOnJenjang.build();

        for(const mapel of this.mapelRombel){
            /** destructure mapel */
            const {kode, nama_mapel, data_students, source:mapelInterface} = mapel;
            
            const raportSiswa:RaportRombelAsal[]=[]
            for(const siswa of data_students){
                /** 
                 * define object for current data of `NilaiRaportRombelAsal[]`,
                 * every mapel should be new object Data. Not reduce
                */
               const dataNilaiRaportResponSiswa:NilaiRaportInterface = this.createNilaiRaportResponSiswa(siswa.id, mapelInterface, koleksiKategoriAssesmen);
               const dataNilaiRaportSheetKd: NilaiRaportInterface =this.createNilaiRaportSheetKd(siswa.id,mapelInterface,koleksiKategoriAssesmen);
               
               
               const objRaportRombel:RaportRombelAsal = {
                    dataSiswa: siswa,
                    dataNilaiRaportResponSiswa,
                    dataNilaiRaportSheetKd,
                    
               }

               raportSiswa.push(objRaportRombel)
                
            }
            const collectionAtp :StrukturAtpType[]=[]
            const collectionTp  :StrukturTpType[]=[]
            const collectionCp  :StrukturCpType[]=[]
            
            this.dataNilaiRaportRombel.push({
                mapel:mapelInterface,
                raportSiswa,
                sourceTagihan:[],
                collectionAtp,
                collectionTp ,
                collectionCp 

            });
        }
    }
    
    createNilaiRaportResponSiswa(idSiswa:number, mapelInterface:InterfaceMapel, koleksiKategoriAssesmen:KategoriTagihanType[]):NilaiRaportInterface{
        const {kode} = mapelInterface;
        const source:SourceNilaiKatetoriTagihanType[] = [];

        let tempNilaiRaporRespon:number|null = null;
        let kdMaks: number|null=null;
        let kdMin: number|null = null;
        let idKdMaks: number|null = null;
        let idKdMin: number|null = null;
        let kdMaksDescription: string|null = null;
        let kdMinDescription: string|null = null;
        let totalMapelAccumulator: number|null = null;
        let countInstrumen: number = 0;
        
        for(const kategoriAssesmen of koleksiKategoriAssesmen){
            const foundKategoriAssesmInDataKategoriAssesmen = this.dataKategoriAssesmen.find(s=>s.type === kategoriAssesmen) ;

            if(foundKategoriAssesmInDataKategoriAssesmen){
                const {type, data, koleksiAtpInMapel, koleksiPaketSoal} = foundKategoriAssesmInDataKategoriAssesmen;
                const strukturKurikulum = koleksiAtpInMapel.find(s=>s.kodeMapel === kode);
                const foundCurrenMapelData = data.find(s=>s.mapel === kode);
                
                if(foundCurrenMapelData){
                    const foundSiswa = foundCurrenMapelData.dataNilai.find(s=>s.idSiswa === idSiswa);

                    if(foundSiswa){
                        const {mapel:collectionNIlaiMapel, memberOfTagihan} = foundSiswa;
                        let nilai: number|null = null;
                        if(collectionNIlaiMapel){
                            const {skorMapel, totalMapel, countSoalMapel} = collectionNIlaiMapel
                            nilai = skorMapel;
                            // totalMapelAccumulator = jmlAman((totalMapelAccumulator ?? 0) , (totalMapel ?? 0));
                            totalMapelAccumulator = Decimal.sum((totalMapelAccumulator ?? 0) , (totalMapel ?? 0)).toNumber();
                            countInstrumen += countSoalMapel;
                        }
                        source.push({
                            type,
                            nilai,
                            collectionsData: collectionNIlaiMapel,
                            strukturKurikulum
                            

                        })
                    }else{
                        source.push({
                            type:kategoriAssesmen,
                            nilai:null,
                            // strukturKurikulum
                        })
                    }
                }else{
                    source.push({
                        type:kategoriAssesmen,
                        nilai:null,
                        // strukturKurikulum
                    })
                }
            }else{
                source.push({
                    type:kategoriAssesmen,
                    nilai:null,
                    // strukturKurikulum
                })
            }

        }
        
        if(totalMapelAccumulator !==null){
            tempNilaiRaporRespon = Math.round(totalMapelAccumulator/countInstrumen);
        }
        
        const cpCollection = source.filter(s=>Boolean(s.collectionsData)).flatMap(m=>m.collectionsData?.dataCp?.map(({cp_id, cp_description, skorCp})=>({cp_id, cp_description, skorCp})) ?? [])
            .filter((item): item is {cp_id: number; cp_description: string; skorCp: number} => item.skorCp !== null);
        const tpCollection = source
            .filter(s=>Boolean(s.collectionsData))
            .flatMap(m=>m.collectionsData?.dataCp
                .flatMap(tp=>tp.koleksiTp?.map(({tp_id, tp_description, skorTp})=>({tp_id, tp_description, skorTp})) ?? []) ?? [])
            .filter((item): item is {tp_id: number; tp_description: string; skorTp: number} => item !== undefined && item.skorTp !== null);
        const atpCollection = source
            .filter(s=>Boolean(s.collectionsData))
            .flatMap(m=>m.collectionsData?.dataCp.flatMap(tp=>tp.koleksiTp.flatMap(atp=>atp.koleksiAtp.map(({atp_id, atp_description, skorAtp})=>(({atp_id, atp_description, skorAtp}))))
            
                
                // tp.koleksiTp.flatMap(atp=>atp?.koleksiAtp?.map(({atp_id, atp_description, skorAtp})=>({atp_id, atp_description, skorAtp})) ?? [])

            ) ?? [])
            .filter((item): item is {atp_id: number; atp_description: string; skorAtp: number } => item !== undefined);
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

        const collectionAtp:StrukturAtpType[]=[];
        const collectionCp: StrukturCpType[]=[];
        const collectionTp: StrukturTpType[]=[];
        return {
            mapel:mapelInterface,
            nilaiRaport: tempNilaiRaporRespon,
            atpDescriptionRefrence: getMaxMinAtp,
            tpDescriptionRefrence: getMaxMinTp,
            cpDescriptionRefrence: getMaxMinCp,
            source,
            nilaiRaportAtp:null,
            nilaiRaportTp:null,
            nilaiRaportCp:null,
            collectionAtp,
            collectionTp,
            collectionCp,
            // kdMaks,
            // kdMin,
            // kdMaksDescription,
            // kdMinDescription,
            // idKdMaks,
            // idKdMin,
        }
    }
    createNilaiRaportSheetKd(idSiswa:number, mapelInterface:InterfaceMapel, koleksiKategoriAssesmen:KategoriTagihanType[]): NilaiRaportInterface{
        const {kode} = mapelInterface;
        const dataNilaiRaportSheetKd:NilaiRaportInterface[] = [];
        const source:SourceNilaiKatetoriTagihanType[] = [];

        let tempNilaiRaporRespon:number|null = null;
        let totalMapelAccumulator: number|null = null;
        let countInstrumen: number = 0;
        
        for(const kategoriAssesmen of koleksiKategoriAssesmen){
            const foundKategoriAssesmInDataKategoriAssesmen = this.dataKategoriAssesmen.find(s=>s.type === kategoriAssesmen) ;

            if(foundKategoriAssesmInDataKategoriAssesmen){
                const {type, data, koleksiAtpInMapel, koleksiPaketSoal} = foundKategoriAssesmInDataKategoriAssesmen;
                const strukturKurikulum = koleksiAtpInMapel.find(s=>s.kodeMapel === kode)
                const foundCurrenMapelData = data.find(s=>s.mapel === kode);
                
                if(foundCurrenMapelData){
                    const foundSiswa = foundCurrenMapelData.dataNilai.find(s=>s.idSiswa === idSiswa);

                    if(foundSiswa){
                        const {mapel:collectionNIlaiMapel, memberOfTagihan} = foundSiswa;
                        let nilai: number|null = null;
                        if(collectionNIlaiMapel){
                            const {totalMapel_sheet:totalMapel, skorMapel_sheet:skorMapel, countSoalMapel_sheet:countSoalMapel} = collectionNIlaiMapel
                            nilai = skorMapel;
                            // totalMapelAccumulator = jmlAman((totalMapelAccumulator ?? 0) , (totalMapel ?? 0));
                            totalMapelAccumulator = Decimal.sum((totalMapelAccumulator ?? 0) , (totalMapel ?? 0)).toNumber();
                            countInstrumen += countSoalMapel;
                        }
                        source.push({
                            type,
                            nilai,
                            collectionsData: collectionNIlaiMapel,
                            strukturKurikulum
                        })
                    }else{
                        source.push({
                            type:kategoriAssesmen,
                            nilai:null,
                            // strukturKurikulum
                        })
                    }
                }else{
                    source.push({
                        type:kategoriAssesmen,
                        nilai:null,
                        // strukturKurikulum
                    })
                }
            }else{
                source.push({
                    type:kategoriAssesmen,
                    nilai:null,
                    // strukturKurikulum
                })
            }

        }
        
        if(totalMapelAccumulator !==null){
            tempNilaiRaporRespon = Math.round(totalMapelAccumulator/countInstrumen);
        }
        
        const cpCollection = source.filter(s=>Boolean(s.collectionsData)).flatMap(m=>m.collectionsData?.dataCp_sheet?.map(({cp_id, cp_description, skorCp})=>({cp_id, cp_description, skorCp})) ?? [])
            .filter((item): item is {cp_id: number; cp_description: string; skorCp: number} => item.skorCp !== null);
        const tpCollection = source
            .filter(s=>Boolean(s.collectionsData))
            .flatMap(m=>m.collectionsData?.dataCp_sheet
                .flatMap(tp=>tp.koleksiTp?.map(({tp_id, tp_description, skorTp})=>({tp_id, tp_description, skorTp})) ?? []) ?? [])
            .filter((item): item is {tp_id: number; tp_description: string; skorTp: number} => item !== undefined && item.skorTp !== null);
        const atpCollection = source
            .filter(s=>Boolean(s.collectionsData))
            .flatMap(m=>m.collectionsData?.dataCp_sheet.flatMap(tp=>
                tp.koleksiTp.flatMap(atp=>atp?.koleksiAtp?.map(({atp_id, atp_description, skorAtp})=>({atp_id, atp_description, skorAtp})) ?? [])
            ) ?? [])
            .filter((item): item is {atp_id: number; atp_description: string; skorAtp: number } => item !== undefined);
        
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

        
        const collectionAtp:StrukturAtpType[] = [];
        const collectionTp:StrukturTpType[]=[];
        const collectionCp:StrukturCpType[]=[];
        return {
            mapel:mapelInterface,
            nilaiRaport: tempNilaiRaporRespon,
            atpDescriptionRefrence: getMaxMinAtp,
            tpDescriptionRefrence: getMaxMinTp,
            cpDescriptionRefrence: getMaxMinCp,
            source,
            nilaiRaportAtp:null,
            nilaiRaportCp:null,
            nilaiRaportTp:null,
            collectionAtp,
            collectionTp,
            collectionCp

           
        }
    }
    
    init():this{
        console.log({kategoriAssesmen: this.dataKategoriAssesmen})
        this.buildNilaiRaportRombel();
        return this;
    }


    static RekapRaporFromMapper(mapper:TagihanHasDataResponseMapperBuilder, mapelRombel:jp_mapelApp[]):MapelWithNilaiRaportRombel[]{
        
        const koleksiMapelMapper = mapper.mapelMapperWithTagihanHasDataResponse;
        const strukturKurikulumRaport = mapper.strukturKurikulumWithSlot;
        const sumberRespon = mapper.siswaAsRespondenHasResponTagihan;
        const sumberSheetKd = mapper.siswaHasSheetKd;
         const dataMapelWithNilaiRaportSiswa:MapelWithNilaiRaportRombel[]=[];
        for(const mapel of mapelRombel){
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
             
            
            const collectionAtp :StrukturAtpType[]=[];
            const collectionCp  : StrukturCpType[]=[];
            const collectionTp  : StrukturTpType[]=[];
            const objCurrentMapel:MapelWithNilaiRaportRombel ={
                mapel:mapelInterface,
                raportSiswa,
                strukturKurikulumRaport:kurikulumCurrentMapel,
                sourceTagihan: currentKoleksiTagihan ?? [],
                collectionAtp,
                collectionCp ,
                collectionTp 
            };
        
            dataMapelWithNilaiRaportSiswa.push(objCurrentMapel);
        }
        return dataMapelWithNilaiRaportSiswa;
    }


}