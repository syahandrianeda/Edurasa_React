import type { headingComp, ImageNodeEdura, paragraphEdura,  TableKop, TableTtd } from "./type-comp";
import type { listNodeEdura, TableParseCommon } from "./type-table";

export type ParsedElementEdura = 
    | headingComp
    | TableKop
    | TableTtd
    | ImageNodeEdura
    | TableParseCommon
    | paragraphEdura
    | listNodeEdura
    ;
