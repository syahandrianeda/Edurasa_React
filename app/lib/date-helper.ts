import type { SiswaType } from "~/types/siswa"

export const ShortDayName:string[]=[
  'Mg',
  'Sn',
  'Sl',
  'Rb',
  'Km',
  'Jm',
  'Sb'
]
export function formatDisplayInput(date?: Date): string {
  if (!date) return ""
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}


/**
 * Ambil bagian YYYY-MM-DD dari ISO backend (termasuk microseconds) lalu
 * buat Date di UTC midnight agar bebas masalah timezone.
 */
export function parseBackendISO(value?: string|Date): Date | undefined {
    if (!value) return undefined
    if(typeof value === 'string'){
        const m = value.match(/^(\d{4})-(\d{2})-(\d{2})/)
        if (!m) return undefined
        const y = Number(m[1])
        const mo = Number(m[2]) - 1
        const d = Number(m[3])
        // Buat Date pada UTC 00:00 agar konsisten lintas timezone
        // return new Date(Date.UTC(y, mo, d))
        return new Date(y,mo,d);
    }
    return new Date(value);
    // return new Date(Date.UTC(
    //         value.getUTCFullYear(),
    //         value.getUTCMonth(),
    //         value.getUTCDate()
    //     ))
}

/**
 * Format untuk disimpan ke backend: UTC midnight + 6 digit microseconds.
 * Contoh: 2014-09-20T00:00:00.000000Z
 */
export function formatBackendISO(date?: Date): string {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2,'0');
  const d = String(date.getDate()).padStart(2,'0');
  // return `${y}-${m}-${d}T00:00:00.000000Z`
  //2025-09-24T17:00:00.000Z
  return `${y}-${m}-${d}`
}

export type DateToString<T> = {
  [K in keyof T]: T[K] extends Date
    ? string
    : T[K]
}

export function formatDateSheet(
  date?: Date | string | null
): string {
  if (!date) return ''
  const d = new Date(date)

  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()

  // return `${day}/${month}/${year}`
  return `${year}-${month}-${day}`
}

export function formatStringBulanTahun(d:Date): string{
  if(!d) return ''
  const date = new Date(d);
  return date.toLocaleDateString('id-ID',{year:"numeric", month:'long'})
}

export function getBulanTapel(tahun: number): Date[] {
  return [
    ...[6, 7, 8, 9, 10, 11].map(m => new Date(tahun, m, 1)),
    ...[0, 1, 2, 3, 4, 5].map(m => new Date(tahun + 1, m, 1)),
  ]
}
/**
 * Mengambil tanggal terakhir dari bulan yang sama dengan tanggal input
 */
export function getLastDate(input: Date): Date {
  if (!(input instanceof Date) || isNaN(input.getTime())) {
    // throw new Error('Invalid Date')
    return new Date(input)
  }

  const year = input.getFullYear()
  const month = input.getMonth()

  // day = 0 → hari terakhir bulan sebelumnya
  return new Date(year, month + 1, 0)
}

export function counstDaysInMonth(date:Date):number {
  const y = date.getFullYear();
  const m = date.getMonth()+1;
  return new Date(y,m,0).getDate();
}

export function getLastDateOfPreviousMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 0)
}
export function getParseDateYYYYMMMDD(value: unknown): number {
  if (!value) return 0;
      const d = value instanceof Date ? value : new Date(value as any);
      const y = d.getFullYear().toString();
      const m = String(d.getMonth()+1).padStart(2,'0');
      const day = String(d.getDate()).padStart(2,'0');
      const teks = y+m+day;

    return Number.isNaN(teks) ? 0 : Number(teks);
}
export function isSameDay(day1:Date, day2:Date):boolean{
  const h1= day1.getDate();
  const b1 =day1.getMonth();
  const y1 = day1.getFullYear();
  
  const h2= day2.getDate();
  const b2 =day2.getMonth();
  const y2 = day2.getFullYear();
  return (h1===h2 && b1 === b2 && y1 === y2)
  
}
export function getParseDateDMMYYYY(value: unknown): string {
  if (!value) return '';
      const d = value instanceof Date ? value : new Date(value as any);
      const y = d.getFullYear().toString();
      const m = String(d.getMonth()+1).padStart(2,'0');
      const day = String(d.getDate());//.padStart(2,'0');
      return  day+m+y

}

