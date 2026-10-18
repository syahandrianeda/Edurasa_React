import type { DataSheetSkorKdKategoriAsesmenAppType } from "~/types/penilaian/DataSheetSkorKdKategoriAsesmenAppType";
import SkorKdBuilder from "../penilaian/infrastucture/SkorKdBuilder";
import SkorKdSebaranBuilder from "../penilaian/infrastucture/SkorKdSebaranBuilder";
import type { GroupBentukSoalPropertiKurikulumInPublikasiAssesmen, GroupSebaranNoSoalFromPropertyKurikulum } from "../penilaian/model/grouping-kurikulum-by-bentuksoal";
import type { Data_response_bySiswaType } from "../penilaian/type/Data_response_bySiswaType";
import type { DetailSkorKdSource, TemplateImportSkorToKd } from "./TemplateImportSkorToKd-type";
import type { JenisTagihanPenilaiantype } from "../asesmen-penilaian/jenis-tagihan-type";

export default class TemplateImportSkorToKdBuilder{
    static build(data_response_by_siswa:Data_response_bySiswaType[], objekKdSebaran:Record<string, number>, skorKdSheet:DataSheetSkorKdKategoriAsesmenAppType[], jenisTagihan:JenisTagihanPenilaiantype['kode'], publikasi_id:number): TemplateImportSkorToKd[]{
            const key = Object.keys(objekKdSebaran)
           return data_response_by_siswa.map(({data, siswa})=>{
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
            return {
                siswa_id,
                nama_siswa,
                rombel,
                hasRespon,
                key,
                dataSkorTemplateImport,
                detailSkor,
                dataSkorDecision,
                jenisTagihan,
                publikasi_id
            }
        })
    }
    // static build(data_response_by_siswa:Data_response_bySiswaType[], sebaran_kurikulum_by_bentuk_soal:GroupSebaranNoSoalFromPropertyKurikulum):TemplateImportSkorToKd[]{
    //     const sourceObjekSkorKd = SkorKdSebaranBuilder.build(sebaran_kurikulum_by_bentuk_soal,[]);
    //     const objekKdSebaran = SkorKdBuilder.build(sourceObjekSkorKd.data);//sourceObjekSkorKd.data.map(m=>m.objekSkorKd).reduce((a,b)=>({...a,...b}));
    //     const keyObj = Object.keys(objekKdSebaran);
        
    //     return data_response_by_siswa.map(({data, siswa})=>{
    //         const siswa_id = siswa.id;
    //         const nama_siswa = siswa.pd_nama;
    //         const rombel = siswa.nama_rombel;
    //         const lastData = data.at(-1);
    //         const hasRespon = data.length === 0 ? 0: 1;
    //         let dataSkorTemplateImport = keyObj.map(m=>({[m]:0})).reduce((a,b)=>({...a, ...b}));
    //         if(lastData){
    //             const objekKdSebaran = lastData.objekKdSebaran;
    //             dataSkorTemplateImport = {...dataSkorTemplateImport, ...objekKdSebaran};
    //         }
    //         return {
    //             siswa_id,
    //             nama_siswa,
    //             rombel,
    //             hasRespon,
    //             key: keyObj,
    //             dataSkorTemplateImport
    //         }
    //     })
    // }
}