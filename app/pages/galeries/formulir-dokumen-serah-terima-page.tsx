import { useImmer } from "use-immer";
import FieldsetJenisKegiatanDanPersonal from "~/controllers/serah-terima-dokumen/fieldsets/fieldset-jenis-kegiatan-dan-personal";
import FieldsetNamaKegiatan from "~/controllers/serah-terima-dokumen/fieldsets/fieldset-nama-kegiatan";
import type{ SerahTerimaDokumenAppType } from "~/types/galleries/serah-terima-dokumen-app-type";
import FieldsetTargetSiswa from "~/controllers/serah-terima-dokumen/fieldsets/fieldset-target-siswa";
import { PersonalTypeEnum } from "~/types/galleries/personal-type-enum";
import FieldsetItemsDokumen from "~/controllers/serah-terima-dokumen/fieldsets/fieldset-items-dokumen";
import FieldsetKeteranganKegiatanSerahTerima from "~/controllers/serah-terima-dokumen/fieldsets/fieldset-keterangan";
import AksesFormulirSerahTerimaDokumen from "~/controllers/serah-terima-dokumen/fieldsets/fieldset-akses-akun";
import FieldsetTargetPtk from "~/controllers/serah-terima-dokumen/fieldsets/fieldset-target-ptk";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import { useCrudSerahTerimaProvider } from "~/controllers/serah-terima-dokumen/cruds/crud-provider-serah-terima-dokumen";
import { Loader, Printer } from "lucide-react";
import isValidInputSerahTerimaDokumen from "~/controllers/serah-terima-dokumen/cruds/validate-serah-terima-document";
import { toast } from "sonner";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import DtoSerahTerimaDokumen from "~/dtos/dto-serah-terima-dokumen";
import { useModal } from "~/components/modals/modal-provider";
import { isDev } from "~/lib/nama-tab-environment";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import type { UserPtk } from "~/types";


export default function FormulirDokumenSerahTerimaDokumen(){
    const {actions:post,state} = useCrudSerahTerimaProvider();
    const {actions:modal} = useModal<SerahTerimaDokumenAppType>();
    const user = getSessionApp<UserPtk>()!;//?.friends);
    const initial:SerahTerimaDokumenAppType = {
        idbaris:0,
        nama_kegiatan: '',
        // jenis?: JenisSerahTerimaEnum,
        start_date: new Date(),
        // end_date?: Date,
        keterangan: '',
        akses_user: [27, user?.id],
        target_person: [],
        // type_target: ,
        item_barang: [],
        additional_info: [],
        status:''
    }
    const [serahTerimaDokumen, setSerahTerimaDokumen] = useImmer<SerahTerimaDokumenAppType>(initial)

    const onSubmit = async()=>{
        
        const checked = isValidInputSerahTerimaDokumen(serahTerimaDokumen)
        
        if(!checked.isValid){
            alert(checked.message);
            return;
        }
        
        const dto = DtoSerahTerimaDokumen.fromAppToSheet(serahTerimaDokumen)
        toast.promise(
            post.update(dto),
            {
                loading:'Sedang mengupdate',
                success:(respons)=>{
                    const {success, data,detailResponse} = respons;
                    
                    DispatchingResponseToStore(success, data as unknown as SerahTerimaDokumenAppType[],  detailResponse!)
                    setSerahTerimaDokumen(initial);
                    return 'Daftar formulir telah salesai dibuat'
                },
                error:'Oups, error terjadi.'
            }
        )
    }
    const onPreview = ()=>{
        const checked = isValidInputSerahTerimaDokumen(serahTerimaDokumen)
        
        if(!checked.isValid){
            alert(checked.message);
            return;
        }
        modal.open('PRINT DAFTAR SERAH TERIMA', serahTerimaDokumen,  {closeOnOutsideClick:false});
    }
    return (
        <>
            <div className="border rounded-2xl md:w-3xl mx-auto my-5 p-2 md:p-4 flex flex-col bg-linear-to-r from-sky-300 via-purple-400 to-amber-500 gap-2">
                <fieldset  disabled={state.isSubmitting}>
                    <FieldsetNamaKegiatan value={serahTerimaDokumen} setValue={setSerahTerimaDokumen}/>
                    <AksesFormulirSerahTerimaDokumen value={serahTerimaDokumen} setValue={setSerahTerimaDokumen}/>
                    <FieldsetJenisKegiatanDanPersonal value={serahTerimaDokumen} setValue={setSerahTerimaDokumen}/>
                    {
                        serahTerimaDokumen?.type_target === 'SISWA' as keyof typeof PersonalTypeEnum && <FieldsetTargetSiswa value={serahTerimaDokumen} setValue={setSerahTerimaDokumen}/>
                    }
                    {
                        serahTerimaDokumen?.type_target === 'PTK' as keyof typeof PersonalTypeEnum && <FieldsetTargetPtk value={serahTerimaDokumen} setValue={setSerahTerimaDokumen}/>
                    }
                    <FieldsetItemsDokumen value={serahTerimaDokumen} setValue={setSerahTerimaDokumen}/>
                    <FieldsetKeteranganKegiatanSerahTerima value={serahTerimaDokumen} setValue={setSerahTerimaDokumen}/>
                    
                </fieldset>
            </div>
            <div className="border rounded-2xl w-11/12 mx-auto my-5 md:p-4 flex flex-col-reverse md:flex-row justify-center items-center bg-radial to-sky-300 via-purple-400 from-amber-500 gap-2">
                <ButtonCommitAwesome 
                    className="px-4 py-0" 
                    disabled={state.isSubmitting} 
                    onClick={onSubmit}
                    labelButton="Simpan">
                    {
                        state.isSubmitting && <Loader size={12} className="animate-spin self-center"/>
                    }
                </ButtonCommitAwesome>
                <ButtonCommitAwesome 
                    className="px-4 py-0" 
                    disabled={state.isSubmitting} 
                    onClick={onPreview}
                    labelButton="Preview Daftar">
                    {
                        state.isSubmitting 
                            ? (<Loader size={12} className="animate-spin self-center"/>)
                            : (<Printer size={12}/>)
                    }
                </ButtonCommitAwesome>
            </div>
        </>
    )
}