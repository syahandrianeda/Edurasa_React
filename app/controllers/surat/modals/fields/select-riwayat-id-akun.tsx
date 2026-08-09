import type { ChangeEventHandler } from "node_modules/@types/react"
import { useAppSelector } from "~/context-reduct/hook"
import { InstanceRiwayatIdAkun } from "~/context-reduct/selectores/riwayat-id-akun-selector"

export default function SelectRiwayatIdAkun({activeDate, values, setValues}:{activeDate:Date, values:number[], setValues:ChangeEventHandler }){
    const ptkAkun = useAppSelector(InstanceRiwayatIdAkun)
    const ptkAll = ptkAkun.getAkunAktifInDate(activeDate).sort((a, b)=>a.nama_guru.localeCompare(b.nama_guru))
    
    return (
        <div className="grid grid-cols-2 md:pt-3 text-xs gap-4 space-x-5">
                {
                    ptkAll.map((item, i)=>
                        <label
                            key={item.idbaris}
                            
                            className="m-1 cursor-pointer align-middle rounded-lg border px-1 py-0 shadow-sm bg-sky-200  shadow-sky-400 text-center has-checked:bg-green-300 has-checked:text-sky-900 text-nowrap truncate"
                        >
                            {item.nama_guru}
                            <input
                                type="checkbox"
                                className="hidden"
                                name="rombel"
                                data-nama={item.nama_guru}
                                data-nip={item.nip}
                                data-jabatan={item.jabatan}
                                value={item.user_id}
                                checked={values.includes(item.user_id)}
                                onChange={setValues}
                                // checked={idPtk.includes(item.user_id)}
                                // onChange={onChangePtk}
                            />
                        </label>
                    )
                }
                
        </div>
    )
}