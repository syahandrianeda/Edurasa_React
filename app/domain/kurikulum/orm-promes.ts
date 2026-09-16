import OrmProta from "./orm-prota";
import type OrmKaldik from "../kaldik/orm-kaldik";
import type { InterfaceMapel } from "~/types/mapel/mapel";
import type { UserPtk } from "~/types";
import type { protaSheetApp } from "~/types/kurikulum/prota-orm";
import type { ItemAtpAsProtaEditable } from "~/types/kurikulum/prota-orm";
import type { OrmPromesResult, ProsemDay } from "~/types/prota_prosem/prosem-types";
import type { resourcesKurikulum } from "~/types/kurikulum/kurikulum-type";
import type { jadwalMapelAccordTableApp } from "~/types/setting_jadwal/jadwal_mapel";
import type { jp_mapelApp } from "~/types/mapel/jp_mapel";

/**
 * OrmPromes
 * - Extends OrmProta to produce Program Semester (Promes) data
 * - Provides `buildPromes(mapel, semester, opts?)` which returns `OrmPromesResult`
 * - Safe: defensive checks so presentation layer won't throw
 */
export default class OrmPromes extends OrmProta{
    private lastResult: OrmPromesResult | null = null;
    // private message:string[] = [];
    private messagePromes:string[] = [];
    private isWarningPromes:boolean = false;



    constructor(
        cpFaseAtp: resourcesKurikulum,
        jadwal: jadwalMapelAccordTableApp[],
        kaldik: OrmKaldik,
        fokusMapel: InterfaceMapel,
        currentRombel: string,
        dataguru: UserPtk,
        protaServer: protaSheetApp[],
        jpMapel:jp_mapelApp[]
    ){
        super(cpFaseAtp, jadwal, kaldik, fokusMapel, currentRombel, dataguru, protaServer, jpMapel);
    }

