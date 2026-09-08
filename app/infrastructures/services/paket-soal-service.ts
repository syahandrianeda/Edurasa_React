import type { PaketSoalRepositoryInterface } from "~/domain/interfaces/paket-soal-repository-interface";
import type { PaketSoalServiceInterface } from "~/domain/interfaces/paket-soal-service-interface";
import PaketSoalRepository from "../repositories/paket-soal-repository";
import { dataURLToFile, encodeFileToBase64, isImageFile } from "~/domain/image/file-uploader";
import { resizeImageForUpload } from "~/domain/image/image-resizer";
import type { ApiResponse, ParamFile } from "~/configs/appscript-config";
import type { PaketSoalSheetType } from "~/types/bank-soal/entities/paket-soal-sheet-type";

export default class PaketSoalService implements PaketSoalServiceInterface{
    constructor(public repo:PaketSoalRepositoryInterface = new PaketSoalRepository()){}

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

    async create(param: Record<string, any>): Promise<ApiResponse<PaketSoalSheetType>> {
        return await this.repo.create(param);
    }

    async update(param: Record<string, any>): Promise<ApiResponse<PaketSoalSheetType>> {
        return await this.update(param);
    }
}