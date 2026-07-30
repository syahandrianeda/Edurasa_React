export interface UsePaginationProps {
    /**
     * Ukuran halaman pertama kali.
     *
     * Default: 20
     */
    initialPageSize?: number;
}

export type PaginationPageItem =
    | {
          type: "page";
          page: number;
          active: boolean;
      }
    | {
          type: "ellipsis";
          id: "left" | "right";
      };

export interface UsePaginationResult<T> {
    /**
     * Data pada halaman aktif.
     */
    items: T[];

    /**
     * Informasi halaman yang digunakan oleh AppPagination.
     */
    pageItems: PaginationPageItem[];

    /**
     * Halaman aktif.
     */
    currentPage: number;

    /**
     * Jumlah data yang ditampilkan setiap halaman.
     */
    pageSize: number;

    /**
     * Total halaman.
     */
    totalPage: number;

    /**
     * Total seluruh data.
     */
    totalData: number;

    /**
     * Index awal data pada halaman aktif.
     */
    startIndex: number;

    /**
     * Index akhir data pada halaman aktif.
     */
    endIndex: number;

    /**
     * Apakah masih memiliki halaman berikutnya.
     */
    hasNext: boolean;

    /**
     * Apakah masih memiliki halaman sebelumnya.
     */
    hasPrevious: boolean;

    /**
     * Pindah ke halaman berikutnya.
     */
    next(): void;

    /**
     * Pindah ke halaman sebelumnya.
     */
    prev(): void;

    /**
     * Pindah ke halaman tertentu.
     */
    goTo(page: number): void;

    /**
     * Mengubah jumlah data per halaman.
     *
     * Posisi data yang sedang dilihat akan dipertahankan.
     */
    changePageSize(pageSize: number): void;
}