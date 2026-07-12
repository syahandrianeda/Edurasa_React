import LoginPage from "~/pages/login";
import type { Route } from "../+types/root";
import { redirect } from "react-router";
import AuthServiceImplements from "~/infrastructures/services/auth-service-implements";
import { setCredentials } from "~/context-reduct/global-state/auth-slice";
import DTOUser from "~/dtos/dto-user";
import { store } from "~/context-reduct/redux-provider";
import { setFokusRombel } from "~/context-reduct/global-state/fokus-rombel-slice";
import { saveSessionRombel } from "~/infrastructures/session-storage/rombel-session";

export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Edurasa';
    
    return [
        {
            title: mainTitle + ' | Login'
        },
        { 
            name: "description", 
            content: "Welcome to React Router!" 
        },
    ];
}

export async function clientAction({ request }: Route.ClientActionArgs) { 
    const formData = await request.formData(); 
    const username = formData.get("username") as string; 
    const password = formData.get("password") as string; 
    
    const usecase = new AuthServiceImplements();
    const d = await usecase.login(username, password);
    
    if(d.success){
        const userAuth = DTOUser.fromResponAkun(d.data);

        saveSessionRombel(userAuth.kelas_ampu[0]);
        
        store.dispatch(
            setCredentials({
                user: userAuth,
                name:'auth',
                loaded:true
            })
        );
        
        store.dispatch(
            setFokusRombel({
                value: userAuth.kelas_ampu[0],
                name:'fokusRombel',
                loaded:true
            })
        );
        
        throw redirect('/menu');
    }
    return d; 
}


export default function LoginRoute({actionData}: Route.ComponentProps) {
    
    return <LoginPage dataAction={actionData}/>
}