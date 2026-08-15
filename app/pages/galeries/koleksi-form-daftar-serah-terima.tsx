import {Fragment} from 'react';
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { TdEdura, TdEduraFreeze, ThEdura, THEduraFreeze, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { GetValueJenisSerahTerima, JenisSerahTerimaEnum } from "~/types/galleries/jenis-serah-terima-enum";
import type { SerahTerimaDokumenAppType } from "~/types/galleries/serah-terima-dokumen-app-type";
import { OptionsPropertiesData } from "~/controllers/serah-terima-dokumen/fields/option-properties-siswa";
import { OptionsPropertiesDataPtk, OptionsPropertiesDataPtkUI } from "~/controllers/serah-terima-dokumen/fields/option-properties-ptk";
import type { PersonalTypeEnum } from "~/types/galleries/personal-type-enum";
import SwitchTriggerModalTransaksiSerahTerimaDokumen from '~/controllers/serah-terima-dokumen/modal/triggers/trigger-transaksi-serah-terima';
import { useModal } from '~/components/modals/modal-provider';

export default function KoleksiFormDaftarSerahTerimaDokumen(){
    const {actions:modal} = useModal()
    const {value, updateExtra} = useFilterContext<{
            daftarSerahTerimaDokumen?:SerahTerimaDokumenAppType,
            kolom_evidence?:string
            fillTgl?:boolean
        }>()
    const data = value?.extra?.daftarSerahTerimaDokumen;
    const kolom_evidence = value?.extra?.kolom_evidence;
    const isFillTgl = value?.extra?.fillTgl;
    const type_target = data?.type_target as keyof typeof PersonalTypeEnum
    const keySiswaTypeTaret = 'SISWA' as keyof typeof PersonalTypeEnum
    const countItemBarang = data?.item_barang.length ?? 0;
    const sourcePersonal = type_target === keySiswaTypeTaret  ? OptionsPropertiesData:OptionsPropertiesDataPtk;
    const keyTargetPersonal = data?.additional_info && Object.keys(data?.additional_info[0]).map(m=>sourcePersonal.find(f=>f.key === m)?.label)
    const splitingJenis = data?.jenis?.toString().split('_');
    
    
    return (
        <div className="p-1">
            <h3 className="text-center text-2xl uppercase font-extrabold">{data && ('Daftar '+ JenisSerahTerimaEnum[data.jenis as keyof typeof JenisSerahTerimaEnum])}</h3>
            <h4 className="text-center text-xl uppercase mb-7 font-extrabold">{data && data.nama_kegiatan}</h4>
            {
                data
                ? (
            <TableWithScrolling>
                            <thead>
                                <TRowEdura>
                                    <THEduraFreeze stateFreeze={true} rowSpan={3} className='print:hidden'>Aksi</THEduraFreeze>
                                    <ThEdura rowSpan={3}>No</ThEdura>
                                    {
                                        keyTargetPersonal && keyTargetPersonal.map((m, i)=>
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
                                                <ThEdura rowSpan={2} className="text-wrap">{kolom_evidence==='ttd'?'Tanda Tangan':'Poto'}</ThEdura>
                                            </Fragment>
                                        )
                                    }
                                </TRowEdura>
                                <TRowEdura>
                                    {
                                        splitingJenis && splitingJenis.map((daftar, ii)=>
                                            <Fragment key={ii}>
                                                {
                                                    data && data.item_barang.map((m, i)=>
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
                                    data && data.additional_info.map((item,i)=>
                                        <TRowEdura key={item.id}>
                                            <TdEduraFreeze stateFreeze={true} className='print:hidden align-top'>
                                                <SwitchTriggerModalTransaksiSerahTerimaDokumen data={item} actions={modal}/>
                                            </TdEduraFreeze>
                                            <TdEdura className='text-center'>{i+1}.</TdEdura>
                                            {
                                                Object.entries(item).map(([k, v])=>
                                                    <TdEdura key={k}>{v}</TdEdura>
                                                )
                                            }
                                            {
                                                splitingJenis && splitingJenis.map((daftar, ii)=>
                                                    <Fragment key={ii}>
                                                        <TdEdura>
                                                            {
                                                                (ii === 0 && isFillTgl) && (
                                                                    data.start_date.toLocaleDateString('id-ID', {dateStyle:'long'})
                                                                ) 
                                                            }
                                                        </TdEdura>
                                                        {
                                                            data.item_barang.map((m, i)=>
                                                                    <TdEdura key={i} className="text-center">▢</TdEdura>
                                                            )
                                                        }
                                                        <TdEdura className="min-w-36">
                                                            {
                                                                kolom_evidence==='ttd'
                                                                ? <div className={`${(i+1)%2?'ms-0':'ms-auto'} w-1/2 text-muted-foreground border-b border-dotted border-black`}>{i+1}</div>
                                                                : <div className='border h-21 w-14 rounded mx-auto bg-gray-500 flex justify-center items-center'>Poto</div>
                                                            }
                                                        </TdEdura>
                                                    </Fragment>
                                                )
                                            }
                                        </TRowEdura>
                                    )
                                }
                            </tbody>
                        </TableWithScrolling>

                )
                :<p>Silakan Pilih Daftar Penyerahan/Pengembalian Dokumen/Barang terlebih dahulu</p>
            }
        </div>
    )
}