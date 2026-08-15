import { TriangleAlert } from "lucide-react";
import { useFormEdura } from "~/components/form-custom/form-edura";
import { type SerahTerimaDokumenAppType } from "~/types/galleries/serah-terima-dokumen-app-type";
import { useCrudSerahTerimaProvider } from "../../cruds/crud-provider-serah-terima-dokumen";
import TableInfoSerahTerimaDokumenModal from "./table-info-serah-terima-dokumen-modal";
import { useEffect } from "react";

export default function FormDeleteSerahTerimaDokumen(){
    const {currentData:data, setCurrentData} = useFormEdura<SerahTerimaDokumenAppType>();
    const {actions, state:stateCrud} = useCrudSerahTerimaProvider();
    useEffect(()=>{
        setCurrentData(draft=>{
            draft.status = "hapus"
        })
    },[])
    return (
        <div className="grid grid-cols-1 gap-2 space-x-2 md:grid-cols-2 bg-linear-to-tl from-sky-400 to-sky-300 p-2  h-[calc(100vh-12.5rem)]  md:overflow-y-auto scrol-h-custom">
            <div className="border px-10 pt-2 pb-8  my-auto flex-col  text-center rounded-2xl bg-sky-100/50 border-sky-500 inset-shadow-sky-600 shadow-lg">
                <div className="text-2xl">
                    <TriangleAlert size={72} className="text-rose-500 mx-auto"/>
                    Anda yakin akan menghapus <strong>{data.nama_kegiatan}</strong> ini?
                    {
                        stateCrud.isSubmitting?'Memproses':''
                    }
                </div>
            </div>
            <div className="border px-2 overflow-hidden  my-auto flex-col justify-center  rounded-2xl bg-sky-100/50 border-sky-500 inset-shadow-sky-600 shadow-lg">
                <TableInfoSerahTerimaDokumenModal className="w-full"/>
            </div>
        </div>
    )
}