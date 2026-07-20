import { useAppSelector } from "~/context-reduct/hook";
import { selectAllSiswa, selectAllSiswaDTO, type validationType } from "~/context-reduct/selectores/data-siswa-aktif";
import { sheetAkun_dataSiswa } from "~/domain/enloaded/intial-enloaded/by-sheet/akun";
import { GroupNisInduk } from "~/context-reduct/selectores/induk-nis-selector";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import type { Route } from "./+types/rekap-induk";
import { ConfigToolbarRekapInduk } from "~/controllers/buku-induk-controller/toolbar/configtoolbar-rekap-induk";
import type { PrefixNis } from "~/domain/buku_induk/value-objects/PrefixNis";
import type { GroupIndukType } from "~/domain/buku_induk/entities/GroupIndukType";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { useCallback, useEffect, useMemo } from "react";
import { useModal } from "~/components/modals/modal-provider";
import type { SiswaType } from "~/types/siswa";
import { ActionButtonTable, type TriggerTable } from "~/components/dropdowns/dropdown-action-table";
import { Info, PencilIcon } from "lucide-react";
import { ValidationPreRequesiteRiwayatRaport } from "~/domain/buku_induk/infrastructure/riwayat-raport/validation-riwayat-raport";

export function meta({matches}: Route.MetaArgs) {
    const rootMeta = matches.find(m => m?.id === 'root')?.meta;
    const titleDescriptor = rootMeta?.find((d): d is { title: string } => {
        return typeof (d as any).title === 'string';
    });
    const mainTitle = titleDescriptor?.title ?? 'Edurasa';
    
    return [
        {
            title: mainTitle + ' | Buku Induk'
        },
        { 
            name: "description", 
            content: "Welcome to React Router!" 
        },
    ];
}


export function clientLoader({}:Route.ComponentProps){
    

    return {
        titleTambahan:'Rekap Induk',
        // controlKelas: settingRombel,
        toolbarTabs: ConfigToolbarRekapInduk,
        pesanLoading:'Memanggil ringkasan Buku Induk',
        // addPesanRombel:{isAdd:true, type:'rombel', includeFaseName:false},
        sheetNeeded: [sheetAkun_dataSiswa],
        mustLoadSheetNeedSiswaIfExist:true
    };
}

export default function RekapIndukRoute({loaderData}:Route.ComponentProps){
    const data = useAppSelector(GroupNisInduk)
    const {value} = useFilterContext<{ fokusGroupNis?: PrefixNis; dataGruopNis?:GroupIndukType }>();
    const colorClassValidation = useCallback((validation:validationType):string=>{
        let className = ''
        
            if(validation.errors?.nis == 'NIS Tidak Terlacak'){
                className = 'odd:bg-amber-400 even:bg-amber-400'
            }
            if(validation.errors?.nis === "NIS harus berupa angka sebanyak 9 digit."){
                className = 'odd:bg-rose-400 even:bg-rose-400'
            }
            
            if(validation?.duplicate.nis?.value){
                className = 'odd:bg-rose-400 even:bg-rose-400'
            }
            
        
        return className
    },[value?.extra?.dataGruopNis])
    const {actions} = useModal<SiswaType>()
    
    const ActionTrigger: TriggerTable<SiswaType>[] = [
        {
            label: 'Edit',
            icon: PencilIcon,
            callback: (m) => actions.open('EDIT', m,{closeOnOutsideClick:false})
        },
        {
            label: 'Info',
            icon: Info,
            callback: (m) => actions.open('INFO', m)
        },
    ]
        

    const group = useMemo(()=> data.group.find(s=>s.groupNis === value?.extra?.fokusGroupNis),[
        value?.extra?.fokusGroupNis,
        data
    ])
    return (
        <div className="p-1">
            <h3 className="font-bold uppercase text-center text-3xl">Rekapitulasi Kelompok Buku Induk {value?.extra?.fokusGroupNis}</h3>
            <TableWithScrolling>
                <thead>
                    <TRowEdura>
                        <ThEdura className="w-5">No</ThEdura>
                        <ThEdura className="w-5">Aksi</ThEdura>
                        <ThEdura className="w-5">NIS</ThEdura>
                        <ThEdura className="w-5">NISN</ThEdura>
                        <ThEdura>Nama Siswa</ThEdura>
                        <ThEdura className="text-wrap w-5 text-center">Kelas / Rombel</ThEdura>
                        <ThEdura className="w-5">Status</ThEdura>
                        <ThEdura className="w-5">Masuk Tgl</ThEdura>
                        <ThEdura className="w-5">Keluar Tgl</ThEdura>
                        <ThEdura>Keterangan</ThEdura>
                    </TRowEdura>
                </thead>
                <tbody>

                    {
                        group?.dataOrderedInduk?.map((m, index)=>
                            <TRowEdura key={m.data.id +"_"+ index} className={colorClassValidation(m.validation)}>
                                <TdEdura>{index+1}.</TdEdura>
                                <TdEdura><ActionButtonTable<SiswaType>
                                                        data={m.data}
                                                        trigger={ActionTrigger}
                                                    /></TdEdura>
                                <TdEdura>{m.data.nis}</TdEdura>
                                <TdEdura>{m.data.nisn}</TdEdura>
                                <TdEdura>{m.data.pd_nama}</TdEdura>
                                <TdEdura className="text-center">{m.data.aktif==='aktif'? m.data.nama_rombel: m.data.kelas_keluar   ??''}</TdEdura>
                                <TdEdura>{m.data.aktif??''}</TdEdura>
                                <TdEdura>{m.data.masuk_tgl?.toLocaleString('id-ID',{dateStyle:'medium'}) ??''}</TdEdura>
                                <TdEdura>{m.data.keluar_tgl?.toLocaleString('id-ID',{dateStyle:'medium'}) ??''}</TdEdura>
                                <TdEdura className="text-wrap w-5">{m.validation?.errors.nis  ?? ( m.validation?.duplicate.nis ? 'NIS Duplikat':'')}</TdEdura>
                            </TRowEdura>
                        )
                    }
                </tbody>
            </TableWithScrolling>
            
        </div>
    )
}