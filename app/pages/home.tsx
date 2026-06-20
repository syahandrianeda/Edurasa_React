import { useState } from "react";
import axios from "~/infrastructures/http/axios";
import { getSessionApp } from "~/infrastructures/session-storage/app-session";
import type { UserPtk } from "~/types";

export default function HomePage(){
    const [result, setResult] = useState<any>();
    const sesi = getSessionApp<UserPtk>();
    console.log(sesi);
    
    async function test(){
        const appSession = getSessionApp();
        console.log('klik',appSession);
        setResult('klik');
        const id="AKfycbwUNlpSi4-swQccENCL8PZ7lhRvAiTMJmSmwX50VJXXWS8Gur-VZj0Q0id23p26xHHt";
        
        const appCrudUrl = 'https://script.google.com/macros/s/AKfycbwUNlpSi4-swQccENCL8PZ7lhRvAiTMJmSmwX50VJXXWS8Gur-VZj0Q0id23p26xHHt/exec'
        const param = {
            action:'read',
            auth:JSON.stringify({
                token: 27,
                sheet_id:'1xQUBegolorHnpiHp5iWz-56WE8iUfWburWzHyHNbLBw',
                tab:'trial_user'
            }),
            idss:'1xQUBegolorHnpiHp5iWz-56WE8iUfWburWzHyHNbLBw',
            tab:'trial_user',
            filter: JSON.stringify({'id':5})
        };
        const paramSheet =[
            //sheet akun
            {
            idss:'1xQUBegolorHnpiHp5iWz-56WE8iUfWburWzHyHNbLBw',
            tab:'berkasppdb'
            },
            {
            idss:'1xQUBegolorHnpiHp5iWz-56WE8iUfWburWzHyHNbLBw',
            tab:'titimangsa_rapor',
            //disediakan parameter extra
            filter:JSON.stringify({idbaris:5})
            },
            // sheet kaldik
            {
            idss:'1d0JHONeMIb3pfPv_rR0LclW0YH4YGwPpURC3Ow-8LwY',
            tab:'googlemeet'
            },
            {
            idss:'1d0JHONeMIb3pfPv_rR0LclW0YH4YGwPpURC3Ow-8LwY',
            tab:'HEB'
            }

        ]
        const param2 ={
            
                action:'readMultipleTab',
                source:JSON.stringify(paramSheet),
                auth:JSON.stringify({
                    token: sesi?.id ,
                    sheet_id:'1xQUBegolorHnpiHp5iWz-56WE8iUfWburWzHyHNbLBw',
                    tab:'trial_user'
                })
            
        }
            // const pos = await axios.post(appCrudUrl,param, {
            const pos = await axios.post(appCrudUrl,param2, {
        
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded' 
                            }
                        }
                );
        
        console.log(pos.data);
        // setResult(pos.data.data);
    }
    return (
        <>
            <div className="bg-amber-200">Konten test Page</div>
            <div className="h-svh w-5/6 mx-auto border">
                <button onClick={test} className="border bg-sky-300 rounded-2xl px-2 py-1 text-center">Klik Saya</button>
                <div className="p-1 border-dotted">Result:
                    <pre>{result}</pre>
                </div>
            </div>
            <div className="h-svh">page 2</div>
            <div className="h-svh">page 3</div>
        </>
    )
}