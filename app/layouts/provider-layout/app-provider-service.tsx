
import { Outlet } from "react-router";
import type { Route } from "./+types/app-provider-service";
import { useAppSelector } from "~/context-reduct/hook";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { DataSheetNeeeded } from "~/domain/enloaded/data-sheet-needed-type";
import { store } from "~/context-reduct/redux-provider";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import EnsurLoadedApiService from "~/infrastructures/ensure-loaded-api/EnsureLoadedApiService";
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import { toast } from "sonner";
import { IndDbSiswaRepository } from "~/infrastructures/indexDb/db-datasiswa-repository";
import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import { getNumberFromString } from "~/lib/get-number";
import getFaseByRombel from "~/lib/get-fase-by-rombel";
import { SiswaCrudProvider } from "~/controllers/data-siswa-controller/kesiswaan-controller";
import KesiswaanServiceImplements from "~/infrastructures/services/kesiswaan-service-implements";
import { KaldikCrudProvider } from "~/controllers/kaldik-controller/crud-provider-controller/kaldik-crud-provider";
import { AbsensiCrudProvider } from "~/controllers/absensi-controllers/crud-provider/absensi-crud-provider";
import KaldikServiceImplements from "~/infrastructures/services/kaldik-service-implements";
import AbsensiServiceImplements from "~/infrastructures/services/absensi-service-implements";
import { CrudMapelRombel } from "~/controllers/mapel/crud/crud-mapelrombel-provider";
import { CrudElemenCpProvider } from "~/controllers/kurikulum/crud/crud-elemen-cp-provider";
import { CrudTpFaseProvider } from "~/controllers/kurikulum/crud/crud-tp-fase-provider";
import { CrudAtpProvider } from "~/controllers/kurikulum/crud/crud-atp-provider";
import { SettingJadwalCrudProvider } from "~/controllers/jadwal_pelajaran/crud/crud-setting-jadwal-provider";
import { SebaranJadwalCrudProvider } from "~/controllers/jadwal_pelajaran/crud/crud-sebaran-jadwal-provider";
import { CrudProtaProvider } from "~/controllers/prota/crud/crud-prota-provider";
import MapelRombelServiceImplements from "~/infrastructures/services/mapelrombel-service-implements";
import ElemenCpServiceImplements from "~/infrastructures/services/elemencp-service-implements";
import FaseTpServiceImplements from "~/infrastructures/services/fase-tp-service-implements";
import AtpServiceImplements from "~/infrastructures/services/atp-service-implements";
import SettingJadwalService from "~/infrastructures/services/setting-jadwal-service";
import JadwalMapelServiceImplements from "~/infrastructures/services/sebaran-jadwal-mapel";
import ProtaServiceImplements from "~/infrastructures/services/prota-service-implements";
import { namaTab } from "~/lib/nama-tab-environment";
import { setAllSiswa } from "~/context-reduct/global-state/siswa-slice";
import BuildParamLoaded from "~/infrastructures/ensure-loaded-api/build-param-loaded";
import { CrudTabunganProvider } from "~/controllers/tabungan/crud/crud-tabungan-provider";
import TabunganServiceImplements from "~/infrastructures/services/tabungan-service-implements";
import { FokusRombelKeuangan } from "~/context-reduct/selectores/rombel-tabungan-selector";
import SuratKeluarService from "~/infrastructures/services/surat-keluar-service";
import { SuratKeluarCrudProvider } from "~/controllers/surat/crud/surat-keluar-crud-provider";
import { CrudSppdProvider } from "~/controllers/surat/crud/sppd-crud-provider";
import SppdService from "~/infrastructures/services/sppd-service";
import SuratMasukService from "~/infrastructures/services/surat-masuk-service";
import { SuratMasukCrudProvider } from "~/controllers/surat/crud/surat-masuk-crud-provider";
import PangkatGolonganService from "~/infrastructures/services/PangkatGolonganService";
import { CrudPangkatGolonganProvider } from "~/controllers/tendik/crud/crud-tendik-provider";
import { CrudSerahTerimaProvider } from "~/controllers/serah-terima-dokumen/cruds/crud-provider-serah-terima-dokumen";
import SerahTerimaDokumenService from "~/infrastructures/services/serah-terima-dokumen-service";
import { CrudTransaksiSerahTerimaProvider } from "~/controllers/transaksi-serah-terima-dokumen/crud-provider-transaksi-serah-terima";
import TransaksiSerahTerimaDokumenService from "~/infrastructures/services/transaksi-serah-terima-service";
import DispatchingResponseToFokusUi from "~/lib/dispatching-response-to-fokus-ui";
import { CrudBankSoalProvider } from "~/controllers/bank-soal/cruds/crud-provider-bank-soal";
import BanksoalService from "~/infrastructures/services/bank-soal-service";
import { CrudPaketSoalProvider } from "~/controllers/paket-soal/crud/paket-soal-crud-provider";
import PaketSoalService from "~/infrastructures/services/paket-soal-service";
import { CrudPublikasiPaketSoalProvider } from "~/controllers/publikasi-paket-soal/crud/crud-publikasi-paket-provider";
import PubliksiPaketSoalService from "~/infrastructures/services/publikasi-paket-service";


