import { useState } from "react";
import { ButtonDeletePreview, ButtonPreviewFile, FileInputUpload, useFilePreview } from "~/components/form-custom/files-input";
import { useFormEdura } from "~/components/form-custom/form-edura";
import type { SiswaType } from "~/types/siswa";
import { useSiswaCrud } from "../../kesiswaan-controller";
import { ShowToasterError, ShowToasterSuccess } from "~/lib/toaster";
import ButtonTooltip from "~/components/ui_edura/button-tooltip";
import { Loader, Trash, Upload } from "lucide-react";
import { normalizeFileName } from "~/lib/normalized-filename";
import urlImgDrive from "~/lib/url-img-drive";
import NamaSiswa from "./nama-siswa";
import TempatLahir from "./tempat-lahir-siswa";
import KalendarTanggalLahir from "./tanggal-lahir-siswa";
import { KalendarTanggalLahirAyah, KalendarTanggalLahirIbu, NamaAyah, NamaIbu, NoNIKAyah, NoNIKIbu } from "./orang-tua-siswa";
import NoNIK from "./nik-siswa";
import { NoKK } from "./field-nomor";
import { AnakUrutanDiKeluarga, SaudaraDiKeluarga } from "./saudara-siswa";


export function FileInputAkte(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    const [load, setLoad] = useState(false);
    const {actions} = useSiswaCrud();

    const url = currentData?.dok_akte
    
    if(url !=='') return null;
    
    const fileAkte = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (!file) return;
            const param={
                subfolder: currentData?.pd_nama.toUpperCase(),
                namafile: normalizeFileName("dokumen_akte_"+currentData?.pd_nama)+'_'+new Date().getTime()
            }
            
            setLoad(true);
            const result =  await actions.uploadFile(file,param);
            setLoad(false);
            
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

export function FileAkteKelahiran(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    const url = currentData?.dok_akte
    
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

export function FileKartuKeluarga(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    const url = currentData?.dok_kk
    return (
        <FileInputUpload label="Kartu Keluarga" src={url}>
            <ButtonPreviewFile fileId={url}/>
            {/* komponen input type file buat upload gambar: */}
            <FileInputKartuKeluarga/>
            <ButtonDeletePreview fileId={url} callBack={()=>setCurrentData(draft=>{
                draft.dok_kk = ""
            })}/>
        </FileInputUpload>
    )
}

export function FileInputKartuKeluarga(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    const [load, setLoad] = useState(false);
    const {actions} = useSiswaCrud();
    const url = currentData?.dok_kk
    
    if(url !=='') return null;

    const fileKk = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (!file) return;

       
            const param={
                
                subfolder: currentData?.pd_nama.toUpperCase(),
                namafile: normalizeFileName("dokumen_kartu_keluarga_"+currentData?.pd_nama)+'_'+new Date().getTime()
            }
            
            setLoad(true);
            const result =  await actions.uploadFile(file,param);
            setLoad(false);
            
            if(result.success){
                setCurrentData(draft=>{
                    draft.dok_kk = result.data.idfile
                });
                ShowToasterSuccess(result.messsage);
            }else{
                ShowToasterError(result.messsage);
            }
            console.log(currentData);
       
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


export function FilePoto(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    const url = currentData?.koleksi_potoinduk
    // const urlImg = currentData?.dok_akte ==="" ?"": urlImgDrive(currentData?.dok_akte)
    return (
        <FileInputUpload label="Poto Siswa" src={url}>
            <FileInputPoto/>
            <HapusPotoSiswa/>
        </FileInputUpload>
    )
}

export function HapusPotoSiswa(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    const urlSiswa = currentData?.koleksi_potoinduk;
    if(urlSiswa === "") return null;

    return (
        <button 
            className="bg-radial p-1  m-0 from-sky-500 to-sky-300 shadow-lg border border-sky-300 rounded-xl" 
            title="hapus" 
            onClick={(e)=>{
                e.preventDefault();
                setCurrentData(draft=>{
                    draft.koleksi_potoinduk =""
                })
            }}  
            >
            <Trash size={12}/>
        </button>
    )
}
export function FileInputPoto(){
    const {currentData, setCurrentData} = useFormEdura<SiswaType>();
    const [load, setLoad] = useState(false);
    const {actions} = useSiswaCrud();

    
    const filePoto = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.preventDefault();
        const file = e.target.files?.[0];

        if (!file) return;
            const param={
                subfolder: currentData?.pd_nama.toUpperCase(),
                namafile: normalizeFileName("poto_siswa_"+currentData?.pd_nama)+'_'+new Date().getTime()
            }
            
            setLoad(true);
            const result =  await actions.uploadFile(file,param);
            setLoad(false);
            
            if(result.success){
                setCurrentData(draft=>{
                    draft.koleksi_potoinduk = result.data.idfile
                });
                ShowToasterSuccess(result.messsage);
            }else{
                ShowToasterError(result.messsage);
            }
    };

    return (
        <>
            <input id="potosiswa" type="file" className="hidden" onChange={filePoto} />
            <ButtonTooltip asChild tooltip="Upload File" variant="default" className="bg-radial m-0 from-sky-500 to-sky-300 shadow-lg border border-sky-300 rounded-xl">
                <label htmlFor="potosiswa" className="border border-black p-1 rounded-xl flex justify-between gap-2 items-center">
                    {load && <Loader className="animate-spin" size={12}/>}
                    <Upload size={12}/>
                    
                </label>
            </ButtonTooltip>
        </>
    )
}

export function SectionPreviewPoto(){
    const {currentData}  = useFormEdura<SiswaType>();
    const previewUrl = currentData?.koleksi_potoinduk;
    const srcImg = previewUrl===""?null:urlImgDrive(previewUrl);
    if(previewUrl=="") {
        return (
        <div className="flex flex-col h-full rounded-tr-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
            <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                Preview Not Found
            </div>
        </div>
        )
    }
    return (
        <div className="flex flex-col rounded-tr-xl border-0 inner-shadow-sky-100 bg-linear-to-bl from-sky-600 to-sky-400">
            <div className="m-1 inner-shadow-sky-600 shadow-md shadow-sky-300 bg-sky-600/50 rounded-2xl flex flex-col justify-center h-full items-center">
                {srcImg && <img src={srcImg} alt="poto siswa" className="aspect-3/4 h-70 rounded-xl shadow-lg shadow-sky-300" referrerPolicy="no-referrer"/>}
            </div>
        </div>
    )
    
}


export function ConditionalFieldInput() {
    const {currentId} = useFilePreview();
        const {currentData} = useFormEdura<SiswaType>();
        if(!currentId) return null;
        if(currentId === currentData?.dok_akte){
            return (
                <>
                    <NamaSiswa/>
                    <TempatLahir/>
                    <AnakUrutanDiKeluarga/>
                    <KalendarTanggalLahir/>
                    <NamaAyah/>
                    <NamaIbu/>
                </>
            )

        }
        if(currentId === currentData?.dok_kk){
            return (
                <>
                    <NoKK/>
                    <SaudaraDiKeluarga/>
                    <NoNIK/>
                    <NoNIKAyah/>
                    <KalendarTanggalLahirAyah/>
                    <NoNIKIbu/>
                    <KalendarTanggalLahirIbu/>
                </>
            )

        }
}