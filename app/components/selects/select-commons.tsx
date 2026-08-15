import { cn } from "~/lib/utils";
import { Field } from "../ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type SelectCommonsFieldProps< T, KeySelected extends keyof T, LabelSelected extends keyof T > = {
    label:string,
    data: Array< T & Record<KeySelected, string|number> & Record<LabelSelected, any> >;
    keySelected: KeySelected;
    labelSelected: LabelSelected;
    value?: string;
    setValue?: (value: string) => void;
    placeholder?: string;
    fieldClassName?:string,
    labelClassName?:string,
    selectClassName?:string
    disabled?:boolean
};

export function SelectCommonsField< T, KeySelected extends keyof T, LabelSelected extends keyof T >({
    label,
    data,
    value,
    setValue,
    keySelected,
    labelSelected,
    placeholder,
    fieldClassName,
    selectClassName,
    labelClassName,
    disabled
    }: SelectCommonsFieldProps<T, KeySelected, LabelSelected>) {
    
    return (
        <Field className={cn("relative mt-4",fieldClassName)}>
            <div className={cn("absolute text-xs ps-1  -top-4 max-w-1/5 left-0 bg-sky-100 pe-4 rounded-tr-2xl", labelClassName)}>{label}</div>
            <Select 
                value={value ?? ''} 
                onValueChange={(v)=>setValue?.(v)}
                disabled={disabled}
                >
                <SelectTrigger className={cn("min-w-10/12 mx-auto bg-sky-100 rounded-tl-none focus-visible:ring-0 focus-visible:outline-0",selectClassName)}>
                    <SelectValue placeholder={placeholder ?? 'Silakan Pilih'} />
                </SelectTrigger>

                <SelectContent>
                {
                    data.map((m, i: number) => (
                        <SelectItem key={i} value={m[keySelected]}>
                        {m[labelSelected]}
                        </SelectItem>
                    ))
                }
                </SelectContent>
            </Select>
        </Field>
    );
}