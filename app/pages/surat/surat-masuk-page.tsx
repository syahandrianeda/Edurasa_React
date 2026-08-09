import AppPagination from "~/components/pagination/app-pagination";
import { useAppSelector } from "~/context-reduct/hook";
import { DtoSuratMasukSelector } from "~/context-reduct/selectores/surat-masuk-selector";
import TabelSuratMasuk from "~/controllers/surat/tabel/tabel-surat-masuk";
import { usePagination } from "~/hooks/use-pagination";

export default function SuratMasukPage(){
    const sortir = useAppSelector(DtoSuratMasukSelector);
    const pagination =  usePagination(sortir.sort((a,b)=>b.tglsurat.getTime() - a.tglsurat.getTime()))
        
    return (
        <>
            <TabelSuratMasuk data={pagination.items ?? []} startIndex={pagination.startIndex  }/>
            {
                (sortir.length > 0 && pagination) && <AppPagination pagination={pagination} />
            }
        </>
    )
}