import { useAppSelector } from "~/context-reduct/hook";

export default function AbsensiSiswaPage() {    
    const t = useAppSelector(st=>st.kaldik);
    console.log('kaldik redux', t);
    return (
        <div className="p-4 h-[calc(100vh-10rem)] flex justify-center items-center">
            <h1 className="text-2xl font-bold mb-4">Absensi Siswa...</h1>
            {/* Konten halaman absensi siswa */}
        </div>
    );
}   
