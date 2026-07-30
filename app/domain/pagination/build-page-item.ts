import type { PaginationPageItem } from "./types";

export function buildPageItems(
    currentPage: number,
    totalPage: number,
): PaginationPageItem[] {

    const items: PaginationPageItem[] = [];

    /**
     * Semua halaman sedikit.
     */
    if (totalPage <= 7) {
        for (let page = 1; page <= totalPage; page++) {
            items.push({
                type: "page",
                page,
                active: page === currentPage,
            });
        }

        return items;
    }

    /**
     * Selalu tampilkan halaman pertama.
     */
    items.push({
        type: "page",
        page: 1,
        active: currentPage === 1,
    });

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPage - 1, currentPage + 2);

    /**
     * Ellipsis kiri.
     */
    if (start > 2) {
        items.push({
            type: "ellipsis",
            id: "left",
        });
    }

    /**
     * Halaman tengah.
     */
    for (let page = start; page <= end; page++) {
        items.push({
            type: "page",
            page,
            active: page === currentPage,
        });
    }

    /**
     * Ellipsis kanan.
     */
    if (end < totalPage - 1) {
        items.push({
            type: "ellipsis",
            id: "right",
        });
    }

    /**
     * Halaman terakhir.
     */
    items.push({
        type: "page",
        page: totalPage,
        active: currentPage === totalPage,
    });

    return items;
}