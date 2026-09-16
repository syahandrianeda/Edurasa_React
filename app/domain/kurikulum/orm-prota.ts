import type { faseMerdekaType, resourcesKurikulum } from "~/types/kurikulum/kurikulum-type";
import type { jadwalMapelAccordTableApp} from "~/types/setting_jadwal/jadwal_mapel";
import type { AtpAsOrm, DataAtpAsProtaEditable, ItemAtpAsProtaEditable, koleksiMapelByJp, mapelJpInJadwal, protaApp, protaSheetApp } from "~/types/kurikulum/prota-orm";
import type { InterfaceMapel } from "~/types/mapel/mapel";
import type OrmKaldik from "../kaldik/orm-kaldik";
import { getNumberFromString } from "~/lib/get-number";
import getFaseByRombel from "~/lib/get-fase-by-rombel";
import type { UserPtk } from "~/types";
import type { jp_mapelApp } from "~/types/mapel/jp_mapel";
type KodeHari = 'mg' | 'sn' | 'sl' | 'rb' | 'km' | 'jm' | 'sb';

const HARI: Record<
    Exclude<KodeHari, 'mg'>,
    { index_hari: number; nama_hari: string }
> = {
    sn: { index_hari: 1, nama_hari: 'senin' },
    sl: { index_hari: 2, nama_hari: 'selasa' },
    rb: { index_hari: 3, nama_hari: 'rabu' },
    km: { index_hari: 4, nama_hari: 'kamis' },
    jm: { index_hari: 5, nama_hari: 'jumat' },
    sb: { index_hari: 6, nama_hari: 'sabtu' },
};

export default class OrmProta{
    private alertWarning:boolean = false;
    private message:string[] = [];
    private dataAtpOrm:AtpAsOrm[] = [];
    private koleksiMapelInJadwal?:koleksiMapelByJp;
    private mapelJadwal:mapelJpInJadwal[]=[];
    private dataProtaEditable:DataAtpAsProtaEditable = {
        data:[],
        total:0,
        total_in_year:0,
        protaServer:[],
        rombel:'',
        kodemapel:''
    }
    
    constructor(
        protected cpFaseAtp:resourcesKurikulum, // semua cp,tp, atp tapi sudah difilter dari API
        protected jadwal:jadwalMapelAccordTableApp[], // sudah berdasarkan rombel
        protected kaldik:OrmKaldik,
        protected fokusMapel:InterfaceMapel,
        protected currentRombel:string,
        protected dataguru:UserPtk,
        protected protaServer:protaSheetApp[],
        public jpMapel:jp_mapelApp[],
    ){}
    get dataPerhitunganJp(){
        return this.koleksiMapelInJadwal 
    }

    get pengampuMapel(){
        return this.dataguru?.friends.find(s=>s.kode_mapel_ampu === this.fokusMapel.kode)?.name ?? this.dataguru?.friends.find(s=>s.kode_mapel_ampu === this.namaRombel)?.name// ??this.dataguru.name;
    }

    get namaRombel():string{
        return this.currentRombel;
    }

    get namaJenjang():number{
        return getNumberFromString(this.currentRombel);
    }
    set isWarning(value:boolean){
        this.alertWarning = value;
    }
    get isWarning():boolean{
        return this.alertWarning;   
    }
    get faseAbjad():faseMerdekaType{
        return getFaseByRombel(this.currentRombel) as faseMerdekaType;;
    }
    set messageWarning(value:string[]){
        this.message = value;
    }
    get messageWarning():string[]{
        return this.message;
    }

    get namaMapel(){
        return this.fokusMapel.nama;
    }

    get codeMapel(){
        return ['PKRIS', 'PKATO', 'PHIND', 'PBUDH', 'PKONG'].includes(this.fokusMapel.kode)?'PAI':this.fokusMapel.kode;
    }
    get realKodeMapel(){
        return this.fokusMapel.kode;
    }

    get data(){
        return this.dataAtpOrm;
    }
    
