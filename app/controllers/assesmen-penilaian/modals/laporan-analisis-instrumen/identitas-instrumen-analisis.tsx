import type { TagihanHasDataResponse } from "~/domain/penilaian/type/tagihan-assesmen-type";
import KontentIdentitas from "./konten-identitas";
import SebaranTagihanKurikulum from "../../sebaran-kurikulum-tagihan-for-table";
import SebaranTagihanKurikulumMain from "../../sebaran-kurikulum-tagihan";

export default function IdentitasInstrumenAnalisis({publikasi}:{publikasi:TagihanHasDataResponse}){
    return (
        <div className="columns-2 gap-6 text-[10px]">
                <ol className="list-decimal list-outside ps-5 marker:font-normal">
                    <li>
                        <KontentIdentitas 
                            keterangan="Identitas Instrumen Assesmen"
                            konten={publikasi.nama_publikasi}/>
                    </li>
                    <li>
                        <KontentIdentitas 
                            keterangan="Jenis Penilaian"
                            konten={publikasi.jenis_tagihan.name}/>
                    </li>
                    <li>
                        <KontentIdentitas 
                            keterangan="Pelaksanaan Tes"
                            konten={publikasi.start_time.toLocaleString('id-ID', {dateStyle:'long', timeStyle:'long'})}/>
                    </li>
                    <li>
                        <KontentIdentitas 
                            keterangan="Kelas"
                            konten={publikasi.target_rombel.join(', ')}/>
                    </li>
                    <li>
                        <KontentIdentitas 
                            keterangan="Jumlah Peserta Seharusnya"
                            konten={<span>{publikasi.peserta.length} siswa</span>}/>
                    </li>
                    <li>
                        <KontentIdentitas 
                            keterangan="Jumlah Peserta Yang mengikuti"
                            konten={<span>{publikasi.jumlahPerespon} siswa</span>}/>
                    </li>
                    <li>
                        <KontentIdentitas 
                            keterangan="Jawaban tervalidasi (telah dikoreksi)"
                            konten={<span>{publikasi.data_respons.filter(s=>s.sumber_respon === 'guru').length} siswa</span>}/>
                    </li>
                    <li>
                        <KontentIdentitas 
                            keterangan="Jawaban Duplikat (Ganda)"
                            konten={<span>{publikasi.jumlahDuplikat} respon</span>}/>
                    </li>
                    <li>
                        <KontentIdentitas 
                            keterangan="Muatan Pelajaran"
                            konten={
                                <ul>
                                    {
                                        publikasi.koleksi_mapelName.map((mp, iMp)=>
                                            <li key={mp+'_'+iMp}>{mp}</li>
                                        )
                                    }
                                </ul>
                            }/>
                    </li>
                    <li>
                        <KontentIdentitas 
                            keterangan="Kompetensi"
                            konten={
                                <div className="w-1/3">
                                     <div className="flex w-full flex-col">
                                        <SebaranTagihanKurikulumMain kurikulum={publikasi.kurikulum_tagihan} isMultiple={publikasi.isMultiple}/>
                                    </div>
                                </div>
                                
                            }/>
                    </li>
                    <li>
                        <KontentIdentitas keterangan="Metode Reliabilitas"
                        konten={
                            <span>KR-20 (Kuder-Richardson 20) / Cronbach's Alpha</span>
                        }/>
                    </li>
                </ol>
          
        </div>
    )
}