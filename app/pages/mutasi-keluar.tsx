import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { TableMutasiKeluar } from "~/controllers/data-siswa-controller/mutasi/tabel-data-mutasi-keluar";
import { currentTapel } from "~/lib/current-tapel";


export default  function MutasiKeluarPage() {
    const {value} = useFilterContext();
    return (
        <div className="p-1">
            <h3 className="text-2xl font-bold mb-0 text-center leading-normal uppercase">Daftar Siswa Mutasi Keluar</h3>
            <h4 className="font-bold text-center mb-5">{currentTapel({variant:'full'})}</h4>
            <TableMutasiKeluar year={value.tahun as number}/>
        </div>
        
    );
}