export default function AppProviderLayoutService({
    matches,
}: Route.ComponentProps) {

    /**
     * ============================================================
     * STATE / REDUX
     * ============================================================
     */

    const st = store.getState();

    const user = useAppSelector( state => state.auth.user );

    const rombel = useAppSelector( s => s.fokusRombel.value ) ?? getSessionRombel();

    const rombelKeuangan = useAppSelector(FokusRombelKeuangan);


    /**
     * ============================================================
     * LOADER DATA DARI ROUTE
     * ============================================================
     */

    const loaderDataKiriman = matches.at(-1)?.loaderData as {
        toolbarTabs?: TabsConfigProps;
        titleTambahan: string;
        pesanLoading?: string;
        controlKelas?: controlDropdownKelas;
        addPesanRombel?: {
            isAdd: boolean;
            type: "jenjang" | "rombel";
            includeFaseName?: boolean;
        };
        sheetNeeded?: (v?: string) => DataSheetNeeeded[];
        mustLoadSheetNeedSiswaIfExist?: boolean;
        sourceKelas?: string;
    };


    /**
     * ============================================================
     * TEXT LOADING
     * ============================================================
     */

    const textLoading = loaderDataKiriman?.pesanLoading ?? `Memuat data yang dibutuhkan ${loaderDataKiriman.titleTambahan}`;

    const textRombelJenjang = loaderDataKiriman?.addPesanRombel?.type === "jenjang"
            ? getNumberFromString(rombel)
            : rombel;

    const textFase = loaderDataKiriman?.addPesanRombel && (
            loaderDataKiriman.addPesanRombel.includeFaseName
                ? `/Fase ${getFaseByRombel(rombel)}`
                : ""
        ) || "";

    const textRombelFase = loaderDataKiriman?.addPesanRombel?.isAdd
            ? ` di kelas ${textRombelJenjang}${textFase}`
            : "";


    /**
     * ============================================================
     * INFRASTRUCTURE SERVICE
     *
     * Tetap dipertahankan seperti kode asli.
     * Belum ada perubahan arsitektur.
     * ============================================================
     */

    /** semua infrastructure service diinstansiasi di sini */;
    const sericeSiswa                           = new KesiswaanServiceImplements();
    const serviceKaldik                         = new KaldikServiceImplements();
    const serviceAbsensi                        = new AbsensiServiceImplements();
    const serviceMapelRombel                    = new MapelRombelServiceImplements();
    const serviceElemen                         = new ElemenCpServiceImplements();
    const serviceTpFase                         = new FaseTpServiceImplements();
    const serviceAtp                            = new AtpServiceImplements();
    const serviceSettingJadwal                  = new SettingJadwalService();
    const serviceSebaranJadwal                  = new JadwalMapelServiceImplements();
    const serviceProta                          = new ProtaServiceImplements();
    const serviceTabungan                       = new TabunganServiceImplements();
    const serviceSuratKeluar                    = new SuratKeluarService();
    const serviceSuratMasuk                     = new SuratMasukService();
    const serviceSppd                           = new SppdService();
    const servicePangkatGolongan                = new PangkatGolonganService();
    const serviceSerahTerimaDokumen             = new SerahTerimaDokumenService();
    const serviceTransaksiSerahTerimaDokumen    = new TransaksiSerahTerimaDokumenService();
    const serviceBankSoal                       = new BanksoalService();
    const servicePaketSOal                      = new PaketSoalService();
    const servicePublikasiPaketSoal             = new PubliksiPaketSoalService()

   

    /**
     * ============================================================
     * INDEX DB SISWA
     *
     * Tetap seperti kode asli.
     * ============================================================
     */

    const indexDbSiswa = useCallback(
        async () =>
            await new IndDbSiswaRepository().getAll(),
        []
    );


    /**
     * ============================================================
     * BUILD REQUEST PARAMETER
     *
     * Tidak diubah.
     * ============================================================
     */

    const reqParam = useMemo(() => {

        if ( loaderDataKiriman.sheetNeeded && typeof loaderDataKiriman.sheetNeeded === "function" ) {

            const decidedRombel =
                loaderDataKiriman?.sourceKelas
                    ? rombelKeuangan?.rombel
                    : rombel;

            return loaderDataKiriman.sheetNeeded(
                decidedRombel
            );
        }

        if ( Array.isArray( loaderDataKiriman.sheetNeeded ) ) {

            return loaderDataKiriman.sheetNeeded;
        }

        return;

    }, [
        rombel,
        loaderDataKiriman.sheetNeeded,
        loaderDataKiriman?.sourceKelas,
        rombelKeuangan?.rombel,
    ]);


    /**
     * ============================================================
     * BUILD DATA ENLOADED
     *
     * Tidak diubah.
     * ============================================================
     */

    const instDataEnloaded = useMemo(() => {

        if (!reqParam) {
            return;
        }

        return new BuildParamLoaded( st, reqParam ).evaluate();

    }, [
        st,
        reqParam,
    ]);


    /**
     * ============================================================
     * LOAD CONTROL
     *
     * loadingRef
     * ----------------
     * Mencegah request berjalan bersamaan.
     *
     * loadedRef
     * ----------------
     * Menyimpan loadKey yang SUDAH berhasil.
     *
     * Keduanya berbeda fungsi.
     * ============================================================
     */

    const loadingRef = useRef(false);
    const loadedRef = useRef<Set<string>>(new Set());

    /**
     * ============================================================
     * LOAD KEY
     *
     * Setiap kombinasi kebutuhan data mempunyai key sendiri.
     *
     * Contoh:
     *
     * 1A + sheet A,B  -> key A
     * 1B + sheet A,B  -> key B
     *
     * Jadi ketika rombel berubah, request baru tetap bisa dilakukan.
     * ============================================================
     */

    const loadKey = useMemo(() => {

        if (!reqParam?.length) {
            return null;
        }

        const decidedRombel = loaderDataKiriman?.sourceKelas
                ? rombelKeuangan?.rombel
                : rombel;

        return JSON.stringify({
            rombel: decidedRombel,
            param: reqParam,
        });

    }, [
        reqParam,
        rombel,
        rombelKeuangan?.rombel,
        loaderDataKiriman?.sourceKelas,
    ]);


    /**
     * ============================================================
     * BUILD STORE
     * ============================================================
     */

    const buildStore = useCallback(async () => {

        /**
         * Tidak ada request kalau tidak mempunyai loadKey.
         */
        if (!loadKey) {
            return;
        }


        /**
         * ========================================================
         * CEK 1
         *
         * Data untuk kebutuhan ini sudah pernah berhasil dimuat.
         *
         * Jangan request lagi.
         * ========================================================
         */

        if ( loadedRef.current.has(loadKey) ) {
            return;
        }


        /**
         * ========================================================
         * CEK 2
         *
         * Ada request yang sedang berjalan.
         *
         * Jangan membuat request kedua.
         * ========================================================
         */

        if ( loadingRef.current ) {

            return;
        }


        /**
         * Tandai bahwa request sedang berjalan.
         */

        loadingRef.current = true;


        try {

            /**
             * ====================================================
             * SERVICE API
             * ====================================================
             */

            const api = new EnsurLoadedApiService();
            /**
             * ====================================================
             * INDEX DB
             * ====================================================
             */

            const db = await indexDbSiswa();
            /**
             * ====================================================
             * PASTIKAN PARAMETER TERSEDIA
             * ====================================================
             */

            if ( !instDataEnloaded?.param || instDataEnloaded.param.length === 0 ) {

                return;
            }


            /**
             * ====================================================
             * FILTER DATA SISWA
             *
             * Logika asli dipertahankan.
             * ====================================================
             */

            const param = !loaderDataKiriman?.mustLoadSheetNeedSiswaIfExist
                    ? instDataEnloaded.param.filter( s => s.tab !== namaTab("datasiswa") )
                    : instDataEnloaded.param;


            /**
             * ====================================================
             * JIKA SISWA SUDAH ADA DI INDEX DB
             * ====================================================
             */

            if ( db.length > 0 && st.dataSiswa.data.length === 0 ) {

                store.dispatch(
                    setAllSiswa({
                        data: db,
                        name: "datasiswa",
                        loaded: true,
                        source: "indexDB",
                    })
                );
            }


            /**
             * ====================================================
             * TIDAK ADA PARAMETER API
             * ====================================================
             */

            if ( param.length === 0 ) {

                return;
            }
            // console.log(param)

            /**
             * ====================================================
             * API REQUEST
             *
             * Penting:
             *
             * await digunakan supaya kita benar-benar tahu
             * kapan request selesai.
             * ====================================================
             */

            // toast.promise(
            //     api.callNeeded(param),
            //     {
            //         loading: textLoading +
            //             textRombelFase,

            //         success: data => {
            //             // console.log('data respon', { data });
            //             if (data && Array.isArray(data)) {

            //                 const decidedRombel = loaderDataKiriman?.sourceKelas ? rombelKeuangan?.rombel : rombel;


            //                 data.forEach(({ success, data, detailResponse, }) => {

            //                     if (detailResponse) {
            //                         DispatchingResponseToStore(
            //                             success,
            //                             data,
            //                             detailResponse,
            //                             decidedRombel
            //                         );

            //                         DispatchingResponseToFokusUi();
            //                     }
            //                 }
            //                 );
            //             }

            //             return ("Pemanggilan data telah selesai");
            //         },

            //         error:  data=>`Gagal memuat data ${loaderDataKiriman.titleTambahan} \r`+ data,

            //         closeButton: true,
            //     }
            // );
            const reqPromise = toast.promise(
                api.callNeeded(param),
                {
                    loading: textLoading +
                        textRombelFase,

                    success: data => {
                        // console.log('data respon', { data });
                        
                        return ("Pemanggilan data telah selesai");
                    },

                    error:  data=>`Gagal memuat data ${loaderDataKiriman.titleTambahan} \r`+ data,

                    closeButton: true,
                }
            );
            const data = await reqPromise.unwrap();
            if (data && Array.isArray(data)) {

                            const decidedRombel = loaderDataKiriman?.sourceKelas ? rombelKeuangan?.rombel : rombel;


                            data.forEach(({ success, data, detailResponse, }) => {

                                if (detailResponse) {
                                    DispatchingResponseToStore(
                                        success,
                                        data,
                                        detailResponse,
                                        decidedRombel
                                    );

                                    DispatchingResponseToFokusUi();
                                }
                            }
                            );
                        }

            /**
             * ====================================================
             * REQUEST BERHASIL
             *
             * Baru di sini loadKey disimpan.
             *
             * Kalau request gagal, bagian ini tidak akan tercapai.
             * Artinya request berikutnya masih boleh mencoba lagi.
             * ====================================================
             */

            loadedRef.current.add( loadKey );


        } catch (error) {

            /**
             * ====================================================
             * REQUEST GAGAL
             *
             * Jangan masukkan loadKey ke loadedRef.
             *
             * Dengan demikian user masih bisa mencoba request lagi.
             * ====================================================
             */

            // console.error( "[APP PROVIDER] gagal load:", error );


        } finally {

            /**
             * ====================================================
             * REQUEST SELESAI
             *
             * Baik sukses maupun gagal,
             * request tidak lagi dianggap sedang berjalan.
             * ====================================================
             */

            loadingRef.current = false;
        }

    }, [
        loadKey,
        instDataEnloaded?.param,
        loaderDataKiriman?.mustLoadSheetNeedSiswaIfExist,
        loaderDataKiriman?.titleTambahan,
        textLoading,
        textRombelFase,
        rombel,
        rombelKeuangan?.rombel,
        st.dataSiswa.data.length,
        indexDbSiswa,
    ]);


    /**
     * ============================================================
     * EFFECT
     * ============================================================
     *
     * Tidak menggunakan preventSecondLoad lagi.
     *
     * loadKey menjadi identitas kebutuhan data.
     * ============================================================
     */

    useEffect(() => {

        if (!user) { return; }
        if (!instDataEnloaded) { return; }
        if (!loadKey) { return; }
        
        void buildStore();

    }, [
        user,
        instDataEnloaded,
        loadKey,
        buildStore,
    ]);


    /**
     * ============================================================
     * RETURN
     *
     * Pertahankan return asli Anda di sini.
     *
     * Contoh:
     *
     * return <Outlet />;
     *
     * Jika provider Anda menggunakan JSX tertentu,
     * gunakan return yang sekarang.
     * ============================================================
     */

    return (
        <SiswaCrudProvider service={sericeSiswa}>
            <KaldikCrudProvider service={serviceKaldik}>
                <AbsensiCrudProvider service={serviceAbsensi}>
                    <CrudMapelRombel service={serviceMapelRombel}>
                        <CrudElemenCpProvider service={serviceElemen}>
                            <CrudTpFaseProvider service={serviceTpFase}>
                                <CrudAtpProvider service={serviceAtp}>
                                    <SettingJadwalCrudProvider service={serviceSettingJadwal}>
                                        <SebaranJadwalCrudProvider service={serviceSebaranJadwal}>
                                            <CrudProtaProvider service={serviceProta}>
                                                <CrudTabunganProvider service={serviceTabungan}>
                                                    <SuratKeluarCrudProvider service={serviceSuratKeluar}>
                                                        <SuratMasukCrudProvider service={serviceSuratMasuk}>
                                                            <CrudSppdProvider service={serviceSppd}>
                                                                <CrudPangkatGolonganProvider service={servicePangkatGolongan}>
                                                                    <CrudSerahTerimaProvider service={serviceSerahTerimaDokumen}>
                                                                        <CrudTransaksiSerahTerimaProvider service={serviceTransaksiSerahTerimaDokumen}>
                                                                            <CrudBankSoalProvider service={serviceBankSoal}>
                                                                                <CrudPaketSoalProvider service={servicePaketSOal}>
                                                                                    <CrudPublikasiPaketSoalProvider service={servicePublikasiPaketSoal}>
                                                                                        <Outlet/>
                                                                                    </CrudPublikasiPaketSoalProvider>
                                                                                </CrudPaketSoalProvider>
                                                                            </CrudBankSoalProvider>
                                                                        </CrudTransaksiSerahTerimaProvider>
                                                                    </CrudSerahTerimaProvider>
                                                                </CrudPangkatGolonganProvider>
                                                            </CrudSppdProvider>
                                                        </SuratMasukCrudProvider>
                                                    </SuratKeluarCrudProvider>
                                                </CrudTabunganProvider>
                                            </CrudProtaProvider>
                                        </SebaranJadwalCrudProvider>
                                    </SettingJadwalCrudProvider>
                                </CrudAtpProvider>
                            </CrudTpFaseProvider>
                        </CrudElemenCpProvider>
                    </CrudMapelRombel>
                </AbsensiCrudProvider>
            </KaldikCrudProvider>
        </SiswaCrudProvider>

    )
}