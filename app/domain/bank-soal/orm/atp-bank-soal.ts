
import type OrmPromes from "~/domain/kurikulum/orm-promes";
import { groupBy } from "~/lib/group-by";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { AtpSoal, dataCollectionSoalAtp, dataGroupAtp, GroupSoal } from "./type-orm-bank-soal";
import GroupSoalQuery from "./bank-soal-query";

export default class BankSoalAtpClass{
    private atpWithKoleksiSoal:AtpSoal[] =[];
    private groupSoalMapel:GroupSoal[]=[];

    constructor(private BankSoal:BankSoalAppType[], private OrmAtp:OrmPromes){

    }
    get koleksiSoalGroup(): GroupSoal[] {
        return this.groupSoalMapel;
    }

    query(): GroupSoalQuery {
        return new GroupSoalQuery(this.groupSoalMapel);
    }
    /**
     * memasangkan atp dengan bank soal berdasarkan data atp pada bank soal
     */
    generate():this{
        const KoleksiAtp = this.OrmAtp.data;

        for (const atp of KoleksiAtp){
            const koleksiSoalCurrentAtp = this.BankSoal.filter(s=> s.kd_id === atp.atp_as_tp_id);
            const groupKoleksiSoal =  groupBy(koleksiSoalCurrentAtp, (item)=>item.bentuk_soal);
            const koleksiSoal = [...Object.entries(groupKoleksiSoal)].map(([bentukSoal, data])=>({bentukSoal, data}))
            this.atpWithKoleksiSoal.push({...atp, koleksiSoal})
        }
        return this;
    }
    
    get koleksiSoal(){
        return this.atpWithKoleksiSoal
    }
    groupedBankSoalBasedMapel():this{
        /**
         * Struktur internal:
         *
         * Map<
         *     kodeMapel,
         *     Map<
         *         tpId,
         *         Map<
         *             atpId,
         *             dataGroupAtp
         *         >
         *     >
         * >
         */
        const grouped = new Map<
            string,
            Map<
                number,
                Map<
                    number | undefined,
                    dataGroupAtp
                >
            >
        >();

        // =========================================================
        // SINGLE LOOP
        // =========================================================

        for (const item of this.atpWithKoleksiSoal) {

            const kodeMapel = item.kodemapel ?? '';
            const mapelName = item.mapelname ?? '-'
            const tpId = item.tp_as_cp_id ?? 0;
            const atpId = item.atp_as_tp_id

            // -----------------------------------------------------
            // MAPEL
            // -----------------------------------------------------

            let mapTp = grouped.get(kodeMapel);

            if (!mapTp) {
                mapTp = new Map();
                grouped.set(kodeMapel, mapTp);
            }

            // -----------------------------------------------------
            // TP
            // -----------------------------------------------------

            let mapAtp = mapTp.get(tpId);

            if (!mapAtp) {
                mapAtp = new Map();
                mapTp.set(tpId, mapAtp);
            }

            // -----------------------------------------------------
            // ATP
            // -----------------------------------------------------

            let groupAtp = mapAtp.get(atpId);

            if (!groupAtp) {
                groupAtp = {
                    atp: item.tp_as_cp_description ?? '',
                    koleksiSoal: [],
                    source: item,
                };

                mapAtp.set(atpId, groupAtp);
            }

            // -----------------------------------------------------
            // KOLEKSI SOAL
            // -----------------------------------------------------

            this.mergeKoleksiSoal(
                groupAtp.koleksiSoal,
                item.koleksiSoal
            );
        }

        // =========================================================
        // MAP → GroupSoal[]
        // =========================================================

        this.toGroupSoal(grouped);
        return this
    }
    mergeKoleksiSoal(
        target: dataCollectionSoalAtp[],
        source: dataCollectionSoalAtp[]
    ): void {

        const map = new Map<
            ListBentukSoalType['name'],
            BankSoalAppType[]
        >();

        // Masukkan data yang sudah ada
        for (const collection of target) {
            map.set(
                collection.bentukSoal,
                collection.data
            );
        }

        // Gabungkan data baru
        for (const collection of source) {

            const existing = map.get(collection.bentukSoal);

            if (existing) {
                existing.push(...collection.data);
            } else {
                map.set(
                    collection.bentukSoal,
                    [...collection.data]
                );
            }
        }

        // Sinkronkan kembali ke array
        target.length = 0;

        for (const [bentukSoal, data] of map) {
            target.push({
                bentukSoal,
                data,
            });
        }
    }
    toGroupSoal(
        grouped: Map<
            string,
            Map<
                number,
                Map<
                    number | undefined,
                    dataGroupAtp
                >
            >
        >
    ):void {

        this.groupSoalMapel =  Array.from(
            grouped,
            ([kode_mapel, mapTp]) => ({

                kode_mapel,
                data: Array.from(
                    mapTp.entries(),
                    ([tpId, mapAtp]) => {

                        const firstAtp =
                            mapAtp.values().next().value as dataGroupAtp;

                        return {
                            tp_id: tpId,
                            tp_description: firstAtp.source.atp_as_tp_description,

                            data: Array.from(
                                mapAtp.values()
                            ),
                        };
                    }
                ),
            })
        );
    }

}