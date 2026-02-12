import type { ApiResponse, ParamFile } from "~/configs/appscript-config";
import type { ParamUpsert } from "~/configs/appscript-sheet";
import type { AbsensiServiceInterface } from "~/domain/interfaces/absensi-service-interface";
import type { AbsensiSiswaSheetType, AbsensiSiswaType } from "~/types/absensi-siswa";
import AbsensiRepositoryImplements from "../repositories/absensi-repository";
import { getNumberFromString } from "~/lib/get-number";
import { dataURLToFile, encodeFileToBase64, isImageFile } from "~/domain/image/file-uploader";
import { resizeImageForUpload } from "~/domain/image/image-resizer";
import { currentTapel, currentTapelProperties } from "~/lib/current-tapel";

export default class AbsensiServiceImplements implements AbsensiServiceInterface{
    constructor(public repo = new AbsensiRepositoryImplements()){}

    async loadAbsensiAndKaldik(rombel:string): Promise<ApiResponse<Record<string, any>>[]> {
        const jenjang = getNumberFromString(rombel);
        
        this.repo.paramSheetKaldikTabKaldik = {};
        
        this.repo.CreateParamSheetAbsensiJenjang(jenjang,{filter:JSON.stringify({kelas:rombel})})
        
        return await this.repo.loadAbsensiAndKaldik()
    }
    async refreshAbsensi(rombel: string): Promise<ApiResponse<Record<string, any>>> {
        const jenjang = getNumberFromString(rombel);
        
        this.repo.CreateParamSheetAbsensiJenjang(jenjang,{action:'read',filter:JSON.stringify({kelas:rombel})})
        return await this.repo.refreshAbsensi()
    }
    /** useCrud Provider */

    
    async uploadFile(file:File, options?:Record<string, any>): Promise<any>{
        let finalFile = file;
        const namaFolderTapel = `POTO ABSEN EDURA ${new Date().getFullYear()}`;
        
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
        
        return await this.repo.uploadFileRepo(dataParam)
    }

    async create(param: Record<string, any>): Promise<ApiResponse<AbsensiSiswaSheetType>> {
        return await this.repo.create(param);
    }
    async update(param:Record<string, any>): Promise<ApiResponse<AbsensiSiswaSheetType>> {
        const jenjang = getNumberFromString(param.rombel);
        const paramUpdate = {
            data: param.data,
            key_match:'idbaris',
            key_index:'idbaris',
            schema:JSON.stringify({
                Time_Stamp:'datetime',
                idbaris:'number',
                tokensiswa:'number',
                id:'string'
            }),
            action:'upsert'
        }
        this.repo.CreateParamSheetAbsensiJenjang(jenjang,{...paramUpdate,filter:JSON.stringify({kelas:param.rombel})})
        
        return await this.repo.update(param);
    }

}