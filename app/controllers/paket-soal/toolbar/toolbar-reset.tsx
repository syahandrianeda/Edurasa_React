import { useCallback } from "react";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { setPaketSoal } from "~/context-reduct/global-state/bank-soal/paket-soal-slice";
import type { PaketSoalDesign } from "~/domain/paket-soal/result/paket-soal";
import { useDraftPaketSoal } from "~/hooks/use-draft-paket-soal";
import { createInitialSetting } from "~/pages/bank-soal/intialPaketSoal";

export default function ToolbarReset(){
    const { value, updateExtra, } = useFilterContext<PaketSoalDesign>();
    const {draft, saveDraft, reset} = useDraftPaketSoal();
    const resetPaketSoal = useCallback(() => {
                const setting = createInitialSetting();
    
                updateExtra(draft => {
                    draft.setting = setting;
                    draft.data =undefined;
                });
    
                // setPaketSoal(undefined);
    
                reset();
            }, [updateExtra, reset]);
    
    return (
        <div className="min-h-24 gap-2 flex items-center justify-center">
            <ButtonCommitAwesome labelButton="Reset" className="py-0 px-4" onClick={resetPaketSoal}/>
        </div>
    )
}