import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/surat-masuk-harian";
import { sheetSurat_sppd, sheetSurat_suratKeluar, sheetSurat_suratMasuk } from "~/domain/enloaded/intial-enloaded/by-sheet/surat";
import { sheetTendik_pangkatGolongan, sheetTendik_riwayatIdAkun } from "~/domain/enloaded/intial-enloaded/by-sheet/tendik";
import FormulirSuratKeluarPage from "~/pages/surat/formulir-surat-keluar-page";
import { sheetMasterInduk_riwayatRombel } from "~/domain/enloaded/intial-enloaded/by-sheet/master-induk";
import { useAppSelector } from "~/context-reduct/hook";
import { DataOrmSuratKeluarSelector } from "~/context-reduct/selectores/surat-keluar-selector";
import { getNumberFromString } from "~/lib/get-number";
import { useMemo } from "react";





export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Site';
    
    return [
        {
            title: mainTitle + ' | Surat'
        },
        { 
            name: "description", 
            content: "Welcome to React Router!" 
        },
    ];
}
export function clientLoader({}:Route.ComponentProps){
    
    const settingRombel: controlDropdownKelas ={
            showControlKelas:false,
            title: 'Rombel',
            description:'Rombel yang Anda Ampu',
            typeKelas:'jenjang'
        }
        
    return {
        titleTambahan:'Surat Keluar',
        controlKelas: settingRombel,
        toolbarTabs: undefined,//ConfigToolbarSelectMapel
        showExport:false,
        sheetNeeded: [
                        
                sheetSurat_suratKeluar,
                // sheetSurat_suratMasuk,
                // sheetSurat_sppd, 
                // sheetTendik_riwayatIdAkun,
                // sheetTendik_pangkatGolongan,
                sheetMasterInduk_riwayatRombel
                
        ]
                // pesanLoading:'Mempersiapkan ATP',
                // addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:true},
                // sheetNeeded: defineCreateItemSoalNeeded
        
    };
}



export default function SuratKeluarHarianRoute() {
    const sortir = useAppSelector(DataOrmSuratKeluarSelector);
        
    // const pagination =  usePagination(sortir)
    const nextNoSurat = useMemo(()=>getNumberFromString(sortir[0]?.id_nosurat) + 1,[sortir]);    
    return(
        <div className="p-1">
            {
            sortir.length > 0 && (<div className="border-2 print:hidden rounded-2xl p-2 text-center w-10/12 mx-auto mb-3 flex flex-col">
                    No Surat Terakhir: 
                    <strong>{sortir[0]?.id_nosurat}={sortir[0]?.perihal}</strong>
                    <p>No Surat berikutnya:</p>
                    <strong>{nextNoSurat}</strong>
            </div>)
        }
            <FormulirSuratKeluarPage nextNoSurat={nextNoSurat}/>
        </div>
    )
}