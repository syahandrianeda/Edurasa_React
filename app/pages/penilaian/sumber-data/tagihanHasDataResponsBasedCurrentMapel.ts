import type { DataSkorTemplateImport, DetailSkorKdSource, KeyLabelTemplateImport, TemplateImportSkorToKd } from "~/domain/import-skor-to-kd/TemplateImportSkorToKd-type";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import type { InterfaceMapel } from "~/types/mapel/mapel";

export default function TagihanHasDataResponseBasedCurrentMapel(
    m:TagihanHasDataResponse, 
    currentMapel:InterfaceMapel, 
    rombel:string):TagihanHasDataResponse{
        
        const keySkorKD:string[] = m.keySkorKD.filter(key=>key.includes(currentMapel.kode));//Object.keys(SkorKdTemplate);
         const keyLabelSkorKd = keySkorKD.map(key=>({key, label:key, type:'number'}))
         const keyLabelRekapSkorKdSheet: KeyLabelTemplateImport[] = [
             {key:'index', label:'No', type:'number'},
             {key:'siswa_id', label:'Token Siswa', type:'number'},
             {key:'nama_siswa', label:'Nama Siswa', type:'string'},
             {key:'rombel', label:'Kelas', type:'string'},
             ...keyLabelSkorKd
         ];
        
        const peserta = m.peserta.filter(s=>s.nama_rombel === rombel);
        const data_respons          =  m.data_respons.filter(s=>s.publikasi_id === m.idbaris && s.rombel === rombel);//.map(nilaiSiswa=>{
         const data_response_bySiswa = peserta.map(siswa=>{
             const data = data_respons.filter(s=>s.siswa_id ===siswa.id)
             return {
                 siswa,
                 data
             }
         });
         

         const jumlahPeresponMap = new Map(data_respons.map(r=>([r.siswa_id, r])));
         const jumlahPerespon = [...jumlahPeresponMap.keys()].length;
        //  const jumlahDuplikat = data_respons.length> jumlahPerespon ? data_respons.length-jumlahPerespon: 0
         
         const dataSkorKd  : TemplateImportSkorToKd[] = m.dataSkorKd.filter(s=>s.rombel === rombel).map(n=>{
                const dataSkorDecision:DataSkorTemplateImport=Object.fromEntries(Object.entries(n.dataSkorDecision).filter(([key,value])=>key.includes(currentMapel.kode)));
                const dataSkorTemplateImport:DataSkorTemplateImport=Object.fromEntries(Object.entries(n.dataSkorTemplateImport).filter(([key,value])=>key.includes(currentMapel.kode)));
                const detailSkor:DetailSkorKdSource[]=n.detailSkor.filter(s=>s.keySkorKd.includes(currentMapel.kode))
                const key = Object.keys(dataSkorTemplateImport)


                return {
                    ...n,
                    dataSkorDecision,
                    dataSkorTemplateImport,
                    detailSkor,
                    key
                }
            });
    
    
     
     return {
         ...m,
         // is_validPaketSoal:true,
        //  messageInvalid,
        //  detail_target,
         data_respons,

        //  isMultiple,
        //  koleksi_mapelName,
        //  kurikulum_tagihan,
         peserta,
        //  total_instrumen,
        //  bank_soal_collections,
        //  sebaran_kurikulum_by_bentuk_soal,
        //  // templateKoreksi,
         data_response_bySiswa,
         jumlahPerespon,
        //  jumlahDuplikat,
         keySkorKD,
         dataSkorKd,
         keyLabelRekapSkorKdSheet,
         target_rombel:[rombel]
        //  tipe_assesmen,
        //  dataSkorKdSheet,
        //  sebaranNoSoalFromPropertyKurikulumWithScore:SkorKdCreated
     };
    // const peserta = source?.peserta.filter(s=>s.nama_rombel === rombel);
    // const data_response_bySiswa = source?.data_response_bySiswa.filter(s=>s.siswa.nama_rombel === rombel)
    // const dataSkorKd = source?.dataSkorKd.filter(s=>s.rombel === rombel).map(m=>{
    //     const dataSkorDecision:DataSkorTemplateImport=Object.fromEntries(Object.entries(m.dataSkorDecision).filter(([key,value])=>key.includes(currentMapel.kode)));
    //     const dataSkorTemplateImport:DataSkorTemplateImport=Object.fromEntries(Object.entries(m.dataSkorTemplateImport).filter(([key,value])=>key.includes(currentMapel.kode)));
    //     const detailSkor:DetailSkorKdSource[]=m.detailSkor.filter(s=>s.keySkorKd.includes(currentMapel.kode))
    //     const key = Object.keys(dataSkorTemplateImport)


    //     return {
    //         ...m,
    //         dataSkorDecision,
    //         dataSkorTemplateImport,
    //         detailSkor,
    //         key
    //     }
    // });
        
    // const keyLabelSkorKd = dataSkorKd[0]?.key.map(key=>({key, label:key, type:'number'}))
    // const keyLabelRekapSkorKdSheet: KeyLabelTemplateImport[] = [
    //     {key:'index', label:'No', type:'number'},
    //     {key:'siswa_id', label:'Token Siswa', type:'number'},
    //     {key:'nama_siswa', label:'Nama Siswa', type:'string'},
    //     {key:'rombel', label:'Kelas', type:'string'},
    //     ...keyLabelSkorKd
    // ];
    
    // return { 
    //     ...source,
    //     data_respons:dataResponRombel,
    //     peserta,
    //     dataSkorKd, 
    //      data_response_bySiswa, 
    //      target_rombel:[rombel],
    //     keyLabelRekapSkorKdSheet,
    //     keySkorKD:dataSkorKd[0]?.key

    //     }
    
}