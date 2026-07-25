import { useFormEdura } from "~/components/form-custom/form-edura"
import { formatCurrency } from "~/lib/currency-format"
import type{ TabunganAppType } from "~/types/tabungan/tabungan-app-type"

export default function PreviewSnapshot(){
    const {currentData} = useFormEdura<TabunganAppType>()
    return (
        <div className="rounded-2xl">Berikut snapshot (riwayat penginputan) data ini:
            <ol className="list-decimal list-outside pl-6 space-y-1 me-1  mb-2">
                {
                    currentData?.snapshot && currentData?.snapshot.map((m, i)=>
                        <li key={i} className="list-item align-top ps-2 rounded-lg bg-white ps">
                            <div className="border rounded p-1 text-xs">
                                <div className="flex border-b-2 border-sky-400 w-full border-dotted justify-between gap-2"><span>Waktu</span>       <span>{m.time_stamp.toLocaleString('id-ID', {dateStyle:'long', timeStyle:'medium'})}</span></div>
                                <div className="flex border-b-2 border-sky-400 w-full border-dotted justify-between gap-2"><span>Kategori</span>    <span>{m.kategori}</span></div>
                                <div className="flex border-b-2 border-sky-400 w-full border-dotted justify-between gap-2"><span>Penginput</span><span>{m.penginput}</span></div>
                                <div className="flex border-b-2 border-sky-400 w-full border-dotted justify-between gap-2"><span>Kolom</span><span>{m.kolom==='masuk'?'Debit (Masuk)':'Kredit (Keluar)'}</span></div>
                                <div className="flex border-b-2 border-sky-400 w-full border-dotted justify-between gap-2"><span>Nominal </span><span>{formatCurrency(m.nominal)}</span></div>
                                <div className="flex border-b-2 border-sky-400 w-full border-dotted justify-between gap-2"><span>Katerangan</span><span>{m.keterangan||'-'}</span></div>
                                <div className="flex border-b-2 border-sky-400 w-full border-dotted justify-between gap-2"><span>Status</span><span>{m.status||"-"}</span></div>
                            </div>
                        </li>
                    )

                }
            </ol>
        </div>
    )
}