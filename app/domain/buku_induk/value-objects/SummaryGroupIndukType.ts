export interface SummaryGroupIndukType{
    countInvalid:number

    //NIS
    countInvalidNis:number
    countInvalidNisDuplicate:number 
    
    //nisn    
    countInvalidNisn:number
    countInvalidNisnDuplicate:number

    //problem NIS yang tidak urut
    validGroup:boolean;
}