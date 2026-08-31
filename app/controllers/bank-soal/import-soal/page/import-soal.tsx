// import { UploadDocx } from "@/features/import-soal/components/UploadDocx";
// import { PreviewSoalTable } from "@/features/import-soal/components/PreviewSoalTable";

import { UploadDocx } from "../components/import-bank-soal";
import { PreviewSoalTable } from "../components/preview-table";
import { useImportSoal } from "../hooks/use-import-soal";

// import { useImportSoal } from "@/features/import-soal/hooks/useImportSoal";

export default function ImportSoalPage() {
    const {
        loading,
        data,
        importFile,
    } = useImportSoal();
    
    return (
        <div>
            <h1>
                Import Soal DOCX
            </h1>

            <UploadDocx
                onUpload={
                    importFile
                }
            />

            {loading && (
                <p>
                    Memproses...
                </p>
            )}

            <PreviewSoalTable
                data={data}
            />
        </div>
    );
}