import Decimal from "decimal.js";
import type { AtpContainKoleksiBankSoalMapperType } from "~/domain/atp-mapper/AtpContainKoleksiBankSoalType";
import type { Data_response_bySiswaType } from "~/domain/penilaian/type/Data_response_bySiswaType";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import type { TagihanInstrumenSoalCurrentAtp } from "~/domain/TagihanHasDataResponMapper/MapperSiswaHasInstrumenWithSkor";
import type { DataKdSheetApp } from "~/types/penilaian/DataKdSheetAppType";
import type { DataSheetSkorKdKategoriAsesmenAppType } from "~/types/penilaian/DataSheetSkorKdKategoriAsesmenAppType";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/RisponsePenilaianSiswaType";

type KoleksiSkor = (Decimal|null)[]
export function collectingSkorResponPerInstrumenAllTagihan(idCurrentSiswa:number, idAtp:number, strukturIsntrumen:TagihanInstrumenSoalCurrentAtp[]){
    const respon_koleksiSkorInstrumen:KoleksiSkor = [];
    
    for(const instrumen of strukturIsntrumen){
        const {soalSkor, tagihan, koleksiSkor} = instrumen;
        const koleksi_data_response_bySiswa:Data_response_bySiswaType|undefined = tagihan.data_response_bySiswa.find(s=>s.siswa.id === idCurrentSiswa);
        
        if(!koleksi_data_response_bySiswa) continue;

        const dataRespon = koleksi_data_response_bySiswa.data?.at(-1);
        if(!dataRespon){

            continue;
        }
        const koleksiRisponCurrentAtp = dataRespon.respon.filter(s=>s.atp === idAtp);
        for(const skorIsntrumen of koleksiRisponCurrentAtp){
            const {atp, atp_soal, soal, skor} = skorIsntrumen
            if(atp === idAtp){
                if(skor === null || skor === undefined){
                    respon_koleksiSkorInstrumen.push(null);
                }else{
                    respon_koleksiSkorInstrumen.push(Decimal(skor));

                }
            }
        }

        
    }

    return respon_koleksiSkorInstrumen
}

export function collectingSkorSheetKdPerInstrumenAllTagihan(idCurrentSiswa:number, idAtp:number, strukturIsntrumen:TagihanInstrumenSoalCurrentAtp[]){
    const sheet_koleksiSkorInstrumen:KoleksiSkor = [];
    
    for(const instrumen of strukturIsntrumen){
        const {soalSkor, tagihan, koleksiSkor} = instrumen;
        const sourceDataSkorKdSheet:DataSheetSkorKdKategoriAsesmenAppType|undefined = tagihan.dataSkorKdSheet.find(s=>s.siswa_id === idCurrentSiswa);
        const koleksiSoalCurrentId = tagihan.bank_soal_collections.filter(s=>s.kd_id === idAtp);
        const countSoalCurrentId = koleksiSoalCurrentId.length;
       
       if(!sourceDataSkorKdSheet) continue
        const dataSheetCurrentId:DataKdSheetApp[] = sourceDataSkorKdSheet.data.filter(s=>s.atp_id === idAtp && s.publikasi_id === tagihan.idbaris);
        for(const sheetKD of dataSheetCurrentId){
            const {atp_id, skor} = sheetKD;
            if(skor===null){
                sheet_koleksiSkorInstrumen.push(skor)
            }else{
                const jumlahSkor = Decimal(skor).times(countSoalCurrentId).toDecimalPlaces(0);
                sheet_koleksiSkorInstrumen.push(jumlahSkor);
            }


        }

        
    }

    return sheet_koleksiSkorInstrumen
}

export function ResolveSkorSheetKd(idCurrentSiswa:number, idAtp:number, strukturIsntrumen:TagihanInstrumenSoalCurrentAtp[]){
    const respon_koleksiSkorInstrumen:KoleksiSkor = collectingSkorResponPerInstrumenAllTagihan(idCurrentSiswa, idAtp, strukturIsntrumen);
    const sheet_koleksiSkorInstrumen:KoleksiSkor = collectingSkorSheetKdPerInstrumenAllTagihan(idCurrentSiswa, idAtp, strukturIsntrumen);

    const respon_koleksiSkorSkipNull = respon_koleksiSkorInstrumen.filter(s=>s!==null);
    const sheet_koleksiSkorSkipNull = sheet_koleksiSkorInstrumen.filter(s=>s!==null);

    const respon_jumlahSkor = Decimal.sum(...respon_koleksiSkorSkipNull).toDecimalPlaces(0).toNumber();
    const sheet_jumlahSkor = Decimal.sum(...sheet_koleksiSkorSkipNull).toDecimalPlaces(0).toNumber();

    const isEqual = respon_jumlahSkor === sheet_jumlahSkor;


     for(const instrumen of strukturIsntrumen){
        const {soalSkor, tagihan, koleksiSkor} = instrumen; 
        for(const itemSoalSkor of soalSkor){
            const {bentukSoal, data, source} = itemSoalSkor;
            
            
            for(const bankSoalWIthNoSoalAndSkor of data){
                const {no_soal, skor, kd_id, bentuk_soal} = bankSoalWIthNoSoalAndSkor;


            }
        }

        

     }


    
}