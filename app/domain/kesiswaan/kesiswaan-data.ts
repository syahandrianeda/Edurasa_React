
import { getLastDate, getParseDateYYYYMMMDD, hitungUmurTahun, RENTANG_UMUR, type RentangUmur } from "~/lib/date-helper";
import type { Agama } from "~/types/enums/agama";
import type { Gender } from "~/types/enums/gender";
import type { SiswaType } from "~/types/siswa";

export default class KesiswaanData{
    private _collectAgama?: string[];
    constructor(private allSiswa: SiswaType[]){}
    
    get dataCurrent(){
        return this.allSiswa.filter(s=>s.aktif === 'aktif');
    }
    get allNisnDuplicate(){
        return this.findDuplicateBy(this.allSiswa, 'nisn');
    }
    get allNisDuplicate(){
        return this.findDuplicateBy(this.allSiswa, 'nis');
    }
    get collectAgama(){
        // return this.uniqueBy(this.dataCurrent,'pd_agama');
        if (!this._collectAgama) {
            this._collectAgama = this.uniqueBy(
                this.dataCurrent,
                'pd_agama'
            );
        }
        return this._collectAgama.filter(s=>s!=="");

    }
    countValidNisGender(gender:Gender){
        return this.dataCurrent.filter(s=> s.pd_jk === gender && this.defineNisValid(s.nis)).length;
    }
    countValidNisGenders(gender:Gender[]){
        return this.dataCurrent.filter(s=> gender.includes(s.pd_jk) && this.defineNisValid(s.nis)).length;
    }
    
    countInvalidNisGender(gender:Gender){
        return this.dataCurrent.filter(s=> s.pd_jk === gender && !this.defineNisValid(s.nis)).length;
    }
    countInvalidNisGenders(gender:Gender[]){
        return this.dataCurrent.filter(s=> gender.includes(s.pd_jk) && !this.defineNisValid(s.nis)).length;
    }
    countDuplicateNisGender(gender:Gender){
        return this.dataCurrent.filter(s=> s.pd_jk === gender && this.allNisDuplicate.includes(s.nis)).length;
    }
    countDuplicateNisGenders(gender:Gender[]){
        return this.dataCurrent.filter(s=> gender.includes(s.pd_jk) && this.allNisDuplicate.includes(s.nis)).length;
    }
    countNisKosongGender(gender:Gender){
        return this.dataCurrent.filter(s=> s.pd_jk === gender && s.nis === "").length;
    }
    countNisKosongGenders(gender:Gender[]){
        return this.dataCurrent.filter(s=> gender.includes(s.pd_jk) && s.nis==="").length;
    }
    defineNisValid(
        nis: unknown
        ): nis is string {
        if (typeof nis !== "string") return false;
        if (nis.trim() === "") return false;
        if(this.allNisDuplicate.includes(nis)) return false;
        return /^\d{9}$/.test(nis);
    }
    
    countValidNisnGender(gender:Gender){
        return this.dataCurrent.filter(s=> s.pd_jk === gender && this.defineNisnValid(s.nisn)).length;
    }
    countValidNisnGenders(gender:Gender[]){
        return this.dataCurrent.filter(s=> gender.includes(s.pd_jk) && this.defineNisnValid(s.nisn)).length;
    }
    countInvalidNisnGender(gender:Gender){
        return this.dataCurrent.filter(s=> s.pd_jk === gender && !this.defineNisnValid(s.nisn)).length;
    }
    countInvalidNisnGenders(gender:Gender[]){
        return this.dataCurrent.filter(s=> gender.includes(s.pd_jk) && !this.defineNisnValid(s.nisn)).length;
    }
    countDuplicateNisnGender(gender:Gender){
        return this.dataCurrent.filter(s=> s.pd_jk === gender && this.allNisnDuplicate.includes(s.nisn)).length;
    }
    countDuplicateNisnGenders(gender:Gender[]){
        return this.dataCurrent.filter(s=> gender.includes(s.pd_jk) && this.allNisnDuplicate.includes(s.nisn)).length;
    }
    countNisnKosongGender(gender:Gender){
        return this.dataCurrent.filter(s=> s.pd_jk === gender && s.nisn === "").length;
    }
    countNisnKosongGenders(gender:Gender[]){
        return this.dataCurrent.filter(s=> gender.includes(s.pd_jk) && s.nisn==="").length;
    }
    countAkteGender(gender:Gender){
        return this.dataCurrent.filter(s=>s.pd_jk=== gender && s.dok_akte !=="").length;
    }
    
