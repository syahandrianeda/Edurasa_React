
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";

interface PenjelasanReliabilitasTesProps {
    alpha: number | null;
    jumlahPeserta: number;
    jumlahSoal: number;
}

function getInterpretasiAlpha(alpha: number) {
    if (alpha >= 0.9) {
        return {
            label: "Sangat baik",
            deskripsi:
                "Skor tes menunjukkan konsistensi internal yang tinggi. Tetap periksa kualitas setiap soal dan kesesuaian tes dengan tujuan pembelajaran.",
        };
    }

    if (alpha >= 0.8) {
        return {
            label: "Baik",
            deskripsi:
                "Skor tes menunjukkan konsistensi internal yang baik. Evaluasi setiap soal tetap diperlukan sebelum paket digunakan kembali.",
        };
    }

    if (alpha >= 0.7) {
        return {
            label: "Memadai",
            deskripsi:
                "Konsistensi internal dapat dianggap memadai untuk sejumlah keperluan, bergantung pada tujuan dan konsekuensi penggunaan hasil tes.",
        };
    }

    if (alpha >= 0.6) {
        return {
            label: "Rendah",
            deskripsi:
                "Konsistensi internal perlu diperhatikan. Periksa jumlah soal, kesesuaian materi, kualitas butir, dan karakteristik peserta.",
        };
    }

    return {
        label: "Sangat rendah",
        deskripsi:
            "Konsistensi internal tergolong rendah. Tinjau kembali rancangan tes dan kualitas soal sebelum menjadikan hasilnya sebagai dasar keputusan penting.",
    };
}

export default function PenjelasanReliabilitasTes({
    alpha,
    jumlahPeserta,
    jumlahSoal,
}: PenjelasanReliabilitasTesProps) {
    const alphaValid =
        alpha !== null &&
        Number.isFinite(alpha) &&
        alpha >= 0 &&
        alpha <= 1;

    const interpretasi = alphaValid
        ? getInterpretasiAlpha(alpha)
        : null;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">
                    Memahami Reliabilitas Paket Soal
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                    Reliabilitas menggambarkan konsistensi internal skor
                    antarsoal dalam satu paket tes.
                </p>
            </CardHeader>

            <CardContent className="space-y-4 text-sm">
                <div className="rounded-lg border p-4">
                    <p className="text-muted-foreground">
                        Cronbach's Alpha
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-2">
                        <span className="text-2xl font-semibold">
                            {alphaValid ? alpha.toFixed(3) : "—"}
                        </span>

                        {interpretasi && (
                            <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                                {interpretasi.label}
                            </span>
                        )}
                    </div>

                    {interpretasi ? (
                        <p className="mt-2 text-muted-foreground">
                            {interpretasi.deskripsi}
                        </p>
                    ) : (
                        <p className="mt-2 text-muted-foreground">
                            Nilai reliabilitas belum dapat diinterpretasikan.
                            Periksa kecukupan data dan hasil perhitungan
                            sebelum mengambil kesimpulan.
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <h4 className="font-medium">
                        Apa yang dinilai?
                    </h4>

                    <p className="text-muted-foreground">
                        Alpha memperkirakan konsistensi internal skor
                        antarsoal berdasarkan pola skor peserta. Nilai ini
                        bukan persentase soal yang benar, bukan persentase
                        siswa yang lulus, dan bukan ukuran langsung tingkat
                        kesulitan paket soal.
                    </p>
                </div>

                <div className="space-y-2">
                    <h4 className="font-medium">
                        Data yang dianalisis
                    </h4>

                    <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                        <li>
                            Jumlah peserta:{" "}
                            <strong className="text-foreground">
                                {jumlahPeserta}
                            </strong>
                        </li>
                        <li>
                            Jumlah soal:{" "}
                            <strong className="text-foreground">
                                {jumlahSoal}
                            </strong>
                        </li>
                    </ul>

                    <p className="text-muted-foreground">
                        Kestabilan interpretasi Alpha juga dipengaruhi
                        jumlah peserta, jumlah soal, variasi skor, dan
                        apakah soal-soal mengukur konstruk yang cukup
                        sejalan.
                    </p>
                </div>

                <div className="space-y-2">
                    <h4 className="font-medium">
                        Apakah paket soal layak digunakan?
                    </h4>

                    <p className="text-muted-foreground">
                        Nilai Alpha merupakan salah satu bahan pertimbangan,
                        bukan keputusan kelayakan otomatis. Periksa juga
                        validitas isi, kesesuaian dengan tujuan pembelajaran,
                        tingkat kesukaran, daya pembeda, kunci jawaban, dan
                        fungsi pengecoh.
                    </p>
                </div>

                <div className="rounded-md border border-amber-300/60 bg-amber-50 p-3 text-amber-950 dark:bg-amber-950 dark:text-amber-100">
                    <p className="font-medium">
                        Catatan interpretasi
                    </p>
                    <p className="mt-1">
                        Kategori di atas merupakan pedoman umum. Nilai Alpha
                        yang tinggi tidak menjamin semua soal berkualitas,
                        dan nilai rendah tidak otomatis berarti paket soal
                        tidak layak. Keputusan akhir tetap memerlukan
                        peninjauan isi dan tujuan penilaian.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
