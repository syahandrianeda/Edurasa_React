
import ProfileUser from "~/pages/profile/profile-user";
import type { Route } from "../+types/about";

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
        // toolbarTabs: ConfigToolbarSelectMapel,
        showExport:true
    };
}

export default function ProfileRoute() {
    
    return(
        <ProfileUser/>
    )
}