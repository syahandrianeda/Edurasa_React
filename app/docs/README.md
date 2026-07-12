# Editor Engine Documentation

Selamat datang di dokumentasi Editor Engine.

Repository ini tidak hanya berisi source code, tetapi juga keputusan arsitektur yang menjadi fondasi seluruh pengembangan editor.

Dokumentasi dibagi menjadi empat bagian utama:

```
docs/

README.md

architecture/

roadmap/

decisions/
```

## Tujuan

Dokumentasi ini dibuat agar:

* menjadi sumber kebenaran proyek (Source of Truth),
* mengurangi ketergantungan terhadap riwayat percakapan,
* mempermudah onboarding developer baru,
* menjaga konsistensi Clean Architecture,
* menjadi acuan seluruh milestone implementasi.

## Filosofi

Editor dibangun menggunakan prinsip:

* Clean Architecture
* Domain Driven Design
* Dependency Rule
* Composition Root
* Immutable Document Model
* Adapter Pattern

Seluruh implementasi baru harus mengikuti keputusan yang telah dikunci pada folder `decisions/`.
