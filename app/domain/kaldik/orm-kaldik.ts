import { DTOKaldikSheetToApp } from "~/dtos/dto-kaldik-to-app";
import { getParseDateYYYYMMMDD } from "~/lib/date-helper";
import { groupBy } from "~/lib/group-by";
import type { KaldikType } from "~/types/kaldik";
import type { dataKaldikSemester, dataSparatedKaldikKeterangan, detailPropertiHari, groupingDataKaldik, keteranganLabelKaldik, LiburHeHebType, propertiHariDalamBulan, propertyTgl } from "./type-output-kaldik";
import { currentTapelProperties } from "~/lib/current-tapel";

export default class OrmKaldik{
    private dataAsal:KaldikType[];

    constructor(dataKaldik:KaldikType[]){
        this.dataAsal = DTOKaldikSheetToApp.fromSheetArray(dataKaldik);
    }
    get data(): readonly KaldikType[] {
        return this.dataAsal;
    }
    get firsYearTapel(){
        return currentTapelProperties({variant:'firstYear'});
    }
    get LastYearTapel(){
        return currentTapelProperties({variant:'lastYear'});
    }
    dataTemplate():KaldikType{
        return {
            time_stamp: new Date(),
            keterangan: 'Tulis Keterangan di sini',
            start_tgl: new Date(),
            end_tgl: new Date,
            oleh: '',
            aksi: '',
            idbaris: 0,
            warna: '',
            libur_he_heb: false,
            he: true,
            heb: true,
            libur: false,
            backgroundColor: '#ffffff',
            color: '#000000',
            hapus: '',
        }
    }

    filtering(callback: (item: KaldikType) => boolean) {
        this.dataAsal = this.dataAsal.filter(callback);
        return this;
    }
    sortYoungest(){
        this.dataAsal.sort((a,b)=> a.start_tgl.getTime() - b.start_tgl.getTime());
        return this;
    }
    sortOldest(){
        this.dataAsal.sort((a,b)=> b.start_tgl.getTime() - a.start_tgl.getTime());
        return this;
    }

    /**
     * @info count Date in paramater Date, same with lastDate
     * @param date 
     * @returns number | last Date
     */
    countDateInMonth(date:Date):number{
        return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    }

    firstDateInMonth(date:Date):Date{
        return new Date(date.getFullYear(), date.getMonth(),1)
    }

    lastDateInMonth(date:Date):Date{
        return new Date(date.getFullYear(), date.getMonth(), this.countDateInMonth(date))
    }

    getWeekOfMonth(date: Date): number {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return Math.ceil((date.getDate() + firstDay) / 7);
    }

    getWeeksInMonth(date:Date): number {
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // 0 = Minggu
        const daysInMonth = new Date(date.getFullYear(), (date.getMonth() + 1), 0).getDate();

        return Math.ceil((firstDayOfMonth + daysInMonth) / 7);
    }

