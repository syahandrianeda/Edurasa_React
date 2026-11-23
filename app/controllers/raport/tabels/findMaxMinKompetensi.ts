
import type { AtpDescriptionRefrence, CpDescriptionRefrence, MakMinAtp, MakMinCp, MakMinTp, TpDescriptionRefrence } from "~/domain/raport/types/RaportIntarface";

export type MakMinRefrence = MakMinAtp|MakMinTp|MakMinCp|undefined;

export type MakMinKey = 'atp_id' | 'tp_id' | 'cp_id';

export type MakMinData =
    | AtpDescriptionRefrence
    | TpDescriptionRefrence
    | CpDescriptionRefrence;

export type MakMinResult<T> = {
    type: 'max' | 'min';
    data: T;
} | null;

// export function findMaxMin(
//     source: MakMinRefrence,
//     key: MakMinKey,
//     id: number
// ): MakMinResult<MakMinData> {

//     if (!source) return null;

//     const find = (
//         type: 'max' | 'min',
//         data: MakMinData | null
//     ): MakMinResult<MakMinData> => {

//         if (!data) return null;

//         switch (key) {
//             case 'atp_id':
//                 if ('atp_id' in data && data.atp_id === id) {
//                     return { type, data };
//                 }
//                 break;

//             case 'tp_id':
//                 if ('tp_id' in data && data.tp_id === id) {
//                     return { type, data };
//                 }
//                 break;

//             case 'cp_id':
//                 if ('cp_id' in data && data.cp_id === id) {
//                     return { type, data };
//                 }
//                 break;
//         }

//         return null;
//     };

//     return find('max', source.max)
//         ?? find('min', source.min);
// }
// export function findMaxMinMyVersion<K extends MakMinKey>(
// export  function findMaxMinT<K extends MakMinKey>(
//         source: MakMinRefrence,
//         key: K,
//         id: number
//     ): MakMinResult<
//         Extract<MakMinData, Record<K, number>>
//     > {
//         if (!source) return null;

//         const collections = [
//             { type: 'max' as const, data: source.max },
//             { type: 'min' as const, data: source.min }
//         ];

//         const switchSkor = (data:MakMinData, keyFull:K)=>{
//             switch(keyFull){
//                 case 'atp_id':
//                     return (data as AtpDescriptionRefrence).skorAtp ;
                    
//                 case 'tp_id':
//                     return (data as TpDescriptionRefrence).skorTp;
//                 case 'cp_id':
//                     return (data as CpDescriptionRefrence).skorCp;
//                 default:
//                     return null

//             }
//         }

//         const result = collections.find(({ data }) => {
//             if (data === null || data === undefined) return false;

//             const skor = switchSkor(data, key);
//             if(skor === null || skor === undefined) return false;

//             return (data as Record<K, number>)[key] === id;
//         });

//         if (!result || !result.data) return null;

//         return result as MakMinResult<
//             Extract<MakMinData, Record<K, number>>
//         >;
//     }

export default function findMaxMin<K extends MakMinKey>(
        source: MakMinRefrence,
        key: K,
        id: number
    ): MakMinResult<
        Extract<MakMinData, Record<K, number>>
    > {

        if (!source) return null;

        const collections = [
            { type: 'max' as const, data: source.max },
            { type: 'min' as const, data: source.min }
        ];

        const result = collections.find(({ data }) => {
            if (data === null) return false;

            return (data as Record<K, number>)[key] === id;
        });

        if (!result || !result.data) return null;

        return result as MakMinResult<
            Extract<MakMinData, Record<K, number>>
        >;
}