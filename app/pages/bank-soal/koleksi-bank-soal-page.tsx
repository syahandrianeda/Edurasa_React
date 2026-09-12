import BankSoalFilter from "~/controllers/koleksi-bank-soal/filter-control-bank-soal";
import TableKoleksiBankSoal from "~/controllers/koleksi-bank-soal/tabel-koleksi-bank-soal";
import { AppPagination, usePagination } from "~/domain/pagination";
import { useFilter } from "~/hooks/use-filter-options";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";

export default function KoleksiBankSoalPage({dataSoal}:{dataSoal:BankSoalAppType[]}){
    const filterState = useFilter<
    BankSoalAppType,
    'bentuk_soal' | 'kode_mapel'
        >(dataSoal);
        
    const {
        filters,
        filteredData,
        setFilter,
        resetFilter
    } = filterState;
    const pagination =  usePagination(filteredData)
    
    return (
        <>
        <BankSoalFilter setFilter={setFilter} filters={filters} />
        <TableKoleksiBankSoal data={(pagination.items as BankSoalAppType[]) ?? []} startIndex={pagination.startIndex}/>
        {
            pagination && <AppPagination pagination={pagination} />
        }
       
        </>
    )
}