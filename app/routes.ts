import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    layout("layouts/auth-layout.tsx",[
        route("login","routes/login.tsx"),
    ]),
    layout("layouts/home-layout.tsx",[
        index("routes/home.tsx"),
        route("about","routes/about.tsx"),
        
    ]),

    layout("layouts/menu-layout.tsx",[
        route("menu","routes/app-menu.tsx"),
    ]),
    
    
    layout("layouts/app-layout.tsx",[
        layout("layouts/sub-layouts/sub-setting-sekolah.tsx",[
            ...prefix('setting-sekolah',[
                index('routes/redirect-setting-sekolah.tsx'),
                route('tempat-tugas',"routes/data-sekolah.tsx"),
                route('riwayat-tempat-tugas',"routes/riwayat-tempat-tugas.tsx"),
                ]),
            ]),
            
        layout('layouts/provider-layout/crud-kesiswaan-provider.tsx',[
            layout("layouts/sub-layouts/sub-data-siswa.tsx",[
                ...prefix('kesiswaan',[
                    index('routes/kesiswaan.tsx'),
                    route("rombelku","routes/data-siswa.tsx"),
                    route("jenjangku","routes/data-siswa-jenjang.tsx"),
                ]),
            ]),
        ]),
        layout("layouts/sub-layouts/sub-absensi-siswa.tsx",[
            route("absensi-siswa","routes/absensi-siswa.tsx"),
        ]),
        layout("layouts/sub-layouts/sub-kaldik.tsx",[
            route("kaldik","routes/kaldik.tsx"),
        ]),

    ]),
   
    

] satisfies RouteConfig;
