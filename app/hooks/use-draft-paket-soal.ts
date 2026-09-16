import {
    useCallback,
    useEffect,
    useState
} from "react";
import type { PaketSoalDesign } from "~/domain/paket-soal/result/paket-soal";
import { getPaketSoalDraft, removePaketSoalDraft, savePaketSoalDraft } from "~/infrastructures/session-storage/draft-paket-soal";

export function useDraftPaketSoal() {

    const [
        draft,
        setDraft
    ] = useState<PaketSoalDesign | null>(null);

    const loadDraft = useCallback(() => {

        const data = getPaketSoalDraft();

        setDraft(data);

        return data;

    }, []);

    useEffect(() => {
        loadDraft();
    }, [loadDraft]);

    const saveDraft = useCallback(
        (data: PaketSoalDesign) => {

            savePaketSoalDraft(data);

            setDraft(data);
        },
        []
    );
    const reset = useCallback(()=>{
        removePaketSoalDraft();
        setDraft(null);
    }, []);
    
    return {
        draft,
        hasDraft: draft !== null,
        loadDraft,
        saveDraft,
        reset
    };
}