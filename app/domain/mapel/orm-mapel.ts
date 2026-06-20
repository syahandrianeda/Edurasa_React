import type { jp_mapelApp, jp_mapelSheet } from "~/types/mapel/jp_mapel";
import type { InterfaceMapel } from "~/types/mapel/mapel";
import type { SiswaType } from "~/types/siswa";
import KesiswaanData from "../kesiswaan/kesiswaan-data";
import { Gender } from "~/types/enums/gender";
import { resolveAgama } from "~/dtos/_resolver";
import { koleksiJpInJenjang } from "./jp-in-jenjang";
import { getNumberFromString } from "~/lib/get-number";
import type { Agama } from "~/types/enums/agama";

export interface CurrentMapelsInRombel{
    hasRegistered:boolean,
    isValidByAgamaSiswa:boolean,
    data:jp_mapelApp[],
    countJp:number
    adviceAdd?:jp_mapelApp[];
}
export interface MapelInRombel{
    hasRegistered:boolean,
    dataAgama:jp_mapelApp[],
    dataUmum:jp_mapelApp[],
    dataPilihan:jp_mapelApp[],
    dataLokal:jp_mapelApp[],
}

export interface MapelRaport{
    hasRegistered:boolean,
    data:jp_mapelApp[],
    countJp:number
}

export interface jp_mapelAppWithProperty extends jp_mapelApp{
    property:jp_mapelApp
}
export default class OrmMapel{
    protected SiswaInstance:KesiswaanData
    constructor(
        protected mapel:InterfaceMapel[], 
        protected mapelRombel:jp_mapelSheet[],
        protected siswaAktifRombel:SiswaType[], 
        protected rombel?:string
    ){
        this.SiswaInstance = new KesiswaanData(this.siswaAktifRombel);
    };

    get jenjang(){
        return getNumberFromString(this.rombel??'1A');
    }
    getJPInJenjang(kode_umum:string){
        
        return koleksiJpInJenjang?.find(s=>s.kode_umum === kode_umum)?.jenjangJp.find(s=>s.jenjang === this.jenjang)?.jp
    }

