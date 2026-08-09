import {type Updater } from "use-immer"
import { useCallback} from "react"
import { useFormEdura } from "~/components/form-custom/form-edura"
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type"
import { ModalFooterEdura } from "~/components/modals/modal-components";
import ButtonDeleteAwesome from "~/components/button-awesome/delete-button";
import { SkipBack } from "lucide-react";
import { useModal } from "~/components/modals/modal-provider"
import ButtonUpdateItemSiswaSuratKeluar from "../../crud/button-update-item-siswa-suket"
import { useAppSelector } from "~/context-reduct/hook"
import { DataOrmSuratKeluarSelector } from "~/context-reduct/selectores/surat-keluar-selector"
import FieldKoleksiPersonalSiswaType from "./field-koleksi-personal-siswa-type"

export default function FieldsetKolomPilihKelasSiswa(){
    const {currentData, setCurrentData} = useFormEdura<DataOrmSuratKeluarType>();
    const suratKeluar = useAppSelector(DataOrmSuratKeluarSelector);
    const {actions, state, nextState}  = useModal<DataOrmSuratKeluarType>()
    
    const callSuratKeluar = useCallback(()=>{
        const currentItem = suratKeluar.find(s=>s.idbaris === currentData.idbaris);
        actions.open('INFO', currentData)
    }, [suratKeluar, currentData.target_siswa, currentData.idbaris])

    return (
        <>
        <FieldKoleksiPersonalSiswaType currentData={currentData} setCurrentData={setCurrentData as Updater<DataOrmSuratKeluarType>}/>
        <ModalFooterEdura>
            <div className="w-full flex justify-between">
                <ButtonDeleteAwesome onClick={()=>actions.open(nextState?.type!, nextState?.payload,nextState?.configModal)} className="py-0 px-2 text-sm " labelButton="Kembali"><SkipBack size={15}/></ButtonDeleteAwesome>
                <div className="w-full flex justify-center gap-4">
                    <ButtonUpdateItemSiswaSuratKeluar tutupModal={callSuratKeluar}/>
                </div>
            </div>
        </ModalFooterEdura>
        </>
    )
}