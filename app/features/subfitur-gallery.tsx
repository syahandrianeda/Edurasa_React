import { FileArchive, HandshakeIcon, SquareParkingOffIcon } from "lucide-react";
import type { typeSidebarFiturKonten } from "~/types";

export const SubFiturGallery: typeSidebarFiturKonten[]=[
    {
        groupTitle:'Galeri Kegiatan Sekolah',
        breadCrumbs:[
            {
                title: 'Galeri Kegiatan Sekolah',
                href: '/gallery/gallery-schools',
                icon: SquareParkingOffIcon,
                description:'Galeri dokumen sekolah',
                permission: 'view gallery'
            }
        ]
    },
    {
        groupTitle: 'Serah Terima Dokumen',
        breadCrumbs: [
            {
                title: 'Buat Daftar',
                href: '/gallery/create-daftar-serah-terima-dokumen',
                icon: FileArchive,
                description:'Buat daftar serah terima dokumen (Misal serah terima rapor, buku paket, dll)',
                permission: 'view gallery'
            },
            {
                title: 'Input Serah Terima',
                href: '/gallery/form-data-serah-terima-dokumen',
                icon: HandshakeIcon,
                description:'Input data serah terima dokumen yang telah dibuat',
                permission: 'view gallery'
            },
        ]
    }, 
    
]