    /** create data mapel by default */
    createDataMapel(){
        /** agama */
        const instanseSiswa = new KesiswaanData(this.siswaAktifRombel);
        const koleksiAgamaInCurrentRombel = instanseSiswa.collectAgama;
        const mapelAgama = this.mapel.filter(s=>s.kelompok === 'Agama' && s.penganut && koleksiAgamaInCurrentRombel.includes(s.penganut));
        const mapelUmum = this.mapel.filter(s=>s.kelompok === 'Umum' && s.kurikulum === 'kurmer')
        const koleksiMapel:jp_mapelApp[]=[];
        
        let index:number = 0;
        // const jenjang = this.jenjang;
        // const rombel = this.rombel;
        mapelAgama.forEach((data)=>{
            const mapelAgamaItem:jp_mapelApp={
                idbaris:0,
                idmapel:data.id,
                kode:data.kode,
                nama_mapel:data.nama,
                nama_mapel_ijazah:'Pendidikan Agama dan Budi Pekerti',
                jp_perminggu: this.getJPInJenjang(data.kode_umum)??0,
                following_students:instanseSiswa.countAgamaGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN, Gender.UNKNOWN],data.penganut as Agama),//data.penganut as Agama),
                status:'',
                nama_rombel: this.rombel,
                index_in_rombel:index,
                source:data
            }
            koleksiMapel.push(mapelAgamaItem);
            index++;
        })
        mapelUmum.forEach((data)=>{
            const mapelUmumItem:jp_mapelApp={
                idbaris:0,
                kode:data.kode,
                idmapel:data.id,
                nama_mapel:data.nama,
                nama_mapel_ijazah:data.nama,
                jp_perminggu: this.getJPInJenjang(data.kode_umum)??0,
                required_penganut:undefined,
                following_students:this.siswaAktifRombel.length,
                status:'',
                nama_rombel: this.rombel,
                index_in_rombel:index,
                source:data
            }
            
            if(this.getJPInJenjang(data.kode_umum)??0>0){
                koleksiMapel.push(mapelUmumItem);
                index++
            }
        })
        /** pjok */
        const pjok = this.mapel.find(s=>s.kode === 'PJOK');
        if(pjok){
            const mapelPjok:jp_mapelApp={
                    idbaris:0,
                    kode:pjok.kode,
                    nama_mapel:pjok.nama,
                    idmapel:pjok.id,
                    nama_mapel_ijazah:pjok.nama,
                    jp_perminggu: this.getJPInJenjang(pjok.kode_umum)??0,
                    required_penganut:undefined,
                    following_students:this.siswaAktifRombel.length,
                    status:'',
                    nama_rombel: this.rombel,
                    index_in_rombel:index,
                    source:pjok
                }
                koleksiMapel.push(mapelPjok);
                index++;
        }

        /** sbdp */
        
        const rupa = this.mapel.find(s=>s.kode === 'RUPA');
        if(rupa){
            const mapelRupa:jp_mapelApp={
                    idbaris:0,
                    idmapel:rupa.id,
                    kode:rupa.kode,
                    nama_mapel:rupa.nama,
                    nama_mapel_ijazah:rupa.nama,
                    jp_perminggu: this.getJPInJenjang(rupa.kode_umum)??0,
                    required_penganut:undefined,
                    following_students:this.siswaAktifRombel.length,
                    status:'',
                    nama_rombel: this.rombel,
                    index_in_rombel:index,
                    source:rupa
                }
                koleksiMapel.push(mapelRupa);
                index++;
        }

        /** mulok */
        // const mulok = this.mapel.filter(s=>s.kelompok === 'Pilihan' && s.kurikulum === 'kurmer');
        const mulok = this.mapel.filter(s=>s.muatan==='Lokal');
        mulok.forEach(data=>{
            
            const mapelMulok:jp_mapelApp={
                idbaris:0,
                idmapel:data.id,
                kode:data.kode,
                nama_mapel:data.nama,
                nama_mapel_ijazah:data.nama,
                jp_perminggu: this.getJPInJenjang(data.kode_umum)??0,
                following_students:this.siswaAktifRombel.length,
                status:'',
                nama_rombel: this.rombel,
                index_in_rombel:index,
                source:data
            }
            if(this.getJPInJenjang(data.kode_umum)??0>0){
                koleksiMapel.push(mapelMulok);
                index++;
            }
            // koleksiMapel.push(mapelMulok);
            // index++;
        })
        return koleksiMapel
    }
    countJpPerMinggu(mode:'default'|'server'){
        const jenjang = this.jenjang;
        if(mode === 'default'){
            const data = this.createDataMapel();
            if(data.length === 0) return 0
            const totalasal =  data.filter(s=>s.nama_rombel === this.rombel).map(m=>m.jp_perminggu).reduce((a, b)=>a+Number(b));
            const dataagama = data.filter(s=>s.nama_rombel === this.rombel).filter(s=>['PAI','PKRIS','PKATO','PHIND','PBUDH','PKONG'].includes(s.kode));
            /** dikurangi dulu semua jp agama */
            const totalJpAgama = dataagama.map(m=>m.jp_perminggu).reduce((a, b)=>a+Number(b));
            const totalTanpaAgama = totalasal - totalJpAgama;
            return totalTanpaAgama + (this.getJPInJenjang('PA')??3);
        };
        const data = this.mapelRombel.filter(s=>s.status ==='');;
        if(data.length === 0) return 0;

        const totalasal =  data.filter(s=>s.nama_rombel === this.rombel).map(m=>m.jp_perminggu).reduce((a, b)=>a+Number(b));
        const dataagama = data.filter(s=>s.nama_rombel === this.rombel).filter(s=>['PAI','PKRIS','PKATO','PHIND','PBUDH','PKONG'].includes(s.kode));
        /** dikurangi dulu semua jp agama */
        const totalJpAgama = dataagama.map(m=>m.jp_perminggu).reduce((a, b)=>a+Number(b));
        const totalTanpaAgama = totalasal - totalJpAgama;

        return totalTanpaAgama + (this.getJPInJenjang('PA')??3);;
    }
    defaultMapelInActiveRombel():CurrentMapelsInRombel{
        // this.createDataMapel();
        /** jika belum diregistrasi */
        if(this.mapelRombel.filter(s=>s.nama_rombel === this.rombel).length === 0){
            return {
                hasRegistered: false,
                isValidByAgamaSiswa:true,
                data:this.createDataMapel(),
                countJp:this.countJpPerMinggu('default')
            }
        };
        const dataMapel = this.createSourceFromMapelRombel;
        const instanseSiswa = new KesiswaanData(this.siswaAktifRombel);
        const koleksiAgamaInCurrentRombel = instanseSiswa.collectAgama;
        const mapelAgama = this.mapel.filter(s=>s.kelompok === 'Agama' && s.penganut && koleksiAgamaInCurrentRombel.includes(s.penganut));
        // const advice = mapelAgama.filter(s=>dataMapel.map(m=>m.source.kode).includes(s.kode));
        const addAdvice:jp_mapelApp[]=[];
        mapelAgama.forEach((data, index)=>{
            const mapelAgamaItem:jp_mapelApp={
                    idbaris:0,
                    idmapel:data.id,
                    kode:data.kode,
                    nama_mapel:data.nama,
                    nama_mapel_ijazah:'Pendidikan Agama dan Budi Pekerti',
                    jp_perminggu: this.getJPInJenjang(data.kode_umum)??0,
                    following_students:instanseSiswa.countAgamaGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN, Gender.UNKNOWN],data.penganut  as Agama),
                    status:'',
                    nama_rombel: this.rombel,
                    index_in_rombel:index+this.mapelRombel.filter(s=>s.nama_rombel===this.rombel).length,
                    source:data
                }
            addAdvice.push(mapelAgamaItem)
        })
        const isValidMapel =dataMapel.map(m=>m.source.kode).every(mm=>mapelAgama.map(m=>m.kode).includes(mm));// mapelAgama.map(m=>m.kode).every(s=>dataMapel.map(m=>m.source.kode).includes(s))
        return {
            hasRegistered:this.mapelRombel.some(e=>e.nama_rombel === this.rombel),
            isValidByAgamaSiswa:isValidMapel,
            data:dataMapel,//this.mapelRombel,
            countJp:this.countJpPerMinggu('server'),
            adviceAdd:addAdvice

        }
        /** sudah diregistrasi, tapi perlu dicek adakah siswa yang beragama tertentu belum dimasukkan mapelnya apa belum */
    }
    get createSourceFromMapelRombel(){
        const instanseSiswa = new KesiswaanData(this.siswaAktifRombel);
        
        return this.mapelRombel.filter(s=>s.nama_rombel === this.rombel&& s.status === '').map(m=>{
            const source = this.mapel.find(s=>s.id === m.idmapel);
            const following_students=instanseSiswa.countAgamaGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN, Gender.UNKNOWN],resolveAgama(m.required_penganut) as Agama);
            return {
                ...m,
                following_students,
                source
            } as jp_mapelApp
        })
    }

    /** Buat Mapel Default */
    //untuk mapel Agama, tidak disimpan. Tapi ditentukan berdasarkan agama siswa yang ada di rombel
    // collectifMapelRombel():MapelInRombel{
    collectifMapelRombel():MapelRaport{
        const koleksiMapelRaport:jp_mapelApp[] = [];
        let countTotalJp:number = 0;
        let isRegistered:boolean = false;
        const koleksiAgamaDiRombel = this.SiswaInstance.collectAgama;
        const mapelAgama = this.mapel.filter(s=>s.kelompok === 'Agama' && s.penganut && koleksiAgamaDiRombel.includes(s.penganut));
        const mapelUmum = this.mapel.filter(s=>s.kelompok === 'Umum' && s.kurikulum === 'kurmer');  
        const mapelPilihanNasional = this.mapel.filter(s=>s.kelompok === 'Pilihan' && s.kurikulum === 'kurmer' && s.muatan === 'Nasional');  
        

        const mapelServer = this.mapelRombel.filter(s=>s.nama_rombel === this.rombel);
        if(mapelServer.length === 0){
            mapelAgama.forEach((data,index)=>{
                const mapelAgamaItem:jp_mapelApp={
                    idbaris:0,
                    idmapel:data.id,
                    kode:data.kode,
                    nama_mapel:data.nama,
                    nama_mapel_ijazah:'Pendidikan Agama dan Budi Pekerti',
                    jp_perminggu: this.getJPInJenjang(data.kode_umum)??0,
                    following_students:this.SiswaInstance.countAgamaGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN, Gender.UNKNOWN],data.penganut as Agama),
                    status:'',
                    nama_rombel: this.rombel,   
                    index_in_rombel:index,
                    source:data
                }
                // koleksiMapelAgama.push(mapelAgamaItem);   
                koleksiMapelRaport.push(mapelAgamaItem);   
            });
            const mapelUmumNasional = mapelUmum.filter(s=>s.muatan === 'Nasional' && s.kelompok ==='Umum');
            mapelUmumNasional.forEach((data,index)=>{
                const mapelUmumItem:jp_mapelApp={
                    idbaris:0,
                    idmapel:data.id,
                    kode:data.kode,
                    nama_mapel:data.nama,
                    nama_mapel_ijazah:data.nama,
                    jp_perminggu: this.getJPInJenjang(data.kode_umum)??0,
                    following_students:this.siswaAktifRombel.length,//this.SiswaInstance.countAgamaGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN, Gender.UNKNOWN], data.penganut as Agama),
                    status:'',
                    nama_rombel: this.rombel,   
                    index_in_rombel:index + mapelAgama.length,
                    source:data
                }
                // koleksiMapelUmum.push(mapelUmumItem);
                if(this.getJPInJenjang(data.kode_umum)){
                    koleksiMapelRaport.push(mapelUmumItem);
                }
            });
            //pjok
            const pjok = this.mapel.find(s=>s.kode === 'PJOK');
            if(pjok){
                const mapelPjok:jp_mapelApp={
                        idbaris:0,
                        idmapel:pjok.id,
                        kode:pjok.kode,
                        nama_mapel:pjok.nama,
                        nama_mapel_ijazah:pjok.nama,
                        jp_perminggu: this.getJPInJenjang(pjok.kode_umum)??0,
                        following_students:this.siswaAktifRombel.length,//this.SiswaInstance.countByRombel(this.rombel??''),
                        status:'',
                        nama_rombel: this.rombel,
                        index_in_rombel:1 + mapelAgama.length + mapelUmumNasional.length,
                        source:pjok
                    }
                    // koleksiMapelUmum.push(mapelPjok);
                    koleksiMapelRaport.push(mapelPjok);
            }

            // sbdp: rupa, tari, musik, 
            const rupa = this.mapel.find(s=>s.kode === 'RUPA');
            if(rupa){
                const mapelRupa:jp_mapelApp={
                        idbaris:0,
                        idmapel:rupa.id,
                        kode:rupa.kode, 
                        nama_mapel:rupa.nama,
                        nama_mapel_ijazah:rupa.nama,
                        jp_perminggu: this.getJPInJenjang(rupa.kode_umum)??0,
                        following_students:this.siswaAktifRombel.length,//this.SiswaInstance.countByRombel(this.rombel??''),
                        status:'',
                        nama_rombel: this.rombel,
                        index_in_rombel:2 + mapelAgama.length + mapelUmumNasional.length,
                        source:rupa
                    }
                    // koleksiMapelPilihanSeni.push(mapelRupa);
                    koleksiMapelRaport.push(mapelRupa);
            }
            // mulok
            const mulok = this.mapel.filter(s=>s.muatan==='Lokal');
            let index = 3 + mapelAgama.length + mapelUmumNasional.length;
            mulok.forEach(data=>{
                
                const mapelMulok:jp_mapelApp={
                    idbaris:0,
                    idmapel:data.id,
                    kode:data.kode,
                    nama_mapel:data.nama,
                    nama_mapel_ijazah:data.nama,
                    jp_perminggu: this.getJPInJenjang(data.kode_umum)??0,
                    following_students:this.siswaAktifRombel.length,
                    status:'',
                    nama_rombel: this.rombel,
                    index_in_rombel:index,
                    source:data
                }
                if(this.getJPInJenjang(data.kode_umum)??0>0){
                    // koleksiMapelPilihanMulok.push(mapelMulok);
                    koleksiMapelRaport.push(mapelMulok);
                    index++;
                }
                // koleksiMapel.push(mapelMulok);
                // index++;
            });
            isRegistered = false;
            countTotalJp = this.countJpPerMinggu('default');
        }else{
            const urutanMapelServer = mapelServer.sort((a, b) => a.index_in_rombel - b.index_in_rombel);
            const koleksiAgamaDiRombel = this.SiswaInstance.collectAgama;
            const mapelAgama = this.mapel.filter(s=>s.kelompok === 'Agama' && s.penganut && koleksiAgamaDiRombel.includes(s.penganut));
            const mapelUmumTabJpRombel = urutanMapelServer.filter(s=>s.status === '' && s.nama_rombel === this.rombel); //.filter(s=>s.kelompok === 'Umum' && s.kurikulum === 'kurmer');  
            
            mapelAgama.forEach((data,index)=>{
                const mapelAgamaItem:jp_mapelApp={
                    idbaris:0,
                    idmapel:data.id,
                    kode:data.kode,
                    nama_mapel:data.nama,
                    nama_mapel_ijazah:'Pendidikan Agama dan Budi Pekerti',
                    jp_perminggu: this.getJPInJenjang(data.kode_umum)??0,
                    following_students:this.SiswaInstance.countAgamaGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN, Gender.UNKNOWN],data.penganut ||'Islam'),
                    status:'',
                    nama_rombel: this.rombel,   
                    index_in_rombel:index,
                    source:data
                }
                //Jika mapel itu telah disimpan di server, seharusnya 'id'-nya sudah ada, jadi perlu di ubah/dicocokkan;
                const mapelServerMatch = mapelServer.find(s=>s.kode === data.kode);
                
                if(mapelServerMatch){
                    mapelAgamaItem.idbaris = mapelServerMatch.idbaris;
                    mapelAgamaItem.jp_perminggu = mapelServerMatch.jp_perminggu;
                    mapelAgamaItem.nama_mapel_ijazah = mapelServerMatch.nama_mapel_ijazah;
                    mapelAgamaItem.status = ''// mapelServerMatch.status;
                }
                // koleksiMapelAgama.push(mapelAgamaItem);   
                koleksiMapelRaport.push(mapelAgamaItem);
            });
            
            mapelUmumTabJpRombel.forEach((data,index)=>{
                const source = this.mapel.find(s=>s.id === data.idmapel);
                if(source){
                    // jika 'source'-nya memiliki data 'muatan' sebagai Nasional, dan kelompok umum:
                    // atau untuk mapel: PKN, BINDO, MTK, IPAS:
                    if(source.muatan === 'Nasional' && source.kelompok === 'Umum'){
                        const mapelUmumItem:jp_mapelApp={
                            idbaris:data.idbaris,
                            idmapel:data.idmapel,
                            kode:source?.kode??'',
                            nama_mapel:source?.nama??'',
                            nama_mapel_ijazah:data.nama_mapel_ijazah,
                            jp_perminggu: data.jp_perminggu,
                            following_students:this.siswaAktifRombel.length,//this.SiswaInstance.countAgamaGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN, Gender.UNKNOWN],resolveAgama(source?.penganut)as Agama),
                            status:data.status,
                            nama_rombel: this.rombel,   
                            index_in_rombel:index,
                            source:source
                        }
                        // koleksiMapelUmum.push(mapelUmumItem);
                        koleksiMapelRaport.push(mapelUmumItem);
                    }
                    // masukkan mapel PJOK, dan SBDP (RUPA, Tari, Musik, Teater)
                    if(source.muatan === 'Nasional' && source.kelompok === 'Pilihan'){
                        const namaMapelIjazahSBDP = ['RUPA','TARI','MUSIK','TEATER'].includes(source.kode) ? 'Seni dan Budaya' : data.nama_mapel_ijazah;  
                        const mapelUmumItem:jp_mapelApp={
                            idbaris:data.idbaris,
                            idmapel:data.idmapel,
                            kode:source?.kode??'',
                            nama_mapel:source?.nama??'',
                            nama_mapel_ijazah:namaMapelIjazahSBDP,
                            jp_perminggu: data.jp_perminggu,
                            following_students:this.siswaAktifRombel.length,//this.SiswaInstance.countAgamaGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN, Gender.UNKNOWN],resolveAgama(source?.penganut)as Agama),
                            status:data.status,
                            nama_rombel: this.rombel,   
                            index_in_rombel:index,
                            source:source
                        }
                        // koleksiMapelUmum.push(mapelUmumItem);
                        koleksiMapelRaport.push(mapelUmumItem);
                    }
                    if(source.muatan === 'Lokal'){
                        const mapelUmumItem:jp_mapelApp={
                            idbaris:data.idbaris,
                            idmapel:data.idmapel,
                            kode:source?.kode??'',
                            nama_mapel:source?.nama??'',
                            nama_mapel_ijazah:data.nama_mapel_ijazah,
                            jp_perminggu: data.jp_perminggu,
                            following_students:this.siswaAktifRombel.length,//this.SiswaInstance.countAgamaGenders([Gender.LAKI_LAKI, Gender.PEREMPUAN, Gender.UNKNOWN],resolveAgama(source?.penganut)as Agama),
                            status:data.status,
                            nama_rombel: this.rombel,   
                            index_in_rombel:index,
                            source:source
                        }
                        // koleksiMapelUmum.push(mapelUmumItem);
                        koleksiMapelRaport.push(mapelUmumItem);
                    }
                }
            });  
            
            isRegistered = true;
            countTotalJp = this.countJpPerMinggu('server');      
        }    

        return {
            hasRegistered: isRegistered,
            data: koleksiMapelRaport,
            countJp:countTotalJp
            
        }
    }
    mapelRombelUniqe():jp_mapelApp[]{
        return this.collectifMapelRombel().data.filter((value, index, self) => index === self.findIndex((m) => (
                m.nama_mapel_ijazah === value.nama_mapel_ijazah
            ))
        );
    }
}