    getCollectionDataKaldikByDate(date:Date):KaldikType[]{
        // temukan tanggal ini di data kalendar
        const dateYyyMmDd = getParseDateYYYYMMMDD(date);
        return this.dataAsal.filter(s=> 
                dateYyyMmDd >= getParseDateYYYYMMMDD(s.start_tgl) &&
                dateYyyMmDd <= getParseDateYYYYMMMDD(s.end_tgl)
            );
    }
    getCollectionDataKaldikByMonth(date:Date):KaldikType[]{
        // temukan tanggal ini di data kalendar
        const targetMonth = date.getMonth();
        const targetYear = date.getFullYear();
        
        return this.dataAsal.filter(s=> 
                (s.start_tgl.getMonth() === targetMonth && s.start_tgl.getFullYear()=== targetYear) ||
                (s.end_tgl.getMonth() === targetMonth && s.end_tgl.getFullYear()=== targetYear )
                
            );
    }
    getLiburHeHebData(date:Date, sabtuLibur:boolean):LiburHeHebType{
        // siapkan data default:
        let result:LiburHeHebType={
            isLibur:false,
            isHe:true,
            isHeb:true,
            indexWeek:date.getDay(),
        };
        // temukan tanggal ini di data kalendar
        const dateYyyMmDd = getParseDateYYYYMMMDD(date);
        const findDateInDate = this.getCollectionDataKaldikByDate(date);
        // const findDateInDate = this.dataAsal.filter(s=> 
        //         dateYyyMmDd >= getParseDateYYYYMMMDD(s.start_tgl) &&
        //         dateYyyMmDd <= getParseDateYYYYMMMDD(s.end_tgl)
        //     );
        // Jika minggu maka itu pasti libur
        if(date.getDay() === 0){
            result = {
                isLibur:true,
                isHe: false,
                isHeb: false,
                style:{color:'red',fontWeight:900},
                indexWeek: date.getDay(),
            }

        }

        //jika sabtuLibur ditandai sebagai libur dan 'date' adalah hari sabtu
        if(date.getDay() === 6 && sabtuLibur){
            result = {
                isLibur:true,
                isHe: false,
                isHeb: false,
                style:{color:'red',fontWeight:900},
                indexWeek: date.getDay(),
            }
        };

        //cek libur di ketetarangan kalendar;
        if(findDateInDate.length>0){
            const isLiburFinded = findDateInDate.some(s=>s.libur);
            const styleBg = findDateInDate.map(s=>s.backgroundColor).join(',');
            const styleFontColor =findDateInDate[findDateInDate.length-1].color
            let bg = {background:`linear-gradient(-45deg,${styleBg})`,color:`${styleFontColor}`};
            // let bg = {background:`radial-gradient(${styleBg})`,color:`${styleFontColor}`};
            if(isLiburFinded){
                result = {
                    isLibur:true,
                    isHe: false,
                    isHeb: false,
                    style: bg,
                    indexWeek: date.getDay(),
                    
                }
            }else{
                if(date.getDay() === 6 && sabtuLibur){
                    result = {
                        isLibur: true,
                        isHe: false,//findDateInDate.some(s=>s.he===true),
                        isHeb: false,//findDateInDate.some(s=>s.heb===true),
                        style: bg,
                        indexWeek: date.getDay(),
                    }
                } else if(date.getDay() === 6 && !sabtuLibur){
                    result = {
                        isLibur: false,
                        isHe: true,//findDateInDate.some(s=>s.he===true),
                        isHeb: findDateInDate.some(s=>s.heb===true),
                        style: bg,
                        indexWeek: date.getDay(),
                    }
                } else if(date.getDay() === 0){
                    result = {
                        isLibur:true,
                        isHe: false,
                        isHeb: false,
                        style:bg,
                        indexWeek: date.getDay(),
                    }

                }else{
                    result = {
                        isLibur:false,
                        isHe: true,//findDateInDate.some(s=>s.he===true),
                        isHeb: findDateInDate.some(s=>s.heb===true),
                        style: bg,
                        indexWeek: date.getDay(),
                    }
                }

            }
        }
        return result
    }

    /**
     * @info method untuk mendeteksi apa tgl di paramater sudah terjadi apa belum
     * misal: sekarang tgl: 1 januari 2026, tanggal yang dicek : 5 Januari, maka 
     *        tanggal 5 januari itu belum terjadi (sekarang < tanggal cek)
     * @param date 
     * @returns 
     */
    getEventYetOfDate(date:Date):boolean{
        const now = getParseDateYYYYMMMDD(new Date());
        const curr = getParseDateYYYYMMMDD(date);
        return now < curr;
    }
    
