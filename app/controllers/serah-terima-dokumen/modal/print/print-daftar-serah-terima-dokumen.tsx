import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { SampleDefaultKontenKop } from "~/components/toolbars/kop-ttd/default-kop";
import { KomponenKop } from "~/components/toolbars/kop-ttd/kop-ttd";
import { GetValueJenisSerahTerima, JenisSerahTerimaEnum } from "~/types/galleries/jenis-serah-terima-enum";
import type { SerahTerimaDokumenAppType } from "~/types/galleries/serah-terima-dokumen-app-type";
import { OptionsPropertiesData } from "../../fields/option-properties-siswa";
import { OptionsPropertiesDataPtk } from "../../fields/option-properties-ptk";
import { Fragment } from "react";
import { PersonalTypeEnum} from "~/types/galleries/personal-type-enum";

export default function PrintSerahTerimaDokumenModal({data}:{data:SerahTerimaDokumenAppType}){
    const dataKop = SampleDefaultKontenKop.find(s=>s.type === 'kop2');
    const jenis = data.jenis ;//?? JenisSerahTerimaEnum.SERAH;
    const namaDaftar = GetValueJenisSerahTerima(jenis as keyof typeof JenisSerahTerimaEnum) ?? "";
    const type_target = data.type_target as keyof typeof PersonalTypeEnum
    const keySiswaTypeTaret = 'SISWA' as keyof typeof PersonalTypeEnum
    const countItemBarang = data.item_barang.length;
    const sourcePersonal = type_target === keySiswaTypeTaret  ? OptionsPropertiesData:OptionsPropertiesDataPtk;
    const keyTargetPersonal = Object.keys(data.additional_info[0]).map(m=>sourcePersonal.find(f=>f.key === m)?.label)
    const splitingJenis = data.jenis?.toString().split('_');

    return (
        <div className="border print:border-0 min-h-[310mm] break-after-auto px-2 pt-7 pb-2">
            <KomponenKop {...dataKop!} />
            <h3 className="text-2xl text-centert font-extrabold text-center uppercase">Daftar {namaDaftar}</h3>
            <h4 className="text-xl text-centert mb-7 font-extrabold text-center uppercase">{data.nama_kegiatan}</h4>
            <TableWithScrolling inModal={true}>
                <thead>
                    <TRowEdura>
                        <ThEdura rowSpan={3}>No</ThEdura>
                        {
                            keyTargetPersonal.map((m, i)=>
                                <ThEdura rowSpan={3} className="text-wrap" key={i}>{m}</ThEdura>
                            )
                        }
                        {
                            splitingJenis && splitingJenis.map((daftar, i)=>
                                <ThEdura key={i} colSpan={countItemBarang+2}>{GetValueJenisSerahTerima(daftar as keyof typeof JenisSerahTerimaEnum)}</ThEdura>
                            )
                        }
                    </TRowEdura>
                    <TRowEdura>
                        {
                            splitingJenis && splitingJenis.map((daftar, ii)=>
                                <Fragment key={ii}>
                                    <ThEdura rowSpan={2}  className="text-wrap">Tanggal {GetValueJenisSerahTerima(daftar as keyof typeof JenisSerahTerimaEnum)}</ThEdura>
                                    <ThEdura colSpan={countItemBarang}>Dokumen/Barang {GetValueJenisSerahTerima(daftar as keyof typeof JenisSerahTerimaEnum)}</ThEdura>
                                    <ThEdura rowSpan={2} className="text-wrap">Tanda Tangan</ThEdura>
                                </Fragment>
                            )
                        }
                    </TRowEdura>
                    <TRowEdura>
                        {
                            splitingJenis && splitingJenis.map((daftar, ii)=>
                                <Fragment key={ii}>
                                    {
                                        data.item_barang.map((m, i)=>
                                                <ThEdura key={i} className="text-wrap align-top">{m}</ThEdura>
                                        )
                                    }
                                </Fragment>
                            )
                        }
                    </TRowEdura>
                    
                </thead>
                <tbody>
                    {
                        data.additional_info.map((item,i)=>
                            <TRowEdura key={item.id}>
                                <TdEdura>{i+1}</TdEdura>
                                {
                                    Object.entries(item).map(([k, v])=>
                                        <TdEdura key={k}>{v}</TdEdura>
                                    )
                                }
                                {
                                    splitingJenis && splitingJenis.map((daftar, ii)=>
                                        <Fragment key={ii}>
                                            <TdEdura></TdEdura>
                                            {
                                                data.item_barang.map((m, i)=>
                                                        <TdEdura key={i} className="text-center">▢</TdEdura>
                                                )
                                            }
                                            <TdEdura className="min-w-36"><div className={`${(i+1)%2?'ms-0':'ms-auto'} w-1/2 text-muted-foreground border-b border-dotted border-black`}>{i+1}</div></TdEdura>
                                        </Fragment>
                                    )
                                }
                            </TRowEdura>
                        )
                    }
                </tbody>
            </TableWithScrolling>
        </div>
    )
}