import type { HeadingTableType, KeyModelTable } from "~/components/tabels/table-interface";
import TableWithScrolling, { HeadingTableEduraWithSort } from "~/components/tabels/table-with-scrolling";
import type { SiswaWithValidation } from "~/context-reduct/selectores/data-siswa-aktif";
import type { DataCompareAplikasi, DataCompareDapodik, SincronizeDapodik } from "~/domain/dapodik/sincronize-data-dapodik";
import type { SiswaTypeDapodik } from "~/types/siswa-dapodik";
import { ActionTriggerEditSiswa, DropdownCellActionEditSiswaWithValidation } from "./action-trigger-edit-siswa";
import { getGenderLabel } from "~/types/enums/gender";
import type { SiswaType } from "~/types/siswa";
import { ActionButtonTable } from "~/components/dropdowns/dropdown-action-table";

export function TablePreviewImport({instance, tampilan}: {instance: SincronizeDapodik, tampilan: string}){       
    
    return (
                <TableWithScrolling>
                    <BodyTableFormatDapodik instance={instance} tampilan={tampilan}/>
                    <BodyTableFormatSinkron instance={instance} tampilan={tampilan}/>
                    <BodyTableFormatDataSiswaHanyaAdaDiDapodik instance={instance} tampilan={tampilan}/>
                    <BodyTableFormatDataSiswaHanyaAdaDiAplikasi instance={instance} tampilan={tampilan}/>
                    <BodyTableFormatRekomendasiPerbaikanDataEdurasa instance={instance} tampilan={tampilan}/>
                </TableWithScrolling>
            )
}   

export function BodyTableFormatDapodik({instance, tampilan}: {instance: SincronizeDapodik, tampilan: string }){
   
    if(tampilan !== 'formatDapodik'){
        return null
    }
    return (
        <HeadingTableEduraWithSort<SiswaTypeDapodik> dataHead={instance.propertyDapodik??[]} data={instance.formDapodik??[]} dataKey={instance.configRender??[]}/>
            )
}

