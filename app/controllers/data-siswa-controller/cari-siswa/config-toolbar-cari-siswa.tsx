import { Search } from "lucide-react";
import { useState } from "react";
import { SelectField } from "~/components/fields/fields";
import type { TabsConfigProps } from "~/components/tabs/generate-tabs";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";


export const ConfigToolCariSiswa:TabsConfigProps =  {
    defaultValue:'tab1',
    tabList:[
        {
            value: 'tab1',
            label: 'Fitur'
        },
    ],
    contentList:[
        {
            value: 'tab1',
            element: <SearchCariSiswaToolbar/>
        },
    ]
}

export function SearchCariSiswaToolbar(){
    const [searchInput, setSearchInput] = useState('');
    const [searchKey, setSearchKey] = useState<string>('pd_nama');

    const { setValue } = useFilterContext();

    const onHandleChangeSearch = (v: string) => {
        setSearchInput(v);

        if (v === "") {
            setValue({
                extra: {
                    [searchKey]: ""
                }
            });
        }
    };

    const onClickHandleSearch = () => {
        setValue({
            extra: {
                [searchKey]: searchInput
            }
        });
    };

    const onChangeKriteria = (v: string) => {
        setSearchKey(v);
        setValue({
            extra: {
                [v]: searchInput
            }
        });
    };

    return (
        <div className="flex h-30 w-full justify-center gap-2 items-center">
            <div className="relative"><SelectField
                    labelSelect="Kriteria"
                    className="bg-white"
                    value={searchKey}
                    onChange={(e) => onChangeKriteria(e.target.value)}
                >
                    <option value="pd_nama">Nama</option>
                    <option value="nis">Nomor Induk Siswa</option>
                    <option value="nisn">NISN</option>
                </SelectField>
            </div>
            <div className="flex gap-1 w-1/2">
                <div className="relative w-full">
                    <Search className="absolute top-0 translate-y-2 left-1 text-gray-400 size-5"/>
                    <Input 
                        value={searchInput} 
                        type="text" 
                        onChange={(e)=>onHandleChangeSearch(e.target.value)} 
                        tabIndex={0}
                        placeholder="Cari nama siswa"
                        className="py-0 indent-3 bg-white dark:border-gray-300 dark:shadow-none"
                        />
                    <Button variant="default" size="sm" onClick={onClickHandleSearch} className="group/button-search absolute -top-1 translate-y-1.5 right-0 cursor-pointer outline-none border-none rounded-full flex flex-row items-center justify-center h-8 w-8 hover:w-15! transition-all duration-[0.75s] before:content-[''] before:absolute before:w-full before:h-full before:inset-0 before:bg-linear-to-br before:from-green-300 before:to-sky-500 before:ring-0 before:ring-offset-1 hover:before:ring-offset-4 before:ring-[#2832d4] before:rounded-full before:transition before:duration-300 before:ring-offset-white hover:before:scale-105 active:before:scale-95 text-white">
                        <Search className="absolute left-1.5 group-hover/button-search:left-1.5 group-active:left-2.5 duration-300 transition-[left] z-10 "/> 
                        <span className="absolute right-2 text-[14px] font-semibold [--w:calc(100%-48px)] w-[--w] max-w-[--w] overflow-hidden flex items-center justify-end -z-1 group-hover/button-search:z-9 pointer-events-none select-none opacity-0 group-hover/button-search:opacity-100 text-transparent group-hover/button-search:text-white group-active:right-3 transition-all duration-[2s] group-hover/button-search:duration-300 group-active:scale-[0.85]">
                            Cari
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    )
}