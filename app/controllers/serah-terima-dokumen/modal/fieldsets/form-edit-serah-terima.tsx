import { type Updater } from "use-immer";
import FieldsetJenisKegiatanDanPersonal from "~/controllers/serah-terima-dokumen/fieldsets/fieldset-jenis-kegiatan-dan-personal";
import FieldsetNamaKegiatan from "~/controllers/serah-terima-dokumen/fieldsets/fieldset-nama-kegiatan";
import type{ SerahTerimaDokumenAppType } from "~/types/galleries/serah-terima-dokumen-app-type";
import FieldsetTargetSiswa from "~/controllers/serah-terima-dokumen/fieldsets/fieldset-target-siswa";
import { PersonalTypeEnum } from "~/types/galleries/personal-type-enum";
import FieldsetItemsDokumen from "~/controllers/serah-terima-dokumen/fieldsets/fieldset-items-dokumen";
import FieldsetKeteranganKegiatanSerahTerima from "~/controllers/serah-terima-dokumen/fieldsets/fieldset-keterangan";
import AksesFormulirSerahTerimaDokumen from "~/controllers/serah-terima-dokumen/fieldsets/fieldset-akses-akun";
import FieldsetTargetPtk from "~/controllers/serah-terima-dokumen/fieldsets/fieldset-target-ptk";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import type { UserPtk } from "~/types";

export default function FormEditSerahTerimaDokumen(){
    const {currentData:serahTerimaDokumen, setCurrentData:setSerahTerimaDokumen} = useFormEdura<SerahTerimaDokumenAppType>();
    const myId = getSessionApp<UserPtk>()
    const canEdit = !serahTerimaDokumen.akses_user.includes(myId?.id as number);
    
    return (
        <div className="border rounded-2xl mx-5 my-5 p-4 flex flex-col bg-linear-to-r from-sky-300 via-purple-400 md:max-h-[calc(100vh-13rem)] overflow-y-auto scrol-h-custom to-amber-500 gap-2">
            <FieldsetNamaKegiatan value={serahTerimaDokumen} setValue={setSerahTerimaDokumen as Updater<SerahTerimaDokumenAppType>}/>
            <AksesFormulirSerahTerimaDokumen value={serahTerimaDokumen} setValue={setSerahTerimaDokumen as  Updater<SerahTerimaDokumenAppType>}/>
            <FieldsetJenisKegiatanDanPersonal disabled={canEdit} value={serahTerimaDokumen} setValue={setSerahTerimaDokumen as  Updater<SerahTerimaDokumenAppType>}/>
            {
                serahTerimaDokumen?.type_target === 'SISWA' && <FieldsetTargetSiswa value={serahTerimaDokumen} setValue={setSerahTerimaDokumen as  Updater<SerahTerimaDokumenAppType>}/>
            }
            {
                serahTerimaDokumen?.type_target === 'PTK' && <FieldsetTargetPtk value={serahTerimaDokumen} setValue={setSerahTerimaDokumen as  Updater<SerahTerimaDokumenAppType>}/>
            }
            <FieldsetItemsDokumen value={serahTerimaDokumen} setValue={setSerahTerimaDokumen as  Updater<SerahTerimaDokumenAppType>}/>
            <FieldsetKeteranganKegiatanSerahTerima value={serahTerimaDokumen} setValue={setSerahTerimaDokumen as  Updater<SerahTerimaDokumenAppType>}/>
        </div>
    )
}