import { useAppDispatch, useAppSelector } from "~/context-reduct/hook";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { setFokusRombel } from "~/context-reduct/global-state/fokus-rombel-slice";
import { DataRombelUI, filterRombelByKelasAmpu, uniqueRombelByJenjang } from "~/domain/rombel/data-rombel";
import { getNumberFromString } from "~/lib/get-number";
import { saveSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { setFokusAksesRombelKeuangan } from "~/context-reduct/global-state/tabungan/ui-akses-keuangan-slice";
import { DataDtoKategoriKeuangan, KategoriKeuanganCurrentAkun } from "~/context-reduct/selectores/kategori-keuangan-selector";
import { FokusRombelKeuangan } from "~/context-reduct/selectores/rombel-tabungan-selector";

export type typeKelasDropdown = 'rombel'|'jenjang'
export interface controlDropdownKelas{
    showControlKelas?: boolean,
    title?: string,
    description?: string,
    sourceKelas?:string,//||'keuangan'|'kelas_ampu'
    typeKelas?: typeKelasDropdown//'rombel'|'jenjang'
}


export default function RombelDropdown(
    {   showControlKelas=false,
        title="Rombel",
        description="Kelas yang Diampu",
        sourceKelas = "kelas_ampu",
        typeKelas="rombel"
    }: controlDropdownKelas) {
    
    

    // // const user = useAppSelector(state=> state.auth.user);
    // const fokusRombel = useAppSelector(state => state.fokusRombel.value);
    // // const dispatch = useAppDispatch();
    // // // ada mode dataKelas di sini, rombel atau jenjang
    // // const dataKelas =  typeKelas === 'rombel'? filterRombelByKelasAmpu(DataRombelUI, user?.kelas_ampu??[]): uniqueRombelByJenjang(filterRombelByKelasAmpu(DataRombelUI, user?.kelas_ampu??[]));
    // const fokusRombelByTypeKelas = typeKelas ==='rombel'?fokusRombel: fokusRombel && getNumberFromString(fokusRombel);
    
    if(!showControlKelas) return null;
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="group relative cursor-pointer h-8 w-8 right-1 mx-auto hover:w-28! transition-all duration-[0.75s] outline-hidden border-none rounded-full flex flex-row items-center justify-center shadow-sm shadow-sky-600 dark:shadow-sky-300 data-[state=open]:w-28!"> 
                <SpanFocusRombel typeKelas={typeKelas} sourceKelas={sourceKelas}/>
                <DropdownMenuLabel className="p-0 text-small absolute truncate left-2  text-[12px] font-semibold [--w:calc(100%-48px)] w-[--w] max-w-[--w] overflow-hidden flex items-center justify-end -z-1 group-hover:z-9 pointer-events-none select-none opacity-0 group-hover:opacity-100 group-data-[state=open]:opacity-100 group-hover:text-inherit transition-all duration-1000 group-hover:duration-100 group-active:scale-[0.85]"  >
                    {title}
                </DropdownMenuLabel>

            </DropdownMenuTrigger>
            <DropdownMenuContent align="end"
                side='top'
                className="bg-white dark:bg-sky-900 outline-1 outline-amber-200 rounded-xl cursor-pointer bg-linear-to-br from-sky-200 to-[#F7EEDD] dark:bg-linear-to-b dark:from-sky-800 shadow-sm dark:to-sky-700 hover:bg-zinc-600 hover:text-blue-600  dark:hover:text-blue-200 transition-colors duration-300 p-2 shadow-[#41C9E2] scrol-h-custom"
            >
                <DropdownMenuLabel className="p-0 text-small">
                    {description}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* Disini Dropdown Menu Kelas Ampu */}
                <DataKelasAmpu typeKelas={typeKelas} sourceKelas={sourceKelas}/>
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function DataKelasAmpu({typeKelas,sourceKelas}:{typeKelas:typeKelasDropdown, sourceKelas:string}){
    const user = useAppSelector(state=> state.auth.user);
    const dispatch = useAppDispatch();
    
    const dataKelas =  typeKelas === 'rombel'? filterRombelByKelasAmpu(DataRombelUI, user?.kelas_ampu??[]): uniqueRombelByJenjang(filterRombelByKelasAmpu(DataRombelUI, user?.kelas_ampu??[]));
    const stateKelasTabungan  = useAppSelector(KategoriKeuanganCurrentAkun)
    console.log({stateKelasTabungan})
    const findKelasTabungan  = stateKelasTabungan.find(s=>s.kategori === 'tabungan');
    const kelasTabungan  = findKelasTabungan?.akses_kelas ?? [];
    const kategori = findKelasTabungan?.kategori ?? 'tabungan'
    const dataKelasKeuangan = filterRombelByKelasAmpu(DataRombelUI, kelasTabungan ?? [])
    return (
        <DropdownMenuGroup>
                    {
                        sourceKelas === 'kelas_ampu' ? (
                            dataKelas && dataKelas.length ? 
                            (
                                dataKelas.map((rombel,index)=>(
                                    <DropdownMenuItem key={index} className="py-1 px-0">
                                        {
                                            typeKelas==='rombel'?(
                                                    <button onClick={()=>{
                                                                dispatch(setFokusRombel({
                                                                    value:rombel.rombelName,
                                                                    name:'fokusRombel',
                                                                    loaded:true
                                                                }));
                                                                // localStorage.setItem('rombel',rombel.rombelName)
                                                                saveSessionRombel(rombel.rombelName);
                                                            }} 
                                                            className="w-full bg-sky-300/50"
                                                        >
                                                            {rombel.rombelName}
                                                    </button>
                                            ):(
                                                <button onClick={()=>{
                                                                dispatch(setFokusRombel({
                                                                    value:rombel.rombelName,
                                                                    name:'fokusRombel',
                                                                    loaded:true
                                                                }));
                                                                // localStorage.setItem('rombel',rombel.rombelName)
                                                                saveSessionRombel(rombel.rombelName);
                                                            }} 
                                                            className="w-full bg-sky-300/50">
                                                        {rombel.jenjang}
                                                </button>
                                            )
                                        }
                                    </DropdownMenuItem>
                                ))
                            ):
                            (
                                <DropdownMenuItem>
                                    Tidak ada rombel
                                </DropdownMenuItem>
                            )

                        ):(
                            dataKelasKeuangan && dataKelasKeuangan.length ? 
                            (
                                dataKelasKeuangan.map((rombel,index)=>(
                                    <DropdownMenuItem key={index} className="py-1 px-0">
                                        <button onClick={()=>{
                                                dispatch(setFokusAksesRombelKeuangan({
                                                    value:{
                                                        rombel:rombel.rombelName,
                                                        kategori:kategori
                                                    },
                                                    name:'fokusRombelKategoriKeuangan',
                                                    loaded:true
                                                }));
                                                // localStorage.setItem('rombel',rombel.rombelName)
                                                // saveSessionRombel(rombel.rombelName);
                                            }} 
                                            className="w-full bg-sky-300/50"
                                        >
                                            {rombel.rombelName}
                                    </button>
                                    </DropdownMenuItem>
                                ))
                            ):
                            (
                                <DropdownMenuItem>
                                    Tidak ada Akses
                                </DropdownMenuItem>
                            )
                        )
                    }
                </DropdownMenuGroup>
    )

}

function SpanFocusRombel({typeKelas,sourceKelas}:{typeKelas:typeKelasDropdown, sourceKelas:string}){
    const fokusRombel = useAppSelector(state => state.fokusRombel.value);
    const fokusRombelTabungan = useAppSelector(FokusRombelKeuangan)?.rombel ?? '-'
    const fokusRombelByTypeKelas = typeKelas ==='rombel'?fokusRombel: fokusRombel && getNumberFromString(fokusRombel);
    
    return (
            <span className="border flex justify-center items-center overflow-visible size-9 absolute right-0 rounded-xl cursor-pointer bg-radial from-sky-400 to-sky-100 dark:bg-radial dark:from-sky-800 dark:to-sky-600 dark:bg-linear-to-b shadow-sm dark:shadow-xs hover:bg-zinc-600 hover:text-blue-600 dark:hover:text-blue-100 transition-colors duration-300 p-2 shadow-[#1253b4] dark:shadow-sky-500">
                {
                    sourceKelas === 'kelas_ampu' ? fokusRombelByTypeKelas : fokusRombelTabungan
                }
            </span>)
}