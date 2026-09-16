import {Agama, type Agama as AgamaType} from "~/types/enums/agama";
import { Gender, type Gender as GenderType } from "~/types/enums/gender";

export const resolveString = (
  value: any,
  fallback = ""
): string => {
  if (value === null || value === undefined) return fallback;
  return String(value).trim();
};

export const resolveNumber = (
  value: any,
  fallback = 0
): number => {
  const n = Number(value);
  return isNaN(n) ? fallback : n;
};

export const resolveDate = (
  value: any,
  fallback: Date | null = null
): Date | null => {
  if (!value) return fallback;

  const d = new Date(value);
  return isNaN(d.getTime()) ? fallback : d;
};

export const resolveEnum = <
  T extends Record<string, unknown>
>(
  value: any,
  enumObject: T,
  fallback: T[keyof T]
): T[keyof T] => {
  const values = Object.values(enumObject) as T[keyof T][];
  return values.includes(value as T[keyof T]) ? (value as T[keyof T]) : fallback;
};

export function resolveAgama(value: any): AgamaType| null {
  if (!value) return null;

  const normalized = String(value).trim().toLowerCase();

  const mapping: Record<string, Agama> = {
    islam: Agama.ISLAM,
    kristen: Agama.KRISTEN,
    katholik: Agama.KATHOLIK,
    katolik: Agama.KATHOLIK, // toleransi typo umum
    hindu: Agama.HINDU,
    buddha: Agama.BUDDHA,
    konghucu: Agama.KONGHUCU,
    konfusius: Agama.KONGHUCU, // kadang muncul di dapodik lama
  };

  return mapping[normalized] ?? null;
}

export function resolveGender(value: any): GenderType {
  if (!value) return Gender.UNKNOWN;

  const normalized = String(value).trim().toUpperCase();

  switch (normalized) {
    case Gender.LAKI_LAKI:
      return Gender.LAKI_LAKI;
    case Gender.PEREMPUAN:
      return Gender.PEREMPUAN;
    default:
      return Gender.UNKNOWN;
  }
}

export function extractKelasKode(input: string): string | null {
  const match = input.match(/kelas\s+(\d+)\s+([A-D])/i)

  if (!match) return null

  const [, jenjang, rombel] = match
  return `${jenjang}${rombel}`
}

export function toBoolean(boolean:any):boolean{
  let boleanNumber = Number(boolean);
  if(!isNaN(boleanNumber)){
    return Boolean(boleanNumber);
  }else{
    if(typeof boolean === 'string' && boolean === 'TRUE'){
      return true;
    }
  }
  return false
}

export function stringArrayToString( value: string[] ): string {

        // if (!Array.isArray(value)) {
        //     return '';
        // }

        return value
            .map(item => String(item).trim())
            // .filter(Boolean)
            .join(', ');
    }
    
export function stringToArrayString(value:string):string[]{
        if(!value) return [];
        return value.split(',').map(m=>String(m).trim()).filter(Boolean);
    }

export function stringToArrayNumber(value:string): number[]{
        if(!value) return [];
        return value.toString().split(',').map(m=> Number(m))
    }

export function  numberArrayToString( value: number[] ): string {

        if (!Array.isArray(value)) {
            return '';
        }

        return value
            .filter(item => Number.isFinite(item))
            .join(', ');
    }

    /** resolver untuk memastikan `item` menjadi number type, jika bermasalah, maka 0  */
export function makeSureNumber(item:any):number{
        if(!item) return 0
        const n = Number(item);
        return isNaN(n) ? 0 : n;
    }