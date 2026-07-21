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

        layout('layouts/sub-layouts/sub-setting-sekolah.tsx',[
            ...prefix('setting-sekolah',[
                index('routes/redirect-setting-sekolah.tsx'),
                route('tempat-tugas',"routes/data-sekolah.tsx"),
                route('riwayat-tempat-tugas',"routes/riwayat-tempat-tugas.tsx"),
                ]),
            ]),
        layout("layouts/provider-layout/app-provider-service.tsx",[
            layout("layouts/sub-layouts/sub-profile.tsx",[
                ...prefix('profile',[
                    index("routes/profile/index-redirect-profile.tsx"),
                    route("about","routes/profile/about.tsx"), 
                    // route("contact","routes/profile/contact.tsx"),
                    // route("my-document","routes/profile/my-document.tsx"),
                    // route("tugas-mengajar","routes/profile/tugas-mengajar.tsx"),
                    // route("riwayat-tugas-mengajar","routes/profile/riwayat-tugas-mengajar.tsx")
                ])
            ]),
            layout("layouts/sub-layouts/sub-buku-induk.tsx",[
                ...prefix("buku-induk",[
                    index("routes/buku-induk/redirect-ringkasan.tsx"),
                    route("ringkasan","routes/buku-induk/ringkasan.tsx"),
                    route("rekap","routes/buku-induk/rekap-induk.tsx"),
                    // route("arsip-siswa","routes/buku-induk/arsip-siswa.tsx"),
                    // route("klepper-induk","routes/buku-induk/arsip-siswa.tsx"),
                    // route("klepper-angkatan","routes/buku-induk/arsip-siswa.tsx"),
                    // route("data-ijazah","routes/buku-induk/arsip-siswa.tsx"),

                ])
            ]),
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
            layout("layouts/sub-layouts/sub-kurikulum.tsx",[
                ...prefix('kurikulum',[
                    index("routes/kurikulum/index-redirect-kurikulum.tsx"),
                    route("cp","routes/kurikulum/cp-page.tsx"),
                    route("tp","routes/kurikulum/tp-page.tsx"),
                    route("atp","routes/kurikulum/atp-page.tsx"),
                    route("mapel","routes/kurikulum/mapel-route.tsx"),
                    route("jadwal-pelajaran","routes/kurikulum/jadwal-pelajaran.tsx"),
                    route("all-jadwal-pelajaran","routes/kurikulum/jadwal-pelajaran-all.tsx"),
                    route("program-tahunan","routes/kurikulum/program-tahunan.tsx"),
                    route("program-semester","routes/kurikulum/program-semester.tsx"),
                    // route("alokasi-waktu","routes/kurikulum/alokasi-waktu.tsx"),
                ])
            ]),
            layout("layouts/sub-layouts/sub-bank-soal.tsx",[
                ...prefix('bank-soal',[
                    index("routes/bank-soal/index-redirect-bank-soal.tsx"),
                    route("create-item-soal","routes/bank-soal/create-item-soal.tsx"),
                    route("koleksi-bank-soal","routes/bank-soal/koleksi-bank-soal.tsx"),
                    route("create-paket-soal","routes/bank-soal/create-paket-soal.tsx"),
                    route("koleksi-paket-soal","routes/bank-soal/koleksi-paket-soal.tsx"),
                    route("taksonomi-bloom","routes/bank-soal/taksonomi-bloom.tsx"),

                ],
                )
            ]),
            //app\layouts\sub-layouts\sub-tabungan-siswa.tsx
            layout("layouts/sub-layouts/sub-tabungan-siswa.tsx",[
                ...prefix('tabungan',[
                    index('routes/tabungan/redirect-tabungan.tsx'),
                    route('tabungan-siswa', 'routes/tabungan/tabungan-siswa-route.tsx'),
                    route('rekap-tabungan-siswa', 'routes/tabungan/rekap-tabungan-siswa-route.tsx'),
                    // route('kategori-kuangan', 'routes/tabungan/kategori-kuangan-route.tsx'),
                    // route('debit-kredit', 'routes/tabungan/debit-kredit-route.tsx'),
                    // route('rekap-debit-kredit', 'routes/tabungan/rekap-debit-kredit-route.tsx'),
                ])
            ])
        ]),
    ]),


] satisfies RouteConfig;
