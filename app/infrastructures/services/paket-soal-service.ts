import type { PaketSoalRepositoryInterface } from "~/domain/interfaces/paket-soal-repository-interface";
import type { PaketSoalServiceInterface } from "~/domain/interfaces/paket-soal-service-interface";
import PaketSoalRepository from "../repositories/paket-soal-repository";
import { dataURLToFile, encodeFileToBase64, isImageFile } from "~/domain/image/file-uploader";
import { resizeImageForUpload } from "~/domain/image/image-resizer";
import type { ApiResponse, ParamFile } from "~/configs/appscript-config";
import type { PaketSoalSheetType } from "~/types/bank-soal/entities/paket-soal-sheet-type";
import { currentTapel, currentTapelProperties } from "~/lib/current-tapel";
import DtoPaketSoalDesainType from "~/dtos/dto-paket-soal-desain";
import type { PaketSoalDesign } from "~/domain/paket-soal/result/paket-soal";

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
        
        const instancePaketSoal = new DtoPaketSoalDesainType(param as PaketSoalDesign)
        const paramFile = instancePaketSoal.toParamFile();
        const dataJson = instancePaketSoal.toPaketSoalSheetType();
        const parameter = {
            paramFile:JSON.stringify(paramFile),
            data:JSON.stringify([dataJson]),
            key_match:'idbaris',
            key_index:'idbaris',
            action:'upsertUploadTxt',
            schema:JSON.stringify({
                    idbaris:'number',
                    lintas_mapel:'number'
                    
                    
            }),
        }
        return await this.repo.create(parameter);
    }

    async update(param: Record<string, any>): Promise<ApiResponse<PaketSoalSheetType>> {
        const parameter = {
            data: JSON.stringify([param]),
            key_match: 'idbaris',
            key_index: 'idbaris',
            action:'upsert',
            schema:JSON.stringify({
                    idbaris:'number',
                    lintas_mapel:'number'
                    
                    
            }),


        }
        // const instancePaketSoal = new DtoPaketSoalDesainType(param as PaketSoalDesign)
        // const paramFile = instancePaketSoal.toParamFile();
        // const dataJson = instancePaketSoal.toPaketSoalSheetType();
        // const parameter = {
        //     paramFile:JSON.stringify(paramFile),
        //     data:JSON.stringify([dataJson]),
        //     key_match:'idbaris',
        //     key_index:'idbaris',
        //     action:'upsertUploadTxt',
        //     schema:JSON.stringify({
        //             idbaris:'number',
        //             lintas_mapel:'number',
        //             start_time: 'datetime',
        //             durasi: 'number'
                    
                    
        //     }),
        // }
        return await this.repo.update(parameter);
    }
}