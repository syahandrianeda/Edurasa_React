import type { jp_mapelApp, jp_mapelSheet } from "~/types/mapel/jp_mapel";
import type { InterfaceMapel } from "~/types/mapel/mapel";
import type { SiswaType } from "~/types/siswa";
import KesiswaanData from "../kesiswaan/kesiswaan-data";
import { Gender } from "~/types/enums/gender";
import { resolveAgama } from "~/dtos/_resolver";
import { koleksiJpInJenjang } from "./jp-in-jenjang";
import { getNumberFromString } from "~/lib/get-number";
import type { Agama } from "~/types/enums/agama";

/** Constants untuk menghindari hardcoded strings */
const MAPEL_CODES = {
    AGAMA_ALL: ['PAI', 'PKRIS', 'PKATO', 'PHIND', 'PBUDH', 'PKONG'],
    PJOK: 'PJOK',
    RUPA: 'RUPA',
    PA_GENERAL: 'PA',
    SBDP_GROUP: ['RUPA', 'TARI', 'MUSIK', 'TEATER'],
    BING:'BING'
};

export interface CurrentMapelsInRombel {
    hasRegistered: boolean;
    isValidByAgamaSiswa: boolean;
    data: jp_mapelApp[];
    countJp: number;
    adviceAdd?: jp_mapelApp[];
}

export interface MapelRaport {
    hasRegistered: boolean;
    data: jp_mapelApp[];
    countJp: number;
}

export default class OrmMapelRefactored {
    protected siswaInstance: KesiswaanData;
    protected jenjangLevel: number;

    constructor(
        protected mapel: InterfaceMapel[],
        protected mapelRombel: jp_mapelSheet[],
        protected siswaAktifRombel: SiswaType[],
        protected rombel: string = '1A'
    ) {
        this.siswaInstance = new KesiswaanData(this.siswaAktifRombel);
        this.jenjangLevel = getNumberFromString(this.rombel);
    }

    /** 
     * Helper untuk mendapatkan JP berdasarkan kode umum 
     */
    private getJp(kodeUmum: string): number {
        const config = koleksiJpInJenjang?.find(s => s.kode_umum === kodeUmum);
        return config?.jenjangJp.find(s => s.jenjang === this.jenjangLevel)?.jp ?? 0;
    }

    /**
     * Factory untuk membuat objek jp_mapelApp standar
     */
    private createMapelItem(
        data: InterfaceMapel, 
        index: number, 
        overrides: Partial<jp_mapelApp> = {}
    ): jp_mapelApp {
        const jp = this.getJp(data.kode_umum);
        return {
            idbaris: 0,
            idmapel: data.id,
            kode: data.kode,
            nama_mapel: data.nama,
            nama_mapel_ijazah: data.nama,
            jp_perminggu: jp,
            following_students: this.siswaAktifRombel.length,
            status: '',
            nama_rombel: this.rombel,
            index_in_rombel: index,
            source: data,
            ...overrides
        };
    }

    /**
     * Menghasilkan data mapel default berdasarkan aturan kurikulum dan komposisi siswa
     */
    public createDataMapel(): jp_mapelApp[] {
        const koleksiMapel: jp_mapelApp[] = [];
        const agamaInRombel = this.siswaInstance.collectAgama;
        let currentIndex = 0;

        // 1. Mapel Agama
        this.mapel
            .filter(s => s.kelompok === 'Agama' && s.penganut && agamaInRombel.includes(s.penganut))
            .forEach(data => {
                koleksiMapel.push(this.createMapelItem(data, currentIndex++, {
                    nama_mapel_ijazah: 'Pendidikan Agama dan Budi Pekerti',
                    following_students: this.siswaInstance.countAgamaGenders(
                        [Gender.LAKI_LAKI, Gender.PEREMPUAN, Gender.UNKNOWN], 
                        data.penganut as Agama
                    )
                }));
            });

        // 2. Mapel Umum Kurmer
        this.mapel
            .filter(s => s.kelompok === 'Umum' && s.kurikulum === 'kurmer' && this.getJp(s.kode_umum) > 0)
            .forEach(data => {
                koleksiMapel.push(this.createMapelItem(data, currentIndex++));
            });

        // 3. Khusus PJOK & SBDP (Rupa) jika belum masuk di filter sebelumnya
        [MAPEL_CODES.PJOK, MAPEL_CODES.RUPA].forEach(code => {
            if (!koleksiMapel.some(m => m.kode === code)) {
                const item = this.mapel.find(s => s.kode === code);
                if (item && this.getJp(item.kode_umum) > 0) {
                    koleksiMapel.push(this.createMapelItem(item, currentIndex++));
                }
            }
        });

        // 4. Muatan Lokal
        this.mapel
            .filter(s => s.muatan === 'Lokal' && this.getJp(s.kode_umum) > 0)
            .forEach(data => {
                koleksiMapel.push(this.createMapelItem(data, currentIndex++));
            });
        
            
        return koleksiMapel;
    }

    /**
     * Menghitung total JP per minggu dengan normalisasi Mapel Agama
     */
    public countJpPerMinggu(mode: 'default' | 'server'): number {
        const data = mode === 'default' 
            ? this.createDataMapel() 
            : this.mapelRombel.filter(s => s.status === '' && s.nama_rombel === this.rombel);

        if (data.length === 0) return 0;

        const totalAll = data.reduce((acc, curr) => acc + Number(curr.jp_perminggu), 0);
        const totalAgama = data
            .filter(s => MAPEL_CODES.AGAMA_ALL.includes(s.kode))
            .reduce((acc, curr) => acc + Number(curr.jp_perminggu), 0);

        // Logika: Total - Semua Agama yang ada di list + 1 Slot JP Agama Standar
        return (totalAll - totalAgama) + this.getJp(MAPEL_CODES.PA_GENERAL);
    }

