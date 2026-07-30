
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePagination } from "~/hooks/use-pagination";


const data = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
}));

describe("usePagination", () => {
    it("should initialize correctly", () => {
        const { result } = renderHook(() =>
            usePagination(data, {
                initialPageSize: 10,
            }),
        );

        expect(result.current.currentPage).toBe(1);
        expect(result.current.totalPage).toBe(10);
        expect(result.current.totalData).toBe(100);

        expect(result.current.startIndex).toBe(0);
        expect(result.current.endIndex).toBe(9);

        expect(result.current.items).toHaveLength(10);
        expect(result.current.items[0].id).toBe(1);
        expect(result.current.items[9].id).toBe(10);

        expect(result.current.hasPrevious).toBe(false);
        expect(result.current.hasNext).toBe(true);
    });

    it("should go to next page", () => {
        const { result } = renderHook(() =>
            usePagination(data, {
                initialPageSize: 10,
            }),
        );

        act(() => {
            result.current.next();
        });

        expect(result.current.currentPage).toBe(2);
        expect(result.current.startIndex).toBe(10);
        expect(result.current.endIndex).toBe(19);

        expect(result.current.items[0].id).toBe(11);
        expect(result.current.items[9].id).toBe(20);
    });

    it("should go to previous page", () => {
        const { result } = renderHook(() =>
            usePagination(data, {
                initialPageSize: 10,
            }),
        );

        act(() => {
            result.current.goTo(3);
        });

        act(() => {
            result.current.prev();
        });

        expect(result.current.currentPage).toBe(2);
        expect(result.current.items[0].id).toBe(11);
    });

    it("should go to specific page", () => {
        const { result } = renderHook(() =>
            usePagination(data, {
                initialPageSize: 10,
            }),
        );

        act(() => {
            result.current.goTo(5);
        });

        expect(result.current.currentPage).toBe(5);
        expect(result.current.items[0].id).toBe(41);
        expect(result.current.items[9].id).toBe(50);
    });

    it("should stay on last page when next() is called", () => {
        const { result } = renderHook(() =>
            usePagination(data, {
                initialPageSize: 10,
            }),
        );

        act(() => {
            result.current.goTo(10);
        });

        act(() => {
            result.current.next();
        });

        expect(result.current.currentPage).toBe(10);
        expect(result.current.hasNext).toBe(false);
    });

    it("should stay on first page when prev() is called", () => {
        const { result } = renderHook(() =>
            usePagination(data, {
                initialPageSize: 10,
            }),
        );

        act(() => {
            result.current.prev();
        });

        expect(result.current.currentPage).toBe(1);
        expect(result.current.hasPrevious).toBe(false);
    });

    it("should clamp page when goTo() exceeds range", () => {
        const { result } = renderHook(() =>
            usePagination(data, {
                initialPageSize: 10,
            }),
        );

        act(() => {
            result.current.goTo(999);
        });

        expect(result.current.currentPage).toBe(10);

        act(() => {
            result.current.goTo(-100);
        });

        expect(result.current.currentPage).toBe(1);
    });

    it("should synchronize currentPage when data shrinks", () => {
        const { result, rerender } = renderHook(
            ({ data }) =>
                usePagination(data, {
                    initialPageSize: 10,
                }),
            {
                initialProps: {
                    data,
                },
            },
        );

        act(() => {
            result.current.goTo(10);
        });

        expect(result.current.currentPage).toBe(10);

        const smallerData = data.slice(0, 15);

        rerender({
            data: smallerData,
        });

        expect(result.current.currentPage).toBe(2);
        expect(result.current.totalPage).toBe(2);
        expect(result.current.items).toHaveLength(5);
        expect(result.current.items[0].id).toBe(11);
    });

    it("should handle empty data", () => {
        const { result } = renderHook(() =>
            usePagination([], {
                initialPageSize: 10,
            }),
        );

        expect(result.current.currentPage).toBe(1);
        expect(result.current.totalPage).toBe(1);
        expect(result.current.totalData).toBe(0);

        expect(result.current.startIndex).toBe(0);
        expect(result.current.endIndex).toBe(-1);

        expect(result.current.items).toEqual([]);

        expect(result.current.hasNext).toBe(false);
        expect(result.current.hasPrevious).toBe(false);
    });

    it("should normalize invalid page values", () => {
            const { result } = renderHook(() =>
                usePagination(data, {
                    initialPageSize: 10,
                }),
            );

            act(() => {
                result.current.goTo(2.8);
            });

            expect(result.current.currentPage).toBe(2);

            act(() => {
                result.current.goTo(Number.NaN);
            });

            expect(result.current.currentPage).toBe(1);

            act(() => {
                result.current.goTo(Number.POSITIVE_INFINITY);
            });

            expect(result.current.currentPage).toBe(1);

            act(() => {
                result.current.goTo(Number.NEGATIVE_INFINITY);
            });

            expect(result.current.currentPage).toBe(1);
        });
});