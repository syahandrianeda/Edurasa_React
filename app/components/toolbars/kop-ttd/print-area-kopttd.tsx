import type { ReactNode } from "react";
import { PrintArea } from "../../ui/sidebar";
import { KomponenKop, KomponenTtd, useToolbarKopTtd } from "./kop-ttd";


export default function PrintAreaWithKopTtd({children}:{children:ReactNode}){
    const {ttdType, kopType} = useToolbarKopTtd();
    return (
        <PrintArea className="min-h-[calc(100vh-16rem)]">
            {kopType && <KomponenKop {...kopType} />}
            {children}
            {ttdType && <KomponenTtd {...ttdType} />}
        </PrintArea>
    )
}