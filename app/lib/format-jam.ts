export function formatJam(date: Date): string {
    const jam = String(date.getHours()).padStart(2, '0');
    const menit = String(date.getMinutes()).padStart(2, '0');

    return `${jam}:${menit}`;
}