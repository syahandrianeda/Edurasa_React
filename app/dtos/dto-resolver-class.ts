export default class DtoResolverTypeClass{
    
    validateObject( value: unknown, fieldName: string ): void {

        if (!this.isObject(value)) {
            throw new Error(
                `${fieldName} harus berupa object.`
            );
        }
    }

    parseJson( value: string, fieldName: string ): unknown {

        if (!value?.trim()) {
            throw new Error(
                `${fieldName} tidak boleh kosong.`
            );
        }

        try {
            return JSON.parse(value);
        } catch (error) {

            throw new Error(
                `${fieldName} bukan JSON yang valid.`,
                {
                    cause: error
                }
            );
        }
    }


    /* =====================================================
     * TYPE GUARDS
     * ===================================================== */

    isObject( value: unknown ): value is Record<string, any> {

        return ( typeof value === 'object' && value !== undefined && !Array.isArray(value)
        );
    }
    
    stringArrayToString( value: string[] ): string {

        if (!Array.isArray(value)) {
            return '';
        }

        return value
            .map(item => String(item).trim())
            .filter(Boolean)
            .join(', ');
    }
    
    stringToArrayString(value:string):string[]{
        if(!value) return [];
        return value.split(',').map(m=>String(m).trim()).filter(Boolean);
    }

    stringToArrayNumber(value:string): number[]{
        if(!value) return [];
        return value.toString().split(',').map(m=> Number(m))
    }

    numberArrayToString( value: number[] ): string {

        if (!Array.isArray(value)) {
            return '';
        }

        return value
            .filter(item => Number.isFinite(item))
            .join(', ');
    }

    /** resolver untuk memastikan `item` menjadi number type, jika bermasalah, maka 0  */
    makeSureNumber(item:any):number{
        if(!item) return 0
        const n = Number(item);
        return isNaN(n) ? 0 : n;
    }

    /* =====================================================
     * DATE HELPER
     * ===================================================== */

    /** menjadikan `value` menjadi `number', jika bermasalah dijadikan warning error */
    parseDate( value: unknown, fieldName: string ): Date {

        if (value instanceof Date) {
            return value;
        }

        if ( typeof value !== 'string' && typeof value !== 'number' ) {
            throw new Error(
                `${fieldName} bukan tanggal yang valid.`
            );
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            throw new Error(
                `${fieldName} bukan tanggal yang valid.`
            );
        }

        return date;
    }
    
    numberToBoolean( value: number ): boolean {
        if(typeof value !=='number') value = Number(value);
        return value === 1;
    }


    /**
     * true  -> 1
     * false -> 0
     */
    booleanToNumber( value: boolean ): number {

        return value ? 1 : 0;
    }

}