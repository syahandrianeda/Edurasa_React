
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";

const bagianPanduan = [
    {
        nomor: "01",
        judul: "Memahami jumlah peserta dan jawaban",
        isi: (
            <>
                <p>
                    Jumlah peserta menunjukkan siswa yang masuk dalam data
                    analisis. Jawaban terjawab adalah respons yang dikenali
                    sebagai jawaban untuk soal tersebut, sedangkan tidak
                    terjawab menunjukkan soal yang dilewati atau tidak
                    memiliki jawaban.
                </p>
                <p>
                    Siswa yang tidak memiliki respons sama sekali dapat
                    dikecualikan dari matriks analisis. Karena itu, jumlah
                    peserta analisis belum tentu sama dengan seluruh siswa
                    dalam rombongan belajar.
                </p>
            </>
        ),
    },
    {
        nomor: "02",
        judul: "Tingkat kesukaran",
        isi: (
            <>
                <p>
                    Tingkat kesukaran menunjukkan seberapa besar skor yang
                    diperoleh siswa pada suatu soal dibandingkan dengan
                    skor maksimum soal tersebut. Nilai yang lebih tinggi
                    menunjukkan soal relatif lebih mudah bagi peserta.
                </p>
                <div className="rounded-md bg-muted p-3 text-sm">
                    <p className="font-medium">Batas yang digunakan</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                        <li>Di bawah 0,30: relatif sulit.</li>
                        <li>0,30 sampai 0,70: sedang.</li>
                        <li>Di atas 0,70: relatif mudah.</li>
                    </ul>
                </div>
                <p>
                    Contoh: nilai 0,80 berarti rata-rata skor siswa mencapai
                    80% dari skor maksimum soal. Untuk soal pilihan ganda
                    tunggal dengan skor 100 untuk benar dan 0 untuk salah,
                    angka ini setara dengan proporsi siswa yang menjawab
                    benar.
                </p>
                <p>
                    Soal mudah tidak otomatis buruk, dan soal sulit tidak
                    otomatis baik. Tingkat kesukaran perlu disesuaikan
                    dengan tujuan pembelajaran.
                </p>
            </>
        ),
    },
    {
        nomor: "03",
        judul: "Daya pembeda dan korelasi soal",
        isi: (
            <>
                <p>
                    Daya pembeda membantu melihat apakah soal dapat
                    membedakan siswa dengan hasil tes keseluruhan yang
                    relatif tinggi dan rendah (<strong>Kelompok Atas</strong> dan <strong>Kelompok Bawah</strong>). Korelasi item-total
                    menunjukkan hubungan antara skor suatu soal dan skor
                    keseluruhan tes.
                </p>
                <p>
                    Dalam konfigurasi saat ini, korelasi dibaca menggunakan
                    batas berikut:
                </p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>Di bawah 0,20: sangat rendah.</li>
                    <li>0,20 sampai kurang dari 0,30: rendah.</li>
                    <li>0,30 sampai kurang dari 0,40: cukup.</li>
                    <li>0,40 atau lebih: lebih kuat.</li>
                </ul>
                <p>
                    Korelasi negatif atau sangat rendah perlu diperiksa.
                    Kemungkinan penyebabnya antara lain kunci jawaban yang
                    keliru, soal ambigu, materi yang belum dipelajari, atau
                    soal yang mengukur kemampuan berbeda.
                </p>
                <p>
                    Korelasi item-total merupakan salah satu indikator
                    hubungan statistik, bukan bukti tunggal bahwa soal
                    sudah valid atau tidak valid.
                </p>
            </>
        ),
    },
    {
        nomor: "04",
        judul: "Membaca analisis pengecoh pilihan ganda",
        isi: (
            <>
                <p>
                    Pada soal PG Tunggal, sistem melihat pilihan yang
                    dipilih siswa serta membandingkan pemilih dari kelompok
                    berkemampuan relatif tinggi (<strong>Kelompok Atas</strong>) dan rendah  (<strong>Kelompok Bawah</strong>). Kedua kelompok
                    ditentukan dari skor total tes, masing-masing sekitar
                    27% peserta teratas dan terbawah.
                </p>
                <div className="rounded-md border p-3">
                    <p className="font-medium">Contoh membaca angka</p>
                    <p className="mt-2 text-sm">
                        Jika suatu opsi dipilih oleh 2 dari 10 siswa
                        kelompok rendah/Atas dan 1 dari 10 siswa kelompok tinggi,
                        persentasenya adalah 20% dan 10%.
                    </p>
                    <p className="mt-2 text-sm">
                        Indeks pengecoh = 20% − 10% = +10 poin persentase.
                        Jika opsi itu bukan kunci dan ada siswa yang
                        memilihnya, pola ini menunjukkan pengecoh cenderung
                        lebih menarik bagi kelompok rendah/bawah.
                    </p>
                </div>
                <ul className="list-disc space-y-1 pl-5">
                    <li>
                        <strong>Indeks positif:</strong> opsi lebih banyak
                        dipilih kelompok rendah/bawah; ini dapat menunjukkan
                        pengecoh berfungsi.
                    </li>
                    <li>
                        <strong>Indeks mendekati nol:</strong> pola pemilihan
                        kedua kelompok mirip.
                    </li>
                    <li>
                        <strong>Indeks negatif:</strong> opsi justru lebih
                        banyak dipilih kelompok tinggi/atas; periksa apakah
                        pengecoh ambigu atau kunci jawaban bermasalah.
                    </li>
                    <li>
                        <strong>Tidak dipilih:</strong> opsi mungkin kurang
                        menarik atau terlalu mudah dikenali sebagai jawaban
                        salah.
                    </li>
                </ul>
                <p>
                    Pengecoh yang berfungsi bukan berarti soal pasti baik.
                    Kunci jawaban dan isi soal tetap perlu diperiksa.
                </p>
            </>
        ),
    },
    {
        nomor: "05",
        judul: "Reliabilitas tes",
        isi: (
            <>
                <p>
                    Reliabilitas menunjukkan konsistensi internal skor
                    antarsoal dalam satu tes. Sistem menggunakan koefisien
                    Cronbach Alpha untuk memperkirakan konsistensi tersebut.
                </p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>0,90 atau lebih: sangat baik.</li>
                    <li>0,80 sampai kurang dari 0,90: baik.</li>
                    <li>0,70 sampai kurang dari 0,80: memadai.</li>
                    <li>0,60 sampai kurang dari 0,70: rendah.</li>
                    <li>Di bawah 0,60: sangat rendah.</li>
                </ul>
                <p>
                    Nilai reliabilitas tidak menentukan kualitas satu soal
                    secara langsung. Nilai ini menggambarkan konsistensi
                    tes secara keseluruhan dan perlu ditafsirkan sesuai
                    tujuan serta jumlah soal.
                </p>
            </>
        ),
    },
    {
        nomor: "06",
        judul: "Mengapa soal mendapat status tertentu?",
        isi: (
            <>
                <p>
                    Status soal dirumuskan dari gabungan hasil analisis,
                    seperti tingkat kesukaran, daya pembeda atau korelasi,
                    dan temuan pada pengecoh. Status membantu menentukan
                    soal mana yang layak dipertahankan atau perlu ditinjau.
                </p>
                <ul className="list-disc space-y-1 pl-5">
                    <li>
                        <strong>Baik atau dipertahankan:</strong> indikator
                        yang diperiksa cenderung memenuhi kriteria.
                    </li>
                    <li>
                        <strong>Perlu ditinjau:</strong> ada indikator yang
                        perlu diperiksa lebih lanjut sebelum digunakan lagi.
                    </li>
                    <li>
                        <strong>Perlu diperbaiki:</strong> terdapat indikasi
                        masalah yang cukup kuat pada soal, kunci, atau
                        pengecohnya.
                    </li>
                    <li>
                        <strong>Data belum memadai:</strong> jumlah peserta
                        atau data yang tersedia belum cukup untuk
                        menghasilkan kesimpulan yang kuat.
                    </li>
                </ul>
                <p>
                    Nama status yang tampil pada aplikasi mengikuti aturan
                    diagnosis yang digunakan sistem. Bacalah juga alasan
                    yang menyertai status, bukan hanya labelnya.
                </p>
            </>
        ),
    },
];