    /**
     * Build promes for a given semester. Parent provides mapel/startDate/endDate/sabtuLibur.
     */
    buildPromes(semester:number){
        try{
            //reset dulu nilai ini agar tidak dibuat 2 x;
            this.isWarning=false;
            this.messageWarning=[];
            this.messagePromes=[];
            this.isWarningPromes=false;
            
            // ensure parent data is initialized
            this.init();
            const sabtuLibur = true;

            // ATP data for semester (from parent presentation)
            const data_atp_semester: ItemAtpAsProtaEditable[] = this.dataPresentastionProta?.data.filter(s=>s.semester.includes(semester)) ?? [];

            // kode, rombel (use parent fokusMapel)
            const kode_mapel = this.realKodeMapel;//this.codeMapel;
            const mapel_name = this.fokusMapel.nama;
            const rombel = this.namaRombel ?? '';

            // jadwal hari untuk mapel
            const koleksi = this.dataPerhitunganJp;
            const jadwal = koleksi?.jadwal ?? [];

            // determine semester date range using kaldik
            const kaldikData = this.kaldik.getKaldikSemester ? this.kaldik.getKaldikSemester(semester, sabtuLibur) : this.kaldik.getKaldikOneTapel(sabtuLibur);

            // collect all dates in semester includeKeterangan structure
            const dates: Date[] = [];
            try{
                (kaldikData.includeKeterangan || []).forEach(month=>{
                    const group = (month as any).data || {};
                    Object.values(group).forEach((arr:any)=>{
                        (arr||[]).forEach((p:any)=>{
                            if(p && p.date instanceof Date) dates.push(p.date);
                        })
                    })
                })
            }catch(_){/* ignore */}

            let startDate:Date|undefined;
            let endDate:Date|undefined;
            if(!startDate || !endDate){
                if(dates.length>0){
                    const sorted = dates.slice().sort((a,b)=>a.getTime()-b.getTime());
                    startDate = startDate ?? sorted[0];
                    endDate = endDate ?? sorted[sorted.length-1];
                }
            }

            // fallback: if still undefined, use first/last day of current tapel
            if(!startDate || !endDate){
                const oneTapel = this.kaldik.getKaldikOneTapel ? this.kaldik.getKaldikOneTapel(sabtuLibur) : kaldikData;
                const months = (oneTapel.includeKeterangan || []);
                if(months.length>0){
                    const allDates: Date[] = [];
                    months.forEach(month=>{
                        const group = (month as any).data || {};
                        Object.values(group).forEach((arr:any)=> (arr||[]).forEach((p:any)=> p && p.date instanceof Date && allDates.push(p.date)));
                    });
                    if(allDates.length>0){
                        const s = allDates.slice().sort((a,b)=>a.getTime()-b.getTime());
                        startDate = startDate ?? s[0];
                        endDate = endDate ?? s[s.length-1];
                    }
                }
            }

            const koleksi_hari: ProsemDay[] = [];

            if(startDate && endDate && startDate <= endDate && jadwal.length>0){
                // iterate dates
                const current = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
                const last = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
                for(let d = new Date(current); d <= last; d.setDate(d.getDate()+1)){
                    const dayIndex = d.getDay(); // 0..6
                    // check if this day is in mapel jadwal
                    const mapelDay = jadwal.find(j=> (j.index_hari === dayIndex));
                    if(!mapelDay) continue;

                    // check isHeb via kaldik
                    const lib = this.kaldik.getLiburHeHebData ? this.kaldik.getLiburHeHebData(new Date(d), sabtuLibur) : {isHeb:true};
                    if(!lib || !lib.isHeb) continue;

                    const weekInMonth = this.kaldik.getWeekOfMonth ? this.kaldik.getWeekOfMonth(new Date(d)) : 0;

                    koleksi_hari.push({
                        date: new Date(d),
                        tgl: d.getDate(),
                        indexWeek: dayIndex,
                        weekInMonth: weekInMonth,
                        bulan: d.toLocaleString('id-ID', {month:'long',year:'numeric'}),
                        monthIndex: d.getMonth(),
                        isHeb: lib.isHeb,
                        jp_count: mapelDay.count_jp || 0,
                        tag_sebaran: 0,
                    })
                }
            }

            const total_days = koleksi_hari.length;
            const total_jp = koleksi_hari.reduce((s,item)=> s + (item.jp_count||0),0);

            const result: OrmPromesResult = {
                data_atp_semester: data_atp_semester.filter(s=> s.kodemapel === kode_mapel) ?? data_atp_semester,
                koleksi_hari,
                kode_mapel,
                rombel,
                mapel_name,
                semester,
                meta:{ total_days, total_jp },
                // total_atp_distributed:total_atp_distributed
            }

            // --- build sebaran_tgl: distribute dates to each ATP according to 'alokasi' ---
            const atpList = result.data_atp_semester || [];
            const sebaran_tgl: ProsemDay[][] = [];

            // prepare mutable slots from koleksi_hari preserving order
            const slots = koleksi_hari.map(s=>({ item: s, remaining: s.jp_count }));
            let pointer = 0;
            
            const { sebaran_tgl: distributed } = this.calculateDistribution(atpList, slots);
            sebaran_tgl.push(...distributed);

            result.sebaran_tgl = sebaran_tgl;

            // populate meta start/end and kode_mapel
            result.meta.startDate = startDate;
            result.meta.endDate = endDate;
            result.meta.kode_mapel = kode_mapel;

            // --- build sebaran_tgl_collection grouped by month and weekInMonth ---
            const flatAssigned: ProsemDay[] = sebaran_tgl.flat();
            const groupByMonth = new Map<string, ProsemDay[]>();
            flatAssigned.forEach(p=>{
                if(!p || !p.date) return;
                const key = `${p.date.getFullYear()}-${p.monthIndex}`;
                const arr = groupByMonth.get(key) || [];
                arr.push(p);
                groupByMonth.set(key, arr);
            });

            const sebaran_tgl_collection: OrmPromesResult["sebaran_tgl_collection"] = [];
            Array.from(groupByMonth.entries()).sort((a,b)=>{
                const [ay,am] = a[0].split('-').map(Number);
                const [by,bm] = b[0].split('-').map(Number);
                return ay === by ? am - bm : ay - by;
            }).forEach(([key, items])=>{
                // sort by date
                items.sort((x,y)=> x.date.getTime() - y.date.getTime());
                // group by weekInMonth
                const weeksMap = new Map<number, ProsemDay[]>();
                items.forEach(it=>{
                    const w = it.weekInMonth || 0;
                    const a = weeksMap.get(w) || [];
                    a.push(it);
                    weeksMap.set(w,a);
                });

                const data_weeks = Array.from(weeksMap.entries()).sort((a,b)=> a[0]-b[0]).map(([index_week, arr])=>({ index_week, data_sebaran: arr }));
                const jumlah_minggu = data_weeks.length;
                const bulan = items[0]?.bulan ?? key;
                sebaran_tgl_collection.push({ bulan, jumlah_minggu, data_weeks });
            });

            result.sebaran_tgl_collection = sebaran_tgl_collection;

            // --- build table_prosem for presentation ---
            const headersTop: { label: string; colSpan?: number; rowSpan?: number }[] = [];
            const headersSub: { label: string }[] = [];
            const headersMiddle: { label: string; colSpan?: number; rowSpan?: number }[] = [];
            // fixed leading columns
            headersTop.push({ label: 'No', rowSpan: 3 });
            headersTop.push({ label: 'Tujuan Pembelajaran', rowSpan: 3 });
            headersTop.push({ label: 'Alokasi Waktu', rowSpan: 3 });
            // compute totalColumns and top/sub headers
            let totalColumns = 0;
            sebaran_tgl_collection.forEach(monthGroup=>{
                headersMiddle.push({ label: monthGroup.bulan, colSpan: monthGroup.jumlah_minggu });
                monthGroup.data_weeks.forEach(w=>{
                    headersSub.push({ label: `Pekan ke-${w.index_week}` });
                })
                totalColumns += monthGroup.jumlah_minggu;
            });
            headersTop.push({ label: 'Distribusi Jam Pelajaran (JP)', colSpan:  totalColumns });

            
            // column mapping: map `${year}-${month}-${index_week}` -> columnIndex
            const columnMap = new Map<string, number>();
            const monthBaseMap = new Map<string, { base: number; weeks: number }>();
            let base = 0;
            sebaran_tgl_collection.forEach(monthGroup=>{
                // find sample date to get year/monthIndex
                const sample = monthGroup.data_weeks.flatMap(w=>w.data_sebaran).find(Boolean);
                const year = sample ? sample.date.getFullYear() : 0;
                const monthIndex = sample ? sample.monthIndex : 0;
                monthBaseMap.set(`${year}-${monthIndex}`, { base, weeks: monthGroup.jumlah_minggu });
                monthGroup.data_weeks.forEach((w, idx)=>{
                    columnMap.set(`${year}-${monthIndex}-${w.index_week}`, base + idx);
                });
                base += monthGroup.jumlah_minggu;
            });

            // build rows
            const rows: { item: ItemAtpAsProtaEditable; cells: ProsemDay[][],item_jp_distributed:number }[] = [];
            const totalCols = totalColumns;

            let total_atp_distributed = 0;
            for(let i=0;i<atpList.length;i++){
                const atp = atpList[i];
                const cells: ProsemDay[][] = Array.from({length: totalCols}, ()=>[]);
                const assigned = sebaran_tgl[i] || [];
                let consume_jp_in_current_atp = 0;
                assigned.forEach(pd=>{
                    const key = `${pd.date.getFullYear()}-${pd.monthIndex}-${pd.weekInMonth}`;
                    let col = columnMap.get(key);
                    if(col === undefined){
                        // fallback: try month only
                        const mb = monthBaseMap.get(`${pd.date.getFullYear()}-${pd.monthIndex}`);
                        if(mb) col = mb.base; // push into first week of that month
                    }
                    if(col === undefined){
                        // final fallback: find first empty cell
                        col = cells.findIndex(c=>c.length===0);
                        if(col === -1) col = 0;
                    }
                    cells[col].push(pd);
                    
                    consume_jp_in_current_atp += pd.tag_sebaran;
                });

                rows.push({ item: atp, cells, item_jp_distributed: consume_jp_in_current_atp });
                total_atp_distributed += consume_jp_in_current_atp;
            }
            result.total_atp_distributed = total_atp_distributed;

            result.table_prosem = {
                headers: { top: headersTop, sub: headersSub, middle: headersMiddle},
                rows,
            };

            this.lastResult = result;
            // return result;
            return this;
        }catch(e){
            // defensive: return empty structure
            const empty: OrmPromesResult = {
                data_atp_semester: [],
                koleksi_hari: [],
                kode_mapel: this.codeMapel ?? '',
                mapel_name: this.fokusMapel.nama,
                rombel: this.namaRombel ?? '',
                semester,
                meta: { total_days: 0, total_jp: 0 },
                total_atp_distributed:0
            }
            this.lastResult = empty;
            this.createMesageProsem('Kesalahan saat membuat Promes: '+ (e instanceof Error? e.message: String(e)));
            // return empty;
            return this;
        }
    }

