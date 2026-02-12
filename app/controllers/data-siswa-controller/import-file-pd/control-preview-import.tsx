import { Fields, SelectField } from "~/components/fields/fields";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar"

type ModeTampilanImport = {
    label:string,
    value:string
}
export const TampilanPreview: ModeTampilanImport[]=[
    {
        label:'Tabel Format Dapodik',
        value:'formatDapodik'
    },
    {
        label:'Tabel Sinkron',
        value:'formatSinkron'
    },
    {
        label:'Tabel Data Siswa Hanya Ada di Dapodik',
        value:'formatDataSiswaHanyaAdaDiDapodik'
    },
    {
        label:'Tabel Data Siswa Hanya Ada di Aplikasi',
        value:'formatDataSiswaHanyaAdaDiAplikasi'
    },
    // {
    //     label:'Tabel Rekomendasi Perbaikan Dapodik',
    //     value:'formatRekomendasiPerbaikanDapodik'
    // },
    {
        label:'Tabel Rekomendasi Perbaikan Data Edurasa',
        value:'formatRekomendasiPerbaikanDataEdurasa'
    },
]
export default function ControlPreviewImport(){
    const {value, setValue} = useFilterContext();
    
    return (
        <div className="p-1">
            <Fields className="w-full md:w-1/2 mx-auto">
            <SelectField labelSelect="Pilih Tampilan"
                value={value.extra?.tampilan as string ||'formatDapodik'}
                onChange={(e)=>{
                    setValue({
                        extra: {
                            ...value.extra,
                            tampilan:e.target.value
                        }
                    })
                }}
            >
                {
                    TampilanPreview.map((m,i)=>(
                        <option key={i} value={m.value}>{m.label}</option>
                    ))
                }
            </SelectField>

            </Fields>
            <p>Menampilkan Kecocokan data dengan Dapodik</p>
            <p>Menampilkan data asli Dapodik</p>
            <p>Menampilkan rekomendasi perbaikan data di Aplikasi</p>
            <p>Menampilkan rekomendasi perbaikan data di Dapodik</p>
        </div>
    )
}