
import { CalendarPicker } from "~/components/form-custom/calendar";
import { Fields, InputText, SelectField} from "~/components/form-custom/fields";
import type { OptionsSelection } from "~/components/form-custom/filed-types";
import {ButtonDeletePreview, ButtonPreviewFile, FileIframeViewer, FileInputUpload, FilePreviewProvider, useFilePreview} from "~/components/form-custom/files-input";
import { useFormEdura } from "~/components/form-custom/form-edura";
import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { useAppSelector } from "~/context-reduct/hook";
import { DataRombelUI } from "~/domain/rombel/data-rombel";
import { AgamaMeta, type Agama } from "~/types/enums/agama";
import { ABK_EDURA, JENIS_TINGGAL_EDURA, MODA_TRANSPORTASI_EDURA, PEKERJAAN_EDURA, PENDIDIKAN_EDURA } from "~/types/enums/dari_edura";
import { Gender, GenderMeta } from "~/types/enums/gender";
import type{ SiswaType } from "~/types/siswa";
import { useSiswaCrud } from "../kesiswaan-controller";
import { normalizeFileName } from "~/lib/normalized-filename";
import { Loader, Upload } from "lucide-react";
import { useState } from "react";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";
import ButtonTooltip from "~/components/ui_edura/button-tooltip";


export const ConfigFormEdit:TabsConfigProps = {
    defaultValue:'tabAktif',
    tabList:[
        {
            value: 'tabAktif',
            label: 'Status'
        },
        {
            value: 'tabIdentitas',
            label: 'Identitas'
        },
        {
            value: 'tabToken',
            label: 'Token dan Nomor'
        },
        {
            value: 'tabKelasAktif',
            label: 'Kelas Aktif'
        },
        {
            value: 'tabAlamat',
            label: 'Alamat'
        },
        {
            value: 'tabOrtu',
            label: 'Orang Tua'
        },
        {
            value: 'tabDokumen',
            label: 'Dokumen'
        },
        
    ],
    contentList:[
        {
            value: 'tabAktif',
            element: <GroupKeaktifan/>
        },
        {
            value: 'tabIdentitas',
            element: <GroupIdentitas/>
        },
        {
            value: 'tabToken',
            element: <GroupTokenDanNomor/>
        },
        {
            value: 'tabKelasAktif',
            element: <GroupRombelJenjang/>
        },
        {
            value: 'tabAlamat',
            element: <GroupAlamat/>
        },
        {
            value: 'tabOrtu',
            element: <GroupOrangTua/>
        },
        {
            value: 'tabDokumen',
            element: <GroupDokumen/>
        },
        
    ]
} 

const StatusSiswaCollection:OptionsSelection[] = [
    {
        value:'',
        label: 'Belum Memilih'
    },
    {
        value:'aktif',
        label: 'Aktif'
    },
    {
        value:'non-aktif',
        label: 'Non-Aktif'
    },
    {
        value:'lulus',
        label: 'Lulus'
    },

    {
        value:'pindah',
        label: 'Mutasi/Pindah Sekolah'
    },

]
function GroupKeaktifan(){
    const {currentData} = useFormEdura<SiswaType>();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 min-h-100 pt-2">
            <div className="flex flex-col rounded-s-xl border-0 inner-shadow-sky-100 bg-linear-to-br from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                    <SelectKeaktifan/>
                    <KalendarMasukTanggal/>
                    <AwalKelas/>
                </div>
            </div>
            <div className="flex flex-col rounded-e-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                    <AsalSekolahTK/>
                    <AsalPindahan/>
                </div>
            </div>
            {
                (currentData?.aktif === 'pindah' || currentData?.aktif === 'lulus') && 
                (
                    <>
                        <div className="flex flex-col border rounded-bl-xl bg-linear-to-tr from-sky-600 to-sky-400">
                            <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                                <KalendarKeluarTanggal/> 
                                
                            </div>
                        </div>
                        
                        <div className="flex flex-col border rounded-br-xl bg-linear-to-tl from-sky-600 to-sky-400">
                            <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                                {
                                currentData?.aktif === 'lulus' && (
                                    <>
                                        <NomorSeriIjazah/>
                                        <LulusMelanjutkanKe/>
                                    </>
                                )
                            }
                            {
                                currentData?.aktif === 'pindah' && (
                                    <>
                                        <MutasiDiKelas/>
                                        <MutasiPindahKe/>
                                        <MutasiAlasan/>
                                    </>
                                )
                            }
                                
                            </div>
                        </div>
                    </>
                    

                )
            }
        </div>
    )
}

