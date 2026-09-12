import { useCallback, useEffect, useMemo, useState } from "react";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar"
import type{ PraSettingPaket } from "~/domain/paket-soal/entities/pra-setting-paket"
import KopPaketSoal from "~/controllers/paket-soal/components/kop-paket-soal";
import IdentitasPaketSoal from "~/controllers/paket-soal/components/identitas-paket-soal";
import KolomNilaiPaket from "~/controllers/paket-soal/components/kolom-nilai";
import GroupedAtpHasManySOal from "~/domain/bank-soal/relational-soal/services/grouping-soal-atp-has-many-soal";
import PetunjukUmumPaketSoal from "~/controllers/paket-soal/components/petunjuk-umum";
import { useImmer } from "use-immer";
import type { PaketSoalDesign } from "~/domain/paket-soal/result/paket-soal";
import { createPaketSoalDesign, getGlobalIndex, getNoSoal } from "~/domain/paket-soal/result/create-design";
import { useModal } from "~/components/modals/modal-provider";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import type { DisplayFormatItemSoal } from "~/domain/paket-soal/result/display-format-item-soal";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { InitialItemSoalImplemented } from "~/controllers/paket-soal/modal/initial-item-soal-implemented";
import ItemSoalPreview from "~/controllers/paket-soal/components/item-soal-preview";
import TooltipComp from "~/components/ui_edura/tooltip-comp";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import { DatabaseZapIcon, Eye, FileCheck, FileCheckCorner, FileKey2Icon, FilePlus2, Loader, SaveIcon, SaveOff } from "lucide-react";
import { useCrudPaketSoalProvider } from "~/controllers/paket-soal/crud/paket-soal-crud-provider";
import { useDraftPaketSoal } from "~/hooks/use-draft-paket-soal";
import DataKisiKisi from "~/domain/paket-soal/infrastructure/data-kisi-kisi-class";
import { ValidationPaketSoal } from "~/controllers/paket-soal/modal/validation-paket-soal";
import TableSebaranKompetensiPaketSoal from "~/controllers/paket-soal/components/sebaran-kompetensi-paket-soal";
import type { PaketSoalSheetType } from "~/types/bank-soal/entities/paket-soal-sheet-type";
import DtoPaketSoalDesainType from "~/dtos/dto-paket-soal-desain";
import { toast } from "sonner";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { createInitialSetting } from "./intialPaketSoal";



