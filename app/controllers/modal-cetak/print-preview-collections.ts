import type { ModalState } from "~/components/modals/modal-provider";

export default function isPrintPreviewModal(type:ModalState['type']):boolean{
    return [
            "PRINT PREVIEW", 
            "PRINT PREVIEW SPPD", 
            "PRINT PREVIEW SURAT TUGAS",
            "PRINT NOTULA RAPAT",
            'NOTULA RAPAT' , 
            'PRINT SUKET SISWA AKTIF',
            'PRINT SUKET KELAKUAN BAIK',
            'PRINT SUKET NISN',
            'PRINT SUKET PINDAHAN',
            'PRINT SUKET MUTASI',
            'PRINT SUKET SISWA AKTIF FORMAT LAMPIRAN',
            'PRINT SUKET KELAKUAN BAIK FORMAT LAMPIRAN',
            'PRINT SUKET NISN FORMAT LAMPIRAN',
            'PRINT SUKET PINDAHAN FORMAT LAMPIRAN',
            'PRINT SUKET MUTASI FORMAT LAMPIRAN',
            'PRINT DAFTAR SERAH TERIMA'
        ].includes(type!)
}