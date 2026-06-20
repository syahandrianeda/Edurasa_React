import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar"
import { useAppSelector } from "~/context-reduct/hook"
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { AtpAsOrm } from "~/types/kurikulum/prota-orm";

export default function CreateItemBankSoalPage(){
    const {value}=useFilterContext();
    return (
        <div>
            Anda akan membuat item soal dengan data:
            <p>Bentuk Soal</p>
            {
                (value?.extra?.fokusBentukSoal as ListBentukSoalType | undefined)?.name
            }
            <p>ATP</p>

            {
                (value?.extra?.fokusAtp as  AtpAsOrm | undefined)?.atp_as_tp_description
            }
        </div>
    )
}