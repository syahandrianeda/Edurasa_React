import type { DataSkorTemplateImport, DetailSkorKdSource, KeyLabelTemplateImport, TemplateImportSkorToKd } from "~/domain/import-skor-to-kd/TemplateImportSkorToKd-type";
import type { SkorKdFromImportExcelType } from "./skor-kd-from-import-excel-type";
import type { JenisTagihanPenilaiantype } from "~/domain/asesmen-penilaian/jenis-tagihan-type";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";

export default class ConverterDataImportToTemplateSkorUI{
    static convert(data:SkorKdFromImportExcelType[], currentData:TagihanHasDataResponse):TemplateImportSkorToKd[]{
      //  keySkorKd:string[], jenisTagihan:JenisTagihanPenilaiantype['kode'], publikasi_id:number;
      const keySkorKd = currentData.keySkorKD;
      const jenisTagihan = currentData.jenis_tagihan.kode;
      const publikasi_id = currentData.idbaris;
      const skorKdSheet = currentData.dataSkorKd;
      
      


        return data.map(item=>{
              const siswa_id= Number(item["Token Siswa"]);
              const foundRespon = skorKdSheet.find(s=>s.siswa_id === siswa_id );
              const hasRespon = Boolean(foundRespon)?1:0
              
              /** data ini sebagai data `sheet`, anggap data ini adalah data server */
              // const data:DataSkorTemplateImport = keySkorKd.map(key=>({[key]:Number(item[key])})).reduce((a,b)=>({...a,...b}));
              const data:DataSkorTemplateImport = keySkorKd.map(key=> {
                const nilai = item[key] ? Number(item[key]):null;
                return {
                  [key]:nilai
                }
              }
              ).reduce((a,b)=>({...a,...b}));
              // console.log(item)
              if(!item){
                console.log('item excpet', item)
              }
              const detailSkor:DetailSkorKdSource[]= Object.keys(data).map(key=>{
                      // const skorRespon = skorKdSheet.find(s=>s.siswa_id === siswa_id )?.dataSkorTemplateImport?.skor ?? null
                      
                      const skorRespon = skorKdSheet.find(s=>s.siswa_id === siswa_id )?.detailSkor.find(s=>s.keySkorKd === key)?.skorRespon ?? null
                      const isSameValueBothResource = skorRespon === data[key]
                      return {
                        skorDecision: data[key] ?? null,
                        skorRespon,
                        skorSheet: data[key] ?? null,
                        fromSource: 'sheet',
                        keySkorKd:key,
                        isSameValueBothResource
                      }
                    })
            /**
            const siswa_id = siswa.id;
                const nama_siswa = siswa.pd_nama;
                const rombel = siswa.nama_rombel;
                const lastData = data.at(-1);
                const hasRespon = data.length === 0 ? 0: 1;
                const foundSkorKdSheet = skorKdSheet.find(s=>s.siswa_id === siswa.id && s.data.length > 0);
                const hasSkorKdSheet = Boolean(foundSkorKdSheet);
                const skorResponNull = Boolean(hasRespon)? 0: null
                let dataSkorTemplateImport = key.map(m=>({[m]:skorResponNull})).reduce((a,b)=>({...a, ...b}));
                
                if(lastData){
                    const objekKdSebaran = lastData.objekKdSebaran;
                    dataSkorTemplateImport = {...dataSkorTemplateImport, ...objekKdSebaran};
                };

                
                const detailSkor:DetailSkorKdSource[] = key.map(skorKdKey=>{
                    const fromSource = hasSkorKdSheet?'sheet':'respon';
                    const skorSheet = foundSkorKdSheet?.data?.find(s=>s.skorKdKey === skorKdKey )?.skor ??   null;
                    const skorRespon = dataSkorTemplateImport[skorKdKey] ?? null;
                    // const source = hasSkorKdSheet ? foundSkorKdSheet : dataSkorTemplateImport;
                    const skorDecision = hasSkorKdSheet? skorSheet : skorRespon;
                    const isSameValueBothResource = skorSheet === skorRespon
                    return {
                        skorDecision,
                        skorRespon,
                        skorSheet,
                        fromSource,
                        keySkorKd:skorKdKey,
                        isSameValueBothResource,
                    }

                })
                const dataSkorDecision = detailSkor.map(m=>({[m.keySkorKd]:m.skorDecision})).reduce((a,b)=>({...a,...b}))
             *  */              
              
            return {
            siswa_id,
            nama_siswa: item["Nama Siswa"],
            rombel: item["Kelas"],
            hasRespon,
            key:keySkorKd,
            dataSkorTemplateImport: data,
            // detailSkor:[],
            detailSkor,
            dataSkorDecision:data,
            jenisTagihan,
            publikasi_id
          }
        })
    }
}