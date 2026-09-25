import {useEffect} from 'react';
import { useAppSelector } from "~/context-reduct/hook";
import { TaksonomiBloomInstance } from "~/context-reduct/selectores/taksonomi-selector";
import { useCreateItemSoalContext } from "~/controllers/bank-soal/reducer-item-soal/immer-reducer-context";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import type { UserPtk } from "~/types";
import NotReadyCreateItemSoal from './not-ready-create-item-soal';
import { getNumberFromString } from '~/lib/get-number';
import { TaksonomiMatcher } from '~/domain/taksonomi';
import SwitchEditorCreateItemSoal from '~/controllers/bank-soal/editor/switch-editor-formulir-item-soal';
import TooltipComp from '~/components/ui_edura/tooltip-comp';
import { Eye, Loader } from 'lucide-react';
import ButtonCommitAwesome from '~/components/button-awesome/commit-button';
import { useModal } from '~/components/modals/modal-provider';
import { type BankSoalAppType, type BankSoalSheetType } from '~/types/bank-soal/bank-soal-type';
import { isDev } from '~/lib/nama-tab-environment';
import ValidationItemSoal from '~/controllers/bank-soal/editor/create-validation-input-item-data-soal';
import DtoBankSoal from '~/dtos/dto-bank-soal';
import { toast } from 'sonner';
import { useCrudBankSoalProvider } from '~/controllers/bank-soal/cruds/crud-provider-bank-soal';
import DispatchingResponseToStore from '~/lib/dispatching-response-to-store';
import dataFormItemSoalNormalize from '~/domain/bank-soal/normalizer-data-form-soal';

export default function CreateItemSoalPage(){
    const Rombel = useAppSelector(state=>state.fokusRombel.value);
    const fokusMapel = useAppSelector(s=>s.fokusMapel.data);
    const bloom = useAppSelector(TaksonomiBloomInstance);
    const me = getSessionApp<UserPtk>();
    const {fokusBentukSoal, fokusAtp} = useAppSelector(state=>state.uiFokusToolbar.data)
    const {data, action} = useCreateItemSoalContext();
    const {actions} = useModal<BankSoalAppType>();
    const {actions:Post, state} = useCrudBankSoalProvider();

    useEffect(() => {
            const kurikulum = fokusAtp;
            if (!kurikulum) return;
    
            action({ type: "propertyKurikulum", payload: kurikulum, });
            /** tambahkan lk dari indikator */
            const indikator= kurikulum.atp_as_tp_description;
            const taksonomi = new TaksonomiMatcher(bloom.data);
            const match = taksonomi.find(indikator);
            action({
                type:'set_item_soal',
                payload:{
                    lk:match?.LK,
                    taksonomi:match
                }
            })
            
            }, [ fokusAtp, action, ]);
    
    useEffect(() => {
        const bentuk = fokusBentukSoal;

        if (!bentuk) return;

        action({ type: "bentuk_soal", payload: bentuk, });

    }, [ fokusBentukSoal, action, ]);

    useEffect(() => {

        if (!me) return

        action({ type: "creator", payload: me.name, });

    }, [ me, action, ]);

    useEffect(() => {

        action({
            type: "set_item_soal",
            payload: { jenjang_khusus: getNumberFromString( Rombel ?? "", ), },
        });

    }, [ Rombel, action, ]);

    useEffect(() => {

        action({
            type: "set_item_soal",
            payload: {
                mapel_name: fokusMapel.nama,
                kode_mapel: fokusMapel.kode,
            },
        });
        }, [ fokusMapel, action,
    ]);  
    
    const onPreview = ()=>{
        
        const {isValid, message} = ValidationItemSoal(data);
        if(!isValid){
            alert(message);
            return;
        }
        actions.open('PREVIEW ITEM SOAL', data,{closeOnOutsideClick:false})
    }
    const onSubmit = ()=>{
        const {isValid, message} = ValidationItemSoal(data);
        if(!isValid){
            alert(message);
            return;
        }
        const dtoBankSoal = DtoBankSoal.fromAppToSheet(data);
        const kondisionalBentukSoal = dataFormItemSoalNormalize(dtoBankSoal, fokusBentukSoal!)
        toast.promise(
            Post.update(kondisionalBentukSoal),
            {
                loading:'memproses item soal',
                success:(response)=>{
                    const {success, data:dataRespon, detailResponse} = response;
                    DispatchingResponseToStore(success,dataRespon as BankSoalSheetType[], detailResponse!);
                    action({type:'reset'})
                    action({ type: "bentuk_soal", payload: fokusBentukSoal! });
                    action({
                            type: "set_item_soal",
                            payload: {
                                mapel_name: fokusMapel.nama,
                                kode_mapel: fokusMapel.kode,
                                jenjang_khusus: getNumberFromString(Rombel),
                                pembahasan_penskoran:'',
                                jawaban:[]
                            },
                        });
                    if(fokusAtp){
                        action({ type: "propertyKurikulum", payload: fokusAtp, });
                    }

                    return 'Berhasil'
                },
                error:(er)=>{
                    console.log(er);
                    return 'Gagal | '+er
                }
            }
        )
    }
    
    if(!fokusAtp) return <NotReadyCreateItemSoal/>
    return (
        <div className="p-1">
            <h3 className="text-2xl text-center font-extrabold">Buat Satu Item Soal</h3>
            <fieldset disabled = {state.isSubmitting} className='min-w-0'>
                <SwitchEditorCreateItemSoal/>
                {
                    isDev && (<div className="overflow-x-auto max-w-5xl scrol-h-custom">
                        <pre>
                            {
                                Object.entries(data).map(([k,v], i)=>
                                    <div key={i}>
                                        {k} = { Array.isArray(v)? v.map((ar, ii)=>
                                                <div className="inline" key={ii}>
                                                    {JSON.stringify(ar)}
                                                </div>
                                            ): <div className="inline-block">{JSON.stringify(v)}</div>

                                        }
                                    </div>
                                )
                            }
                        </pre>
                    </div>)
                }
                {/* <div className="border fixed print:hidden bg-sky-300 bottom-5 py-2 md:bottom-0 w-216 flex justify-center"> min-h-[calc(100vh-16rem)] md:min-w-full md:max-w-3xl min-w-full max-w-0*/}
                <div className="border sticky print:hidden bg-sky-300 bottom-5 py-2 md:bottom-0 flex gap-2 justify-center">
                    <TooltipComp content="Preview item Soal">
                        <ButtonCommitAwesome labelButton="Preview" className="px-4 py-0 mb-2" onClick={onPreview}><Eye/></ButtonCommitAwesome>
                    </TooltipComp>
                    <TooltipComp content="Simpan Soal ke Server">
                        <ButtonCommitAwesome 
                            labelButton="Simpan" className="px-4 py-0 mb-2" 
                            disabled={state.isSubmitting} 
                            onClick={onSubmit}
                            >
                            {
                                state.isSubmitting && <Loader size={12} className="animate-spin self-center"/>
                            }

                        </ButtonCommitAwesome>
                    </TooltipComp>
                </div>

            </fieldset>
        </div>
    )
}