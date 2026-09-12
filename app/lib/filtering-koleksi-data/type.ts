// export type FilterValue<T> =
//     | T
//     | readonly T[]
//     | null
//     | undefined;

// export type FilterValues<T> = Partial<{
//     [K in keyof T]: FilterValue<T[K]>;
// }>;

// // export type FilterValue<T> =
// //     | (
// //         T extends readonly (infer U)[]
// //             ? U | readonly U[]
// //             : T | readonly T[]
// //       )
// //     | null
// //     | undefined;

// // export type FilterValues<T> = Partial<{
// //     [K in keyof T]: FilterValue<T[K]>;
// // }>;

export type FilterValue<T> =
    | T
    | readonly T[]
    | null
    | undefined;

export type FilterValues<T> = Partial<{
    [K in keyof T]: FilterValue<T[K]>;
}>;