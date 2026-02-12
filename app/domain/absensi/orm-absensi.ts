import type { SiswaWithValidation } from "~/context-reduct/selectores/data-siswa-aktif";
import type OrmKaldik from "../kaldik/orm-kaldik";
import type { dataAbsensiTypeSlice } from "~/context-reduct/global-state/absensi-slice";
import type { dataAbsenBulanan, dataAbsensiSiswaInBulanType } from "./orm-absensi-type";
import { getParseDateDMMYYYY, getParseDateYYYYMMMDD } from "~/lib/date-helper";
import type { CSSProperties } from "react";
import DTOAbsensiToApp from "~/dtos/dto-absensi-to-app";
import type { AbsensiSiswaType } from "~/types/absensi-siswa";

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

            const PersenAbsen = Number((((count_Sakit + count_Ijin + count_Alpa)/(siswaRombel.length * count_he))*100).toFixed(2))
            perSiswa.persentase_absensi = isNaN(PersenAbsen)?'':PersenAbsen+'%';
            
            const persentase_kehadiran = Number((((count_Hadir)/(siswaRombel.length * count_he))*100).toFixed(2));
            perSiswa.persentase_kehadiran = isNaN(persentase_kehadiran)?'':persentase_kehadiran+'%';
            
            result.push(perSiswa as dataAbsensiSiswaInBulanType);
        })
        return result;
    }
    dataAbsenInCurrentDate(dateParam:Date){

    }
}