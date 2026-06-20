import type { ItemAtpAsProtaEditable } from "~/types/kurikulum/prota-orm";

export type ProsemDay = {
    date: Date;
    tgl: number;
    indexWeek: number; // 0..6 as Date.getDay()
    weekInMonth: number;
    bulan: string;
    monthIndex: number; // 0..11
    isHeb: boolean;
    jp_count: number;
    tag_sebaran: number;
}

export type OrmPromesResult = {
    data_atp_semester: ItemAtpAsProtaEditable[];
    koleksi_hari: ProsemDay[];
    kode_mapel: string;
    rombel: string;
    semester: number;
    meta: {
        total_days: number;
        total_jp: number;
        startDate?: Date;
        endDate?: Date;
        kode_mapel?: string;
    }
    sebaran_tgl?: ProsemDay[][];
    sebaran_tgl_collection?: {
        bulan: string;
        jumlah_minggu: number;
        data_weeks: {
            index_week: number;
            data_sebaran: ProsemDay[];
        }[];
    }[];
    table_prosem?: {
        headers: {
            top: { label: string; colSpan?: number; rowSpan?: number }[];
            sub: { label: string }[];
            middle: { label: string ; colSpan?: number; rowSpan?: number}[];
        };
        rows: {
            item: ItemAtpAsProtaEditable; // original ATP item for the row
            cells: ProsemDay[][];
            item_jp_distributed:number // one cell may contain multiple ProsemDay entries
        }[];
    };
    total_atp_distributed?: number;
    // messageAlertPromes?:string[]
}

export default {} as any;
