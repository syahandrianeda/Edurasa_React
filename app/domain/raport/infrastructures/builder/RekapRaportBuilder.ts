import TagihanHasDataResponseMapperBuilder from "~/domain/TagihanHasDataResponMapper/TagihanHasDataResponMapperBuilder";
import type { MapelWithNilaiRaportRombel, RaportRombelAsal } from "../../RekapRaportAsal";
import type { NilaiRaportInterface } from "../../types/RaportIntarface";
import Decimal from "node_modules/decimal.js/decimal";
import type { StrukturAtpType, StrukturCpType, StrukturTpType } from "~/domain/trees-struktur-kurikulum";
import type { SkorKdNullableType } from "~/domain/penilaian/type/SkorKdType";
import AtpWithBankSoal from "~/domain/atp-mapper/_AtpWithBankSoal";
import type { DataCurrentInstrumen, KoleksiSktrukturWithSourceSkorAndStateMaxMin, KoleksiStrukturWithSourceSkor, SourceInstrumenSkor } from "./KoleksiStrukturWithSourceSkor";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";
import type { DataKdSheetApp } from "~/types/penilaian/DataKdSheetAppType";
import { getMinMax, type MinMaxResult } from "~/lib/get-min-max-on-array-object";
import calculateNilaiRaportKompetensi from "../accumulator-nilai/CalculateNilaiRaportKompetensi";
import { collectingSkorResponPerInstrumenAllTagihan, collectingSkorSheetKdPerInstrumenAllTagihan } from "./ResolveSkorSheetKd";

export default class RekapRaportBuilder{

