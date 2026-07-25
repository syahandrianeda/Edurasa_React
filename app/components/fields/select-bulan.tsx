import { useEffect, useMemo } from "react";
import { formatBackendISO, formatStringBulanTahun, getBulanTapel } from "~/lib/date-helper";
import { currentTapelProperties } from "~/lib/current-tapel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export interface SelectBulanProps {
    value: Date;
    onValueChange: (value: Date) => void;
    disabled?: boolean;
}

export const formatter = new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
});

export default function SelectBulanCurrentTapel({
        value, 
        onValueChange, 
        disabled, 
    }: SelectBulanProps) {
    
    const year = currentTapelProperties({variant:'firstYear'})
    const months =  getBulanTapel(year as number).map(m=>({month:m.getMonth(), year:m.getFullYear()}));
    

    return (
        <div className="relative mt-7">
            <div  className="bg-white dark:bg-sky-800 dark:text-sky-100 dark:border-sky-500 dark:border-t w-fit px-2 py-0 text-xs rounded-t-xl absolute top-0 left-1 -translate-y-3.5">Pilih Bulan</div>
            <Select
                disabled={disabled}
                value={`${value.getFullYear()}-${value.getMonth()}`}
                onValueChange={(val) => {
                    const [year, month] = val.split("-").map(Number);

                    onValueChange(new Date(year, month, 1));
                }}
            >
                <SelectTrigger className="w-55 bg-white">
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>
                    {months.map(({ year, month }) => {
                        const date = new Date(year, month, 1);

                        return (
                            <SelectItem
                                key={`${year}-${month}`}
                                value={`${year}-${month}`}
                            >
                                {formatter.format(date)}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
        </div>
    );
}