function GroupIdentitas(){
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 min-h-100 pt-2">
            <div className="flex flex-col rounded-tl-xl border-0 inner-shadow-sky-100 bg-linear-to-br from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-start items-baseline h-full ps-4 ">
                    <NamaSiswa/>
                    <SelectGender/>
                    <SelectAgama/>
                </div>
            </div>
            <div className="flex flex-col rounded-tr-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-start h-full items-center">
                    <TempatLahir/>
                    <KalendarTanggalLahir/>
                </div>
            </div>
            <div className="flex flex-col rounded-bl-xl border-0 inner-shadow-sky-100 bg-linear-to-tr from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                    <SelectAbk/>
                </div>
            </div>
            <div className="flex flex-col rounded-br-xl border-0 inner-shadow-sky-100 bg-linear-to-tl from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                    <SaudaraDiKeluarga/>
                    <AnakUrutanDiKeluarga/>
                </div>
            </div>
        </div>
    )
}

function GroupTokenDanNomor(){
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 min-h-100 pt-2">
            <div className="flex flex-col rounded-tl-xl border-0 inner-shadow-sky-100 bg-linear-to-br from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center items-center h-full ps-4 ">
                    <Token/>
                </div>
            </div>
            <div className="flex flex-col rounded-tr-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                    <NoNis/>
                    <NoNisn/>
                    <NoNIK/>
                </div>
            </div>
            <div className="flex flex-col rounded-bl-xl border-0 inner-shadow-sky-100 bg-linear-to-tr from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                    <NoAkte/>
                    <NoKK/>
                </div>
            </div>
            <div className="flex flex-col rounded-br-xl border-0 inner-shadow-sky-100 bg-linear-to-tl from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                    <NoHp/>
                </div>
            </div>
        </div>
    )
}

function GroupAlamat(){
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 min-h-100 pt-2">
            <div className="flex flex-col rounded-tl-xl border-0 inner-shadow-sky-100 bg-linear-to-br from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center items-center h-full ps-4 ">
                    <SelectJenisTinggal/>
                    <SelectModaTransportasi/>
                </div>
            </div>
            <div className="flex flex-col rounded-tr-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                    <AlamatJalan/>
                    <AlamatDusun/>
                    <AlamatKelurahan/>
                    <div className="flex justify-between">
                        <AlamatRT/>
                        <AlamatRW/>
                    </div>
                    <AlamatKecamatan/>
                    <AlamatKota/>
                    <AlamatProvinsi/>
                </div>
            </div>
        </div>
    )
}

