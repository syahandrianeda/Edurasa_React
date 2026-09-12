import { useEffect, useMemo} from "react";
import { Fields, SelectField } from "~/components/fields/fields";
import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { TabConfigKopTtd } from "~/components/toolbars/config-default-toolbar";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { Field } from "~/components/ui/field";
import { setFokusMapel, type fokusMapel } from "~/context-reduct/global-state/kurikulum/fokus-mapel-slice";
import { useAppDispatch, useAppSelector } from "~/context-reduct/hook";
import { CurrentMapelInActiveRombel } from "~/context-reduct/selectores/mapel-rombel-selector";
import { KoleksiMapel } from "~/domain/mapel/koleksi-mapel";
import type { InterfaceMapel } from "~/types/mapel/mapel";

export const ConfigToolbarSemester:TabsConfigProps =  {
    defaultValue: 'tab1',
    tabList:[
        {
            value: 'tab1',
            label: 'Info'
        },
        ...TabConfigKopTtd.tabList
    ],
    contentList:[
        {
            value: 'tab1',
            element: <InfoToolbarAbsensiBulanan/>
        },
        ...TabConfigKopTtd.contentList
    ]
}
export function InfoToolbarAbsensiBulanan() {
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
            
            const fokusMapelC:fokusMapel = {
                        data:fokus,
                        disabled,
                        name:'fokusMapel',
                        loaded:true
                    }
            dispatch(setFokusMapel(fokusMapelC))
        }
        useEffect(()=>{
            const fokus = user?.roles === 'Guru Mapel'?KoleksiMapel.find(s=>s.kode === user?.kode_mapel_ampu) as InterfaceMapel:KoleksiMapel.find(s=>s.kode === 'PKN') as InterfaceMapel;
            
            dispatch(setFokusMapel({
                data:fokus,
                disabled
            } as fokusMapel))
        },[user,KoleksiMapel])
        
        const { setValue, value } = useFilterContext()
        const handleChangeBulan = (
            e: React.ChangeEvent<HTMLSelectElement>
        ) => {
            setValue({semester:Number(e.currentTarget.value)})
        }

        useEffect(()=>{
            const now = new Date().getMonth();
            if(now>5){
                setValue({semester:1})
            }else{
                setValue({semester:2})
            }
        },[])

    return (
        <div className="mt-2 flex  w-full py-2 rounded-xl bg-linear-to-r from-sky-300 to-sky-100 dark:from-sky-600 dark:to-sky-500 flex-col justify-center mx-auto border border-sky-400/50 align-middle gap-1 items-center">
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

        <Fields className="w-50 mx-auto">
            <SelectField
            labelSelect="Semester"
            value={value.semester}
            onChange={handleChangeBulan}
            >
                <option value={1}>Semester 1</option>
                <option value={2}>Semester 2</option>
            </SelectField>
        </Fields>
        </div>
    )
}
