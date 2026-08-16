import {Fragment, useMemo} from 'react';
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { TdEdura, TdEduraFreeze, ThEdura, THEduraFreeze, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { GetValueJenisSerahTerima, JenisSerahTerimaEnum } from "~/types/galleries/jenis-serah-terima-enum";
import type { SerahTerimaDokumenAppType } from "~/types/galleries/serah-terima-dokumen-app-type";
import { OptionsPropertiesData } from "~/controllers/serah-terima-dokumen/fields/option-properties-siswa";
import { OptionsPropertiesDataPtk, OptionsPropertiesDataPtkUI } from "~/controllers/serah-terima-dokumen/fields/option-properties-ptk";
import type { PersonalTypeEnum } from "~/types/galleries/personal-type-enum";
import SwitchTriggerModalTransaksiSerahTerimaDokumen from '~/controllers/transaksi-serah-terima-dokumen/trigger-transaksi-serah-terima';
import { useModal } from '~/components/modals/modal-provider';
import type { SerahTerimaWithTransaksi } from '~/domain/serah-terima/entities/orm-serah-terima-type';
import urlImgDrive from '~/lib/url-img-drive';
import ImgDriveComp from '~/components/image-from-drive/img-drive';
import { useAppSelector } from '~/context-reduct/hook';
import { OrmSerahTerimaWithTransaksiSelector } from '~/context-reduct/selectores/serah-terima-selector';

export default function KoleksiFormDaftarSerahTerimaDokumen(){
    const {actions:modal} = useModal();
    const dataSelector= useAppSelector(OrmSerahTerimaWithTransaksiSelector)
    const {value, updateExtra} = useFilterContext<{
            daftarSerahTerimaDokumen?:SerahTerimaWithTransaksi,
            kolom_evidence?:string
            fillTgl?:boolean
        }>()
    const data = useMemo(()=>{
            return dataSelector.find(s=>s.idbaris === value?.extra?.daftarSerahTerimaDokumen?.idbaris)
    },[dataSelector, value?.extra?.daftarSerahTerimaDokumen?.idbaris]);
    
    const kolom_evidence = value?.extra?.kolom_evidence;

    const isFoto = kolom_evidence === 'poto';
    const isFillTgl = value?.extra?.fillTgl;
    const type_target = data?.type_target as keyof typeof PersonalTypeEnum
    const keySiswaTypeTaret = 'SISWA' as keyof typeof PersonalTypeEnum
    const countItemBarang = data?.item_barang.length ?? 0;
    const sourcePersonal = type_target === keySiswaTypeTaret  ? OptionsPropertiesData:OptionsPropertiesDataPtk;
    const keyTargetPersonal = data?.additional_info && Object.keys(data?.additional_info[0]).filter(s=>s!=='id').map(m=>sourcePersonal.find(f=>f.key === m)?.label)
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
                                    <ThEdura key={i} className='text-wrap' colSpan={countItemBarang+2}>{GetValueJenisSerahTerima(daftar as keyof typeof JenisSerahTerimaEnum)}</ThEdura>
                                )
                            }
                        </TRowEdura>
                        <TRowEdura>
                            {
                                splitingJenis && splitingJenis.map((daftar, ii)=>
                                    <Fragment key={ii}>
                                        <ThEdura rowSpan={2}  className="text-wrap">Tanggal {GetValueJenisSerahTerima(daftar as keyof typeof JenisSerahTerimaEnum)}</ThEdura>
                                        <ThEdura colSpan={countItemBarang} className='text-wrap'>Dokumen/Barang {GetValueJenisSerahTerima(daftar as keyof typeof JenisSerahTerimaEnum)}</ThEdura>
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
                            data && data.transaksiEvent.map((transaksiEvent,i)=>{
                                const item= transaksiEvent.person;
                                return (
                                    <TRowEdura key={item.id+'_'+i} className='[&>td]:align-middle'>
                                        <TdEduraFreeze stateFreeze={true} className='print:hidden align-top'>
                                            <SwitchTriggerModalTransaksiSerahTerimaDokumen data={transaksiEvent} actions={modal}/>
                                        </TdEduraFreeze>
                                        <TdEdura className='text-center'>{i+1}.</TdEdura>
                                        {
                                            Object.entries(item).filter(([kk,_])=>kk!=='id').map(([k, v])=>
                                                <TdEdura key={k}>{v}</TdEdura>
                                            )
                                        }
                                        {
                                            splitingJenis && splitingJenis.map((jenis, ii)=>
                                                {
                                                const foundTransaksiByJenis = transaksiEvent.transaksi.find(s=>s.jenis === jenis);
                                                const urlImg= foundTransaksiByJenis? foundTransaksiByJenis.idfile: `data:text/html;base64,PGJvZHkgc3R5bGU9Im1hcmdpbjowO2JhY2tncm91bmQ6IzZhNzI4MiI+`
                                                return (
                                                <Fragment key={ii}>
                                                    <TdEdura>
                                                        {
                                                            (isFillTgl) 
                                                                ? foundTransaksiByJenis? foundTransaksiByJenis.tgl.toLocaleDateString('id-ID', {dateStyle:'long'}):''//( data.start_date.toLocaleDateString('id-ID', {dateStyle:'long'}) ) 
                                                                : ''
                                                        }
                                                    </TdEdura>
                                                    {
                                                        data.item_barang.map((m, i)=>
                                                                    <TdEdura key={i} className="text-center">{foundTransaksiByJenis?'✓':'▢'}</TdEdura>
                                                                
                                                            
                                                        )
                                                    }
                                                    
                                                    <TdEdura className="min-w-36">
                                                        {
                                                            kolom_evidence==='ttd'
                                                            ? <div className={`${(i+1)%2?'ms-0':'ms-auto'} w-1/2 text-muted-foreground border-b border-dotted border-black`}>{i+1}</div>
                                                            : <div className={`border h-21 w-14 rounded mx-auto bg-gray-500 flex justify-center items-center`}>{foundTransaksiByJenis?<ImgDriveComp src={urlImg} alt={foundTransaksiByJenis.items.join('_')}/>:'Poto'}</div>
                                                        }
                                                    </TdEdura>
                                                </Fragment>

                                                )
                                            }
                                            )
                                        }
                                    </TRowEdura>
                                )
                            }
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