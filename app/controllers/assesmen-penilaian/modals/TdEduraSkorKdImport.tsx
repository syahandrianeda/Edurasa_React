import * as React from "react";
import { TdEdura } from "~/components/tabels/tabel-components";
import type { TemplateImportSkorToKd } from "~/domain/import-skor-to-kd/TemplateImportSkorToKd-type";
import { cn } from "~/lib/utils";

export default function TdEduraSkorKd({ source, keySource }: { source: TemplateImportSkorToKd; keySource: string; }) {
    let title: string = '';
    const detail = source.detailSkor
    
    let className: string = '';
    const currentDetail = detail.find(s=>s.keySkorKd === keySource);
    if(currentDetail){
        if(currentDetail.skorSheet === null){
            if(currentDetail.skorRespon === null){
                    className="bg-rose-300";
                    
                    title='Tidak mengirimkan data/tidak ikut daring'
                    title+='\r\n skor respon =' + currentDetail.skorRespon
                    title+='\r\n skor server =' + currentDetail.skorSheet
                }else{
                    className="bg-amber-300";
                    title='Belum dikoreksi/bantu isi skor'
                    title+='\r\n skor respon =' + currentDetail.skorRespon
                    title+='\r\n skor server =' + currentDetail.skorSheet
                }
        }else{
            if(currentDetail.skorRespon === null){
                    className="bg-sky-300";
                    
                    title='Nilai hasil Import'
                    title+='\r\n skor respon =' + currentDetail.skorRespon
                    title+='\r\n skor server =' + currentDetail.skorSheet
                }else{
                    if(currentDetail.isSameValueBothResource && currentDetail.fromSource === 'sheet'){
                        className="bg-green-300";
                        title='Skor valid, nilai respon dan server sama'
                        title+='\r\n skor respon =' + currentDetail.skorRespon
                        title+='\r\n skor server =' + currentDetail.skorSheet

                    }else{
                       className="bg-amber-200";
                        title='skor berbeda antara skor server dan skor respon siswa'
                        title+='\r\n skor respon =' + currentDetail.skorRespon
                        title+='\r\n skor server =' + currentDetail.skorSheet 
                        title+='\r\n Biasanya terjadi ketika Anda mengimport nilai KD, tanpa melakukan koreksi (validasi skor)/bantu isi skor'    
                    }
                }
        }
    }   
        // if(currentDetail.isSameValueBothResource && currentDetail.fromSource === 'sheet' && currentDetail.skorDecision !== null){
        //     className="bg-green-300";
        //     title+='\r\n skor valid dan disimpan ke server'
        //     title+='\r\n skor respon =' + currentDetail.skorRespon
        //     title+='\r\n skor server =' + currentDetail.skorSheet
        // }
        // if(currentDetail.isSameValueBothResource && currentDetail.fromSource === 'respon' && currentDetail.skorDecision === null){
        //     className="bg-rose-300";
            
        //     title+='\r\n Tidak mengirimkan data/tidak ikut daring'
        //     title+='\r\n skor respon =' + currentDetail.skorRespon
        //     title+='\r\n skor server =' + currentDetail.skorSheet
        // }
        // if(!currentDetail.isSameValueBothResource && currentDetail.fromSource === 'sheet' ){
        //     className="bg-sky-300";
            
        //     title+='\r\n skor berbeda antara skor server dan skor respon siswa'
        //     title+='\r\n skor respon =' + currentDetail.skorRespon
        //     title+='\r\n skor server =' + currentDetail.skorSheet
        //     title+='\r\n Biasanya terjadi ketika Anda mengimport nilai KD, tanpa melakukan koreksi (validasi skor)/bantu isi skor'
        // }
        // if(!currentDetail.isSameValueBothResource && currentDetail.fromSource === 'respon'){
        //     className="bg-amber-300";
            
        //     title+='\r\n skor berbeda antara skor server dan skor respon siswa'
        //     title+='\r\n skor respon =' + currentDetail.skorRespon;
        //     title+='\r\n skor server =' + currentDetail.skorSheet;
        //     title+='\r\n Biasanya terjadi ketika Anda belum melakukan koreksi, dan belum/gagal menyimpan ke server'
        // }
    // }
    return (
        <TdEdura className={cn("text-center", className)} title={title}>{source.dataSkorDecision[keySource]}</TdEdura>
    );
}
