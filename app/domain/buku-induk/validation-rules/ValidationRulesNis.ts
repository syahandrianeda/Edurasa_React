export  class ValidationRulesNis{

    /**
     * 
     * @param nis <String>, contoh 056
     * @returns <number> hasil= 56
     */
    getSufix(nis:string):string{
        return nis.substring(6,9)
    }

    /**
     * 
     * @param nis <string>, contoh: "2627030056"
     * @returns <number>, result: 3
     */
    getJenjang(nis:string):number{
        return Number(nis.substring(4,6))
    }

    indexNis(sufix:string):number{
        return Number(sufix)
    }
}