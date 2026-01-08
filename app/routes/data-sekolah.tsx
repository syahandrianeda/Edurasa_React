import DataSekolahPage from "~/pages/data-sekolah";
import type { Route } from "./+types/data-sekolah";




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
    

    return {titleTambahan:'Tempat Tugas'};
}
export default function DataSekolah() {
    return(
        <div className="relative border-s border-s-gray-400 ps-1 w-full">
            <DataSekolahPage />
        </div>
    )
}