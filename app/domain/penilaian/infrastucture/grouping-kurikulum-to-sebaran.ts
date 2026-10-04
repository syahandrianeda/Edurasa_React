import type AtpOrmHasManySoal from "~/domain/bank-soal/relational-soal/services/atp-has-many-soal";
import type { AtpHasManySoalType } from "~/domain/bank-soal/relational-soal/type";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { GroupBentukSoalPropertiKurikulumInPublikasiAssesmen, GroupSebaranNoSoalFromPropertyKurikulum, GroupSebaranNoSoalFromPropertyKurikulumWithScore, PrediksiNoSoal } from "../model/grouping-kurikulum-by-bentuksoal";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import { ListBentukSoal } from "~/domain/bank-soal/list-bentuk-soal";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/nilai-siswa-app-type";
import type { ScoreAccumulator, RefAtpHasManySoalType } from "./ScoreAccumulator";


export default class  GroupingSebaranKurikulum{
    
    private static createScoreAccumulator(): ScoreAccumulator {
        return {
            total: 0,
            count: 0
        };
    }
    
    private static addScore(
        accumulator: ScoreAccumulator,
        score: number | null | undefined
    ): void {
        if (
            score === null ||
            score === undefined ||
            !Number.isFinite(score)
        ) {
            return;
        }
    
        accumulator.total += score;
        accumulator.count++;
    }
    
    private static getAverageScore(
        accumulator: ScoreAccumulator
    ): number {
        if (accumulator.count === 0) {
            return 0;
        }
    
        return Number(
            (accumulator.total / accumulator.count).toFixed(2)
        );
    }
    
