
type variantCurrentTapel = 'short'|'long'|'full'|'onlyTapel';

export function currentTapel({variant='long'}:{variant?:variantCurrentTapel}):string {
    let date = new Date();
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
    }
    return firstYear +'/' + lastYear +' ('+ semester+')';
}