export default function CreatePaketSoalPage(){
    const {actions} = useModal();
    const {actions:post, state} = useCrudPaketSoalProvider()
    const {value:data, setValue, updateExtra} = useFilterContext<PaketSoalDesign>();
    const {draft, saveDraft, reset} = useDraftPaketSoal();
    const kelas = getSessionRombel();
    
    const initialSetting:PraSettingPaket = {
        identitas: {
            nama:'',
            start_time: new Date(),
            durasi: 60,
            kelas,
            showKolom:false,
            showIdentitas:false,
            showKop:false,
            showSebaranTp:false,
            dataIdentitas:'',
            showPetunjuk:false
        },
        target_paket:'rombel',
        data_target:[],
        koleksi_mapel:{isMultiple:false, data:[]},
        count_bentuk_soal:[],
        kurikulum:[],
        nomorSoalUrut:true,
        dataKopCustom:[]

    }
    const setting = useMemo(()=>data.extra?.setting, [data.extra?.setting]);
    const [paketSoal, setPaketSoal] = useImmer<PaketSoalDesign|undefined>(undefined);

    // useEffect(()=>{
    //     if(!setting) return

    //     if(!draft){
    //         const dataKosong = createPaketSoalDesign(setting);
    //         setPaketSoal(dataKosong)
    //     }else{
    //         setPaketSoal(draft)
    //     }
    // },[ draft, setting, setPaketSoal])

    useEffect(()=>{
        if(!setting) return;
        const dataKosong = createPaketSoalDesign(setting)
        if(!data.extra?.data) {
            setPaketSoal(dataKosong)
            return
        }
        
            setPaketSoal(data.extra)
        
            
    }, [setting, data.extra, setPaketSoal])
    // useEffect(() => {
    //     if (!setting) return;

    //     if (paketSoal) return;

    //     if (data.extra?.data) {
    //         setPaketSoal(data.extra);
    //         return;
    //     }

    //     setPaketSoal(createPaketSoalDesign(setting));
    // }, [setting, data.extra, paketSoal]);
    
    const resetPaketSoal = useCallback(() => {
            const setting = createInitialSetting();

            updateExtra(draft => {
                draft.setting = setting;
                draft.data =undefined;
            });

            setPaketSoal(undefined);

            reset();
        }, [updateExtra, reset]);

    const UpsertSoal = useCallback( (v: DisplayFormatItemSoal) => {
                
                setPaketSoal(draft => {
                    if (!draft) return ;//draft= createPaketSoalDesign(initialSetting)
                    
                    const group = draft.data?.find( item => item.bentukSoal.name === v.bentuk_soal?.name )
                    
                    
                    if (!group) return

                    const indexItem = group.dataSoal.findIndex( item => item.index === v.index )

                    if (indexItem >= 0) {
                        // UPDATE
                        group.dataSoal[indexItem] = v
                    } else {
                        // INSERT
                        group.dataSoal.push(v)
                    }
                    // opsional, tetapi saya sarankan
                    group.dataSoal.sort( (a, b) => a.index - b.index )
                })
            },
            [setPaketSoal, paketSoal]
        )

    const handleClickSlot = useCallback((indexBentuk:number, indexSoal:number, ListBentukSoal:ListBentukSoalType, currentDisplay?:DisplayFormatItemSoal) =>{
        if(!setting) return;
        if(setting.kurikulum.length===0){
            alert('Belum memilih kurikulum');
            return ;
        }
        const noUrutDisplay = getNoSoal(setting, indexBentuk, indexSoal);
        const noIndex = getGlobalIndex(setting, indexBentuk, indexSoal);
        
        const dataModal:InitialItemSoalImplemented = {
            currentItemSoal: currentDisplay ?? {no_soal:noUrutDisplay, index:noIndex, bentuk_soal:ListBentukSoal, showStimulus:true},
            curriculumProvider:setting.kurikulum,
            triggerUpsert:UpsertSoal,
            paketSoalHasIplemented:paketSoal?.data?.map((m=>m.dataSoal)).flat() ?? []
        }
        
        actions.open('ADD ITEM SOAL PAKET', dataModal, { closeOnOutsideClick:false })
    }, [paketSoal, actions]);

   
    const onSubmit = async ()=>{
        if(!paketSoal) return;
        const validation = ValidationPaketSoal(paketSoal);
        if(!validation.isValid){
            alert(validation.message.join('\r\n'))
            return;
        }
        
        const instans = new DtoPaketSoalDesainType(paketSoal);
        const valid = instans.validToSend();
        
        if(!valid.isValid){
            const konfirmasi = confirm(valid.message.join('\r\n')+'. Anda ingin melanjutkannya? Jika dilanjut, ini akan disimpan di server sebagai paket soal yang tidak lemngkap.')
            if(!konfirmasi) return;

        }
        
        toast.promise(
            // post.create(paketSoal),
            post.create(paketSoal),
            {
                loading:'Sedang menyimpan',
                success:(respon)=>{
                    const {success, data, detailResponse} = respon;
                    reset();
                    DispatchingResponseToStore(success, data as PaketSoalSheetType[], detailResponse!)
                    
                    resetPaketSoal();
                    
                    return 'Sukses tersimpan'
                },
                error:(error)=>{
                    console.log(error);
                    return 'Gagal menyimpan'
                }
            }
        )
        //reset();
    }

    const onHandleKisiKisi =useCallback((versi:'v1'|'v2')=>{
        
        if(!paketSoal) return

        const validation = ValidationPaketSoal(paketSoal);
        if(!validation.isValid){
            alert(validation.message.join('\r\n'))
            return;
        }
        // if(!KisiKisiInstance) return;
        // const versiMapel = KisiKisiInstance.generate();
        if(versi === 'v1'){
            actions.open('PREVIEW KISI-KISI', paketSoal, { closeOnOutsideClick:false })
        }else{
            actions.open('PREVIEW KISI-KISI DAN SOALNYA', paketSoal, { closeOnOutsideClick:false })

        }

    },[paketSoal, actions])

    const onHandlePenskoran = () =>{
        if(!paketSoal)return
         const validation = ValidationPaketSoal(paketSoal);
        if(!validation.isValid){
            alert(validation.message.join('\r\n'))
            return;
        }
        actions.open('PREVIEW KUNCI JAWABAN PAKET SOAL', paketSoal, {closeOnOutsideClick:false})
        
    }
    
    return (
        <div className="p-1]">
            {
                (setting?.identitas && setting.identitas.showKop && setting?.dataKopCustom) && (
                    <KopPaketSoal data={setting?.dataKopCustom}/>
                )
            }
            {
                (setting?.identitas && setting.identitas.showIdentitas && setting.koleksi_mapel && setting.target_paket) && (
                    <IdentitasPaketSoal data={setting.identitas} mapel={setting.koleksi_mapel} />
                )
            }
            
            {
                (setting?.identitas && setting.identitas.showKolom) && (
                    <KolomNilaiPaket/>
                )
            }

            <ol className="list-[upper-alpha] list-outside marker:font-bold pl-5 align-top">
                    {
                        (setting?.identitas && setting.identitas?.showSebaranTp) && (
                                <li><strong className="uppercase">Sebaran Kompetensi Butir Soal</strong>
                                    {
                                        (setting?.identitas && setting.identitas.showSebaranTp && paketSoal) && (
                                            <TableSebaranKompetensiPaketSoal paketSoal={paketSoal}/>
                                        )

                                    }
                                        
                                    
                                </li>
                        )
                    }
                    {
                        (setting?.identitas && setting.identitas.showPetunjuk) && (
                            <li><strong>PETUNJUK UMUM</strong>
                            <PetunjukUmumPaketSoal/>
                            </li>
                        )
                    }
                    {
                        (setting?.identitas && setting?.count_bentuk_soal && setting?.count_bentuk_soal.length>0) && (
                            <li>
                                <strong>PETUNJUK KHUSUS</strong>
                                <ol className="list-[upper-roman] list-outside ps-4">

                                    {
                                        setting?.count_bentuk_soal?.map((soal, indexBentuk) => {
                                            
                                            const cekStartNumber = paketSoal?.data?.[indexBentuk]?.startNumber
                                            const dataSoal =  paketSoal?.data?.find( item => item.bentukSoal.name === soal.dataBentukSoal.name ) ?.dataSoal;
                                            
                                            return (
                                                    <li key={indexBentuk}>{soal.description}
                                                        <ol start={cekStartNumber} className="list-decimal ps-4 marker:font-normal">
                                                            {Array.from(
                                                                { length: soal.count },
                                                                (_, indexSoal) => {

                                                                    const globalIndex = getGlobalIndex(
                                                                        setting!,
                                                                        indexBentuk,
                                                                        indexSoal
                                                                    )

                                                                    const dataItem = dataSoal?.find(
                                                                        item => item.index === globalIndex
                                                                    )

                                                                    return (
                                                                        <li
                                                                            key={indexSoal}
                                                                            onClick={() =>
                                                                                handleClickSlot(
                                                                                    indexBentuk,
                                                                                    indexSoal,
                                                                                    soal.dataBentukSoal,
                                                                                    dataItem
                                                                                )
                                                                            }
                                                                            className="cursor-pointer align-top mb-3"
                                                                        >
                                                                            
                                                                            {

                                                                                dataItem
                                                                                    ? 
                                                                                        <ItemSoalPreview data={dataItem}/>
                                                                                    : <p className="text-rose-600">Klik untuk mengambahkan item soal <strong>{soal.dataBentukSoal.description}</strong></p>
                                                                            }

                                                                        </li>
                                                                    )
                                                                }
                                                            )}
                                                        </ol>
                                                    </li>
                                                )
                                            }
                                        )
                                    }
                                </ol>
                            </li>
                        )
                    }
            </ol>
            <div className="sticky print:hidden bg-sky-300 bottom-5 mt-64 py-2 md:bottom-0 flex gap-2 justify-center">
                <TooltipComp content="Kisi-kisi">
                    <ButtonCommitAwesome labelButton="Kisi-kisi" className="px-4 py-0 mb-2" onClick={()=>onHandleKisiKisi('v1')}><FileCheck size={14}/></ButtonCommitAwesome>
                </TooltipComp>
                <TooltipComp content="Kisi-kisi dan soal">
                    <ButtonCommitAwesome labelButton="Kisi-kisi dan Soal" className="px-4 py-0 mb-2" onClick={()=>onHandleKisiKisi('v2')}><FileCheckCorner size={14}/></ButtonCommitAwesome>
                </TooltipComp>
                <TooltipComp content="Kunci Jawaban">
                    <ButtonCommitAwesome labelButton="Penskoran" className="px-4 py-0 mb-2" onClick={onHandlePenskoran}><FileKey2Icon size={14}/></ButtonCommitAwesome>
                </TooltipComp>
                <TooltipComp content="Simpan Soal ke Server">
                    <ButtonCommitAwesome 
                        labelButton="Simpan" className="px-4 py-0 mb-2" 
                        disabled={state.isSubmitting} 
                        onClick={onSubmit}
                        >
                        {
                            state.isSubmitting ? <Loader size={12} className="animate-spin self-center"/>:<DatabaseZapIcon size={12}/>
                        }

                    </ButtonCommitAwesome>
                </TooltipComp>
                <TooltipComp content="Jadikan Draft, Anda tinggal kerjakan nanti">
                    <ButtonCommitAwesome labelButton="Draft" className="px-4 py-0 mb-2" onClick={()=>{
                        if(paketSoal){
                            saveDraft(paketSoal)
                            
                        }else{
                            alert('Draft belum siap')}
                            
                        } 
                        }>
                            <SaveIcon size={14}/></ButtonCommitAwesome>
                </TooltipComp>
            </div>
        </div>
    )
}