    static buildGroupBentukSoalInPublikasiAssesmen(dataKurikulum:AtpHasManySoalType[], dataIdSoal:number[]):{koleksiBentukSoal:string[], data:GroupBentukSoalPropertiKurikulumInPublikasiAssesmen[]}{
        /** lakukan filtering dari kurikulum yang memiliki `hasSoal` sesaui dengan `idbaris` pada `dataSoal */;
        const filteringKurikulum  = dataKurikulum.filter(s=>s.hasSoal.some(idsoal=>dataIdSoal.includes(idsoal.idbaris)));

        /** lakukan Mapping dariMapel */
        /** Prediksi saya, lakukan mapping mapel->cp->tp>atp */
        // const bentukSoalMap = new Map(filteringKurikulum.flatMap(m=>m.hasSoal).map(res=>([res.snapshot_kurikulum?.atp_as_tp_id, res])));
        // const bentukSoalMap = new Map(filteringKurikulum.flatMap(m=>m.hasSoal).map(res=>([res.bentuk_soal, res])));
        const mappingMapel = new Map<string, {
                kodeMapel:string,
                mapelName: string,
                dataCp: Map<number, {
                    cp_id: number,
                    cp_description: string,
                    dataTp: Map<number, {
                        tp_id: number, 
                        tp_description: string,
                        dataAtp: Map<number, {
                            atp_id: number,
                            atp_description: string,
                            dataBentukSoal: {bentukSoal:string, data:PrediksiNoSoal[]}[]
                            }
                            >
                    }>
                }
                >
            }>()
        const allBentukSoal = new Map<string, string[]>();
        for(const item of filteringKurikulum){
            const mapelName = item.mapelname ?? 'kodeMapel_notFound';
            const kodeMapel = item.kodemapel ?? 'mapelName_notFound';
            const cp_id = item.cp_id ?? 0;
            const cp_description = item.cp_description ?? 'cp_description_notFound';
            const tp_id = item.tp_as_cp_id ?? 0 ;
            const tp_description = item.tp_as_cp_description ?? 'tp_description_notFound';
            const atp_id = item.atp_as_tp_id;
            const atp_description = item.atp_as_tp_description;
            // const bentukSoal =  bentukSoalMap.get(atp_id)?.bentuk_soal ?? 'bentukSoal_notFound';
            const bentukSoal = new Map(item.hasSoal.map(m=>([m.bentuk_soal, m])));//[...bentukSoalMap.entries()].map(([bentukSoal, data])=>({bentukSoal, data:data.auto_koreksi}));//.filter(s=>s.data.kd_id === atp_id)

            if(!mappingMapel.get(kodeMapel)){
                mappingMapel.set(kodeMapel, {
                    kodeMapel,
                    mapelName,
                    dataCp: new Map()
                })
            }

            const dataCp = mappingMapel.get(kodeMapel);
            if(!dataCp?.dataCp.has(cp_id)){
                dataCp?.dataCp.set(cp_id, {
                    cp_id,
                    cp_description, 
                    dataTp: new Map()
                })
            }

            const dataTp = dataCp?.dataCp.get(cp_id);
            if(!dataTp?.dataTp.has(tp_id)){
                dataTp?.dataTp.set(tp_id, {
                    tp_id,
                    tp_description,
                    dataAtp: new Map()
                })
            }

            const dataAtp = dataTp?.dataTp.get(tp_id);
            if(!dataAtp?.dataAtp.has(atp_id)){
                const dataBentukSoal = bentukSoal
                dataAtp?.dataAtp.set(atp_id,{
                    atp_id,
                    atp_description,
                    // dataBentukSoal: bentukSoal
                    // dataBentukSoal: []
                    dataBentukSoal:[...bentukSoal.entries()].map(([bentukSoal, data])=>({
                        bentukSoal,
                        data: item.hasSoal
                            .filter(s => s.bentuk_soal === bentukSoal)
                            .map((prediksi): PrediksiNoSoal => {
                                const soalData = prediksi as PrediksiNoSoal & { skor?: number | null };

                                return {
                                    ...soalData,
                                    no_soal: (dataIdSoal.findIndex(dsi => dsi === prediksi.idbaris) + 1),
                                    skor: soalData.skor ?? 0
                                };
                            })
                    }))
                })
            }
            
           
            /** mengkoleksikan map */
            allBentukSoal.set('bentukSoal', [...bentukSoal.keys()])
        }
        const koleksiBentukSoal = [...allBentukSoal.values()].flat()
        const data =  [...mappingMapel.values()].map(mapelValue=>{

            const {kodeMapel, mapelName, dataCp:cpSumber} = mapelValue;
            let slotMpel=0
            const dataCp = [...cpSumber.values()].map(CpValue=>{
                const {cp_description, cp_id, dataTp:sourceTp} = CpValue;
                let slotCp=0
                const dataTp = [...sourceTp.values()].map(TpValues=>{
                    let slotTp = 0;
                    const {tp_id, tp_description, dataAtp:sourceAtp} = TpValues;
                    const dataAtp = [...sourceAtp.values()].map(AtpValues=>{
                        // const {atp_id, atp_description, dataBentukSoal:sourceBentukSoal} = AtpValues;
                        const {atp_id, atp_description, dataBentukSoal} = AtpValues;
                        // const dataBentukSoal = [...sourceBentukSoal.entries()].map(([bentukSoalName, values])=>({bentukSoal:bentukSoalName, data:values}));//.map(bentukSoal=>)
                        slotMpel++;
                        slotCp++;
                        slotTp++
                        return {
                            atp_id,
                            atp_description,
                            dataBentukSoal
                        }

                        } )
                    return {
                        tp_id,
                        tp_description,
                        slotRow:slotTp,
                        dataAtp

                    }
                })
                return {
                    cp_id, 
                    cp_description,
                    slotRow:slotCp,
                    dataTp
                }
            })
            return {
                kodeMapel,
                mapelName,
                slotRow: slotMpel,
                dataCp
            }
        })
        return {data, koleksiBentukSoal}
    }

