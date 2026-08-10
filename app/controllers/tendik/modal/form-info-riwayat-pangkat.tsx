import { useImmer } from "use-immer";
import { CalendarPicker } from "~/components/form-custom/calendar";
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { Calendar } from "~/components/ui/calendar";
import type { IdAkunDanPangkat } from "~/domain/tendik/entities/id-akun-dan-pangkat";
import type { PangkatGolonganAppType } from "~/types/tendik/pangkat-golongan-app-type";
import PangkatGolonganAsn from "../fields/pangkat-golongan-asn";

export default function FormInfoRiwayatPangkat({dataAkun}:{dataAkun:IdAkunDanPangkat}){
    
    const initialAkun:PangkatGolonganAppType = {
        idbaris: 0,
            user_id: dataAkun?.user_id,
            nama_user: dataAkun?.nama_guru,
            pangkat: '',
            golongan: '',
            ruang: '',
            start_at: new Date(),
            asn: '',
    }
    const initial = dataAkun.current_golongan_pangkat ?? initialAkun
    const [currentData, setCurrentData] = useImmer<PangkatGolonganAppType>(initial);
    const handleDate = (value:string|Date)=>{
        if(!value) return;
        setCurrentData(draft=>{
            draft.start_at = typeof(value) === 'string'? new Date(value):value;
        })
    }
    return (
        <div className="min-h-8/12 m-auto border md:min-w-10/12 p-4 bg-sky-100 shadow-sm shadow-sky-400 rounded-2xl">
            <h3 className="text-center font-bold">Informasi PTK</h3>
            <TableWithScrolling className="md:w-8/12 mx-auto">
                <tbody>
                    <TRowEdura>
                        <TdEdura className="border-e-0 w-5">Nama</TdEdura>
                        <TdEdura className="border-s-0 border-e-0">:</TdEdura>
                        <TdEdura className="border-s-0">{dataAkun.nama_guru}</TdEdura>
                    </TRowEdura>
                    <TRowEdura>
                        <TdEdura className="border-e-0">NIP</TdEdura>
                        <TdEdura className="border-e-0 border-s-0">:</TdEdura>
                        <TdEdura className="border-s-0">{dataAkun.nip}</TdEdura>
                    </TRowEdura><TRowEdura>
                        <TdEdura className="border-e-0">Status PTK</TdEdura>
                        <TdEdura className="border-e-0 border-s-0">:</TdEdura>
                        <TdEdura className="border-s-0 uppercase">{dataAkun.asn || 'Honorer'}</TdEdura>
                    </TRowEdura>
                </tbody>
            </TableWithScrolling>
            <h3 className="text-xl font-bold text-center mt-4">Edit Pangkat dan Golongan Saat ini</h3>
            <div className="grid md:grid-cols-12 gap-2 shadow-lg bg-sky-200 shadow-sky-700 rounded-2xl p-4">
                <div className="md:col-span-4">
                    <CalendarPicker
                                id="id_tgl_surat"
                                className="col-span-2"
                                label="TMT Pangkat"
                                
                                currentDate={currentData?.start_at ?? new Date()}
                                handleChangeDate={handleDate}/>
                </div>
                <div className="md:col-span-8">
                    <PangkatGolonganAsn value={currentData} setValue={setCurrentData}/>
                </div>
            </div>
        </div>
    )
}