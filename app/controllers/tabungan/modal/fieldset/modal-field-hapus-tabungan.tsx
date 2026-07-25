import { TriangleAlert } from "lucide-react";
import { FormEdura, useFormEdura } from "~/components/form-custom/form-edura";
import type { ModalState } from "~/components/modals/modal-provider";
import { Field } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import type { TabunganAppType } from "~/types/tabungan/tabungan-app-type";
import { useCrudTabunganProvider } from "../../crud/crud-tabungan-provider";
import PreviewSnapshot from "../previews/preview-snapshot";


export default function ModalFieldHapusTabungan({state}:{state:ModalState}){
    const {currentData, setCurrentData} = useFormEdura<TabunganAppType>();
    const { state:stateCrud } = useCrudTabunganProvider();
    

    const handleInputKeterangan = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const value = e.currentTarget.value;

        setCurrentData((draft) => {
            draft.keterangan = value;
        });
    };

    return (
        <div className="grid grid-cols-1 gap-2 space-x-2 md:grid-cols-2 bg-linear-to-tl from-sky-400 to-sky-300 p-2  h-[calc(100vh-12.5rem)]  md:overflow-y-auto scrol-h-custom">
                <div className="border px-10 pt-2 pb-8 flex flex-col justify-center text-center rounded-2xl bg-sky-100/50 border-sky-500 inset-shadow-sky-600 shadow-lg">
                    <div className="text-2xl font-extrabold">
                        <TriangleAlert size={72} className="text-rose-500 mx-auto"/>
                        Anda yakin akan menghapus data tabungan ini?
                    </div>
                    <div className="border rounded-2xl p-3 text-center">
                        Berikan Keterangan:
                        
                    <Field className="relative mt-6 w-10/12 mx-auto">
                        <div className="absolute top-0 left-2 -translate-y-3 text-xs pe-5 ps-1 rounded-se-2xl bg-white max-w-fit">Keterangan</div>
                        <Input
                            type="text" 
                            placeholder="Berikan catatan agar bisa terlacak"
                            value={currentData.keterangan ??''}
                            onChange={handleInputKeterangan}
                            disabled={stateCrud.isSubmitting}
                            className="bg-white focus-visible:outline-none focus-within:ring-0 focus-visible:ring-0 rounded-xl"/>
                    </Field>
                    </div>
                </div>
                <div className="border rounded-2xl bg-linear-to-tl from-sky-400 to-sky-300  border-sky-500 inset-shadow-sky-600 shadow-lg p-1 md:overflow-y-auto scrol-h-custom">
                    {
                        currentData?.snapshot && currentData?.snapshot.length > 0 ? (
                            <PreviewSnapshot/>

                        ):(
                            <p>Tidak ada snapshot (riwayat penginputan)</p>
                        )
                    }
                </div>
            </div>

        
        
    )
}