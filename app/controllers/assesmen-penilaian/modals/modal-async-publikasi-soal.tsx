import { toast } from "sonner";
import {useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useModal, type ModalState } from "~/components/modals/modal-provider";
import type { PaketSoalDesign } from "~/domain/paket-soal/result/paket-soal";
import ReadTxtService from "~/infrastructures/services/read-txt-service";
import DataKisiKisi from "~/domain/paket-soal/infrastructure/data-kisi-kisi-class";
import loadingGif from "~/images/barloading.gif"
import { FormEdura } from "~/components/form-custom/form-edura";
import { PaketSoalDesignParseDto } from "~/dtos/dto-parsing-paket-soal";
import type { PaketSoalAppType } from "~/types/bank-soal/entities/paket-soal-app-type";
import type { PraSettingPaket } from "~/domain/paket-soal/entities/pra-setting-paket";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";


export default function ModalAsyncPublikasiPaketSoal({state, children}:{state:ModalState<TagihanHasDataResponse>, children:ReactNode}){
    const data = state.payload;
    const idbaris = data?.idbaris ?? 0;
    const idFile = data?.id_file_setting

    const [paketSoal, setPaketSoal] = useState<PaketSoalDesign>();
    const {actions} = useModal();
    const loadedIdRef = useRef<string | null>(null);
    
     useEffect(() => {
        if(!idFile) return;
        if (loadedIdRef.current === idFile) return;

        loadedIdRef.current = idFile;
        const loadData = async () => {
            if (!idFile) return;

            

            const service = new ReadTxtService();

            return await service.readFile({idFile})
        };

        toast.promise(
            loadData(),
            {
                loading:'Sedang membaca data Paket Soal, mohon tunggu',
                success: (response)=>{
                    
                    if(response?.success){

                        
                        if(response.data){
                            const convertJson= JSON.parse(response.data as string);
                            const data = PaketSoalDesignParseDto.fromJson(convertJson);//
                            
                            setPaketSoal({
                                    ...data,
                                    setting: {
                                        ...data.setting,
                                        idbaris
                                    } as PraSettingPaket
                                });

                            return 'Selesai membaca'
                        }
                    }
                    actions.close();
                    return 'Sukses memanggil, tapi data gagal dibentuk'
                },
                error:(er)=>{
                    console.log(er);
                    actions.close();
                    return 'Gagal dipanggil, coba sekali lagi | '+er;
                },
                closeButton:true,
            }

        )

    }, [idFile, idbaris]);

    const KisiKisiInstance = useMemo(()=>{
            if(!paketSoal) return;
    
            return new DataKisiKisi(paketSoal)
            },[paketSoal]);
    
  
    return (
        KisiKisiInstance ? (
            <FormEdura data={KisiKisiInstance }>
                {
                    children
                }
            </FormEdura>
        ):(
            <div className="w-full min-h-24 flex justify-center items-center">
                <img src={loadingGif} className="w-fit" alt="animasi-loading"/>
            </div>
        )
    )
}