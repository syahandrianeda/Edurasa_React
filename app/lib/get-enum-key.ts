export function getEnumKey<
  T extends Record<string, string>
>(enumObj: T, value: string): keyof T | '' {
  const entry = Object.entries(enumObj)
    .find(([_, v]) => v === value)

  return (entry?.[0] ?? '') as keyof T | ''
}
