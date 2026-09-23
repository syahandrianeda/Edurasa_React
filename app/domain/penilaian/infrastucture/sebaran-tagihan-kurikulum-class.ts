import type { TagihanHasDataResponse } from "../type/tagihan-assesmen-type";
export interface SebaranTagihanAssesmenKurikulumType{
    mapelName           : string, 
    mapelKode            : string,
    slotMapel           : number,
    dataCp              : dataCp[]
}
interface dataCp{
    cp_id               : number,
    cp_description      : string,
    slotCp              : number,
    dataTp              : dataTp[]
}
interface dataTp{
    tp_id               : number,
    tp_description      : string,
    slotTp              : number,
    dataAtp             : dataAtp[];
}
interface dataAtp{
    atp_id              : number,
    atp_description      : string,
    slotAtp             : number,
    dataTagihan         : dataTagihan[]
}
type  KategoriTagihanType = 'harian'
        | 'mid_semester'
        | 'akhir_semester'
        | 'remedial_pengayaan'
        | 'ujian_sekolah';

interface dataTagihan{
    kategori            : KategoriTagihanType
    dataInstrumen       : dataInstrumen[]
    // dataInstrumen       : TagihanHasDataResponse[]
}
interface dataTagihanMap{
    kategori            : KategoriTagihanType
    // dataInstrumen       : dataInstrumen[]
    dataInstrumen       : TagihanHasDataResponse[]
}
interface dataInstrumen{
    identitas           : string
    countInstrumen      : number
    // indexInstrumen      : number[]
    skor                : number
}

export default class SebaranTagihanKurikulumClass{
    private  dataSebaranTagihanAssesmenKurikulumType:SebaranTagihanAssesmenKurikulumType[]=[]
    constructor(private readonly data: TagihanHasDataResponse[]){ };

    get dataSebaran():SebaranTagihanAssesmenKurikulumType[]{
        return this.dataSebaranTagihanAssesmenKurikulumType
    }
    get sourceData():TagihanHasDataResponse[]{
        return this.data;
    }
    
