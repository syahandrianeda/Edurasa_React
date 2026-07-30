import { useEffect, useMemo, useState } from "react";

import { buildPageItems } from "~/domain/pagination/build-page-item";

import type {
    UsePaginationProps,
    UsePaginationResult,
} from "../domain/pagination/types";

export function usePagination<T>(
    data: T[],
    {
        initialPageSize = 20,
    }: UsePaginationProps = {},
): UsePaginationResult<T> {

    const [currentPage, setCurrentPage] = useState(1);

    const [pageSize, setPageSize] =
        useState(initialPageSize);

    const totalData = data.length;

    /**
     * Minimal selalu memiliki satu halaman.
     */
    const totalPage = Math.max(
        1,
        Math.ceil(totalData / pageSize),
    );

    function normalizePage(page: number): number {

        if (!Number.isFinite(page)) {
            return 1;
        }

        return Math.min(
            Math.max(Math.trunc(page), 1),
            totalPage,
        );

    }

    /**
     * Halaman efektif.
     */
    const effectivePage =
        normalizePage(currentPage);

    /**
     * Sinkronisasi state.
     */
    useEffect(() => {

        if (
            currentPage !== effectivePage
        ) {
            setCurrentPage(effectivePage);
        }

    }, [
        currentPage,
        effectivePage,
    ]);

    const startIndex =
        totalData === 0
            ? 0
            : (effectivePage - 1) * pageSize;

    const endIndex =
        totalData === 0
            ? -1
            : Math.min(
                  startIndex +
                      pageSize -
                      1,
                  totalData - 1,
              );

    const items = useMemo(() => {

        if (totalData === 0) {
            return [];
        }

        return data.slice(
            startIndex,
            startIndex + pageSize,
        );

    }, [
        data,
        startIndex,
        pageSize,
        totalData,
    ]);

    function next() {

        setCurrentPage((page) =>
            normalizePage(page + 1),
        );

    }

    function prev() {

        setCurrentPage((page) =>
            normalizePage(page - 1),
        );

    }

    function goTo(page: number) {

        setCurrentPage(
            normalizePage(page),
        );

    }

    /**
     * Mengubah page size.
     *
     * Posisi data yang sedang
     * dilihat akan dipertahankan.
     */
    function changePageSize(
        newPageSize: number,
    ) {

        if (
            !Number.isFinite(
                newPageSize,
            ) ||
            newPageSize <= 0
        ) {
            return;
        }

        // const firstVisibleIndex =
        //     startIndex;
        const firstVisibleIndex = (currentPage - 1) * pageSize;

        const nextPage =
            Math.floor(
                firstVisibleIndex /
                    newPageSize,
            ) + 1;

        setPageSize(
            Math.trunc(newPageSize),
        );

        setCurrentPage(nextPage);

    }

    const pageItems =
        useMemo(() => {

            return buildPageItems(
                effectivePage,
                totalPage,
            );

        }, [
            effectivePage,
            totalPage,
        ]);

    return {

        items,

        pageItems,

        currentPage:
            effectivePage,

        pageSize,

        totalPage,

        totalData,

        startIndex,

        endIndex,

        hasNext:
            effectivePage <
            totalPage,

        hasPrevious:
            effectivePage > 1,

        next,

        prev,

        goTo,

        changePageSize,

    };

}