function FileKartuKeluarga(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    const url = currentData?.dok_kk
    // const urlImg = currentData?.dok_akte ==="" ?"": urlImgDrive(currentData?.dok_akte)
    return (
        <FileInputUpload label="Kartu Keluarga" src={url}>
            <ButtonPreviewFile fileId={url}/>
            <FileInputKartuKeluarga/>
            <ButtonDeletePreview fileId={url} callBack={()=>setCurrentData(draft=>{
                draft.dok_kk = ""
            })}/>
        </FileInputUpload>
    )
}
function FileAkteKelahiran(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    const url = currentData?.dok_akte
    // const urlImg = currentData?.dok_akte ==="" ?"": urlImgDrive(currentData?.dok_akte)
    return (
        <FileInputUpload label="Akte Kelahiran" src={url}>
            <ButtonPreviewFile fileId={url}/>
            <FileInputAkte/>
            <ButtonDeletePreview fileId={url} callBack={()=>setCurrentData(draft=>{
                draft.dok_akte = ""
            })}/>
        </FileInputUpload>
    )
}
function FileInputKartuKeluarga(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
   const [load, setLoad] = useState(false);
    const {uploadFile} = useSiswaCrud();
    const url = currentData?.dok_kk
    
    if(url !=='') return null;

    const fileKk = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

       
            const param={
                
                subfolder: currentData?.pd_nama.toUpperCase(),
                namafile: normalizeFileName("dokumen_kartu_keluarga_"+currentData?.pd_nama)+'_'+new Date().getTime()
            }
            console.log('param di komponen', param);
            setLoad(true);
            const result =  await uploadFile(file,param);
            setLoad(false);
            console.log(result);
            if(result.success){
                setCurrentData(draft=>{
                    draft.dok_kk = result.data.idfile
                });
                ShowToasterSuccess(result.messsage);
            }else{
                ShowToasterError(result.messsage);
            }

       
    };
    return (
        <>
            <input id="fileKk" type="file" className="hidden" onChange={fileKk}/>
        <ButtonTooltip asChild tooltip="Upload File" variant="default" className="bg-radial m-0 from-sky-500 to-sky-300 shadow-lg border border-sky-300 rounded-xl">
            <label htmlFor="fileKk" className="border border-black p-1 rounded-xl flex justify-between gap-2 items-center">
                {load && <Loader className="animate-spin" size={12}/>}
                <Upload size={12}/>
            </label>
        </ButtonTooltip>
        </>
        
    )
}
function FileInputAkte(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    const [load, setLoad] = useState(false);
    const {uploadFile} = useSiswaCrud();

    const url = currentData?.dok_akte
    
    if(url !=='') return null;
    
    const fileAkte = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

       
            const param={
                
                subfolder: currentData?.pd_nama.toUpperCase(),
                namafile: normalizeFileName("dokumen_akte_"+currentData?.pd_nama)+'_'+new Date().getTime()
            }
            console.log('param di komponen', param);
            setLoad(true);
            const result =  await uploadFile(file,param);
            setLoad(false);
            console.log(result);
            if(result.success){
                setCurrentData(draft=>{
                    draft.dok_akte = result.data.idfile
                });
                ShowToasterSuccess(result.messsage);
            }else{
                ShowToasterError(result.messsage);
            }

       
    };

    return (
        <>
            <input id="fileAkte" type="file" className="hidden" onChange={fileAkte} />
            <ButtonTooltip asChild tooltip="Upload File" variant="default" className="bg-radial m-0 from-sky-500 to-sky-300 shadow-lg border border-sky-300 rounded-xl">
                <label htmlFor="fileAkte" className="border border-black p-1 rounded-xl flex justify-between gap-2 items-center">
                    {load && <Loader className="animate-spin" size={12}/>}
                    <Upload size={12}/>
                </label>
            </ButtonTooltip>
        </>
    )
}
function GroupDokumen(){
    
    return (
        <FilePreviewProvider>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 min-h-100 pt-2">
                <div className="flex flex-col rounded-tl-xl border-0 inner-shadow-sky-100 bg-linear-to-br from-sky-600 to-sky-400">
                    <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center items-center h-full ps-4 ">
                        <FileAkteKelahiran/>
                        <FileKartuKeluarga/>
                    </div>
                </div>
                <div className="flex flex-col rounded-tr-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
                    <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                        <FileIframeViewer/>
                    </div>
                </div>
                <InputanBantu/>
            </div>
        </FilePreviewProvider>
    )
}
function InputanBantu(){
    const {currentId} = useFilePreview();
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    if(!currentId) return null;
    
    if(currentId === currentData?.dok_akte){
        return (
            <>
                <div className="flex flex-col rounded-tr-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
                    <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                        <NamaSiswa/>
                        <TempatLahir/>
                        <KalendarTanggalLahir/>
                    </div>
                </div>
                <div className="flex flex-col rounded-tr-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
                    <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                        <NamaAyah/>
                        <NamaIbu/>
                    </div>
                </div>
            </>
        )
    }
    if(currentId === currentData?.dok_kk){
        
        return (
            <>
                <div className="flex flex-col rounded-tr-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
                    <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                        <NoNIK/>
                        <NoKK/>
                        
                    </div>
                </div>
                <div className="flex flex-col rounded-tr-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
                    <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                        <NoNIKAyah/>
                        <KalendarTanggalLahirAyah/>
                        <NoNIKIbu/>
                        <KalendarTanggalLahirIbu/>
                    </div>
                </div>
            </>
        )
    }
}

