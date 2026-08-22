export default function NotReadyCreateItemSoal(){
    
    return(
        <div className="flex flex-col gap-2 justify-center items-center min-h-1/5">
            <p>Aplikasi Belum Siap</p>
            <div className="border rounded-3xl p-3 bg-amber-100">
                    Periksa Kurikulum, aplikasi tidak bisa mendeteksi Kurikulum Anda
            </div>
            <div className="w-full text-start md:ps-5">Periksa:
                <ul className="list-disc list-inside">
                    <li>Mapel</li>
                    <li>Cp</li>
                    <li>TP</li>
                    <li>Atp, dan</li>
                    <li>Jadwal Pelajaran</li>
                </ul>
            </div>
        </div>
    )
}