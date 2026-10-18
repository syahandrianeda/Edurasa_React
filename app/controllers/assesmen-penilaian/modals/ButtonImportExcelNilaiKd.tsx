import { FileDown } from "lucide-react";
import * as React from "react";
import { handleExcelImport } from "~/infrastructures/excels/handle-import";
import { ShowToasterSuccess, ShowToasterError } from "~/lib/toaster";

export function ButtonImportExcelNilaiKd({ callBack }: { callBack: (data: any) => void; }) {
    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const file = e.target.files?.[0];
        if (!file) return;
        // const respon 
        handleExcelImport(e,
            (dataSucces) => {
                callBack(dataSucces);
                ShowToasterSuccess('data berhasil diimport, Silakan periksa datanya');
            },
            (dataError) => {
                //callBack(dataError);
                ShowToasterError('Gagal mengimport data');
                console.log('dateError', dataError);
            }
        );
    };
    return (
        <>
            <label htmlFor={'upload_'}
                className="flex h-fit items-center justify-center gap-[0.5em] rounded-full bg-sky-700 px-4 py-0 text-white shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),0px_0px_4px_1px_var(--color-sky-100),0px_4px_0px_0px_var(--color-sky-800)] duration-250 hover:translate-y-[0.25em] active:translate-y-[0.5em] active:shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),1px_0px_2px_1px_#f9d1d1]"
            >
                <FileDown size={15}/>
                Import
            </label>
            <input type="file" id={'upload_'} className="hidden" accept=".xlsx" onChange={handleUpload} />

        </>
    );
}
