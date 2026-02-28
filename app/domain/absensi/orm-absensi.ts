import type { SiswaWithValidation } from "~/context-reduct/selectores/data-siswa-aktif";
import type OrmKaldik from "../kaldik/orm-kaldik";
import type { dataAbsensiTypeSlice } from "~/context-reduct/global-state/absensi-slice";
import type { dataAbsenBulanan, dataAbsensiRekapSemester, dataAbsensiSiswaInBulanType, dataAbsenToday, rekapSIAPerTanggal, statistikRekap, sumberRekapAbsen } from "./orm-absensi-type";
import { getParseDateDMMYYYY, getParseDateYYYYMMMDD } from "~/lib/date-helper";
import type { CSSProperties } from "react";
import DTOAbsensiToApp from "~/dtos/dto-absensi-to-app";
import type { AbsensiSiswaType, KehadiranType } from "~/types/absensi-siswa";
import { ConfigToolbarSinkronDapodik } from "~/controllers/data-siswa-controller/sinkron-dapodik/config-sinkron-dapodik";

export default class OrmAbsensi{
    constructor (
        private kaldik:OrmKaldik, 
        private allSiswa:SiswaWithValidation[], 
        private absen:dataAbsensiTypeSlice[],
        private rombelAktif: string|null
    ){}
    get ormKaldik (){
        return this.kaldik;
    }
    findSiswaByToken(token:number){
        return this.allSiswa.find(s=>s.data.id === token);
    }
    get absenTemplate():AbsensiSiswaType{
        return {
            Time_Stamp:new Date(),
            id:'',
            name:'',
            kelas:'',
            kehadiran:'',
            fileContent:'',
            resume:'',
            action:'',
            idbaris:0,
            tokensiswa:0,

        }
    }
    /**
     * data Absen current Rombel in parameter Month (paramter: date)
     */
    dataAbsenInThisMonth(dateParam:Date = new Date(), isSabtuLibur:boolean = true):dataAbsensiSiswaInBulanType[]{
        const siswaRombel = this.allSiswa.filter(s=>s.data.nama_rombel === this.rombelAktif);
        const absenRombel = this.absen.find(a=> a.nama_rombel === this.rombelAktif)?.data;
        const kaldikInThisMonth = this.kaldik.arrayDateInMonth(dateParam, isSabtuLibur);
        const result:dataAbsensiSiswaInBulanType[] = [];
        const startTgl = this.kaldik.firstDateInMonth(dateParam);
        const endTgl = this.kaldik.lastDateInMonth(dateParam);
        const end = getParseDateYYYYMMMDD(endTgl);
        const start = getParseDateYYYYMMMDD(startTgl);

        siswaRombel.forEach(({data, validation})=>{
            const masuk = getParseDateYYYYMMMDD(data.masuk_tgl) ;
            const keluar = getParseDateYYYYMMMDD(data.keluar_tgl) === 0 ? Infinity: getParseDateYYYYMMMDD(data.keluar_tgl);
            const perSiswa:Partial<dataAbsensiSiswaInBulanType> = {
                id: data.id, 
                pd_nama: data.pd_nama,
                nis: data.nis,
                nisn: data.nisn,
                status: data.aktif,
                koleksi_potoinduk: data.koleksi_potoinduk,
                check_in: data.masuk_tgl,
                check_out: data.keluar_tgl || Infinity,
                exist_in_this_month: ((masuk <=start || masuk <= end) && (keluar >= start || keluar >=end)),
                exist_in_this_start: start,
                exist_in_this_end:end,
                bulan_name:dateParam.toLocaleString('id-ID', {month:'long'}),
                bulan_index: dateParam.getMonth(),
                year: dateParam.getFullYear(),
                dataAbsen:[]
            };
            const dataAbsen:dataAbsenBulanan[] = [];
            let count_Sakit:number =0;
            let count_Ijin: number = 0;
            let count_Alpa: number = 0;
            let count_Hadir: number= 0;
            let count_he:number = 0;

            kaldikInThisMonth.forEach(({tgl, isHe, date, isHeb, isLibur, eventYet, style, keteranganKaldik})=>{
                const idDateFromKaldik = getParseDateDMMYYYY(date);
                const filterAbsenSiswa = absenRombel?.filter(s=>s.tokensiswa === data.id && s.id === idDateFromKaldik);
                const findAbsenSiswa = filterAbsenSiswa?.[filterAbsenSiswa?.length-1];
                const allow = !eventYet && ((date.getDay() === 6 || !isSabtuLibur) && !isLibur);
                const currentNumberDate = getParseDateYYYYMMMDD(date);
                const isCountedDataAbsen = (masuk <= currentNumberDate && keluar >= currentNumberDate);
                let kehadiranChecker: string = '';//findAbsenSiswa?.kehadiran?? ((!eventYet && !isLibur)?'Hadir':'')
                if(!eventYet && !isLibur){
                    count_he++;
                    if(isCountedDataAbsen){
                        if(findAbsenSiswa?.kehadiran === 'Sakit') count_Sakit++;
                        if(findAbsenSiswa?.kehadiran === 'Ijin') count_Sakit++;
                        if(findAbsenSiswa?.kehadiran === 'Alpa') count_Sakit++;
                        if(findAbsenSiswa?.kehadiran === '' ||( findAbsenSiswa?.kehadiran !== 'Sakit' && findAbsenSiswa?.kehadiran !== 'Ijin' && findAbsenSiswa?.kehadiran !== 'Alpa' )) count_Hadir++;
                        //kehadiran yang dianggap dihitung:
                        kehadiranChecker =findAbsenSiswa?.kehadiran||'Hadir'
                    }else{
                        kehadiranChecker=''
                    }
                }
                const styleSabtu = date.getDay() === 6 && keteranganKaldik.length===0 && isSabtuLibur?{background:'red',color:'white'}:(date.getDay()===0 && keteranganKaldik.length ===0)?{background:'red',color:'white'}:style as CSSProperties;
                const Absen:dataAbsenBulanan={
                    tgl: tgl,
                    date:date,
                    isHe: isHe, 
                    isLibur: isLibur, 
                    isHeb: isHeb, 
                    keteranganKaldik: keteranganKaldik, 
                    idbaris_absen: findAbsenSiswa?.idbaris,
                    idDate_absen: findAbsenSiswa?.id ?? idDateFromKaldik,
                    kehadiran: kehadiranChecker,
                    id_image_kehadiran: findAbsenSiswa?.fileContent,
                    nama_di_absen:findAbsenSiswa?.name,
                    style: eventYet?{background:'#ddd'}:styleSabtu,
                    eventYet:eventYet,
                }
                dataAbsen.push(Absen);
            });
            perSiswa.dataAbsen = dataAbsen;
            perSiswa.total_hadir = count_Hadir;
            perSiswa.total_sakit = count_Sakit;
            perSiswa.total_alpa = count_Alpa;
            perSiswa.total_ijin = count_Ijin;
            perSiswa.count_hari_efektif=count_he;

            const PersenAbsen = Number((((count_Sakit + count_Ijin + count_Alpa)/(count_he))*100).toFixed(2))
            perSiswa.persentase_absensi = isNaN(PersenAbsen)?'':PersenAbsen+'%';
            
            const persentase_kehadiran = Number((((count_Hadir)/( count_he))*100).toFixed(2));
            perSiswa.persentase_kehadiran = isNaN(persentase_kehadiran)?'':persentase_kehadiran+'%';
            
            result.push(perSiswa as dataAbsensiSiswaInBulanType);
        })
        return result;
    }
    dataAbsenOnThisSemester(semester:number, sabtuLibur:boolean = true):dataAbsensiRekapSemester[]{
        const result:dataAbsensiRekapSemester[]=[];
        const siswaRombel = this.allSiswa.filter(s=>s.data.nama_rombel === this.rombelAktif && s.data.aktif === 'aktif');
        const absenRombel = this.absen.find(a=> a.nama_rombel === this.rombelAktif)?.data;
        const bulanSemester = this.kaldik.getarrayMonthInSemester(semester);
        const dataBulanan:sumberRekapAbsen[] = []
        bulanSemester.forEach(datePaream=>{
            const perBulan = this.dataAbsenInThisMonth(datePaream, sabtuLibur);
            const objSsumberRekapAbsen:sumberRekapAbsen ={
                namaBulan:datePaream.toLocaleString('id-ID',{month:'long'}),
                tahun: datePaream.getFullYear(),
                data:perBulan
            }
            dataBulanan.push(objSsumberRekapAbsen);
        });
        
        siswaRombel.forEach(({data:siswa})=>{
            const count_hari_efektif:number = dataBulanan.map(m=>m.data.filter(s=>s.id === siswa.id).map(mm=>mm.count_hari_efektif).reduce((a,b)=>a+Number(b))).reduce((a,b)=>a+Number(b));
            const total_hadir: number = dataBulanan.map(m=>m.data.filter(s=>s.id === siswa.id).map(mm=>mm.total_hadir).reduce((a,b)=>a+Number(b))).reduce((a,b)=>a+Number(b));
            const total_sakit: number =dataBulanan.map(m=>m.data.filter(s=>s.id === siswa.id).map(mm=>mm.total_sakit).reduce((a,b)=>a+Number(b))).reduce((a,b)=>a+Number(b));
            const total_ijin: number=dataBulanan.map(m=>m.data.filter(s=>s.id === siswa.id).map(mm=>mm.total_ijin).reduce((a,b)=>a+Number(b))).reduce((a,b)=>a+Number(b));
            const total_alpa: number=dataBulanan.map(m=>m.data.filter(s=>s.id === siswa.id).map(mm=>mm.total_alpa).reduce((a,b)=>a+Number(b))).reduce((a,b)=>a+Number(b));
            const PersenAbsen = Number((((total_sakit + total_alpa + total_ijin)/(count_hari_efektif))*100).toFixed(2))
            
            const persentase_kehadiran = Number((((total_hadir)/( count_hari_efektif))*100).toFixed(2));
            
            // persentase_absensi: string;
            // persentase_kehadiran: string;
            let siswaItem:dataAbsensiRekapSemester = {
                    id: siswa.id,
                    pd_nama: siswa.pd_nama,
                    nis: siswa.nis,
                    nisn: siswa.nisn, 
                    koleksi_potoinduk:siswa.koleksi_potoinduk,
                    pd_jk:siswa.pd_jk,
                    status:siswa.aktif,
                    
                    // perhitungan rekap
                    count_hari_efektif: count_hari_efektif,
                    total_hadir: total_hadir,
                    total_sakit: total_sakit,
                    total_ijin: total_ijin,
                    total_alpa: total_alpa,
                    persentase_absensi: isNaN(PersenAbsen)?'':PersenAbsen+'%',
                    persentase_kehadiran: isNaN(persentase_kehadiran)?'':persentase_kehadiran+'%',
                    //sumber:
                    sumber:dataBulanan
            };
            result.push(siswaItem);
        })
        return result;
    }
    dataAbsenToDay(dateParam:Date, isSabtuLibur:boolean = true):dataAbsenToday[]{
        const siswaRombel = this.allSiswa.filter(s=>s.data.nama_rombel === this.rombelAktif);
        const absenRombel = this.absen.find(a=> a.nama_rombel === this.rombelAktif)?.data;
        const result:dataAbsenToday[] = [];

        siswaRombel.forEach(({data, validation})=>{
            const masuk = getParseDateYYYYMMMDD(data.masuk_tgl) ;
            const keluar = getParseDateYYYYMMMDD(data.keluar_tgl) === 0 ? Infinity: getParseDateYYYYMMMDD(data.keluar_tgl);
            const {date, isLibur,eventYet,keteranganKaldik,tgl,isHe, isHeb, style} = this.kaldik.getPropertyTglToday(dateParam,isSabtuLibur);
                const idDateFromKaldik = getParseDateDMMYYYY(date);
                const filterAbsenSiswa = absenRombel?.filter(s=>s.tokensiswa === data.id && s.id === idDateFromKaldik);
                const findAbsenSiswa = filterAbsenSiswa?.[filterAbsenSiswa?.length-1];
                const currentNumberDate = getParseDateYYYYMMMDD(date);
                const isCountedDataAbsen = (masuk <= currentNumberDate && keluar >= currentNumberDate);
                let kehadiranChecker: string = '';//findAbsenSiswa?.kehadiran||'Hadir';
                if(!eventYet && !isLibur){
                    if(isCountedDataAbsen){
                        kehadiranChecker =findAbsenSiswa?.kehadiran||'Hadir'
                    }else{
                        kehadiranChecker=''
                    }
                }
                const styleSabtu = date.getDay() === 6 && keteranganKaldik.length===0 && isSabtuLibur?{background:'red',color:'white'}:(date.getDay()===0 && keteranganKaldik.length ===0)?{background:'red',color:'white'}:style as CSSProperties;
                const Absen:dataAbsenBulanan={
                    tgl: tgl,
                    date:date,
                    isHe: isHe, 
                    isLibur: isLibur, 
                    isHeb: isHeb, 
                    keteranganKaldik: keteranganKaldik, 
                    idbaris_absen: findAbsenSiswa?.idbaris,
                    idDate_absen: findAbsenSiswa?.id ?? idDateFromKaldik,
                    kehadiran: kehadiranChecker,
                    id_image_kehadiran: findAbsenSiswa?.fileContent,
                    nama_di_absen:findAbsenSiswa?.name,
                    style: eventYet?{background:'#ddd'}:styleSabtu,
                    eventYet:eventYet,
                }
            const perSiswa:dataAbsenToday = {
                id: data.id, 
                pd_nama: data.pd_nama,
                nis: data.nis,
                nisn: data.nisn,
                pd_jk:data.pd_jk,
                status: data.aktif,
                koleksi_potoinduk: data.koleksi_potoinduk,
                check_in: data.masuk_tgl,
                check_out: data.keluar_tgl || Infinity,
                dataAbsen : Absen,
                today: date
            };

            result.push(perSiswa);
        })
        return result;
    }
    rekapSIAPerDateCurrentMonth(data:dataAbsensiSiswaInBulanType[]):rekapSIAPerTanggal[]{
        
        if (!data.length) return []

        const bulanName = data[0].bulan_name

        // 🔥 ambil semua tanggal dari dataAbsen siswa pertama
        const daftarTanggal = data[0].dataAbsen.map(d => d.tgl)

        const map: Record<string, Record<number, number>> = {}

        data.forEach((siswa) => {
            siswa.dataAbsen.forEach((absen) => {

            const kehadiran = absen.kehadiran
            if (!kehadiran) return
            if (absen.isLibur) return

            if (!map[kehadiran]) {
                map[kehadiran] = {}
            }

            if (!map[kehadiran][absen.tgl]) {
                map[kehadiran][absen.tgl] = 0
            }

                map[kehadiran][absen.tgl]++
            })
        })

        const draftResult =  Object.entries(map).map(([kehadiran, tanggalMap]) => ({
            kehadiran: kehadiran as KehadiranType,
            bulanName,
            data: daftarTanggal.map((tgl) => ({
            tgl,
            count: tanggalMap[tgl] ?? 0
            }))
        }))
        return [
            {
                kehadiran:'Hadir',
                data: draftResult.find(s=>s.kehadiran ==='Hadir')?.data ?? daftarTanggal.map((tgl)=>({
                    tgl,
                    count:0
                }))
            },
            {
                kehadiran:'Sakit',
                data: draftResult.find(s=>s.kehadiran ==='Sakit')?.data ?? daftarTanggal.map((tgl)=>({
                    tgl,
                    count:0
                }))
            },
            {
                kehadiran:'Ijin',
                data: draftResult.find(s=>s.kehadiran ==='Ijin')?.data ?? daftarTanggal.map((tgl)=>({
                    tgl,
                    count:0
                }))
            },
            {
                kehadiran:'Alpa',
                data: draftResult.find(s=>s.kehadiran ==='Alpa')?.data ?? daftarTanggal.map((tgl)=>({
                    tgl,
                    count:0
                }))
            },
        ]
        /**
         * result = [
         *  {
         *      kehadiran:'Hadir',
         *      data: [
         *              { tgl:1, count:0},
         *              { tgl:2, count:15}
         *          ]
         *  },
         *  
         *  {
         *      kehadiran:'Sakit',
         *      data: [
         *              { tgl:1, count:0},
         *              { tgl:2, count:15}
         *          ]
         *  },
         *  
         * ]
         */
        // return result;


    }
    getStatistikBulanan(tgl:Date, isSabtuLibur:boolean):statistikRekap{
        const totalHE = this.kaldik.arrayDateInMonth(tgl, isSabtuLibur).filter(s => s.isHe).length;
        const data = this.dataAbsenInThisMonth(tgl, isSabtuLibur).filter(s=>s.exist_in_this_month)
        const rekapData = this.rekapSIAPerDateCurrentMonth(data)
            
            let totalSIA = 0;
            let totalHadir = 0;
            let totalSakit =0;
            let totalIjin =0;
            let totalAlpa = 0;

            for (const item of rekapData) {
                const subtotal = item.data.reduce(
                    (sum, d) => sum + Number(d.count), 
                    0
                );

                if (item.kehadiran === 'Hadir') {
                    totalHadir += subtotal;
                } else {
                    totalSIA += subtotal;
                    if(item.kehadiran === 'Sakit') totalSakit+= subtotal;
                    if(item.kehadiran === 'Ijin') totalIjin+= subtotal;
                    if(item.kehadiran === 'Alpa') totalAlpa+= subtotal;
                }
            }

            const denominator = data.length * totalHE || 1;

            return {
                dateRefrence:tgl,
                namaBulan: tgl.toLocaleString('id-ID', {month:'long', year:'numeric'}),
                totalHE,
                totalSIA,
                totalHadir,
                totalSakit,
                totalIjin,
                totalAlpa,
                persenSIA: ((totalSIA / denominator) * 100).toFixed(2) + '%',
                persenHadir: ((totalHadir / denominator) * 100).toFixed(2) + '%',
                persenSakit: ((totalSakit / denominator) * 100).toFixed(2) + '%',
                persenIjin: ((totalIjin / denominator) * 100).toFixed(2) + '%',
                persenAlpa: ((totalAlpa / denominator) * 100).toFixed(2) + '%', 
            };
    }
    rekapSIAPerSemester(semester:number, isSabtuLibur:boolean):statistikRekap[]{
        const arrayBulan = this.kaldik.getarrayMonthInSemester(semester);
        const data:statistikRekap[]=[];
        arrayBulan.forEach(date=>{
            const item = this.getStatistikBulanan(date, isSabtuLibur);
            data.push(item);
        })
        return data;
    }
}