function GroupOrangTua(){
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 min-h-100 pt-2">
            <div className="flex flex-col rounded-tl-xl border-0 inner-shadow-sky-100 bg-linear-to-br from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-start items-center h-full">
                    <div className="rounded-t-xl p-2 font-extrabold uppercase text-2xl text-sky-100 dark:text-sky-200">ayah</div>
                    <NamaAyah/>
                    <KalendarTanggalLahirAyah/>
                    <NoNIKAyah/>
                    <SelectPendidikanAyah/>
                    <SelectPekerjaanAyah/>
                </div>
            </div>
            <div className="flex flex-col rounded-tr-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-start items-center h-full">
                    <div className="rounded-t-xl p-2 font-extrabold uppercase text-2xl text-sky-100 dark:text-sky-200">Ibu</div>
                    <NamaIbu/>
                    <KalendarTanggalLahirIbu/>
                    <NoNIKIbu/>
                    <SelectPendidikanIbu/>
                    <SelectPekerjaanIbu/>
                </div>
            </div>
        </div>
    )
}

function GroupRombelJenjang(){
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 min-h-100 pt-2">
            <div className="flex flex-col rounded-tl-xl border-0 inner-shadow-sky-100 bg-linear-to-br from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center items-center h-full ps-4 ">
                    <RombelAktif/>
                    <JenjangAktif/>
                </div>
            </div>
            <div className="flex flex-col rounded-tr-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
                <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                    <WaliKelas/>
                </div>
            </div>
            
        </div>
    )
}

function SelectKeaktifan(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className="mt-2 mb-0 mx-auto">
            <SelectField 
                id='status'
                value={currentData?.aktif}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.aktif = e.target.value;
                        })
                    } 
                labelSelect="Status Keaktifan"
            >
                {
                    StatusSiswaCollection.map((map,i)=>(
                        <option
                            key={i}
                            value={map.value}
                        >
                            {map.label}
                        </option>
                    ))
                }
            </SelectField>
        </Fields>
    )
}

function SelectGender(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className="mt-2 mb-0 w-6/12">
            <SelectField 
                id='gender'
                value={currentData?.pd_jk as Gender}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.pd_jk = e.target.value as Gender;
                        })
                    } 
                labelSelect="Jenis Kelamin (Gender)"
            >
                {
                    Object.entries(GenderMeta).map(([key, meta]) => (
                            <option key={key} value={key}>
                                {meta.label}
                            </option>
                        ))
                }
            </SelectField>
        </Fields>
    )
}

function SelectAbk(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className="mt-2 mb-0 w-6/12">
            <SelectField 
                id='abk_siswa'
                value={currentData?.dapo_kebutuhankhusus ??""}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.dapo_kebutuhankhusus = e.target.value;
                        })
                    } 
                labelSelect="Siswa Berkebutuhan Khusus"
            >
                {
                    ABK_EDURA.map((m,i)=>(
                            <option key={i} value={m.value}>{m.label}</option>
                    ))
                }
            </SelectField>
        </Fields>
    )
}

function SelectJenisTinggal(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className="mt-2 mb-0 w-6/12">
            <SelectField 
                id='jenis_tinggal'
                value={currentData?.dapo_jenistinggal ?? ""}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.dapo_jenistinggal = e.target.value ;
                        })
                    } 
                labelSelect="Tinggal Bersama :"
            >
                {
                    JENIS_TINGGAL_EDURA.map((m,i)=>(
                            <option key={i} value={m.value}>{m.label}</option>
                    ))
                }
            </SelectField>
        </Fields>
    )
}

function SelectModaTransportasi(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className="mt-2 mb-0 w-10/12">
            <SelectField 
                id='dapo_alattransportasi'
                value={currentData?.dapo_alattransportasi ??""}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.dapo_alattransportasi = e.target.value ;
                        })
                    } 
                labelSelect="Moda Transportasi"
            >
                {
                    MODA_TRANSPORTASI_EDURA.map((m,i)=>(
                        <option key={i} value={m.value}>{m.label}</option>
                    ))
                }
            </SelectField>
        </Fields>
    )
}

