import type { ModalType } from "~/components/modals/modal-type";
import type { templateSuratType } from "~/domain/surat/template-surat";

export default function switchModalTypeTemplate(template:templateSuratType):ModalType{
    switch(template){
        case "Surat Keterangan Aktif":
            return 'PRINT SUKET SISWA AKTIF';
        case "Surat Keterangan Diterima di sekolah":
            return "PRINT SUKET PINDAHAN";
        case "Surat Keterangan NISN":
            return "PRINT SUKET NISN";
        case "Surat Keterangan Pindah sekolah":
            return "PRINT SUKET MUTASI"
        case "Surat Keterangan Berkelakuan Baik":
            return "PRINT SUKET KELAKUAN BAIK"
        default:
            return null
    }
}