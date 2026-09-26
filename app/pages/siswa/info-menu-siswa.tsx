import {useCallback, useEffect, useMemo, useRef} from 'react';
import { useAppSelector } from '~/context-reduct/hook';
import { defineCreateItemSoalNeeded } from '~/domain/enloaded/intial-enloaded/by-route-page/banksoal/create-item-soal-needed';
import { sheetBankSoal_publikasiPaket } from "~/domain/enloaded/intial-enloaded/by-sheet/bank-soal";
import BuildParamLoaded from '~/infrastructures/ensure-loaded-api/build-param-loaded';
import { getSessionRombel } from '~/infrastructures/session-storage/rombel-session';
import {toast} from 'sonner';
import EnsurLoadedApiService from '~/infrastructures/ensure-loaded-api/EnsureLoadedApiService';
import DispatchingResponseToStore from '~/lib/dispatching-response-to-store';
import DispatchingResponseToFokusUi from '~/lib/dispatching-response-to-fokus-ui';
import { store } from '~/context-reduct/redux-provider';
import { siswaDefindeAbsenRombelNeeded } from '~/domain/enloaded/intial-enloaded/by-route-page/siswa/menu-needed';
import RingkasanInfoSiswa from '~/controllers/info-siswa/ringkasan-info-siswa';
import useEnsureLoaded from '~/hooks/use-ensure-loaded';
import { getSessionApp } from '~/infrastructures/session-storage/app-session';
import type { UserSiswa } from '~/types/user-siswa';

export default function InfoSiswa(){
    // const sheetNeeded = siswaDefindeAbsenRombelNeeded;
    const user = getSessionApp<UserSiswa>()
    const rombel = getSessionRombel();
//    const {
//         user,
//         rombel,
//     } = useEnsureLoaded(
//         siswaDefindeAbsenRombelNeeded
//     );
    return (
        <div className="border-2 rounded-2xl bg-white min-h-24 w-11/12 mx-auto p-2 mb-4 overflow-hidden">
            <h3 className='text-xl text-center'>Selamat Datang {user?.name} (Kelas {rombel})</h3>
            <RingkasanInfoSiswa/>
        </div>
    )
}