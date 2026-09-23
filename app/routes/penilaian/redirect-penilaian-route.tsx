import {  redirect } from "react-router";
import type { Route } from "./+types/redirect-penilaian-route";

export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Site';
    
    return [
        {
            title: mainTitle + ' | Penilaian'
        },
        { 
            name: "description", 
            content: "Edurasa new version" 
        },
    ];
}

export async function clientLoader({}: Route.ClientLoaderArgs) {
    return redirect("/penilaian/list-penilaian");
}

export default function RedirectPenilaianRoute({loaderData}:Route.ComponentProps) {
    return null
}