import { useMemo } from "react";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { useAppSelector } from "~/context-reduct/hook";
import type { FokusStrukturKurikulumPresentation } from "~/controllers/rekap-tagihan-harian/toolbar/RadioChooseFokusStrukturKurikulum";
import type { FormatKategoriAssesmenPreview } from "~/controllers/rekap-tagihan-harian/toolbar/RadioChooseFormatKategirAssesmen";
import type { KategoriTagihanHasManyPesertaMapelType } from "~/domain/kategori-tagihan/types/kategori-tagihan-hasMany-respon-siswa/KategoriTagihanHasManyPesertaMapelType";
import type { MapelWithNilaiRaportRombel, RaportRombelAsal } from "~/domain/raport/RekapRaportAsal";
import { getSessionRombel } from "~/infrastructures/session-storage/rombel-session";
import { currentTapel, currentTapelProperties } from "~/lib/current-tapel";

export default function RekapPerJenisTagihanPage( {raportAsal}:{raportAsal?:MapelWithNilaiRaportRombel[]} ){
    const {value} = useFilterContext<FokusStrukturKurikulumPresentation & FormatKategoriAssesmenPreview >();
    const dataTapel = currentTapel({variant:'full'});
    const dataSemester = currentTapelProperties({variant:'getSemesterWithGanjilGenap'});
    const rombel = getSessionRombel();
    const fokusMapel = useAppSelector(state=>state.fokusMapel.data);
    const dataRaport = useMemo(()=>{
        const sumber = value?.extra?.formatKategoriAssesmen;
        if(!raportAsal || !sumber) return ;
        const raportSiswa = raportAsal.find(s=>s.mapel.kode === fokusMapel.kode)?.raportSiswa ?? [];
        const keySelected: keyof RaportRombelAsal = sumber === 'responSiswa'? 'dataNilaiRaportResponSiswa': 'dataNilaiRaportSheetKd';

    },[raportAsal, value?.extra])
    console.log({raportAsal})
    return (
        <div className="p-1">
            <h3 className="text-2xl font-extrabold text-center">Nilai Raport Sementara</h3>
            <h4 className="text-xl text-center font-bold">Mata Pelajaran {fokusMapel.nama}</h4>
            <h4 className="text-center">{dataTapel} Semester {dataSemester}</h4>
            <h4 className="text-xl font-extrabold text-center mb-7">Kelas {rombel}</h4>
            <div className="flex flex-col-reverse">
                <div>Kolom kedua</div>
                <div>Kolom Pertama</div>
            </div>

        </div>
    )
}