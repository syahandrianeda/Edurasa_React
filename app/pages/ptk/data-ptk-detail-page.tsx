
import { TdEdura, ThEdura, TRowEdura } from "~/components/tabels/tabel-components";
import TableWithScrolling from "~/components/tabels/table-with-scrolling";
import { useAppSelector } from "~/context-reduct/hook";
import { InstancePangkatGolonganSelector } from "~/context-reduct/selectores/pangkat-golongan-selector";
import { InstanceRiwayatIdAkun } from "~/context-reduct/selectores/riwayat-id-akun-selector";

interface PtkDetail{
    nama:string, 
    nip: string,
    jabatan: string,
    pangkat:string
    status:string
}
export default function DataPtkDetailPage(){
    const pangkatGolonganSelector = useAppSelector(InstancePangkatGolonganSelector)
    const ptkAkun = useAppSelector(InstanceRiwayatIdAkun)
    const ptkAll = ptkAkun.getAkunAktifInDate(new Date()).sort((a, b)=>a.nama_guru.localeCompare(b.nama_guru))
    const pangkatGolongan = pangkatGolonganSelector.getPangkatGolonganAktifInDate(new Date()).sort((a, b)=>a.nama_user.localeCompare(b.nama_user))
    const data:PtkDetail[]=[];
    for(const dataPtk of ptkAll){
        const {user_id:id} = dataPtk;
        const foundRiwayat = ptkAll.find(s=>s.user_id === id);
        const foundPangkat = pangkatGolongan.find(s=>s.user_id === id);//oundRiwayat?.user_id && s.idbaris === foundRiwayat?.idbaris)
        const textPangkat = foundPangkat?.asn === 'pns' ?
                                `${foundPangkat?.pangkat} - ${foundPangkat?.golongan}/${foundPangkat?.ruang}`
                                : foundPangkat?.asn ===""?
                                    ""
                                    :`${foundPangkat?.pangkat} - ${foundPangkat?.golongan}` ;
        const ptk:PtkDetail = {
            nama: dataPtk.nama_guru,
            nip: dataPtk.nip,
            jabatan:dataPtk.jabatan,
            pangkat: textPangkat,
            status:dataPtk.asn || 'Honorer'
        }
        data.push(ptk)            

    }
    return(
        <TableWithScrolling>
            <thead>
                <TRowEdura>
                    <ThEdura>No.</ThEdura>
                    <ThEdura>Nama PTK</ThEdura>
                    <ThEdura>Status PTK</ThEdura>
                    <ThEdura>NIP</ThEdura>
                    <ThEdura>Pangkat/Golongan</ThEdura>
                    <ThEdura>Jabatan/Tugas</ThEdura>
                </TRowEdura>
            </thead>
            <tbody>
                {
                    data.map((m, i)=>
                        <TRowEdura key={i}>
                            <TdEdura>{i+1}</TdEdura>
                            <TdEdura>{m.nama}</TdEdura>
                            <TdEdura>{m.status}</TdEdura>
                            <TdEdura>{m.nip}</TdEdura>
                            <TdEdura>{m.pangkat}</TdEdura>
                            <TdEdura>{m.jabatan}</TdEdura>
                        </TRowEdura>
                    )
                }
            </tbody>
        </TableWithScrolling>
    )
}