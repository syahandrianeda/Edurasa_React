import { useMemo } from "react";
import AppPagination from "~/components/pagination/app-pagination";
import { useAppSelector } from "~/context-reduct/hook";
import { DataOrmSuratKeluarSelector, DtoSuratKeluarSelector } from "~/context-reduct/selectores/surat-keluar-selector";
import TableSuratKeluar from "~/controllers/surat/tabel/tabel-surat-keluar";
import { usePagination } from "~/hooks/use-pagination";
import { getNumberFromString } from "~/lib/get-number";


export default function SuratKeluarPage(){
    // const sortir = useAppSelector(DtoSuratKeluarSelector);
    const sortir = useAppSelector(DataOrmSuratKeluarSelector);
    
    const pagination =  usePagination(sortir)
    const nextNoSurat = getNumberFromString(sortir[0]?.id_nosurat) + 1;
    console.log({sortir});
    return (
        <>
        {
            sortir.length > 0 && (<div className="border-2 print:hidden rounded-2xl p-2 text-center w-10/12 mx-auto mb-3 flex flex-col">
                    No Surat Terakhir: 
                    <strong>{sortir[0]?.id_nosurat}={sortir[0]?.perihal}</strong>
                    <p>No Surat berikutnya:</p>
                    <strong>{nextNoSurat}</strong>
            </div>)
        }
        <TableSuratKeluar data={pagination.items ?? []} startIndex={pagination.startIndex  }/>
        {
            (sortir.length > 0 && pagination) && <AppPagination pagination={pagination} />
        }
        </>
    )
}