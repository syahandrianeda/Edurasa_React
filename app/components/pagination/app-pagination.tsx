import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "~/components/ui/pagination";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";

import type { UsePaginationResult } from "../../domain/pagination/types";

interface AppPaginationProps {
    pagination: Pick<
        UsePaginationResult<unknown>,
        | "pageItems"
        | "hasNext"
        | "hasPrevious"
        | "next"
        | "prev"
        | "goTo"
        | "pageSize"
        | "changePageSize"
    >;

    pageSizeOptions?: number[];
}

export default function AppPagination({
    pagination,
    pageSizeOptions = [5, 10, 20, 50, 100],
}: AppPaginationProps) {

    const {
        pageItems,
        hasNext,
        hasPrevious,
        next,
        prev,
        goTo,
        pageSize,
        changePageSize,
    } = pagination;

    return (

        <div className="flex items-center justify-between gap-4 mt-4 text-xs print:hidden">
            

            <div className="flex items-center gap-2">

                <span className="text-sm text-muted-foreground">
                    Show
                </span>

                <Select

                    value={pageSize.toString()}

                    onValueChange={(value) =>
                        changePageSize(
                            Number(value),
                        )
                    }

                >

                    <SelectTrigger
                        className="w-20"
                    >
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>

                        {
                            pageSizeOptions.map(
                                (size) => (

                                    <SelectItem
                                        key={size}
                                        value={size.toString()}
                                    >
                                        {size}
                                    </SelectItem>

                                ),
                            )
                        }

                    </SelectContent>

                </Select>

            </div>
            <Pagination>

                <PaginationContent>

                    <PaginationItem>

                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {

                                e.preventDefault();

                                if (hasPrevious) {
                                    prev();
                                }

                            }}
                            className={
                                !hasPrevious
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }
                        />

                    </PaginationItem>

                    {
                        pageItems.map((item) => {

                            if (item.type === "ellipsis") {

                                return (
                                    <PaginationItem
                                        key={item.id}
                                    >
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                );

                            }

                            return (

                                <PaginationItem
                                    key={item.page}
                                >

                                    <PaginationLink

                                        href="#"

                                        isActive={
                                            item.active
                                        }

                                        onClick={(e) => {

                                            e.preventDefault();

                                            goTo(item.page);

                                        }}

                                    >
                                        {item.page}
                                    </PaginationLink>

                                </PaginationItem>

                            );

                        })
                    }

                    <PaginationItem>

                        <PaginationNext

                            href="#"

                            onClick={(e) => {

                                e.preventDefault();

                                if (hasNext) {
                                    next();
                                }

                            }}

                            className={
                                !hasNext
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }

                        />

                    </PaginationItem>

                </PaginationContent>

            </Pagination>

        </div>

    );

}