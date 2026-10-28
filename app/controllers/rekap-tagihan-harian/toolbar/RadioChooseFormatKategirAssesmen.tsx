import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar"
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle, } from "~/components/ui/field";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {useEffect} from 'react';

export type FormatKategoriAssesmenTable = 
    | 'decision'
    | 'responSiswa'
    | 'dataServer';

export type FormatKategoriAssesmenPreview={
    formatKategoriAssesmen:FormatKategoriAssesmenTable
}
export default function RadioChooseFormatKategoriAssesmen(){
    const {value, updateExtra} = useFilterContext<FormatKategoriAssesmenPreview>();
    const handleChange = (value:FormatKategoriAssesmenTable)=>{
        updateExtra(draft=>{
            draft.formatKategoriAssesmen = value;
        })
    };
    useEffect(()=>{
        if(!value?.extra?.formatKategoriAssesmen){
            updateExtra(draft=>{
                draft.formatKategoriAssesmen = 'decision';
            })
        }
    },[])
    return (
            <RadioGroup value={value?.extra?.formatKategoriAssesmen} onValueChange={handleChange} className="flex flex-col md:flex-row shadow-md shadow-sky-700 p-1">
                <div className="w-full space-y-2 bg-sky-50 rounded text-xs h-fit p-1 shadow-md shadow-sky-600">
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="decision" id="decision" />
                        <Label htmlFor="decision" className="text-xs">Default</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="responSiswa" id="responSiswa" />
                        <Label htmlFor="responSiswa" className="text-xs">Respon Siswa</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="dataServer" id="dataServer" />
                        <Label htmlFor="dataServer" className="text-xs">Data Tervalidasi</Label>
                    </div>
                </div>
                {
                    value?.extra?.formatKategoriAssesmen === 'decision' && <Field orientation="horizontal" className="bg-linear-to-br rounded from-pink-300 to-sky-300 p-2 text-xs">
                        <FieldContent>
                            <FieldTitle className="text-[10px]">Default</FieldTitle>
                            <FieldDescription className="text-[8px] bg-slate-50 p-2 w-full rounded">
                            Sumber data dipilih oleh aplikasi. Sumber data Anda ada 2, Respon Siswa dan data yang telah divalidasi (dikoreksi/diimport)
                            </FieldDescription>
                        </FieldContent>
                    </Field>
                }
                {
                    value?.extra?.formatKategoriAssesmen === 'responSiswa' && <Field orientation="horizontal" className="bg-linear-to-br rounded from-pink-300 to-sky-300 p-2 text-xs">
                        <FieldContent>
                            <FieldTitle className="text-[10px]">Respon Siswa</FieldTitle>
                            <FieldDescription className="text-[8px] bg-slate-50 p-2 w-full rounded">Nilai yang bersumber dari respon siswa. Baik yang telah dikoreksi (validasi) atau belum.</FieldDescription>
                        </FieldContent>
                        
                    </Field>
                }
                {
                    value?.extra?.formatKategoriAssesmen === 'dataServer' && <Field orientation="horizontal" className="bg-linear-to-br rounded from-pink-300 to-sky-300 p-2 text-xs">
                        <FieldContent>
                            <FieldTitle className="text-[10px]">Telah divalidasi</FieldTitle>
                            <FieldDescription className="text-[8px] bg-slate-50 p-2 w-full rounded">
                            Nilai yang ditampilkan berasal dari rekap server, termasuk import nilai KD. Nilai ini mungkin berbeda dengan nilai respon siswa (kecuali Anda melakukan pengoreksian)
                            </FieldDescription>
                        </FieldContent>
                    </Field>
                }
        </RadioGroup>
    )
}