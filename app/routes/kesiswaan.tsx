import { Navigate, useNavigation,} from "react-router";
import type { Route } from "./+types/kesiswaan";
import { TopProgressBarFetch } from "~/components/ui_edura/top-progress-bar";

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
    

    return {titleTambahan:'Data Rombel', data:[]};
}
export default function RedirectKesiswaan({loaderData}:Route.ComponentProps) {

    const navigation = useNavigation();
    const isLoading = navigation.state === "loading" || navigation.state === "submitting";
    
    return(<>
        <TopProgressBarFetch active={isLoading} />
        <h1>Sambil nunggu kopi</h1>
        <Navigate to="/kesiswaan/rombelku" replace />
    </>
    )
}