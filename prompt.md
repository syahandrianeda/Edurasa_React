Bertindaklah sebagai ahli ReactJs dan React-Router. 

Fokus pada entri awal file di directory `app\controllers\assesmen-penilaian\modals\koreksi-item-soal.tsx` untuk kamu analisis dan periksa.

file `app\controllers\assesmen-penilaian\modals\koreksi-item-soal.tsx` ini adalah functiion komponen yang muncul di body modal milik `shadcnUI`, saya membuat ini dengan tujuan mendapatkan pembaruan `updateRespon` dengan type `RisponsePenilaianSiswa[]`. Saya memanfaatkan `useImmer` untuk setter perubahan datanya dan function callback `handleChangeUpdateRespon` yang diteruskan ke function komponen child-nya. Setiap komponen child mempunyai komponen form, seperti `input type radio`, `input type number`

Tugas kamu adalah membuatkan saya functiion/interaksi/bisnis logic untuk beberapa kasus:
* switch komponen `pg`:
    - jika switch mengarah pada `pg`, interaksinya adalah `input type radio` dimana jika `checked = true` maka nilai untuk `respon` pada `updateRespon`nya adalah abjadnya, contohnya jika input radio checked value-nya A, maka respon nilainya A.
    - Dan jika `checked = true` dan nilainya `value` sama dengan `json_alat_jawab.valid` dengan type `number[]` sehingga saat typecheck ditulis `(soal.json_alat_jawab?.valid as number[])` adalah sama, maka `skor` untuk `updateRespon` bernilai `100`, jika beda maka `0`. `(soal.json_alat_jawab?.valid as number[])` untuk `pg` selalu bertipe `number[]` dan berkisar antara 0-4, contoh: `[0]`, `[1]`, `[2]`, dst.
    - perubahan interaksi ini, menurut saya diteruskan ke `handleChangeUpdateRespon`.
* switch komponen `isian_singkat` atau `essay`:
    -untuk switch `isian_singkat` atau `essay` hanya mempunyai interaksi perubahan `skor` saja pada `updateRespon`. `respon` pda `updateRespon` tidak perlu diubah karena itu adalah data isian sumber.

