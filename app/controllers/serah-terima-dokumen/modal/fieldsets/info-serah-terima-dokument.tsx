import TableInfoSerahTerimaDokumenModal from "./table-info-serah-terima-dokumen-modal";

export default function InfoSerahTerimaDokumen(){
    
    return (
        <div className="bg-white rounded-2xl mx-auto self-center-safe md:max-w-10/12 px-2 pb-3">
            <h3 className="text-2xl font-extrabold text-center mb-7">Informasi Daftar Penyerahan/Penerimaan Dokumen/Barang</h3>
            <TableInfoSerahTerimaDokumenModal className="mx-auto text-sm"/>
        </div>
    )
}