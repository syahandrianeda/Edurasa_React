import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { TableMutasiMasuk } from "~/controllers/data-siswa-controller/mutasi/tabel-data-mutasi";
import { currentTapel } from "~/lib/current-tapel";

export default  function MutasiMasukPage() {
    const {value} = useFilterContext();
    return (
        <div className="p-1">
            <h3 className="text-2xl font-bold mb-0 text-center leading-normal uppercase">Daftar Siswa Mutasi Masuk</h3>
            <h4 className="font-bold text-center mb-5">{currentTapel({variant:'full'})}</h4>
            <TableMutasiMasuk year={value.tahun as number}/>
        </div>
        
    );
}
