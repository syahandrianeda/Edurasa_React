import AppPagination from "~/components/pagination/app-pagination";
import { useAppSelector } from "~/context-reduct/hook";
import { DataOrmSuratKeluarSelector } from "~/context-reduct/selectores/surat-keluar-selector";
import TableSuratKeluar from "~/controllers/surat/tabel/tabel-surat-keluar";
import { usePagination } from "~/hooks/use-pagination";


export default function SuketNisnPage(){
    const sortir = useAppSelector(DataOrmSuratKeluarSelector);
    const suketAktif = sortir.filter(s=>s.indekssurat === 'Surat Keterangan NISN');
    const pagination =  usePagination(suketAktif)
    
    return (
        <>
        
        <TableSuratKeluar data={pagination.items ?? []} startIndex={pagination.startIndex  }/>
        {
            (suketAktif.length > 0 && pagination) && <AppPagination pagination={pagination} />
        }
        </>
    )
}