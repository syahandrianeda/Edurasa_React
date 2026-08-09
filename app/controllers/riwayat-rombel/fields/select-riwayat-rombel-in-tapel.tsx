import { SelectField } from "~/components/fields/fields";
import { Field } from "~/components/ui/field";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useAppSelector } from "~/context-reduct/hook"
import { InstanceOfRiwayatRombel } from "~/context-reduct/selectores/riwayat-rombel-selector"
import { currentTapel } from "~/lib/current-tapel";
interface Props{
    value:string, 
    setValue: (v:string)=>void,
    tgl:Date
}
export default function SelectRiwayatRombelInTapel({value, setValue, tgl}:Props){
    const koleksiRombel = useAppSelector(InstanceOfRiwayatRombel);
    const tapel = currentTapel({variant:'short', date:tgl});
    const tapelLong = currentTapel({variant:'full', date:tgl});
    const dataRombel = koleksiRombel.getCollectionsRombelInTapel(tapel);
    return (
        <Field orientation="horizontal" className="relative mt-7 w-10/12 mx-auto">
            <div className="absolute -top-3 left-0 text-xs bg-white px-4 ps-1 text-muted-foreground rounded-tr-2xl">Kelas di {tapelLong}</div>
            <Select 
                value={value}
                onValueChange={setValue}
                >
                    <SelectTrigger className="w-full text-center bg-white rounded-s-none">
                        <SelectValue placeholder="Pilih Siswa"/>
                    </SelectTrigger>

                    <SelectContent>
                        {
                            dataRombel.map((m, i)=>
                                <SelectItem
                                    key={m}
                                    value={m}
                                >
                                    {m}
                                </SelectItem>
                            )
                        }
                    </SelectContent>
                </Select>
        </Field>
    )
}