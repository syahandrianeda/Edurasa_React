import type { SerahTerimaDokumenAppType } from "~/types/galleries/serah-terima-dokumen-app-type";
import type {  SerahTerimaWithTransaksi } from "../entities/orm-serah-terima-type";
import type { TransaksiSerahTerimaDokumenAppType } from "~/types/galleries/transaksi-serah-terima-dokumen";
import type { TransaksiEventType } from "../entities/transaksi-event-type";
import type { InfoPersonalPtk } from "~/types/akun-sheet";
import type { InfoPersonalSiswa } from "~/types/siswa";

export default class OrmSerahTerimaTransaksi {
    private _data:SerahTerimaWithTransaksi[]=[]
    constructor(
        private readonly SerahTerima:SerahTerimaDokumenAppType[]=[],
        private readonly Transaksi:TransaksiSerahTerimaDokumenAppType[]=[]
    ){}
    get data(){
        return this._data;
    }
    build():this{
        this._data = [];
        const withoutHapus = this.SerahTerima.filter(s=>s.status==="");

        for(const item of withoutHapus){
            const found = this.Transaksi.filter(s=>s.serah_terima_idbaris === item.idbaris);
            const transaksiEvent = this.createTransaksiEvent(item.additional_info, item, found)
            const result:SerahTerimaWithTransaksi={
                ...item,
                transaksi:found,
                transaksiEvent
            };

            this._data.push(result)
        }

        return this;
    }
    
    createTransaksiEvent(persons:(InfoPersonalPtk|InfoPersonalSiswa)[], event:SerahTerimaDokumenAppType, transaksi:TransaksiSerahTerimaDokumenAppType[]):TransaksiEventType[]{

        const transaksiResult:TransaksiEventType[]=[]

        for(const person of persons){
            const transaksiPerson = transaksi.filter(s=>s.target_person_id === person.id && s.serah_terima_idbaris === event.idbaris);
            const transaksiItem:TransaksiEventType={
                event,
                person,
                transaksi:transaksiPerson
            }
            transaksiResult.push(transaksiItem);
        }

        return transaksiResult;
    }
}