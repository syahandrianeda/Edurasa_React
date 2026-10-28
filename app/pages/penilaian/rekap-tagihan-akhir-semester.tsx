import type { KategoriTagihanHasManyPesertaMapelType } from "~/domain/kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/KategoriTagihanHasManyPesertaMapelType";
import TableRekapKategoriAssesmen from '~/controllers/rekap-tagihan-harian/tabels/TableRekapKategoriAssesmen';
import { currentTapel, currentTapelProperties } from '~/lib/current-tapel';
import { useAppSelector } from '~/context-reduct/hook';
import { getSessionRombel } from '~/infrastructures/session-storage/rombel-session';
import SumberDataRekapTagihan from './sumber-data/sumber-data-rekap-tagihan';

export default function RekapTagihanAkhirSemesterPage({kategoriTagihan}:{kategoriTagihan?: KategoriTagihanHasManyPesertaMapelType}){
    const dataTapel = currentTapel({variant:'full'});
    const dataSemester = currentTapelProperties({variant:'getSemesterWithGanjilGenap'});
    const rombel = getSessionRombel();
    const fokusMapel = useAppSelector(state=>state.fokusMapel.data);
    
    return (
        <div className="p-1">
            <h3 className="text-2xl font-extrabold text-center">Rekapitulasi Nilai Sumatif Akhir Semester</h3>
            <h4 className="text-xl text-center font-bold">Mata Pelajaran {fokusMapel.nama}</h4>
            <h4 className="text-center">{dataTapel} Semester {dataSemester}</h4>
            <h4 className="text-xl font-extrabold text-center mb-7">Kelas {rombel}</h4>
            {
                kategoriTagihan && <SumberDataRekapTagihan fokusMapel={fokusMapel} kategoriTagihan={kategoriTagihan}/>
            }
            <TableRekapKategoriAssesmen fokusMapel={fokusMapel} kategoriTagihan={kategoriTagihan} />
        </div>
    )
}