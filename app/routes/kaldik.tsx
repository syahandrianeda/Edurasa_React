import type { Route } from "./+types/kaldik";
import { Navigate } from "react-router";





export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Edurasa';
    
    return [
        {
            title: mainTitle + ' | Kalendar Pendidikan'
        },
        { 
            name: "description", 
            content: "Welcome to React Router!" 
        },
    ];
}

export default function KaldikRedirectToKeteranganKaldik() {

    return(

        <Navigate to="/kaldik/keterangan-kaldik" replace />
    )
}