    build():this{
        
        const mapelMap = new Map<string,{
            mapelName: string, 
            mapelKode: string, 
            slotMapel: number,
            dataCp: Map<number, 
            {
                cp_id: number, 
                cp_description: string, 
                slotCp:    number,
                dataTp: Map<number, 
                {
                    tp_id: number, 
                    tp_description: string,
                    slotTp  :number
                    dataAtp: Map<number,
                    {
                        atp_id: number, 
                        atp_description: string,
                        slotAtp: number,
                        idSoal_collections: {idsoal:number, kd:number}[],
                        dataTagihan: Map<string, dataTagihanMap>
                    }
                    >
                }
                >
            }
            >
        }>();
        
        const tagihanMapParent = new Map<KategoriTagihanType, dataTagihanMap>
        
        for(const item of this.data){
            const kurikulum_tagihan = item.kurikulum_tagihan;
            const namatagihan = this.switchTagihan(item.jenis_tagihan.kode);

            if(!tagihanMapParent.has(namatagihan)){
                tagihanMapParent.set(namatagihan,
                    {
                        kategori: namatagihan,
                        dataInstrumen: []
                    }
                )
            };
            const getTagihanParent = tagihanMapParent.get(namatagihan)!;
            getTagihanParent.dataInstrumen.push(item);


            for(const kurikulum of kurikulum_tagihan){
                const mapelName = kurikulum.mapelname ?? 'mapelName_notFound';
                const kodeName = kurikulum.kodemapel ?? 'mapelName_notFound';
                const cp_id = kurikulum.cp_id ?? 0;
                const cp_description = kurikulum.cp_description ?? ''
                const tp_id = kurikulum.tp_as_cp_id ?? 0;
                const tp_description = kurikulum.tp_as_cp_description ?? ''
                const atp_id = kurikulum.atp_as_tp_id ?? 0;
                const atp_description = kurikulum.atp_as_tp_description ?? '';

                if(!mapelMap.has(kodeName)){
                    mapelMap.set(kodeName, 
                        {
                            mapelKode:kodeName,
                            mapelName,
                            dataCp: new Map(),
                            slotMapel: 0
                        }
                    )
                };

                const cpMap = mapelMap.get(kodeName)!;
                cpMap.slotMapel++;
                if(!cpMap?.dataCp.has(cp_id)){
                    cpMap?.dataCp.set(cp_id, 
                        {
                            cp_id,
                            cp_description,
                            slotCp: 0,
                            dataTp: new Map()
                        }
                    )
                }


                const tpMap = cpMap?.dataCp.get(cp_id)!;
                tpMap.slotCp++;
                if(!tpMap?.dataTp.has(tp_id)){
                    tpMap?.dataTp.set(tp_id, 
                        {
                            tp_id,
                            tp_description,
                            slotTp: 0,
                            dataAtp: new Map()
                        }
                    )
                }
                const atpMap = tpMap?.dataTp.get(tp_id)!;
                atpMap.slotTp++;
                if(!atpMap?.dataAtp.has(atp_id)){
                    atpMap?.dataAtp.set(atp_id, 
                        {
                            atp_id,
                            atp_description,
                            slotAtp: 0,
                            dataTagihan: new Map(),
                            idSoal_collections:kurikulum.hasSoal.map(m=>({idsoal:m.idbaris, kd:atp_id}))

                        }
                    )
                }

                const tagihanMap = atpMap?.dataAtp.get(atp_id)!;
                tagihanMap.slotAtp++;
                // const tagihanParent = tagihanMapParent.get()
                if(!tagihanMap?.dataTagihan.has(namatagihan)){
                    // const currentKd = getTagihanParent.dataInstrumen.
                    tagihanMap?.dataTagihan.set(namatagihan, getTagihanParent);
                    continue;
                }

                tagihanMap.dataTagihan.set(namatagihan,getTagihanParent)

               

            }

        }

       this.dataSebaranTagihanAssesmenKurikulumType = [...mapelMap.values()].map(datamapel=>{
        const slotMapel = datamapel.slotMapel
        const mapelKode = datamapel.mapelKode;
        const mapelName = datamapel.mapelName;
        let countSlotMapel = 0
        const dataCp = [...datamapel.dataCp.values()].map(Cp=>{
            const cp_id = Cp.cp_id
            const cp_description = Cp.cp_description;
            const slotCp = Cp.slotCp;
            let countSlotCp = 0
            const dataTp = [...Cp.dataTp.values()].map(Tp=>{
                const tp_id = Tp.tp_id;
                const tp_description= Tp.tp_description;
                const slotTp = Tp.slotTp;
                let countSlotTp = 0
                const dataAtp = [...Tp.dataAtp.values()].map(Atp=>{
                    const {
                        atp_id,
                        atp_description,
                        slotAtp,
                        dataTagihan:sourceTagihan,
                        idSoal_collections
                     } = Atp;
                     const dataTagihan = [...sourceTagihan.values()].map(tagihan=>{
                        const {kategori, dataInstrumen:sourceInstrumen} = tagihan;
                        const currentKd = sourceInstrumen.filter(s=>s.kurikulum_tagihan.some(tg=>tg.atp_as_tp_id === atp_id));
                        const mapIdSoalCurrentKd = currentKd.flatMap(m=>m.id_bank_soal)
                        const cekSoal = idSoal_collections.filter(s=>s.kd === atp_id && mapIdSoalCurrentKd.includes(s.idsoal))
                        const dataInstrumen: dataInstrumen[] = currentKd.map(m=>({
                            identitas: m.nama_publikasi,
                            countInstrumen: m.source === 'Paket Soal'?cekSoal.length: 1,
                            skor: 0
                        }))
                        return {
                            kategori,
                            dataInstrumen
                        }
                     })
                    countSlotMapel++;
                    countSlotCp++;
                    countSlotTp++
                    return {
                        atp_id,
                        atp_description,
                        slotAtp,
                        dataTagihan
                    }
                })
            
                return {
                    tp_id, 
                    tp_description,
                    slotTp: countSlotTp,
                    dataAtp
                }
            })
            return {
                cp_id,
                cp_description,
                slotCp: countSlotCp,
                dataTp
            }
        })

        return {
            mapelName,
            mapelKode,
            slotMapel:countSlotMapel,
            dataCp

        }
       })
        return this;
    }

    switchTagihan(kode:string):KategoriTagihanType{
        switch (kode){
            case 'Remedial':
                return 'remedial_pengayaan';
            case 'Pengayaan':
                return 'remedial_pengayaan';
            case 'PTS':
                return 'mid_semester';
            case 'PAS':
                return 'akhir_semester';
            case 'PAK':
                return 'akhir_semester';
            case 'PSAJ':
                return 'ujian_sekolah';
            default:
                return 'harian'
        }
        
    }
}