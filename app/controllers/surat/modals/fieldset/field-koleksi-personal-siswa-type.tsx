import { useEffect, useState } from "react";
import { useImmer, type Updater } from "use-immer";
import SelectRiwayatRombelInTapel from "~/controllers/riwayat-rombel/fields/select-riwayat-rombel-in-tapel";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import { getIsianSiswa } from "~/infrastructures/session-storage/isian-siswa";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import type { SiswaType } from "~/types/siswa";
import PilihSiswaSuket from "./pilih-kelas-siswa-suket";
import { currentTapel } from "~/lib/current-tapel";

interface FieldKoleksiPersonalSiswaTypeProps{
    currentData:DataOrmSuratKeluarType,
    setCurrentData:Updater<DataOrmSuratKeluarType>//(updater: (draft: DataOrmSuratKeluarType) => void) => void
}
export default function FieldKoleksiPersonalSiswaType({currentData, setCurrentData}:FieldKoleksiPersonalSiswaTypeProps){
    const initialSiswa = getIsianSiswa();
    const initialRombel = getSessionRombel();
    const [siswaSelected, setSiswaSelected] = useImmer<SiswaType|null>(null);
    const [rombel, setRombel] = useState<string>(initialRombel);
    const [siswaSuket, setSiswaSuket] = useImmer<SiswaType[]>(currentData.dataTemplate?.personalSiswaType ?? []);
    
    

    const handleSiswaSelected = (siswa:SiswaType)=>{
        // setSiswaSelected(siswa);
        setSiswaSuket(draft=>{
            const exist = draft.find(s=>s.id === siswa.id);
            if(!exist){
                draft.push(siswa)
            }
        });
        setSiswaSelected(initialSiswa);
        
    }
    const handleSiswaUnSelected = (id:number)=>{
        setSiswaSuket(draft=>{
            // draft.filter(s=>!draft.map(m=>m.id).includes(id))
            const findIndex = draft.findIndex(s=>s.id === id)
            if(findIndex >-1){
                draft = draft.splice(findIndex,1)
            }
        })
        setSiswaSelected(initialSiswa);
        // setSiswaSelected(null);
    }

    useEffect(()=>{
        setCurrentData(draft=>{
            if(!draft.dataTemplate) return;
            draft.dataTemplate = {
                ...draft.dataTemplate,
                personalSiswaType:siswaSuket
            };
            draft.target_siswa = siswaSuket.map(m=>m.id)
        })
    },[siswaSuket]);

    return (
        <div className="flex flex-col gap-2 mx-2 md:flex-row md:max-h-[calc(100vh-12rem)] overflow-y-auto scrol-h-custom">
            <div className="w-full border-2 rounded-2xl p-2 md:p-4">
                <p className="text-xs w-10/12 p-2 border rounded-2xl mx-auto">Surat dikeluarkan tanggal {currentData.tglsurat.toLocaleDateString('id-ID', {dateStyle:'long'})} / {currentTapel({variant:'full', date:currentData.tglsurat})}. Data siswa yang ditampilkan pada kondisi tahun pelajaran itu.</p>
                <SelectRiwayatRombelInTapel value={rombel} setValue={setRombel} tgl={currentData.tglsurat}/>
                <PilihSiswaSuket 
                    // setValue={setSiswaSelected} 
                    setValue={handleSiswaSelected }
                    value={siswaSelected} 
                    rombel={rombel} 
                    tgl={currentData.tglsurat}
                    values={siswaSuket}/>
            </div>
            <div className="w-full border-2 rounded-2xl p-2 md:p-4 overflow-y-auto scrol-h-custom">
                {
                    siswaSuket.map((m, i)=>
                        <div key={m.id} className="border p-1 flex gap-2 justify-between">
                            <p className="flex w-full justify-between me-2">
                                <span>{m.pd_nama}</span>
                                <span>{m.nama_rombel}</span>
                            </p>
                            <button type="button" onClick={()=>handleSiswaUnSelected(m.id)} className="border" title="hapus">x</button>

                        </div>
                    )
                }
            </div>
        </div>
                        
    )
}