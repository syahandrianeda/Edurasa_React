/* =========================================================
 * DTO
 * ========================================================= */

import type { IdentitasKontenPaket } from "~/domain/paket-soal/entities/identitas-paket";
import type { PaketSoalAppType } from "~/types/bank-soal/entities/paket-soal-app-type";
import type { DataSoalDesignBaku } from "~/types/bank-soal/entities/DataSoalDesignBaku";
import type { PraSettingBaku } from "~/types/bank-soal/entities/PraSettingBaku";
import type { PaketSoalSheetType } from "~/types/bank-soal/entities/paket-soal-sheet-type";

export class PaketSoalDTO {

    /* =====================================================
     * PUBLIC API
     * ===================================================== */

    /**
     * Mengubah data dari format Sheet menjadi format App.
     *
     * Sheet:
     *
     * target_rombel = "7A, 7B, 7C"
     * kode_mapel    = "MTK, IPA"
     * id_banksoal   = "1, 2, 3"
     * lintas_mapel  = 1
     *
     * menjadi:
     *
     * target_rombel = ["7A", "7B", "7C"]
     * kode_mapel    = ["MTK", "IPA"]
     * id_banksoal   = [1, 2, 3]
     * lintas_mapel  = true
     */
    static fromSheet( data: PaketSoalSheetType ): PaketSoalAppType {
        return {
            idbaris             : data.idbaris,
            target_asesmen      : data.target_asesmen,
            target_rombel       : this.stringToStringArray( data.target_rombel ),
            nama_paket          : data.nama_paket,
            lintas_mapel        : this.numberToBoolean( data.lintas_mapel ),
            kode_mapel          : this.stringToStringArray( data.kode_mapel ),
            id_banksoal         : this.stringToNumberArray( data.id_banksoal ),
            json_setting        : data.json_setting ? this.parseJsonSetting( data.json_setting ):undefined,
            json_desain         : this.parseJsonDesain( data.json_desain )
        };
    }

    static arrayFromSheet (data:PaketSoalSheetType[]):PaketSoalAppType[]{
        return data.map(this.fromSheet)
    }

    /**
     * Mengubah data dari format App menjadi format Sheet.
     *
     * App:
     *
     * target_rombel = ["7A", "7B", "7C"]
     * kode_mapel    = ["MTK", "IPA"]
     * id_banksoal   = [1, 2, 3]
     * lintas_mapel  = true
     *
     * menjadi:
     *
     * target_rombel = "7A,7B,7C"
     * kode_mapel    = "MTK,IPA"
     * id_banksoal   = "1,2,3"
     * lintas_mapel  = 1
     */
    static toSheet( data: PaketSoalAppType ): PaketSoalSheetType {

        return {
            idbaris         : data.idbaris,
            target_asesmen  : data.target_asesmen,
            target_rombel   : this.stringArrayToString( data.target_rombel ),
            nama_paket      : data.nama_paket,
            lintas_mapel    : this.booleanToNumber( data.lintas_mapel ),
            kode_mapel      : this.stringArrayToString( data.kode_mapel ),
            id_banksoal     : this.numberArrayToString( data.id_banksoal ),
            json_setting    : data.json_setting ? this.stringifyJsonSetting( data.json_setting ): undefined,
            // json_desain     : this.stringifyJsonDesain( data.json_desain )
            user            : data.useu,
            
        };
    }


    /* =====================================================
     * STRING <-> STRING[]
     * ===================================================== */

    /**
     * "7A, 7B, 7C"
     * ->
     * ["7A", "7B", "7C"]
     */
    private static stringToStringArray( value: string ): string[] {

        if (!value?.trim()) { return []; }

        return value
            .split(',')
            .map(item => item.trim())
            .filter(Boolean);
    }


    /**
     * ["7A", "7B", "7C"]
     * ->
     * "7A,7B,7C"
     */
    private static stringArrayToString( value: string[] ): string {

        if (!Array.isArray(value)) {
            return '';
        }

        return value
            .map(item => String(item).trim())
            .filter(Boolean)
            .join(',');
    }


    /* =====================================================
     * STRING <-> NUMBER[]
     * ===================================================== */

    /**
     * "1, 2, 3"
     * ->
     * [1, 2, 3]
     */
    private static stringToNumberArray( value: string ): number[] {
        if (!value?.trim()) {
            return [];
        }

        return value
            .split(',')
            .map(item => item.trim())
            .filter(Boolean)
            .map(item => Number(item))
            .filter(item => Number.isFinite(item));
    }


