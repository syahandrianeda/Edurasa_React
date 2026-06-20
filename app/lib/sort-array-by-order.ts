/**
 * Mengurutkan array objek berdasarkan urutan array number tertentu.
 * * @param array - Array objek yang ingin diurutkan
 * @param key - Nama properti/key di dalam objek yang menjadi acuan (bertipe number)
 * @param order - Array number yang berisi urutan id/nilai yang diinginkan
 * contoh penggunaan:
// 1. Data awal (acak)
const dataProduk = [
    { id: 10, nama: "Laptop", harga: 15000000 },
    { id: 5, nama: "Mouse", harga: 200000 },
    { id: 23, nama: "Keyboard", harga: 500000 },
    { id: 2, nama: "Monitor", harga: 3000000 },
];

// 2. Parameter urutan yang kamu berikan (number[])
const urutanId: number[] = [23, 2, 10, 5];

// 3. Jalankan fungsi helper
const hasilUrut = sortArrayByOrder(dataProduk, "id", urutanId);

console.log(hasilUrut);
result:
[
    { "id": 23, "nama": "Keyboard", "harga": 500000 },
    { "id": 2, "nama": "Monitor", "harga": 3000000 },
    { "id": 10, "nama": "Laptop", "harga": 15000000 },
    { "id": 5, "nama": "Mouse", "harga": 200000 }
]
 */
function sortArrayByOrder<T>(array: T[], key: keyof T, order: number[]): T[] {
    // 1. Buat Map untuk menyimpan posisi indeks dari aturan urutan agar pencarian cepat
    const orderMap = new Map<number, number>();
    order.forEach((id, index) => orderMap.set(id, index));

    // 2. Duplikat array asli [...array] agar tidak merusak data original (immutability)
    return [...array].sort((a, b) => {
        const valA = a[key] as unknown as number;
        const valB = b[key] as unknown as number;

        // Jika id tidak ditemukan di dalam array order, berikan indeks Infinity (ditaruh di paling akhir)
        const indexA = orderMap.has(valA) ? orderMap.get(valA)! : Infinity;
        const indexB = orderMap.has(valB) ? orderMap.get(valB)! : Infinity;

        return indexA - indexB;
    });
}