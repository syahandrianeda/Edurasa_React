
import { CurrencyInput } from "~/components/ui/currency-input";
import { Field} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import FieldDebitKredit from "~/controllers/tabungan/modal/inputs/field-debit-kredit";
import type { ModalState } from "~/components/modals/modal-provider";
import { useFormEdura } from "~/components/form-custom/form-edura";
import type{ TabunganAppType } from "~/types/tabungan/tabungan-app-type";
import { useCrudTabunganProvider } from "../../crud/crud-tabungan-provider";
import { useEffect, useMemo, useState } from "react";
import ButtonUpdateTabungan from "../../crud/button-update-tabungan";
import WrapperSnapshot from "../previews/wrapper-snapshot-single";

export default function ModalFieldTabungan({stateModal}:{stateModal:ModalState}){
    const { currentData: tabunganItem, setCurrentData: setTabunganItem, } = useFormEdura<TabunganAppType>();

    const { state } = useCrudTabunganProvider();

    const [inputanKategori, setInputanKategori] = useState<keyof TabunganAppType>("masuk");

    const handleInputKeterangan = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const value = e.currentTarget.value;

        setTabunganItem((draft) => {
            draft.keterangan = value;
        });
    };

    /**
     * Sinkronkan kategori ketika modal pertama kali dibuka
     * atau currentData berganti.
     */
    useEffect(() => {
        const kategori: keyof TabunganAppType =
            tabunganItem.masuk != null ? "masuk" : "keluar";

        setInputanKategori(kategori);
    }, [tabunganItem.siswa_id]);

    /**
     * Nominal selalu berasal dari currentData
     */
    const nominal =
        inputanKategori === "masuk"
            ? tabunganItem.masuk
            : tabunganItem.keluar;

    /**
     * User mengubah Debit/Kredit
     */
    const handleChangeKategori = (kategori: keyof TabunganAppType) => {
    setInputanKategori(kategori);

    setTabunganItem((draft) => {
        console.log("SEBELUM", {
            masuk: draft.masuk,
            keluar: draft.keluar,
        });

        if (kategori === "masuk") {
            draft.masuk = draft.keluar;
            draft.keluar = undefined;
        } else {
            draft.keluar = draft.masuk;
            draft.masuk = undefined;
        }

        console.log("SESUDAH", {
            masuk: draft.masuk,
            keluar: draft.keluar,
        });
    });
};

    /**
     * User mengubah nominal
     */
    const handleNominalChange = (value?: number) => {
        setTabunganItem((draft) => {
            if (inputanKategori === "masuk") {
                draft.masuk = value;
                draft.keluar = undefined;
            } else {
                draft.keluar = value;
                draft.masuk = undefined;
            }
        });
    };

    return (
        <WrapperSnapshot>
            <div className="flex justify-center items-center h-81.5">
                <div className="border-2 border-blue-400 border-dashed w-11/12 rounded-2xl p-2 my-2  bg-linear-to-tl from-sky-600 to-sky-300 shadow-2xl">
                    <h3 className="text-center text-xl font-bold">
                        {
                        tabunganItem.nama_siswa
                        }
                    </h3>
                    <FieldDebitKredit disabled={state.isSubmitting} value={inputanKategori} setValue={(k)=>handleChangeKategori(k as keyof TabunganAppType)}/>
                    <Field className="relative mt-6 w-10/12 mx-auto">
                        <div className="absolute top-0 left-2 -translate-y-3 text-xs pe-5 ps-1 rounded-se-2xl bg-white max-w-fit">Rp</div>
                        <CurrencyInput
                                value={nominal}
                                onValueChange={handleNominalChange}
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
                            value={tabunganItem.keterangan ??''}
                            onChange={handleInputKeterangan}
                            disabled={state.isSubmitting}
                            className="bg-white focus-visible:outline-none focus-within:ring-0 focus-visible:ring-0 rounded-xl"/>
                    </Field>
                    
                </div>
            </div>
        </WrapperSnapshot>
    )
}