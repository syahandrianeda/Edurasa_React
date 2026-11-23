import { useMemo } from "react";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { useAppSelector } from "~/context-reduct/hook";
import DefinitionSumber from "~/controllers/rekap-tagihan-harian/sheet/DefintionSource";
import { namaSumber } from "~/controllers/rekap-tagihan-harian/sheet/namaSumber";
import type { FokusStrukturKurikulumPresentation } from "~/controllers/rekap-tagihan-harian/toolbar/RadioChooseFokusStrukturKurikulum";
import type { FormatKategoriAssesmenPreview } from "~/controllers/rekap-tagihan-harian/toolbar/RadioChooseFormatKategirAssesmen";
import KategoriAssesmenClass from "~/domain/kategori-tagihan/services/KategoriAssesmenClass";
import type { KategoriTagihanHasManyPesertaMapelType } from "~/domain/kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/KategoriTagihanHasManyPesertaMapelType";
import type { DataSiswaHasMapelType } from "~/domain/penilaian/infrastucture/dataSiswaHasMapel";
import type { MapelWithNilaiRaportRombel, RaportRombelAsal } from "~/domain/raport/RekapRaportAsal";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { currentTapel, currentTapelProperties } from "~/lib/current-tapel";
import type { jp_mapelApp } from "~/types/mapel/jp_mapel";
import SumberDataRekapTagihan from "./sumber-data/sumber-data-rekap-tagihan";
import DetailComp from "~/components/details-comp/detail-comp";
import TableTagihanKompetensi from "~/controllers/assesmen-penilaian/tabel/tabel-tagihan-kompetensi-to-kategori";
import TagihanHasDataResponseMapperBuilder from "~/domain/TagihanHasDataResponMapper/TagihanHasDataResponMapperBuilder";
import type { KategoriTagihanType } from "~/domain/kategori-tagihan/types/entities/KategoriTagihanType";
import StrukturKurikulumBuilder from "~/domain/penilaian/builder/StrukturKurikulumBuilder";
import RekapRaportSementara from "~/controllers/raport/tabels/RekapRaportSementara";
import type { KeyKompetensi } from "./DataRaportView";
import type { KoleksiStrukturWithSourceSkor } from "~/domain/raport/infrastructures/builder/KoleksiStrukturWithSourceSkor";
import type { StrukturAtpType, StrukturCpType, StrukturTpType } from "~/domain/trees-struktur-kurikulum";

