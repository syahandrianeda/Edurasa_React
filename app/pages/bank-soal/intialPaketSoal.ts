import type { PraSettingPaket } from "~/domain/paket-soal/entities/pra-setting-paket";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";

export const createInitialSetting = (): PraSettingPaket => ({
    identitas: {
        nama: '',
        start_time: new Date(),
        durasi: 60,
        kelas: getSessionRombel(),
        showKolom: false,
        showIdentitas: false,
        showKop: false,
        showSebaranTp: false,
        dataIdentitas: '',
        showPetunjuk: false
    },
    target_paket: 'rombel',
    data_target: [],
    koleksi_mapel: {
        isMultiple: false,
        data: []
    },
    count_bentuk_soal: [],
    kurikulum: [],
    nomorSoalUrut: true,
    dataKopCustom: []
});