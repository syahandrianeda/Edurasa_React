import { DataRombelUI } from "~/domain/rombel/data-rombel";
import type { UserPtk } from "~/types";

import { useCallback, useEffect, useState, type ChangeEvent } from "react";
export interface CheckBoxRombelProps {
    value: string[];
    field: keyof UserPtk;
    setValue: (value: string[], field: keyof UserPtk) => void;
}

export default function CheckBoxPtkSppd({
    value,
    field,
    setValue,
}: CheckBoxRombelProps) {

    const handleCheckbox = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const { checked, value: rombel } = e.target;

            const nextValue = checked
                ? [...new Set([...value, rombel])]
                : value.filter((item) => item !== rombel);

            setValue(nextValue, field);
            
        },
        [value, field, setValue]
    );

    return (
        <div className="col-span-8 grid grid-flow-col grid-rows-2 border-b">
            {DataRombelUI.filter((item) => item.active).map((item) => (
                <label
                    key={item.id}
                    className="m-1 rounded-lg border px-1 py-0 text-center has-checked:bg-green-300"
                >
                    {item.rombelName}
                    <input
                        type="checkbox"
                        className="hidden"
                        name="rombel"
                        value={item.rombelName}
                        checked={value.includes(item.rombelName)}
                        onChange={handleCheckbox}
                    />
                </label>
            ))}
        </div>
    );
}
    