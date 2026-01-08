
import { useState } from "react";
import ToolbarSettingSekolah from "~/components/toolbars/setting-sekolah";
// import MainToolbar from "~/components/toolbars/main-toolbar";
import { TopProgressBarFetch } from "~/components/ui_edura/top-progress-bar";
import { AppScriptConfig } from "~/configs/appscript-config";


export default function DataSekolahPage() {
    const [active, setActive] = useState<boolean>(false)
    async function onTestClick() {
        const AppScript =  new AppScriptConfig();
         let p = {
            'idss':AppScript.currentMacro['ss_user'],
            'action':'dataguruall',
        }
        const parameter = AppScript.appExexUser+'?' + new URLSearchParams(p).toString();
        console.log('Parameter URL:', parameter);
        const response = await fetch(parameter);
        console.log('Response from AppScript:', response);
        const data = await response.json();
        console.log('Data from AppScript:', data);
        
        console.log('AppScript instance:', AppScript);
    };
    async function onTestClick2() {
        const AppScript =  new AppScriptConfig();
        let p = {
            'idss':AppScript.currentMacro['ss_kalender'],
            'action':'read',
            'tab':'kalender',
        }
        const parameter = AppScript.appCrudUrl ;
        
        setActive(true);
        const response = await fetch(parameter, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(p),
        });
        console.log('Response from AppScript:', response);
        const data = await response.json();
        console.log('Data from AppScript:', data);
        
        console.log('AppScript instance:', AppScript);
        setActive(false);
    }
    return(
        <>
            <TopProgressBarFetch active={active}/>
            <ToolbarSettingSekolah/>
            {/* <MainToolbar >
                Toolbar Sekolah
                <button onClick={onTestClick} className="ml-4 px-3 py-1 bg-sky-500 text-white rounded-md">Test Click</button>   
                <button onClick={onTestClick2} className="ml-4 px-3 py-1 bg-sky-500 text-white rounded-md">Test Post</button>   
                <p className="h-14">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse, neque?</p>
                <p className="h-14">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse, neque?</p>
                <p className="h-14">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse, neque?</p>
                <p className="h-14">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse, neque?</p>
                <p className="h-14">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse, neque?</p>
            </MainToolbar> */}
                <div className="bg-white h-svh">Data Sekolah page</div>
                <p className="h-screen">tes scroll</p>
                <p className="h-screen">tes scroll</p>
                <p className="h-screen">tes scroll</p>
                <p className="h-screen">tes scroll</p>
        </>
    )
}