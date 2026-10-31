import getOrCreateMap from "~/lib/getOrCreateMapper";
import type { DataKdSheetApp } from "~/types/penilaian/DataKdSheetAppType";
import type { DataSheetSkorKdKategoriAsesmenAppType } from "~/types/penilaian/DataSheetSkorKdKategoriAsesmenAppType";

export type mapperAtpBelongsToSiswaHasDataSkorKdSheetType = Map<number, {belongsToSiswa:Map<number,DataSheetSkorKdKategoriAsesmenAppType>}>;
export type mapperSiswaHasDataSkorKdSheetType = Map<number, DataSheetSkorKdKategoriAsesmenAppType & {dataKdSheetMapper:Map<number, {dataSkorKd:DataKdSheetApp[]}>}> ;
export type SkorKdSheetMapperType = {
    mapperAtpBelongsToSiswaHasDataSkorKdSheet:mapperAtpBelongsToSiswaHasDataSkorKdSheetType,
    mapperSiswaHasDataSkorKdSheet:mapperSiswaHasDataSkorKdSheetType;
}
export default class SkorKdSheetMapper{
    
    static build(dataSkorKdSheetInAllTagihan: DataSheetSkorKdKategoriAsesmenAppType[]):SkorKdSheetMapperType{

        
        const mapperAtpBelongsToSiswaHasDataSkorKdSheet:mapperAtpBelongsToSiswaHasDataSkorKdSheetType = new Map();
        const mapperSiswaHasDataSkorKdSheet:mapperSiswaHasDataSkorKdSheetType = new Map();
        

        for(const siswa of dataSkorKdSheetInAllTagihan){
            const {siswa_id, nama_siswa, rombel, data, idbaris} = siswa;
            const currentSiswa = getOrCreateMap(mapperSiswaHasDataSkorKdSheet , siswa_id, ()=>({
                idbaris,
                siswa_id,
                nama_siswa,
                rombel,
                data:[],
                dataKdSheetMapper: new Map()
            }));
            currentSiswa.data.push(...data)
            for(const dataSheetKdApp of data){
                const { 
                        atp_id, jenisTagihan, kategoriAssesmen, kodeMapelKey, 
                        kolomKey, publikasi_id, skor, skorKdKey
                    } = dataSheetKdApp;

                const currentAtpMapperSiswa = getOrCreateMap(currentSiswa.dataKdSheetMapper, atp_id, ()=>({
                    dataSkorKd:[]
                }));
                currentAtpMapperSiswa.dataSkorKd.push(dataSheetKdApp);

                const atpBellongSiswa = getOrCreateMap(mapperAtpBelongsToSiswaHasDataSkorKdSheet, atp_id, ()=>({
                    belongsToSiswa:new Map()
                }));
                getOrCreateMap(atpBellongSiswa.belongsToSiswa, siswa_id, ()=>({
                    siswa_id,
                    nama_siswa,
                    rombel,
                    data:[]
                }))

            }
        }

        for(const [atp_id, atpHasSiswa] of mapperAtpBelongsToSiswaHasDataSkorKdSheet.entries()){
            const {belongsToSiswa} = atpHasSiswa;
            
            for(const [siswa_id, hasDataSkorKd] of mapperSiswaHasDataSkorKdSheet.entries()){
                const currentBelongToSiswa = belongsToSiswa.get(siswa_id);
                const currentSiswaHasSkorKdWhoseCurrentAtp = hasDataSkorKd.dataKdSheetMapper.get(atp_id)?.dataSkorKd ?? [];
                currentSiswaHasSkorKdWhoseCurrentAtp.forEach(item=>{
                    currentBelongToSiswa?.data?.push(item);
                    
                })
                // currentBelongToSiswa?.data?.push(...currentSiswaHasSkorKdWhoseCurrentAtp);
            }
        };
        
        return {
            mapperAtpBelongsToSiswaHasDataSkorKdSheet,
            mapperSiswaHasDataSkorKdSheet
        }

    }
}