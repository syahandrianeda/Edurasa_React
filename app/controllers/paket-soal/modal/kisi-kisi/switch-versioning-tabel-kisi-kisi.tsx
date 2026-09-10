import type DataKisiKisi from "~/domain/paket-soal/infrastructure/data-kisi-kisi-class"
import TableKisiKisi from "./tabel-kisi-kisi"
import TableKisiKisiDanSoal from "./tabel-kisi-kisi-soalnya"

type Props = {
    version: 'v1'|'v2',
    isMultiple:boolean,
    InstanceDataKisikisi: DataKisiKisi
}
export default function SwitchVersioningKisiKisi({version, InstanceDataKisikisi, isMultiple}:Props){
    console.log(version)
    switch(version){
        case 'v1':
            return <TableKisiKisi KisiKisiInstance={InstanceDataKisikisi} isMultiple={isMultiple}/>;
        case 'v2':
            return <TableKisiKisiDanSoal KisiKisiInstance={InstanceDataKisikisi} isMultiple={isMultiple}/>;
        default:
            return null
    }
}