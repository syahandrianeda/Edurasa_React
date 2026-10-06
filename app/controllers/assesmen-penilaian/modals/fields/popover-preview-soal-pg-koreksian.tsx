import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import ItemSoalPreview from "~/controllers/paket-soal/components/item-soal-preview";
import UbahKunciJawabanDiKoreksian from "./Ubah-kunci-jawaban-di-popover";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import { useState } from "react";

type Props={
    no_prefix:number,
    index: number,
    soal?:BankSoalAppType,
}
export default function PopoverPreviewSoalPgKoreksian({
    no_prefix, 
    index,
    soal
}:Props){
    const [open, setOpen] = useState<boolean>()
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    className="py-0 px-1 text-[10px] h-4 bg-sky-600 cursor-pointer"
                >
                    Lihat Soal
                </Button>
            </PopoverTrigger>

            <PopoverContent className="md:w-160 md:max-h-90 text-[10px] overflow-y-auto scrol-h-custom">
                <div className="space-y-3">
                    <h4 className="font-semibold">
                        Soal No. {no_prefix}
                    </h4>
                    <div className="text-wrap">
                        <ItemSoalPreview data={{index, no_soal:no_prefix, data_soal:soal,showStimulus:true, format_display:'vertical' }}/>
                        <p className="border-t-2">Jawaban: {soal?.jawaban.join('')}</p>
                        <div className="editor-dokument" dangerouslySetInnerHTML={{__html:soal?.pembahasan_penskoran ?? ''}}/>
                    </div>
                    {
                        soal && <UbahKunciJawabanDiKoreksian dataSoal={soal} setOpen={(bol)=>setOpen(bol)}/>
                    }
                </div>
            </PopoverContent>
        </Popover>
    )
}