export default function PanduanAnalisisInstrumen() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                    <span aria-hidden="true">ⓘ</span>
                    Panduan Membaca Analisis Instrumen
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Pelajari arti angka, cara membaca indikator, dan
                    bagaimana sistem menyusun rekomendasi untuk setiap soal.
                </p>
            </CardHeader>

            <CardContent className="space-y-3">
                <div className="rounded-md border border-sky-200 bg-sky-50 p-3 text-sm text-sky-950 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-100">
                    <strong>Catatan:</strong> Hasil analisis merupakan alat
                    bantu evaluasi. Pertimbangkan tujuan pembelajaran,
                    kesesuaian materi, dan isi soal sebelum memutuskan
                    mempertahankan atau merevisi soal.
                </div>

                {bagianPanduan.map((bagian) => (
                    <details
                        key={bagian.nomor}
                        className="group rounded-lg border"
                    >
                        <summary className="flex cursor-pointer list-none items-center gap-3 p-3 [&::-webkit-details-marker]:hidden">
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                                {bagian.nomor}
                            </span>

                            <span className="flex-1 text-sm font-medium">
                                {bagian.judul}
                            </span>

                            <span
                                aria-hidden="true"
                                className="text-muted-foreground transition-transform group-open:rotate-180"
                            >
                                ▾
                            </span>
                        </summary>

                        <div className="space-y-3 border-t px-4 py-4 text-sm leading-6 text-muted-foreground">
                            {bagian.isi}
                        </div>
                    </details>
                ))}
            </CardContent>
        </Card>
    );
}
