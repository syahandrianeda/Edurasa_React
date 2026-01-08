export const getNumberFromString = (value: string): number | null => {
    const match = value.match(/\d+/);
    return match ? Number(match[0]) : null;
};

/**
 * 
 * @info function untuk menemukan data duplikat pada array Object. Contoh penggunaan:
 *  findDuplicateBy(siswaList, "nama_rombel"); --> result: ["7A", "7C"]

 * @param data 
 * @returns string[]
 */
export function findDuplicateBy<T, K extends keyof T>(
  data: T[],
  key: K
): T[K][] {
  const map = new Map<T[K], number>();

  data.forEach(item => {
    map.set(item[key], (map.get(item[key]) ?? 0) + 1);
  });

  return [...map.entries()]
    .filter(([, count]) => count > 1)
    .map(([value]) => value);
}

