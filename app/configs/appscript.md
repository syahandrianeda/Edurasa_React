# Rencana Refaktor AppScriptSheet ts

## Latar Belakang
 - Spreedsheet terlalu banyak tab
    Pada dasarnya, penempatan sheet dan tab-nya didasari oleh optimalisasi pemanggilan data
    oleh AppScript ke Spreadsheet. Jika dalam satu fitur membutuhkan data sheet di berbagai tab dalam beberapa SpreadSheet dikhawatirkan `limitasi AppScript` tercapai. Itulah alasan mengapa
    tab-tab di dalam Spreadsheet tertentu ada yang banyak.
    Contohnya, SpreadSheet `Materi`. Spreadsheet ini mempunyai lebih banyak tab daripada yang lain. Karena ada satu fitur (misalnya Fitur Bank Soal), maka ia butuh mengambil data `kurikulum`, data `kbm`, dan masih banyak data-data yang perlu dipanggil. Alhasil, ketika fitur aplikasi ini dijalankan, mau tidak mau harus memanggil serentak. Ketika memanggil serentak, maka AppScript akan membuka Spreadsheet mana. Jika kebanyakan, `dikhawatirkan` collaps
- Pembatasan Jumlah Spreadsheet yang dibuka
  Jika perlu dibatasi, tiap mengambil data yang membutuhkan beberapa Spreadsheet,dibatasi maksimal sampai 3 SpreadSheet.

### Refactor `macro.json`
 Ada rencana untuk mengubah `macro.json` agar semantic dan mudah dikelola. Selama ini, `macro.json` masih kurang begitu dipahami. Misalnya, ketika mencari data `kurikulum`, kita akan mencarinya di Spreadsheet `materi`, `kaldik`, dan lain-lain. Ini akan memudahkan seandainya ditempatkan di satu spreadsheet saja bernama `Kurikulum`. Ini baru satu contoh, belum lagi yang lain.

 #### Resiko mengubah Macro.json
 - Jika mengubah macro, kemungkinan beberapa kode akan dirombak, tidak semuanya. Tapi ini butuh waktu yang lama.