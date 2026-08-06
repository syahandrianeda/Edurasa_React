import UploadGambarSoalRepository from "../repositories/upload-gambar-soal-repository";
import { encodeFileToBase64, dataURLToFile, isImageFile } from "~/domain/image/file-uploader";
import { resizeImageForUpload } from "~/domain/image/image-resizer";
import urlImgDrive from "~/lib/url-img-drive";
import NoImage from '../../images/noImage.png';

export default class UploadGambarSoalService {
  constructor(public repo = new UploadGambarSoalRepository()) {}

  /** 
   * Uploads a File by encoding to base64 (client-side) and calling AppScript repository.
   * Accepts an optional progress callback `onProgress(percent:number)`.
   * Returns the URL string when available, or empty string on failure.
   */
  async uploadFile(file: File, onProgress?: (p: number) => void, options?: Record<string, any>): Promise<any> {
    let finalFile: File = file;

    try {
      if (isImageFile(file)) {
        onProgress?.(10);
        const dataUrl = await resizeImageForUpload(file, {
            maxWidth: 100,
            maxHeight: Infinity,
            keepOriginalSize:true,
        //   maxWidth: ;//options?.maxWidth ?? 1200,
        //   maxHeight: ;//options?.maxHeight ?? 1200,
        //   keepOriginalSize: options?.keepOriginalSize ?? false,
            mimeType: options?.mimeType,
        });

        onProgress?.(40);
        finalFile = dataURLToFile(dataUrl, file.name);
      }

      onProgress?.(50);
      const encoded = await encodeFileToBase64(finalFile);

      const param = {
        folder: options?.folder ?? "GAMBAR_SOAL",
        subfolder: options?.subfolder ?? "Soal",
        namafile: options?.namafile ?? finalFile.name,
        mimeType: encoded.mimeType,
        base64: encoded.base64,
      };

      onProgress?.(70);
      const resp = await this.repo.uploadFileRepo(param);

      onProgress?.(90);
      // Try extracting url from known shapes
      /**
       * 
            success: true,
            data: respon,
            message:'Upload berhasil',
            source:'API'
       */
      
      const data = resp?.data ?? resp;
      if(resp.success){
        const url = data && urlImgDrive(data.idfile);
        return url;
      }
      return NoImage

    } catch (err) {
      
      onProgress?.(0);
      return NoImage;
    }
  }
}
