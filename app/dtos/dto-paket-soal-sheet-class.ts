import type { PaketSoalAppType, PaketSoalAppWithPublikasi } from "~/types/bank-soal/entities/paket-soal-app-type";
import type { PaketSoalSheetType } from "~/types/bank-soal/entities/paket-soal-sheet-type";
import DtoResolverTypeClass from "./dto-resolver-class";
import type { PraSettingPaket } from "~/domain/paket-soal/entities/pra-setting-paket";
import type { IdentitasKontenPaket } from "~/domain/paket-soal/entities/identitas-paket";
import type { PraSettingBaku } from "~/types/bank-soal/entities/PraSettingBaku";
import type { AtpHasManySoalType } from "~/domain/bank-soal/relational-soal/type";
import { ListBentukSoal } from "~/domain/bank-soal/list-bentuk-soal";
import type { TypePaketSoal } from "~/domain/paket-soal/entities/type-paket";
import { getNumberFromString } from "~/lib/get-number";
import type { PublikasiPaketAppType } from "~/types/bank-soal/entities/publikasi-paket-app-type";

export default class DtoPaketSoalSheetClass extends DtoResolverTypeClass{
    private dataPaketSoalAppType:PaketSoalAppType[]=[];
    private dataPaketSoalAppWithPublikasiType:PaketSoalAppWithPublikasi[]=[];
    // private dataKontenSaolType:
    constructor(
            private readonly dataSheet: PaketSoalSheetType[], 
            private readonly AtpHasBankSoal:AtpHasManySoalType[], 
            private readonly rombelArg:string,
            private readonly publikasiPaket:PublikasiPaketAppType[],
    ){
        super()
    }
    get jenjang(){
        return getNumberFromString(this.rombelArg);
    }
    /** getter dataSheet */;
    get purDataSheet():PaketSoalSheetType[]{
        return this.dataSheet;
    }

    get dataPaketSoalApp():PaketSoalAppType[]{
        return this.dataPaketSoalAppType
    }

    get dataPaketSoalAppWithPublikasi():PaketSoalAppWithPublikasi[]{
        return this.dataPaketSoalAppWithPublikasiType;
    }

    toPaketSoalAppType(itemPaketSoal:PaketSoalSheetType):PaketSoalAppType{
        const idbaris = this.makeSureNumber(itemPaketSoal.idbaris);
        const lintas_mapel = this.numberToBoolean(itemPaketSoal.lintas_mapel);
        const id_banksoal = this.stringToArrayNumber(itemPaketSoal.id_banksoal);
        const start_time = this.parseDate(itemPaketSoal.start_time, 'start_time');
        const durasi    = this.makeSureNumber(itemPaketSoal.durasi);
        const is_complete = this.numberToBoolean(itemPaketSoal.is_complete);
        const json_setting = this.parseSettingPaketSoal(itemPaketSoal.json_setting ?? '');
        const target_asesmen = itemPaketSoal.target_asesmen
        const target_rombel = itemPaketSoal.target_rombel;
        const nama_paket = itemPaketSoal.nama_paket;
        const kurikulum_name = itemPaketSoal.kurikulum_name;
        const user = itemPaketSoal.user;
        const status = itemPaketSoal.status;
        const id_file_json = itemPaketSoal.id_file_json 
        /** mapel_name dan kode_mapel di sini posisinya kebalik */
        const kode_mapel = this.stringToArrayString(itemPaketSoal.mapel_name);
        const mapel_name=this.stringToArrayString(itemPaketSoal.mapel_name);

        return {
            idbaris,
            target_asesmen     ,
            target_rombel       ,
            nama_paket          ,
            lintas_mapel,
            kode_mapel          ,
            id_banksoal         ,
            json_setting        ,
            start_time          ,
            durasi              ,
            kurikulum_name      ,
            user                ,
            status              ,
            is_complete         ,
            mapel_name          ,
            id_file_json

        }
    }
    toPaketSoalAppWithPublikasiType(itemPaketSoal:PaketSoalSheetType):PaketSoalAppWithPublikasi{
        const paketSoalAppType = this.toPaketSoalAppType(itemPaketSoal);
        const data_publikasi = this.publikasiPaket.filter(s=>s.paket_soal_id === itemPaketSoal.idbaris && s.status === '').map(m=> ({...m, id_file_paket:itemPaketSoal.id_file_json ?? '', is_validPaketSoal:(itemPaketSoal.id_file_json === m.id_file_setting), json_setting: JSON.parse(itemPaketSoal.json_setting) } ))
        return {...paketSoalAppType, data_publikasi }
    }
    init():this{
        this.dataPaketSoalAppType = this.dataSheet.map(m=>this.toPaketSoalAppType(m)).filter(s=>getNumberFromString(s.target_rombel)===this.jenjang);
        this.dataPaketSoalAppWithPublikasiType = this.dataSheet.map(m=>this.toPaketSoalAppWithPublikasiType(m)).filter(s=>getNumberFromString(s.target_rombel)===this.jenjang);
        return this;
    }
    /**
     * ====================
     *  UTILITY
     * ===========
     */

    
    /** genterate data json_setting */
    parseSettingPaketSoal(value:string): PraSettingPaket{
        const praSettingBaku = this.parseJsonSettingBaku(value);
        const kurikulum = this.AtpHasBankSoal.filter(item=>praSettingBaku.kurikulum.includes(item.atp_as_tp_id));//praSettingBaku.kurikulum?.map(m=> this.AtpHasBankSoal.find(s=>s.atp_as_tp_id === m)) ?? [];
        // const identitas = praSettingBaku.identitas!
        // const target_paket = praSettingBaku.data_target
        const count_bentuk_soal =   praSettingBaku.count_bentuk_soal.map(m=>{
            const dataBentukSoal = ListBentukSoal.find(s=>s.name === m.dataBentukSoal)!
            return {
                ...m,
                dataBentukSoal
            }
        })
        return {...praSettingBaku,  kurikulum, count_bentuk_soal} as PraSettingPaket;
    }
    /**
     * Mengubah string JSON Sheet menjadi
     * PraSettingBaku.
     *
     * Selain JSON.parse(), tanggal juga direstore
     * menjadi object Date.
     */
    parseJsonSettingBaku( value: string ): PraSettingBaku{

        const parsed: unknown = this.parseJson(
            value,
            'json_setting'
        );

        if (!this.isObject(parsed)) {
            throw new Error(
                'json_setting harus berupa object.'
            );
            
        }

        const data = parsed as Record<string, unknown>;

        const identitas = data.identitas;

        if (!this.isObject(identitas)) {
            throw new Error(
                'json_setting.identitas tidak valid.'
            );
        }

        const identitasData = {
                    ...identitas,

                    start_time: this.parseDate(
                        identitas.start_time,
                        'json_setting.identitas.start_time'
                    ),

                    ...(identitas.end_time
                        ? {
                            end_time: this.parseDate(
                                identitas.end_time,
                                'json_setting.identitas.end_time'
                            )
                        }
                        : {}
                    )
                } as IdentitasKontenPaket;

        return {
            ...data,
            identitas: identitasData
        } as PraSettingBaku;
    }
    
}