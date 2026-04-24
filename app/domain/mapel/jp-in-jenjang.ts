
export interface JpInJenjang{
    kode_umum:string, 
    jenjangJp:JpJenjang[]
}
export interface JpJenjang{
    jp:number,
    jenjang:number
}
export const koleksiJpInJenjang:JpInJenjang[] = [
    {
        kode_umum:'PA',
        jenjangJp:[
            { jenjang:1, jp:3 },
            { jenjang:2, jp:3 },
            { jenjang:3, jp:3 },
            { jenjang:4, jp:3 },
            { jenjang:5, jp:3 },
            { jenjang:6, jp:3 },
        ],
    },
    {
        kode_umum:'PKN',
        jenjangJp:[
            { jenjang:1, jp:4 },
            { jenjang:2, jp:4 },
            { jenjang:3, jp:4 },
            { jenjang:4, jp:4 },
            { jenjang:5, jp:4 },
            { jenjang:6, jp:4 },
        ],
    },
    {
        kode_umum:'BINDO',
        jenjangJp:[
            { jenjang:1, jp:6 },
            { jenjang:2, jp:7 },
            { jenjang:3, jp:6 },
            { jenjang:4, jp:6 },
            { jenjang:5, jp:6 },
            { jenjang:6, jp:6 },
        ],
    },
    {
        kode_umum:'MTK',
        jenjangJp:[
            { jenjang:1, jp:4 },
            { jenjang:2, jp:5 },
            { jenjang:3, jp:5 },
            { jenjang:4, jp:5 },
            { jenjang:5, jp:5 },
            { jenjang:6, jp:5 },
        ],
    },
    {
        kode_umum:'IPAS',
        jenjangJp:[
            { jenjang:1, jp:0 },
            { jenjang:2, jp:0 },
            { jenjang:3, jp:5 },
            { jenjang:4, jp:5 },
            { jenjang:5, jp:5 },
            { jenjang:6, jp:5 },
        ],
    },
    {
        kode_umum:'PJOK',
        jenjangJp:[
            { jenjang:1, jp:3 },
            { jenjang:2, jp:3 },
            { jenjang:3, jp:3 },
            { jenjang:4, jp:3 },
            { jenjang:5, jp:3 },
            { jenjang:6, jp:3 },
        ],
    },
    {
        kode_umum:'SBDP',
        jenjangJp:[
            { jenjang:1, jp:3 },
            { jenjang:2, jp:3 },
            { jenjang:3, jp:3 },
            { jenjang:4, jp:3 },
            { jenjang:5, jp:3 },
            { jenjang:6, jp:3 },
        ],
    },
    {
        kode_umum:'BSUND',
        jenjangJp:[
            { jenjang:1, jp:2 },
            { jenjang:2, jp:2 },
            { jenjang:3, jp:2 },
            { jenjang:4, jp:2 },
            { jenjang:5, jp:2 },
            { jenjang:6, jp:2 },
        ],
    },
    {
        kode_umum:'BING',
        jenjangJp:[
            { jenjang:1, jp:0 },
            { jenjang:2, jp:0 },
            { jenjang:3, jp:0 },
            { jenjang:4, jp:2 },
            { jenjang:5, jp:2 },
            { jenjang:6, jp:2 },
        ],
    },
    {
        kode_umum:'KODING',
        jenjangJp:[
            { jenjang:1, jp:0 },
            { jenjang:2, jp:0 },
            { jenjang:3, jp:0 },
            { jenjang:4, jp:0 },
            { jenjang:5, jp:2 },
            { jenjang:6, jp:2 },
        ],
    },
]