function SelectPekerjaanAyah(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className="mt-2 mb-0 w-10/12">
            <SelectField 
                id='dapo_pekerjaanayah'
                value={currentData?.dapo_pekerjaanayah ??""}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.dapo_pekerjaanayah = e.target.value ;
                        })
                    } 
                labelSelect="Pekerjaan Ayah"
            >
                {
                    PEKERJAAN_EDURA.map((m,i)=>(
                        <option key={i} value={m.value}>{m.label}</option>
                    ))
                }
            </SelectField>
        </Fields>
    )
}
function SelectPekerjaanIbu(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className="mt-2 mb-0 w-10/12">
            <SelectField 
                id='dapo_pekerjaanibu'
                value={currentData?.dapo_pekerjaanibu ??""}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.dapo_pekerjaanibu = e.target.value ;
                        })
                    } 
                labelSelect="Pekerjaan Ibu"
            >
                {
                    PEKERJAAN_EDURA.map((m,i)=>(
                        <option key={i} value={m.value}>{m.label}</option>
                    ))
                }
            </SelectField>
        </Fields>
    )
}
function SelectPendidikanAyah(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className="mt-2 mb-0 w-10/12">
            <SelectField 
                id='dapo_jenjangpendidikanayah'
                value={currentData?.dapo_jenjangpendidikanayah ??""}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.dapo_jenjangpendidikanayah = e.target.value ;
                        })
                    } 
                labelSelect="Pendidikan Terakhir"
            >
                {
                    PENDIDIKAN_EDURA.map((m,i)=>(
                        <option key={i} value={m.value}>{m.label}</option>
                    ))
                }
            </SelectField>
        </Fields>
    )
}

function SelectPendidikanIbu(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className="mt-2 mb-0 w-10/12">
            <SelectField 
                id='dapo_jenjangpendidikanibu'
                value={currentData?.dapo_jenjangpendidikanibu ??""}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.dapo_jenjangpendidikanibu = e.target.value ;
                        })
                    } 
                labelSelect="Pendidikan Terakhir"
            >
                {
                    PENDIDIKAN_EDURA.map((m,i)=>(
                        <option key={i} value={m.value}>{m.label}</option>
                    ))
                }
            </SelectField>
        </Fields>
    )
}

function SelectAgama(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className="mt-2 mb-0 w-6/12">
            <SelectField 
                id='agama'
                value={currentData?.pd_agama as Agama}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.pd_agama = e.target.value as Agama;
                        })
                    } 
                labelSelect="Agama"
            >
                {
                    Object.entries(AgamaMeta).map(([key, meta]) => (
                            <option key={key} value={key}>
                                {meta.label}
                            </option>
                        ))
                }
            </SelectField>
        </Fields>
    )
}

function KalendarMasukTanggal(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    const handleDate = (value:string|Date)=>{
        setCurrentData(draft=>{
            draft.masuk_tgl = value as Date
        })
    }
    return (
        <CalendarPicker
            id="id_masuk_tgl"
            label="Tanggal Diterima"
            currentDate={currentData.masuk_tgl}
            handleChangeDate={handleDate}/>
    )

}

function KalendarKeluarTanggal(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    const handleDate = (value:string|Date)=>{
        setCurrentData(draft=>{
            draft.keluar_tgl = value as Date
        })
    }
    return (
        <CalendarPicker
            id="id_keluar_tgl"
            label={currentData?.aktif === 'lulus'?"Tanggal Lulus":"Tanggal Mutasi (Keluar)"}
            currentDate={currentData?.keluar_tgl??""}
            handleChangeDate={handleDate}/>
    )

}

function KalendarTanggalLahir(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    const handleDate = (value:string|Date)=>{
        setCurrentData(draft=>{
            draft.pd_tanggallahir = value as Date
        })
    }
    return (
        <CalendarPicker
            id="id_pd_tanggallahir"
            label="Tanggal Lahir"
            className="w-10/12"
            currentDate={currentData?.pd_tanggallahir ??""}
            handleChangeDate={handleDate}/>
            
    )

}

