import {useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { KlasifikasiNoSurat, SppdValueTemplate } from "~/domain/surat/klasifikasi-surat-permendagri";
import { isDev } from "~/lib/nama-tab-environment";
import type { SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";
import type{ SuratMasukAppType } from "~/types/surat/surat-masuk-app-type";
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import { Loader } from "lucide-react";
import { useCrudSuratMasuk } from "~/controllers/surat/crud/surat-masuk-crud-provider";
import { useCrudSuratKeluar } from "~/controllers/surat/crud/surat-keluar-crud-provider";
import { useSppdCrudProvider } from "~/controllers/surat/crud/sppd-crud-provider";
import { toast } from "sonner";
import type { SuratMasukSheetType } from "~/types/surat/surat-masuk-sheet-type";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import type { UserPtk } from "~/types";
import DtoSuratMasuk from "~/dtos/dto-surat-masuk";
import DtoSuratKeluar from "~/dtos/dto-surat-keluar";
import DtoSppd from "~/dtos/dto-sppd";
import type { SppdAppType } from "~/types/surat/sppd-app-type";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import type { SuratKeluarSheetType } from "~/types/surat/surat-keluar-sheet-type";
import type { SppdSheetType } from "~/types/surat/sppd-sheet-type";
import FormInputSuratMasuk from "../../controllers/surat/forms/formulir-surat-masuk";
import FormulirSuratKeluarSppd from "~/controllers/surat/forms/formulir-surat-keluar-sppd";

export default function FormulirSuratSppdPage({nextNoSurat}:{nextNoSurat:number}){
    const prefixResource = SppdValueTemplate.value
    const {state:stateSuratMasuk, actions:postSuratMasuk} = useCrudSuratMasuk();
    const {state:stateSuratKeluar, actions:postSuratKeluar} = useCrudSuratKeluar();
    const {state:stateSppd, actions:postSppd} = useSppdCrudProvider();
    const {id:user, name} = getSessionApp<UserPtk>()!;
    const idfile= isDev?'1CSOjBivY2iRpL_vOzALa-rAmIIF26apb':'';
    const [prefix, setPrefix] = useState<string>(prefixResource);
    
    const initialSuratMasuk:SuratMasukAppType={
        idbaris: 0,
        tglditerima: new Date(),
        nosurat: '',
        asalsurat: '',
        tglsurat: new Date(),
        perihal: '',
        indekssurat: 'SPPD',
        ditujukkankepada: '',
        idfile:idfile,
        status: 'diarsipkan',
        oleh: name,
        user:user
    }

    const initialSuratKeluar:SuratKeluarAppType = {
        idbaris:0,
        nosurat: "",
        id_nosurat: nextNoSurat?.toString(),
        tglsurat: new Date(),
        perihal: "",
        indekssurat: "SPPD",
        ditujukkankepada: "",
        idfile: "",
        status: "",
        oleh: name,
        user,
        target_siswa: [],
        target_ptk: [],
        refrensi_suratmasuk: 0,
    }

    const [suratMasuk, setSuratMasuk] = useImmer<SuratMasukAppType>(initialSuratMasuk);
    const [suratKeluar, setSuratKeluar] =  useImmer<SuratKeluarAppType>(initialSuratKeluar);
    const [sppd, setSppd] =  useImmer<SppdAppType[]>([]);

    useEffect(()=>{
        setSuratKeluar(draft=>{
            draft.id_nosurat = nextNoSurat?.toString();
        });
    },[nextNoSurat]);
    
    const handlePrihal = (value:string)=>{
        setSuratMasuk(draft=>{
            draft.perihal = value;
        })
        setSuratKeluar(draft=>{
            draft.perihal = value
        })
    }

    const handleKlasifikasi = (v:string)=>{
        setPrefix(v);   
        const Selected = KlasifikasiNoSurat.find(s=>s.value === v);
        if(Selected){
            if(Selected.template){
                setSuratMasuk(draft=>{ draft.indekssurat = Selected.template!; })
                setSuratKeluar(draft=>{ draft.indekssurat = Selected.template!; })
            }else{
                setSuratMasuk(draft=>{draft.indekssurat = Selected?.temporary!})
                setSuratKeluar(initialSuratKeluar)
            }
        }else{
                setSuratMasuk(draft=>{draft.indekssurat = 'Lainnya'})
        }
        
    };

    const reset = ()=>{
        setSuratKeluar(initialSuratKeluar);
        setSuratMasuk(initialSuratMasuk);
        setSppd([]);
        setPrefix(prefixResource);
    }

    const onSubmit = async()=>{
        /**
         * validation level 1: validation Surat Masuk
         * * `asalsurat` dan `perihal` tidak boleh kosong
         */
        if( 
            suratMasuk.perihal ==='' || 
            suratMasuk.asalsurat ==="" ||
            suratMasuk.indekssurat ==="" 

        ){
            alert('Asal Surat, Perihal, dan/atau Index Surat tidak boleh kosong')
            return;
        }

        /** validation level 2: Jika surat Keluarnya === sppd */
        if(suratMasuk.indekssurat === 'SPPD' && ( suratKeluar.ditujukkankepada === "" || suratKeluar.target_ptk.length === 0 ) ){
            alert('Tujuan Surat Keluar, Ptk yang diperintahkan tidak boleh kosong');
            return;
        }
        const paramSuratMasuk = DtoSuratMasuk.fromAppToSheet(suratMasuk);
        const paramSuratKeluar = (suratMasuk.indekssurat ==='SPPD') ? DtoSuratKeluar.toSheetPartial(suratKeluar):undefined;
        const paramSppd = (suratMasuk.indekssurat ==='SPPD') ? DtoSppd.arrayToSheet(sppd):undefined;
        

        toast.promise(
            async ()=>{
                const {success, data, detailResponse} = await postSuratMasuk.update(suratMasuk);
                if(success){
                    const responseDataSuratMasuk = (data as unknown as SuratMasukSheetType[]);
                    DispatchingResponseToStore(success,responseDataSuratMasuk,detailResponse!);
                    
                    /** lanjut ke surat keluar, jika paramSheetKeluar !== undefined atau sppd */;
                    if(paramSuratKeluar){
                        const lastDataSuratMasuk = responseDataSuratMasuk[responseDataSuratMasuk.length-1]
                        const updateParamSuratKeluar = {...paramSuratKeluar, refrensi_suratmasuk:lastDataSuratMasuk.idbaris};
                        const dtoSuratKeluar = DtoSuratKeluar.toSheet(updateParamSuratKeluar)
                        const {success:successSuratKeluar, data:responsSuratKeluar, detailResponse:detailResponseSuratKeluar} = await postSuratKeluar.update(dtoSuratKeluar);
                        const dataSuratKeluar = responsSuratKeluar as unknown as SuratKeluarSheetType[];

                        DispatchingResponseToStore(successSuratKeluar,dataSuratKeluar ,detailResponseSuratKeluar!);
                        
                        if(successSuratKeluar){
                            const lastDataSuratKeluar = dataSuratKeluar[dataSuratKeluar.length-1];
                        
                            if(paramSppd){
                                const destructiveSppd:SppdSheetType[] = paramSppd.map(m=>({...m, refrensi_suratkeluar:lastDataSuratKeluar.idbaris}))
                                const dto = DtoSppd.arrayToSheet(destructiveSppd);
                                const {success:successSppd, data:responseSppd, detailResponse:detailSppd } = await postSppd.update(dto);
                        
                                if(successSppd){
                                    const sppdType = responseSppd as unknown as SppdSheetType[];
                                    DispatchingResponseToStore(successSppd, sppdType, detailSppd!)
                                }
                            }
                        }
                        
                    }
                }
            },
            {
                loading:'memproses surat ...',
                success:(v)=>{
                        reset()
                    return 'Surat Berhasil disimpan'
                },
                    error:(er)=> {
                        
                        return `Oups, Errors... `
                    },
                                finally(){
                                    
                                },
            }
            
        )
    }

    return (
        <div className="p-1 mb-9">
            <h3 className="text-xl font-bold text-center mb-7">Form Buat SPPD</h3>
            <FormInputSuratMasuk 
                    suratMasuk={suratMasuk}
                    setSuratMasuk={setSuratMasuk}
                    prefix={prefix}
                    handleKlasifikasi={handleKlasifikasi}
                    handlePrihal={handlePrihal}
                    />
            {
                suratMasuk.indekssurat === 'SPPD' && suratMasuk.idfile !== '' && (
                    <FormulirSuratKeluarSppd
                            prefix={prefix} 
                            suratKeluar={suratKeluar} 
                            setSuratKeluar={setSuratKeluar}
                            sppd={sppd}
                            setSppd={setSppd}
                            />
                )
            }
            <div className="border bg-linear-to-tl mt-7 from-sky-300 to-sky-200 rounded-2xl p-4">
                <ButtonSaveAwesome className="px-2 py-0 mx-auto"  type='button' onClick={onSubmit} labelButton="Simpan"  
                        disabled={
                            stateSuratMasuk.isSubmitting || 
                            stateSuratKeluar.isSubmitting || 
                            stateSppd.isSubmitting 
                        }
                    >
                        {
                            (
                                stateSuratMasuk.isSubmitting || 
                                stateSuratKeluar.isSubmitting || 
                                stateSppd.isSubmitting ) && <Loader size={12} className="animate-spin self-center"/>
                        }
                    </ButtonSaveAwesome> 
            </div>
        </div>

    )
}
