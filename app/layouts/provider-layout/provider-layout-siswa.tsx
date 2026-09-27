import { Outlet } from "react-router";
import { AbsensiCrudProvider } from "~/controllers/absensi-controllers/crud-provider/absensi-crud-provider";
import { SiswaCrudProvider } from "~/controllers/data-siswa-controller/kesiswaan-controller";
import useEnsureLoaded from "~/hooks/use-ensure-loaded";
import AbsensiServiceImplements from "~/infrastructures/services/absensi-service-implements";
import KesiswaanServiceImplements from "~/infrastructures/services/kesiswaan-service-implements";
import type { Route } from "./+types/provider-layout-siswa";
import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import type { controlDropdownKelas } from "~/components/dropdowns/rombel-dropdown";
import type { DataSheetNeeeded } from "~/domain/enloaded/data-sheet-needed-type";
import { store } from "~/context-reduct/redux-provider";
import { useAppSelector } from "~/context-reduct/hook";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { useCallback, useEffect, useMemo, useRef } from "react";
import BuildParamLoaded from "~/infrastructures/ensure-loaded-api/build-param-loaded";
import EnsurLoadedApiService from "~/infrastructures/ensure-loaded-api/EnsureLoadedApiService";
import  {toast} from 'sonner';
import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import DispatchingResponseToFokusUi from "~/lib/dispatching-response-to-fokus-ui";
import { IndDbSiswaRepository } from "~/infrastructures/indexDb/db-datasiswa-repository";
import { getNumberFromString } from "~/lib/get-number";
import getFaseByRombel from "~/lib/get-fase-by-rombel";
import { namaTab } from "~/lib/nama-tab-environment";
import { setAllSiswa } from "~/context-reduct/global-state/siswa-slice";
import { CrudResponTagihanSiswa } from "~/controllers/respon-tagihan-siswa/crud/crud-provider-respon-siswa";
import ResponNilaiSiswwaService from "~/infrastructures/services/ResponNilaiSiswaService";

export default function ProviderServiceSiswa({
    matches,
}: Route.ComponentProps){
    const st = store.getState();
    
        const user = useAppSelector( state => state.auth.user );
    
        const rombel = useAppSelector( s => s.fokusRombel.value ) ?? getSessionRombel();
    
        // const rombelKeuangan = useAppSelector(FokusRombelKeuangan);
    
    
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
        const serviceSiswa                           = new KesiswaanServiceImplements();
        const serviceAbsensi                        = new AbsensiServiceImplements();
        const serviceTagihan                        = new ResponNilaiSiswwaService();
       
       
    
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
    
                const decidedRombel = rombel;
    
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
            rombel,
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
    
            const decidedRombel =  rombel;
    
            return JSON.stringify({
                rombel: decidedRombel,
                param: reqParam,
            });
    
        }, [
            reqParam,
            rombel,
            
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
    
                                const decidedRombel = rombel;
    
    
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
    
    return (
        <SiswaCrudProvider service={serviceSiswa}>
            <AbsensiCrudProvider service={serviceAbsensi}>
                <CrudResponTagihanSiswa service={serviceTagihan}>
                    <Outlet/>

                </CrudResponTagihanSiswa>
            </AbsensiCrudProvider>
        </SiswaCrudProvider>
    )
}