import type { SuratKeluarRepositoryInterface } from "~/domain/interfaces/surat-keluar-repository-interface";
import type { SuratKeluarServiceInterface } from "~/domain/interfaces/surat-keluar-sevice-interface";
import SuratKeluarRepository from "./surat-keluar-repository";
import type { ApiResponse, ParamFile } from "~/configs/appscript-config";
import type { SuratKeluarSheetType } from "~/types/surat/surat-keluar-sheet-type";
import { dataURLToFile, encodeFileToBase64, isImageFile } from "~/domain/image/file-uploader";
import { resizeImageForUpload } from "~/domain/image/image-resizer";

export default class SuratKeluarService implements SuratKeluarServiceInterface{
    constructor(public repo:SuratKeluarRepositoryInterface = new SuratKeluarRepository()){}
    /**
     * 
     * @param param  
     * @param options 
     * @returns 
     */
    async uploadFile(file: File, options?: Record<string, any>): Promise<any> {
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
        return await this.repo.uploadFile( dataParam)
    }

    async update(param: Record<string, any>): Promise<ApiResponse<SuratKeluarSheetType>> {
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
        console.log({parameter})
        return await this.repo.update(parameter);
    }
    async create(param: Record<string, any>): Promise<ApiResponse<SuratKeluarSheetType>> {
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