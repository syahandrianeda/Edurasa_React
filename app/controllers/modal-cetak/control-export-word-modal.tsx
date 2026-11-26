import * as React from "react";
import { FileText, Loader2 } from "lucide-react";
import { useExportTarget } from "~/layouts/exports/export-target-provider";
import { cn } from "~/lib/utils";
import UseDocxEdura, { type orientationWord } from "~/export/word-edura/applications/use-docx-edura";

export default function ButtonExportWordModal({
    className = "py-0",
    type = "portrait",
    fileName,
}: {
    className?: string;
    type?: orientationWord;
    fileName: string;
}) {
    const { getTarget } = useExportTarget();
    const { executeWord, isExporting } = UseDocxEdura({ fileName });

    const onHandleWord = React.useCallback(() => {
        const target = getTarget("print-area-modal");
        if (!target) return;

        void executeWord(target, type);
    }, [executeWord, getTarget, type]);

    return (
        <button
            type="button"
            disabled={isExporting}
            className={cn(
                "flex h-fit w-fit items-center justify-start gap-2 px-4 rounded-full bg-sky-700 py-[1em] text-white shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),0px_0px_4px_1px_var(--color-sky-100),0px_4px_0px_0px_var(--color-sky-800)] duration-250 hover:translate-y-[0.25em] active:translate-y-[0.5em] active:shadow-[inset_0px_-4px_4px_0px_var(--color-sky-600),1px_0px_2px_1px_#f9d1d1]",
                isExporting && "opacity-70 cursor-progress",
                className
            )}
            onClick={onHandleWord}
        >
            {isExporting
                ? <Loader2 size={15} className="font-extrabold animate-spin" />
                : <FileText size={15} className="font-extrabold" />}
            <p className="[text-shadow:0px_1px_1px_0px_#950000]">
                {isExporting ? "Menyiapkan…" : "Word"}
            </p>
        </button>
    );
}
