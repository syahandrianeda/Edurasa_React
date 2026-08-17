
import { store } from "~/context-reduct/redux-provider";
import { setFokusSerahTerimaDokumen } from "~/context-reduct/global-state/ui-fokus/ui-fokus-slice";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import type{ UserPtk } from "~/types";
import OrmSerahTerimaTransaksi from "~/domain/serah-terima/service/orm-serah-terima-transaksi";
import DtoSerahTerimaDokumen from "~/dtos/dto-serah-terima-dokumen";
import DtoTransaksiSerahTerimaDokumen from "~/dtos/dto-transaksi-serah-terima";


export default async function DispatchingResponseToFokusUi(){
    // if(detailResponse?.namaTab === namaTab('serah_terima_dokumen')){
            
    //         store.dispatch(setSerahTerimaDokumen(data as unknown as SerahTerimaDokumenSheetType[]))
    //     }
    //     if(detailResponse?.namaTab === namaTab('transaksi_serah_terima')){
            
    //         store.dispatch(setTransaksiSerahTerimaDokumen(data as unknown as TransaksiSerahTerimaDokumenSheetType[]))
    //     }

    const exist = store.getState();
    const user_id = getSessionApp<UserPtk>()?.id;
    if(exist.serahTerimaDokumen.loaded && exist.transaksiSerahterimaDokumen.loaded){
        const serahTerima = DtoSerahTerimaDokumen.arrayFromSheetToApp(exist.serahTerimaDokumen.data);
        const transaksi = DtoTransaksiSerahTerimaDokumen.arrayFromSheetToApp(exist.transaksiSerahterimaDokumen.data);
        const orm = new OrmSerahTerimaTransaksi(serahTerima, transaksi).build().data
        const own_orm = orm.filter(s=>s.akses_user.includes(user_id??0));//[orm.length - 1]
        const firstOrm = own_orm[own_orm.length-1];
        store.dispatch(setFokusSerahTerimaDokumen(firstOrm.idbaris));
        
    }


}
