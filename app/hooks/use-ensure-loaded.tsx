import { useCallback, useEffect, useMemo, useRef } from "react";
import { toast } from "sonner";

import { useAppSelector } from "~/context-reduct/hook";
import { store } from "~/context-reduct/redux-provider";

import BuildParamLoaded from "~/infrastructures/ensure-loaded-api/build-param-loaded";
import EnsurLoadedApiService from "~/infrastructures/ensure-loaded-api/EnsureLoadedApiService";

import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";

import DispatchingResponseToStore from "~/lib/dispatching-response-to-store";
import DispatchingResponseToFokusUi from "~/lib/dispatching-response-to-fokus-ui";
export default function useEnsureLoaded(sheetNeeded: unknown) {
    const st = store.getState();

    const user = useAppSelector(
        state => state.auth.user
    );

    const rombel = getSessionRombel();

    const reqParam = useMemo(() => {
        if (sheetNeeded && typeof sheetNeeded === "function") {
            return (
                sheetNeeded as (value: typeof rombel) => unknown
            )(rombel);
        }

        if (Array.isArray(sheetNeeded)) {
            return sheetNeeded;
        }

        return;
    }, [
        rombel,
        sheetNeeded,
    ]);

    const instDataEnloaded = useMemo(() => {
        if (!Array.isArray(reqParam)) {
            return;
        }

        return new BuildParamLoaded(
            st,
            reqParam
        ).evaluate();
    }, [
        st,
        reqParam,
    ]);

    const loadingRef = useRef(false);

    const loadedRef = useRef<Set<string>>(
        new Set()
    );

    const loadKey = useMemo(() => {
        if (
            !Array.isArray(reqParam) ||
            reqParam.length === 0
        ) {
            return null;
        }

        return JSON.stringify({
            rombel,
            param: reqParam,
        });
    }, [
        reqParam,
        rombel,
    ]);

    const callApi = useCallback(async () => {
        if (!loadKey) {
            return;
        }

        /**
         * Data dengan loadKey ini sudah pernah
         * berhasil dimuat.
         */
        if (loadedRef.current.has(loadKey)) {
            return;
        }

        /**
         * Masih ada request berjalan.
         */
        if (loadingRef.current) {
            return;
        }

        loadingRef.current = true;

        try {
            const api = new EnsurLoadedApiService();

            if (
                !instDataEnloaded?.param ||
                instDataEnloaded.param.length === 0
            ) {
                return;
            }

            const param = instDataEnloaded.param;
            
            const reqPromise = toast.promise(
                api.callNeeded(param),
                {
                    loading:
                        "Memeriksa tugas dan informasi hari ini untuk ananda",

                    success:
                        "Pemanggilan data telah selesai",

                    error: data =>
                        `Gagal memuat data karena error, \r${data}`,

                    closeButton: true,
                }
            );

            const data = await reqPromise.unwrap();

            if (data && Array.isArray(data)) {
                data.forEach(
                    ({
                        success,
                        data,
                        detailResponse,
                    }) => {
                        if (!detailResponse) {
                            return;
                        }

                        DispatchingResponseToStore(
                            success,
                            data,
                            detailResponse,
                            rombel
                        );

                        DispatchingResponseToFokusUi();
                    }
                );
            }

            /**
             * Tandai hanya setelah request
             * berhasil diproses.
             */
            loadedRef.current.add(loadKey);

        } catch (er) {
            /**
             * Jangan masukkan loadKey ke loadedRef
             * jika request gagal.
             */
        } finally {
            loadingRef.current = false;
        }
    }, [
        instDataEnloaded,
        rombel,
        loadKey,
    ]);

    useEffect(() => {
        if (!user) {
            return;
        }

        if (!instDataEnloaded) {
            return;
        }

        if (!loadKey) {
            return;
        }

        void callApi();
    }, [
        user,
        instDataEnloaded,
        loadKey,
        callApi,
    ]);

    return {
        user,
        rombel,
        reqParam,
        instDataEnloaded,
        loadKey,
        loading: loadingRef.current,
        callApi,
    };
}