import type { PublikasiPaketSheetType } from "~/types/bank-soal/entities/publikasi-paket-sheet-type";
import DtoResolverTypeClass from "./dto-resolver-class";
import type { PublikasiPaketAppType } from "~/types/bank-soal/entities/publikasi-paket-app-type";
import { resolveDate, resolveString, stringToArrayNumber, stringToArrayString } from "./_resolver";

export default class DtoPublikasiPaketToAppType{
    private publikasiPaketAppType:PublikasiPaketAppType[]=[]
    constructor(private readonly dataSheet:PublikasiPaketSheetType[]){ }

    get purePublikasiPaketSheet(): PublikasiPaketSheetType[]{
        return this.dataSheet;
    }

    get dataArrayPublikasiAppType():PublikasiPaketAppType[]{
        return this.publikasiPaketAppType
    }
    /**
     * 
     * @param data   idbaris             : number,
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
     * @returns 
     */
    toPublikasiPaketAppType(data:PublikasiPaketSheetType):PublikasiPaketAppType{
        const result: any = {}
        
        const keyStringToString = ['jenis_tagihan', 'status', 'id_file_setting', 'nama_publikasi', 'oleh'];
        const keyStringToArrayString = ['target_rombel'];
        const keyStringToArrayNumber = ['id_bank_soal', 'target_person'];
        const keyNumber = ['idbaris', 'paket_soal_id', 'durasi']
        const keyEnum = ['target_type']
        const keyDate = ['start_time', 'end_time']


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
           
        }
        return result;

        
    }

    buildPublikasiPaketApp():this{
        this.publikasiPaketAppType = this.dataSheet.map(this.toPublikasiPaketAppType);
        return this;
    }
}