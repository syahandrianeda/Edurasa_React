import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";

// import {
//     Pagination,
//     PaginationContent,
//     PaginationEllipsis,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious,
// } from "@/components/ui/pagination";

import type {
    PaginationPageItem,
} from "../../domain/pagination/types";

interface AppPaginationProps {

    pageItems: PaginationPageItem[];

    next: () => void;
    prev: () => void;

    hasNext: boolean;
    hasPrevious: boolean;

    goTo: (page:number)=>void;
}

export default function AppPagination({

    pageItems,

    next,
    prev,

    hasNext,
    hasPrevious,

    goTo,

}:AppPaginationProps){

    return (

        <Pagination>

            <PaginationContent>

                <PaginationItem>

                    <PaginationPrevious

                        href="#"

                        onClick={(e)=>{
                            e.preventDefault();

                            if(hasPrevious){
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
                    pageItems.map((item)=>{

                        if(item.type==="ellipsis"){

                            return(

                                <PaginationItem
                                    key={item.id}
                                >

                                    <PaginationEllipsis/>

                                </PaginationItem>

                            );

                        }


                        return(

                            <PaginationItem
                                key={item.page}
                            >

                                <PaginationLink

                                    href="#"

                                    isActive={item.active}

                                    onClick={(e)=>{
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

                        onClick={(e)=>{
                            e.preventDefault();

                            if(hasNext){
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

    );

}

// interface AppPaginationProps {
//     currentPage: number;
//     totalPage: number;

//     hasNext: boolean;
//     hasPrevious: boolean;

//     next: () => void;
//     prev: () => void;
//     goTo: (page:number) => void;
// }


// export default function AppPagination({
//     currentPage,
//     totalPage,

//     hasNext,
//     hasPrevious,

//     next,
//     prev,

//     goTo,
// }: AppPaginationProps) {


//     return (
//         <Pagination>
//             <PaginationContent>

//                 <PaginationItem>
//                     <PaginationPrevious
//                         onClick={prev}
//                         className={
//                             !hasPrevious
//                                 ? "pointer-events-none opacity-50"
//                                 : ""
//                         }
//                     />
//                 </PaginationItem>


//                 {
//                     Array.from(
//                         {
//                             length: totalPage,
//                         },
//                         (_, index) => index + 1,
//                     )
//                     .map((page)=>(
//                         <PaginationItem
//                             key={page}
//                         >
//                             <PaginationLink
//                                 isActive={
//                                     page === currentPage
//                                 }
//                                 onClick={() =>
//                                     goTo(page)
//                                 }
//                             >
//                                 {page}
//                             </PaginationLink>
//                         </PaginationItem>
//                     ))
//                 }


//                 <PaginationItem>
//                     <PaginationNext
//                         onClick={next}
//                         className={
//                             !hasNext
//                                 ? "pointer-events-none opacity-50"
//                                 : ""
//                         }
//                     />
//                 </PaginationItem>

//             </PaginationContent>
//         </Pagination>
//     );
// }