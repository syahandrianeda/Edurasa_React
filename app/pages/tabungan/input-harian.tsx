
import { useImmer } from "use-immer";
import { useEffect, useMemo, useState } from "react";
import { CurrencyInput } from "~/components/ui/currency-input";
import { Field} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { useAppSelector } from "~/context-reduct/hook";
import TableInputTabungan from "~/controllers/tabungan/tabel/tabel-input-tabungan";
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import FieldCustomerSiswa from "~/controllers/tabungan/modal/inputs/field-customer-siswa";
import FieldDebitKredit from "~/controllers/tabungan/modal/inputs/field-debit-kredit";
import type { TabunganAppType } from "~/types/tabungan/tabungan-app-type";
import { DtoDataTabunganCurrentRombel} from "~/context-reduct/selectores/data-tabungan-selector";
import DtoTabungan from "~/dtos/dto-tabungan";
import { useCrudTabunganProvider } from "~/controllers/tabungan/crud/crud-tabungan-provider";
import type { TabunganSheetType } from "~/types/tabungan/tabungan-sheet-type";
import { FokusRombelKeuangan } from "~/context-reduct/selectores/rombel-tabungan-selector";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";
import { Loader } from "lucide-react";
import { namaTab } from "~/lib/nama-tab-environment";
import { isSameDay } from "node_modules/date-fns";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";



export default function InputHarianTabungan(){
    const {state, actions} = useCrudTabunganProvider();
    const {value} = useFilterContext<{
        currentTgalInput:Date
    }>();
    const penginput = useAppSelector(state=>state.auth.user?.name);
    const tabungan = useAppSelector(DtoDataTabunganCurrentRombel);
    
    const keuangan = useAppSelector(FokusRombelKeuangan)
    const [nominal, setNominal] = useState<number>();
    const [inputanKategori, setInputanKategori] = useState<keyof TabunganAppType>('masuk');
    // const [tabungan, setTabungan] = useImmer<TabunganAppType[]>([]);
    const [tabunganItem, setTabunganItem] = useImmer<TabunganAppType>({
        idbaris: 0,
        time_stamp: value?.extra?.currentTgalInput ??new Date(),
        penginput: penginput ?? '-',
        kategori:'tabungan',
        status:'',
        keterangan:''
    });

    useEffect(()=>{
        setTabunganItem(draft=>{
            draft.time_stamp = value?.extra?.currentTgalInput ?? new Date()
        })
    },[
        value
    ])
    const tabunganServer = useMemo(()=>tabungan.filter(s=>isSameDay(s.time_stamp, value?.extra?.currentTgalInput ??new Date()) && s.status === ""), [tabungan, value, value?.extra?.currentTgalInput]);

    const handleInputKeterangan = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const v = e.currentTarget.value ??'';
        setTabunganItem(d=>{
            d.keterangan = v
        })
    }

    useEffect(()=>{
        if(inputanKategori === 'masuk'){
            setTabunganItem(draft=>{
                    draft.keluar=undefined,
                    draft.masuk = nominal
                }
            )
        }else{
            setTabunganItem(draft=>{
                    draft.masuk=undefined,
                    draft.keluar = nominal
                }
            )
        }
    },
    [nominal,inputanKategori]);

    const onSubmit = async()=>{
        if(!tabunganItem.siswa_id || (!tabunganItem.masuk && !tabunganItem.keluar) ||  (nominal === 0 || nominal ===undefined)){
            alert('Wajib diisi nama dan nominal uangnya')
            return;
        }
        
        
        const formData = {
                    ...tabunganItem, 
                    snapshot:[{
                        time_stamp: new Date(),//tabunganItem.time_stamp,
                        penginput:tabunganItem.penginput,
                        kategori:tabunganItem.kategori,
                        keterangan:tabunganItem.keterangan || 'Input awal',
                        nominal:tabunganItem.masuk ?? tabunganItem.keluar ?? 0,
                        kolom: (tabunganItem.masuk ? 'masuk': 'keluar') as keyof TabunganAppType,
                        status:''
                    }]
                }
        const dto  = DtoTabungan.toSheet(formData);
        const argService = {
            data: dto,
            tab: namaTab(keuangan?.kategori!) +"_" +keuangan?.rombel
        }
        const response = await actions.update(argService);
        if(response.success){
            const {success, data, detailResponse} = response;
            if(detailResponse){
                DispatchingResponseToStore(success, data as TabunganSheetType[], detailResponse, keuangan?.rombel)
            }
            ShowToasterSuccess('Berhasil disimpan');
        }else{
            ShowToasterError('Oups, Gagal Menyimpan data');
        }
        /** reset isi form */
        setTabunganItem(draft=>{
            draft.idbaris = 0,
            draft.time_stamp =value?.extra?.currentTgalInput ??new Date(),
            draft.penginput= penginput ?? '-',
            draft.kategori='tabungan',
            draft.siswa_id =undefined,
            draft.nama_siswa =undefined,
            draft.masuk=undefined,
            draft.keluar=undefined,
            draft.status='',
            draft.keterangan=''
        });

        setNominal(undefined);

        // console.log(tabunganItem, tabungan);
    }

    return (
        <>
            <h3 className="font-bold uppercase text-center text-3xl mb-5">{value?.extra?.currentTgalInput?.toLocaleString('id-ID',{dateStyle:'full'}) ??new Date().toLocaleString('id-ID',{dateStyle:'full'})}</h3>
            <div className="flex justify-center items-center print:hidden">
                <div className="border-2 border-blue-400 border-dashed w-11/12 rounded-2xl p-2 my-2  bg-linear-to-tl from-sky-600 to-sky-300 shadow-2xl">
                    <FieldCustomerSiswa disabled={state.isSubmitting} value={tabunganItem} setValue={setTabunganItem} values={tabunganServer}/>
                    <FieldDebitKredit disabled={state.isSubmitting} value={inputanKategori} setValue={setInputanKategori}/>
                    <Field className="relative mt-6 w-10/12 mx-auto">
                        <div className="absolute top-0 left-2 -translate-y-3 text-xs pe-5 ps-1 rounded-se-2xl bg-white max-w-fit">Rp</div>
                        <CurrencyInput
                                value={nominal}
                                onValueChange={setNominal}
                                disabled={state.isSubmitting}
                                prefix="Rp. "
                                className="bg-white focus-visible:outline-none focus-within:ring-0 focus-visible:ring-0 rounded-xl"
                            />
                    </Field>
                    <Field className="relative mt-6 w-10/12 mx-auto">
                        <div className="absolute top-0 left-2 -translate-y-3 text-xs pe-5 ps-1 rounded-se-2xl bg-white max-w-fit">Keterangan</div>
                        <Input 
                            type="text" 
                            placeholder="Opsional, misal: belum diberikan kembalian, dll"
                            value={tabunganItem.keterangan??''}
                            onChange={handleInputKeterangan}
                            disabled={state.isSubmitting}
                            className="bg-white focus-visible:outline-none focus-within:ring-0 focus-visible:ring-0 rounded-xl"/>
                    </Field>
                    <div className="flex justify-center mt-2">
                        <ButtonSaveAwesome className="px-2 py-1"  onClick={onSubmit} labelButton="Simpan"  
                        disabled={state.isSubmitting}
                        >
                            {
                            state.isSubmitting && <Loader size={12} className="animate-spin self-center"/>}
                        </ButtonSaveAwesome> 
                    </div>
                
                </div>
            </div>
            <TableInputTabungan data={tabunganServer}/>
        </>
    )
}