import type { IdentitasKontenPaket } from "~/domain/paket-soal/entities/identitas-paket";
import type { PraSettingPaket } from "~/domain/paket-soal/entities/pra-setting-paket";
import type { PaketSoalDesign } from "~/domain/paket-soal/result/paket-soal";


export class PaketSoalDesignParseDto {

    /**
     * Mengubah object hasil JSON.parse()
     * menjadi PaketSoalDesign dengan Date yang benar.
     */
    static fromJson(data: unknown): PaketSoalDesign {
        if (!data || typeof data !== "object") {
            throw new Error("Data PaketSoalDesign tidak valid.");
        }

        const source = data as Record<string, unknown>;

        return {
            setting: source.setting
                ? this.parseSetting(source.setting)
                : undefined,

            data: Array.isArray(source.data)
                ? source.data
                : undefined,
        };
    }

    private static parseSetting(
        data: unknown
    ): PraSettingPaket {

        if (!data || typeof data !== "object") {
            throw new Error("Data setting PaketSoalDesign tidak valid.");
        }

        const source = data as Record<string, unknown>;

        return {
            ...(source as unknown as  PraSettingPaket),

            identitas: this.parseIdentitas(source.identitas),
        };
    }

    private static parseIdentitas(
        data: unknown
    ): IdentitasKontenPaket {

        if (!data || typeof data !== "object") {
            throw new Error("Data identitas PaketSoalDesign tidak valid.");
        }

        const source = data as Record<string, unknown>;

        return {
            ...(source as unknown as  IdentitasKontenPaket),

            start_time: this.parseDate(
                source.start_time,
                "start_time"
            ),

            end_time: source.end_time
                ? this.parseDate(
                    source.end_time,
                    "end_time"
                )
                : undefined,
        };
    }

    private static parseDate( value: unknown, propertyName: string ): Date {

        const date = new Date(value as string);

        if (Number.isNaN(date.getTime())) {
            throw new Error(
                `Nilai ${propertyName} bukan tanggal yang valid: ${String(value)}`
            );
        }

        return date;
    }
}