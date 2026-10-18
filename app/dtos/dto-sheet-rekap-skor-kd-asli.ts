import SwitchKategoriTagihan from "~/domain/asesmen-penilaian/switch-kategori-tagihan-class";
import type { DataKdSheetApp } from "~/types/penilaian/DataKdSheetAppType";
import type { DataSheetSkorKdKategoriAsesmenAppType } from "~/types/penilaian/DataSheetSkorKdKategoriAsesmenAppType";
import type { ValidatedResponseSiswa } from "~/types/penilaian/rekap_sementara_sheet_type";

export default class DTOSheetRekapSkorKdAsli{
    static fromSheet(data: ValidatedResponseSiswa):DataSheetSkorKdKategoriAsesmenAppType{
        const dataKd:DataKdSheetApp[] = DTOSheetRekapSkorKdAsli.dataKdSheetAppBuild(data);
        return {
            idbaris: Number(data.idbaris),
            siswa_id: Number(data.siswa_id),
            nama_siswa: String(data.nama_siswa),
            rombel: String(data.rombel),
            data:dataKd
        }
    }
    static arrayFromSheet(data:ValidatedResponseSiswa[]):DataSheetSkorKdKategoriAsesmenAppType[]{
        return data.map(this.fromSheet);
    }
    private static dataKdSheetAppBuild(data:ValidatedResponseSiswa):DataKdSheetApp[]{
        const result:DataKdSheetApp[]=[];
           for (const key in data) {
               if (/^.+_.+_\d+_\d+$/.test(key)) {
                   /** 
                    * key format: `<jenisTagihan>_<kodemapel>_<atp_id>_<publikasi_id>` */
                   const splitKey= key.split('_');
                   const jenisTagihan  = splitKey[0];
                   const kodeMapelKey  = splitKey[1];
                   const atp_id        = Number(splitKey[2]);
                   const skorKdKey     = kodeMapelKey+'_'+atp_id;
                   const publikasi_id  = Number(splitKey[3]);
                   const skor          = data[key]===""?null:Number(data[key]);
                   const kategoriAssesmen = new SwitchKategoriTagihan(jenisTagihan).kategori;
                   const kolomKey = key;
                //    console.log({key, splitKey})
                    result.push({
                        kolomKey,
                        jenisTagihan,
                        kodeMapelKey,
                        atp_id,
                        skorKdKey,
                        publikasi_id,
                        skor,
                        kategoriAssesmen
                    })

                }
            }
            
        return result;
    }
}