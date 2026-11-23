import CardKalkulasiSkorSheet from "~/controllers/rekap-tagihan-harian/sheet/CardKalkulasiSkorSheet";
import type { DataRekapRaportSementaraSheetPreview } from "./SheetDetailRekapRaportSementara";
import Decimal from "node_modules/decimal.js/decimal";


export function CardSummaryRekapRaport({ item }: { item: DataRekapRaportSementaraSheetPreview|null; }) {
    const sourceData = item?.source;
    //SkorNilaiFromResponWithSource|SkorNilaiFromSheetKdWithSource
    
    const koleksiJumlahInstrumen = item?.data?.sumberMaxMin?.map(m=>m.countInstrumen) ?? [];
    const jumlahInstrumen = koleksiJumlahInstrumen.length === 0 ? null: Decimal.sum(...koleksiJumlahInstrumen).toNumber();
    const koleksiJumlahSkor = item?.data?.sumberMaxMin?.map(m=>m.totalSkor ?? 0) ?? [];
    const jumlahSkor = koleksiJumlahInstrumen.length === 0? null: Decimal.sum(...koleksiJumlahSkor).toDecimalPlaces(2).toNumber();
    const skor = koleksiJumlahInstrumen.length === 0? null: Decimal.sum(...koleksiJumlahSkor).div(jumlahInstrumen ?? 0).toDecimalPlaces(2).toNumber();
    return (<CardKalkulasiSkorSheet
        jumlahInstrumen={jumlahInstrumen}
        jumlahSkor={jumlahSkor}
        skor={skor}
        fokus={"Real Yang dikerjakan Siswa"}
    >
        <div className="text-center font-extrabold text-[10px] mb-0 leading-1">Nilai Berdasarkan Instrumen yang Dikerjakan</div>
        <div className="text-center font-extrabold text-[10px]">{item?.data?.data?.mapel?.nama}</div>
    </CardKalkulasiSkorSheet>
    );
    // switch (sourceData) {
    //     case 'responSiswa':{

    //     }
    //     default:
    //         return (
    //             <CardKalkulasiSkorSheet
    //                 jumlahInstrumen={(item?.data?.data?.sourceResponse as SkorNilaiFromSheetKdWithSource)?.countSoalMapel_sheet ?? null}
    //                 jumlahSkor={(item?.data?.data?.sourceResponse as SkorNilaiFromSheetKdWithSource)?.totalMapel_sheet ?? null}
    //                 skor={(item?.data?.data?.sourceResponse as SkorNilaiFromSheetKdWithSource)?.skorMapel_sheet ?? null}
    //                 fokus={"Real Yang dikerjakan Siswa"}
    //                 pembulatan={0}
    //             >
    //                 <div className="text-center font-extrabold text-[10px] mb-0 leading-1">Nilai Berdasarkan Instrumen yang Diukur/Diuji</div>
    //                 <div className="text-center font-extrabold text-[10px]">{item?.data?.data?.mapel?.nama}</div>
    //             </CardKalkulasiSkorSheet>
    //         );
    // }
}
