import { useEffect, useMemo, useState } from "react"
import { formatJam } from "~/lib/format-jam";
import type { jp_mapelApp } from "~/types/mapel/jp_mapel"
import type { jadwalMapelAccordTableApp } from "~/types/setting_jadwal/jadwal_mapel"
import type { settingJadwalApp } from "~/types/setting_jadwal/setting_jadwal"

export function useSettingAndJadwal(
    settingServer:settingJadwalApp[], 
    jadwalServer: jadwalMapelAccordTableApp[],
    mapelRombel: jp_mapelApp[],
    kegiatanSekolah: jp_mapelApp[],
    rombel:string
){
    /** settingJadwal itu data yang ada di tab sheet [setting_jadwal] */
    const [settingJadwal, setSettingJadwal] = useState<settingJadwalApp|null>(null);
    const [showCompMenitIstirahat, setShowCompMenitIstirahat] = useState(false);
    const [showType, setShowType] = useState(false);

    useEffect(()=>{
        const findSetting = settingServer.find(item=>item.rombel === rombel);
        if(findSetting){
            setSettingJadwal(findSetting);
            setShowType(findSetting.show_type === 'kode');
        }else{
            setSettingJadwal({
                idbaris:0,
                rombel:rombel,  
                jam_awal:'06:30',
                has_rest_time:true,
                include_sabtu:false,
                count_jp_hari:7,
                interval_menit:35,
                menit_istirahat:30,
                index_jam_istirahat:4,
                show_type:'kode'
            });
            setShowType(true);
        }
    }, [settingServer, rombel]);    

    // aksi-aksi yang mengubah setting jadwal:
    function changeJamAwal(value:string){
        setSettingJadwal(prev=>{
            if(!prev) return prev;
            return {
                ...prev,
                jam_awal:value
            }
        })
    }
    function changeHasRestTime(value:boolean){
        setSettingJadwal(prev=>{
            if(!prev) return prev;  
            return {
                ...prev,
                has_rest_time:value,
                menit_istirahat:value?30:0,
                index_jam_istirahat:value?4:-1,
            }
        });
        
        
        setShowCompMenitIstirahat(value);
    }
    function changeMenitIstirahat(value:number){
        
            setSettingJadwal(prev=>{
                if(!prev) return prev;
                return {
                    ...prev,
                    menit_istirahat:value
                }
            })
    }       

    function changeIncludeSabtu(value:boolean){
        setSettingJadwal(prev=>{
            if(!prev) return prev;          
            return {
                ...prev,
                include_sabtu:value
            }
        })
    }   
    function changeCountJpHari(value:number){
        setSettingJadwal(prev=>{
            if(!prev) return prev;      
            return {
                ...prev,
                count_jp_hari:value
            }
        })
    }   
    function changeIntervalMenit(value:number){
        setSettingJadwal(prev=>{
            if(!prev) return prev;
            return {
                ...prev,
                interval_menit:value
            }
        })
    }
    function changeShowType(value:boolean){
        setSettingJadwal(prev=>{
            if(!prev) return prev;
            return {
                ...prev,
                show_type:value ? 'kode' : 'nama_mapel'
            }
        });
        
        setShowType(value);
    }

    // inisiasi kerangka jadwal:
      // cek apakah jumlah baris jadwal sesuai dengan jadwal yang seharusnya disetting jadwal
        // jika data server lebih sedikit, maka sediakan slot,
        // jika data server lebih banyak, slot dari server bersihkan;
    const [dataJadwal, setDataJadwal] = useState<jadwalMapelAccordTableApp[]>(generateKerangkaJadwal);
    function generateKerangkaJadwal(){
        const kerangka : jadwalMapelAccordTableApp[]=[];
        /**JIKA JADWAL SERVER LEBIH SEDIKIT  */
        if(jadwalServer.length < settingJadwal?.count_jp_hari!){    
            const totalJam = settingJadwal!.count_jp_hari + (settingJadwal?.has_rest_time ? 1 : 0);
            const [hour, minute] = settingJadwal!.jam_awal.split(':').map(Number);
            const current = new Date();
            current.setHours(hour);
            current.setMinutes(minute);
            current.setSeconds(0);
            current.setMilliseconds(0);

            for(let i = 0 ; i < totalJam ; i++){
                const jamAwal = new Date(current);
                const jamAkhir = new Date(current);
                if(settingJadwal?.has_rest_time && i === settingJadwal.index_jam_istirahat! ){
                    jamAkhir.setMinutes(jamAkhir.getMinutes() + settingJadwal!.menit_istirahat!);
                    const dataIstirahat : jadwalMapelAccordTableApp = {
                        idbaris: jadwalServer[i]?.idbaris || 0,
                        jam_ke: i+1,
                        waktu: `${formatJam(jamAwal)} - ${formatJam(jamAkhir)}`,
                        namarombel: rombel,
                        sn: undefined,
                        sl: undefined,
                        rb: undefined,
                        km: undefined,
                        jm: undefined,
                        sb: undefined,
                        status: '',
                        type_row: 'istirahat',
                    };  
                    kerangka.push(dataIstirahat);
                    current.setMinutes(current.getMinutes() + settingJadwal!.menit_istirahat!);
                }else{
                    jamAkhir.setMinutes(jamAkhir.getMinutes() + settingJadwal!.interval_menit!);
                    const dataDummy : jadwalMapelAccordTableApp = {
                        idbaris: jadwalServer[i]?.idbaris || 0,
                        jam_ke: i+1,
                        waktu: `${formatJam(jamAwal)} - ${formatJam(jamAkhir)}`,
                        namarombel: rombel,
                        sn: jadwalServer[i]?.sn || undefined,
                        sl: jadwalServer[i]?.sl || undefined,
                        rb: jadwalServer[i]?.rb || undefined,
                        km: jadwalServer[i]?.km || undefined,
                        jm: jadwalServer[i]?.jm || undefined,
                        sb: jadwalServer[i]?.sb || undefined,   
                        status:'',
                        type_row:'',
                    };
                    kerangka.push(dataDummy);
                    current.setMinutes(current.getMinutes() + settingJadwal!.interval_menit!);
                }
            }
        }
        /**JIKA JADWAL SERVER LEBIH BANYAK, HAPUS SISANYA ATAU JADIKAN DATANYA UNDEFINED */
        else if(jadwalServer.length > settingJadwal?.count_jp_hari!){

            const selisih = settingJadwal!.count_jp_hari - jadwalServer.length;
            const totalJam = jadwalServer.length + (settingJadwal?.has_rest_time ? 1 : 0);
            const [hour, minute] = settingJadwal!.jam_awal.split(':').map(Number);
            const current = new Date();
            current.setHours(hour);
            current.setMinutes(minute);
            current.setSeconds(0);
            current.setMilliseconds(0);

            for(let i = 0 ; i < totalJam; i++){
                
                const jamAwal = new Date(current);
                const jamAkhir = new Date(current);
                if(i<settingJadwal!.count_jp_hari!){
                    // kerangka.push(jadwalServer[i]);
                    if(settingJadwal?.has_rest_time && settingJadwal.index_jam_istirahat === i){
                        const dataIstirahat : jadwalMapelAccordTableApp = {
                            idbaris: jadwalServer[i]?.idbaris || 0,
                            jam_ke: i+1,
                            waktu: `${formatJam(jamAwal)} - ${formatJam(jamAkhir)}`,
                            namarombel: rombel,
                            sn: undefined,
                            sl: undefined,
                            rb: undefined,
                            km: undefined,
                            jm: undefined,
                            sb: undefined,
                            status: '',
                            type_row: 'istirahat',
                        };  
                        kerangka.push(dataIstirahat);
                        current.setMinutes(current.getMinutes() + settingJadwal!.menit_istirahat!);
                    }else{
                        const dataDummy : jadwalMapelAccordTableApp = {
                            idbaris: jadwalServer[i]?.idbaris || 0,
                            jam_ke: i+1,
                            waktu: `${formatJam(jamAwal)} - ${formatJam(jamAkhir)}`,
                            namarombel: rombel,
                            sn: jadwalServer[i]?.sn || undefined,
                            sl: jadwalServer[i]?.sl || undefined,
                            rb: jadwalServer[i]?.rb || undefined,
                            km: jadwalServer[i]?.km || undefined,
                            jm: jadwalServer[i]?.jm || undefined,
                            sb: jadwalServer[i]?.sb || undefined,   
                            status:'',
                            type_row:'',
                        };
                        kerangka.push(dataDummy);
                        current.setMinutes(current.getMinutes() + settingJadwal!.interval_menit!);
                    }
                }else{
                    // sisanya jadwal server yang lebih, jadikan undefined atau hapus
                    if(settingJadwal?.has_rest_time && settingJadwal.index_jam_istirahat === i){
                        const dataIstirahat : jadwalMapelAccordTableApp = {
                            idbaris: jadwalServer[i]?.idbaris || 0,
                            jam_ke: i+1,
                            waktu: `${formatJam(jamAwal)} - ${formatJam(jamAkhir)}`,
                            namarombel: rombel,
                            sn: undefined,
                            sl: undefined,
                            rb: undefined,
                            km: undefined,
                            jm: undefined,
                            sb: undefined,
                            status: 'hapus',
                            type_row: 'istirahat',
                        };  
                        kerangka.push(dataIstirahat);
                        current.setMinutes(current.getMinutes() + settingJadwal!.menit_istirahat!);
                    }else{
                        const dataDummy : jadwalMapelAccordTableApp = {
                            idbaris: jadwalServer[i]?.idbaris || 0,
                            jam_ke: i+1,
                            waktu: `${formatJam(jamAwal)} - ${formatJam(jamAkhir)}`,
                            namarombel: rombel,
                            sn: undefined,
                            sl: undefined,
                            rb: undefined,
                            km: undefined,
                            jm: undefined,
                            sb: undefined,   
                            status:'hapus',
                            type_row:'',
                        };
                        kerangka.push(dataDummy);
                        current.setMinutes(current.getMinutes() + settingJadwal!.interval_menit!);
                    }
                }
            }
        }
        return kerangka;
    }
    useEffect(()=>{
        if(settingJadwal){
            setDataJadwal(prev=>{
                const newData = generateKerangkaJadwal();
                return newData;     
            });
        }
    }, [settingJadwal, jadwalServer]);

    return {
        settingJadwal,
        changeJamAwal,
        changeHasRestTime,
        changeMenitIstirahat,   
        changeIncludeSabtu,
        changeCountJpHari,
        changeIntervalMenit,
        showCompMenitIstirahat,  
        changeShowType,
        showType,
        dataJadwal,
    }
}