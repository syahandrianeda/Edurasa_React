import type { PersonalTypeEnum } from "~/types/galleries/personal-type-enum";

export function getEnumKey<
  T extends Record<string, string>
>(enumObj: T, value: string): keyof T | '' {
  const entry = Object.entries(enumObj)
    .find(([_, v]) => v === value)

  return (entry?.[0] ?? '') as keyof T | ''
}
export function getEnumKeyUndefined<
  T extends Record<string, string>
>(enumObj: T, value: string): keyof T|undefined {
  const entry = Object.entries(enumObj)
    .find(([_, v]) => v === value)

  return (entry?.[0] ?? undefined) as keyof T | undefined
  // return entry[0]
}

export function getEnumKeyFromKeyItSelf<PersonalTypeEnum>(enumObj:PersonalTypeEnum, key:string):keyof typeof PersonalTypeEnum|undefined{
  switch(key){
    case 'SISWA':
      return 'SISWA';
    case 'PTK':
      return 'PTK' 
    default:
      return 'SISWA'
  }
}