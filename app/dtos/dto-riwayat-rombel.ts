import type { RiwayatRombelAppType, RiwayatRombelSheetType } from "~/types/buku-induk/riwayat-rombel";
import { resolveNumber, resolveString } from "./_resolver";

export default class DtoRiwayatRombel{
    static toApp(data:Record<string, any>):RiwayatRombelAppType{
        return {
            idbaris             : resolveNumber(data.idbaris     ),
            id                  : resolveNumber(data.id          ),
            status              : resolveString(data.status      ,undefined),
            last_rombel         : resolveString(data.last_rombel ,undefined),
            nis                 : resolveString(data.nis         ,undefined),
            nisn                : resolveString(data.nisn        ,undefined),
            pd_nama             : resolveString(data.pd_nama     ,undefined),
            tapel_1213          : resolveString(data.tapel_1213 ,undefined),
            tapel_1314          : resolveString(data.tapel_1314 ,undefined),
            tapel_1415          : resolveString(data.tapel_1415 ,undefined),
            tapel_1516          : resolveString(data.tapel_1516 ,undefined),
            tapel_1617          : resolveString(data.tapel_1617 ,undefined),
            tapel_1718          : resolveString(data.tapel_1718 ,undefined),
            tapel_1819          : resolveString(data.tapel_1819 ,undefined),
            tapel_1920          : resolveString(data.tapel_1920 ,undefined),
            tapel_2021          : resolveString(data.tapel_2021 ,undefined),
            tapel_2122          : resolveString(data.tapel_2122 ,undefined),
            tapel_2223          : resolveString(data.tapel_2223 ,undefined),
            tapel_2324          : resolveString(data.tapel_2324 ,undefined),
            tapel_2425          : resolveString(data.tapel_2425 ,undefined),
            tapel_2526          : resolveString(data.tapel_2526 ,undefined),
            tapel_2627          : resolveString(data.tapel_2627 ,undefined),
            tapel_2728          : resolveString(data.tapel_2728 ,undefined),
            tapel_2829          : resolveString(data.tapel_2829 ,undefined),
            tapel_2930          : resolveString(data.tapel_2930 ,undefined),
        }
    }
    static toSheet(data:RiwayatRombelAppType):RiwayatRombelSheetType{
        return {
            idbaris             : resolveNumber(data.idbaris     ),
            id                  : resolveNumber(data.id          ),
            status              : resolveString(data.status      ,undefined),
            last_rombel         : resolveString(data.last_rombel ,undefined),
            nis                 : resolveString(data.nis         ,undefined),
            nisn                : resolveString(data.nisn        ,undefined),
            pd_nama             : resolveString(data.pd_nama     ,undefined),
            tapel_1213          : resolveString(data.tapel_1213 ,undefined),
            tapel_1314          : resolveString(data.tapel_1314 ,undefined),
            tapel_1415          : resolveString(data.tapel_1415 ,undefined),
            tapel_1516          : resolveString(data.tapel_1516 ,undefined),
            tapel_1617          : resolveString(data.tapel_1617 ,undefined),
            tapel_1718          : resolveString(data.tapel_1718 ,undefined),
            tapel_1819          : resolveString(data.tapel_1819 ,undefined),
            tapel_1920          : resolveString(data.tapel_1920 ,undefined),
            tapel_2021          : resolveString(data.tapel_2021 ,undefined),
            tapel_2122          : resolveString(data.tapel_2122 ,undefined),
            tapel_2223          : resolveString(data.tapel_2223 ,undefined),
            tapel_2324          : resolveString(data.tapel_2324 ,undefined),
            tapel_2425          : resolveString(data.tapel_2425 ,undefined),
            tapel_2526          : resolveString(data.tapel_2526 ,undefined),
            tapel_2627          : resolveString(data.tapel_2627 ,undefined),
            tapel_2728          : resolveString(data.tapel_2728 ,undefined),
            tapel_2829          : resolveString(data.tapel_2829 ,undefined),
            tapel_2930          : resolveString(data.tapel_2930 ,undefined),
        }
    }
    static arrayToApp(data:Record<string, any>[]):RiwayatRombelAppType[]{
        return data.map(this.toApp)
    }
    static arrayToSheet(data:RiwayatRombelAppType[]):RiwayatRombelSheetType[]{
        return data.map(this.toSheet)
    }
}