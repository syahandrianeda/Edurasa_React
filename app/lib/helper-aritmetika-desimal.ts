/**
 * ============ Helper aritmetika desimal aman ============
 * Javascript memiliki artefak presisi pada penjumlahan/perkalian bilangan pecahan,
 * misalnya 0.1 + 0.2 menghasilkan 0.30000000000000004, dan 2.675 * 3 menghasilkan 8.024999999999999.
 * Helper berikut menghindari artefak tersebut dengan mengalikan nilai ke bilangan bulat
 * berskala terlebih dahulu (berdasarkan jumlah angka desimal masing-masing nilai),
 * menjumlahkan/mengalikan pada bilangan bulat, lalu menormalisasikan kembali ke desimal.
 * Reusable lintas domain; dipakai misalnya oleh method `initPresisi()` di
 * `app/domain/kategori-tagihan/services/KategoriAssesmenClass.ts`.
 */

/** jumlah angka desimal dari sebuah `number`, berdasarkan representasi string-nya */
export function skalaDesimal(no:number):number{
    const stringNo = no.toString();
    const titik = stringNo.indexOf('.');
    return titik === -1 ? 0 : stringNo.length - titik - 1;
}

/** penjumlahan dua `number` tanpa artefak floating-point (mis. jmlAman(0.1, 0.2) === 0.3) */
export function jmlAman(a:number, b:number):number{
    const faktor = 10 ** Math.max(skalaDesimal(a), skalaDesimal(b));
    return (Math.round(a * faktor) + Math.round(b * faktor)) / faktor;
}

/** perkalian dua `number` tanpa artefak floating-point */
export function kaliAman(a:number, b:number):number{
    const skalaA = skalaDesimal(a);
    const skalaB = skalaDesimal(b);
    return (Math.round(a * 10 ** skalaA) * Math.round(b * 10 ** skalaB)) / 10 ** (skalaA + skalaB);
}