function KalendarTanggalLahirAyah(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    const handleDate = (value:string|Date)=>{
        setCurrentData(draft=>{
            draft.dapo_tahunlahirayah = value as Date
        })
    }
    return (
        <CalendarPicker
            id="id_dapo_tahunlahirayah"
            label="Tanggal Lahir Ayah"
            className="w-10/12"
            currentDate={currentData?.dapo_tahunlahirayah ??""}
            handleChangeDate={handleDate}/>
            
    )

}
function KalendarTanggalLahirIbu(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    const handleDate = (value:string|Date)=>{
        setCurrentData(draft=>{
            draft.dapo_tahunlahiribu = value as Date
        })
    }
    return (
        <CalendarPicker
            id="id_dapo_tahunlahiribu"
            label="Tanggal Lahir Ibu"
            className="w-10/12"
            currentDate={currentData?.dapo_tahunlahiribu ??""}
            handleChangeDate={handleDate}/>
            
    )

}

function AwalKelas(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="w-6/12 my-3 ">
            <SelectField 
                id='awal_kelas'
                value={currentData?.awal_kelas||""}
                onChange={(e) =>
                        setCurrentData(draft => {
                            draft.awal_kelas = e.target.value 
                        })
                    } 
                labelSelect="Diterima Di Kelas (Awal Kelas):"
            >
                {
                    DataRombelUI.map((m,i)=>(
                        <option key={i} value={m.rombelName}>
                            {m.rombelName}
                        </option>
                    ))
                }
            </SelectField>
        </Fields>
    )
}

function AsalSekolahTK(){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12 mx-auto">
            <InputText
                id="asal_sekolah_tk"
                value={currentData?.namasekolahasaltk??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.namasekolahasaltk = v
                    })}
                }
                placeholder="Sekolah Asal TK"
                label="Asal Sekolah (Khusus Nama TK)"
            />
        </Fields>
    )
}

function AsalPindahan(){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12 mx-auto">
            <InputText
                id="asal_pindahan"
                value={currentData?.dapo_sekolahasal??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_sekolahasal = v
                    })}
                }
                placeholder="Sekolah Asal SD"
                label="Asal Sekolah (Khusus Siswa Pindahan)"
            />
        </Fields>
    )
}
function NomorSeriIjazah(){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12 mx-auto">
            <InputText
                id="noseri-ijazah"
                value={currentData?.dapo_noseriijazah??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_noseriijazah = v
                    })}
                }
                placeholder="No Seri Ijazah"
                label="No Seri Ijazah"
            />
        </Fields>
    )
}
function LulusMelanjutkanKe(){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12 mx-auto">
            <InputText
                id="melanjutkan-smp"
                value={currentData?.smp_ke??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.smp_ke = v
                    })}
                }
                placeholder="SMP Sederajat"
                label="Melanjutkan Ke SMP Sederajat"
            />
        </Fields>
    )
}
function MutasiPindahKe(){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12 mx-auto">
            <InputText
                id="pindah_ke"
                value={currentData?.pindah_ke??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.pindah_ke = v
                    })}
                }
                placeholder="Pindah Ke SD Tujuan"
                label="SD Tujuan Pindah"
            />
        </Fields>
    )
}
function MutasiDiKelas(){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12 mx-auto">
            <InputText
                id="kelas_keluar"
                value={currentData?.kelas_keluar??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.kelas_keluar = v
                    })}
                }
                placeholder="Kelas Saat Keluar"
                label="Kelas Terakhir Saat Pindah"
            />
        </Fields>
    )
}
function MutasiAlasan(){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12 mx-auto">
            <InputText
                id="alasan_keluar"
                value={currentData?.alasan_keluar??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.alasan_keluar = v
                    })}
                }
                placeholder="Alasan"
                label="Alasan Pindah"
            />
        </Fields>
    )
}

