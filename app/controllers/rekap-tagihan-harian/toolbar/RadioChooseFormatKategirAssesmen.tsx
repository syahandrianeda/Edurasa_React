import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar"
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle, } from "~/components/ui/field";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {useEffect} from 'react';
import { namaSumber } from "../sheet/namaSumber";
import type { FormatKategoriAssesmenTable } from "./FormatKategoriAssesmenTable";

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
                        <Label htmlFor="decision" className="text-xs">{namaSumber('decision')}</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="responSiswa" id="responSiswa" />
                        <Label htmlFor="responSiswa" className="text-xs">{namaSumber('responSiswa')}</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="dataServer" id="dataServer" />
                        <Label htmlFor="dataServer" className="text-xs">{namaSumber('dataServer')}</Label>
                    </div>
                </div>
                {
                    value?.extra?.formatKategoriAssesmen === 'decision' && <Field orientation="horizontal" className="bg-linear-to-br rounded from-pink-300 to-sky-300 p-2 text-xs">
                        <FieldContent>
                            <FieldTitle className="text-[10px]">{namaSumber('decision')}</FieldTitle>
                            <FieldDescription className="text-[8px] bg-slate-50 p-2 w-full rounded">
                            Sumber data untuk default maksudnya sumber data yang akan diambil sebagai dasar perhitungan nilai asli tiap kategori assesmen (Penilain harian, tengah semester, atau akhir tahun). Data ini diambil dari sumber rekap server. Yaitu data yang Anda koreksi atau Anda import nilai tiap ATP.
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