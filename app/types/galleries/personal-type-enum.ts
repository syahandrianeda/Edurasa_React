export const PersonalTypeEnum  ={
    SISWA : "Siswa",
    PTK   : "Ptk"
} as const

export type PersonalTypeEnum = typeof PersonalTypeEnum[keyof typeof PersonalTypeEnum];


/**
 * @info cara gunakannya:
 * PersonalTypeEnumMeta[SISWA].label --> result "Siswa"
 * kalo ini: PersonalTypeEnum.SISWA ---> result 'SISWA"
 */
export const PersonalTypeEnumMeta: Record<PersonalTypeEnum, { label: string }> = {
    [PersonalTypeEnum.SISWA]: { label: "Siswa" },
    [PersonalTypeEnum.PTK]: { label: "Ptk" }
}