function NamaSiswa(){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12">
            <InputText
                id="pd_nama"
                value={currentData?.pd_nama??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.pd_nama = v
                    })}
                }
                placeholder="Nama Siswa"
                label="Nama Peserta Didik"
            />
        </Fields>
    )
}
function NamaAyah(){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12">
            <InputText
                id="nama_ayah"
                value={currentData?.pd_namaayah??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.pd_namaayah = v
                    })}
                }
                placeholder="Nama Ayah"
                label="Nama Ayah (Kandung)"
            />
        </Fields>
    )
}
function NamaIbu(){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12">
            <InputText
                id="nama_ibu"
                value={currentData?.pd_namaibu??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.pd_namaibu = v
                    })}
                }
                placeholder="Nama Ibu"
                label="Nama Ibu (Kandung)"
            />
        </Fields>
    )
}
function TempatLahir(){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12">
            <InputText
                id="pd_tl"
                value={currentData?.pd_tl??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.pd_tl = v
                    })}
                }
                placeholder="Tempat Lahir"
                label="Tempat Lahir"
            />
        </Fields>
    )
}

function AnakUrutanDiKeluarga(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12">
            <InputText
                id="dapo_anakkeberapa"
                type="number"
                value={currentData?.dapo_anakkeberapa??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_anakkeberapa = v
                    })}
                }
                placeholder="Anak Ke"
                label="Anak Ke"
            />
        </Fields>
    )
}

function SaudaraDiKeluarga(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12">
            <InputText
                id="dapo_jumlahsaudarakandung"
                type="number"
                value={currentData?.dapo_jumlahsaudarakandung??''}
                onChange={(e)=>{
                    const v = e.currentTarget.value ;
                    setCurrentData(draft=> {
                        draft.dapo_jumlahsaudarakandung = Number(v)
                    })}
                }
                placeholder="Jumlah Saudara"
                label="Jumlah Saudara (Kandung/tiri)"
            />
        </Fields>
    )
}

function Token(){
    const {currentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-35">
            <InputText
                id="token"
                type="number"
                value={currentData?.id??''}
                readOnly
                disabled={true}
                placeholder="Token"
                label="Token / ID Siswa"
            />
        </Fields>
    )
}

function NoNis(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12 mx-auto">
            <InputText
                id="nis"
                value={currentData?.nis??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.nis = v
                    })}
                }
                placeholder="Nomor Induk Siswa (NIS)"
                label="Nomor Induk Siswa"
            />
        </Fields>
    )
}

function NoNisn(){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12 mx-auto">
            <InputText
                id="nisn"
                value={currentData?.nisn??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.nisn = v
                    })}
                }
                placeholder="N I S N"
                label="N I S N"
            />
        </Fields>
    )
}

function NoKK(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12 mx-auto">
            <InputText
                id="no_kk"
                value={currentData?.nokk??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.nokk = v
                    })}
                }
                placeholder="Nomor Kartu Keluarga"
                label="Nomor Kartu Keluarga"
            />
        </Fields>
    )
}

function NoAkte(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12 mx-auto">
            <InputText
                id="no_akte"
                value={currentData?.dapo_noregistrasiaktalahir??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_noregistrasiaktalahir = v
                    })}
                }
                placeholder="Nomor Registrasi Akte"
                label="Nomor Registrasi Akte Kelahiran"
            />
        </Fields>
    )
}

function AlamatJalan(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12 mx-auto">
            <InputText
                id="pd_alamat"
                value={currentData?.pd_alamat??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.pd_alamat = v.toUpperCase()
                    })}
                }
                placeholder="Alamat Jalan"
                label="Alamat Jalan"
            />
        </Fields>
    )
}

function AlamatDusun(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12 mx-auto">
            <InputText
                id="dapo_dusun"
                value={currentData?.dapo_dusun??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_dusun = v.toUpperCase()
                    })}
                }
                // className="uppercase"
                placeholder="Dusun"
                label="Dusun / Kompleks"
            />
        </Fields>
    )
}
function AlamatKelurahan(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12 mx-auto">
            <InputText
                id="dapo_kelurahan"
                value={currentData?.dapo_kelurahan??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_kelurahan = v.toUpperCase()
                    })}
                }
                // className="uppercase"
                placeholder="Kelurahan/Desa"
                label="Kelurahan/Desa"
            />
        </Fields>
    )
}

function AlamatKecamatan(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12 mx-auto">
            <InputText
                id="dapo_kecamatan"
                value={currentData?.dapo_kecamatan??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_kecamatan = v.toUpperCase()
                    })}
                }
                // className="uppercase"
                placeholder="Kecamatan"
                label="Kecamatan"
            />
        </Fields>
    )
}

