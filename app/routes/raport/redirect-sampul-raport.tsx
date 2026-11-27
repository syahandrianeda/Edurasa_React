import {  redirect } from "react-router";
import type { Route } from "./+types/redirect-sampul-raport";


export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Site';
    
    return [
        {
            title: mainTitle + ' | Sampul Raport'
        },
        { 
            name: "description", 
            content: "Edurasa new version" 
        },
    ];
}

export async function clientLoader({}: Route.ClientLoaderArgs) {
    return redirect("/raport/sampul-raport");
}

export default function RedirectSampulRaportRoute({loaderData}:Route.ComponentProps) {
    return null
}