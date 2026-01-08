
import { SampleButtonTriggerModal, useModal } from "~/components/modals/modal-provider";
import { useAppSelector } from "~/context-reduct/hook";
import { DataSiswaAktifRombel } from "~/context-reduct/selectores/data-siswa-aktif";
import type { SiswaType } from "~/types/siswa";


export default  function DataSiswaPage() {
    const siswaktifRombel = useAppSelector(DataSiswaAktifRombel);
    const {actions, state} = useModal<SiswaType>()
    return (<div className="p-4">
        
                <h1 className="text-2xl font-bold mb-4 font-times-new-roman">Data Siswa</h1>
                {/* Konten halaman data siswa */}
                {
                    siswaktifRombel.map((m,index)=>(
                        <p key={index}>
                            No: {index+1}<br/>
                            Nama: {m.pd_nama}<br/>
                            nis: {m.nis}<br/>
                            Agama: {m.pd_agama}<br/>
                            Gender: {m.pd_jk}<br/>
                            jenjang: {m.jenjang}({typeof m.jenjang})<br/>
                            aktif: {m.aktif}<br/>
                            <SampleButtonTriggerModal data={m} actions={actions} configModal={{closeOnOutsideClick:false}}/>

                        </p>
                    ))
                }
                <p className="h-48">a</p>
            </div>
            
    );
}

