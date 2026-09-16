import type { FilterValues } from "./type";




function isEmptyFilterValue(value: unknown): boolean {
    if (value === undefined || value === null || value === '') {
        return true;
    }

    if (Array.isArray(value) && value.length === 0) {
        return true;
    }

    return false;
}

function matchesFilterValue<T>(
    itemValue: T,
    filterValue: unknown
): boolean {
    if (isEmptyFilterValue(filterValue)) {
        return true;
    }

    /*
     * Filter berupa array:
     *
     * filterValue = ['MAT', 'IPA']
     *
     * Jika data juga array:
     *
     * itemValue = ['MAT', 'IPS']
     *
     * maka dianggap match karena MAT terdapat
     * pada kedua array.
     */
    if (Array.isArray(filterValue)) {
        if (Array.isArray(itemValue)) {
            return filterValue.some(filterItem =>
                itemValue.includes(filterItem)
            );
        }

        return filterValue.includes(itemValue);
    }

    /*
     * Data berupa array tetapi filter hanya satu value:
     *
     * itemValue = ['MAT', 'IPA']
     * filterValue = 'MAT'
     *
     * dianggap match.
     */
    if (Array.isArray(itemValue)) {
        return itemValue.includes(filterValue);
    }

    return itemValue === filterValue;
}

export function applyFilters<T>(
    data: T[],
    filters: FilterValues<T>
): T[] {
    const activeFilters = Object.entries(filters).filter(
        ([, value]) => !isEmptyFilterValue(value)
    );

    /*
     * Tidak ada filter aktif.
     * Kembalikan semua data.
     */
    if (activeFilters.length === 0) {
        return data;
    }

    return data.filter(item => {
        /*
         * every() = AND antar field filter.
         */
        return activeFilters.every(([key, filterValue]) => {
            const itemValue = item[key as keyof T];

            return matchesFilterValue(
                itemValue,
                filterValue
            );
        });
    });
}