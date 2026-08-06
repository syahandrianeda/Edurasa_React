import type { SppdAppType } from "~/types/surat/sppd-app-type";

export default class BuildSppd{
    private sppd:Partial<SppdAppType>={}
    // {
    //         idbaris: 0,
    //         refrensi_suratkeluar: 0,
    //         ptk_diperintah: 0,
    //         ptk_golongan: '',
    //         ptk_jabatan: '',
    //         ptk_maksudsppd: '',
    //         ptk_tempatsppd: '',
    //         ptk_starttgl: new Date(),
    //         ptk_durasisppd: 1,
    //         ptk_nosppd: '',
    //         resume: '',
    //         arsip_nosppd: '',
    //         versiupload: '',
    //         hapus: '',
    // }

    /**
     * 
     * @param baris : idbaris pada sheet `surat` tab `sppd`
     * @returns 
     */
    setIdbaris(baris:number):this{
        this.sppd.idbaris = baris;
        return this;
    }
    get data(){
        return this.sppd
    }
    /**
     * 
     * @param idBarisSuratKeluar : `idbaris` pada `surat_keluar`
     * @returns 
     */
    setRefrensiSuratKeluar(idBarisSuratKeluar:number):this{
        this.sppd.refrensi_suratkeluar = idBarisSuratKeluar;
        return this;
    }
    
    setPtkId(user_id:number):this{
        this.sppd.ptk_diperintah= user_id
        return this
    }

    setPtkGolongan(gol:string):this{
        this.sppd.ptk_golongan= gol;
        return this;
    }
    setPtkJabatan(jabatanTugas:string):this{
        this.sppd.ptk_jabatan = jabatanTugas;
        return this;
    }
    setPerihalSppd(perihalSuratKeluar:string):this{
        this.sppd.ptk_maksudsppd = perihalSuratKeluar;
        return this;
    }
    setMaksudSppd(perihalSuratKeluar:string):this{
        this.sppd.ptk_maksudsppd = perihalSuratKeluar;
        return this;
    }
    setTempatSppd(tempat:string):this{
        this.sppd.ptk_tempatsppd = tempat;
        return this;
    }
    setTglMulaiDinas(tgl:Date):this{
        this.sppd.ptk_starttgl = tgl;
        return this;
    }
    setLamaPerjalanan(durasi:number):this{
        this.sppd.ptk_durasisppd = durasi;
        return this;
    }
    setNoSuratSppd(nosuratKeluar:string):this{
        this.sppd.ptk_nosppd = nosuratKeluar;
        return this;
    }
    setHapus(hapus:string='hapus'):this{
        this.sppd.hapus = hapus;
        return this;
    }
    setPtkNama(nama:string):this{
        this.sppd.ptk_nama = nama;
        return this;
    }
    setPtkNip(nip:string):this{
        this.sppd.ptk_nip = nip;
        return this;
    }
}