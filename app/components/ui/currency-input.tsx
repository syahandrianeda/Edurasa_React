import CurrencyInputField, { type CurrencyInputProps as ReactCurrencyInputProps, } from "react-currency-input-field";
import { cn } from "~/lib/utils";



export interface CurrencyInputProps
    extends Omit<
        ReactCurrencyInputProps,
        "value" | "defaultValue" | "onValueChange"
    > {
    value?: number;
    defaultValue?: number;
    onValueChange?: (value: number | undefined) => void;
}

export function CurrencyInput({
    value,
    defaultValue,
    onValueChange,
    className,
    decimalsLimit = 0,
    allowNegativeValue = false,
    ...props
}: CurrencyInputProps) {
    return (
        <CurrencyInputField
            {...props}
            value={value}
            defaultValue={defaultValue}
            decimalsLimit={decimalsLimit}
            allowNegativeValue={allowNegativeValue}
            decimalSeparator=","
            groupSeparator="."
            inputMode="numeric"
            className={cn(
                "border-input bg-transparent placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
                className
            )}
            onValueChange={(value) => {
                if (value === undefined || value === "") {
                    onValueChange?.(undefined);
                    return;
                }

                const number = Number(value);

                onValueChange?.(
                    Number.isNaN(number) ? undefined : number
                );
            }}
        />
    );
}