import { AppPagination } from "~/domain/pagination";
import { usePagination } from "~/hooks/use-pagination";
import type { BankSoalAppType } from "~/types/bank-soal/bank-soal-type";
import WrapperGridPaginationSelectingItemSoal from "./wrapper-grid-pagination";
import ContentGridItemProvider from "./content-grid-item-provider-soal";
import type { DisplayFormatItemSoal } from "~/domain/paket-soal/result/display-format-item-soal";

export default function PaginationSoalProvider({data, trigger}:{data:BankSoalAppType[], trigger:(v:DisplayFormatItemSoal)=>void}){
    const pagination = usePagination(data, {initialPageSize:5});
    return (
        <div className="p-2 flex flex-col justify-between h-full">
            {/* <TableKoleksiBankSoal data={pagination.items ?? []} startIndex={pagination.startIndex}/>
             */}
            <WrapperGridPaginationSelectingItemSoal>
                {
                    pagination.items.map((m, i)=><ContentGridItemProvider key={i} noDisplay={i+pagination.startIndex + 1} data={m} trigger={trigger}/>)
                }
            </WrapperGridPaginationSelectingItemSoal>
            {
                pagination && <AppPagination pagination={pagination} />
            }
        </div>
    )
}