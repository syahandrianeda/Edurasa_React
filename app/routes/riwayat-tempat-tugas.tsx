import RiwayatTempatTugasPage from "~/pages/riwayat-tempat-tugas";
import type { Route } from "./+types/riwayat-tempat-tugas";

export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Site';
    
    return [
        {
            title: mainTitle + ' | Sekolah'
        },
        { 
            name: "description", 
            content: "Welcome to React Router!" 
        },
    ];
}
export function clientLoader({}:Route.ComponentProps){
    

    return {titleTambahan:'Riwayat Tempat Tugas'};
}
export default function RiwayatTempatTugasRoute() {
    
    return(
        <div className="relative border-s border-s-gray-400 ps-1 w-full">
            <RiwayatTempatTugasPage />
        </div>
    )
}