import type { PublikasiPaketAppType, PublikasiPaketAppValidWithPaketSoal } from "~/types/bank-soal/entities/publikasi-paket-app-type";
import type { PublikasiPaketSheetType } from "~/types/bank-soal/entities/publikasi-paket-sheet-type";
import { numberArrayToString, resolveDate, resolveString, stringArrayToString, stringToArrayNumber, stringToArrayString } from "./_resolver";
import type { PraSettingBaku } from "~/types/bank-soal/entities/PraSettingBaku";
import type { IdentitasKontenPaket } from "~/domain/paket-soal/entities/identitas-paket";
import type { countBentukSoalPaketBaku } from "~/types/bank-soal/entities/countBentukSoalPaketBaku";
import type { CountBentukSoalPaket } from "~/domain/paket-soal/entities/count-bentuk-soal-paket";

export default class DtoPublikasiPaketStatic{
    public static fromSheetToApp(data:PublikasiPaketSheetType):PublikasiPaketAppType{
        const result: any = {}
        const keyStringToString = ['jenis_tagihan', 'status', 'id_file_setting', 'nama_publikasi', 'oleh'];
        const keyStringToArrayString = ['target_rombel'];
        const keyStringToArrayNumber = ['id_bank_soal', 'target_person'];
        const keyNumber = ['idbaris', 'paket_soal_id', 'durasi']
        const keyEnum = ['target_type']
        const keyDate = ['start_time', 'end_time']
        const keyJson = ['json_setting'];


        for(const item in data){
            const value = data[item as keyof PublikasiPaketSheetType];
            if(keyStringToString.includes(item)){
                result[item] = resolveString(value, '');
            }
            if(keyStringToArrayString.includes(item)){
                result[item] = stringToArrayString(value as string)
            }
            if(keyStringToArrayNumber.includes(item)){
                result[item] = stringToArrayNumber(value as string);
            }
            if(keyNumber.includes(item)){
                result[item] = Number(value);
            }
            if(keyDate.includes(item)){
                result[item] = resolveDate(value)
            }
            if(keyEnum.includes(item)){
                result[item] = value;
            }
            if(keyJson.includes(item)){
                result[item] = DtoPublikasiPaketStatic.parseJsonSetting(value)
            }
        }
        return result;
        
    }
    public static arrayFromSheetToApp(data:PublikasiPaketSheetType[]):PublikasiPaketAppType[]{
        return data.map(this.fromSheetToApp)
    }
    public static parseJsonSetting(value:unknown):PraSettingBaku|undefined{
        /** value sudah dipastikan string*/
        if(!value) return
        if(typeof value === 'string'){
            try {
                const parsed = JSON.parse(value)
                
                const source = parsed as unknown as PraSettingBaku
                return {
                    ...source,
                    identitas: this.parseIdentitas(source.identitas)
                }
    
            } catch {
                // 3️⃣ CSV / pipe string fallback
                return
            }

        }
    }

    public static parseIdentitas(value:unknown):IdentitasKontenPaket{
       
        if (!value || typeof value !== "object") {
            throw new Error("Data identitas tidak valid.");
        }

        const source = value as IdentitasKontenPaket;
        return {
            ...source,
            start_time: this.parseDate(source.start_time, 'start_time'),
            end_time: source.end_time ?
                        this.parseDate(source.end_time, 'end_time')
                        : undefined,
        }
    }
    private static parseDate( value: unknown, propertyName: string ): Date {

        const date = new Date(value as string);

        if (Number.isNaN(date.getTime())) {
            throw new Error(
                `Nilai ${propertyName} bukan tanggal yang valid: ${String(value)}`
            );
        }

        return date;
    }
    public static fromAppToSheet(data:PublikasiPaketAppType):PublikasiPaketSheetType{
        console.log('data fromAppToSheet', data)
        /**
         idbaris             : number,
             paket_soal_id	    : number,
             start_time          : string,
             end_time	        : string, 
             durasi              : number,
             target_type         : TypePaketSoal,
             target_person       : string,
             target_rombel       : string,
             jenis_tagihan       : string,
             status              : string,
             id_file_setting     : string,
             id_bank_soal        : string
             nama_publikasi      : string,
             oleh                : string,
             json_setting        : string;
         */
        const result: any = {}
        const keyStringToString = ['jenis_tagihan', 'status', 'id_file_setting', 'nama_publikasi', 'oleh'];
        const keyArrayStringToString = ['target_rombel'];
        const keyNumberArrayToString = ['id_bank_soal', 'target_person'];
        const keyNumber = ['idbaris', 'paket_soal_id', 'durasi']
        const keyEnum = ['target_type']
        const keyDate = ['start_time', 'end_time']
        const keyJson = ['json_setting']


        for(const item in data){
            const value = data[item as keyof PublikasiPaketAppType];
            if(keyStringToString.includes(item)){
                result[item] = resolveString(value, '');
            }
            if(keyArrayStringToString.includes(item)){
                result[item] = stringArrayToString(value as string[])
            }
            if(keyNumberArrayToString.includes(item)){
                result[item] = (value as number[]).map(m=>String(m)).join(', ');//numberArrayToString(value as number[]);
            }
            if(keyNumber.includes(item)){
                result[item] = Number(value);
            }
            if(keyDate.includes(item)){
                result[item] = resolveDate(value)
            }
            if(keyEnum.includes(item)){
                result[item] = value;
            }
            if(keyJson.includes(item)){
                result[item] = JSON.stringify(value);
            }
            
        }
        return result;
        
    }

    public static fromAppValidationToSheet(data:PublikasiPaketAppValidWithPaketSoal):PublikasiPaketSheetType{
        const dataPaket = this.fromAppToSheet(data);
        const id_file_setting = data.id_file_paket
        return {...dataPaket, id_file_setting}
    }

    // static toJsonSettingSheet(data:PublikasiPaketAppType):PraSettingBaku{
    //     const count_bentuk_soal = this.toCountBentukSoalBaku(data.json_setting?.count_bentuk_soal ?? [])
    //     return {
    //          ...data,
    //             count_bentuk_soal,//: countBentukSoalPaketBaku[];
    //             kurikulum: number[]; //AtpAsOrm[]
                
    //     }
    // }
    // static toCountBentukSoalBaku(count_bentuk_soal:CountBentukSoalPaket[]):countBentukSoalPaketBaku[]{
    //     if(!count_bentuk_soal || !Array.isArray(count_bentuk_soal)){
    //         return []
    //     }

    //     return count_bentuk_soal.map(m=>{
    //         return {
    //             ...m,
    //             dataBentukSoal: m.dataBentukSoal.name
    //         }
    //     })
            
    // }
}