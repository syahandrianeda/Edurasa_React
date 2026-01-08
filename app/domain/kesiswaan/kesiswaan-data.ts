import { getNumberFromString } from "~/lib/get-number";
import type { Agama } from "~/types/enums/agama";
import type { Gender } from "~/types/enums/gender";
import type { SiswaType } from "~/types/siswa";

export default class KesiswaanData{
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
        return this.uniqueBy(this.dataCurrent,'pd_agama');

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
            const date = new Date(s[key]);
            if (Number.isNaN(date.getTime())) return null;
            return date.getFullYear();
            })
            .filter((y): y is number => y !== null);

        return [...new Set(years)].sort((a, b) => a - b);
    }
    collectAllYearsByKey<K extends keyof SiswaType>(key:K):number[]{
        const years = this.allSiswa
            .map(s => {
            const date = new Date(s[key]);
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

    filterAllDataByDateRange<K extends keyof SiswaType>(
        start: Date,
        end: Date,
        checkIn:K , //masuk_tgl
        checkOut:K, // keluar_tgl
    ): SiswaType[] {
        const startTime = start.getTime();
        const endTime = end.getTime();

        return this.allSiswa.filter(s => {
            // const masuk = this.parseDate(s.masuk_tgl);
            const masuk = this.parseDate(s[checkIn]);
            if (!masuk) return false;

            const keluar = this.parseDate(s[checkOut]);

            const masukTime = masuk.getTime();
            const keluarTime = keluar?.getTime() ?? Infinity;

            return masukTime <= endTime && keluarTime >= startTime;
        });
    }

}

