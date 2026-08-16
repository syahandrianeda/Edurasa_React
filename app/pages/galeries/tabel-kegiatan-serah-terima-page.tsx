import { useCallback } from "react";
import { useModal } from "~/components/modals/modal-provider";
import { TdEdura, TdEduraFreeze, ThEdura, THEduraFreeze, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useAppSelector } from "~/context-reduct/hook";
import { OrmTendikInstance } from "~/context-reduct/selectores/orm-tendik-selector";
import SwitchTriggerModalSerahTerimaDokumen from "~/controllers/serah-terima-dokumen/modal/triggers/trigger-modal-in-table";
import {JenisSerahTerimaEnum } from "~/types/galleries/jenis-serah-terima-enum";
import { PersonalTypeEnum } from "~/types/galleries/personal-type-enum";
import type { SerahTerimaDokumenAppType } from "~/types/galleries/serah-terima-dokumen-app-type";

export default function TableKegiatanSerahTerimaPage({data}:{data:SerahTerimaDokumenAppType[]}){
    const {actions}=useModal<SerahTerimaDokumenAppType>();
    const user = useAppSelector(OrmTendikInstance);
    const findUser = useCallback((idPtk:number, tgl:Date)=>user.getDetailPtkInDate(tgl, idPtk),[user])
        
    return (
        <TableWithScrolling>
            <thead>
                <TRowEdura>
                    <THEduraFreeze stateFreeze={true}  className="print:hidden">Aksi</THEduraFreeze>
                    <ThEdura>No</ThEdura>
                    <ThEdura className="text-wrap">Nama Kegiatan</ThEdura>
                    <ThEdura className="text-wrap">Jenis Penyerahan</ThEdura>
                    <ThEdura className="text-wrap">Tanggal Kegiatan</ThEdura>
                    <ThEdura className="text-wrap">Item Dokumen/Barang</ThEdura>
                    <ThEdura className="text-wrap">Penerima</ThEdura>
                    <ThEdura className="text-wrap">Pendata (pengakses)</ThEdura>
                    <ThEdura>Keterangan</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                {
                    data.length ? data.map((m,i)=>
                        <TRowEdura key={m.idbaris}>
                            <TdEduraFreeze stateFreeze={true} className="print:hidden text-center align-top">
                                <SwitchTriggerModalSerahTerimaDokumen actions={actions} data={m}/>
                            </TdEduraFreeze>
                            <TdEdura>{i+1}.</TdEdura>
                            <TdEdura className="text-wrap min-w-32">{m.nama_kegiatan}</TdEdura>
                            <TdEdura>{JenisSerahTerimaEnum[m.jenis as keyof typeof JenisSerahTerimaEnum]}</TdEdura>
                            <TdEdura>{m.start_date.toLocaleDateString('id-ID', {dateStyle:'full'})}</TdEdura>
                            <TdEdura>{m.item_barang?.map((item,i)=><p key={i}>{i+1}. {item}</p>)}</TdEdura>
                            <TdEdura>{m.target_person.length} {PersonalTypeEnum[m.type_target as keyof typeof PersonalTypeEnum]}</TdEdura>
                            <TdEdura>{m.akses_user.map((id,i)=><p key={i}>{i+1}. {findUser(id, m.start_date)?.nama_guru}</p>)}</TdEdura>
                            <TdEdura>{m.keterangan}</TdEdura>
                        </TRowEdura>
                    ):(
                        <TRowEdura><TdEdura colSpan={9} className="text-center">Belum ada data</TdEdura></TRowEdura>
                    )
                }
            </tbody>
        </TableWithScrolling>
    )
}