export function StatistikItem({
    label, value,
}: {
    label: string;
    value: string;
}) {

    return (
        <div className="rounded-md border p-2">

            <p className="text-[10px] text-muted-foreground">
                {label}
            </p>

            <p className="mt-0.5 text-sm font-medium">
                {value}
            </p>

        </div>
    );
}
