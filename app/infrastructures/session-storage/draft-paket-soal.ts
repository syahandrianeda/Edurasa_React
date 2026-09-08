import type { PaketSoalDesign } from "~/domain/paket-soal/result/paket-soal";
import { getDraft, hasDraft, removeDraft, saveDraft } from "./draft-storage";
import { DRAFT_STORAGE_KEY } from "./draft-soal";


export function savePaketSoalDraft(
    data: PaketSoalDesign
): void {
    saveDraft<PaketSoalDesign>(
        DRAFT_STORAGE_KEY.PAKET_SOAL,
        data
    );
}

export function getPaketSoalDraft():
    PaketSoalDesign | null {

    return getDraft<PaketSoalDesign>(
        DRAFT_STORAGE_KEY.PAKET_SOAL
    );
}

export function removePaketSoalDraft(): void {
    removeDraft(
        DRAFT_STORAGE_KEY.PAKET_SOAL
    );
}

export function hasPaketSoalDraft(): boolean {
    return hasDraft(
        DRAFT_STORAGE_KEY.PAKET_SOAL
    );
}