    createKoleksiMapelInJadwal(){
        const hariKeys = ['sn','sl','rb','km','jm','sb'] as const;
        const kode = this.codeMapel;//'//this.fokusMapel.kode;
        const jadwalMap = new Map<string, mapelJpInJadwal>();
        const dataHariEfektif = this.kaldik.getKaldikOneTapel().totalPropertiHariBelajar;
        const dataHariEfektifSemester1 = this.kaldik.getKaldikSemester(1,true).totalPropertiHariBelajar;
        const dataHariEfektifSemester2 = this.kaldik.getKaldikSemester(2,true).totalPropertiHariBelajar;
        
        let kodemapel = '';
        let total_jp = 0;
        let total_day = 0
        let total_jp_in_year = 0
        let total_day_semester1=0;
        let total_day_semester2=0;
        let total_jp_semester1=0;
        let total_jp_semester2=0;

        /** peringatan */
        if(this.jadwal.length === 0){
            this.createMessage('Anda belum membuat Jadwal Pelajaran. Jadwal pelajaran digunakan sebagai dasar perhitungan jumlah Jam Pelajaran');
        }

        for (const row of this.jadwal) {

            for (const hari of hariKeys) {
                const mapel = row[hari];
                const namahari = HARI[hari].nama_hari as keyof typeof dataHariEfektif;
                const counthari  = dataHariEfektif[namahari]||0;
                const countSemester1 = dataHariEfektifSemester1[namahari]||0;
                const countSemester2 = dataHariEfektifSemester2[namahari]||0;

                if (!mapel) continue;

                if (mapel.kode !== kode) continue;
                // if(!['PKRIS', 'PKATO', 'PHIND', 'PBUDH', 'PKONG'].includes(this.fokusMapel.kode) && mapel.kode !== this.fokusMapel.kode) continue;
                // if (mapel.kode !== this.fokusMapel.kode || !['PAI','PKRIS', 'PKATO', 'PHIND', 'PBUDH', 'PKONG'].includes(kode)) continue;

                kodemapel = mapel.kode;
                total_jp++;

                const existing = jadwalMap.get(hari);
                if (existing) {
                    existing.count_jp++;
                    existing.count_jp_in_year = existing.count_jp * (counthari as number) ;
                    existing.count_jp_in_semester1 = existing.count_jp * (countSemester1 as number) ;
                    existing.count_jp_in_semester2 = existing.count_jp * (countSemester2 as number) ;
                    total_jp_semester1+= (countSemester1 as number) ;
                    total_jp_semester2+= (countSemester2 as number) ;
                    total_jp_in_year+= (counthari as number) ;
                } else {
                    jadwalMap.set(hari, {
                        kode_hari: hari,
                        index_hari: HARI[hari].index_hari,
                        nama_hari: HARI[hari].nama_hari,
                        count_jp: 1,
                        count_day_in_year: counthari as number ,
                        count_jp_in_year:counthari as number ,
                        count_day_in_semester1: countSemester1 as number ,
                        count_day_in_semester2: countSemester2 as number ,
                        count_jp_in_semester1: countSemester1 as number,
                        count_jp_in_semester2: countSemester2 as number,
                    });

                    total_day_semester1+=countSemester1 as number;
                    total_day_semester2+=countSemester2 as number;
                    total_day+= counthari as number ;
                    total_jp_semester1+=countSemester1 as number ;
                    total_jp_semester2+=countSemester2 as number ;
                    total_jp_in_year+= (counthari as number) ;
                }
            }
        }

        this.koleksiMapelInJadwal = {
            kodemapel,
            jadwal: [...jadwalMap.values()].sort(
                (a, b) => a.index_hari - b.index_hari
            ),
            total_jp,
            total_day,
            total_jp_in_year,
            total_day_semester1,
            total_day_semester2,
            total_jp_semester1,
            total_jp_semester2,
        };

        if (!kodemapel) {
            this.koleksiMapelInJadwal = undefined
            this.createMessage('Belum Ada jadwal untuk mata pelajaran ini. Segera lengkapi Jadwal Pelajaran Anda');
        }

        return this
    }
    
    createMessage(message:string){
        this.alertWarning = true;
        this.message.push(message);
        return this
    }
    