    static buildGroupBentukSoalBasedOnKoleksiIdSoal(dataKurikulum:AtpHasManySoalType[], dataIdSoal:number[]): GroupSebaranNoSoalFromPropertyKurikulum{
        type refAtpHasManySoalTYpe = AtpHasManySoalType & {currentIdSoal:number};
        const filteringKurikulum = dataIdSoal
            .map(idbaris => ({...dataKurikulum.find(s => s.hasSoal.some(hasSoal => hasSoal.idbaris === idbaris)), currentIdSoal:idbaris}))
            .filter((kurikulum): kurikulum is  refAtpHasManySoalTYpe => kurikulum !== undefined);
        const mappingMapel = new Map<string, {
                kodeMapel:string,
                mapelName: string,
                dataCp: Map<number, {
                    cp_id: number,
                    cp_description: string,
                    dataTp: Map<number, {
                        tp_id: number, 
                        tp_description: string,
                        dataAtp: Map<number, {
                            atp_id: number,
                            atp_description: string,
                            dataBentukSoal: Map<string,PrediksiNoSoal[]>
                            }
                            >
                    }>
                }
                >
            }>()
        const allBentukSoal = new Set();
        for(const item of filteringKurikulum){
            const kodeMapel = item.mapelname ?? 'kodeMapel_notFound';
            const mapelName = item.kodemapel ?? 'mapelName_notFound';
            const cp_id = item.cp_id ?? 0;
            const cp_description = item.cp_description ?? 'cp_description_notFound';
            const tp_id = item.tp_as_cp_id ?? 0 ;
            const tp_description = item.tp_as_cp_description ?? 'tp_description_notFound';
            const atp_id = item.atp_as_tp_id;
            const atp_description = item.atp_as_tp_description;
            // const bentukSoal =  bentukSoalMap.get(atp_id)?.bentuk_soal ?? 'bentukSoal_notFound';
            // const bentukSoal = new Map(item.hasSoal.map(m=>([m.bentuk_soal, m])));//[...bentukSoalMap.entries()].map(([bentukSoal, data])=>({bentukSoal, data:data.auto_koreksi}));//.filter(s=>s.data.kd_id === atp_id)
            const bentukSoal = item.hasSoal?.find(s=>s.idbaris === item.currentIdSoal)?.bentuk_soal ?? 'bentukSoal_notFound';

            if(!mappingMapel.get(kodeMapel)){
                mappingMapel.set(kodeMapel, {
                    kodeMapel,
                    mapelName,
                    dataCp: new Map()
                })
            }

            const dataCp = mappingMapel.get(kodeMapel);
            if(!dataCp?.dataCp.has(cp_id)){
                dataCp?.dataCp.set(cp_id, {
                    cp_id,
                    cp_description, 
                    dataTp: new Map()
                })
            }

            const dataTp = dataCp?.dataCp.get(cp_id);
            if(!dataTp?.dataTp.has(tp_id)){
                dataTp?.dataTp.set(tp_id, {
                    tp_id,
                    tp_description,
                    dataAtp: new Map()
                })
            }

            const dataAtp = dataTp?.dataTp.get(tp_id);
            if(!dataAtp?.dataAtp.has(atp_id)){
                // const dataBentukSoal = bentukSoal
                dataAtp?.dataAtp.set(atp_id,{
                    atp_id,
                    atp_description,
                    // dataBentukSoal: bentukSoal
                    // dataBentukSoal: []
                    // dataBentukSoal:[...bentukSoal.entries()].map(([bentukSoal, data])=>({bentukSoal, data: item.hasSoal.filter(s=>s.bentuk_soal === bentukSoal).map(prediksi=>({...prediksi, no_soal:(dataIdSoal.findIndex(dsi=>dsi === prediksi.idbaris) + 1) }))}))
                    dataBentukSoal: new Map()
                })
            }
            
           const dataBentukSoal = dataAtp?.dataAtp.get(atp_id);
           if(!dataBentukSoal?.dataBentukSoal.has(bentukSoal)){
            dataBentukSoal?.dataBentukSoal.set(bentukSoal, [])
           }
           
           const currentBentukSoal = dataBentukSoal?.dataBentukSoal.get(bentukSoal);
           const koleksiHasSoalCurrentBentukSoal: PrediksiNoSoal[] = item.hasSoal
               .filter(s => s.bentuk_soal === bentukSoal && dataIdSoal.includes(s.idbaris))
               .map((prediksi): PrediksiNoSoal => {
                   const soalData = prediksi as BankSoalAppType & { skor?: number | null };

                   return {
                       ...soalData,
                       no_soal: (dataIdSoal.findIndex(dsi => dsi === prediksi.idbaris) + 1),
                       skor: soalData.skor ?? 0
                   };
               });
        //    const koleksiBefore = new Set<PrediksiNoSoal>([...(currentBentukSoal ?? []), ...koleksiHasSoalCurrentBentukSoal]);
           const koleksiBefore = new Set<PrediksiNoSoal>(koleksiHasSoalCurrentBentukSoal);
           dataBentukSoal?.dataBentukSoal.set(bentukSoal, [...koleksiBefore].sort((a,b)=>a.no_soal - b.no_soal));
            /** mengkoleksikan map */
            // allBentukSoal.set('bentukSoal', [...bentukSoal.keys()])
            
            allBentukSoal.add(bentukSoal);
        }
        const koleksiBentukSoal = [...allBentukSoal.values()].map(m=>ListBentukSoal.find(s=>s.name === m)).filter((bentukSoal): bentukSoal is ListBentukSoalType => bentukSoal !==undefined) ;
        //.filter((kurikulum): kurikulum is  refAtpHasManySoalTYpe => kurikulum !== undefined);
        const data =  [...mappingMapel.values()].map(mapelValue=>{

            const {kodeMapel, mapelName, dataCp:cpSumber} = mapelValue;
            let slotMapel=0
            const dataCp = [...cpSumber.values()].map(CpValue=>{
                const {cp_description, cp_id, dataTp:sourceTp} = CpValue;
                let slotCp = 0
                const dataTp = [...sourceTp.values()].map(TpValues=>{
                        const {tp_id, tp_description, dataAtp:sourceAtp} = TpValues;
                        let slotTp = 0
                        const dataAtp = [...sourceAtp.values()].map(AtpValues=>{
                            // const {atp_id, atp_description, dataBentukSoal:sourceBentukSoal} = AtpValues;
                            const {atp_id, atp_description, dataBentukSoal:sourceBentukSoal} = AtpValues;
                            const dataBentukSoal = [...sourceBentukSoal.entries()].map(([bentukSoalName, values])=>({bentukSoal:bentukSoalName, data:values}));//.map(bentukSoal=>)
                            slotMapel++;
                            slotCp++;
                            slotTp++
                            return {
                                atp_id,
                                atp_description,
                                dataBentukSoal
                            }

                        })
                        return {
                            tp_id,
                            tp_description,
                            slotRow:slotTp,
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
                slotRow:slotMapel,
                dataCp
            }
        })
        return {data, koleksiBentukSoal}
    }

    static buildGroupBentukSoalBasedOnKoleksiIdSoalWithScore(
    dataKurikulum: AtpHasManySoalType[],
    dataIdSoal: number[],
    dataResponsePenilaian: RisponsePenilaianSiswa[]
): GroupSebaranNoSoalFromPropertyKurikulumWithScore {

    /**
     * ======================================================
     * 1. RESPONSE SOAL
     * ======================================================
     *
     * Satu soal hanya boleh dihitung satu kali.
     *
     * Jika terdapat beberapa response dengan soal_id yang
     * sama, response terakhir akan digunakan.
     */
    const responseBySoalId = new Map<
        number,
        RisponsePenilaianSiswa
    >();

    for (const response of dataResponsePenilaian) {
        if (
            response.soal_id === undefined ||
            response.soal_id === null
        ) {
            continue;
        }

        responseBySoalId.set(
            response.soal_id,
            response
        );
    }

    /**
     * ======================================================
     * 2. FILTER RESPONSE BERDASARKAN KOLEKSI SOAL
     * ======================================================
     *
     * Hanya response yang soal_id-nya termasuk dalam
     * dataIdSoal yang akan digunakan untuk perhitungan.
     */
    const validSoalId = new Set(dataIdSoal);

    const validResponses = [
        ...responseBySoalId.values()
    ].filter(response =>
        response.soal_id !== undefined &&
        validSoalId.has(response.soal_id)
    );

    /**
     * ======================================================
     * 3. AGREGASI SKOR BERDASARKAN ATP
     * ======================================================
     *
     * Setiap response hanya diproses SATU KALI.
     *
     * Contoh:
     *
     * 30 soal
     * 5 ATP
     *
     * total count seluruh ATP tetap = 30,
     * bukan 30 x 5 = 150.
     */
    const scoreByAtp = new Map<
        number,
        ScoreAccumulator
    >();

    for (const response of validResponses) {
        if (
            response.atp === undefined ||
            response.atp === null
        ) {
            continue;
        }

        const score =
            scoreByAtp.get(response.atp) ??
            this.createScoreAccumulator();

        this.addScore(
            score,
            response.skor
        );

        scoreByAtp.set(
            response.atp,
            score
        );
    }

    /**
     * ======================================================
     * 4. FILTER KURIKULUM BERDASARKAN KOLEKSI SOAL
     * ======================================================
     */
    const filteringKurikulum = dataIdSoal .map(idbaris => {
                const kurikulum =
                    dataKurikulum.find(item =>
                        item.hasSoal.some(
                            hasSoal =>
                                hasSoal.idbaris === idbaris
                        )
                    );

                if (!kurikulum) {
                    return undefined;
                }

                return {
                    ...kurikulum,
                    currentIdSoal: idbaris
                };
            })
            .filter(
                (
                    kurikulum
                ): kurikulum is RefAtpHasManySoalType =>
                    kurikulum !== undefined
            );

    /**
     * ======================================================
     * 5. STRUKTUR MAPEL → CP → TP → ATP
     * ======================================================
     */
    const mappingMapel = new Map<
        string,
        {
            kodeMapel: string;
            mapelName: string;
            score: ScoreAccumulator;
            dataCp: Map<
                number,
                {
                    cp_id: number;
                    cp_description: string;
                    score: ScoreAccumulator;
                    dataTp: Map<
                        number,
                        {
                            tp_id: number;
                            tp_description: string;
                            score: ScoreAccumulator;
                            dataAtp: Map<
                                number,
                                {
                                    atp_id: number;
                                    atp_description: string;
                                    score: ScoreAccumulator;
                                    dataBentukSoal: Map<
                                        string,
                                        PrediksiNoSoal[]
                                    >;
                                }
                            >;
                        }
                    >;
                }
            >;
        }
    >();

    /**
     * Semua bentuk soal yang ditemukan.
     */
    const allBentukSoal =
        new Set<string>();

    /**
     * ======================================================
     * 6. BUILD HIERARCHY
     * ======================================================
     */
    for (const item of filteringKurikulum) {
        const mapelName = item.mapelname ?? 'kodeMapel_notFound';
        const kodeMapel = item.kodemapel ?? 'mapelName_notFound';
        const cp_id = item.cp_id ?? 0;
        const cp_description = item.cp_description ?? 'cp_description_notFound';
        const tp_id = item.tp_as_cp_id ?? 0;
        const tp_description = item.tp_as_cp_description ?? 'tp_description_notFound';
        const atp_id = item.atp_as_tp_id;
        const atp_description = item.atp_as_tp_description;
        /**
         * Bentuk soal dari soal yang sedang diproses.
         */
        const bentukSoal = item.hasSoal.find( soal => soal.idbaris === item.currentIdSoal )?.bentuk_soal ?? 'bentukSoal_notFound';

        allBentukSoal.add( bentukSoal );

        /**
         * --------------------------------------------------
         * MAPEL
         * --------------------------------------------------
         */
        if (!mappingMapel.has(kodeMapel)) {
            mappingMapel.set(
                kodeMapel,
                {
                    kodeMapel,
                    mapelName,
                    score: this.createScoreAccumulator(),
                    dataCp: new Map()
                }
            );
        }

        const dataMapel = mappingMapel.get( kodeMapel )!;

        /**
         * --------------------------------------------------
         * CP
         * --------------------------------------------------
         */
        if (!dataMapel.dataCp.has(cp_id)) {
            dataMapel.dataCp.set(
                cp_id,
                {
                    cp_id,
                    cp_description,
                    score: this.createScoreAccumulator(),
                    dataTp: new Map()
                }
            );
        }

        const dataCp = dataMapel.dataCp.get( cp_id )!;

        /**
         * --------------------------------------------------
         * TP
         * --------------------------------------------------
         */
        if (!dataCp.dataTp.has(tp_id)) {
            dataCp.dataTp.set(
                tp_id,
                {
                    tp_id,
                    tp_description,
                    score: this.createScoreAccumulator(),
                    dataAtp: new Map()
                }
            );
        }

        const dataTp = dataCp.dataTp.get( tp_id )!;

        /**
         * --------------------------------------------------
         * ATP
         * --------------------------------------------------
         */
        if (!dataTp.dataAtp.has(atp_id)) {
            dataTp.dataAtp.set(
                atp_id,
                {
                    atp_id,
                    atp_description,
                    score: this.createScoreAccumulator(),
                    dataBentukSoal: new Map()
                }
            );
        }

        const dataAtp = dataTp.dataAtp.get( atp_id )!;

        /**
         * ==================================================
         * 7. SCORE ATP
         * ==================================================
         *
         * Score ATP diambil dari hasil agregasi response,
         * BUKAN dihitung ulang di dalam loop kurikulum.
         *
         * Ini yang mencegah:
         *
         * 30 soal x 5 ATP = 150
         */
        const scoreAtp = scoreByAtp.get(atp_id);

        if (scoreAtp) {
            dataAtp.score = { ...scoreAtp };
        }

        /**
         * ==================================================
         * 8. DATA SOAL
         * ==================================================
         */
        const soalResponse = responseBySoalId.get( item.currentIdSoal );

        const koleksiHasSoalCurrentBentukSoal = item.hasSoal
                .filter(soal =>
                    soal.bentuk_soal === bentukSoal &&
                    validSoalId.has( soal.idbaris )
                )
                .map(prediksi => {
                    const response = responseBySoalId.get( prediksi.idbaris );
                    const jawabnya = response?.bentuk_soal === 'pg'? (prediksi.jawaban as string[]).includes(response.respon??'') ? 100: 0 : response?.skor;
                    return {
                        ...prediksi,
                        no_soal: dataIdSoal.findIndex( id => id === prediksi.idbaris ) + 1,
                        skor: jawabnya ?? 0
                    };
                });

        /**
         * --------------------------------------------------
         * BENTUK SOAL
         * --------------------------------------------------
         */
        if ( !dataAtp.dataBentukSoal.has( bentukSoal ) ) {
            dataAtp.dataBentukSoal.set( bentukSoal, [] );
        }

        const currentBentukSoal = dataAtp.dataBentukSoal.get( bentukSoal )!;

        /**
         * Gunakan Map agar duplicate berdasarkan
         * idbaris benar-benar dihilangkan.
         */
        const soalById = new Map( currentBentukSoal.map( soal => [
                        soal.idbaris,
                        soal
                    ]
                ) );

        for ( const soal of koleksiHasSoalCurrentBentukSoal ) {
            soalById.set( soal.idbaris,
                soal,
                ); }

        dataAtp.dataBentukSoal.set( bentukSoal, [...soalById.values()] .sort( (a, b) => a.no_soal - b.no_soal ) );
    }

    /**
     * ======================================================
     * 9. HITUNG SCORE TP → CP → MAPEL
     * ======================================================
     *
     * Jangan menghitung rata-rata dari rata-rata ATP.
     *
     * Gunakan total/count dari soal yang sebenarnya.
     */
    for ( const mapel of mappingMapel.values() ) {
        mapel.score = this.createScoreAccumulator();

        for ( const cp of mapel.dataCp.values() ) {
            cp.score = this.createScoreAccumulator();

            for ( const tp of cp.dataTp.values() ) {
                tp.score = this.createScoreAccumulator();

                for ( const atp of tp.dataAtp.values() ) {
                    /**
                     * ATP sudah mempunyai total/count
                     * yang berasal dari response unik.
                     */
                    this.addScore( tp.score, atp.score.count > 0 ? atp.score.total / atp.score.count : null );

                    /**
                     * Untuk mendapatkan weighted average
                     * yang benar, kita tidak boleh hanya
                     * menjumlahkan average ATP.
                     *
                     * Oleh karena itu kita langsung
                     * tambahkan total ATP dan count ATP.
                     */
                    tp.score.total = tp.score.total - ( atp.score.count > 0 ? atp.score.total / atp.score.count : 0 );

                    tp.score.total += atp.score.total;
                    tp.score.count += atp.score.count;
                }

                /**
                 * Tambahkan total TP ke CP.
                 */
                cp.score.total += tp.score.total;

                cp.score.count += tp.score.count;
            }

            /**
             * Tambahkan total CP ke Mapel.
             */
            mapel.score.total += cp.score.total;

            mapel.score.count += cp.score.count;
        }
    }

    /**
     * ======================================================
     * 10. BENTUK SOAL
     * ======================================================
     */
    const koleksiBentukSoal = [...allBentukSoal]
            .map(bentukSoal =>
                ListBentukSoal.find( item => item.name === bentukSoal )
            )
            .filter( ( bentukSoal ): bentukSoal is ListBentukSoalType => bentukSoal !== undefined );

    /**
     * ======================================================
     * 11. MAP → ARRAY FINAL
     * ======================================================
     */
    const data = [...mappingMapel.values()]
            .map(mapelValue => {
                const { kodeMapel, mapelName, score: scoreMapel, dataCp: sourceCp } = mapelValue;

                let slotMapel = 0;
                const objekSkorKd = Object.create(null);

                const dataCp = [...sourceCp.values()]
                        .map(cpValue => {
                            const {
                                cp_description,
                                cp_id,
                                score: scoreCp,
                                dataTp: sourceTp
                            } = cpValue;

                            let slotCp = 0;

                            const dataTp = [...sourceTp.values()]
                                    .map(tpValue => {
                                        const { tp_id, tp_description, score: scoreTp, dataAtp: sourceAtp } = tpValue;

                                        let slotTp = 0;

                                        const dataAtp = [...sourceAtp.values()]
                                                .map(
                                                    atpValue => { 
                                                        const { atp_id, atp_description, score: scoreAtp, dataBentukSoal: sourceBentukSoal } = atpValue;
                                                        const key = kodeMapel+'_'+atp_id;
                                                        const skorAtp = this.getAverageScore( scoreAtp )
                                                        objekSkorKd[key] = skorAtp;
                                                        const dataBentukSoal = [ ...sourceBentukSoal.entries() ].map( ([ bentukSoalName, values ]) => ({
                                                                    bentukSoal: bentukSoalName,
                                                                    data: values
                                                                })
                                                            );

                                                        slotMapel++;
                                                        slotCp++;
                                                        slotTp++;

                                                        return {
                                                            atp_id,
                                                            atp_description,
                                                            skor: skorAtp,//this.getAverageScore( scoreAtp ),
                                                            jumlahSoalDinilai: scoreAtp.count,
                                                            dataBentukSoal
                                                        };
                                                    }
                                                );

                                        return {
                                            tp_id,
                                            tp_description,
                                            skor: this.getAverageScore( scoreTp ),
                                            jumlahSoalDinilai: scoreTp.count,
                                            slotRow: slotTp,
                                            dataAtp
                                        };
                                    });

                            return {
                                cp_id,
                                cp_description,
                                skor: this.getAverageScore( scoreCp ),
                                jumlahSoalDinilai: scoreCp.count,
                                slotRow: slotCp,
                                dataTp
                            };
                        });

                return {
                    kodeMapel,
                    mapelName,
                    skor: this.getAverageScore( scoreMapel ),
                    jumlahSoalDinilai: scoreMapel.count,
                    slotRow: slotMapel,
                    dataCp,
                    objekSkorKd
                };
            }) ;//as any as GroupSebaranNoSoalFromPropertyKurikulumWithScore['data'];

    return {
        data,
        koleksiBentukSoal
    } as GroupSebaranNoSoalFromPropertyKurikulumWithScore;
}
}
    
