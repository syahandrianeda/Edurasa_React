import type { ReactNode } from "react";
import { PrintArea } from "../../ui/sidebar";
import { KomponenKop, KomponenTtd, useToolbarKopTtd } from "./kop-ttd";


export default function PrintAreaWithKopTtd({children}:{children:ReactNode}){
    const {ttdType, kopType} = useToolbarKopTtd();
    return (
        <>
        {/* <PrintArea className="min-h-[calc(100vh-16rem)]  md:min-w-full md:max-w-3xl  min-w-full max-w-0"> */}
        <PrintArea className="min-h-[calc(100vh-16rem)] min-w-dvw md:min-full lg:min-w-full max-w-0">
        {/* <PrintArea className="min-h-[calc(100vh-16rem)] min-w-dvw md:min-w-md md:max-w-m3xl max-w-0"> */}
            {kopType && <KomponenKop {...kopType} />}
            {children}
            {ttdType && <KomponenTtd {...ttdType} />}
        </PrintArea>
        
        </>
    )
}