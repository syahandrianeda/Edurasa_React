import type { ReactNode } from "react";

export default function WrapperGridPaginationSelectingItemSoal({children}:{children:ReactNode}){
    return (
        <div className="grid grid-cols-2 min-h-11/12 p-2 gap-2 bg-sky-600 scrol-h-custom overflow-y-auto border-2">
            {children}
        </div>
    )
}