import bgOffline from "../images/bg_offline.webp"
import logoSekolah from "../images/ratujaya1.png"
import edurasa from "../images/lamaso.webp"
import kotaDepok from "../images/kotadepok.webp"
import { Form, useNavigation } from "react-router";
import { TopProgressBarFetch } from "~/components/ui_edura/top-progress-bar";
import type { ApiError } from "~/configs/appscript-config";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export default function LoginPage(
    {
        dataAction
    }:{
        dataAction?:{  error?: string | ApiError, success?: boolean }
    } ){
    const rawError = dataAction?.error;
    const error = typeof rawError === "string" ? rawError : rawError?.message ?? "";
    const navigation = useNavigation();
    const [show, setShow] = useState(false);

    const isLoading =
        navigation.state === "submitting" ||
        navigation.state === "loading";

    
    return(
        <>
            
            <TopProgressBarFetch active={isLoading}/>
            <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col items-center justify-center bg-muted p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-linear-to-tr from-sky-500/60 to-80%" />
                    <div className="z-20 flex justify-center gap-3 mb-2">
                        <img src={logoSekolah} alt="Logo Sekolah" className="mb-0 h-16 w-16 rounded-xl bg-white p-2 shadow-lg"/>  
                        <img src={edurasa} alt="Logo Sekolah" className="mb-0 h-16 w-16 rounded-xl bg-white p-2 shadow-lg"/>  
                        <img src={kotaDepok} alt="Logo Sekolah" className="mb-0 h-16 w-16 rounded-xl bg-white p-2 shadow-lg"/>  
                    </div>
                    <img src={bgOffline} alt="Background" />
                    <span className="relative mt-4 text-lg font-medium">
                        SDN Ratujaya 1
                    </span>
                </div>
                <div className="w-full lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-87.5">
                        <h1>Login untuk PTK</h1>
                        <Form
                            className="flex flex-col gap-6"
                            
                            method="post"
                            >
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <label htmlFor="username">Email</label>
                                    <input 
                                    type="text" name="username" id="username" required className="w-full rounded-md border border-input bg-background px-3 py-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"/>
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="password">Password</label>
                                    <div className="relative">
                                        <input type={`${show?'text':'password'}`} name="password" id="password" required className="w-full rounded-md border border-input bg-background px-3 py-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"/>
                                        <button type="button" className="top-0 translate-y-1/2 right-1 absolute" onClick={()=>setShow(!show)}>{
                                            show ? <Eye/> : <EyeClosed/>
                                        
                                            }</button>

                                    </div>
                                </div>
                                <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white"> Login</button>
                            </div>

                        {error && <p>{error}</p>}
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}