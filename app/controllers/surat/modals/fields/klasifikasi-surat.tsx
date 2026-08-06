import { useFormEdura } from "~/components/form-custom/form-edura";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { KlasifikasiNoSurat} from "~/domain/surat/klasifikasi-surat-permendagri";
import type{ SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";

export interface KlasifikasiSuratProps {
    prefix?: string, 
    onChangePrefix: (v:string)=>void
}
export default function KlasifikasiSurat({prefix, onChangePrefix}:KlasifikasiSuratProps){
    const {setCurrentData} = useFormEdura<SuratKeluarAppType>()
    const sourceSelected = KlasifikasiNoSurat.find(s=>s.value === prefix)
    const sourceSelectedKlasifikasi = sourceSelected?.source;
    return (
        <>
        
            <div className="relative mt-5">
                <Label className="absolute dark:bg-gray-700 border-s-2 dark:border-s-0 border-t border-sky-500 bg-sky-50 dark:text-sky-100 ps-1 text-[10px] dark:border-b-0 top-0 left-0 py-0 pe-4 rounded-se-2xl -translate-y-3.5 w-fit">Klasifikasi No. Surat:</Label>
                <Select
                    // disabled={disabled}
                    value={prefix ?? ''}
                    onValueChange={ (val)=>{
                        onChangePrefix(val);
                        const Selected = KlasifikasiNoSurat.find(s=>s.value === val);
                        if(Selected && Selected.template){
                            setCurrentData(draft=>{
                                draft.indekssurat = Selected.template ?? ''
                            })
                        }
                    }}
                    >
                    <SelectTrigger className="w-full dark:bg-gray-700 bg-sky-50 border-2 dark:text-white dark:border-0 border-s-2 rounded-ss-none rounded-br-none rounded-tr-2xl focus-visible:ring-0 border-sky-500 focus-visible:border-sky-400">
                        <SelectValue placeholder="Pilih Klasifikasi"/>
                    </SelectTrigger>

                    <SelectContent>
                        {
                            KlasifikasiNoSurat.map(({ value, description },i) => 
                                    <SelectItem key={i+'_'} value={value}>
                                        {description}
                                    </SelectItem>
                            )
                        }
                    </SelectContent>
                </Select>
                <div className="text-xs">Sumber: {sourceSelectedKlasifikasi}</div>
            </div>
        </>
    )
}