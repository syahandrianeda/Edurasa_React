
import { useCallback } from "react";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { TdEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { JenisSerahTerimaEnum } from "~/types/galleries/jenis-serah-terima-enum";
import { PersonalTypeEnum } from "~/types/galleries/personal-type-enum";
import { type SerahTerimaDokumenAppType } from "~/types/galleries/serah-terima-dokumen-app-type";
import { useAppSelector } from "~/context-reduct/hook";
import { OrmTendikInstance } from "~/context-reduct/selectores/orm-tendik-selector";
import { cn } from "~/lib/utils";

export default function TableInfoSerahTerimaDokumenModal({className}:{className?:string}){
    const {currentData} = useFormEdura<SerahTerimaDokumenAppType>();
    const user = useAppSelector(OrmTendikInstance);
    const findUser = useCallback((id:number) => user.getDetailPtkInDate(currentData.start_date, id),[currentData.start_date])
    
    return (
        <TableWithScrolling inModal={true} className={cn("w-fit border-0 outline-none", className)}>
            <tbody>
                <TRowEdura>
                    <TdEdura className="border-0">Nama Kegiatan Penyerahan/Penerimaan</TdEdura>
                    <TdEdura className="border-0">:</TdEdura>
                    <TdEdura className="border-0">{currentData?.nama_kegiatan}</TdEdura>
                </TRowEdura>
                <TRowEdura>
                    <TdEdura className="border-0">Jenis Kegiatan Penyerahan/Penerimaan</TdEdura>
                    <TdEdura className="border-0">:</TdEdura>
                    <TdEdura className="border-0">{JenisSerahTerimaEnum[currentData?.jenis as keyof typeof JenisSerahTerimaEnum]}</TdEdura>
                </TRowEdura>
                <TRowEdura>
                    <TdEdura className="border-0">Tanggal Kegiatan</TdEdura>
                    <TdEdura className="border-0">:</TdEdura>
                    <TdEdura className="border-0">{currentData?.start_date.toLocaleDateString('id-ID', {dateStyle:'full'})}</TdEdura>
                </TRowEdura>
                <TRowEdura>
                    <TdEdura className="border-0">Ditujukan kepada</TdEdura>
                    <TdEdura className="border-0">:</TdEdura>
                    <TdEdura className="border-0">{PersonalTypeEnum[currentData?.type_target as keyof typeof PersonalTypeEnum]}</TdEdura>
                </TRowEdura>
                <TRowEdura>
                    <TdEdura className="border-0">Dokumen/Barang yang diserah/terimakan</TdEdura>
                    <TdEdura className="border-0">:</TdEdura>
                    <TdEdura className="border-0">{currentData?.item_barang.map((m,i)=><p key={i}>{i+1}. {m}</p>)}</TdEdura>
                </TRowEdura>
                <TRowEdura>
                    <TdEdura className="border-0">Pengakses</TdEdura>
                    <TdEdura className="border-0">:</TdEdura>
                    <TdEdura className="border-0">{currentData?.akses_user.map((m,i)=><p key={i}>{i+1}. {findUser(m)?.nama_guru}</p>)}</TdEdura>
                </TRowEdura>
            </tbody>
        </TableWithScrolling>
    )
}