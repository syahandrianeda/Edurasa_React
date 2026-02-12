import { useAppSelector } from "~/context-reduct/hook";
import { AbsensiRombelAktifDTO, OrmAbsensiSelector } from "~/context-reduct/selectores/absensi-selector";


export default function AbsensiSiswaPage() {    
    const dataAbsen = useAppSelector(OrmAbsensiSelector);
    console.log(dataAbsen);
    return (
        <div className="p-4 h-[calc(100vh-10rem)] flex justify-center items-center">
            <h1 className="text-2xl font-bold mb-4">Absensi Siswa...</h1>
            {/* Konten halaman absensi siswa */}
        </div>
    );
}   