    arrayDateInMonth(date:Date, sabtuLibur:boolean =  true):propertyTgl[]{
        const countDays = this.countDateInMonth(date);
        const data:propertyTgl[]=[];

        [...Array(countDays)].forEach((_,i)=>{
            const d = new Date(date.getFullYear(), date.getMonth(),(i+1));
            const weekInMonth = this.getWeekOfMonth(d)
            const isEventYet = this.getEventYetOfDate(d);
            const property = this.getLiburHeHebData(d, sabtuLibur);
            const keterangan = this.getKeteranganInCurrentDate(d);

            const item:propertyTgl={
                ...property,
                tgl:i+1,
                date:d,
                weekInMonth: weekInMonth,
                eventYet:isEventYet,
                keteranganKaldik:keterangan
            };
            data.push(item);
        });

        return data;
    }
    getLabelTanggalBetweenDate(start:Date, end:Date):string{
        const YearStart = start.getFullYear();
        const MonthStart = start.getMonth();
        const YearEnd = end.getFullYear();
        const MonthEnd = end.getMonth();

        if(YearStart === YearEnd){
            if(MonthStart === MonthEnd){
                if(start.getDate() === end.getDate()){
                    return `${end.toLocaleDateString('id-ID',{dateStyle:'medium'})}`;
                }else{
                    return `${start.getDate()} s/d ${end.toLocaleDateString('id-ID',{dateStyle:'medium'})}`;
                }
            }else{
                return `${new Intl.DateTimeFormat( 'id-ID', { day:'numeric',month:'short',}).format(start)} s/d ${end.toLocaleDateString('id-ID',{dateStyle:'medium'})}`;
            }
        }else{
            return `${start.toLocaleDateString('id-ID',{dateStyle:'medium'})}/${end.toLocaleDateString('id-ID',{dateStyle:'medium'})}`;
        }
        
    }
    getMemberTanggal(start:Date, end:Date):number[]{;
        const result:number[]=[];
        const _start = new Date(start);
        while(_start <=  end){
            const yyymmdd = getParseDateYYYYMMMDD(_start);
            result.push(yyymmdd);
            _start.setDate(_start.getDate()+1);
        }
        return result;
    }
    getKeteranganInCurrentDate(date:Date):keteranganLabelKaldik[]{
        const final:keteranganLabelKaldik[]=[];
        // temukan tanggal ini di data kalendar
        const dateYyyMmDd = getParseDateYYYYMMMDD(date);
        const findDateInDate = this.dataAsal.filter(s=> 
                dateYyyMmDd >= getParseDateYYYYMMMDD(s.start_tgl) &&
                dateYyyMmDd <= getParseDateYYYYMMMDD(s.end_tgl)
            );
        if(findDateInDate.length>0){
            findDateInDate.forEach(({idbaris, keterangan,backgroundColor, color, start_tgl,end_tgl},index)=>{
                const label = this.getLabelTanggalBetweenDate(start_tgl, end_tgl);
                const member = this.getMemberTanggal(start_tgl, end_tgl);
                const result:keteranganLabelKaldik = {
                    idbaris:idbaris,
                    keterangan:keterangan,
                    labelTanggal:label,
                    memberTanggal:member,
                    warnaLatar:backgroundColor,
                    warnaHuruf:color,
                    start_tgl:start_tgl,
                    end_tgl:end_tgl
                }
                final.push(result);
            })
        }
        return final;
    }