export function BodyTableFormatSinkron({instance, tampilan}: {instance: SincronizeDapodik, tampilan: string }){
    if(tampilan !== 'formatSinkron'){
        return null
    }
    const dataThead:HeadingTableType<Record<string, any>>[] =[
        {
            columns: [
                { label: 'Keterangan Sinkron' },
                { label: 'Data dari Dapodik (Import)'},  
                { label: 'Data Dari Aplikasi'},
                { label: 'Keterangan Validasi'},
                // { label: 'Data Siswa Tidak Valid'},
            ]
        }
    ];
    const configRender:KeyModelTable<Record<string, any>>[] = [
        { type: 'field', className: 'text-start align-middle', render: (row) => row.label },
        { type: 'field', className: 'text-center align-middle', render: (row) => row.dataDapodik },
        { type: 'field', className: 'text-center align-middle', render: (row) => row.dataAplikasi }, 
        { type: 'field', className: 'text-start', render: (row) => {
            const hasInvalid = row.hasInvalidAplikasi;      
            if(hasInvalid.isValid){
                return '';
            } else {
                    const textErrorsNis = hasInvalid.data?.filter((s:SiswaWithValidation) =>s.validation.errors.nis).length;// Object.entries(hasInvalid.errors).map(([key, value])=>`${key}: ${value}`).join(', ');
                    const textErrorsNisn = hasInvalid.data?.filter((s:SiswaWithValidation) =>s.validation.errors.nisn).length;// Object.entries(hasInvalid.errors).map(([key, value])=>`${key}: ${value}`).join(', ');
                    const textDuplicateNis = hasInvalid.data?.filter((s:SiswaWithValidation) =>s.validation.duplicate.nis).length; 
                    const textDuplicateNisn = hasInvalid.data?.filter((s:SiswaWithValidation) =>s.validation.duplicate.nisn).length; 

                    if(textErrorsNis || textErrorsNisn || textDuplicateNis || textDuplicateNisn){
                        return (
                            <ul className="text-xs list-decimal list-inside">
                            {textErrorsNis > 0 && (
                                <li className="list-item">  
                                    NIS Error: {textErrorsNis} Siswa
                                </li>
                            )}
                            {textErrorsNisn > 0 && (
                                <li className="list-item">  
                                    NISN Error: {textErrorsNisn} Siswa
                                </li>
                            )}
                            {textDuplicateNis > 0 && (
                                <li className="list-item">  
                                    Duplikat NIS: {textDuplicateNis} Siswa
                                </li>
                            )}
                            {textDuplicateNisn > 0 && (
                                <li className="list-item">  
                                    Duplikat NISN: {textDuplicateNisn} Siswa
                                </li>
                            )}
                            </ul>
                        )
                    }   
                    return 'Tidak Valid';
                }
            }
        },
    ];
    
    return (
        <HeadingTableEduraWithSort<Record<string, any>> dataHead={dataThead} data={instance.hydrateDataSincronize()??[]} dataKey={configRender}/>
            )
}
export function BodyTableFormatDataSiswaHanyaAdaDiDapodik({instance, tampilan}: {instance: SincronizeDapodik, tampilan: string }){
    
    if(tampilan !== 'formatDataSiswaHanyaAdaDiDapodik'){
        return null
    }
    const dataThead:HeadingTableType<DataCompareAplikasi>[] =[
        {
            columns: [
                { label: 'No' },
                { label: 'Nomor Induk Siswa (NIS)'},
                { label: 'NISN'},
                { label: 'Nama Siswa'},  
                { label: 'Gender'},
                { label: 'Kelas'},
                { label: 'Keterangan'},
                // { label: 'Data Siswa Tidak Valid'},
            ]
        }
    ];
    const ActionTrigger = ActionTriggerEditSiswa<SiswaType>();
    const configRender:KeyModelTable<DataCompareAplikasi>[] = [
        { type: 'index', className: 'text-center align-middle' },
        { type: 'field', className: 'text-start align-middle', render: (row) => row.data.nis },
        { type: 'field', className: 'text-start align-middle', render: (row) => row.data.nisn },
        { type: 'field', className: 'text-start align-middle', render: (row) => row.data.pd_nama },
        { type: 'field', className: 'text-center align-middle', render: (row) => getGenderLabel(row.data.pd_jk)  },
        { type: 'field', className: 'text-center align-middle', render: (row) => row.data.nama_rombel },
        { type: 'field', className: 'text-start align-middle', render: (row) => !!row.dataCompare.length && <ul className="list-decimal list-outside ms-3">
            Di Aplikasi ditemukan:
            {
                row.dataCompare.map((item,index)=>(
                        <li key={index}>
                            
                            <span className={`${item.pd_nama === row.data.pd_nama || item.nisn === row.data.nisn ? 'text-blue-500 font-extrabold' : ''}`}>{item.pd_nama}</span>
                            <p className={`${item.nis === row.data.nis ? 'text-blue-500 font-extrabold' : ''}`}>NIS: {item.nis}</p>
                            <p className={`${item.nisn === row.data.nisn ? 'text-blue-500 font-extrabold' : ''}`}>NISN: {item.nisn}</p>
                            <p>Kelas: {item.nama_rombel}</p>
                            <p>Nama Ibu: {item.pd_namaibu}</p>
                            <p>Nama Ayah: {item.pd_namaayah}</p>
                            <p>Status: {item.aktif}</p>
                            <ActionButtonTable<SiswaType>
                                                    data={item}
                                                    trigger={ActionTrigger}
                                                />
                        </li>
                    )) 
            }
        </ul>
        
    },
    ];
    
    return (
        <HeadingTableEduraWithSort<DataCompareAplikasi> dataHead={dataThead} data={instance.hanyaAdaDiDapodiDibandingkanAplikasi()??[]} dataKey={configRender}/>
            )
}
export function BodyTableFormatDataSiswaHanyaAdaDiAplikasi({instance, tampilan}: {instance: SincronizeDapodik, tampilan: string }){
    
    if(tampilan !== 'formatDataSiswaHanyaAdaDiAplikasi'){
        return null
    }
    const dataThead:HeadingTableType<DataCompareDapodik>[] =[
        {
            columns: [
                { label: 'Aksi' },
                { label: 'No' },
                { label: 'NIS'},
                { label: 'NISN'},
                { label: 'Nama Siswa'},  
                { label: 'Gender'},
                { label: 'Kelas'},
                { label: 'Nama Ibu'},
                { label: 'Keterangan'},
            ]
        }
    ];

    const configRender:KeyModelTable<DataCompareDapodik>[] = [
        DropdownCellActionEditSiswaWithValidation<DataCompareDapodik>(),
        { type: 'index', className: 'text-center align-middle' },
        { type: 'field', className: 'text-start align-middle', render: (row) => row.data.nis },
        { type: 'field', className: 'text-start align-middle', render: (row) => row.data.nisn },
        { type: 'field', className: 'text-start align-middle', render: (row) => row.data.pd_nama },
        { type: 'field', className: 'text-center align-middle', render: (row) => getGenderLabel(row.data.pd_jk)  },
        { type: 'field', className: 'text-center align-middle', render: (row) => row.data.nama_rombel },
        { type: 'field', className: 'text-center align-middle', render: (row) => row.data.pd_namaibu },
        { type: 'field', className: 'text-start align-middle', render: (row) => !!row.dataCompare.length && <ul className="list-decimal list-outside ms-3">
            Di Dapodik ditemukan:
            {
                row.dataCompare.map((item,index)=>(
                    <li key={index}>
                            <span className={`${item.pd_nama === row.data.pd_nama || item.nisn === row.data.nisn ? 'text-blue-500 font-extrabold' : ''}`}>{item.pd_nama}</span>
                            <p className={`${item.nis === row.data.nis ? 'text-blue-500 font-extrabold' : ''}`}>NIS: {item.nis}</p>
                            <p className={`${item.nisn === row.data.nisn ? 'text-blue-500 font-extrabold' : ''}`}>NISN: {item.nisn}</p>
                            <p>Kelas: {item.nama_rombel}</p>
                            <p>Nama Ibu: {item.pd_namaibu}</p>
                            <p>Nama Ayah: {item.pd_namaayah}</p>
                            
                        </li>
                    )) 
            }
            </ul>
        },
    ];
    
    return (
                <HeadingTableEduraWithSort<DataCompareDapodik> dataHead={dataThead} data={instance.hanyaAdaDiAplikasiDibandingkanDapodik()??[]} dataKey={configRender}/>
            )
}
export function BodyTableFormatRekomendasiPerbaikanDataEdurasa({instance, tampilan}: {instance: SincronizeDapodik, tampilan: string }){
    
    if(tampilan !== 'formatRekomendasiPerbaikanDataEdurasa'){
        return null
    }
    const dataThead:HeadingTableType<SiswaWithValidation>[] =[
        {
            columns: [
                { label: 'Aksi' , rowSpan:2},
                { label: 'No' , rowSpan:2},
                { label: 'Nama Siswa', rowSpan:2},  
                { label: 'Kelas', rowSpan:2},
                { label: 'NIS',colSpan:3},
                { label: 'NISN',colSpan:3},
            ],
        },
        {
            columns: [
                { label: 'NIS'},
                { label: 'Tidak Valid'},
                { label: 'Pemilik NIS Duplikat'},
                { label: 'NISN'},
                { label: 'Tidak Valid'},
                { label: 'Pemilik NISN Duplikat'},
            ]

        }
    ];

    const configRender:KeyModelTable<SiswaWithValidation>[] = [
        DropdownCellActionEditSiswaWithValidation<SiswaWithValidation>(),
        { type: 'index', className: 'text-center align-middle' },
        { type: 'field', className: 'text-start align-middle', render: (row) => row.data.pd_nama },
        { type: 'field', className: 'text-center align-middle', render: (row) => row.data.nama_rombel },
        { type: 'field', className: 'text-start align-middle', render: (row) => row.data.nis},
        { type: 'field', className: 'text-center align-middle', render: (row) => row.data?.nis === ""?<span className="text-rose-600">kosong</span>:row.validation.errors?.nis },
        { type: 'field', className: 'text-start align-middle', render: (row) => row.validation.duplicate.nis ? (
            <ul className="list-decimal list-outside ms-3"> 
                {row.validation.duplicate.nis.withNames.map((name,index)=>(
                    <li key={index}>{name}</li>
                ))}
            </ul>
        ) : null },
        { type: 'field', className: 'text-start align-middle', render: (row) => row.data.nisn}, 
        { type: 'field', className: 'text-center align-middle', render: (row) => row.data.nisn === "" ? <span className="text-rose-600">kosong</span> : row.validation.errors?.nisn },
        { type: 'field', className: 'text-start align-middle', render: (row) => row.validation.duplicate.nisn ? (
            <ul className="list-decimal list-outside ms-3"> 
                {row.validation.duplicate.nisn.withNames.map((name,index)=>(
                    <li key={index}>{name}</li>
                ))}
            </ul>
        ) : '-' },
    ];  
    
    return (
                <HeadingTableEduraWithSort<SiswaWithValidation> dataHead={dataThead} data={instance.dataAplikasiInvalid??[]} dataKey={configRender}/>
            )
}