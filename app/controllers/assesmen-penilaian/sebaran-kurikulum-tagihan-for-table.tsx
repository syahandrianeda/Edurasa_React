import type { AtpAsOrm } from "~/types/kurikulum/prota-orm";
import SebaranTagihanKurikulumMain from "./sebaran-kurikulum-tagihan";

export default function SebaranTagihanKurikulum({kurikulum, isMultiple=false}:{kurikulum:AtpAsOrm[], isMultiple:boolean}){
    
    return (
        <div className="flex w-full flex-col">
            <SebaranTagihanKurikulumMain kurikulum={kurikulum} isMultiple={isMultiple}/>
            <div className="flex w-full justify-end border-b">
                Lihat detail di aksi
            </div>
        </div>
    )
}