    createOrmAtp(){
        const {cp, fase, atp} = this.cpFaseAtp;
        const result:AtpAsOrm[] = [];

        atp.forEach((dataAtp)=>{

            const obCp:AtpAsOrm = {
                atp_as_tp_description:dataAtp.atp,
                atp_as_tp_id:dataAtp.idbaris,
                kelas:dataAtp.kelas,
                cp_description:undefined,
                cp_id:undefined,
                tp_as_cp_description:undefined,
                tp_as_cp_id:undefined,
                invalid:true,
                
                message:[
                    'cp tidak ditemukan untuk idbaris '+ dataAtp.foreignkey_elemencp,
                    'kode mapel tidak terdeteksi karena tidak terhubung ke cp maupun tp pada tiap fase'
                ]
            }

            const dataCp = cp.find(s=>s.idbaris === dataAtp.foreignkey_elemencp);
            if(dataCp){
                const namaMapel = this.jpMapel?.find(s=>s.kode === dataCp.kodemapel);
                obCp.cp_description = dataCp.cp_utama;
                obCp.cp_id = dataCp.idbaris;
                obCp.kodemapel = dataCp.kodemapel;
                obCp.mapelname= namaMapel?.nama_mapel ?? dataCp.kodemapel;
                obCp.elemen = dataCp.elemen;
                obCp.lingkup_materi = dataCp.lingkup_materi;
                obCp.fase=dataCp.fase;
                /** 
                 * meskipun data berikut telah ditemukan, ormATP belum tentu valid 
                 * tandai dulu invalid karena,
                 * - data mapel di cp harus sama dengan data mapel pada [fase.data]
                 * */
                obCp.invalid = true;
                obCp.message = [
                    `Tidak ditemukan data TP di fase ${dataCp.fase} untuk idbaris TP ${dataAtp.foreignkey_tp}`
                ];

                const cariTpDiFase = fase.find(s=>s.fase === dataCp.fase);//s.data.find(ss=>ss.idbaris === dataAtp.foreignkey_tp && ss.foreignkey_elemencp === dataCp.idbaris));
                if(cariTpDiFase){
                    
                    obCp.tp_as_cp_description = undefined;
                    obCp.tp_as_cp_id = undefined
                    obCp.invalid = true;
                    obCp.message = [
                        `Data TP di fase ${cariTpDiFase.fase} tidak ditemukan untuk idbaris TP ${dataAtp.foreignkey_tp}`
                    ]
                    const cariTPdiDataFase = cariTpDiFase.data.find(s=>s.idbaris === dataAtp.foreignkey_tp && s.foreignkey_elemencp === dataCp.idbaris);
                    if(cariTPdiDataFase){
                        obCp.invalid = false;
                        obCp.message = [];
                        obCp.tp_as_cp_description = cariTPdiDataFase.tp;
                        obCp.tp_as_cp_id = cariTPdiDataFase.idbaris;

                        if(cariTPdiDataFase.status === 'hapus'){
                            obCp.invalid = true;
                            obCp.message.push('TP berstatus hapus di fase '+cariTpDiFase.fase);
                        }
                    }
                }
            }

            /** jika atp atau dataAtp ini punya status hapus, jadikan invalid */
            if(dataAtp.status==='hapus'){
                obCp.invalid = true;
                obCp.message.push('ATP berstatus hapus ='+dataAtp.atp);
            }
            result.push(obCp);
        });

        this.dataAtpOrm = result;

        return this;
    }
    
    

    createDataPresentation(){
        const dataAtp = this.dataAtpValidInRombel;
        const total_in_year = this.koleksiMapelInJadwal?.total_jp_in_year ?? 0;
        const data:ItemAtpAsProtaEditable[] = [];
        const protaServer:protaSheetApp[]=this.protaServer;
        const kodemapel = this.fokusMapel.kode;
        const rombel = this.currentRombel;

        let total = 0;
        let time = this.koleksiMapelInJadwal?.total_jp_in_year ?? 0;
        let length = dataAtp.length;
        let avg_alokasi = Math.floor(time/length);
        let count_jp_in_semester = Math.floor(length/2);

        dataAtp.forEach((item,index)=>{
            const itemHasServered = protaServer.find(s=>
                s.atp_idbaris === item.atp_as_tp_id && 
                s.rombel === this.namaRombel
            );
            const arraySemesterDefault = (count_jp_in_semester-1)>index? [1]:[2];
            const atpItem:ItemAtpAsProtaEditable = {
                ...item,
                idbaris_server:itemHasServered?.idbaris??0,
                alokasi:itemHasServered?.alokasi_waktu ?? avg_alokasi,
                semester:itemHasServered?.semester ?? arraySemesterDefault,//[],
                state_modify:itemHasServered? 'servered':'not_servered',
                index_prota: itemHasServered?.index_prota ?? (index + 1)
            };
            total+=itemHasServered?.alokasi_waktu ?? avg_alokasi
            data.push(atpItem)
        });

        data.sort((a, b) => (a.index_prota ?? 0) - (b.index_prota ?? 0));
        
        this.dataProtaEditable = {
            data,
            total,
            total_in_year,
            protaServer,
            kodemapel,
            rombel
        }
        return this;
    }

    /**
     * @info Atp dalam mapel tertentu yang valid, dalam suatu jenjang (bukan hanya rombel)
     */
    get dataAtpValidInRombel(){
        return this.dataAtpOrm.filter(s=>
                !s.invalid && 
                s.kelas.includes(this.namaJenjang) && 
                s.kodemapel === this.fokusMapel.kode
            );
    }
    /**
     * @info Atp dalam mapel tertentu yang valid, dalam suatu jenjang (bukan hanya rombel)
     */
    get dataAllAtpValidInRombel(){
        return this.dataAtpOrm.filter(s=>
                !s.invalid && 
                s.kelas.includes(this.namaJenjang)

            );
    }
    
    get dataPresentastionProta(){
        return this.dataProtaEditable;
    }
    

    init(){
        this.createKoleksiMapelInJadwal();
        this.createOrmAtp();
        this.createDataPresentation();
        return this;
    }
}