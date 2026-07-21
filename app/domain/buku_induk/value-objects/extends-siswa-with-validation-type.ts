import type { SiswaWithValidation } from "~/context-reduct/selectores/data-siswa-aktif";
import type { PredicatableRiwayatRaport } from "./RiwayatRaportSiswaType";

export interface SiswaValidationWithPredictableRiwayatRaport extends SiswaWithValidation{
    predictionRiwayatRaport: PredicatableRiwayatRaport
}