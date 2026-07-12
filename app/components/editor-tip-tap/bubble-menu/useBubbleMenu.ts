import { useContext } from "react";

import {
    BubbleGroupContext,
    BubbleMenuContext,
} from "./BubbleMenuContext";

export function useBubbleMenu() {

    const context = useContext(
        BubbleMenuContext,
    );

    if (!context) {

        throw new Error(
            "useBubbleMenu must be used inside BubbleMenuProvider.",
        );

    }

    return context;

}

export function useBubbleGroup() {

    const context = useContext(
        BubbleGroupContext,
    );

    if (!context) {

        throw new Error(
            "useBubbleGroup must be used inside BubbleGroupButton.",
        );

    }

    return context;

}
