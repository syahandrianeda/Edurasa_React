import { getNumberFromString } from "./get-number";

export default function getFaseByRombel(rombel:string):string{
    const namaJenjang = getNumberFromString(rombel);
    
    if([1,2].includes(namaJenjang)){
            return 'A' //as faseMerdekaType;
        }else if([3,4].includes(namaJenjang)){
            return 'B' //as faseMerdekaType;      
        }else if([5,6].includes(namaJenjang)){
            return 'C' //as faseMerdekaType;
        }else{
            return 'A'// as faseMerdekaType;
        }
}