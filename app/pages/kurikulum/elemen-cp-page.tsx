import { useMemo } from "react";
import { useAppSelector } from "~/context-reduct/hook"
import { KurmerDtoSelector } from "~/context-reduct/selectores/kurmer-selector"
import OrmKurikulum from "~/domain/kurikulum/orm-kurikulum";
import type { resourcesKurikulum } from "~/types/kurikulum/kurikulum-type";

export default function ElemenCpPage(){
    const data = useAppSelector(KurmerDtoSelector);
    console.log(data);
    const ormKurmer = useMemo(()=>{
        return new OrmKurikulum(data as resourcesKurikulum).createData();
    },[data])
    console.log(ormKurmer);
    return <h1>Elemen CP PAge</h1>
}