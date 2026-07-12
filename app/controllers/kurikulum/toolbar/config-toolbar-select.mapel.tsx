import { useEffect, useMemo } from "react";
import { SelectField } from "~/components/fields/fields";
import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar";
import { Field } from "~/components/ui/field";
import { setFokusMapel } from "~/context-reduct/global-state/kurikulum/fokus-mapel-slice";
import { useAppDispatch, useAppSelector } from "~/context-reduct/hook";
import { CurrentMapelInActiveRombel } from "~/context-reduct/selectores/mapel-rombel-selector";
import { KoleksiMapel } from "~/domain/mapel/koleksi-mapel";
import type { InterfaceMapel } from "~/types/mapel/mapel";

export const ConfigToolbarSelectMapel:TabsConfigProps =  {
        defaultValue:"tab1",
        tabList:[
            {
                value: 'tab1',
                label: 'Info'
            },
            ...TabConfigKopTtd.tabList
        ],
        contentList:[
            {
                value:'tab1',
                element:<TabSelectMapelApp/>
            },
            ...TabConfigKopTtd.contentList
        ]
}

function TabSelectMapelApp(){
    const fokusMapel = useAppSelector(state=>state.fokusMapel.data);
    const disabled =  useAppSelector(state=>state.fokusMapel.disabled);
    const user = useAppSelector(state=>state.auth.user);
    const mapelSelector = useAppSelector(CurrentMapelInActiveRombel);
    const mapelRombel = useMemo(()=>{
        return mapelSelector.data?.map(m=>m.source);
    },[mapelSelector])
    const dispatch = useAppDispatch();
    const handleChangeMapel = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        // const fokus = KoleksiMapel.find(s=>s.kode === e.currentTarget.value) as InterfaceMapel;
        const fokus = mapelRombel?.find(s=>s.kode === e.currentTarget.value) as InterfaceMapel;
        
        dispatch(setFokusMapel({
            data:fokus,
            disabled,
            name:'fokusMapel',
            loaded:true
            // user?.roles !== "Guru Mapel"?true:false
        }))
    }
    useEffect(()=>{
        const fokus = user?.roles === 'Guru Mapel'?KoleksiMapel.find(s=>s.kode === user?.kode_mapel_ampu) as InterfaceMapel:KoleksiMapel.find(s=>s.kode === 'PKN') as InterfaceMapel;
        
        dispatch(setFokusMapel({
            data:fokus,
            disabled,
            name:'fokusMapel',
            loaded:true
            // user?.roles !== "Guru Mapel"?true:false
        }))
    },[user,KoleksiMapel])
    return (
        <div className="bg-sky-200 mt-5">
            <Field className="w-1/2 mx-auto border rounded relative">
                <SelectField 
                    id="selectMapel"
                    name="selectMapel"
                    labelSelect="Pilih Mata Pelajaran"
                    value={fokusMapel.kode}
                    onChange={handleChangeMapel}
                    disabled={user?.roles === 'Guru Mapel'}
                    >
                        {
                            mapelRombel?.map(({id,nama,kode})=>
                                <option key={id} value={kode}>{nama}</option>
                            )
                        }
                    </SelectField>
            </Field>
        </div>
    )
}