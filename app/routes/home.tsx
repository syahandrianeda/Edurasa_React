import { useAppSelector } from "~/context-reduct/hook";
import type { Route } from "./+types/home";
import HomePage from "~/pages/home";


export function meta({matches}: Route.MetaArgs) {
  
  return [
    { title: "Edurasa" },
    { 
      name: "description", 
      content: "Welcome to React Router!" 
    },
  ];
}

export default function Home({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps){
    // console.log('loaderData',loaderData,
    //   '\nactionData:\n',actionData, 
    //   '\nparams:\n',params, 
    //   '\nmatch\n', matches
    // );
    
    
  return <HomePage />;
}
