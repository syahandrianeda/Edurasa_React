import { Navigate } from "react-router";
import type { Route } from "./+types/index-redirect";

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

export async function clientLoader({}:Route.ComponentProps){
     

    return {titleTambahan:'Kurikulum'};
}
export default function RedirectToCpPage({loaderData}:Route.ComponentProps) {
    
    return(
    
    <Navigate to="/kurikulum/cp" replace />
    )
}