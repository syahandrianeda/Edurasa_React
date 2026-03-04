import { Agama } from "~/types/enums/agama";
import type { InterfaceMapel } from "~/types/mapel";

// lihat refrensi di sheet materi
export const KoleksiMapel: InterfaceMapel[]=[
    {
        id:2,
        nama:'Pendidikan Agama Islam dan Budi Pekerti',
        kode:'PAI',
        kode_umum:'PA',
        muatan:'Nasional',
        grup:'A',
        kelompok:'Agama',
        penganut:Agama.ISLAM
    },
    {
        id:3,
        nama:'Pendidikan Agama Kristen dan Budi Pekerti',
        kode:'PKRIS',
        kode_umum:'PA',
        muatan:'Nasional',
        grup:'A',
        kelompok:'Agama',
        penganut:Agama.KRISTEN
    },
    {
        id:4,
        nama:'Pendidikan Agama Katolik dan Budi Pekerti',
        kode:'PKATO',
        kode_umum:'PA',
        muatan:'Nasional',
        grup:'A',
        kelompok:'Agama',
        penganut:Agama.KATHOLIK
    },
    {
        id:8,
        nama:'Pendidikan Pancasila',
        kode:'PKN',
        kode_umum:'PKN',
        muatan:'Nasional',
        grup:'A',
        kelompok:'Umum'
    },
    {
        id:11,
        nama:'Bahasa Indonesia',
        kode:'BINDO',
        kode_umum:'BINDO',
        muatan:'Nasional',
        grup:'A',
        kelompok:'Umum'
    },
    {
        id:13,
        nama:'Matematika',
        kode:'MTK',
        kode_umum:'MTK',
        muatan:'Nasional',
        grup:'A',
        kelompok:'Umum'
    },
    {
        id:15,
        nama:'Ilmu Pengetahuan Alam dan Sosial',
        kode:'IPAS',
        kode_umum:'IPAS',
        muatan:'Nasional',
        grup:'A',
        kelompok:'Umum'
    },
    {
        id:16,
        nama:'Pendidikan Jasmani, Kesehatan, dan Olahraga',
        kode:'PJOK',
        kode_umum:'PJOK',
        muatan:'Nasional',
        grup:'A',
        kelompok:'Umum'
    },
    {
        id:18,
        nama:'Seni Rupa',
        kode:'RUPA',
        kode_umum:'SBDP',
        muatan:'Nasional',
        grup:'B',
        kelompok:'Umum'
    },
    {
        id:22,
        nama:'Bahasa dan Sastera Sunda',
        kode:'BSUND',
        kode_umum:'BSUND',
        muatan:'Lokal',
        grup:'B',
        kelompok:'Pilihan'
    },
    {
        id:23,
        nama:'Bahasa Inggris',
        kode:'BING',
        kode_umum:'BING',
        muatan:'Lokal',
        grup:'B',
        kelompok:'Pilihan'
    },
]