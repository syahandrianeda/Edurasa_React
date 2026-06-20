interface OpsiJawaban {
  id: number;
  isCorrect: boolean; // true jika ini jawaban yang benar, false jika pengecoh
}

/**
 * Helper untuk menghitung skor Pilihan Ganda Kompleks
 * @param opsiDipilihSiswa - Array ID opsi yang diceklis oleh siswa
 * @param semuaOpsiSoal - Array semua objek opsi yang ada pada soal tersebut
 * @param skorMaksimal - Total skor jika benar semua (default 100)
 */
function hitungSkorPGK(
    opsiDipilihSiswa: number[],
    semuaOpsiSoal: OpsiJawaban[],
    skorMaksimal: number = 100
    ): number {
    // 1. Hitung total opsi yang benar dan salah berdasarkan kunci jawaban
    const totalBenar = semuaOpsiSoal.filter(o => o.isCorrect).length;
    const totalSalah = semuaOpsiSoal.filter(o => !o.isCorrect).length;

    let userBenar = 0;
    let userSalah = 0;

    // 2. Hitung apa saja yang diceklis oleh siswa
    opsiDipilihSiswa.forEach(id => {
        const opsi = semuaOpsiSoal.find(o => o.id === id);
        if (opsi) {
        if (opsi.isCorrect) {
            userBenar++;
        } else {
            userSalah++;
        }
        }
    });

    // 3. Hitung proporsi (mencegah pembagian dengan angka 0 jika soal tidak valid)
    const proporsiBenar = totalBenar > 0 ? userBenar / totalBenar : 0;
    const proporsiSalah = totalSalah > 0 ? userSalah / totalSalah : 0;

    // 4. Kalkulasi Skor Akhir dengan batasan minimal 0
    const skorAkhir = (proporsiBenar - proporsiSalah) * skorMaksimal;
    
    // Bulatkan hasil ke 2 angka di belakang koma
    return Math.max(0, Math.round(skorAkhir * 100) / 100);
}