    static buildFromMapperTagihanBuilder(mapper:TagihanHasDataResponseMapperBuilder):MapelWithNilaiRaportRombel[]{
        const result:MapelWithNilaiRaportRombel[] = [];
        const koleksiMapelRombel = mapper.ListMapelRaport;
        const kurikulumMapperByMapel = mapper.strukturKurikulum;
        const siswaHasInstrumenSkor = mapper.SiswaHasInstrumenWithSkor;
        const mapelHasTagihan = mapper.mapelMapperWithTagihanHasDataResponse;
        const mapelHasKategoriAssesmen = mapper.kategoriAssesmenHasTagihan
        

        for(const mapel of koleksiMapelRombel){
            /** 
             * mapel ini mempunya beberapa data, salah satunya adalah `data_students` yang mengindikasikan siswa tersebut 
             * adalah member dari mapel tersebut.
             * 
             * `source` adalah data detail mapel, termasuk nama kelompok, jenis mapel, penganut, dll.
            */
            const {source, data_students:memberMapel} = mapel;

            /** tentukan struktur kurikulum pada mapel ini yang sudah dilakukan di seluruh tagihan */
            const currentKurikulumMapel = kurikulumMapperByMapel.get(mapel.kode);

            /** mapel ini mempunyai sumber tagihan sbb: Kemudian `push` ke result sebagai sourceTagihan itu sendiri */
            const sourceTagihan = mapelHasTagihan.get(mapel.kode) ?? [];

            /** definisikan raportSiswa sebagai data Raport mapel ini di masing-masing siswa */
            
            
            const raportSiswa: RaportRombelAsal[] = [];
            
        
            for(const siswa of memberMapel){
                
                /** set siswa saat ini yang mempunyai data respon (siswa yang mengikuti seluruh tagihan)  
                 * baik itu mengerjakan langsung tagihan atau dibantu guru, termasuk import nilai;
                 * semua data siswa tetap terdeteksi, baik siswa yang belum pernah sama sekali mengerjakan semua tagihan
                */
                const currentSiswaWhoseHaveSkor = siswaHasInstrumenSkor.get(siswa.id);
                
                /** property yang harus dimiliki `raportSiswa` */
                const dataNilaiRaportResponSiswa:NilaiRaportInterface = Object.create(null);
                const dataNilaiRaportSheetKd:NilaiRaportInterface = Object.create(null);

                /** definisikan mapel aja dulu */
                dataNilaiRaportResponSiswa.mapel = source;
                dataNilaiRaportSheetKd.mapel = source;

                /** 
                 * property `nilaiRaport` berikut sebenarnya tidak berlaku.  Awalnya ini digunakan untuk 
                 * mendapatkan niali akhir raport yang dihasilkan dari perhitungan rata-rata dari jumlah skor tiap instrumen soal.
                 * Data ini masih bisa digunakan ketika untuk mengetahui nilai akhir dari instrumen soal (nilai real)
                 * Sementara itu, NILAI AKHIR YANG BERLAKU mengikuti aturan dari Panduan Penilaian Kemendikdasmen. Dan itu berdasarkan
                 * struktur kurikulum yang dipilih user
                 * 
                */
                const nilaiRapor:number|null = null;
                /**
                 * property berikut adalah milik type `NilaiRaportInterface`
                 * ------------------------------------------------------
                     nilaiRaport: number|null;
                     nilaiRaportAtp:number|null;
                     nilaiRaportCp:number|null;
                     nilaiRaportTp:number|null;
                     
                     atpDescriptionRefrence?: MakMinAtp
                     tpDescriptionRefrence?: MakMinTp
                     cpDescriptionRefrence?: MakMinCp

                 
                 */
                
                
                const respon_koleksiAtp: KoleksiStrukturWithSourceSkor[]=[];
                const respon_koleksiTp: KoleksiStrukturWithSourceSkor[]=[];
                const respon_koleksiCp: KoleksiStrukturWithSourceSkor[]=[];

                const sheet_koleksiAtp: KoleksiStrukturWithSourceSkor[]=[];
                const sheet_koleksiTp: KoleksiStrukturWithSourceSkor[]=[];
                const sheet_koleksiCp: KoleksiStrukturWithSourceSkor[]=[];
                
                if(currentKurikulumMapel){
                    const {kodeMapel, mapelName, dataCpMapper} = currentKurikulumMapel;
                    const collectionAtp:StrukturAtpType[]=[];
                    const collectionTp:StrukturTpType[]=[];
                    const collectionCp:StrukturCpType[]=[];

                   /** levelCp */
                   for(const cpMapper of dataCpMapper.values()){
                        const {cp_id, cp_description, dataTpMapper} = cpMapper;
                        const sheet_sourceKoleksiSkorTiapInstrumenCp:(number|null)[] = [];
                        const sheet_sourceInstrumenSkorCp:SourceInstrumenSkor[]=[];
                        const sheet_sourceItemInstrumenSkorCp:DataCurrentInstrumen[]=[];;
                        let sheet_countInstrumenCp:number = 0;
                        const respon_sourceKoleksiSkorTiapInstrumenCp:(number|null)[] = [];
                        const respon_sourceInstrumenSkorCp:SourceInstrumenSkor[]=[];
                        const respon_sourceItemInstrumenSkorCp:DataCurrentInstrumen[]=[];;
                        let respon_countInstrumenCp:number = 0;

                        const sourceResponCp: RisponsePenilaianSiswa[]=[]
                        const sourceSheetKdCp: DataKdSheetApp[]=[]
                        

                        collectionCp.push({ cp_id, cp_description })

                        
                        
                        /** levelTP */
                        for(const tpMapper of dataTpMapper.values()){
                            const {tp_id, tp_description, dataAtpMapper} = tpMapper;
                            const sourceResponTp: RisponsePenilaianSiswa[]=[]
                            const sourceSheetKdTp: DataKdSheetApp[]=[];
                            const sheet_sourceInstrumenSkorTp:SourceInstrumenSkor[]=[];
                            const sheet_sourceItemInstrumenSkorTp:DataCurrentInstrumen[]=[];
                            const sheet_sourceKoleksiSkorTiapInstrumenTp:(number|null)[]=[];
                            let sheet_countInstrumenTp:number = 0
                            const respon_sourceInstrumenSkorTp:SourceInstrumenSkor[]=[];
                            const respon_sourceItemInstrumenSkorTp:DataCurrentInstrumen[]=[];
                            const respon_sourceKoleksiSkorTiapInstrumenTp:(number|null)[]=[];
                            let respon_countInstrumenTp:number = 0

                            collectionTp.push({tp_id,tp_description});
                            
                            /**levelATP */
                            for(const atpAmpper of dataAtpMapper.values()){
                                const {atp_id, atp_description} =atpAmpper;
                                collectionAtp.push(atpAmpper)

                                /**
                                 * WORKSPCE
                                 * ----------------
                                 */

                                const sumberNilaiCurrentSiswa = currentSiswaWhoseHaveSkor?.atpMapperTagihanWithInstrumen.get(atp_id);
                                // const tagihanMapper = currentSiswaWhoseHaveSkor?.tagihanMapper.get(atp_id);
                                const dataRespon = sumberNilaiCurrentSiswa?.sourceRespon ?? [];
                                const dataSheetKd = sumberNilaiCurrentSiswa?.sourceSheetKd ?? [];
                                const tagihanMapper = sumberNilaiCurrentSiswa?.tagihan ?? [];
                                const instrumen = sumberNilaiCurrentSiswa?.instrumenSoal ?? [];
                                const instrumenSheet = sumberNilaiCurrentSiswa?.instrumenSoalSheet ?? [];
                                const tagihanAtpMapper = currentSiswaWhoseHaveSkor?.tagihanMapper;
                                const koleksiSoalByAtpInTagihan = AtpWithBankSoal.buildMapper(tagihanMapper);

                                sourceResponTp.push(...dataRespon);
                                sourceSheetKdTp.push(...dataSheetKd);
                                sourceResponCp.push(...dataRespon);
                                sourceSheetKdCp.push(...dataSheetKd);
                                /** respon */
                                let respon_countInstrumen:number = 0;
                                const respon_sourceInstrumenSkor: SourceInstrumenSkor[] = [];
                                const respon_sourceItemInstrumenSkor: DataCurrentInstrumen[] = [];
                                const respon_sourceKoleksiSkorTiapInstrumen: (number | null)[] = [];
                                /** sheet*/
                                let sheet_countInstrumen:number =0
                                const sheet_sourceInstrumenSkor: SourceInstrumenSkor[] = [];
                                const sheet_sourceItemInstrumenSkor: DataCurrentInstrumen[] = []
                                const sheet_sourceKoleksiSkorTiapInstrumen: (number | null)[] = [];
                                
                                const respon_koleksiSkorInstrumen:(Decimal|null)[] = collectingSkorResponPerInstrumenAllTagihan(siswa.id, atp_id, instrumenSheet);
                                const sheet_koleksiSkorInstrumen:(Decimal|null)[] = collectingSkorSheetKdPerInstrumenAllTagihan(siswa.id, atp_id, instrumenSheet);
                            
                                const respon_koleksiSkorSkipNull = respon_koleksiSkorInstrumen.filter(s=>s!==null);
                                const sheet_koleksiSkorSkipNull = sheet_koleksiSkorInstrumen.filter(s=>s!==null);
                            
                                const respon_jumlahSkor = respon_koleksiSkorSkipNull.length === 0? 0 : Decimal.sum(...respon_koleksiSkorSkipNull).toDecimalPlaces(0).toNumber();
                                const sheet_jumlahSkor = sheet_koleksiSkorSkipNull.length === 0? 0: Decimal.sum(...sheet_koleksiSkorSkipNull).toDecimalPlaces(0).toNumber();
                                const isEqual = respon_jumlahSkor === sheet_jumlahSkor;
                                for(const sheet_instrumen of instrumenSheet){
                                    const {koleksiSkor, soalSkor, tagihan} = sheet_instrumen;
                                   
                                    /**
                                     * Misal, suatu respon dengan currentAtp ini memiliki data skor tiap instrumen sbb: 
                                     * [100, 0, 100] = 200 di tagihan A,
                                     * [100, 90] = 190;
                                     * total jumlah = 390, dan skornya 390/5 = 78;
                                     * maka skor 78 itu skor seluruhanya di seluruh tagihan.
                                     * sementara itu, untuk `tagihan` saat ini (nilai 200 atau 190), kita harus mendeteksinya di currentTagihan saat ini;
                                     */
                                    
                                    const currentDataSheetKd = tagihan.dataSkorKdSheet.find(s=>s.siswa_id === siswa.id)?.data ?? [];
                                    const currentDataRespon = tagihan.data_response_bySiswa.find(s=>s.siswa.id === siswa.id)?.data?.at(-1);
                                    
                                    const jumlahSoalCurrentAtpInThisTagihan = tagihan.bank_soal_collections.filter(s=>s.kd_id === atp_id).length;

                                    const skorTiapInstrumen =dataSheetKd.find(s=>s.publikasi_id ===  tagihan.idbaris)?.skor ?? null;

                                    const koleksiSoalSkor:DataCurrentInstrumen[] = [];

                                    for(const itemSoalSkor of soalSkor){
                                        const {bentukSoal, data, source} = itemSoalSkor;

                                        
                                        for(const bankSoalWIthNoSoalAndSkor of data){
                                            const {no_soal, skor, kd_id, bentuk_soal} = bankSoalWIthNoSoalAndSkor;
                                            const skorRealCurrentInstrumen =  dataRespon.find(s=>s.atp === kd_id && 
                                                    s.no_prefix === no_soal && 
                                                    s.bentuk_soal === bentuk_soal
                                                )?.skor ?? null;

                                            
                                            let skorFinal:number|null = null;
                                            
                                            if(isEqual){
                                                skorFinal = skorRealCurrentInstrumen
                                                
                                            }else{
                                                if(source === 'siswa'){
                                                    if(dataSheetKd.length>0){
                                                        skorFinal = skorTiapInstrumen
                                                    }else{
                                                        skorFinal=null;
                                                    }
                                                }else{
                                                    if(respon_jumlahSkor === sheet_jumlahSkor){
                                                        skorFinal = skorRealCurrentInstrumen

                                                    }else{
                                                        skorFinal = skorTiapInstrumen

                                                    }
                                                }
                                            }
                                            let ob:DataCurrentInstrumen = {
                                                    atp_id:kd_id,
                                                    tagihan,
                                                    no_soal,
                                                    skor:skorRealCurrentInstrumen ,
                                                    skorSheetKd: skorFinal ,//skorPerInstrumen ,
                                                    bentuk_soal,
                                                    source
                                                }

                                            sheet_sourceKoleksiSkorTiapInstrumen.push(skorFinal);
                                            sheet_sourceKoleksiSkorTiapInstrumenTp.push(skorFinal);
                                            sheet_sourceKoleksiSkorTiapInstrumenCp.push(skorFinal);
                                            sheet_sourceItemInstrumenSkor.push(ob);
                                            sheet_sourceItemInstrumenSkorCp.push(ob)
                                            sheet_sourceItemInstrumenSkorTp.push(ob);
                                            koleksiSoalSkor.push(ob);

                                            if(currentDataRespon){
                                                respon_sourceKoleksiSkorTiapInstrumen.push(skorRealCurrentInstrumen)
                                                respon_sourceKoleksiSkorTiapInstrumenTp.push(skorRealCurrentInstrumen)
                                                respon_sourceKoleksiSkorTiapInstrumenCp.push(skorRealCurrentInstrumen)
                                                
                                                
                                                sheet_sourceItemInstrumenSkor.push(ob);
                                                sheet_sourceItemInstrumenSkorTp.push(ob);
                                                sheet_sourceItemInstrumenSkorCp.push(ob);
                                            }


                                        }

                                        
                                        sheet_countInstrumen = Decimal.sum(sheet_countInstrumen, data.length).toNumber();
                                        sheet_countInstrumenTp = Decimal.sum(sheet_countInstrumenTp, data.length).toNumber();
                                        sheet_countInstrumenCp = Decimal.sum(sheet_countInstrumenCp, data.length).toNumber();
                                        if(currentDataRespon){
                                            respon_countInstrumen = Decimal.sum(respon_countInstrumen, data.length).toNumber();
                                            respon_countInstrumenTp = Decimal.sum(respon_countInstrumenTp, data.length).toNumber();
                                            respon_countInstrumenCp = Decimal.sum(respon_countInstrumenCp, data.length).toNumber();
                                        }
                                        
                                    };
                                    sheet_sourceInstrumenSkor.push({ tagihan, soalSkor:koleksiSoalSkor });
                                    sheet_sourceInstrumenSkorTp.push({ tagihan, soalSkor:koleksiSoalSkor });
                                    sheet_sourceInstrumenSkorCp.push({ tagihan, soalSkor:koleksiSoalSkor });
                                    
                                    if(currentDataRespon){
                                        respon_sourceInstrumenSkor.push({tagihan,soalSkor:koleksiSoalSkor})
                                        respon_sourceInstrumenSkorTp.push({tagihan,soalSkor:koleksiSoalSkor})
                                        respon_sourceInstrumenSkorCp.push({tagihan,soalSkor:koleksiSoalSkor})

                                    }

                                };

                                const sheet_sourceKoleksiSkorTiapInstrumenNumber = sheet_sourceKoleksiSkorTiapInstrumen.map(m=>Number(m));
                                const sheet_totalSkor:number|null = (sheet_sourceKoleksiSkorTiapInstrumen.length === 0|| sheet_sourceKoleksiSkorTiapInstrumen.every(s=>s === null))?null
                                : Decimal.sum(...sheet_sourceKoleksiSkorTiapInstrumenNumber).toDecimalPlaces(0).toNumber();
                                ;
                                const sheet_skor:number|null = sheet_totalSkor === null? null : Decimal(sheet_totalSkor).div(sheet_countInstrumen).toDecimalPlaces(2).toNumber();
                                
                                
                                /** sheet*/
                                // let respon_countInstrumen:number = 0;
                                
                                // const respon_sourceInstrumenSkor: SourceInstrumenSkor[] = [];
                                // const respon_sourceItemInstrumenSkor: DataCurrentInstrumen[] = [];
                                // const respon_sourceKoleksiSkorTiapInstrumen: (number | null)[] = [];
                                
                                // for(const inst of instrumen){
                                //     const {koleksiSkor, soalSkor, tagihan} = inst;
                                    
                                //     /** */
                                //     const foundKoleksiSkorInstrumen = instrumenSheet.find(s=>s.tagihan.idbaris === tagihan.idbaris);
                                //     const dataSkorInstrumen = foundKoleksiSkorInstrumen?.koleksiSkor;
                                //     const koleksiSkorResponNumber = dataSkorInstrumen?.map(Number) ?? [];
                                //     const jumlahSkorRespon  = (koleksiSkorResponNumber.length === 0 || dataSkorInstrumen?.every(m=>m === null)) ? 0 : Decimal.sum(...koleksiSkorResponNumber).times(koleksiSkor.length).toDecimalPlaces(0).toNumber();
                                //     const skorPerInstrumen = Decimal(jumlahSkorRespon).div(koleksiSkorResponNumber.length).toDecimalPlaces(2).toNumber();

                                //     const koleksiSkorSheetNumber = koleksiSkor.map(Number);
                                //     const koleksiSoalSheet = soalSkor.flatMap(m=>m.data)
                                //     const jumlahSkorSheetKd = koleksiSkor.length === 0 || koleksiSkor.every(m=>m === null) ?  0 : Decimal.sum(...koleksiSkorSheetNumber).toDecimalPlaces(0).toNumber();
                                //     /** */

                                //     for(const itemSoalSkor of soalSkor){
                                //         const {bentukSoal, data, source} = itemSoalSkor
                                //         respon_countInstrumen = Decimal.sum(respon_countInstrumen, data.length).toNumber();
                                //         respon_countInstrumenTp = Decimal.sum(respon_countInstrumenTp, data.length).toNumber();
                                //         respon_countInstrumenCp = Decimal.sum(respon_countInstrumenCp, data.length).toNumber();
                                //         /** */
                                        
                                //         /** */
                                //         const koelksiSoalSkorRespon:DataCurrentInstrumen[]=[]
                                //         for(const bankSoalWIthNoSoalAndSkor of data){
                                //             const {no_soal, skor, kd_id, bentuk_soal} = bankSoalWIthNoSoalAndSkor;
                                            
                                //             // respon_totalSkor = Decimal.sum(respon_totalSkor??0, skor??0).toNumber();

                                //             respon_sourceKoleksiSkorTiapInstrumen.push(skor);
                                //             respon_sourceKoleksiSkorTiapInstrumenTp.push(skor);
                                //             respon_sourceKoleksiSkorTiapInstrumenCp.push(skor);
                                //             const skorFinal = jumlahSkorRespon === jumlahSkorSheetKd ? skor : skorPerInstrumen
                                //             const obDataCurrentInstrumen:DataCurrentInstrumen = {
                                //                 atp_id:kd_id,
                                //                 no_soal,
                                //                 bentuk_soal,
                                //                 tagihan,
                                //                 skor,
                                //                 skorSheetKd:  skorFinal,
                                //                 source
                                //             }
                                //             respon_sourceItemInstrumenSkor.push(obDataCurrentInstrumen);
                                //             respon_sourceItemInstrumenSkorTp.push(obDataCurrentInstrumen);
                                //             respon_sourceItemInstrumenSkorCp.push(obDataCurrentInstrumen);
                                          
                                //             koelksiSoalSkorRespon.push(obDataCurrentInstrumen);
                                //           };
                                //         respon_sourceInstrumenSkor.push({ tagihan, soalSkor:koelksiSoalSkorRespon })
                                //         respon_sourceInstrumenSkorTp.push({ tagihan, soalSkor:koelksiSoalSkorRespon })
                                //         respon_sourceInstrumenSkorCp.push({ tagihan, soalSkor:koelksiSoalSkorRespon })

                                //     }
                                // }
                            const respon_totalSkorNumber = respon_sourceKoleksiSkorTiapInstrumen.map(Number);
                            const respon_totalSkor:number|null = (respon_sourceKoleksiSkorTiapInstrumen.length === 0|| respon_sourceKoleksiSkorTiapInstrumen.every(s=>s === null))?null
                                    : Decimal.sum(...respon_totalSkorNumber).toNumber();
                            const respon_skor:number|null = respon_totalSkor === null? null : Decimal(respon_totalSkor).div(respon_countInstrumen).toDecimalPlaces(2).toNumber();;
                            
                                respon_koleksiAtp.push({
                                    //--------------
                                    type:'atp',
                                    struktur:atpAmpper,
                                    totalSkor: respon_totalSkor,
                                    countInstrumen: respon_countInstrumen,
                                    skor: respon_skor,
                                    sourceInstrumenSkor:respon_sourceInstrumenSkor,
                                    sourceItemInstrumenSkor: respon_sourceItemInstrumenSkor,
                                    sourceKoleksiSkorTiapInstrumen: respon_sourceKoleksiSkorTiapInstrumen,
                                    sourceRespon:dataRespon,
                                    sourceSheetKd:dataSheetKd,
                                    
                                });
                                sheet_koleksiAtp.push({
                                    //--------
                                    type:'atp',
                                    struktur:atpAmpper,
                                    totalSkor: sheet_totalSkor,
                                    countInstrumen: sheet_countInstrumen,
                                    skor: sheet_skor,
                                    sourceInstrumenSkor:sheet_sourceInstrumenSkor,
                                    sourceItemInstrumenSkor: sheet_sourceItemInstrumenSkor,
                                    sourceKoleksiSkorTiapInstrumen: sheet_sourceKoleksiSkorTiapInstrumen,
                                    sourceRespon:dataRespon,
                                    sourceSheetKd:dataSheetKd,
                                    //-------------
                                   
                                });
                            };
                            const respon_totalSkorTpNumber = respon_sourceKoleksiSkorTiapInstrumenTp.map(Number);
                            const respon_totalSkorTp:number|null = (respon_sourceKoleksiSkorTiapInstrumenTp.length === 0|| respon_sourceKoleksiSkorTiapInstrumenTp.every(s=>s === null))?null
                                    : Decimal.sum(...respon_totalSkorTpNumber).toNumber();
                            const respon_skorTp:number|null = respon_totalSkorTp === null? null : Decimal(respon_totalSkorTp).div(respon_countInstrumenTp).toDecimalPlaces(2).toNumber();;
                            
                            
                            respon_koleksiTp.push({
                                    type:'tp',
                                    struktur:{tp_id, tp_description},
                                    totalSkor: respon_totalSkorTp,
                                    countInstrumen: respon_countInstrumenTp,
                                    skor: respon_skorTp,
                                    sourceInstrumenSkor:respon_sourceInstrumenSkorTp,
                                    sourceItemInstrumenSkor: respon_sourceItemInstrumenSkorTp,
                                    sourceKoleksiSkorTiapInstrumen: respon_sourceKoleksiSkorTiapInstrumenTp,
                                    sourceRespon:sourceResponTp,
                                    sourceSheetKd:sourceSheetKdTp,
                                    
                                });

                            const koleksiSkorTiapInstrumen = sheet_sourceKoleksiSkorTiapInstrumenTp.map(Number);
                            const sheet_totalSkorTp:number|null = (sheet_sourceKoleksiSkorTiapInstrumenTp.length === 0|| sheet_sourceKoleksiSkorTiapInstrumenTp.every(s=>s === null))?null
                                    : Decimal.sum(...koleksiSkorTiapInstrumen).toNumber();
                            const sheet_skorTp:number|null = sheet_totalSkorTp === null? null : Decimal(sheet_totalSkorTp).div(sheet_countInstrumenTp).toDecimalPlaces(2).toNumber();;
                            
                            sheet_koleksiTp.push({
                                    //--------
                                    type:'tp',
                                    struktur:{tp_id, tp_description},
                                    totalSkor: sheet_totalSkorTp,
                                    countInstrumen: sheet_countInstrumenTp,
                                    skor: sheet_skorTp,
                                    sourceInstrumenSkor:sheet_sourceInstrumenSkorTp,
                                    sourceItemInstrumenSkor: sheet_sourceItemInstrumenSkorTp,
                                    sourceKoleksiSkorTiapInstrumen: sheet_sourceKoleksiSkorTiapInstrumenTp,
                                    sourceRespon:sourceResponTp,
                                    sourceSheetKd:sourceSheetKdTp,
                                    //-------------
                                   
                                });
                        }
                        
                        const respon_totalSkorTpNumberCp = respon_sourceKoleksiSkorTiapInstrumenCp.map(Number);
                        const respon_totalSkorCp:number|null = (respon_sourceKoleksiSkorTiapInstrumenCp.length === 0|| respon_sourceKoleksiSkorTiapInstrumenCp.every(s=>s === null))?null
                                : Decimal.sum(...respon_totalSkorTpNumberCp).toNumber();
                        const respon_skorCp:number|null = respon_totalSkorCp === null? null : Decimal(respon_totalSkorCp).div(respon_countInstrumenCp).toDecimalPlaces(2).toNumber();;
                        
                        
                        respon_koleksiCp.push({
                                type:'cp',
                                struktur:{cp_id, cp_description},
                                totalSkor: respon_totalSkorCp,
                                countInstrumen: respon_countInstrumenCp,
                                skor: respon_skorCp,
                                sourceInstrumenSkor:respon_sourceInstrumenSkorCp,
                                sourceItemInstrumenSkor: respon_sourceItemInstrumenSkorCp,
                                sourceKoleksiSkorTiapInstrumen: respon_sourceKoleksiSkorTiapInstrumenCp,
                                sourceRespon:sourceResponCp,
                                sourceSheetKd:sourceSheetKdCp,
                                
                            });
                        
                        const koleksiSkorTiapInstrumen = sheet_sourceKoleksiSkorTiapInstrumenCp.map(Number);
                        const sheet_totalSkorCp:number|null = (sheet_sourceKoleksiSkorTiapInstrumenCp.length === 0|| sheet_sourceKoleksiSkorTiapInstrumenCp.every(s=>s === null))?null
                                : Decimal.sum(...koleksiSkorTiapInstrumen).toNumber();
                        const sheet_skorCp:number|null = sheet_totalSkorCp === null? null : Decimal(sheet_totalSkorCp).div(sheet_countInstrumenCp).toDecimalPlaces(2).toNumber();;
                        sheet_koleksiCp.push({
                                //--------
                                type:'cp',
                                struktur:{cp_id, cp_description},
                                totalSkor: sheet_totalSkorCp,
                                countInstrumen: sheet_countInstrumenCp,
                                skor: sheet_skorCp,
                                sourceInstrumenSkor:sheet_sourceInstrumenSkorCp,
                                sourceItemInstrumenSkor: sheet_sourceItemInstrumenSkorCp,
                                sourceKoleksiSkorTiapInstrumen: sheet_sourceKoleksiSkorTiapInstrumenCp,
                                sourceRespon:sourceResponCp,
                                sourceSheetKd:sourceSheetKdCp,
                                //-------------
                               
                            });
                            
                   }

                   
                   dataNilaiRaportResponSiswa.skorKd_atp  = this.buildSkorKdNullable(kodeMapel, respon_koleksiAtp);
                   dataNilaiRaportResponSiswa.skorKd_tp  = this.buildSkorKdNullable(kodeMapel, respon_koleksiTp);
                   dataNilaiRaportResponSiswa.skorKd_cp  = this.buildSkorKdNullable(kodeMapel, respon_koleksiCp);
                   let koleksiTotalSkor = respon_koleksiAtp.map(m=>m.totalSkor);
                   let totalInstrumen = respon_koleksiAtp.length === 0 ? 0: Decimal.sum(...respon_koleksiAtp.map(n=>n.countInstrumen))
                   let nilaiRaportBasedOnInstrumen = (koleksiTotalSkor.length === 0 || koleksiTotalSkor.every(m=>m === null))? null : Decimal.sum(...koleksiTotalSkor.map(n=>n ?? 0)).div(totalInstrumen).toNumber();
                   dataNilaiRaportResponSiswa.nilaiRaport = nilaiRaportBasedOnInstrumen;
                   dataNilaiRaportResponSiswa.nilaiRaportAtp =calculateNilaiRaportKompetensi(this.buildSkorKdNullable(kodeMapel, respon_koleksiAtp))
                   dataNilaiRaportResponSiswa.nilaiRaportTp =calculateNilaiRaportKompetensi(this.buildSkorKdNullable(kodeMapel, respon_koleksiTp))
                   dataNilaiRaportResponSiswa.nilaiRaportCp =calculateNilaiRaportKompetensi(this.buildSkorKdNullable(kodeMapel, respon_koleksiCp))

                   const MaxMinAtp = getMinMax(respon_koleksiAtp, 'skor');
                   const MaxMinTp = getMinMax(respon_koleksiTp, 'skor');
                   const MaxMinCp = getMinMax(respon_koleksiCp, 'skor');
                   
                   dataNilaiRaportResponSiswa.sourceKoleksiStrukturAtp= this.buildMaxMinKoleksiStruktur(MaxMinAtp, respon_koleksiAtp);
                   dataNilaiRaportResponSiswa.sourceKoleksiStrukturTp= this.buildMaxMinKoleksiStruktur(MaxMinTp,respon_koleksiTp);
                   dataNilaiRaportResponSiswa.sourceKoleksiStrukturCp= this.buildMaxMinKoleksiStruktur(MaxMinCp,respon_koleksiCp);
                   dataNilaiRaportResponSiswa.collectionAtp=collectionAtp;
                   dataNilaiRaportResponSiswa.collectionTp=collectionTp;
                   dataNilaiRaportResponSiswa.collectionCp=collectionCp;
                   


                   const skorKd_atp_respon = this.buildSkorKdNullable(kodeMapel, sheet_koleksiAtp);
                   const skorKd_tp_respon = this.buildSkorKdNullable(kodeMapel, sheet_koleksiTp);
                   const skorKd_cp_respon = this.buildSkorKdNullable(kodeMapel, sheet_koleksiCp);

                   dataNilaiRaportSheetKd.skorKd_atp    = skorKd_atp_respon;
                   dataNilaiRaportSheetKd.skorKd_tp     = skorKd_tp_respon;
                   dataNilaiRaportSheetKd.skorKd_cp     = skorKd_cp_respon;

                   let koleksiTotalSkorSheet = sheet_koleksiAtp.map(m=>m.totalSkor);
                   let totalInstrumenSheet = sheet_koleksiAtp.length === 0 ? 0 :  Decimal.sum(...sheet_koleksiAtp.map(n=>n.countInstrumen))
                   let nilaiRaportBasedOnInstrumenSheet = (koleksiTotalSkorSheet.length === 0 || koleksiTotalSkorSheet.every(m=>m === null))? null : Decimal.sum(...koleksiTotalSkorSheet.map(n=>n ?? 0)).div(totalInstrumenSheet).toNumber();
                   dataNilaiRaportSheetKd.nilaiRaport = nilaiRaportBasedOnInstrumenSheet;
                   


                   
                   dataNilaiRaportSheetKd.nilaiRaportAtp     = calculateNilaiRaportKompetensi(skorKd_atp_respon);
                   dataNilaiRaportSheetKd.nilaiRaportTp     = calculateNilaiRaportKompetensi(skorKd_tp_respon);
                   dataNilaiRaportSheetKd.nilaiRaportCp     = calculateNilaiRaportKompetensi(skorKd_cp_respon);

                   const MaxMinAtpSheet  = getMinMax(sheet_koleksiAtp, 'skor');
                   const MaxMinTpSheet  = getMinMax(sheet_koleksiTp, 'skor');
                   const MaxMinCpSheet  = getMinMax(sheet_koleksiCp, 'skor');

                   dataNilaiRaportSheetKd.sourceKoleksiStrukturAtp= this.buildMaxMinKoleksiStruktur(MaxMinAtpSheet,sheet_koleksiAtp);
                   dataNilaiRaportSheetKd.sourceKoleksiStrukturTp= this.buildMaxMinKoleksiStruktur(MaxMinTpSheet,sheet_koleksiTp);
                   dataNilaiRaportSheetKd.sourceKoleksiStrukturCp= this.buildMaxMinKoleksiStruktur(MaxMinCpSheet,sheet_koleksiCp);
                   dataNilaiRaportSheetKd.collectionAtp=collectionAtp;
                   dataNilaiRaportSheetKd.collectionTp=collectionTp;
                   dataNilaiRaportSheetKd.collectionCp=collectionCp;
               }


                /** 
                 * Pada akhir, looping ini menghasilkan satu data siswa untuk siswa saat ini
                */
               const obRaportSiswa:RaportRombelAsal = {
                dataSiswa: siswa,
                dataNilaiRaportResponSiswa,
                dataNilaiRaportSheetKd,
                // sheet_koleksiAtp,
                
               };
               raportSiswa.push(obRaportSiswa);

        
            }
               
            
            /**
             * Build COllection level Mapel
             */
            
            const collectionAtp:StrukturAtpType[]=[];
            const collectionTp:StrukturTpType[]=[];
            const collectionCp:StrukturCpType[]=[];
            if(currentKurikulumMapel?.dataCpMapper){
                for(const {cp_id, cp_description, dataTpMapper} of currentKurikulumMapel?.dataCpMapper.values() ){
                    collectionCp.push({cp_id, cp_description});
                    for(const {tp_id, tp_description, dataAtpMapper} of dataTpMapper.values()) {
                        collectionTp.push({tp_id, tp_description})
                        for(const {atp_id, atp_description} of dataAtpMapper.values()){
                            collectionAtp.push({atp_id,atp_description})
                        }
                    }
                    
                }
            }
            result.push({
                mapel: source,
                raportSiswa,
                sourceTagihan,
                collectionAtp,
                collectionTp,
                collectionCp,
            })
        }
        return result
    }
    private static buildSkorKdNullable<T>(kodeMapel:string, koleksiNilaiStruktur:KoleksiStrukturWithSourceSkor[]):SkorKdNullableType|undefined{
        if(koleksiNilaiStruktur.length === 0) return;
        const result:SkorKdNullableType = Object.create(null);
        koleksiNilaiStruktur.forEach(m=>{
            let id: string | number | undefined;

            switch (m.type) {
                case 'atp':
                    id = (m.struktur as StrukturAtpType).atp_id;
                    break;
                case 'tp':
                    id = (m.struktur as StrukturTpType).tp_id;
                    break;
                case 'cp':
                    id = (m.struktur as StrukturCpType).cp_id;
                    break;
            }

            if (id === undefined) return;

            const key = `${kodeMapel}_${id}`;
            result[key] = m.skor ?? null;
        })
        return result;
    }
    private static buildMaxMinKoleksiStruktur<T>(
        MaxMinAtpCurrent: MinMaxResult<KoleksiStrukturWithSourceSkor>,
        sources:KoleksiStrukturWithSourceSkor[]
    ):KoleksiSktrukturWithSourceSkorAndStateMaxMin[] {
        const result:KoleksiSktrukturWithSourceSkorAndStateMaxMin[]=[];
        const {max, min} = MaxMinAtpCurrent;
        /** 
         * jika sources/koleksinya cuman ada satu, isMax dan isMinnya 
         * 
        */
       const sourceKoleksiSkorTiapInstrumen = sources.flatMap(m=>m.sourceKoleksiSkorTiapInstrumen)
       if(sourceKoleksiSkorTiapInstrumen.length === 1){
        return sources.map(m=>{
            return {
                ...m, 
                isMax:false, 
                isMin:false
            }
        })
       }
        for(const item of sources){
            const {struktur, type} = item
            let isMax:boolean = false;
            let isMin:boolean = false;
            switch(type){
                case 'atp':{
                    const maxStruktur = (max?.struktur as StrukturAtpType);
                    const minStruktur = (min?.struktur as StrukturAtpType);
                    const strukturData = struktur as StrukturAtpType;
                    if(strukturData.atp_id === maxStruktur?.atp_id){
                        isMax = true;
                    }
                    if(strukturData.atp_id === minStruktur?.atp_id){
                        isMin = true;
                    }
                }
                break;
                case 'tp':{
                    const maxStruktur = (max?.struktur as StrukturTpType);
                    const minStruktur = (min?.struktur as StrukturTpType);
                    const strukturData = struktur as StrukturTpType;
                    if(strukturData.tp_id === maxStruktur?.tp_id){
                        isMax = true;
                    }
                    if(strukturData.tp_id === minStruktur?.tp_id){
                        isMin = true;
                    }
                }
                break;
                case 'cp':{
                    const maxStruktur = (max?.struktur as StrukturCpType);
                    const minStruktur = (min?.struktur as StrukturCpType);
                    const strukturData = struktur as StrukturCpType;
                    if(strukturData.cp_id === maxStruktur?.cp_id){
                        isMax = true;
                    }
                    if(strukturData.cp_id === minStruktur?.cp_id){
                        isMin = true;
                    }
                }
                break;
            }
            result.push( {
                ...item, 
                isMax,
                isMin
            })
        }
        return result;
    }
}