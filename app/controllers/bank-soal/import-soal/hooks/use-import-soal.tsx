import { useState } from "react";
import type { Soal } from "../type";
import { docxToHtml } from "../service/html-to-doc";
import { parseSoalDocument } from "../service/parse-soal-document";
import { parseMCQ } from "../service/parse-soal-acak";
import { docxToRawText } from "../service/docxToRawText";


export function useImportSoal() {
    const [loading, setLoading] =
        useState(false);

    const [data, setData] =
        useState<Soal[]>([]);

    async function importFile(
        file: File
    ) {
        try {
            setLoading(true);

            const html =
                await docxToHtml(file);
            const text = await docxToRawText(file);
            
            const soal =
                parseSoalDocument(
                    html
                );
                // parseMCQ(html)
                // console.log({html,soal, text})
            setData(soal);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        data,
        importFile,
    };
}