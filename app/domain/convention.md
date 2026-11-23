# Penamaan Type/Interface
1. Utamakan nama berdasarkan domain dan makna data. Jangan sekadar memberi nama berdasarkan kumpulan property.
2. Gunakan nama entitas sebagai type dasar, misalnya Siswa, bukan SiswaDataInterface.
3. Tambahkan suffix seperti Detail, Summary, Input, Response, atau Result jika memberikan konteks yang berbeda.
4. Jangan membuat interface turunan jika tidak ada perbedaan tanggung jawab atau struktur yang berarti.
5. Gunakan extends untuk mengembangkan kontrak objek yang memiliki hubungan spesialisasi.
6. Gunakan Omit ketika ingin mengganti tipe property, bukan & secara langsung.
7. Pisahkan type untuk domain, API, dan kebutuhan pengolahan internal jika ketiganya memang memiliki struktur atau tanggung jawab berbeda.

## Apa itu Domain?
    Domain adalah bidang permasalahan atau ruang lingkup bisnis yang ingin diselesaikan oleh aplikasi. 
    
    Domain menjelaskan masalah bisnis apa yang sedang kita selesaikan

## Apa itu Entity?
    Entity adalah objek yang memiliki identitas yang membedakannya dari objek lain, dan identitas tersebut tetap bermakna sepanjang siklus hidup objeknya

## Apa itu Value Object?
    Value Object adalah objek yang identitasnya ditentukan oleh nilai yang dikandungnya, bukan oleh identitas unik tersendiri.
    Value Object biasanya tidak memiliki identitas bisnis independen dan idealnya tidak dimutasi setelah dibuat.

## Contoh Kesepakatan:
Kesepakatan 1 — Bahasa domain
Tim harus mempunyai kamus istilah bisnis atau Ubiquitous Language.

setiap istilah domain mempunyai:
- Nama baku.
- Definisi.
- Sinonim yang diperbolehkan.
- Sinonim yang tidak diperbolehkan.
- Contoh penggunaannya.

Misalnya, dalam Edurasa:
|Istilah|	Definisi yang disepakati|
| :--- | :--- |
|Mapel	|Mata pelajaran dalam kurikulum|
|CP	|Capaian Pembelajaran|
|TP	|Tujuan Pembelajaran|
|ATP |Alur Tujuan Pembelajaran|
|Tagihan	|Kewajiban asesmen yang harus dipenuhi|
|Respon	|Jawaban siswa terhadap instrumen|
|Penilaian	|Proses atau hasil pemberian nilai|
|Rekap	|Hasil penggabungan atau agregasi data penilaian    |

Kesepakatan 2 — Kategori objek
Setiap type harus dapat dikategorikan.

Saya menyarankan klasifikasi berikut:
|Kategori	|Definisi	|Contoh|
|:---|:---|:---|
|Entity	|Objek domain dengan identitas	|Siswa|
|Value Object	|Objek berdasarkan nilai	|RentangTanggal|
|Domain Type[<sup>Domain Type</sup>](#domainTypeDefinition)	|Kontrak struktur domain	|Mapel|
|DTO	|Kontrak transfer data	|SiswaResponseDTO|
|Composite	|Gabungan beberapa konsep	|SiswaWithNilaiMapel|
|Result	|Hasil proses bisnis	|RekapAssesmenResult|
|View Model	|Kontrak presentasi	|RekapAssesmenView|
|Persistence Model|	Kontrak penyimpanan	|SiswaRecord|
|Mapper Structure|	Struktur indeks/pencarian	|SiswaByNisMap|

<a id="#domainTypeDefinition">Catatan Penting</a>

**Domain Type** bukan kategori yang setara dengan Entity dan Value Object dalam DDD. Domain Type adalah istilah praktis untuk kontrak TypeScript yang mewakili konsep domain. Satu Domain Type bisa mendeskripsikan Entity, Value Object, atau struktur domain lainnya

## contoh penamaan:

|Entity          |: Siswa|
|---|---|
|Value Object    |: RentangTanggal|
|DTO             |: SiswaResponseDTO|
|Composite       |: SiswaWithNilai|
|Result          |: RekapAssesmenResult|
|ViewModel       |: RekapAssesmenViewModel|
|Persistence     |: SiswaRecord|
|Mapper          |: SiswaMapper|
|Use Case        |: RekapAssesmenUseCase|