type Props = {
    raportAsal?:MapelWithNilaiRaportRombel[]
    memberMapel?: DataSiswaHasMapelType[],
    mapelRaport?:jp_mapelApp[],
    kategoriAssesmenPattern: KategoriTagihanType[]
}
export default function RekapPerJenisTagihanPage( {raportAsal, memberMapel, mapelRaport, kategoriAssesmenPattern}:Props ){
    const {value} = useFilterContext<FokusStrukturKurikulumPresentation & FormatKategoriAssesmenPreview >();
    const dataTapel = currentTapel({variant:'full'});
    const dataSemester = currentTapelProperties({variant:'getSemesterWithGanjilGenap'});
    const rombel = getSessionRombel();
    const fokusMapel = useAppSelector(state=>state.fokusMapel.data);
    
    
    const dataRaport= useMemo(()=>{
        const struktur = value?.extra?.FokusStrukturKurikulum;
        const sumber = value?.extra?.formatKategoriAssesmen;
        if(!raportAsal || !sumber || !struktur) return ;
        const foundRaportCurrentMapel = raportAsal.find(s=>s.mapel.kode === fokusMapel.kode);
        if(!foundRaportCurrentMapel) return;
        const {mapel, raportSiswa, sourceTagihan, collectionAtp, collectionCp, collectionTp}  = foundRaportCurrentMapel;
        // const raportSiswa = foundRaportCurrentMapel?.raportSiswa ?? [];
        const keySelected: keyof RaportRombelAsal = sumber === 'responSiswa'? 'dataNilaiRaportResponSiswa': 'dataNilaiRaportSheetKd';
        const keyStruktur = struktur.keyLabel;
        const keyKompetensi:KeyKompetensi[]= [];
        
        switch(keyStruktur){
            case 'Atp':{
                collectionAtp.forEach(itemAtp=>{
                    keyKompetensi.push({
                        keyIndexRefrence:'atp_id',
                        idKompetensi: itemAtp.atp_id,
                        kodeMapel:fokusMapel.kode,
                        kompetensiSelected: 'atp'
                    })
                })
                break;
            }
            case 'Tp':{
                collectionTp.forEach(itemAtp=>{
                    keyKompetensi.push({
                        keyIndexRefrence:'tp_id',
                        idKompetensi: itemAtp.tp_id,
                        kodeMapel:fokusMapel.kode,
                        kompetensiSelected: 'tp'
                    })
                })
                break;
            }
            case 'Cp':{
                collectionCp.forEach(itemAtp=>{
                    keyKompetensi.push({
                        keyIndexRefrence:'cp_id',
                        idKompetensi: itemAtp.cp_id,
                        kodeMapel:fokusMapel.kode,
                        kompetensiSelected:'cp'
                    })
                })
                break;
            }
        }
        
        const listRaportSiswa = raportSiswa.map((m) => {
            const dataSumber = m[keySelected] ;//as NilaiRaportInterface;
            const siswa = m.dataSiswa
            const {sourceKoleksiStrukturAtp, sourceKoleksiStrukturCp, sourceKoleksiStrukturTp, 
                    skorKd_atp, skorKd_cp, skorKd_tp,
                nilaiRaport, nilaiRaportAtp, nilaiRaportTp, nilaiRaportCp
            } = dataSumber;
            const obListRaportSiswaUi= Object.create(null);
            obListRaportSiswaUi.siswa = siswa;
            obListRaportSiswaUi.data = dataSumber
            obListRaportSiswaUi.keyKompetensi = keyKompetensi,
            obListRaportSiswaUi
            // obListRaportSiswaUi
            

            
            switch(keyStruktur){
                case 'Atp':{
                    obListRaportSiswaUi.nilaiRaport = nilaiRaportAtp;
                    obListRaportSiswaUi.sumberMaxMin=((sourceKoleksiStrukturAtp ?? [])as KoleksiStrukturWithSourceSkor[]).map(m=>{
                        return {
                            ...m,
                            
                            idType:(m.struktur as StrukturAtpType).atp_id,
                            description:(m.struktur as StrukturAtpType).atp_description,
                        }
                    })
                    break;
                }
                case 'Tp':{
                    obListRaportSiswaUi.nilaiRaport = nilaiRaportTp;
                    obListRaportSiswaUi.sumberMaxMin=(sourceKoleksiStrukturTp ?? []).map(m=>{
                        return {
                            ...m,
                            idType:(m.struktur as StrukturTpType).tp_id,
                            description:(m.struktur as StrukturTpType).tp_description,
                        }
                    })
                    break;
                }
                case 'Cp':{
                    obListRaportSiswaUi.nilaiRaport = nilaiRaportCp;
                    obListRaportSiswaUi.sumberMaxMin=(sourceKoleksiStrukturCp ?? []).map(m=>{
                        return {
                            ...m,
                            idType:(m.struktur as StrukturCpType).cp_id,
                            description:(m.struktur as StrukturCpType).cp_description,


                            
                        }
                    })
                    break;
                }
            }
            


            return obListRaportSiswaUi
            // return {
            //     siswa,
            //     data,
            //     skor,
            //     nilaiRaport,
            //     sumberMaxMin,
            //     keyKompetensi

            //     // sumberMaxMin:sumber
            // };
        });

       
        
        return {
            raportSiswa,
            keySelected,
            listRaportSiswa,
            keyKompetensi,
            keyStruktur,
            source:sumber,
            // sourceRekap:foundRaportCurrentMapel,
            sourceTagihan
            // sourceKeyKompetensiMaxMinRefrence:keyMaxMin
            
        }
    },[raportAsal, value?.extra?.FokusStrukturKurikulum, value?.extra?.formatKategoriAssesmen, fokusMapel]);
    
    const kategoriTagihan:KategoriTagihanHasManyPesertaMapelType[] | undefined = useMemo(()=>{
        //  const sumber = value?.extra?.formatKategoriAssesmen;
        // if(!raportAsal || !sumber) return ;
        if(!raportAsal ) return ;
        const koleksiTagihan = raportAsal.find(s=>s.mapel.kode === fokusMapel.kode)?.sourceTagihan ?? [];
        const inst = new KategoriAssesmenClass(koleksiTagihan,memberMapel?? [],mapelRaport??[]).init();

        return inst.result.filter(s=>s.data.some(d=>d.mapel === fokusMapel.kode));
    },[value?.extra, raportAsal, memberMapel, mapelRaport, fokusMapel]);
    
    const StrukturKompentensi = useMemo(()=>{
        if(!raportAsal ) return ;
        const koleksiTagihan = raportAsal.find(s=>s.mapel.kode === fokusMapel.kode)?.sourceTagihan ?? [];
        const inst = new TagihanHasDataResponseMapperBuilder(koleksiTagihan, mapelRaport ?? [], kategoriAssesmenPattern).build();
        return StrukturKurikulumBuilder.strukturKurikulumWithPublishedTagihan(
            inst.strukturKurikulumWithSlot,
            kategoriAssesmenPattern,
            inst.kategoriAssesmenWithDetailPublikasiWithResponSiswaType
        ).filter(s=>s.kodeMapel === fokusMapel.kode);
    },[fokusMapel, raportAsal]);

    console.log({raportAsal, dataRaport})
    
    return (
        <div className="p-1">
            <h3 className="text-2xl font-extrabold text-center">Nilai Raport Sementara</h3>
            <h4 className="text-xl text-center font-bold">Mata Pelajaran {fokusMapel.nama}</h4>
            <h4 className="text-center">{dataTapel} Semester {dataSemester}</h4>
            <h4 className="text-xl font-extrabold text-center mb-7">Kelas {rombel}</h4>
            <div className="flex flex-col-reverse">
                <RekapRaportSementara dataRaport={dataRaport}/>
                <div className="print:hidden print:shadow-none shadow-md outline-1 shadow-sky-400 mb-3 rounded-2xl p-2 text-xs">
                    <p className="text-[8px] text-center mb-1 text-rose-500">Area ini tidak akan tercetak</p>
                    <div>
                        <p>
                            Anda memutuskan memilih sumber data nilai raport dari <strong>{namaSumber( value?.extra?.formatKategoriAssesmen ?? 'decision')}</strong>. <DefinitionSumber source={value?.extra?.formatKategoriAssesmen ?? 'decision'}/>. Klik 
                            untuk melihat detail bagaimana aplikasi memperoleh nilai asal yang Anda pilih.
                        </p>
                        <p className="mb-2">
                            Anda pun memutuskan untuk memilih <strong>{value?.extra?.FokusStrukturKurikulum?.keyLabel}</strong> sebagai sumber dasar kompetensi nilai Raport di kelas Anda.
                        </p>
                        <DetailComp titleSummary="Daftar Instrumen Tagihan">
                                {
                                    kategoriTagihan && kategoriTagihan.map((itemKategori, iKategori)=><SumberDataRekapTagihan key={itemKategori.type+'_'+iKategori} fokusMapel={fokusMapel} kategoriTagihan={itemKategori}/>)
                                }
                        </DetailComp>
                        <DetailComp titleSummary="Daftar Kompetensi yang Diukur/Dinilai">
                                <TableTagihanKompetensi data={StrukturKompentensi} showIdentitas={true}/>
                        </DetailComp>
                    </div>
                </div>
            </div>
        </div>
    )
}