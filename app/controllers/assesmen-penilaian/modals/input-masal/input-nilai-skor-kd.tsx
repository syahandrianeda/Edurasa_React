import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import TdEduraSkorKd from "../TdEduraSkorKdImport";
import { useFormEdura } from "~/components/form-custom/form-edura";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import { useModal } from "~/components/modals/modal-provider";
import { useCrudImportSkorKdProvider } from "../../crud/crud-import-skor-kd-provider";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { cn } from "~/lib/utils";
import type { TemplateImportSkorToKd } from "~/domain/import-skor-to-kd/TemplateImportSkorToKd-type";
import { useImmer } from "use-immer";
import { useCallback, type ChangeEvent } from "react";
import { signSourceBetweenReponAndSkorKd } from "../signSourceBetweenReponAndSkorKd";
import { ModalFooterEdura } from "~/components/modals/modal-components";
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import { getNumberFromString } from "~/lib/get-number";
import ParameterServiceSkorKdImportBuilder from "../import-skor-kd/ParameterServiceSkorKdImportBuilder";
import {toast} from 'sonner';
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import type { ValidatedResponseSiswa } from "~/types/penilaian/rekap_sementara_sheet_type";

export default function InputNilaiSkorKdMassal(){
    const {currentData} = useFormEdura<TagihanHasDataResponse>();
    const {actions:actionsModal} = useModal<TagihanHasDataResponse>();
    const {actions:api, state} = useCrudImportSkorKdProvider();
    const {keySkorKD,keyLabelRekapSkorKdSheet,dataSkorKd} = currentData;
    const rombel = getSessionRombel();
    const [nilaiSkorKd, setNilaiSkorKd] = useImmer<TemplateImportSkorToKd[]>(dataSkorKd);

    const onChangeSkor = useCallback((e:ChangeEvent<HTMLInputElement>)=>{
        // e.preventDefault();
        const {name, value} = e.currentTarget;
        const splitting = name.split('_');
        const siswa_id= Number(splitting.shift()!);
        const keyKd = splitting.join('_');

        setNilaiSkorKd(draft=>{
            const indexSiswa = draft.findIndex(s=>s.siswa_id === siswa_id);
            if(indexSiswa>-1){
                const currentSiswa = draft[indexSiswa];
                currentSiswa.dataSkorDecision = {
                    ...currentSiswa.dataSkorDecision,
                    [keyKd]:Number(value)
                };
                draft[indexSiswa] = currentSiswa

            }
        })
        
    },[])
    const onSubmit = useCallback(()=>{
        const konfirmasi = confirm('Anda yakin?');
        if(!konfirmasi) return;
        const jenjang = getNumberFromString(rombel);
        const param = ParameterServiceSkorKdImportBuilder.build(nilaiSkorKd, jenjang, currentData)
        console.log({nilaiSkorKd, tipeAssesmen:currentData.tipe_assesmen, keySkorKD, param});
        toast.promise(
            api.update(param), {
                loading:'Sedang mengimport data ke server',
                success: (data)=>{
                    if(data.detailResponse){
                        DispatchingResponseToStore(data.success, data.data as unknown as ValidatedResponseSiswa[], data.detailResponse, rombel)
                    }
                    actionsModal.close();
                    return 'Berhasil menyimpan ke server';
                },
                error: (err)=>{
                    return "Gagal menyimpan ke Server, | "+ err
                },
                closeButton:true,
            }
        );
    },[rombel, currentData.tipe_assesmen, nilaiSkorKd])
    return (
        <>
            <div className="h-10/12 mx-auto bg-white dark:text-black p-2 overflow-y-auto scrol-h-custom md:px-4">
                <TableWithScrolling inModal={true}>
                    <thead>
                        <TRowEdura>
                            {
                            keyLabelRekapSkorKdSheet.map(m=>
                                <ThEdura className="text-wrap" key={m.key}>{m.label}</ThEdura>
                            )
                            }
                        </TRowEdura>
                    </thead>
                    <tbody>
                        {
                            nilaiSkorKd.map((m, i)=>
                                <TRowEdura key={m.siswa_id}>
                                    <TdEdura className="max-w-5 text-center">{i+1}</TdEdura>
                                    <TdEdura className="w-12">{m.siswa_id}</TdEdura>
                                    <TdEdura className={cn("",m.hasRespon ===0?'bg-rose-300':'bg-inherit')}>{m.nama_siswa}</TdEdura>
                                    <TdEdura className="max-w-5 text-center">{m.rombel}</TdEdura>
                                    {
                                        keySkorKD.map((k,ii)=>{
                                            const {title, className} = signSourceBetweenReponAndSkorKd(m.detailSkor,k);
                                            return (
                                            <TdEdura key={k} className={cn("p-0", className)} title={title}>
                                                <input 
                                                    type="number"
                                                    name={m.siswa_id+'_'+k}
                                                    value={m.dataSkorDecision[k]??0}
                                                    onChange={onChangeSkor}
                                                    className="h-full w-full m-0 my-auto p-1 ring-0 focus-within:ring-0 focus-visible:ring-0 focus-visible:outline-none text-center"
                                                    />
                                            </TdEdura>
                                            )
                                        }
                                        )
                                    }
                                </TRowEdura>
                            )
                        }
                    </tbody>
                </TableWithScrolling>
            </div>
            <ModalFooterEdura>
                <div className="flex gap-2 w-full justify-center">
                    <ButtonSaveAwesome labelButton="Simpan Server" className="px-4 py-0" onClick={onSubmit}/>
                </div>
            </ModalFooterEdura>
        </>
    )
}