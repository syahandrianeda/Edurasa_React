export const ModaTransportasi = {
    NONE: "-", // pengganti ""
    JALAN_KAKI: "JALAN_KAKI",
    KENDARAAN_PRIBADI: "KENDARAAN_PRIBADI",
    KENDARAAN_UMUM: "KENDARAAN_UMUM",
    JEMPUTAN_SEKOLAH: "JEMPUTAN_SEKOLAH",
    KERETA_API: "KERETA_API",
    OJEK: "OJEK",
    ANDONG: "ANDONG",
    PERAHU_PENYEBRANGAN: "PERAHU_PENYEBRANGAN",
    LAINNYA: "LAINNYA",
} as const

export const ModaTransportasiMeta: Record<
    ModaTransportasi,
    { label: string }
> = {
    [ModaTransportasi.NONE]: { label: "Silakan Pilih" },
    [ModaTransportasi.JALAN_KAKI]: { label: "Jalan Kaki" },
    [ModaTransportasi.KENDARAAN_PRIBADI]: { label: "Kendaraan Pribadi" },
    [ModaTransportasi.KENDARAAN_UMUM]: {
        label: "Kendaraan Umum / Angkot / Pete-pete",
    },
    [ModaTransportasi.JEMPUTAN_SEKOLAH]: { label: "Jemputan Sekolah" },
    [ModaTransportasi.KERETA_API]: { label: "Kereta Api" },
    [ModaTransportasi.OJEK]: { label: "Ojek" },
    [ModaTransportasi.ANDONG]: {
        label: "Andong / Bendi / Sado / Dokar / Delman / Beca",
    },
    [ModaTransportasi.PERAHU_PENYEBRANGAN]: {
        label: "Perahu Penyebrangan / Rakit / Getek",
    },
    [ModaTransportasi.LAINNYA]: { label: "Lainnya" },
}

export type ModaTransportasi = typeof ModaTransportasi[keyof typeof ModaTransportasi]
