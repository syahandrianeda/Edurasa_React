export const ABK = {
    NONE: "-", // pengganti ""
    TIDAK: "TIDAK",
    NETRA: "A",
    RUNGU: "B",
    GRAHITA_RINGAN: "C",
    GRAHITA_SEDANG: "C1",
    DAKSA_RINGAN: "D",
    DAKSA_SEDANG: "D1",
    INDIGO: "O",
    DOWN_SINDROME: "P",
    AUTIS: "Q",
    LARAS: "E",
    WICARA: "F",
    TUNA_GANDA: "G",
    HIPERAKTIF: "H",
    CERDAS_ISTIMEWA: "I",
    BAKAT_ISTIMEWA: "J",
    KESULITAN_BELAJAR: "K",
} as const

export const ABKMeta: Record<ABK, { label: string }> = {
    [ABK.NONE]: { label: "Silakan Pilih" },
    [ABK.TIDAK]: { label: "Tidak" },
    [ABK.NETRA]: { label: "Netra (A)" },
    [ABK.RUNGU]: { label: "Rungu (B)" },
    [ABK.GRAHITA_RINGAN]: { label: "Grahita Ringan (C)" },
    [ABK.GRAHITA_SEDANG]: { label: "Grahita Sedang (C1)" },
    [ABK.DAKSA_RINGAN]: { label: "Daksa Ringan (D)" },
    [ABK.DAKSA_SEDANG]: { label: "Daksa Sedang (D1)" },
    [ABK.INDIGO]: { label: "Indigo (O)" },
    [ABK.DOWN_SINDROME]: { label: "Down Sindrome (P)" },
    [ABK.AUTIS]: { label: "Autis (Q)" },
    [ABK.LARAS]: { label: "Laras (E)" },
    [ABK.WICARA]: { label: "Wicara (F)" },
    [ABK.TUNA_GANDA]: { label: "Tuna Ganda (G)" },
    [ABK.HIPERAKTIF]: { label: "Hiperaktif (H)" },
    [ABK.CERDAS_ISTIMEWA]: { label: "Cerdas Istimewa (I)" },
    [ABK.BAKAT_ISTIMEWA]: { label: "Bakat Istimewa (J)" },
    [ABK.KESULITAN_BELAJAR]: { label: "Kesulitan Belajar (K)" },
}

export type ABK = typeof ABK[keyof typeof ABK]
