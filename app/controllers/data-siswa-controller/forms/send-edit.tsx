import { useFormEdura } from "~/components/form-custom/form-edura";
import type { SiswaType } from "~/types/siswa";

export function SendEdit(){
    const {currentData} = useFormEdura<SiswaType>();
    const onSubmit = (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault()

        // ambil state dari context / store
        console.log("submit edit", currentData)
    }

    return (
        <button type="button" onClick={onSubmit} className="rounded-xl bg-sky-700 border">Kirim Edit</button>
    )
}