import type { ApiResponse, ParamFile } from "~/configs/appscript-config";
import { dataURLToFile, encodeFileToBase64, isImageFile } from "~/domain/image/file-uploader";
import { resizeImageForUpload } from "~/domain/image/image-resizer";
import type KesiswaanRepositoryInterface from "~/domain/interfaces/kesiswaan-repository-interface";
import type KesiswaanServiceInterface from "~/domain/interfaces/kesiswaan-service-interface";
import KesiswaanRepository from "~/domain/kesiswaan/kesiswaan-repository";
import type { SiswaType } from "~/types/siswa";

export default class KesiswaanServiceImplements implements KesiswaanServiceInterface{
    repo:KesiswaanRepositoryInterface;
    constructor(){
        this.repo = new KesiswaanRepository('datasiswa');
    }
    async loadAllSiswa(): Promise<ApiResponse<SiswaType> | null> {
        
        const data = await this.repo.loadAllSiswa();
        console.log('respon loadAllSiswa dari service', data);
        return data;
    }
    async uploadFile(file:File, options:Record<string, any>): Promise<any>{
        let finalFile = file;
        console.log('options di uploadFile', options)
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
        console.log("dataParam di Service",options,dataParam);
        return await this.repo.uploadFileRepo(dataParam)
    }
}