import { Navigate, useNavigation } from "react-router";

import { TopProgressBarFetch } from "~/components/ui_edura/top-progress-bar";
import type { Route } from "./+types/index-redirect-bank-soal";
import { defineCreateItemSoalNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/banksoal/create-item-soal-needed";

export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Site';
    
    return [
        {
            title: mainTitle + ' | Bank Soal'
        },
        { 
            name: "description", 
            content: "Welcome to React Router!" 
        },
    ];
}

export async function clientLoader({}:Route.ComponentProps){
    

    return {
        titleTambahan:'Data Rombel', 
        sheetNeeded: defineCreateItemSoalNeeded,
        addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
    };
}
export default function RedirectKesiswaan({loaderData}:Route.ComponentProps) {

    const navigation = useNavigation();
    const isLoading = navigation.state === "loading" || navigation.state === "submitting";
    
    return(<>
        <TopProgressBarFetch active={isLoading} />
        <h1>Sambil nunggu kopi</h1>
        <Navigate to="/bank-soal/create-item-soal" replace />
    </>
    )
}