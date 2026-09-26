
import type { Route } from "./+types/app-menu";
import IconMenu from "~/components/ui_edura/icon-menu";
import { useAppSelector } from "~/context-reduct/hook";
import PermissionMenu from "~/lib/permission-menu";
import { DataMenu } from "~/configs/menu";
import AppMenuPage from "~/pages/app-menu";




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
            content: "Edurasa New Version" 
        },
    ];
}
export async function clientLoader({}:Route.ComponentProps){
    

    return {titleTambahan:'Menu'};
}
export default function AppMenu({
    loaderData,
    actionData,
    params,
    matches,
}: Route.ComponentProps){
//     const user = useAppSelector(state=> state.auth.user);
//     const MenuPermission = PermissionMenu(user?.permission ??[], DataMenu)
        
//     return (
//                 <div className="flex flex-col items-baseline backdrop-blur-lg shadow-lg inset-14 ring-0 border-0 outline-0 py-4 justify-center max-w-5xl md:min-w-6xl my-0 md:my-2 mx-auto md:h-[calc(100vh-5rem)] rounded-4xl overflow-y-scroll scrol-h-custom">
                   
//                     <IconMenu menus={MenuPermission} />
//                 </div>
//  )
    return (
        <>
            <AppMenuPage />
            
        </>
);
}
