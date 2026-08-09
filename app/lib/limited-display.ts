export interface LimitedListDisplay<T> {
    visibleItems: T[];
    moreText?: string;
}

export function createLimitedDisplay<T>(
    data: T[],
    limit: number,
    itemLabel = "item"
): LimitedListDisplay<T> {
    const visibleItems = data.slice(0, limit);
    const remaining = data.length - visibleItems.length;

    return {
        visibleItems,
        moreText:
            remaining > 0
                ? `dan ${remaining} ${itemLabel} lainnya`
                : undefined,
    };
}