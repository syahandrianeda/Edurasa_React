import { MenuIcons } from "~/lib/import-img-menu";
import { isSameUrl } from "~/lib/utils";
import type { typeKoleksiMenu } from "~/types";



export const DataMenu: typeKoleksiMenu[] = [
    // {
    //     title: "Approval", 
    //     routeName: "approval",
    //     urlIcon: MenuIcons["sosial"],
    //     permission: 'view approval',
    // },
    {
        title: "Admin Panel", 
        routeName: "admin-panel",
        urlIcon: MenuIcons["admin-panel"],
        permission: 'view admin-panel',
        
    },
    // {
    //     title: "Identitas Sekolah", 
    //     routeName: "setting-sekolah",
    //     urlIcon: MenuIcons["sekolah-indonesia"],
    //     permission: 'view setting sekolah',
    // },
    {
        title: "Data Siswa", 
        routeName: "kesiswaan",
        urlIcon: MenuIcons["data-siswa"],
        permission: 'view data-siswa',
        hasRoute:true
    },
    
    {
        title: "Absensi Siswa", 
        routeName: "absensi-siswa",
        urlIcon: MenuIcons["absensi-siswa"],
        permission: 'view absensi-siswa',
        hasRoute:true
    },
    {
        title: "Kalender Pendidikan", 
        routeName: "kaldik",
        urlIcon: MenuIcons["kalender-pendidikan"],
        permission: 'view kaldik',
        hasRoute:true
    },
    
    {
        title: "Kurikulum", 
        routeName: "kurikulum",
        urlIcon: MenuIcons["lg_hand_book"],
        permission: 'view kurikulum',
        hasRoute:true
    },
    // {
    //     title: "Program Pembelajaran", 
    //     routeName: "program-pembelajaran",
    //     urlIcon: MenuIcons["program-pembelajaran"],
    //     permission: 'view program-pembelajaran',
    // },
    {
        title: "Modul Ajar", 
        routeName: "modul-ajar",
        urlIcon: MenuIcons["rpp"],
        permission: 'view modul-ajar',
    },
    
    {
        title: "Bank Soal", 
        routeName: "bank-soal",
        urlIcon: MenuIcons["banksoal"],
        permission: 'view bank-soal',
        hasRoute:true
    },
    {
        title: "KBM Asesmen", 
        routeName: "penilaian",
        urlIcon: MenuIcons["kbm"],
        permission: 'view kbm',
        hasRoute:true
    },
    
    {
        title: "Remedial Pengayaan", 
        routeName: "remedial",
        urlIcon: MenuIcons["remedial-pengayaan"],
        permission: 'view remedial pengayaan',
    },
    {
        title: "Pengolahan Raport", 
        routeName: "raport",
        urlIcon: MenuIcons["raport"],
        permission: 'view raport',
    },
    {
        title: "Buku Induk", 
        routeName: "buku-induk",
        urlIcon: MenuIcons["lg_tumpukan_buku"],
        permission: 'view buku-induk',
        hasRoute:true
    },
    {
        title: "Kokuler", 
        routeName: "Kokuler",
        urlIcon: MenuIcons["kokuler"],
        permission: 'view kokuler',
    },
    {
        title: "Program Literasi", 
        routeName: "program-literasi",
        urlIcon: MenuIcons["literasi"],
        permission: 'view program-literasi',
    },
    {
        title: "Program Supervisi", 
        routeName: "program-supervisi",
        urlIcon: MenuIcons["supervisi"],
        permission: 'view program-supervisi',
    },
    {
        title: "Kehadiran Guru", 
        routeName: "kehadiran-guru",
        urlIcon: MenuIcons["PTK"],
        permission: 'view kehadiran-guru',
    },
    {
        title: "Arsip Surat", 
        routeName: "arsip-surat",
        urlIcon: MenuIcons["data_lemari"],
        permission: 'view arsip-surat',
        hasRoute:true
    },
    {
        title: "Arsip Aplikasi", 
        routeName: "arsip-aplikasi",
        urlIcon: MenuIcons["arsip"],
        permission: 'view arsip-aplikasi',   
    },
    {
        title: "Galeri File", 
        routeName: "gallery",
        urlIcon: MenuIcons["galeri"],
        permission: 'view arsip-dokumen',
        hasRoute:true   
    },
    {
        title: "Olah Keuangan", 
        routeName: "tabungan",
        urlIcon: MenuIcons["tabungan"],
        permission: 'view tabungan',   
        hasRoute:true
    },


    /** FItur untuk siswa */
    {
        title: "Informasiku", 
        routeName: "menu-siswa",
        urlIcon: MenuIcons["admin-panel"],
        permission: 'view fitur siswa',   
        hasRoute:true,
        classNameIcon:'col-span-4 md:col-span-8',
        showInRoute:true
        
    },
    {
        title: "Kehadiranku", 
        routeName: "kehadiranku",
        urlIcon: MenuIcons["absensi-siswa"],
        permission: 'view fitur siswa',   
        hasRoute:true
    },
    {
        title: "Ulanganku", 
        routeName: "ulanganku",
        urlIcon: MenuIcons["rpp"],
        permission: 'view fitur siswa',   
        hasRoute:true
    },
    {
        title: "7 Pembiasaanku", 
        routeName: "aku-anak-hebat",
        urlIcon: MenuIcons["rpp"],
        permission: 'view fitur siswa',   
        // hasRoute:true
    },
    {
        title: "Dataku", 
        routeName: "dataku",
        urlIcon: MenuIcons["data_lemari"],
        permission: 'view fitur siswa',   
        // hasRoute:true
    },
    {
        title: "Literasiku", 
        routeName: "literasiku",
        urlIcon: MenuIcons["literasi"],
        permission: 'view fitur siswa',   
        // hasRoute:true
    },
    {
        title: "Nilai Raportku", 
        routeName: "raportku",
        urlIcon: MenuIcons["raport"],
        permission: 'view fitur siswa',
        // hasRoute:true
    },
    {
        title: "Kegiatan Ekskulku", 
        routeName: "ekstrakurikulerku",
        urlIcon: MenuIcons["ekskrakurikuler"],
        permission: 'view fitur siswa',
        // hasRoute:true
    },
    {
        title: "Tabunganku", 
        routeName: "tabunganku",
        urlIcon: MenuIcons["tabungan"],
        permission: 'view fitur siswa',
        // hasRoute:true
    },
];