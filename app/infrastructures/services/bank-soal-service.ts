import type { ApiResponse, ParamFile } from "~/configs/appscript-config";
import { dataURLToFile, encodeFileToBase64, isImageFile } from "~/domain/image/file-uploader";
import { resizeImageForUpload } from "~/domain/image/image-resizer";
import type { BankSoalRepositoryInterface } from "~/domain/interfaces/bank-soal-repository-interface";
import type { BankSoalServiceInterface } from "~/domain/interfaces/bank-soal-service-interface";
import BankSoalRepository from "../repositories/bank-soal-repository";
import type { BankSoalSheetType } from "~/types/bank-soal/bank-soal-type";

export default class BanksoalService implements BankSoalServiceInterface{
    constructor(public repo:BankSoalRepositoryInterface = new BankSoalRepository()){

    }
    
    async uploadFile(file: File, options?: Record<string, any>): Promise<any> {
        let finalFile = file;
        const namaFolderTapel = `Gambar Soal Edura ${new Date().getFullYear()}`;
                
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
    async update(param: Record<string, any>): Promise<ApiResponse<BankSoalSheetType>> {
        const parameter = {
            data:JSON.stringify([param]),
            key_match:'idbaris',
            key_index:'idbaris',
            action:'upsert',
            schema:JSON.stringify({
                    idbaris:'number',
                    kd_id: 'number',
                    jenjang_khusus: 'number',
                    
            }),
        }
        return await this.repo.update(parameter)
    }
    async create(param: Record<string, any>): Promise<ApiResponse<BankSoalSheetType>> {
        const parameter = {
            data:JSON.stringify([param]),
            key_match:'idbaris',
            key_index:'idbaris',
            action:'upsert',
            schema:JSON.stringify({
                    idbaris:'number',
                    kd_id: 'number',
                    jenjang_khusus: 'number',
                    
            }),
        }
        return await this.repo.update(parameter)
    }
    
}