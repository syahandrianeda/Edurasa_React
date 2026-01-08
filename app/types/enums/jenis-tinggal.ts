export const JenisTempatTinggal = {
    NONE: "-",               // pengganti ""
    ORANG_TUA: "ORANG_TUA",
    WALI: "WALI",
    KOS: "KOS",
    ASRAMA: "ASRAMA",
    PANTI_ASUHAN: "PANTI_ASUHAN",
    LAINNYA: "LAINNYA",
} as const

export const JenisTempatTinggalMeta: Record<
    JenisTempatTinggal,
    { label: string }
> = {
    [JenisTempatTinggal.NONE]: { label: "Belum Memilih" },
    [JenisTempatTinggal.ORANG_TUA]: { label: "Bersama Orang Tua" },
    [JenisTempatTinggal.WALI]: { label: "Wali" },
    [JenisTempatTinggal.KOS]: { label: "Kos" },
    [JenisTempatTinggal.ASRAMA]: { label: "Asrama" },
    [JenisTempatTinggal.PANTI_ASUHAN]: { label: "Panti Asuhan" },
    [JenisTempatTinggal.LAINNYA]: { label: "Lainnya" },
}

export type JenisTempatTinggal = typeof JenisTempatTinggal[keyof typeof JenisTempatTinggal]
