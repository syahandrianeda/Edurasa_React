import { useFormEdura } from "~/components/form-custom/form-edura";
import type { SiswaType } from "~/types/siswa";
import { useSiswaCrud } from "../kesiswaan-controller";
import { useAppDispatch } from "~/context-reduct/hook";
import { DTOSiswa } from "~/dtos/dto-siswa";
import { setAllSiswa } from "~/context-reduct/global-state/siswa-slice";
import { presentValidationErrors, ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";
import { Loader } from "lucide-react";
import { validateClosestForm } from "~/components/form-custom/validation-form";
import { validateSiswa } from "./validation-siswa";


export default function SendTambah(){

    const {currentData,reset} = useFormEdura<SiswaType>();
    const {state, actions:siswaActions} = useSiswaCrud();
    const dispatch = useAppDispatch()
    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        
        const conf= confirm("Anda yakin?");
        if(!conf) return;

          // 1. Native validation (optional)
        if (!validateClosestForm(e)) return

        // 2. Domain validation
        const errors = validateSiswa(currentData)

        if (Object.keys(errors).length > 0) {
            ShowToasterError(presentValidationErrors(errors))
            return
        }
        // ambil state dari context / store
        
        const DTO = DTOSiswa.toAppScript(currentData);
        const param = {
            formData: JSON.stringify(DTO),
            autoId:'id',
        }
        
        const respon = await siswaActions.create(param);
        
        if(respon.success){
            dispatch(setAllSiswa({
                loaded:true,
                allSiswa: respon.data as SiswaType[],
                source: respon?.source,
                loading:false
            }))

            ShowToasterSuccess('Berhasil ditambahkan');
            reset()
        }else{
            ShowToasterError('Gagal Menambahkan');
        }
    }

    return (
        <button type="button" onClick={onSubmit} disabled={state.isSubmitting} className="mx-auto rounded-xl bg-sky-700 px-2 shadow-sky-300 text-sky-50 inner-shadow-sky-200 disabled:bg-sky-900 disabled:text-sky-400 flex justify-center gap-2">
            {state.isSubmitting && <Loader size={12} className="animate-spin self-center"/>}Tambah
        </button>
    )
}