function AlamatKota(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12 mx-auto">
            <InputText
                id="dapo_kota"
                value={currentData?.dapo_kota??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_kota = v.toUpperCase()
                    })}
                }
                // className="uppercase"
                placeholder="Kabupten/Kota"
                label="Kabupten/Kota"
            />
        </Fields>
    )
}

function AlamatProvinsi(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12 mx-auto">
            <InputText
                id="dapo_provinsi"
                value={currentData?.dapo_provinsi??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_provinsi = v.toUpperCase()
                    })}
                }
                // className="uppercase"
                placeholder="Kabupten/Kota"
                label="Kabupten/Kota"
            />
        </Fields>
    )
}

function AlamatRT(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-2/12 mx-auto">
            <InputText
                id="dapo_rt"
                value={currentData?.dapo_rt??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_rt = v.toUpperCase()
                    })}
                }
                // className="uppercase"
                placeholder="RT"
                label="RT"
            />
        </Fields>
    )
}

function AlamatRW(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-2/12 mx-auto">
            <InputText
                id="dapo_rw"
                value={currentData?.dapo_rw??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_rw = v.toUpperCase()
                    })}
                }
                // className="uppercase"
                placeholder="RW"
                label="RW"
            />
        </Fields>
    )
}

function NoNIK(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12 mx-auto">
            <InputText
                id="no_nik"
                value={currentData?.nik??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.nik = v
                    })}
                }
                placeholder="NIK Siswa"
                label="NIK Siswa"
            />
        </Fields>
    )
}

function NoNIKAyah(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12 mx-auto">
            <InputText
                id="no_nikayah"
                value={currentData?.dapo_nikayah??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_nikayah = v
                    })}
                }
                placeholder="NIK Ayah"
                label="NIK Ayah"
            />
        </Fields>
    )
}
function NoNIKIbu(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12 mx-auto">
            <InputText
                id="no_nikibu"
                value={currentData?.dapo_nikibu??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.dapo_nikibu= v
                    })}
                }
                placeholder="NIK Ibu"
                label="NIK Ibu"
            />
        </Fields>
    )
}

function NoHp(){
     const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="mt-3 w-10/12 mx-auto">
            <InputText
                id="no_hp"
                value={currentData?.pd_hp??""}
                onChange={(e)=>{
                    const v = e.currentTarget.value;
                    setCurrentData(draft=> {
                        draft.pd_hp = v
                    })}
                }
                placeholder="No HP"
                label="No HP yang bisa dihubungi"
            />
        </Fields>
    )
}
function RombelAktif(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    return (
        <Fields className="w-6/12 my-3 ">
            <SelectField 
                id='nama_rombel'
                value={currentData?.nama_rombel||""}
                 onChange={(e) => {
                    const rombelName = e.target.value;

                    const rombel = DataRombelUI.find(
                        r => r.rombelName === rombelName
                    );

                    setCurrentData(draft => {
                        draft.nama_rombel = rombelName;
                        draft.jenjang = rombel?.jenjang as number ?? "";
                    });
                }}
                labelSelect="Kelas/Rombel Saat ini"
            >
                {
                    DataRombelUI.filter(s=>s.active).map((m,i)=>(
                        <option key={i} value={m.rombelName}>
                            {m.rombelName}
                        </option>
                    ))
                }
            </SelectField>
        </Fields>
    )
}

function JenjangAktif(){
    const {currentData} = useFormEdura<SiswaType>();
    
    return (
        <Fields className="w-6/12 my-3 ">
            <InputText
                type="number"
                disabled
                readOnly
                value={currentData?.jenjang}
                label="Jenjang"/>
        </Fields>
    )
}

function WaliKelas(){
    const {currentData} = useFormEdura<SiswaType>();
    const friends = useAppSelector(state=>state.auth.user?.friends);
    const rombel = currentData?.nama_rombel;
    const findWalas = friends?.find(s=>s.kode_mapel_ampu === rombel);
    
    return (
        <Fields className="w-6/12 my-3 ">
            <InputText
                disabled
                readOnly
                value={findWalas?.name}
                label={"Wali Kelas "+rombel}/>
        </Fields>
    )
}
