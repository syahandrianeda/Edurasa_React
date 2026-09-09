import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar"
import type { PaketSoalDesign } from "~/domain/paket-soal/result/paket-soal"
import { useDraftPaketSoal } from "~/hooks/use-draft-paket-soal"
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "~/components/ui/button";
import type { PraSettingPaket } from "~/domain/paket-soal/entities/pra-setting-paket";



export default function ToolbarContentDraft(){
    const { value, updateExtra } = useFilterContext<PaketSoalDesign | undefined>();

    const { draft, hasDraft, saveDraft, loadDraft } = useDraftPaketSoal();

    const handleLoadDraft = useCallback(() => {

        
        const loadedDraft = loadDraft();
        if (!loadedDraft?.setting) {
            return;
        }
        

        updateExtra(extra => {
            Object.assign(
                extra,
                {...loadedDraft}
            );
        });

    }, [loadDraft, updateExtra]);


    return (
        <div className="min-h-24 flex items-center justify-center">
            {draft ? <Button
                type="button"
                variant={"outline"}
                onClick={handleLoadDraft}
            >
                Lanjutkan Draft
            </Button>
            :'Draft tidak tersedia'}
        </div>
    )
}