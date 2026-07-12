import {
    useLayoutEffect,
    useRef,
    useState,
    type HTMLAttributes,
    type ReactNode,
} from "react";

import { cn } from "~/lib/utils";

import { BubbleGroupScope } from "./BubbleGroupScope";
import { useBubbleGroup } from "./useBubbleMenu";

interface BubbleSubMenuProps
    extends HTMLAttributes<HTMLDivElement> {

    children?: ReactNode;

}

type Placement =
    | "right"
    | "left";

function calculatePlacement(
    element: HTMLDivElement,
): Placement {

    const rect =
        element.getBoundingClientRect();

    /**
     * Masih cukup ruang di kanan.
     */
    if (
        rect.right <=
        window.innerWidth
    ) {

        return "right";

    }

    /**
     * Simulasi apabila submenu
     * dibuka ke kiri.
     */
    const simulatedLeft =
        rect.left - rect.width;

    /**
     * Masih muat di kiri.
     */
    if (
        simulatedLeft >= 0
    ) {

        return "left";

    }

    /**
     * Kiri dan kanan sama-sama
     * tidak muat.
     *
     * Untuk saat ini tetap gunakan
     * kanan.
     */
    return "right";

}

export function BubbleSubMenu({

    children,

    className,

    ...props

}: BubbleSubMenuProps) {

    const {

        open,

    } = useBubbleGroup();

    const submenuRef =
        useRef<HTMLDivElement>(null);

    const [

        placement,

        setPlacement,

    ] = useState<Placement>("right");

    useLayoutEffect(() => {

        if (!open) {

            return;

        }

        const element =
            submenuRef.current;

        if (!element) {

            return;

        }

        setPlacement(
            calculatePlacement(
                element,
            ),
        );

    }, [

        open,

    ]);

    if (!open) {

        return null;

    }

    return (

        <div
            ref={submenuRef}
            className={cn(

                "absolute",

                "top-0",

                placement === "right"
                    ? "left-full ml-1"
                    : "right-full mr-1",

                "rounded-md",

                "border",

                "bg-background",

                "shadow-lg",

                className,

            )}
            {...props}
        >

            <BubbleGroupScope>

                <div
                    className="
                        flex
                        flex-col
                        gap-1
                        p-1
                    "
                >

                    {children}

                </div>

            </BubbleGroupScope>

        </div>

    );

}
// import type {
//     HTMLAttributes,
//     ReactNode,
// } from "react";

// import { cn } from "~/lib/utils";

// import { BubbleGroupScope } from "./BubbleGroupScope";
// import { useBubbleGroup } from "./useBubbleMenu";

// interface BubbleSubMenuProps
//     extends HTMLAttributes<HTMLDivElement> {

//     children?: ReactNode;

// }

// export function BubbleSubMenu({

//     children,

//     className,

//     ...props

// }: BubbleSubMenuProps) {

//     const {

//         open,

//     } = useBubbleGroup();

//     if (!open) {

//         return null;

//     }

//     return (

//         <div
//             className={cn(

//                 "absolute",

//                 "left-full",

//                 "top-0",

//                 "ml-1",

//                 "rounded-md",

//                 "border",

//                 "bg-background",

//                 "shadow-lg",

//                 className,

//             )}
//             {...props}
//         >

//             <BubbleGroupScope>

//                 <div
//                     className="
//                         flex
//                         flex-col
//                         gap-1
//                         p-1
//                     "
//                 >

//                     {children}

//                 </div>

//             </BubbleGroupScope>

//         </div>

//     );

// }