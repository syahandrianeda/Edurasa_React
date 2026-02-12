import AboutPage from "~/pages/about";
import type { Route } from "./+types/home";


export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Site';
    
    return [
        {
            title: mainTitle + ' | About'
        },
        { 
            name: "description", 
            content: "Welcome to React Router!" 
        },
    ];
}

export default function About({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps){
    
    return <AboutPage />;
}
