import type { ApiResponse, ParamFile } from "~/configs/appscript-config";
import type { ParamUpdateRecord } from "~/configs/appscript-sheet";
import { dataURLToFile, encodeFileToBase64, isImageFile } from "~/domain/image/file-uploader";
import { resizeImageForUpload } from "~/domain/image/image-resizer";
import type KesiswaanRepositoryInterface from "~/domain/interfaces/kesiswaan-repository-interface";
import type KesiswaanServiceInterface from "~/domain/interfaces/kesiswaan-service-interface";
import KesiswaanRepository from "~/infrastructures/repositories/kesiswaan-repository";
import type { SiswaType } from "~/types/siswa";

export default class KesiswaanServiceImplements implements KesiswaanServiceInterface{
    repo:KesiswaanRepositoryInterface;
    constructor(){
        this.repo = new KesiswaanRepository('datasiswa');
    }
    async loadAllSiswa(): Promise<ApiResponse<SiswaType> | null> {
        
        const data = await this.repo.loadAllSiswa();
            
        return data;
    }
    async loadAllSiswaAPI(): Promise<ApiResponse<SiswaType> | null> {
        
        const data = await this.repo.loadAllSiswaAPI();
            
        return data;
    }
    
    async uploadFile(file:File, options:Record<string, any>): Promise<any>{
        let finalFile = file;
        
        if (isImageFile(file)) {
            const dataUrl = await resizeImageForUpload(file, {
                maxWidth: Infinity,
                maxHeight: Infinity,
                keepOriginalSize:true
            });

            finalFile = dataURLToFile(dataUrl, file.name);
        }

        const encoded = await encodeFileToBase64(finalFile);
        const dataParam:ParamFile = {
            folder: options?.folder ?? 'DOKUMEN PRIBADI SISWA',
            subfolder: options?.subfolder ?? 'Lainnya',
            namafile: options?.namafile ?? 'Lainnya.'+encoded.extension,
            mimeType:encoded.mimeType,
            base64: encoded.base64
        }
        
        return await this.repo.uploadFileRepo(dataParam)
    }

    async update(param:Record<string, any>): Promise<ApiResponse<SiswaType>> {

        return await this.repo.update(param);
    }
    async create(param:Record<string, any>): Promise<ApiResponse<SiswaType>> {
        return await this.repo.create(param);
    }
}