import type { IdAkunDanPangkat } from "~/domain/tendik/entities/id-akun-dan-pangkat";
import type { InfoPersonalSiswa, SiswaType } from "../siswa";
import { type JenisSerahTerimaEnum } from "./jenis-serah-terima-enum";
import type { PersonalTypeEnum } from "./personal-type-enum";
import type { InfoPersonalPtk } from "../akun-sheet";

export interface SerahTerimaDokumenAppType{
    idbaris: number,
    nama_kegiatan: string,
    jenis?: keyof typeof JenisSerahTerimaEnum,
    start_date: Date,
    end_date?: Date,
    keterangan: string,
    akses_user: number[],
    target_person: number[],
    type_target?: keyof typeof PersonalTypeEnum,
    item_barang: string[],
    additional_info: (InfoPersonalSiswa|InfoPersonalPtk)[]//Record<string, any>[],
    status:string;
    
}

export type SerahTerimaStringKeys = Extract< keyof SerahTerimaDokumenAppType, 
    'nama_kegiatan' | 
    'keterangan' | 
    'type_target'
    >;
