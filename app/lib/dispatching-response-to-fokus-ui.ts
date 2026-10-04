
import { store } from "~/context-reduct/redux-provider";
import { setFokusSerahTerimaDokumen } from "~/context-reduct/global-state/ui-fokus/ui-fokus-slice";
import OrmSerahTerimaTransaksi from "~/domain/serah-terima/service/orm-serah-terima-transaksi";
import DtoSerahTerimaDokumen from "~/dtos/dto-serah-terima-dokumen";
import DtoTransaksiSerahTerimaDokumen from "~/dtos/dto-transaksi-serah-terima";
import type { TransaksiSerahTerimaDokumenSliceType } from "~/context-reduct/global-state/galleries/transaksi-serah-terima-dokumen-slice";
import type { SerahTerimaDokumenSliceType } from "~/context-reduct/global-state/galleries/serah-terima-dokumen-slice";


export default function DispatchingResponseToFokusUi(serahTerimaDokumen:SerahTerimaDokumenSliceType,transaksiSerahterimaDokumen:TransaksiSerahTerimaDokumenSliceType, user_id:number|null){
    
    if(serahTerimaDokumen.loaded && transaksiSerahterimaDokumen.loaded && user_id){
        const serahTerima = DtoSerahTerimaDokumen.arrayFromSheetToApp(serahTerimaDokumen.data);
        const transaksi = DtoTransaksiSerahTerimaDokumen.arrayFromSheetToApp(transaksiSerahterimaDokumen.data);
        const orm = new OrmSerahTerimaTransaksi(serahTerima, transaksi).build().data
        const own_orm = orm.filter(s=>s.akses_user.includes(user_id??0));//[orm.length - 1]
        const firstOrm = own_orm[own_orm.length-1];
        store.dispatch(setFokusSerahTerimaDokumen(firstOrm.idbaris));
    }


}
