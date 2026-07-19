import type { ApiResponse, ParamFile } from "~/configs/appscript-config";
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
        const parameter = {
            data:JSON.stringify([param]),
            key_match:'id',
            key_index:'id',
            action:'upsert',
            schema:JSON.stringify({
                    id:'number',
                    masuk_tgl:'date',
                    keluar_tgl:'date',
                    nis:'string',
                    nisn:'string',
                    pd_tanggallahir:'date',
                    dapo_tahunlahirayah:'date',
                    dapo_tahunlahiribu:'date',
                    dapo_beratbadan:'number',
                    dapo_tinggibadan:'number',
                    dapo_lingkarkepala:'number',
                    dapo_jumlahsaudarakandung:'number',
                    dapo_jarakrumahkesekolah:'number',
                    pdb_tgl:'date',
                    keluar_tgl2:'date',
                    tanggalijazahtk:'date',
                }),

        }
        
        return await this.repo.update(parameter);
    }
    async create(param:Record<string, any>): Promise<ApiResponse<SiswaType>> {
        /**
         *   const paramUpdate = {
            data: JSON.stringify(param),
            key_match:'idbaris',
            key_index:'idbaris',
            schema:JSON.stringify({
                idbaris:'number',
                sn:'number',
                sl:'number',
                rb:'number',
                km:'number',
                jm:'number',
                sb:'number'
                // kelase:'string'
            }),
            action:'upsert'
        }
         */
        const parameter = {
            data:JSON.stringify(param),
            key_match:'id',
            key_index:'id',
            action:'upsert',
            
            schema:JSON.stringify({
                    id:'number',
                    masuk_tgl:'date',
                    keluar_tgl:'date',
                    nis:'string',
                    nisn:'string',
                    pd_tanggallahir:'date',
                    dapo_tahunlahirayah:'date',
                    dapo_tahunlahiribu:'date',
                    dapo_beratbadan:'number',
                    dapo_tinggibadan:'number',
                    dapo_lingkarkepala:'number',
                    dapo_jumlahsaudarakandung:'number',
                    dapo_jarakrumahkesekolah:'number',
                    pdb_tgl:'date',
                    keluar_tgl2:'date',
                    tanggalijazahtk:'date',
                }),

        }
        return await this.repo.create(parameter)
        // return await this.repo.create(param);
    }
}