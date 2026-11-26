Buatkan saya fitur Export to file Word (doc.x) dari suatu komponen sebagai sumber halaman file. 
Saya sudah mempunyai function/file function berikut:
- UseDocxEdura
- exportDocx
- MapRootParsedDocx
- useExportTarget
package pendukung:
- docx
- tailwindcss
- fileSaver

setiap komponen menggunakan css dengan tailwindcss, 

function diterapkan dalam modal berikut:
- CetakPaketSoalServer melalui trigger button yang dapat Kmau buatkan function tersendiri.
- sumber tampilan diambil dari komponen `div` dengan property 'ref' pada file `CetakPaketSoalServer`;

Pastikan Gambar pada hasil export muncul dan usahakan tidak muncul keterangan `this picture cant be displayed`, gambar memang berasal dari penyimpanan server google drive. Menurutku, untuk mengatasi masalah CORS, Bisakah kamu buatkan data blob-nya saja sehingga gambar tetap bisa diexport ke file word? Kemudian, ukuran gambar juga tidak sama persis dengan ukuran gambar pada komponen sumber, tolong kamu sesuaikan ukuran gambarnya juga.

Pada komponen Ol/UL, pastikan inden dan spacingnya sesuai dengan ukuran dari komponen. 