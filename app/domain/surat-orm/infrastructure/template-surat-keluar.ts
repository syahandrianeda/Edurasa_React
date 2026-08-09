import { KlasifikasiNoSurat, type KlasifikasiSuratKemendegriType } from "~/domain/surat/klasifikasi-surat-permendagri";
import type { DataOrmSuratKeluarType, kontenDataTemplate } from "../entity/surat-orm-type";
import type { SuratKeluarAppType } from "~/types/surat/surat-keluar-app-type";
import { currentTapel } from "~/lib/current-tapel";
import type { UserPtk } from "~/types";
import type { RiwayatAkunAppType } from "~/types/tendik/riwayat-akun-app-type";
import type RiwayatIdAkunClass from "~/domain/tendik/riwayat-id-akun-class";
import type { SppdAppType } from "~/types/surat/sppd-app-type";
import type { SiswaType } from "~/types/siswa";
import type RiwayatRombelClass from "~/domain/rombel/riwayat-rombel-class";

interface TemplateSuratKeluarType{
    hasTemplate:boolean,
    dataTemplate?: kontenDataTemplate
}

export default class TemplateSuratKeluar{
    private resultTemplate:TemplateSuratKeluarType = {
        hasTemplate:false,
        dataTemplate:undefined
    }
    private readonly dataKlasifikasi:KlasifikasiSuratKemendegriType[] = []
    private readonly riwayatAkun:RiwayatIdAkunClass = undefined as unknown as RiwayatIdAkunClass;
    private readonly riwayatRombelSiswa:RiwayatRombelClass = undefined as unknown as RiwayatRombelClass;

    constructor(riwayatAkunInstance:RiwayatIdAkunClass, private readonly sppdData:SppdAppType[] = [], riwayatRombel:RiwayatRombelClass){
        this.riwayatAkun = riwayatAkunInstance;
        this.dataKlasifikasi = KlasifikasiNoSurat;
        this.riwayatRombelSiswa = riwayatRombel
    }
    get dataKlasifikasiHasTemplate():KlasifikasiSuratKemendegriType[]{
        return this.dataKlasifikasi.filter(s=>s.hasOwnProperty('template'))
    }
    setHasTemplate(template:string):this{
        
        const found = this.dataKlasifikasiHasTemplate.find(s=>s.template === template)
        this.resultTemplate.hasTemplate = Boolean(found?.template);
        if(found){
            this.resultTemplate.dataTemplate = {
                name: found.template!,
                // personalSppdType:{id:2} as UserPtk
            }
        }
        return this;
    }
    
    setPersonalPtk(target_ptk:number[], tglSurat:Date, idsurat:number, nosurat:string):this{
        // const found = this.riwayatAkun.getAkunInDate(target_ptk[0], new Date());
        if(this.resultTemplate.dataTemplate && this.resultTemplate.hasTemplate){
            // this.resultTemplate.dataTemplate.personalSppdType = {id:target_ptk[0]} as UserPtk;
            const personalSppdTypeArray:(SppdAppType)[] = [];
            if(target_ptk.length === 0){
                    const find = this.sppdData.filter(s=>s.refrensi_suratkeluar === idsurat).map(sppd=>{
                            const found = this.riwayatAkun?.getAkunInDate(sppd.ptk_diperintah, tglSurat);
                            const isNipBerlaku = found?.nip && found?.tgl_nip_start && found?.tgl_nip_start <= tglSurat;
                            const nip = isNipBerlaku ? found?.nip : undefined;
                            return {...sppd, ptk_nama: found?.nama_guru, ptk_nip: nip, ptk_nosppd:nosurat}
                        })

                personalSppdTypeArray.push(...find);
            }else{
                target_ptk.forEach((ptkId)=>{
                    const found = this.riwayatAkun.getAkunInDate(ptkId, tglSurat);
                    const foundSppd = this.sppdData.find(s=>s.refrensi_suratkeluar === idsurat && s.ptk_diperintah === ptkId);
                    if(found ){
                        if(foundSppd){
                            const newData:SppdAppType = {...foundSppd, ptk_nama: found.nama_guru, ptk_nip: found.nip,  ptk_nosppd:nosurat};
                            personalSppdTypeArray.push(newData);
                        }
                        
                    }   
                })

            }
            this.resultTemplate.dataTemplate!.personalSppdType = personalSppdTypeArray;
        }
        return this;
    }
    setPersonalSiswa(allSiswa:SiswaType[], tglSurat:Date, idSiswa:number[]):this{
        if(this.resultTemplate.dataTemplate && this.resultTemplate.hasTemplate){
            const result:SiswaType[]=[]
            for(const id of idSiswa){
                const findSiswa = allSiswa.find(s=>s.id === id);
                const nama_rombel = this.riwayatRombelSiswa?.getRombelSiswaInTapel(id,tglSurat) ??'';
                const rombel = this.riwayatRombelSiswa.getRiwayatRombelSiswa(id); 
                
                if(findSiswa){
                    const newData:SiswaType = {...findSiswa, nama_rombel}
                    result.push(newData);
                }
            }
            this.resultTemplate.dataTemplate!.personalSiswaType =result;
            
        }
        return this;
    }
    build(){
        return structuredClone(this.resultTemplate);
    }
}