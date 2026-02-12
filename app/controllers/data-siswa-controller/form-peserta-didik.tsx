import { File, Printer } from "lucide-react";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import type { ModalState } from "~/components/modals/modal-provider";
import type { SiswaType } from "~/types/siswa";

export default function FormPesertaDidikDapodik({state}:{state:ModalState}){
    return (
        <>
        <div className="bg-white dark:bg-zinc-600 flex flex-col h-100 w-full justify-center items-center">
            <h3 className="text-3xl font-extrabold uppercase">Cooming Soon Format Peserta Didik Dapodik (F-12)</h3>
            <p>Menampilkan data untuk nama {(state.payload as SiswaType)?.pd_nama ?? 'Tidak dikenal'}</p>
        </div>
        <ModalFooterEdura>
            <Printer size={28}/>
            <File size={28}/>
        </ModalFooterEdura>
        </>
    )
}