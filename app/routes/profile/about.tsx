import { useAppStore } from "~/context-reduct/hook";
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

export function clientLoader({}:Route.ComponentProps){
    

    return {
        titleTambahan:'Profile',
        // controlKelas: settingRombel,
        toolbarTabs: undefined,//ConfigToolbarSelectMapel
        showExport:false
    };
}
export function clientAction({ request }: Route.ClientActionArgs){
    const store = useAppStore()
    console.log('store', store)
}
export default function ProfileRoute() {
    
    return(
        <p>Hello Profile</p>
    )
}