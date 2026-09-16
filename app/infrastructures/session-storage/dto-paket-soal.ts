import type { PraSettingPaket } from "~/domain/paket-soal/entities/pra-setting-paket";
import type { PaketSoalDesign } from "~/domain/paket-soal/result/paket-soal";
interface IdentitasKontenPaket {
    start_time: Date;
    end_time?: Date;
}
interface IdentitasKontenPaketDTO {
    start_time: string;
    end_time?: string;
}
export interface PaketSoalDesignDTO
    extends Omit<PaketSoalDesign, "setting"> {

    setting?: PraSettingPaketDTO;
}
export interface PraSettingPaketDTO
    extends Omit<PraSettingPaket, "identitas"> {

    identitas: IdentitasKontenPaketDTO;
}
export function mapPaketSoalDesignDTO(
    dto: PaketSoalDesign
): PaketSoalDesign {

    return {
        ...dto,

        setting: dto.setting
            ? {
                ...dto.setting,

                identitas: {
                    ...dto.setting.identitas,

                    start_time:
                        new Date(
                            dto.setting.identitas.start_time
                        ),

                    end_time:
                        dto.setting.identitas.end_time
                            ? new Date(
                                dto.setting.identitas.end_time
                            )
                            : undefined,
                },
            }
            : undefined,
    };
}