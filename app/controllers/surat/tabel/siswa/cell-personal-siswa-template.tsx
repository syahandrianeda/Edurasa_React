import { useModal } from "~/components/modals/modal-provider";
import { Button } from "~/components/ui/button";
import TooltipComp from "~/components/ui_edura/tooltip-comp";
import type { SiswaType } from "~/types/siswa";
import switchModalTypeTemplate from "./switch-modal-type-template";
import { createLimitedDisplay } from "~/lib/limited-display";
import type { DataOrmSuratKeluarType } from "~/domain/surat-orm/entity/surat-orm-type";
import type { TemplateSuratSiswa } from "~/domain/surat-orm/entity/template-surat-siswa";

export default function CellPersonalSiswaTemplate({data}:{data:DataOrmSuratKeluarType}){
    const {actions} = useModal<SiswaType>();
    const siswa = data.dataTemplate?.personalSiswaType ?? [];
    const template = data?.dataTemplate?.name ??`Surat Keterangan Aktif`;
    const type = switchModalTypeTemplate(template);
    const display = createLimitedDisplay(siswa,3,'Siswa')
    return (
        <div className="text-[9px] text-sky-600 font-bold">
            atas nama: 
            <ul className="list-disc list-inside">
                {
                    display.visibleItems.map((m, i)=>
                        <li key={i}>
                            <TooltipComp content={`${m.pd_nama}`}>
                                <Button role="button" 
                                        variant="ghost" 
                                        className="h-4 cursor-pointer text-[8px]  text-sky-600 font-bold p-0 m-0 hover:bg-transparent" 
                                        onClick={()=>actions.open(type, {data:m, surat_keluar:data} as TemplateSuratSiswa, {closeOnOutsideClick:false}   )}>
                                    <p className="capitalize">{m.pd_nama.toLowerCase()}
                                    </p>
                                </Button>
                            </TooltipComp>
                        </li>
                    )
                }
                {
                    display.moreText && (
                        <li>
                            <TooltipComp content={`${display.moreText}`}>
                                <Button role="button" 
                                        variant="ghost" 
                                        className="h-4 cursor-pointer text-[8px]  text-sky-600 font-bold p-0 m-0 hover:bg-transparent" 
                                        onClick={()=>actions.open('INFO', data, {closeOnOutsideClick:false}   )}>
                                    <p className="capitalize">{display.moreText}
                                    </p>
                                </Button>
                            </TooltipComp>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}
