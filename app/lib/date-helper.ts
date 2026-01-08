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
        new Date(y,mo,d);
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
  return `${y}-${m}-${d}`
}