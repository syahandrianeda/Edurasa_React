import { FileUp } from "lucide-react";
import * as React from "react";
import ButtonCommitAwesome from "~/components/button-awesome/commit-button";
import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import { useExportTarget } from "~/layouts/exports/export-target-provider";
import { normalizeFileName } from "~/lib/normalized-filename";

export function ButtonExportNilaiPerKd({ currentData }: { currentData: TagihanHasDataResponse; }) {
    const printRef = React.useRef<HTMLElement | null>(null);
    const { getTarget } = useExportTarget();
    const title = normalizeFileName(currentData?.nama_publikasi ?? 'File Export');

    const handleExport = () => {
        const target = getTarget('print-area-modal');
        if (!target) return;
        printRef.current = target;
        import("~/export/excel/export-excel").then((exportToExcel) => {
            if (!printRef) return;
            exportToExcel.default(printRef, title);

        });
    };
    return (
        <ButtonCommitAwesome className="px-4 py-0" labelButton="Export" onClick={handleExport} ><FileUp size={15}/></ButtonCommitAwesome>
    );
}
