import type { DetailSkorKdSource } from "~/domain/import-skor-to-kd/TemplateImportSkorToKd-type";

export type signSourceBetweenReponAndSkorKdType = {
    title:string,
    className: string
}
export function signSourceBetweenReponAndSkorKd(detailSkor: DetailSkorKdSource[], keySource: string): signSourceBetweenReponAndSkorKdType {

    let title: string = '';
    let className: string = '';
    const currentDetail = detailSkor.find(s => s.keySkorKd === keySource);
    if (currentDetail) {
        if (currentDetail.skorSheet === null) {
            if (currentDetail.skorRespon === null) {
                className = "bg-rose-300";

                title = 'Tidak mengirimkan data/tidak ikut daring';
                title += '\r\n skor respon =' + currentDetail.skorRespon;
                title += '\r\n skor server =' + currentDetail.skorSheet;
            } else {
                className = "bg-amber-300";
                title = 'Belum dikoreksi/bantu isi skor';
                title += '\r\n skor respon =' + currentDetail.skorRespon;
                title += '\r\n skor server =' + currentDetail.skorSheet;
            }
        } else {
            if (currentDetail.skorRespon === null) {
                className = "bg-sky-300";

                title = 'Nilai hasil Import';
                title += '\r\n skor respon =' + currentDetail.skorRespon;
                title += '\r\n skor server =' + currentDetail.skorSheet;
            } else {
                if (currentDetail.isSameValueBothResource && currentDetail.fromSource === 'sheet') {
                    className = "bg-green-300";
                    title = 'Skor valid, nilai respon dan server sama';
                    title += '\r\n skor respon =' + currentDetail.skorRespon;
                    title += '\r\n skor server =' + currentDetail.skorSheet;

                } else {
                    className = "bg-amber-200";
                    title = 'skor berbeda antara skor server dan skor respon siswa';
                    title += '\r\n skor respon =' + currentDetail.skorRespon;
                    title += '\r\n skor server =' + currentDetail.skorSheet;
                    title += '\r\n Biasanya terjadi ketika Anda mengimport nilai KD, tanpa melakukan koreksi (validasi skor)/bantu isi skor';
                }
            }
        }
    }
    return { title, className };
}