    groupByWeekInMonth(date:Date,sabtuLibur:boolean = true):groupingDataKaldik{
        const arrayDate = this.arrayDateInMonth(date, sabtuLibur);
        const mg = arrayDate.filter(s=>s.indexWeek === 0).length;
        const sn = arrayDate.filter(s=>s.indexWeek === 1 && !s.isLibur).length;
        const snBelajar = arrayDate.filter(s=>s.indexWeek === 1 && s.isHeb).length;
        const sl = arrayDate.filter(s=>s.indexWeek === 2 && !s.isLibur).length;
        const slBelajar = arrayDate.filter(s=>s.indexWeek === 2 && s.isHeb).length;
        const rb = arrayDate.filter(s=>s.indexWeek === 3 && !s.isLibur).length;
        const rbBelajar = arrayDate.filter(s=>s.indexWeek === 3 && s.isHeb).length;
        const km = arrayDate.filter(s=>s.indexWeek === 4 && !s.isLibur).length;
        const kmBelajar = arrayDate.filter(s=>s.indexWeek === 4 && s.isHeb).length;
        const jm = arrayDate.filter(s=>s.indexWeek === 5 && !s.isLibur).length;
        const jmBelajar = arrayDate.filter(s=>s.indexWeek === 5 && s.isHeb).length;
        const sb = arrayDate.filter(s=>s.indexWeek === 6 && !s.isLibur).length;
        const sbBelajar = arrayDate.filter(s=>s.indexWeek === 6 && s.isHeb).length;
        const totalTidakLibur =  arrayDate.filter(s=>!s.isLibur ).length;
        const totalEfektifBelajar =  arrayDate.filter(s=> s.isHeb).length;
        return {
            groupWeek: groupBy(arrayDate,(item)=>item.weekInMonth),
            propertiesHariEfektif:{
                minggu: mg,
                senin:  sn,
                selasa: sl,
                rabu:   rb,
                kamis:  km,
                jumat:  jm,
                sabtu:  sb,
                total: sabtuLibur? (sn+sl+rb+km+jm):(sn+sl+rb+km+jm+sb)//totalTidakLibur
            },
            propertiesHariEfektifBelajar:{
                minggu: mg,
                senin:  snBelajar,
                selasa: slBelajar,
                rabu:   rbBelajar,
                kamis:  kmBelajar,
                jumat:  jmBelajar,
                sabtu:  sbBelajar,
                total: sabtuLibur? (snBelajar+slBelajar+rbBelajar+kmBelajar+jmBelajar):(snBelajar+slBelajar+rbBelajar+kmBelajar+jmBelajar+sbBelajar)// totalEfektifBelajar
            }
        }
    }

