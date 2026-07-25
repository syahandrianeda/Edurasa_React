import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { Route } from "./+types/rekap-tabungan-siswa-route";
import { ConfigToolbarRekapTabungan } from "~/controllers/tabungan/toolbar/configtoolbarRekapTabungan";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import type { BulanType, JenisRekapType } from "~/controllers/tabungan/toolbar/jenis-rekap-keuangan";
import RekapTabunganPage from "~/pages/tabungan/rekap-tabungan-page";
import { useAppSelector } from "~/context-reduct/hook";
import { FokusRombelKeuangan } from "~/context-reduct/selectores/rombel-tabungan-selector";
import type { SiswaType } from "~/types/siswa";
import { defineTabunganRombelNeeded } from "~/domain/enloaded/intial-enloaded/by-route-page/tabungan/input-tabungan-needed";


export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Edurasa';
    
    return [
        {
            title: mainTitle + ' | Keuangan'
        },
        { 
            name: "description", 
            content: "Welcome to React Router!" 
        },
    ];
}


export function clientLoader({}:Route.ComponentProps){
    const settingRombel: controlDropdownKelas ={
            showControlKelas:true,
            title: 'Rombel',
            description:'Rombel yang Anda Ampu',
            typeKelas:'rombel',
            sourceKelas:'keuangan'
        }
   
    return {
        titleTambahan:'Rekap Buku Tabungan',
        controlKelas: settingRombel,
        toolbarTabs: ConfigToolbarRekapTabungan,
        pesanLoading:'Memanggil Data Tabungan',
        addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:false},
        sheetNeeded: defineTabunganRombelNeeded,//[sheetAkun_dataSiswa],
        mustLoadSheetNeedSiswaIfExist:true
    };
}

export default function RekapTabunganSiswaRoute({loaderData}:Route.ComponentProps){
    const RombelTabungan = useAppSelector(FokusRombelKeuangan)
    const {value} = useFilterContext<{
            jenisRekap?:JenisRekapType,
            jenisKelompokData?:JenisRekapType,
            fokusBulan?:BulanType,
            fokusSiswa?:SiswaType
        }>();
    
    return (
        <div className="p-1">
            <h3 className="font-bold uppercase text-center text-2xl">Rekaputilasi Tabungan {value?.extra?.jenisRekap?.label}</h3>
            <h4 className="font-bold text-center text-xl mb-7">
                {
                    value?.extra?.jenisKelompokData?.value === 'perKelas'? (
                        `Kelas ${RombelTabungan?.rombel || ''}`
                    ):(
                        `${value?.extra?.fokusSiswa?.pd_nama || '~Belum Memilih Nama~'} ${value?.extra?.fokusSiswa?.nama_rombel || ''}`
                    )
                }
            </h4>
            <h4 className="font-bold text-center text-lg">
                {
                    value?.extra?.jenisRekap?.value === 'bulanan'&& ( `Bulan ${value?.extra?.fokusBulan?.label || ''}` )
                }
            </h4>
            <RekapTabunganPage/>
        </div>
    )
}