export const Gender = {
    LAKI_LAKI: "L",
    PEREMPUAN: "P",
    UNKNOWN: '-'
} as const

export type Gender = typeof Gender[keyof typeof Gender]

/**
 * @info cara gunakannya:
 * GenderMeta[siswa.gender].label --> result "Laki-laki"/Perempuan
 * kalo ini: Gender.LAKI ---> result 'L"
 */
export const GenderMeta: Record<Gender, { label: string }> = {
    [Gender.LAKI_LAKI]: { label: "Laki-laki" },
    [Gender.PEREMPUAN]: { label: "Perempuan" },
    [Gender.UNKNOWN]: { label: "Belum Memilih" },
}
