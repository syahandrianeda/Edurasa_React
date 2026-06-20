import { Circle } from "lucide-react";
import type { state_modify } from "~/types/kurikulum/prota-orm";

export default function StatusModifikasi({status}:{status:state_modify}){
    switch (status) {
        case 'servered':
            return (
                <span className="flex text-[8px] flex-col justify-around items-center text-green-500 font-extrabold">
                    <Circle size={12} /> Tersimpan
                </span>
            );
        case 'not_servered':
            return(
                <span className="flex text-[8px] flex-col justify-around items-center text-rose-500 font-extrabold">
                    <Circle size={12} /> Belum Tersimpan
                </span>
            );
        case 'modify':
            return (
                <span className="flex text-[8px] flex-col justify-around items-center text-blue-500 font-extrabold">
                    <Circle size={12}/> Dimodifikasi
                </span>
            )
        default:
            return (
                <span className="flex text-xs justify-around item-center">
                    <Circle size={8}/>
                </span>
            )
    }

}