    countUnuploadAkteGender(gender:Gender){
        return this.dataCurrent.filter(s=>s.pd_jk=== gender && s.dok_akte ==="").length;
    }
    
    countAkteGenders(gender:Gender[]){
        return this.dataCurrent.filter(s=>gender.includes(s.pd_jk) && s.dok_akte !=="").length;
    }
    countUnuploadAkteGenders(gender:Gender[]){
        return this.dataCurrent.filter(s=>gender.includes(s.pd_jk) && s.dok_akte ==="").length;
    }
    countKkGender(gender:Gender){
        return this.dataCurrent.filter(s=>s.pd_jk=== gender && s.dok_kk !=="").length;
    }
    countUnploadKkGender(gender:Gender){
        return this.dataCurrent.filter(s=>s.pd_jk=== gender && s.dok_kk ==="").length;
    }
    countKkGenders(gender:Gender[]){
        return this.dataCurrent.filter(s=>gender.includes(s.pd_jk) && s.dok_kk !=="").length;
    }
    
    countUnploadKkGenders(gender:Gender[]){
        return this.dataCurrent.filter(s=>gender.includes(s.pd_jk) && s.dok_kk ==="").length;
    }
    defineNisnValid(
        nisn: unknown
        ): nisn is string {
        if (typeof nisn !== "string") return false;
        if (nisn.trim() === "") return false;
        if(this.allNisnDuplicate.includes(nisn)) return false;
        return /^\d{10}$/.test(nisn);
    }
    countAgamaGender(gender:Gender, agamaProp:Agama){
        return this.dataCurrent.filter(s=> s.pd_jk === gender && s.pd_agama === agamaProp).length;
    }
    countAgamaGenders(gender:Gender[], agamaProp:Agama){
        return this.dataCurrent.filter(s=> gender.includes(s.pd_jk) && s.pd_agama === agamaProp).length;
    }
    countGender(gender:Gender){
        return this.dataCurrent.filter(s=> s.pd_jk == gender).length;
    }
    countGenders(genders: Gender[]) {
        return this.dataCurrent
            .filter(s => genders.includes(s.pd_jk))
            .length;
    }
    findDuplicateBy<SiswaType,K extends keyof SiswaType>(data:SiswaType[],key:K){
        const map = new Map<SiswaType[K], number>();

        data.forEach(item => {
            const value = item[key];

            if (!this.isValidKey(value)) return;

            map.set(value, (map.get(value) ?? 0) + 1);
            // map.set(item[key], (map.get(item[key]) ?? 0) + 1);
        });

        return [...map.entries()]
            .filter(([, count]) => count > 1)
            .map(([value]) => value);
    }

    isValidKey(value: unknown): value is string | number {
        return (
            value !== null &&
            value !== undefined &&
            value !== "" &&
            !(typeof value === "number" && Number.isNaN(value))
        );
        }
    uniqueByKeys<T>(
        data: T[],
        keys: (keyof T)[]
        ): T[] {
        const map = new Map<string, T>();

        data.forEach(item => {
            const compositeKey = keys
            .map(k => String(item[k]))
            .join("|");

            map.set(compositeKey, item);
        });

        return [...map.values()];
        }
    uniqueBy<T, K extends keyof T>(
        data: T[],
        key: K
        ): T[K][] {
        const map = new Map<T[K], T>();

        data.forEach(item => {
            map.set(item[key], item);
        });

        return [...map.keys()];
        }
    collectYearsByKey<K extends keyof SiswaType>(key:K):number[]{
        const years = this.dataCurrent
            .map(s => {
            const date = s[key] && new Date(s[key]);
            if (Number.isNaN(date.getTime())) return null;
            return date.getFullYear();
            })
            .filter((y): y is number => y !== null);

        return [...new Set(years)].sort((a, b) => a - b);
    }
    collectAllYearsByKey<K extends keyof SiswaType>(key:K):number[]{
        const years = this.allSiswa
            .map(s => {
            const date = s[key] && new Date(s[key]);
            if (Number.isNaN(date.getTime())) return null;
            return date.getFullYear();
            })
            .filter((y): y is number => y !== null);

        return [...new Set(years)].sort((a, b) => a - b);
    }

    private parseDate(value: unknown): Date | null {
        if (!value) return null;
        const d = value instanceof Date ? value : new Date(value as any);
        return Number.isNaN(d.getTime()) ? null : d;
    }
    
