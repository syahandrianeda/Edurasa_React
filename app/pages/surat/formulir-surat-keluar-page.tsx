import {useEffect, useMemo, useState } from "react";
import { useImmer, type Updater } from "use-immer";
import { KlasifikasiNoSurat } from "~/domain/surat/klasifikasi-surat-permendagri";
import { isDev } from "~/lib/nama-tab-environment";
import type { SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";
import ButtonSaveAwesome from "~/components/button-awesome/save-button";
import { Loader } from "lucide-react";
import { useCrudSuratKeluar } from "~/controllers/surat/crud/surat-keluar-crud-provider";
import { useSppdCrudProvider } from "~/controllers/surat/crud/sppd-crud-provider";
import { toast } from "sonner";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import type { UserPtk } from "~/types";
import DtoSuratKeluar from "~/dtos/dto-surat-keluar";
import FormulirInputSuratKeluar from "~/controllers/surat/forms/formulir-surat-keluar";
import PerihalSurat from "~/controllers/surat/modals/fields/perihal-surat";
import KlasifikasiSuratNonSppd from "~/controllers/surat/modals/fields/klasifikasi-surat-keluar-non-sppd";
import type { templateSuratType } from "~/domain/surat/template-surat";
import FieldKoleksiPersonalSiswaType from "~/controllers/surat/modals/fieldset/field-koleksi-personal-siswa-type";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import { currentTapel } from "~/lib/current-tapel";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import type { SuratKeluarSheetType } from "~/types/surat/surat-keluar-sheet-type";


export default function FormulirSuratKeluarPage({nextNoSurat}:{nextNoSurat:number}){
    
    const {state:stateSuratKeluar, actions:postSuratKeluar} = useCrudSuratKeluar();
    const {state:stateSppd, actions:postSppd} = useSppdCrudProvider();
    const {id:user, name} = getSessionApp<UserPtk>()!;
    const idfile= isDev?'1CSOjBivY2iRpL_vOzALa-rAmIIF26apb':'';
    const koleksiTemplateSiswa = KlasifikasiNoSurat.filter(s=> s.template && !['SPPD', 'Surat Pengantar'].includes(s.template)).map(m=>m.template) || [];
    const [prefix, setPrefix] = useState<string>('');
    const tapel = currentTapel({variant:'short'});
    
    
    
    // const initialSuratKeluar:SuratKeluarAppType = {
    const initialSuratKeluar:DataOrmSuratKeluarType = {
            hasTemplate:false,
            tapelSurat:tapel,
            dataTemplate:undefined,
            idbaris:0,
            nosurat: "",
            id_nosurat: nextNoSurat.toString(),
            tglsurat: new Date(),
            perihal: "",
            indekssurat: "",
            ditujukkankepada: "",
            idfile: "",
            status: "",
            oleh: name,
            user,
            target_siswa: [],
            target_ptk: [],
            refrensi_suratmasuk: 0,
        

    }
    
    const [suratKeluar, setSuratKeluar] =  useImmer<DataOrmSuratKeluarType>(initialSuratKeluar);
    
    useEffect(()=>{
        setSuratKeluar(draft=>{
            draft.id_nosurat = nextNoSurat.toString();
        });
    },[nextNoSurat]);

    const handlePrihal = (value:string)=>{
        setSuratKeluar(draft=>{
            draft.perihal = value
        })
    }

    const handleKlasifikasi = (v:string)=>{
        setPrefix(v);   
        const Selected = KlasifikasiNoSurat.find(s=>s.value === v);
        if(Selected){
            if(Selected.template){
                
                setSuratKeluar(draft=>{ 
                    draft.indekssurat = Selected.template!; 
                    draft.dataTemplate = {
                        ...draft.dataTemplate,
                        name:Selected.template!,
                        
                    }
                })
            }else{
                setSuratKeluar(draft=>{ 
                    draft.indekssurat = Selected.temporary!; 
                    draft.dataTemplate = undefined
                })
            }
        }else{
            setSuratKeluar(draft=>{ 
                draft.indekssurat = ''; 
                draft.dataTemplate = undefined
            })
        }
    };
    const reset = ()=>{
        setSuratKeluar(initialSuratKeluar);
        setPrefix('');
    }
    const onSubmit = async()=>{
        /**
         * validation level 1: validation Surat Masuk
         * * `asalsurat` dan `perihal` tidak boleh kosong
         */
        if( suratKeluar.ditujukkankepada === "" || 
            suratKeluar.nosurat ==="" || 
            suratKeluar.id_nosurat === "" ||
            suratKeluar.perihal === ""
        ){
            
            alert('Tujuan surat, nomor urut surat, dan/atau perihal tidak boleh kosong');
            return;
        }
        
        const paramSuratKeluar = DtoSuratKeluar.toSheetPartial(suratKeluar)
        
        const dtoSuratKeluar = DtoSuratKeluar.toSheet(paramSuratKeluar )
    

        toast.promise(
            postSuratKeluar.update(paramSuratKeluar),
            {
                loading:'memproses surat ...',
                success:(response)=>{
                    const {success,data,detailResponse} = response;
                    
                    if(detailResponse){
                        DispatchingResponseToStore(success,data as SuratKeluarSheetType[],detailResponse)
                    }
                                                
                        reset();
                    return 'Surat Berhasil disimpan'
                },
                    error:(er)=> {
                        console.log(er);
                        return `Oups, Errors... `
                    },
                                finally(){
                                    
                                },
            }
            
        )
    }

    return (
        <div className="p-1 mb-9">
            <h3 className="text-xl font-bold text-center mb-7">Form Input Surat Keluar</h3>
            <div className="relative border mt-7 bg-linear-to-tl from-sky-300 to-sky-200 rounded-2xl p-4">
                <h3 className="absolute -top-4 left-0 bg-sky-200 ps-2 pe-4 rounded-tr-2xl">Surat Keluar</h3>
                <div className="flex gap-2 mt-7 relative border-2 broder-dotted px-2 py-4 border-sky-300 shadow-lg shadow-sky-500 bg-linear-to-br from-sky-200 to-sky-300 rounded-tr-4xl">
                    <div className="absolute -top-4 text-xs -left-0.5 bg-sky-200 ps-1 pe-4 rounded-tr-2xl border-s-2 border-t border-b-0 border-e border-sky-300">Klasifikasi</div>
                    <div className="w-full">
                        <KlasifikasiSuratNonSppd prefix={prefix} onChangePrefix={handleKlasifikasi} setCurrentData={setSuratKeluar}/>
                    </div>
                    <div className="relative w-full mt-7 border-2 broder-dotted px-2 py-4 border-sky-300 shadow-lg shadow-sky-500 bg-linear-to-br from-sky-200 to-sky-300 rounded-tr-4xl md:grid-cols-12 gap-2">
                        <p className="absolute -top-4 text-xs -left-0.5 bg-sky-200 ps-1 pe-4 rounded-tr-2xl border-s-2 border-t border-b-0 border-e border-sky-300">Jenis Surat Keluar</p>
                        {suratKeluar.indekssurat}
                    </div>
                </div>
                
                <FormulirInputSuratKeluar
                    suratKeluar={suratKeluar}
                    setSuratKeluar={setSuratKeluar as unknown as Updater<SuratKeluarAppType>}
                    prefix={prefix}
                />
                <div className="flex gap-2 mt-7 relative border-2 broder-dotted px-2 py-4 border-sky-300 shadow-lg shadow-sky-500 bg-linear-to-br from-sky-200 to-sky-300 rounded-tr-4xl">
                    <div className="absolute -top-4 text-xs -left-0.5 bg-sky-200 ps-1 pe-4 rounded-tr-2xl border-s-2 border-t border-b-0 border-e border-sky-300">Perihal</div>
                    <PerihalSurat inputValue={suratKeluar.perihal} handleChange={handlePrihal}/>
                </div>

            </div>
            {
                koleksiTemplateSiswa?.includes(suratKeluar?.indekssurat as templateSuratType ?? '') && (
                    <FieldKoleksiPersonalSiswaType currentData={suratKeluar} setCurrentData={setSuratKeluar}/>
                            
                )
            }

            <div className="border bg-linear-to-tl mt-7 from-sky-300 to-sky-200 rounded-2xl p-4">
                <ButtonSaveAwesome className="px-2 py-0 mx-auto"  type='button' onClick={onSubmit} labelButton="Simpan"  
                    disabled={ stateSuratKeluar.isSubmitting } 
                >
                    {
                        ( stateSuratKeluar.isSubmitting ) && <Loader size={12} className="animate-spin self-center"/>
                    }
                </ButtonSaveAwesome> 
            </div>
        </div>

    )
}
