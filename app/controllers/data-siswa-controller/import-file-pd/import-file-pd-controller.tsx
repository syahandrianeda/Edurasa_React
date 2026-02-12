import { Upload } from "lucide-react";
import { Fields } from "~/components/fields/fields";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import ButtonTooltip from "~/components/ui_edura/button-tooltip";
import { readExcelFileToJsonDapodik} from "~/infrastructures/excels/detect-header-dapodik";


export default function ImportFilePdController(){
    const {setValue} = useFilterContext();
    const importFile = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        
        if (!file) return;
        
        const {data, property,render} = await readExcelFileToJsonDapodik(file);
        
        setValue({extra: {formDapodik:data,propertyDapodik:property,tampilan:'formatSinkron',configRender:render}} ) 
    }
    return(
        <Fields className="my-5 w-full">
            <input id="filePdDapodik" type="file" className="hidden" onChange={importFile}/>
            <ButtonTooltip 
                asChild 
                tooltip="Import File Dapodik di sini" 
                variant="default" 
                className="w-fit mx-auto relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-0.5 bg-black rounded-3xl bg-linear-to-tl from-sky-300 to-rose-200 active:scale-95 duration-300">
                    <label htmlFor="filePdDapodik" className="border  border-sky-500 inset-shadow-2xs px-4 shadow-2xl shadow-sky-600 text-sky-800 font-extrabold p-1 rounded-xl flex justify-between gap-2 items-center">
                        Import <Upload size={12}/>
                    </label>
            </ButtonTooltip>
        </Fields>

    )
}