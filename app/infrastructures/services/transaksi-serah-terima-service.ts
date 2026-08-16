import type { TransaksiSerahTerimaServiceInterface } from "~/domain/interfaces/transaksi-serah-terima-service-interface";
import TransaksiSerahTerimaDokumenRepository from "../repositories/TransaksiSerahTerimaRepository";
import type { TransaksiSerahTerimaDokumenRepositoryInterface } from "~/domain/interfaces/transaksi-serah-terima-repository-interface";
import type { ApiResponse, ParamFile } from "~/configs/appscript-config";
import type { TransaksiSerahTerimaDokumenSheetType } from "~/types/galleries/transaksi-serah-terima-dokumen";
import { dataURLToFile, encodeFileToBase64, isImageFile } from "~/domain/image/file-uploader";
import { resizeImageForUpload } from "~/domain/image/image-resizer";

export default class TransaksiSerahTerimaDokumenService implements TransaksiSerahTerimaServiceInterface{
    constructor(public repo:TransaksiSerahTerimaDokumenRepositoryInterface = new TransaksiSerahTerimaDokumenRepository()){

    }
    async uploadFile(file: File, options?: Record<string, any>): Promise<any> {
        let finalFile = file;
        const namaFolderTapel = `Gallery Edura ${new Date().getFullYear()}`;
                
                if (isImageFile(file)) {
                    const dataUrl = await resizeImageForUpload(file, {
                        maxWidth: 100,
                        maxHeight: Infinity,
                        keepOriginalSize:true,
                    // maxWidth: 300,
                        // maxHeight: Infinity,
                        // keepOriginalSize:false
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
    async update(param: Record<string, any>): Promise<ApiResponse<TransaksiSerahTerimaDokumenSheetType>> {
        const parameter = {
            data:JSON.stringify([param]),
            key_match:'idbaris',
            key_index:'idbaris',
            action:'upsert',
            schema:JSON.stringify({
                    idbaris:'number',
                    serah_terima_idbaris: 'number',
                    target_person_id: 'number',
                    tgl: 'date',
            }),
        }
        return await this.repo.update(parameter)
    }
    async create(param: Record<string, any>): Promise<ApiResponse<TransaksiSerahTerimaDokumenSheetType>> {
        const parameter = {
            data:JSON.stringify([param]),
            key_match:'idbaris',
            key_index:'idbaris',
            action:'upsert',
            schema:JSON.stringify({
                    idbaris:'number',
                    serah_terima_idbaris: 'number',
                    target_person_id: 'number',
                    tgl: 'date',
            }),
        }
        return await this.repo.update(parameter)
    }
}