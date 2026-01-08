import AbsensiSiswaPage from "~/pages/absensi-siswa";
import type { Route } from "./+types/absensi-siswa";





export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Edurasa';
    
    return [
        {
            title: mainTitle + ' | Absensi Siswa'
        },
        { 
            name: "description", 
            content: "Welcome to React Router!" 
        },
    ];
}
export function clientLoader({}:Route.ComponentProps){
    

    return {titleTambahan:'Hari ini'};
}
export default function AbsensiSiswa() {
    return(
        <AbsensiSiswaPage/>
    )
}