export interface DataSheetNeeeded{
    /** refrensinya nama Tab dalam Spreadsheet dan nilainya harus sama dengan `name` pada State Redux */
    tab:string
    /** refrensi nama spreedsheet di macro_json/macro_react.jsn, tapi tanpa prefix `ss_` */
    sheet:string,
    /** gunakan ini untuk membuat parameter AppScript, contohnya: 
     * ------ filter:
     * const objekFilter = {'id':9}
     * // id adalah key suatu data di Spreadsheet dan 9 adalah value-nya
     * filter: JSON.stringify(objekFilter) 
     * */
     params?: Record<string, unknown>;
}