    /**
     * Status mapel di rombel saat ini dibandingkan dengan data server
     */
    public defaultMapelInActiveRombel(): CurrentMapelsInRombel {
        const serverData = this.mapelRombel.filter(s => s.nama_rombel === this.rombel);
        const hasRegistered = serverData.length > 0;
        
        if (!hasRegistered) {
            return {
                hasRegistered: false,
                isValidByAgamaSiswa: true,
                data: this.createDataMapel(),
                countJp: this.countJpPerMinggu('default')
            };
        }

        const currentData = this.getMapelWithSource(serverData);
        
        const agamaRequired = this.mapel.filter(s => 
            s.kelompok === 'Agama' && 
            s.penganut && 
            this.siswaInstance.collectAgama.includes(s.penganut)
        );
        
        
        const isValidMapel = currentData.every(m => 
            !MAPEL_CODES.AGAMA_ALL.includes(m.kode) || agamaRequired.some(a => a.kode === m.kode)
        );

        // Advice untuk mapel agama yang mungkin belum ditambahkan
        const adviceAdd = agamaRequired
            .filter(a => !currentData.some(cd => cd.kode === a.kode))
            .map((a, i) => this.createMapelItem(a, currentData.length + i, {
                nama_mapel_ijazah: 'Pendidikan Agama dan Budi Pekerti',
                following_students: this.siswaInstance.countAgamaGenders(
                    [Gender.LAKI_LAKI, Gender.PEREMPUAN, Gender.UNKNOWN], 
                    a.penganut as Agama
                )
            }));

        return {
            hasRegistered,
            isValidByAgamaSiswa: isValidMapel,
            data: currentData,
            countJp: this.countJpPerMinggu('server'),
            adviceAdd
        };
    }

    private getMapelWithSource(items: jp_mapelSheet[]): jp_mapelApp[] {
        return items.filter(s => s.status === '').map(m => {
            const source = this.mapel.find(s => s.id === m.idmapel);
            return {
                ...m,
                following_students: this.siswaInstance.countAgamaGenders(
                    [Gender.LAKI_LAKI, Gender.PEREMPUAN, Gender.UNKNOWN],
                    resolveAgama(m.required_penganut) as Agama
                ),
                source
            } as jp_mapelApp;
        });
    }

    /**
     * Menghasilkan struktur mapel untuk keperluan Raport
     */
    public collectifMapelRaport(): MapelRaport {
        const serverData = this.mapelRombel.filter(s => s.nama_rombel === this.rombel);
        
        if (serverData.length === 0) {
            return {
                hasRegistered: false,
                data: this.createDataMapel(),
                countJp: this.countJpPerMinggu('default')
            };
        }

        const sortedServer = [...serverData].sort((a, b) => a.index_in_rombel - b.index_in_rombel);
        const raportData: jp_mapelApp[] = [];
        const agamaInRombel = this.siswaInstance.collectAgama;
        
        // 1. Sinkronisasi Mapel Agama (Selalu pastikan sesuai komposisi siswa terbaru)
        this.mapel
            .filter(s => s.kelompok === 'Agama' && s.penganut && agamaInRombel.includes(s.penganut))
            .forEach((data, idx) => {
                const match = sortedServer.find(s => s.kode === data.kode);
                raportData.push(this.createMapelItem(data, idx, {
                    idbaris: match?.idbaris ?? 0,
                    jp_perminggu: match?.jp_perminggu ?? this.getJp(data.kode_umum),
                    nama_mapel_ijazah: 'Pendidikan Agama dan Budi Pekerti',
                    following_students: this.siswaInstance.countAgamaGenders(
                        [Gender.LAKI_LAKI, Gender.PEREMPUAN, Gender.UNKNOWN],
                        data.penganut as Agama
                    )
                }));
            });

        // 2. Mapel Non-Agama dari Server
        sortedServer
            .filter(s => !MAPEL_CODES.AGAMA_ALL.includes(s.kode) && s.status === '')
            .forEach(data => {
                const source = this.mapel.find(m => m.id === data.idmapel);
                
                if (source) {
                    let namaIjazah = data.nama_mapel_ijazah;
                    // Normalisasi nama ijazah untuk kelompok Seni
                    if (MAPEL_CODES.SBDP_GROUP.includes(source.kode)) {
                        namaIjazah = 'Seni dan Budaya';
                    }

                    raportData.push({
                        ...data,
                        nama_mapel: source.nama,
                        nama_mapel_ijazah: namaIjazah,
                        following_students: this.siswaAktifRombel.length,
                        source
                    } as jp_mapelApp);
                }
            });

        return {
            hasRegistered: true,
            data: raportData,
            countJp: this.countJpPerMinggu('server')
        };
    }

    /**
     * Mengambil daftar mapel unik berdasarkan nama ijazah
     */
    public mapelRombelUnique(): jp_mapelApp[] {
        const { data } = this.collectifMapelRaport();
        return data.filter((value, index, self) => 
            index === self.findIndex((m) => m.nama_mapel_ijazah === value.nama_mapel_ijazah)
        );
    }
}