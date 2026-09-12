import { useMemo, useState } from 'react';
import { applyFilters } from '~/lib/filtering-koleksi-data/filter-utility';
import type { FilterValues } from '~/lib/filtering-koleksi-data/type';


export interface UseFilterOptions<T, K extends keyof T> {
    initialFilters?: FilterValues<Pick<T, K>>;
}

export function useFilter<
    T,
    K extends keyof T = keyof T
>(
    data: T[],
    options?: UseFilterOptions<T, K>
) {
    type Filters = FilterValues<Pick<T, K>>;

    const [filters, setFiltersState] = useState<Filters>(
        options?.initialFilters ?? {}
    );

    const filteredData = useMemo(() => {
        return applyFilters(data, filters);
    }, [data, filters]);

    const setFilter = <P extends K>(
        key: P,
        value: Filters[P]
    ) => {
        setFiltersState(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const setFilters = (
        values: Filters
    ) => {
        setFiltersState(prev => ({
            ...prev,
            ...values
        }));
    };

    const removeFilter = <P extends K>(
        key: P
    ) => {
        setFiltersState(prev => {
            const next = { ...prev };

            delete next[key];

            return next;
        });
    };

    const resetFilter = () => {
        setFiltersState({});
    };

    const hasActiveFilters =
        Object.values(filters).some(value => {
            if (
                value === undefined ||
                value === null ||
                value === ''
            ) {
                return false;
            }

            if (
                Array.isArray(value) &&
                value.length === 0
            ) {
                return false;
            }

            return true;
        });

    return {
        filters,
        filteredData,

        setFilter,
        setFilters,

        removeFilter,
        resetFilter,

        hasActiveFilters
    };
}