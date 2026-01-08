export const Agama = {
    ISLAM: "Islam",
    KRISTEN: "Kristen",
    KATHOLIK: "Katholik",
    HINDU: "Hindu",
    BUDDHA: "Buddha",
    KONGHUCU: "Konghucu",
} as const

export type Agama = typeof Agama[keyof typeof Agama]

export const AgamaMeta: Record<Agama, { label: string }> = {
    Islam: { label: "Islam" },
    Kristen: { label: "Kristen" },
    Katholik: { label: "Katholik" },
    Hindu: { label: "Hindu" },
    Buddha: { label: "Buddha" },
    Konghucu: { label: "Konghucu" },
}
