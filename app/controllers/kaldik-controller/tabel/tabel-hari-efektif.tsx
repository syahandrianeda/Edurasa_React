import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import type { detailPropertiHari, propertiHariDalamBulan } from "~/domain/kaldik/type-output-kaldik";

export function TableHariEfektif({
    caption='Jumlah Hari Efektif', 
    data, 
    sabtuLibur,
    isHeb,
    dataTotal,
    jp=1,
    sizeNormal=false,
}:{
    caption:string, 
    data:propertiHariDalamBulan[],
    sabtuLibur:boolean, 
    isHeb:boolean,
    dataTotal:detailPropertiHari,
    jp?:number
    sizeNormal?:boolean,
}){
    return (
        <table className={`border-collapse w-full ${sizeNormal?'text-xs':'text-[8px]'} mt-2`}>
            <thead>
                <TRowEdura>
                    <ThEdura rowSpan={2}>Bulan</ThEdura>
                    <ThEdura colSpan={sabtuLibur?5:6}>{caption}</ThEdura>
                    <ThEdura rowSpan={2}>Jumlah</ThEdura>
                </TRowEdura>
                <TRowEdura>
                    <ThEdura>Senin</ThEdura>
                    <ThEdura>Selasa</ThEdura>
                    <ThEdura>Rabu</ThEdura>
                    <ThEdura>Kamis</ThEdura>
                    <ThEdura>Jumat</ThEdura>
                    {!!sabtuLibur ? null: (<ThEdura>Sabtu</ThEdura>)}
                </TRowEdura>
            </thead>
            <tbody>
                {
                    data.map(({namaBulan,propertiesHariEfektif,propertiesHariEfektifBelajar},i)=>
                        <TRowEdura key={namaBulan}>
                            <TdEdura>{namaBulan}</TdEdura>
                            {
                                isHeb?(
                                    <>
                                        <TdEdura className="text-center">{propertiesHariEfektifBelajar.senin*jp}</TdEdura>
                                        <TdEdura className="text-center">{propertiesHariEfektifBelajar.selasa*jp}</TdEdura>
                                        <TdEdura className="text-center">{propertiesHariEfektifBelajar.rabu*jp}</TdEdura>
                                        <TdEdura className="text-center">{propertiesHariEfektifBelajar.kamis*jp}</TdEdura>
                                        <TdEdura className="text-center">{propertiesHariEfektifBelajar.jumat*jp}</TdEdura>
                                        {
                                            !!sabtuLibur ? null: (<TdEdura className="text-center">{propertiesHariEfektifBelajar.sabtu*jp}</TdEdura>)
                                        }
                                        <TdEdura className="text-center">{propertiesHariEfektifBelajar.total*jp}</TdEdura>
                                    </>
                                ):(
                                    <>
                                        <TdEdura className="text-center">{propertiesHariEfektif.senin}</TdEdura>
                                        <TdEdura className="text-center">{propertiesHariEfektif.selasa}</TdEdura>
                                        <TdEdura className="text-center">{propertiesHariEfektif.rabu}</TdEdura>
                                        <TdEdura className="text-center">{propertiesHariEfektif.kamis}</TdEdura>
                                        <TdEdura className="text-center">{propertiesHariEfektif.jumat}</TdEdura>
                                        {
                                            !!sabtuLibur ? null: (<TdEdura className="text-center">{propertiesHariEfektif.sabtu}</TdEdura>)
                                        }
                                        <TdEdura className="text-center">{propertiesHariEfektif.total}</TdEdura>
                                    </>
                                )
                            }
                        </TRowEdura>
                    )
                }
            </tbody>
            <tfoot>
                <TRowEdura>
                    <ThEdura>Total</ThEdura>
                    <ThEdura>{dataTotal.senin*jp}</ThEdura>
                    <ThEdura>{dataTotal.selasa*jp}</ThEdura>
                    <ThEdura>{dataTotal.rabu*jp}</ThEdura>
                    <ThEdura>{dataTotal.kamis*jp}</ThEdura>
                    <ThEdura>{dataTotal.jumat*jp}</ThEdura>
                    {
                        !!sabtuLibur ? null: (<ThEdura>{dataTotal.sabtu*jp}</ThEdura>)
                    }
                    <ThEdura>{dataTotal.total*jp}</ThEdura>
                </TRowEdura>
            </tfoot>
        </table>
    )
}