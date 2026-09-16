import { Navigate, redirect, useNavigation,} from "react-router";
import type { Route } from "./+types/kesiswaan";
import { TopProgressBarFetch } from "~/components/ui_edura/top-progress-bar";
import { sheetAkun_dataSiswa } from "~/domain/enloaded/intial-enloaded/by-sheet/akun";

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
            content: "Edurasa versi baru" 
        },
    ];
}

export async function clientLoader({}:Route.ComponentProps){
    

    // return {
    //     titleTambahan:'Data Rombel', 
    //     pesanLoading:'Mempersiapkan data Siswa',
    //     sheetNeeded: [sheetAkun_dataSiswa],
        
    //     addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:false},
    //     mustLoadSheetNeedSiswaIfExist:true
        

    // };
    return redirect("/kesiswaan/rombelku")
}
export default function RedirectKesiswaan({loaderData}:Route.ComponentProps) {

    // const navigation = useNavigation();
    // const isLoading = navigation.state === "loading" || navigation.state === "submitting";
    
    // return(<>
    //     <TopProgressBarFetch active={isLoading} />
    //     <h1>Sambil nunggu kopi</h1>
    //     <Navigate to="/kesiswaan/rombelku" replace />
    // </>
    // )
    return null
}