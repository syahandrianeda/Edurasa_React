import type { PraSettingPaket } from "../entities/pra-setting-paket"
import type { PaketSoalDesign } from "./paket-soal"
import type { DataSoalDesign } from "./session-soal"

export const createPaketSoalDesign = (
    setting: PraSettingPaket
): PaketSoalDesign  => {

    let globalIndex = 0
    let globalNoSoal = 1

    const data: DataSoalDesign[] =
        setting?.count_bentuk_soal?.map(item => {

            const startNumber = globalNoSoal

            const result: DataSoalDesign = {
                startNumber,
                bentukSoal: item.dataBentukSoal,
                petunjukPengisian:item.description,
                dataSoal: []
            }

            globalIndex += item.count

            if (setting?.nomorSoalUrut) {
                globalNoSoal = 1
            }else{
                globalNoSoal += item.count

            }

            return result
        })

    return {
        setting,
        data
    }
}

export const getNoSoal = (
    setting: PraSettingPaket,
    indexBentuk: number,
    indexSoal: number
): number => {

    if (setting.nomorSoalUrut) {
        return indexSoal + 1
    }

    return (
        setting.count_bentuk_soal
            .slice(0, indexBentuk)
            .reduce(
                (total, item) => total + item.count,
                0
            )
        + indexSoal
        + 1
    )
}
export const getGlobalIndex = (
    setting: PraSettingPaket,
    indexBentuk: number,
    indexSoal: number
): number => {

    return (
        setting.count_bentuk_soal
            .slice(0, indexBentuk)
            .reduce(
                (total, item) => total + item.count,
                0
            )
        + indexSoal
    )
}

export const createPaketSoalDesign_deprecated = (
    setting: PraSettingPaket
): PaketSoalDesign => {

    let startNumber = 1
    const isBackToOne = setting.nomorSoalUrut ;
    const design: DataSoalDesign[] = setting?.count_bentuk_soal?.map((item, i) => {
            // const startNumber = setting?.count_bentuk_soal?.map((m)=>m.count).slice(0, i).reduce((a, b)=>a+b);
            const result: DataSoalDesign = {
                startNumber,
                bentukSoal: item.dataBentukSoal,
                petunjukPengisian:item.description,
                dataSoal: []
            }
            if(!isBackToOne){
                startNumber += item.count
            }

            return result
        })

    return {
        setting,
        data: design
    }
}