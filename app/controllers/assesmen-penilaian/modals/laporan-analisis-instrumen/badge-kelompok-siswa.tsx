
import { Badge } from "~/components/ui/badge";
import type { KelompokAtasBawah } from "~/domain/analisis-instrumen/KelompokAtasBawah";

export default function BadgeKelompokSiswa({kelompokSiswa}:{kelompokSiswa:KelompokAtasBawah}){
    switch(kelompokSiswa){
        case 'atas':
            return <Badge variant={"outline"} className="bg-green-300 capitalize text-[8px]">{kelompokSiswa}</Badge>
        case 'bawah':
            return <Badge variant="destructive" className="capitalize text-[8px]">{kelompokSiswa}</Badge>
        default:
            return <Badge className="capitalize text-[8px]">{kelompokSiswa}</Badge>
    }
}