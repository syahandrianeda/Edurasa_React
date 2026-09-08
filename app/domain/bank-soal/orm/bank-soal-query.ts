import type { AtpSoal, GroupSoal, GroupSoalDetail } from "./type-orm-bank-soal";

export default class GroupSoalQuery {

    constructor(
        private source: GroupSoalDetail[]
    ) {}

    private filter(
        predicate: (source: AtpSoal) => boolean
    ): this {

        this.source = this.source
            .map(groupMapel => ({
                ...groupMapel,

                data: groupMapel.data
                    .map(groupTp => ({
                        ...groupTp,

                        data: groupTp.data.filter(
                            groupAtp =>
                                predicate(groupAtp.source)
                        ),
                    }))
                    .filter(groupTp =>
                        groupTp.data.length > 0
                    ),
            }))
            .filter(groupMapel =>
                groupMapel.data.length > 0
            );

        return this;
    }

    filterMapel(...kodeMapel: string[]): this {
        return this.filter(
            source =>
                kodeMapel.includes(
                    source.kodemapel ?? ''
                )
        );
    }

    filterTpId(...ids: number[]): this {
        return this.filter(
            source =>
                ids.includes(source.atp_as_tp_id)
        );
    }

    filterAtpId(...ids: number[]): this {
        return this.filter(
            source =>
                ids.includes(source.tp_as_cp_id ?? -1)
        );
    }

    filterKelas(...kelas: number[]): this {
        return this.filter(
            source =>
                source.kelas.some(
                    (item:number) => kelas.includes(item)
                )
        );
    }

    filterFase(...fase: string[]): this {
        return this.filter(
            source =>
                fase.includes(source.fase ?? '')
        );
    }

    filterCpId(...ids: number[]): this {
        return this.filter(
            source =>
                ids.includes(source.cp_id ?? -1)
        );
    }

    filterElemen(...elemen: string[]): this {
        return this.filter(
            source =>
                elemen.includes(source.elemen ?? '')
        );
    }

    filterLingkupMateri(...lingkup: string[]): this {
        return this.filter(
            source =>
                lingkup.includes(
                    source.lingkup_materi ?? ''
                )
        );
    }

    where(
        predicate: (source: AtpSoal) => boolean
    ): this {
        return this.filter(predicate);
    }

    get(): GroupSoal[] {
        return this.source;
    }
}