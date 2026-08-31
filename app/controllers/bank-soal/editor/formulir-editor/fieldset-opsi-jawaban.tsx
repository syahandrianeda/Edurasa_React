
import { useCreateItemSoalContext } from "../../reducer-item-soal/immer-reducer-context";
import { useAppSelector } from "~/context-reduct/hook";
import FieldsetPgTunggal from "../opsi-jawaban/fieldset-pg-tunggal";
import FieldsetPgKompleks from "../opsi-jawaban/fieldset-pg-kompleks";
import FieldsetMenjodohkan from "../opsi-jawaban/fieldset-menjodohkan";
import FieldsetBenarSalah from "../opsi-jawaban/fieldset-benar-salah";
import FieldsetKunciJawabanSingkat from "../opsi-jawaban/fieldset-kunci-jawaban-singkat";


export default function FieldsetOpsiJawaban(){
    const {data, action} = useCreateItemSoalContext();
    const {fokusBentukSoal} = useAppSelector(s=>s.uiFokusToolbar.data);
    

    // if(!data.json_alat_jawab || !fokusBentukSoal) return null;
    if(!fokusBentukSoal) return null;
    switch(fokusBentukSoal.name){
        case 'pg':
            return <FieldsetPgTunggal data={data} action={action} bentukSoal={fokusBentukSoal}/>;
        case 'pg_kompleks':
            return <FieldsetPgKompleks data={data} action={action} bentukSoal={fokusBentukSoal}/>;
        case 'menjodohkan':
            return <FieldsetMenjodohkan data={data} action={action}/>;
        case 'benar_salah':
            return <FieldsetBenarSalah data={data} action={action}/>;
        case 'isian_singkat':
            return <FieldsetKunciJawabanSingkat/>
        //  case 'essay':
        //     return <FieldsetKunciJawaban/>
        default:
            return null
            // return <WrapCreateOpsiJawaban bentukSoal={fokusBentukSoal}/>
    }

}