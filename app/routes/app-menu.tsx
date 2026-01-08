
import AppMenuPage from "~/pages/app-menu";
import type { Route } from "./+types/app-menu";

import { useNavigation } from "react-router";
import { TopProgressBarFetch } from "~/components/ui_edura/top-progress-bar";


export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Edurasa';
    
    return [
        {
            title: mainTitle + ' | Menu'
        },
        { 
            name: "description", 
            content: "Welcome to React Router!" 
        },
    ];
}
export async function clientLoader({}:Route.ComponentProps){
    

    return {titleTambahan:'Riwayat Tempat Tugas'};
}
export default function AppMenu({
    loaderData,
    actionData,
    params,
    matches,
}: Route.ComponentProps){
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading" || navigation.state === "submitting";
    
    

    return (
        <>
            <AppMenuPage />
        </>
);
}