export function formatTanggalIndonesia(
  value?: string | Date | null,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'long' }
): string {
  if (!value) return ''

  const date = value instanceof Date ? value : new Date(value)

  if (isNaN(date.getTime())) return ''

  return date.toLocaleString('id-ID', options)
}

export function hitungUmurTahun(tanggalLahir: Date, referensi = new Date()): number {
      
    if(!tanggalLahir) return 0;

        let umur = referensi.getFullYear() - tanggalLahir.getFullYear();
        const m = referensi.getMonth() - tanggalLahir.getMonth();

        if (m < 0 || (m === 0 && referensi.getDate() < tanggalLahir.getDate())) {
        umur--;
        }

        return umur;
    }

export const RENTANG_UMUR = {
    '<=6':  { min: 0,  max: 6 },
    '7-12': { min: 7,  max: 12 },
    '>=13': { min: 13, max: Infinity },
} as const;

export type RentangUmur =
    | '<=6'
    | '7-12'
    | '>=13';

export function filterByRentangUmurTahunSiswa(rentang: RentangUmur, referensi: Date = new Date(), data:SiswaType[]): SiswaType[] {
        const { min, max } = RENTANG_UMUR[rentang];

        return data.filter(siswa => {
            if (!siswa.pd_tanggallahir) return false;

            const umur = hitungUmurTahun(
            new Date(siswa.pd_tanggallahir),
            referensi 
            );

            return umur >= min && umur <= max;
        });
        }
/**
 * Menghitung lama hari secara inklusif (start & end dihitung)
 * @param start_tgl
 * @param end_tgl
 * @returns number (minimal 0)
 */
export function durasiHari(
  start_tgl: string | Date,
  end_tgl: string | Date
): number {
  if (!start_tgl || !end_tgl) return 0;

  const start = new Date(start_tgl);
  const end = new Date(end_tgl);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;

  // normalisasi jam
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diffTime = end.getTime() - start.getTime();

  // jika end < start → 0
  if (diffTime < 0) return 0;

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // +1 karena inklusif
  return diffDays + 1;
}

export function getMemberTanggal(start:Date, end:Date):number[]{;
        const result:number[]=[];
        const _start = new Date(start);
        while(_start <=  end){
            const yyymmdd = getParseDateYYYYMMMDD(_start);
            result.push(yyymmdd);
            _start.setDate(_start.getDate()+1);
        }
        return result;
    }

export function getLabelTanggalBetweenDate(start:Date, end:Date):string{
        const YearStart = start.getFullYear();
        const MonthStart = start.getMonth();
        const YearEnd = end.getFullYear();
        const MonthEnd = end.getMonth();

        if(YearStart === YearEnd){
            if(MonthStart === MonthEnd){
                if(start.getDate() === end.getDate()){
                    return `${end.toLocaleDateString('id-ID',{dateStyle:'medium'})}`;
                }else{
                    return `${start.getDate()} s/d ${end.toLocaleDateString('id-ID',{dateStyle:'medium'})}`;
                }
            }else{
                return `${new Intl.DateTimeFormat( 'id-ID', { day:'numeric',month:'short',}).format(start)} s/d ${end.toLocaleDateString('id-ID',{dateStyle:'medium'})}`;
            }
        }else{
            return `${start.toLocaleDateString('id-ID',{dateStyle:'medium'})}/${end.toLocaleDateString('id-ID',{dateStyle:'medium'})}`;
        }
        
    }

export function getEndDate(tanggal: Date, jumlahHari: number): Date {
    const hasil = new Date(tanggal);
    hasil.setDate(hasil.getDate() + (jumlahHari-1));
    return hasil;
}

/**
 * Menghitung lama hari secara inklusif (start & end dihitung)
 * @param start_tgl
 * @param end_tgl
 * @returns number (minimal 0)
 */
export function durasiMenit(
  start_tgl: string | Date,
  end_tgl: string | Date
): number {
  if (!start_tgl || !end_tgl) return 0;

  const start = new Date(start_tgl);
  const end = new Date(end_tgl);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;

  // normalisasi jam
  // start.setHours(0, 0, 0, 0);
  // end.setHours(0, 0, 0, 0);

  const diffTime = end.getTime() - start.getTime();

  // jika end < start → 0
  if (diffTime < 0) return 0;

  const diffDays = Math.floor(diffTime / (1000 * 60 ));

  // +1 karena inklusif
  return diffDays 
}