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
                    route("mutasi-masuk","routes/mutasi-masuk.tsx"),
                    route("mutasi-keluar","routes/mutasi-keluar.tsx"),
                    route("laporan-mutasi","routes/laporan-mutasi.tsx"),
                    route("statistik-umur","routes/statistik-umur.tsx"),
                    route("statistik-agama","routes/statistik-agama.tsx"),
                    route("cari-siswa","routes/cari-siswa.tsx"),
                    route("format","routes/format-siswa.tsx"),
                    route("input-siswa","routes/input-siswa.tsx"),
                    route("import-file-pd-siswa","routes/import-file-pd-siswa.tsx"),
                    route("update-data-siswa","routes/update-data-siswa.tsx"),
                    route("sinkron-dapodik","routes/sinkron-dapodik.tsx"),
                ]),
            ]),
        ]),
        layout('layouts/provider-layout/crud-kaldik-provider.tsx',[
            layout("layouts/sub-layouts/sub-kaldik.tsx",[
                ...prefix('kaldik',[
                    index("routes/kaldik.tsx"),
                    route("keterangan-kaldik", "routes/kaldik/keterangan-kaldik.tsx"),
                    route("kaldik-semester-1", "routes/kaldik/kaldik-semester-1.tsx"),
                    route("kaldik-semester-2", "routes/kaldik/kaldik-semester-2.tsx"),
                    route("kaldik-setahun", "routes/kaldik/kaldik-setahun.tsx"),
                    route("hari-efektif-semester-1", "routes/kaldik/hari-efektif-semester-1.tsx"),
                    route("hari-efektif-semester-2", "routes/kaldik/hari-efektif-semester-2.tsx"),
                    route("hari-belajar-semester-1", "routes/kaldik/hari-belajar-semester-1.tsx"),
                    route("hari-belajar-semester-2", "routes/kaldik/hari-belajar-semester-2.tsx"),
                    route("jam-belajar-semester-1", "routes/kaldik/jam-belajar-semester-1.tsx"),
                    route("jam-belajar-semester-2", "routes/kaldik/jam-belajar-semester-2.tsx"),
                ])
            ]),
        ]),
        layout('layouts/provider-layout/crud-absensi-provider.tsx',[
            layout("layouts/sub-layouts/sub-absensi-siswa.tsx",[
                ...prefix('absensi-siswa',[
                    index("routes/absensi-siswa.tsx"),
                    route("absensi-hari-ini","routes/absensi/absensi-siswa.tsx"),
                    route("keterangan-kaldik","routes/absensi/keterangan-kaldik.tsx"),
                    route("absensi-bulanan","routes/absensi/absensi-bulanan.tsx"),
                    route("rekap-absensi-siswa","routes/absensi/rekap-absensi-siswa.tsx"),
                    route("rekap-semester-siswa","routes/absensi/rekap-absensi-semester.tsx"),
                    route("rekap-sia-semester","routes/absensi/rekap-sia-semester.tsx"),
                    route("statistik-absensi-bulanan","routes/absensi/statistik-absensi-bulanan.tsx"),
                    route("statistik-absensi-semester","routes/absensi/statistik-absensi-semester.tsx"),
                ])
            ]),
        ]),
        layout('layouts/provider-layout/crud-kurikulum-provider.tsx',[
            layout("layouts/sub-layouts/sub-kurikulum.tsx",[
                ...prefix('kurikulum',[
                    index("routes/kurikulum/index-redirect.tsx"),
                    route("cp","routes/kurikulum/cp-page.tsx"),
                    // route("tp","routes/kurikulum/tp.tsx"),
                    // route("atp","routes/kurikulum/atp.tsx"),
                    // route("mapel","routes/kurikulum/mapel.tsx"),
                    // route("jadwal-pelajaran","routes/kurikulum/jadwal-pelajaran.tsx"),
                    // route("alokasi-waktu","routes/kurikulum/alokasi-waktu.tsx"),
                ])
            ])

        ]),
    ])

] satisfies RouteConfig;