    private calculateDistribution(atpList: ItemAtpAsProtaEditable[], slots: {item: ProsemDay, remaining: number}[]) {
        const sebaran_tgl: ProsemDay[][] = [];
        let total_atp_distributed = 0;
        let pointer = 0;

        for (const atp of atpList) {
            let need = atp.alokasi || 0;
            const assigned: ProsemDay[] = [];
            let safeGuard = 0;

            while (need > 0 && safeGuard < 1000) {
                safeGuard++;
                if (slots.length === 0) break;
                
                const slot = slots[pointer];
                if (!slot || slot.remaining <= 0) {
                    slots.splice(pointer, 1);
                    if (slots.length === 0) break;
                    continue;
                }

                const use = Math.min(slot.remaining, need);
                assigned.push({ ...slot.item, tag_sebaran: use });
                slot.remaining -= use;
                need -= use;
                total_atp_distributed += use;

                if (slot.remaining <= 0) {
                    slots.splice(pointer, 1);
                }
            }

            if (need > 0) {
                this.createMesageProsem(`${atp.atp_as_tp_description} belum terpenuhi, butuh ${need} JP lagi`);
            }
            sebaran_tgl.push(assigned);
        }
        return { sebaran_tgl, total_atp_distributed };
    }

    createMesageProsem(pesan:string){
        this.isWarningPromes = true;
        this.messagePromes.push(pesan);
        // return this
    }
    get alertPromise(){
        return this.isWarningPromes;
    }
    get messageAlertPromes(){
        return this.messagePromes;
    }
    get promesResult(){
        return this.lastResult;
    }
}
