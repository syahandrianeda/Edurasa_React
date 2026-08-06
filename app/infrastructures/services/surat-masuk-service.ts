import type { ApiResponse, ParamFile } from "~/configs/appscript-config";
import type { SuratMasukSheetType } from "~/types/surat/surat-masuk-sheet-type";
import { dataURLToFile, encodeFileToBase64, isImageFile } from "~/domain/image/file-uploader";
import { resizeImageForUpload } from "~/domain/image/image-resizer";
import type { SuratMasukServiceInterface } from "~/domain/interfaces/surat-masuk-service-interface";
import type { SuratMasukRepositoryInterface } from "~/domain/interfaces/surat-masuk-repository-interface";
import SuratMasukRepository from "../repositories/surat-masuk-repository";

export default class SuratMasukService implements SuratMasukServiceInterface{
    constructor(public repo:SuratMasukRepositoryInterface = new SuratMasukRepository()){}
    /**
     * 
     * @param param  
     * @param options 
     * @returns 
     */
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
            subfolder: options?.subfolder ?? 'Surat Masuk',
            namafile: options?.namafile ?? 'Lainnya.'+encoded.extension,
            mimeType:encoded.mimeType,
            base64: encoded.base64
        }
        
        return await this.repo.uploadFileRepo( dataParam)
    }

    async update(param: Record<string, any>): Promise<ApiResponse<SuratMasukSheetType>> {
        const parameter = {
            data:JSON.stringify([param]),
            key_match:'idbaris',
            key_index:'idbaris',
            action:'upsert',
            schema:JSON.stringify({
                    idbaris:'number',
                    tglsurat: 'date',
                    tglditerima: 'date',
                    user: 'number',
            }),

        }
        
        return await this.repo.update(parameter);
    }
    async create(param: Record<string, any>): Promise<ApiResponse<SuratMasukSheetType>> {
        const parameter = {
            data:JSON.stringify([param]),
            key_match:'idbaris',
            key_index:'idbaris',
            action:'upsert',
            schema:JSON.stringify({
                    idbaris:'number',
                    tglsurat: 'date',
                    user: 'number',
                    refrensi_suratmasuk: 'number',
            }),

        }
        return await this.repo.update(parameter);
    }
}