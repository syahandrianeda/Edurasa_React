import { useAppSelector } from "~/context-reduct/hook";
import { OrmTendikInstance } from "~/context-reduct/selectores/orm-tendik-selector";
import { useCallback, useMemo } from "react";

export function useFriendRiwayat(idPtk:number, tgl:Date){
    const user = useAppSelector(OrmTendikInstance);

    return useMemo(() => user.getDetailPtkInDate(tgl, idPtk),
        [tgl])
        
}