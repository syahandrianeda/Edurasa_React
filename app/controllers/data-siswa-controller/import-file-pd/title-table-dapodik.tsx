

export default function TitleTableImportFilePDDapodik({tampilan}:{tampilan:string}) {
    switch(tampilan){   
        case 'formatDapodik':
            return <h3 className="text-2xl text-center mb-5">Tabel Format File Import Dapodik</h3>
        case 'formatSinkron':   
            return <h3 className="text-2xl text-center mb-5">Tabel Sinkronisasi Data</h3>
        case 'formatDataSiswaHanyaAdaDiDapodik':   
            return <h3 className="text-2xl text-center mb-5">Tabel Data Siswa Hanya Ada di Dapodik</h3>
        case 'formatDataSiswaHanyaAdaDiAplikasi':
            return <h3 className="text-2xl text-center mb-5">Tabel Data Siswa Hanya Ada di Aplikasi</h3>
        case 'formatRekomendasiPerbaikanDapodik':   
            return <h3 className="text-2xl text-center mb-5">Tabel Rekomendasi Perbaikan Data di Dapodik</h3>
        case 'formatRekomendasiPerbaikanDataEdurasa':   
            return (
                <>
                    <h3 className="text-2xl text-center mb-0">Tabel Rekomendasi Perbaikan Data di Aplikasi</h3> 
                    <h4 className="text-xl text-center mb-5">Terutama NIS dan NIS tidak valid/duplikat</h4> 
                </>
        )  

        default:    
            return null;
    }
}