    parseDateYYYYMMDD(value: unknown): number  {
        // if (!value) return null;
        // const d = value instanceof Date ? value : new Date(value as any);
        // const y = d.getFullYear().toString();
        // const m = String(d.getMonth()+1).padStart(2,'0');
        // const day = String(d.getDate()).padStart(2,'0');
        // const teks = y+m+day;

        // return Number.isNaN(teks) ? null : Number(teks);
        return getParseDateYYYYMMMDD(value);
    }
    
    filterAllDataByDateRange(
        start: Date,
        // end: Date,
    ): SiswaType[] {
        const end: Date = getLastDate(start);
        // const startTime = start.getTime();
        const startTime = this.parseDateYYYYMMDD(start) ;
        // const endTime = end.getTime();
        const endTime = this.parseDateYYYYMMDD(end) ;

        return this.allSiswa.filter(s => {
            const masuk = this.parseDateYYYYMMDD(s.masuk_tgl);
            // const masuk = this.parseDate(s[checkIn]);
            if (!masuk) return false;

            
            const keluar = this.parseDateYYYYMMDD(s.keluar_tgl) ===0?Infinity:this.parseDateYYYYMMDD(s.keluar_tgl);;

            // const masukTime = masuk.getTime();
            // const keluarTime = keluar?.getTime() ?? Infinity;

            // return masuk <= endTime && keluar >= startTime;
            return masuk >= startTime && keluar >=endTime
        });
    }
    filterAllDataUntilThisDate(refStartDate:Date): SiswaType[]{
        // const refTime = refStartDate.getTime();\
        const lastDate = getLastDate(refStartDate)
        const refTime = this.parseDateYYYYMMDD(lastDate)??0;
        return this.allSiswa.filter(s => {
            // const checkIn = this.parseDate(s.masuk_tgl);
            const checkIn = this.parseDateYYYYMMDD(s.masuk_tgl);
            if (!checkIn) return false; // skip entries with invalid/unknown masuk_tgl

            const checkOut = this.parseDateYYYYMMDD(s.keluar_tgl) ?? Infinity;
            // const checkOut = this.parseDate(s.keluar_tgl);
            // const checkInTime = checkIn.getTime();
            // const checkOutTime = checkOut ? checkOut.getTime() : Infinity;

            // return checkInTime <= refTime && checkOutTime > refTime;
            return checkIn <= refTime && checkOut > refTime;
        });
    }
    filterAllDataWhenCheckInThisMonth(refDate:Date): SiswaType[] {
        // const refTimeIn = refDate.getTime();
        // const refTimeOutDate = getLastDate(refDate);
        // const refTimeOut = refTimeOutDate.getTime();
        const refTimeIn = this.parseDateYYYYMMDD(refDate) ?? 0;
        const refTimeLastDate = getLastDate(refDate);
        const refTimeOut = this.parseDateYYYYMMDD(refTimeLastDate) ?? Infinity;

        return this.allSiswa.filter(s => {
            // const checkIn = this.parseDate(s.masuk_tgl);
            const checkIn = this.parseDateYYYYMMDD(s.masuk_tgl);
            if (!checkIn) return false; // skip entries with invalid/unknown masuk_tgl

            // const checkInTime = checkIn.getTime();
            

            // return checkInTime >= refTimeIn && checkInTime <= refTimeOut;
            return checkIn >= refTimeIn && checkIn <= refTimeOut;
        });
        
    }
    filterAllDataWhenCheckOutThisMonth(refDate:Date): SiswaType[] {
        const refTimeIn = this.parseDateYYYYMMDD(refDate) ;//?? Infinity;
        const refTimeLastDate = getLastDate(refDate);
        const refTimeOut = this.parseDateYYYYMMDD(refTimeLastDate) ;//?? Infinity;

        return this.allSiswa.filter(s => {
            const checkOut = this.parseDateYYYYMMDD(s.keluar_tgl) ?? 0 ;
            
            
            return checkOut >= refTimeIn && checkOut <= refTimeOut;
        });
        
    }
    countByGenderUntilThisDate(refStartDate:Date, gender:Gender){
        return this.filterAllDataUntilThisDate(refStartDate).filter(s=>s.pd_jk === gender).length
    }
    countByGendersUntilThisDate(refStartDate:Date, gender:Gender[]){
        return this.filterAllDataUntilThisDate(refStartDate).filter(s=>gender.includes(s.pd_jk)).length
    }
    countByGenderCheckInThisMonth(refDate:Date,gender:Gender){
        return this.filterAllDataWhenCheckInThisMonth(refDate).filter(s=>s.pd_jk === gender).length;
    }
    countByGendersCheckInThisMonth(refDate:Date,gender:Gender[]){
        return this.filterAllDataWhenCheckInThisMonth(refDate).filter(s=>gender.includes(s.pd_jk)).length;
    }
    
