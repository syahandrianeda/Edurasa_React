import getOrCreateMap from "~/lib/getOrCreateMapper";
import type { DataKdSheetApp } from "~/types/penilaian/DataKdSheetAppType";
import type { DataSheetSkorKdKategoriAsesmenAppType } from "~/types/penilaian/DataSheetSkorKdKategoriAsesmenAppType";


// export type MapperSiswaOnDataSkorKdSheetType = Map<number,  {siswa_id:number, namaSiswa:string, rombel: string, collectionData:DataKdSheetApp[] ,refrensi:DataSheetSkorKdKategoriAsesmenAppType[]}>
export type MapperSiswaOnDataSkorKdSheetType = Map<number,  {siswa_id:number, namaSiswa:string, rombel: string, collectionData:Map<number, {currentAtp: DataKdSheetApp[]}>}>

export default class MapperSiswaOnDataSkorKdSheetBuilder{
    static build(dataSkorKdSheet:DataSheetSkorKdKategoriAsesmenAppType[]):MapperSiswaOnDataSkorKdSheetType{
        const result:MapperSiswaOnDataSkorKdSheetType = new Map();
        for(const dataSheet of dataSkorKdSheet){
            const {siswa_id, nama_siswa, rombel, data} = dataSheet;
            const currentSiswa = getOrCreateMap(result, siswa_id, ()=>({
                siswa_id,
                namaSiswa: nama_siswa,
                rombel,
                // refrensi: [],
                // collectionData:[]
                collectionData:new Map()

            }));
            data.forEach(item=>{
                const dataAtp = getOrCreateMap(currentSiswa.collectionData, item.atp_id, ()=>({
                    currentAtp:[]
                }));
                dataAtp.currentAtp.push(item);

            });

            // currentSiswa.refrensi.push(dataSheet);
            // currentSiswa.collectionData.push(...data);
        }
        return result;
    }
}