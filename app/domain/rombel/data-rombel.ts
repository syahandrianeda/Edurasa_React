import type { InterfaceRombel } from "~/types/rombel";

export const DataRombelUI:InterfaceRombel[] = [
    {
        id: 1,
        rombelName: '1A',
        jenjang: 1,
        active:true,
    },
    {
        id: 2,
        rombelName: '1B',
        jenjang: 1,
        active:true,
    },
    {
        id: 13,
        rombelName: '1C',
        jenjang: 1,
        active:false,
    },
    {
        id: 3,
        rombelName: '2A',
        jenjang: 2,
        active:true,
    },
    {
        id: 4,
        rombelName: '2B',
        jenjang: 2,
        active:true,
    },
    {
        id: 14,
        rombelName: '2C',
        jenjang: 2,
        active:false,
    },
    {
        id: 5,
        rombelName: '3A',
        jenjang: 3,
        active:true,
    },
    {
        id: 6,
        rombelName: '3B',
        jenjang: 3,
        active:true,
    },
    {
        id: 15,
        rombelName: '3C',
        jenjang: 3,
        active:false,
    },
    {
        id: 7,
        rombelName: '4A',
        jenjang: 4,
        active:true,
    },
    {
        id: 8,
        rombelName: '4B',
        jenjang: 4,
        active:true,
    },
    {
        id: 16,
        rombelName: '4C',
        jenjang: 4,
        active:false,
    },
    {
        id: 9,
        rombelName: '5A',
        jenjang: 5,
        active:true,
    },
    {
        id: 10,
        rombelName: '5B',
        jenjang: 5,
        active:true,
    },
    {
        id: 17,
        rombelName: '5C',
        jenjang: 5,
        active:false,
    },
    {
        id: 11,
        rombelName: '6A',
        jenjang: 6,
        active:true,
    },
    {
        id: 12,
        rombelName: '6B',
        jenjang: 6,
        active:true,
    },
    {
        id: 18,
        rombelName: '6C',
        jenjang: 6,
        active:false,
    },

];
// domain/rombel/rombel.selector.ts
export const filterRombelByKelasAmpu = (
    rombels: InterfaceRombel[],
    kelasAmpu: string[]
) => {
    const set = new Set(kelasAmpu);
    return rombels.filter(r => set.has(r.rombelName));
};

export const uniqueRombelByJenjang = (
    rombels: InterfaceRombel[]
): InterfaceRombel[] => {
    return Array.from(
        new Map(rombels.map(r => [r.jenjang, r])).values()
    );
};
