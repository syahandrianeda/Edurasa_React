import { IDENTITAS_SEKOLAH, NPSN_SEKOLAH, NSS_SEKOLAH } from "~/domain/identitas_sekolah/identitas-sekolah";
import logoGaruda from "~/images/garuda_pancasila.svg";
import tutWuri from "~/images/tut_wuri_handayani_higher_resolutions.png";
import { cn } from "~/lib/utils";

type Props = {
    showTutWuri:boolean,
    namaSiswa:string,
    nisnisn:string
}
export default function HalamanSampulRaport({namaSiswa, nisnisn, showTutWuri=false}:Props){
    

    return (
    <div className="border w-[210mm] print:w-[210mm] break-inside-avoid print:border-0 min-h-[297mm] p-2 flex flex-col justify-between mx-auto" >
        <div>
            <img src={logoGaruda} alt="logo_garuda" className="w-20 h-20 mx-auto my-3"/>
            
            <div className="font-extrabold text-3xl space-y-0 text-center uppercase">
                <p>Buku Raport</p>
                <p>{IDENTITAS_SEKOLAH}</p>
            </div>
            <div className="w-full uppercase text-center mb-2 text-sm">NOMOR STATISTIK SEKOLAH (NSS): {NSS_SEKOLAH} NOMOR POKOK SEKOLAH NASIONAL (NPSN): {NPSN_SEKOLAH} </div>
        </div>
        <div>
            <img src={tutWuri}  className={cn("w-76.25 mx-auto", showTutWuri?'':'print:hidden')} />
            <div className="grid grid-cols-12 uppercase my-1 border-2 border-black font-bold p-2 w-10/12 mx-auto">
                <span className="col-span-2">Nama</span>
                <span>:</span>
                <span className="col-span-9">{namaSiswa}</span>
            </div>
            <div className="grid grid-cols-12 uppercase my-1 border-2 border-black font-bold p-2 w-10/12 mx-auto">
                <span className="col-span-2">NIS/NISN</span>
                <span>:</span>
                <span className="col-span-9">{nisnisn}</span>
            </div>
        </div>
        <div className="text-center font-bold">
            <p>KEMENTRIAN PENDIDIKAN DASAR DAN MENENGAH</p>
            <p>REPUBLIK INDONESIA</p>
        </div>        
        
        

    </div>)
}