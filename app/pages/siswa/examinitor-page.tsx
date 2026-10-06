import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import { useCallback, useEffect, useState } from "react";
import ReadTxtService from "~/infrastructures/services/read-txt-service";
import type{ PaketSoalDesign } from "~/domain/paket-soal/result/paket-soal";
import {toast} from 'sonner';
import { PaketSoalDesignParseDto } from "~/dtos/dto-parsing-paket-soal";
import type { PraSettingPaket } from "~/domain/paket-soal/entities/pra-setting-paket";
import { getGlobalIndex } from "~/domain/paket-soal/result/create-design";
import ItemSoalPreview from "~/controllers/paket-soal/components/item-soal-preview";
import PreviewSoalOnline from "~/controllers/respon-tagihan-siswa/preview-soal-online-siswa";
import { useImmer } from "use-immer";
import type { RisponsePenilaianSiswa } from "~/types/penilaian/nilai-siswa-app-type";
import type ResponSiswaTagihanPenilaian from "~/domain/penilaian/infrastucture/respon-siswa-tagihan-penilaian-class";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import type { UserSiswa } from "~/types/user-siswa";
import BuildParanResponTagihanSiswa from "./build-param-respon";
import { useCrudResponTagihanSiswa } from "~/controllers/respon-tagihan-siswa/crud/crud-provider-respon-siswa";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import type { NilaiSiswaSheetType } from "~/types/penilaian/nilai-siswa-sheet-type";

export default function ExaminatorPage({data}:{data:TagihanHasDataResponse}){
    const {actions, state} = useCrudResponTagihanSiswa();
    const [paketSoal, setPaketSoal] = useState<PaketSoalDesign>();
    const [start, setStart] = useState<Date>(new Date());
    const [load, setLoad] = useState<string>('')
    const user = getSessionApp<UserSiswa>();
    
    const [dataRespon, setDataRespon] = useImmer<RisponsePenilaianSiswa[]>([])
    const Api = useCallback(async()=>{
        const api = new ReadTxtService();
        const idFile = data.id_file_setting;
        setLoad('Sedang memproses')
        return await api.readFile({idFile})
    },[data.id_file_setting]);

    useEffect(()=>{
        toast.promise(
            Api,
            {
                loading: 'Sedang mempersiapkan...,',
                success:(response)=>{
                    if(response?.success){
                        if(response.data){
                            const convertJson= JSON.parse(response.data as string);
                            const data = PaketSoalDesignParseDto.fromJson(convertJson);//
                            setStart(new Date());
                            setPaketSoal(data);
                            setLoad('')
                            return 'Selesai membaca'
                        }
                    }
                    
                                            
                },
                error: (err)=>{
                    setLoad('Gagal merespon, coba reload halaman')
                    return 'Gagal membuka file | '+ err
                },
                closeButton:true,

            }

        );
      
    },[Api, setPaketSoal])
    
    const functionSetRespon= useCallback((field:RisponsePenilaianSiswa, value:string, skor:number)=>{
        
        setDataRespon(draft=>{
            const findIndex = draft.findIndex(s=>s.index === field.index);
            if(findIndex>-1){
                draft[findIndex] = {...field, respon:value, skor}
            }else{
                draft.push({...field, respon:value, skor})
            }
            draft.sort((a,b)=>a.index-b.index)
        })
       
        
    },[setDataRespon]);

    const onSubmit = ()=>{
        const pesan = confirm('Ananda yakin?')
        if(!pesan) return;
        // const dataParam = dataRespon.sort((a,b)=>a.index-b.index)
        console.log({dataRespon, data, user, start})
        const instan = new BuildParanResponTagihanSiswa(dataRespon, data, user!, start).build();
        const param = instan.dataNilaiSiswa;
        if(!param) return;
        toast.promise(
            actions.update(param),{
                loading: 'Sedang mengirimkan jawaban',
                success: (response)=>{
                    DispatchingResponseToStore(
                        response?.success,
                        response?.data as NilaiSiswaSheetType[],
                        response?.detailResponse!
                    )
                    setPaketSoal(undefined);
                    setLoad('Silakan kembali ke halaman informasiku')
                    return 'Berhasil mengirmkan data.'
                },
                error:(data)=>'Gagal mengrimkan data | '+ data,
                closeButton:true
            }
        )
    }
    
    return (
        <div className="relative mb-16">
        
        {
            paketSoal ? (
                <PreviewSoalOnline paketSoal={paketSoal} collectionRespon={dataRespon} handleChange={functionSetRespon}/>

            ):(
                <p>{load}</p>
            )
        }
            {
                paketSoal && (
                    <div className="sticky bottom-0 bg-sky-300 z-50 min-h-14 w-full flex justify-center items-center rounded-t-2xl">
                        <ButtonCommitAwesome disabled={state.isSubmitting} labelButton="Kirim Jawaban" onClick={onSubmit} className="text-[12px] px-4 py-0"/>
                    </div>

                )
            }
        </div>
    )
}