    getarrayMonthInSemester(semester:number):Date[]{;
        const dataBulan:Date[] = [];
        [...Array(6)].forEach((_,i)=>{
            if(semester === 1){
                const d = new Date(this.firsYearTapel as number, (i+6),1);
                dataBulan.push(d);
            }else{
                const d = new Date(this.LastYearTapel as number, i,1);
                dataBulan.push(d);
            }
        })
        return dataBulan
    }
    getarrayMonthInOneTapel():Date[]{;
        const dataBulan:Date[] = [];
        [...Array(6)].forEach((_,i)=>{
                const d = new Date(this.firsYearTapel as number, (i+6),1);
                dataBulan.push(d);
            
        });
        [...Array(6)].forEach((_,i)=>{
            
                const d = new Date(this.LastYearTapel as number, i,1);
                dataBulan.push(d);
            
        });
        return dataBulan
    }
    getDataKaldikInSemester(semester:number):KaldikType[]{
        if(semester===1){
            const startTgl = new Date(this.firsYearTapel as number,6,1);
            const endTgl = new Date(this.firsYearTapel as number, 11, 31);
            const A = getParseDateYYYYMMMDD(startTgl);
            const B = getParseDateYYYYMMMDD(endTgl)
            return this.dataAsal.filter(s=>
                // (
                //     getParseDateYYYYMMMDD(s.start_tgl) <= A || getParseDateYYYYMMMDD(s.start_tgl) <= B
                // ) &&
                //     getParseDateYYYYMMMDD(s.end_tgl) >= A &&
                //     getParseDateYYYYMMMDD(s.end_tgl) <= B 
                getParseDateYYYYMMMDD(s.start_tgl) <= B &&
                getParseDateYYYYMMMDD(s.end_tgl) >= A
            );
        }else{
            const startTgl = new Date(this.LastYearTapel as number,0,1);
            const endTgl = new Date(this.LastYearTapel as number, 5, 30);
            const A = getParseDateYYYYMMMDD(startTgl);
            const B = getParseDateYYYYMMMDD(endTgl)
            return this.dataAsal.filter(s=>
                // (
                //     getParseDateYYYYMMMDD(s.start_tgl) <= A || getParseDateYYYYMMMDD(s.start_tgl) <= B
                // ) &&
                //     getParseDateYYYYMMMDD(s.end_tgl) >= A &&
                //     getParseDateYYYYMMMDD(s.end_tgl) <= B 
                getParseDateYYYYMMMDD(s.start_tgl) <= B &&
                getParseDateYYYYMMMDD(s.end_tgl) >= A
            );

        }
        
    }
    getDataKaldikInOneTapel():KaldikType[]{
        
            const startTgl = new Date(this.firsYearTapel as number,6,1);
            const endTgl = new Date(this.LastYearTapel as number, 5, 30);
            const A = getParseDateYYYYMMMDD(startTgl);
            const B = getParseDateYYYYMMMDD(endTgl)
            return this.dataAsal.filter(s=>
                getParseDateYYYYMMMDD(s.start_tgl) <= B &&
                getParseDateYYYYMMMDD(s.end_tgl) >= A
            );
        

        
        
    }
    getKaldikSemester(semester:number,sabtuLibur:boolean = true):dataSparatedKaldikKeterangan{
        const arrayMonthInSemester = this.getarrayMonthInSemester(semester);
        const dataKeteranganPerSemester = this.keteranganInSemester(semester);
        const dataBulanSemester:dataKaldikSemester[]=[];
        const dataPropertiHari:propertiHariDalamBulan[]=[]
        arrayMonthInSemester.forEach((d,i)=>{
            const {groupWeek:group,propertiesHariEfektif, propertiesHariEfektifBelajar} = this.groupByWeekInMonth(d, sabtuLibur);
            const keterangan= this.KeteranganInMonth(d);
            const data:dataKaldikSemester={
                namaBulan:d.toLocaleString('id-ID', {month:'long'}),
                semester: semester,
                tahun: d.getFullYear(),
                data:group,
                dataKeterangan:keterangan
            }
            dataBulanSemester.push(data);
            const propertyHari:propertiHariDalamBulan={
                namaBulan:d.toLocaleString('id-ID', {month:'long',year:'numeric'}),
                propertiesHariEfektif:propertiesHariEfektif,
                propertiesHariEfektifBelajar:propertiesHariEfektifBelajar
            }
            dataPropertiHari.push(propertyHari);
            
        })
        const totalHariSemester:detailPropertiHari={
            minggu:dataPropertiHari.map(h=>h.propertiesHariEfektif.minggu).reduce((a,b)=>a+b),
            senin:dataPropertiHari.map(h=>h.propertiesHariEfektif.senin).reduce((a,b)=>a+b),
            selasa:dataPropertiHari.map(h=>h.propertiesHariEfektif.selasa).reduce((a,b)=>a+b),
            rabu:dataPropertiHari.map(h=>h.propertiesHariEfektif.rabu).reduce((a,b)=>a+b),
            kamis:dataPropertiHari.map(h=>h.propertiesHariEfektif.kamis).reduce((a,b)=>a+b),
            jumat:dataPropertiHari.map(h=>h.propertiesHariEfektif.jumat).reduce((a,b)=>a+b),
            sabtu:dataPropertiHari.map(h=>h.propertiesHariEfektif.sabtu).reduce((a,b)=>a+b),
            total:dataPropertiHari.map(h=>h.propertiesHariEfektif.total).reduce((a,b)=>a+b),
        }
        const totalHariSemesterBelajar:detailPropertiHari={
            minggu:dataPropertiHari.map(h=>h.propertiesHariEfektifBelajar.minggu).reduce((a,b)=>a+b),
            senin:dataPropertiHari.map(h=>h.propertiesHariEfektifBelajar.senin).reduce((a,b)=>a+b),
            selasa:dataPropertiHari.map(h=>h.propertiesHariEfektifBelajar.selasa).reduce((a,b)=>a+b),
            rabu:dataPropertiHari.map(h=>h.propertiesHariEfektifBelajar.rabu).reduce((a,b)=>a+b),
            kamis:dataPropertiHari.map(h=>h.propertiesHariEfektifBelajar.kamis).reduce((a,b)=>a+b),
            jumat:dataPropertiHari.map(h=>h.propertiesHariEfektifBelajar.jumat).reduce((a,b)=>a+b),
            sabtu:dataPropertiHari.map(h=>h.propertiesHariEfektifBelajar.sabtu).reduce((a,b)=>a+b),
            total:dataPropertiHari.map(h=>h.propertiesHariEfektifBelajar.total).reduce((a,b)=>a+b),
        }
        return {
            includeKeterangan: dataBulanSemester,
            dataKeterangan: dataKeteranganPerSemester,
            dataPropertiHari:dataPropertiHari,
            totalPropertiHari:totalHariSemester,
            totalPropertiHariBelajar:totalHariSemesterBelajar

        }

    }
    getKaldikOneTapel(sabtuLibur:boolean = true):dataSparatedKaldikKeterangan{
        const arrayMonthInSemester = this.getarrayMonthInOneTapel()
        const dataKeteranganPerSemester = this.keteranganInOneTapel();
        const dataBulanSemester:dataKaldikSemester[]=[];
        const dataPropertiHari:propertiHariDalamBulan[]=[]
        arrayMonthInSemester.forEach((d,i)=>{
            const {groupWeek:group,propertiesHariEfektif, propertiesHariEfektifBelajar} = this.groupByWeekInMonth(d, sabtuLibur);
            const keterangan= this.KeteranganInMonth(d);
            const data:dataKaldikSemester={
                namaBulan:d.toLocaleString('id-ID', {month:'long'}),
                semester: d.getMonth() >5?1:2, //semester,
                tahun: d.getFullYear(),
                data:group,
                dataKeterangan:keterangan
            }
            dataBulanSemester.push(data);
            const propertyHari:propertiHariDalamBulan={
                namaBulan:d.toLocaleString('id-ID', {month:'long',year:'numeric'}),
                propertiesHariEfektif:propertiesHariEfektif,
                propertiesHariEfektifBelajar:propertiesHariEfektifBelajar
            }
            dataPropertiHari.push(propertyHari);
            
        })
        const totalHariSemester:detailPropertiHari={
            minggu:dataPropertiHari.map(h=>h.propertiesHariEfektif.minggu).reduce((a,b)=>a+b),
            senin:dataPropertiHari.map(h=>h.propertiesHariEfektif.senin).reduce((a,b)=>a+b),
            selasa:dataPropertiHari.map(h=>h.propertiesHariEfektif.selasa).reduce((a,b)=>a+b),
            rabu:dataPropertiHari.map(h=>h.propertiesHariEfektif.rabu).reduce((a,b)=>a+b),
            kamis:dataPropertiHari.map(h=>h.propertiesHariEfektif.kamis).reduce((a,b)=>a+b),
            jumat:dataPropertiHari.map(h=>h.propertiesHariEfektif.jumat).reduce((a,b)=>a+b),
            sabtu:dataPropertiHari.map(h=>h.propertiesHariEfektif.sabtu).reduce((a,b)=>a+b),
            total:dataPropertiHari.map(h=>h.propertiesHariEfektif.total).reduce((a,b)=>a+b),
        }
        const totalHariSemesterBelajar:detailPropertiHari={
            minggu:dataPropertiHari.map(h=>h.propertiesHariEfektifBelajar.minggu).reduce((a,b)=>a+b),
            senin:dataPropertiHari.map(h=>h.propertiesHariEfektifBelajar.senin).reduce((a,b)=>a+b),
            selasa:dataPropertiHari.map(h=>h.propertiesHariEfektifBelajar.selasa).reduce((a,b)=>a+b),
            rabu:dataPropertiHari.map(h=>h.propertiesHariEfektifBelajar.rabu).reduce((a,b)=>a+b),
            kamis:dataPropertiHari.map(h=>h.propertiesHariEfektifBelajar.kamis).reduce((a,b)=>a+b),
            jumat:dataPropertiHari.map(h=>h.propertiesHariEfektifBelajar.jumat).reduce((a,b)=>a+b),
            sabtu:dataPropertiHari.map(h=>h.propertiesHariEfektifBelajar.sabtu).reduce((a,b)=>a+b),
            total:dataPropertiHari.map(h=>h.propertiesHariEfektifBelajar.total).reduce((a,b)=>a+b),
        }
        return {
            includeKeterangan: dataBulanSemester,
            dataKeterangan: dataKeteranganPerSemester,
            dataPropertiHari:dataPropertiHari,
            totalPropertiHari:totalHariSemester,
            totalPropertiHariBelajar:totalHariSemesterBelajar

        }

    }
    keteranganInSemester(semester:number):keteranganLabelKaldik[]{
        const arrayFindKaldik = this.getDataKaldikInSemester(semester);
        const result:keteranganLabelKaldik[]=[];
        arrayFindKaldik.forEach(({idbaris, keterangan,start_tgl, end_tgl,backgroundColor, color})=>{
            const label = this.getLabelTanggalBetweenDate(start_tgl, end_tgl);
            const member = this.getMemberTanggal(start_tgl, end_tgl);
            const data:keteranganLabelKaldik = {
                    idbaris:idbaris,
                    keterangan:keterangan,
                    labelTanggal:label,
                    memberTanggal:member,
                    warnaLatar:backgroundColor,
                    warnaHuruf:color,
                    start_tgl:start_tgl, 
                    end_tgl: end_tgl

                };
            result.push(data);
        })
        return result;
    }
    keteranganInOneTapel():keteranganLabelKaldik[]{
        const arrayFindKaldik = this.getDataKaldikInOneTapel()
        const result:keteranganLabelKaldik[]=[];
        arrayFindKaldik.forEach(({idbaris,keterangan,start_tgl, end_tgl,backgroundColor, color})=>{
            const label = this.getLabelTanggalBetweenDate(start_tgl, end_tgl);
            const member = this.getMemberTanggal(start_tgl, end_tgl);
            const data:keteranganLabelKaldik = {
                    idbaris:idbaris,
                    keterangan:keterangan,
                    labelTanggal:label,
                    memberTanggal:member,
                    warnaLatar:backgroundColor,
                    warnaHuruf:color,
                    start_tgl: start_tgl, 
                    end_tgl: end_tgl
                };
            result.push(data);
        })
        return result;
    }
    KeteranganInMonth(date:Date):keteranganLabelKaldik[]{
        const arrayFindKaldik = this.getCollectionDataKaldikByMonth(date);//this.getCollectionDataKaldikByDate(date);
        const result:keteranganLabelKaldik[]=[];
        arrayFindKaldik.forEach(({idbaris,keterangan,start_tgl, end_tgl,backgroundColor, color})=>{
            const label = this.getLabelTanggalBetweenDate(start_tgl, end_tgl);
            const member = this.getMemberTanggal(start_tgl, end_tgl);
            const data:keteranganLabelKaldik = {
                    idbaris:idbaris,
                    keterangan:keterangan,
                    labelTanggal:label,
                    memberTanggal:member,
                    warnaLatar:backgroundColor,
                    warnaHuruf:color,
                    start_tgl: start_tgl, 
                    end_tgl:end_tgl
                };
            result.push(data);
        })
        return result;
    }

}