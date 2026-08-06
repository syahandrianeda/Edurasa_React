import UploadGambarSoalService from "./upload-gambar-soal-service-implements";

export interface UploadImageCommonsProps{
    file:File, 
    opt?:Record<string, any>,
    onProgress?:(v:number)=>void
}

export interface OptionSkemaFolderUpload{
    folder:string,
        subfolder?:string, 
        namafile?: string
}
/**
 * contoh penerapan: `app\pages\profile\profile-user.tsx`
 * @info ini jenis semua file bisa diupload, pastikan file type adalah image
 * @param : 
 * file ->dispatch input type
 * @param : 
 * opt: --> {folder:'nama folder di Drive', subFolder: 'nama sub folder', namaFile:'nama file ini jika dicustom'}
 * @param : 
 * onProgress: --> jika mau menganimasikan proses Bar dengan callback function
 *  * @returns : string (id file gambar di drive) atau '' jika gagal/error
 */
export default async function UploadImageServiceCommon(file:File, opt?:OptionSkemaFolderUpload, onProgress?:(v:number)=>void){
    try {
        const svc = new UploadGambarSoalService();
        const url = await svc.uploadFile(file, onProgress,opt);
        
        return url;
    } catch (err) {
        return "";
    }
}