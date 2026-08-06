import { INSTANSI_INDUK, PEMERINTAH_DAERAH } from "~/domain/identitas_aplikasi/identitas-aplikasi";
import LogoDepok from '../../../../../images/kotadepok.webp'

export default function KopDinasDepok(){
    return (
        <div className="grid grid-cols-12 border-b-4 border-double border-gray-800">
            <div className="p-2 col-span-2 flex justify-center items-center">
                <img src={LogoDepok} height={25}/>
            </div>
            <div className="p-2 col-span-10 text-center font-arial">
                <h3 className="font-extrabold text-2xl uppercase">{PEMERINTAH_DAERAH}</h3>
                <h2 className="font-extrabold text-4xl uppercase">{INSTANSI_INDUK}</h2>
                <p className="text-sm">Komplek Balaikota Depok, Gedung Dibaleka II Lantai 4</p>
                <p className="text-sm">Jalan Margonda Raya Nomor 54 Depok, Jawa Barat</p>
                <p className="text-sm">Telp./Fax. 021 - 29402287 http://disdik.depok.go.id</p>
            </div>
        </div>
    )
}