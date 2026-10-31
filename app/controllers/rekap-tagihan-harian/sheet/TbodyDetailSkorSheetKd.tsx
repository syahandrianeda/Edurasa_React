import { TdEdura, TRowEdura } from "~/components/tabels/tabel-components";
import CardKalkulasiSkorSheet from "./CardKalkulasiSkorSheet";
import type { CollectionNilaiCpSheet } from "~/domain/kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/CollectionNilaiCpSheet";

type Props = {
    dataCp?: CollectionNilaiCpSheet[]
}
export default function TbodyDetailSkorSheetKd({dataCp}:Props){
    if(!dataCp){
        return (
            <tbody>
                <TRowEdura>
                    <TdEdura colSpan={3} className="text-center">Not Found</TdEdura>
                </TRowEdura>
            </tbody>
        )
    }
    return (
        <tbody>
            {
                dataCp.map((cp, iCp)=>
                    cp.koleksiTp.map((tp, iTp)=>
                        tp.koleksiAtp.map((atp, iAtp)=>
                            
                            <TRowEdura key={cp.cp_id+'_'+tp.tp_id+'_'+atp.atp_id}>
                                <TdEdura className="text-wrap">
                                    <div>
                                        [{atp.atp_id}] {atp.atp_description}
                                    </div>
                                    {/* {
                                        atp.detail?.map((itemDetail, iItem)=>
                                            <CardKalkulasiSkorSheet 
                                                key={itemDetail.dataSumberPublikasiPaket?.idbaris}
                                                jumlahInstrumen={itemDetail.countSoal}
                                                jumlahSkor={itemDetail.total}
                                                skor={itemDetail.skor}
                                                fokus="ATP"
                                            >
                                                <div className="font-bold text-center">{itemDetail.dataSumberPublikasiPaket?.nama_publikasi}</div>
                                            </CardKalkulasiSkorSheet>
                                        )
                                    } */}
                                     <CardKalkulasiSkorSheet 
                                                jumlahInstrumen={atp.countKeyAtp}
                                                jumlahSkor={atp.totalAtp}
                                                skor={tp.skorTp}
                                                fokus="TP"
                                            />
                                </TdEdura>
                                {
                                    iAtp === 0 && (
                                        <TdEdura className="text-wrap" rowSpan={tp.slotTp}>
                                            <div>
                                                [{tp.tp_id}] {tp.tp_description}
                                            </div>
                                            <CardKalkulasiSkorSheet 
                                                jumlahInstrumen={tp.countKeyTp}
                                                jumlahSkor={tp.totalTp}
                                                skor={tp.skorTp}
                                                fokus="TP"
                                            />
                                        </TdEdura>
                                    )
                                }
                                {
                                    iTp === 0 && iAtp === 0 && (
                                        <TdEdura className="text-wrap" rowSpan={cp.slotCp}>
                                            <div>
                                                [{cp.cp_id}] {cp.cp_description}
                                            </div>
                                            <CardKalkulasiSkorSheet 
                                                jumlahInstrumen={cp.countKeyCp}
                                                jumlahSkor={cp.totalCp}
                                                skor={cp.skorCp}
                                                fokus="CP"
                                            />
                                        </TdEdura>
                                    )
                                }
                            </TRowEdura>
                        )
                    )
                )
            }
        </tbody>
    )
}