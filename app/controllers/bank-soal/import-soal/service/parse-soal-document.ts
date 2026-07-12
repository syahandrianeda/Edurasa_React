import type { Soal } from "../type";

export function parseSoalDocument(
    html: string
): Soal[] {
    const parser = new DOMParser();

    const doc = parser.parseFromString(
        html,
        "text/html"
    );

    const paragraphs = Array.from(
        doc.body.children
    );

    const result: Soal[] = [];

    let current: Soal | null = null;

    let mode:
        | "indikator"
        | "soal"
        | "jawaban"
        | "opsi"
        | 'lk'
        | 'tp'
        | null = null;

    let opsiIndex = -1;

    let firstSoalParagraph = false;
    for (const el of paragraphs) {
        const text =
            el.textContent?.trim() ?? "";
        if (
            text.toLowerCase() ===
            "#indikator_soal"
        ) {
            if (current) {
                result.push(current);
            }

            current = {
                indikator_soal: "",
                soal: "",
                opsi: [],
                jawaban: "",
                lk:'',
                lainnya:'',
                tp:''
            };

            mode = "indikator";
            continue;
        }
        if (text.toLowerCase() === "#soal") {
                mode = "soal";
                firstSoalParagraph = true;
                continue;
            }
        // if (
        //     text.toLowerCase() === "#soal"
        // ) {
        //     mode = "soal";
        //     continue;
        // }

        if (
            text.toLowerCase() === "#jawaban"
        ) {
            mode = "jawaban";
            continue;
        }

        if (
            text.toLowerCase() === "#lk"
        ) {
            mode = "lk";
            continue;
        }

        if (
            text.toLowerCase() === "#tujuan_pembelajaran"
        ) {
            mode = "tp";
            continue;
        }

        if (
            text.match(/^A\./i) ||
            text.match(/^B\./i) ||
            text.match(/^C\./i) ||
            text.match(/^D\./i) ||
            text.match(/^E\./i)
        ) {
            mode = "opsi";

            const kode =
                text[0].toUpperCase();

            current?.opsi.push({
                kode,
                // isi: el.outerHTML,
                isi:removeOptionPrefixHtml(el.outerHTML)
            });

            opsiIndex =
                current!.opsi.length - 1;

            continue;
        }

        if (!current) {
            continue;
        }

        switch (mode) {
            case "indikator":
                current.indikator_soal +=
                    el.outerHTML;
                break;

            // case "soal":
            //     current.soal +=
            //     removeNumberPrefixHtml(
            //         el.outerHTML
            //     )
            //     break;
            case "soal":

                if(firstSoalParagraph){
                    current.soal +=
                        removeNumberPrefixHtml(
                            el.outerHTML
                        );

                    firstSoalParagraph = false;
                }else{
                    current.soal += el.outerHTML;
                }

                break;

            case "jawaban":
                current.jawaban +=
                    el.outerHTML;
                break;

            case "lk":
                current.lk +=
                    el.outerHTML;
                break;

            case "tp":
                current.tp +=
                    el.outerHTML;
                break;

            case "opsi":
                if (
                    opsiIndex >= 0 &&
                    current.opsi[opsiIndex]
                ) {
                    current.opsi[
                        opsiIndex
                    ].isi += el.outerHTML;
                }
                break;
            default:
                current.lainnya +=el.outerHTML;
        }
    }

    if (current) {
        result.push(current);
    }

    return result;
}

function removeOptionPrefixHtml(
    html: string
) {
    return html.replace(
        /(^<p\b[^>]*>\s*)[A-E]\.\s*/i,
        '$1'
    );
}
function removeNumberPrefixHtml(
    html: string
) {
    return html.replace(
        /(^<p\b[^>]*>\s*)\d+\.\s*/i,
        '$1'
    );
}

