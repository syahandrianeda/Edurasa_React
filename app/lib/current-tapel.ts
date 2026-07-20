
type variantCurrentTapel = 'short'|'long'|'full'|'onlyTapel';
type variantCurrentTapelProperties = 'firstYear'|'lastYear'|'getSemester'|'getSemesterWithGanjilGenap';

export function currentTapel({variant='long', date = new Date()}:{variant?:variantCurrentTapel, date?:Date}):string {
    // let date = new Date();
    if(!(date)) return '';
    let currentYear = date.getFullYear();
    let firstYear = date.getMonth()>5?currentYear:currentYear - 1;
    let lastYear = date.getMonth()>5? currentYear + 1: currentYear;
    let semester = date.getMonth()>5?1:2;
    if(variant ==='long'){
        return 'Tapel '+ firstYear +'/' + lastYear +' Semester '+ semester;
    }else if(variant ==='full'){
        return 'Tahun Pelajaran '+ firstYear +'/' + lastYear ;//+' Semester '+ semester;
    }else if(variant === 'onlyTapel'){
        return firstYear +'/' + lastYear;
    }else if(variant === 'short'){
        return firstYear.toString().substring(2,4)+lastYear.toString().substring(2,4)
    }
    return firstYear +'/' + lastYear +' ('+ semester+')';
}

export function currentTapelProperties({variant='firstYear'}:{variant?:variantCurrentTapelProperties}):number|string {
    let date = new Date();
    let currentYear = date.getFullYear();
    let firstYear = date.getMonth()>5?currentYear:currentYear - 1;
    let lastYear = date.getMonth()>5? currentYear + 1: currentYear;
    let semester = date.getMonth()>5?1:2;
    if(variant ==='firstYear'){
        return firstYear 
    }
    if(variant ==='lastYear'){
        return lastYear as number;//+' Semester '+ semester;
    }
    
    if(variant === 'getSemester'){
        return semester as number;
    }
    if(variant === 'getSemesterWithGanjilGenap'){
        return semester===1?"1 (Ganjil)":"2 (Genap)";
    }
    return firstYear 
}