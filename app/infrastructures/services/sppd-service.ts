import type { SppdRepositoryInterface } from "~/domain/interfaces/sppd-repository-interface";
import SppdRepository from "../repositories/sppd-repository";
import type { SppdServiceInterface } from "~/domain/interfaces/sppd-service-interface";
import type { ApiResponse, ParamFile } from "~/configs/appscript-config";
import { dataURLToFile, encodeFileToBase64, isImageFile } from "~/domain/image/file-uploader";
import { resizeImageForUpload } from "~/domain/image/image-resizer";
import type { SppdSheetType } from "~/types/surat/sppd-sheet-type";

export default class SppdService implements SppdServiceInterface{
    constructor( public repo:SppdRepositoryInterface = new SppdRepository()){}

    async uploadFile(file: File, options?: Record<string, any>): Promise<any> {
        let finalFile = file;
        const namaFolderTapel = `Dokumen Surat ${new Date().getFullYear()}`;
                
                if (isImageFile(file)) {
                    const dataUrl = await resizeImageForUpload(file, {
                        maxWidth: 300,
                        maxHeight: Infinity,
                        keepOriginalSize:false
                    });
        
                    finalFile = dataURLToFile(dataUrl, file.name);
                }
        
                const encoded = await encodeFileToBase64(finalFile);
                const dataParam:ParamFile = {
                    folder: options?.folder ?? namaFolderTapel,
                    subfolder: options?.subfolder ?? 'Lainnya',
                    namafile: options?.namafile ?? 'Lainnya.'+encoded.extension,
                    mimeType:encoded.mimeType,
                    base64: encoded.base64
                }
                
        return await this.repo.uploadFile(dataParam);
    }

    async findById(param: Record<string, any>): Promise<ApiResponse<SppdSheetType>> {
        return await this.repo.findById(param);
    }

    async create(param: Record<string, any>): Promise<ApiResponse<SppdSheetType>> {
        return await this.repo.create(param);
    }

    async update(param: Record<string, any>): Promise<ApiResponse<SppdSheetType>> {
        if(!param) return  {
            success:false,
            error:{ code: 'PARAMETER UNDEFINED', message:'Parameter undefined'}
        }
        let data:string='';
        if(Array.isArray(param)){
            data = JSON.stringify(param);
        }else{
            data = JSON.stringify([param]);
        }
        const parameter = {
            // data:JSON.stringify(param),
            data,
            key_match:'idbaris',
            key_index:'idbaris',
            action:'upsert',
            schema:JSON.stringify({
                    idbaris:'number',
                    ptk_durasisppd:'number',
                    ptk_starttgl: 'date',
                    refrensi_suratkeluar:'number',
                    ptk_diperintah:'number'
            }),

        }
        
        return await this.repo.update(parameter)
    }

}