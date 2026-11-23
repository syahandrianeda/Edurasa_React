import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "~/components/ui/sheet";
import DefinitionSumber from "~/controllers/rekap-tagihan-harian/sheet/DefintionSource";
import { namaSumber } from "~/controllers/rekap-tagihan-harian/sheet/namaSumber";
import type { FormatKategoriAssesmenTable } from "~/controllers/rekap-tagihan-harian/toolbar/FormatKategoriAssesmenTable";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import type { KeyKompetensi, ListRaportSiswaUi } from "~/pages/penilaian/DataRaportView";
import { CardSummaryRekapRaport } from "./CardSummaryRekapRapor";
import SumberTagihanRekapRaport from "./SumberTagihanRekapRaport";
import SumberSkorInstrumenRekapRaport from "./SumberSkorInstrumenRekapRaport";
import CardSummaryNilaiRaport from "./CardSummaryNilaiRaport";

type KeyKompetensiWithSkor = KeyKompetensi & {skor:number|null, isMax:boolean, isMin:boolean}
export type DataRekapRaportSementaraSheetPreview = {
    keyStruktur: string, 
    keySelected: string,
    data:ListRaportSiswaUi
    source:FormatKategoriAssesmenTable,
    sourceTagihan:TagihanHasDataResponse[]
    // keyKomppetensiWithSkor:KeyKompetensiWithSkor[]

}
type Props ={
    item: DataRekapRaportSementaraSheetPreview|null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function SheetDetailRekapRaportSementara({
    item, open, onOpenChange
}:Props){
    console.log({item})
    return (
        <Sheet 
            open={open}
            onOpenChange={onOpenChange}
            
        >
            <SheetContent side="right" className=" w-full overflow-y-auto sm:max-w-xl scrol-h-custom" >
                <SheetHeader className="sticky top-0 bg-white border-b z-50">
                    <SheetTitle className="capitalize">
                        Proses Kalkulasi Nilai <strong>{item?.data?.siswa?.pd_nama?.toLowerCase()}</strong> dari Sumber {namaSumber(item?.source ?? 'decision')} 
                    </SheetTitle>

                    <SheetDescription className="text-[10px]">
                        <DefinitionSumber source={item?.source ?? 'decision'}/>
                    </SheetDescription>

                </SheetHeader>
                <div className="space-y-4 px-4 pb-6 mb-3">
                    <CardSummaryNilaiRaport item={item}/>
                    <h4 className="font-bold text-center mb-0 mt-2">Sumber Tagihan Instrumen dan Status Kepesertaan</h4>
                    <SumberTagihanRekapRaport item={item}/>
                    <CardSummaryRekapRaport item={item}/>
                    <h4 className="font-bold text-center mb-0 mt-2">Sumber Skor Instrumen {(item?.keyStruktur ?? 'Atp').toUpperCase()}</h4>
                    <SumberSkorInstrumenRekapRaport data={item?.data?.sumberMaxMin ?? []} keyKompetensi={item?.keyStruktur ?? 'Atp'}/>
                    
                </div>
            </SheetContent>
        </Sheet>
    )
}
