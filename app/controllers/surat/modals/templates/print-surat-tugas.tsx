import { SampleDefaultKontenKop } from "~/components/toolbars/kop-ttd/default-kop";
import { KomponenKop } from "~/components/toolbars/kop-ttd/kop-ttd";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import { Fragment } from "react";
import ListPtkSuratPerintah from "./sppd-comp/list-ptk-surat-perintah";
import DasarHukumSuratPerintahSpd from "./sppd-comp/dasar-hukum-surat-perintah-sppd";
import PenandaTanganSppd from "./sppd-comp/penandatanganan-sppd";
import { useAppSelector } from "~/context-reduct/hook";
import { KABUPATEN_KOTA } from "~/domain/identitas_aplikasi/identitas-aplikasi";
import PenandaTanganAtasan from "./sppd-comp/penandatanganan-atasan";

export default function PrintSuratTugasSppd({data}:{data:DataOrmSuratKeluarType}){
    const dataKop = SampleDefaultKontenKop.find(s=>s.type === 'kop2');
    const sampling = data.dataTemplate?.personalSppdType?.filter(s=>s.ptk_jabatan !== 'Kepala Sekolah') ?? [];
    const foundKepsek = data.dataTemplate?.personalSppdType?.filter(s=>s.ptk_jabatan === 'Kepala Sekolah') ?? [];
    return (
        <>

        <div className="border print:border-0 h-[310mm] p-2">
            <KomponenKop {...dataKop!} />
            <h3 className="text-2xl text-centert underline font-extrabold text-center uppercase">Surat Tugas</h3>
            <p className="text-center mb-5">No. {data.nosurat}</p>
            <DasarHukumSuratPerintahSpd data={data}/>
            <h4 className="text-xl font-bold uppercase text-center mt-5">memerintahkan</h4>
            <ListPtkSuratPerintah data={foundKepsek}/>
            <p className="my-4 indent-2">Untuk melakasanakan : {data.perihal}</p>
            <div className="flex justify-between items-end text-center me-2 mt-5 flex-col">
                <p className="text-center w-1/2">{KABUPATEN_KOTA}, {data.tglsurat.toLocaleDateString('id-ID', {dateStyle:'long'})}</p>
                <PenandaTanganAtasan atasan={sampling[0]!}/>
            </div>
        </div>
        <div className="border print:border-0 h-[310mm] p-2">
            <KomponenKop {...dataKop!} />
            <h3 className="text-2xl text-centert underline font-extrabold text-center uppercase">Surat Tugas</h3>
            <p className="text-center mb-5">No. {data.nosurat}</p>
            <DasarHukumSuratPerintahSpd data={data}/>
            <h4 className="text-xl font-bold uppercase text-center mt-5">memerintahkan</h4>
            <ListPtkSuratPerintah data={sampling}/>
            <p className="my-4 indent-2">Untuk melakasanakan : {data.perihal}</p>
            <div className="flex justify-between items-end text-center me-2 mt-5 flex-col">
                <p className="w-1/2">{KABUPATEN_KOTA}, {data.tglsurat.toLocaleDateString('id-ID', {dateStyle:'long'})}</p>
                <PenandaTanganSppd atasan={sampling[0]}/>
            </div>
        </div>
        </>
    )
}