    /**
     * [1, 2, 3]
     * ->
     * "1,2,3"
     */
    private static numberArrayToString( value: number[] ): string {

        if (!Array.isArray(value)) {
            return '';
        }

        return value
            .filter(item => Number.isFinite(item))
            .join(',');
    }


    /* =====================================================
     * BOOLEAN <-> NUMBER
     * ===================================================== */

    /**
     * 1 -> true
     * 0 -> false
     */
    private static numberToBoolean( value: number ): boolean {

        return value === 1;
    }


    /**
     * true  -> 1
     * false -> 0
     */
    private static booleanToNumber( value: boolean ): number {

        return value ? 1 : 0;
    }


    /* =====================================================
     * JSON SETTING
     * ===================================================== */

    /**
     * Mengubah string JSON Sheet menjadi
     * PraSettingBaku.
     *
     * Selain JSON.parse(), tanggal juga direstore
     * menjadi object Date.
     */
    private static parseJsonSetting( value: string ): PraSettingBaku {

        const parsed: unknown = this.parseJson(
            value,
            'json_setting'
        );

        if (!this.isObject(parsed)) {
            throw new Error(
                'json_setting harus berupa object.'
            );
        }

        const data = parsed as Record<string, unknown>;

        const identitas = data.identitas;

        if (!this.isObject(identitas)) {
            throw new Error(
                'json_setting.identitas tidak valid.'
            );
        }

        const identitasData = {
                    ...identitas,

                    start_time: this.parseDate(
                        identitas.start_time,
                        'json_setting.identitas.start_time'
                    ),

                    ...(identitas.end_time
                        ? {
                            end_time: this.parseDate(
                                identitas.end_time,
                                'json_setting.identitas.end_time'
                            )
                        }
                        : {}
                    )
                } as IdentitasKontenPaket;

        return {
            ...data,
            identitas: identitasData
        } as PraSettingBaku;
    }


    /**
     * Mengubah PraSettingBaku menjadi string JSON.
     */
    private static stringifyJsonSetting( value: PraSettingBaku ): string {

        this.validateObject( value, 'json_setting' );

        this.validateObject( value.identitas, 'json_setting.identitas' );

        if (!(value?.identitas?.start_time instanceof Date)) {
            throw new Error(
                'json_setting.identitas.start_time harus berupa Date.'
            );
        }

        if ( value.identitas.end_time !== undefined && !(value.identitas.end_time instanceof Date) ) {
            throw new Error(
                'json_setting.identitas.end_time harus berupa Date.'
            );
        }

        return JSON.stringify(value);
    }


    /* =====================================================
     * JSON DESAIN
     * ===================================================== */

    /**
     * Mengubah string JSON Sheet menjadi
     * DataSoalDesignBaku.
     */
    private static parseJsonDesain( value: string ): DataSoalDesignBaku {

        const parsed: unknown = this.parseJson(
            value,
            'json_desain'
        );

        if (!this.isObject(parsed)) {
            throw new Error(
                'json_desain harus berupa object.'
            );
        }

        return parsed as DataSoalDesignBaku;
    }


    /**
     * Mengubah DataSoalDesignBaku menjadi string JSON.
     */
    private static stringifyJsonDesain( value: DataSoalDesignBaku ): string {

        this.validateObject( value, 'json_desain' );

        return JSON.stringify(value);
    }


    /* =====================================================
     * GENERIC JSON HELPER
     * ===================================================== */

    private static parseJson( value: string, fieldName: string ): unknown {

        if (!value?.trim()) {
            throw new Error(
                `${fieldName} tidak boleh kosong.`
            );
        }

        try {
            return JSON.parse(value);
        } catch (error) {

            throw new Error(
                `${fieldName} bukan JSON yang valid.`,
                {
                    cause: error
                }
            );
        }
    }


    /* =====================================================
     * TYPE GUARDS
     * ===================================================== */

    private static isObject( value: unknown ): value is Record<string, any> {

        return (
            typeof value === 'object' &&
            value !== null &&
            !Array.isArray(value)
        );
    }


    private static validateObject( value: unknown, fieldName: string ): void {

        if (!this.isObject(value)) {
            throw new Error(
                `${fieldName} harus berupa object.`
            );
        }
    }


    /* =====================================================
     * DATE HELPER
     * ===================================================== */

    private static parseDate( value: unknown, fieldName: string ): Date {

        if (value instanceof Date) {
            return value;
        }

        if ( typeof value !== 'string' && typeof value !== 'number' ) {
            throw new Error(
                `${fieldName} bukan tanggal yang valid.`
            );
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            throw new Error(
                `${fieldName} bukan tanggal yang valid.`
            );
        }

        return date;
    }
}