    countByGenderCheckOutThisMonth(refDate:Date,gender:Gender){
        return this.filterAllDataWhenCheckOutThisMonth(refDate).filter(s=>s.pd_jk === gender).length;
    }
    countByGendersCheckOutThisMonth(refDate:Date,gender:Gender[]){
        return this.filterAllDataWhenCheckOutThisMonth(refDate).filter(s=>gender.includes(s.pd_jk)).length;
    }
    countByGenderBetweenThisMonth(refDate:Date,gender:Gender){
        return this.filterAllDataByDateRange(refDate).filter(s=>s.pd_jk === gender).length;
    }
    countByGendersBetweenThisMonth(refDate:Date,gender:Gender[]){
        return this.filterAllDataByDateRange(refDate).filter(s=>gender.includes(s.pd_jk)).length;
    }
    
     // helper static
    private static hitungUmur(tanggalLahir: Date, referensi = new Date()): number {
        // let umur = referensi.getFullYear() - tanggalLahir.getFullYear();
        // const m = referensi.getMonth() - tanggalLahir.getMonth();

        // if (m < 0 || (m === 0 && referensi.getDate() < tanggalLahir.getDate())) {
        // umur--;
        // }

        // return umur;
        return hitungUmurTahun(tanggalLahir, referensi);
    }
    filterByRentangUmur(rentang: RentangUmur, referensi: Date = new Date()): SiswaType[] {
        const { min, max } = RENTANG_UMUR[rentang];

        return this.allSiswa.filter(siswa => {
            if (!siswa.pd_tanggallahir) return false;

            const umur = KesiswaanData.hitungUmur(
            new Date(siswa.pd_tanggallahir),
            referensi 
            );

            return umur >= min && umur <= max;
        });
        }
    countUmurGender(rentang:RentangUmur,gender:Gender,rombel:string){
        return this.filterByRentangUmur(rentang).filter(s=> s.nama_rombel === rombel && s.pd_jk === gender).length;
    }
    countUmurGenders(rentang:RentangUmur,gender:Gender[],rombel:string){
        return this.filterByRentangUmur(rentang).filter(s=> s.nama_rombel === rombel && gender.includes(s.pd_jk)).length;
    }
    countByRombel(rombel:string){
        return this.allSiswa.filter(s=>s.nama_rombel=== rombel ).length
    }
    countByJenjang(rombel:string){
        return this.allSiswa.filter(s=>s.jenjang === parseInt(rombel) ).length
    }
    countUmurRentangGender(rentang:RentangUmur,gender:Gender){
        return this.filterByRentangUmur(rentang).filter(s=>s.pd_jk === gender).length
    }
    countUmurRentangGenders(rentang:RentangUmur,gender:Gender[]){
        return this.filterByRentangUmur(rentang).filter(s=>gender.includes(s.pd_jk)).length
    }
    filterByAgama(agama:Agama){
        return this.allSiswa.filter(s=>s.pd_agama === agama);
    }
    filterByAgamaGender(agama:Agama,gender:Gender){
        return this.filterByAgama(agama).filter(s=>s.pd_jk === gender)
    }
    filterByAgamaGenders(agama:Agama,gender:Gender[]){
        return this.filterByAgama(agama).filter(s=>gender.includes(s.pd_jk))
    }
    filterByAgamaGenderRombel(agama:Agama, gender:Gender, rombel:string){
        return this.filterByAgamaGender(agama, gender).filter(s=>s.nama_rombel === rombel);
    }
    filterByAgamaGendersRombel(agama:Agama, gender:Gender[], rombel:string){
        return this.filterByAgamaGenders(agama, gender).filter(s=>s.nama_rombel === rombel);
    }
    countAgamaGenderRombel(agama:Agama, gender:Gender, rombel:string){
        return this.filterByAgamaGenderRombel(agama, gender, rombel).length;
    }

    countAgamaGendersRombel(agama:Agama, gender:Gender[], rombel:string){
        return this.filterByAgamaGendersRombel(agama, gender, rombel).length;
    }

}

