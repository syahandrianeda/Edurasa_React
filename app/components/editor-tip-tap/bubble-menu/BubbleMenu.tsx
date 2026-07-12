import {
    useEffect,
    type ReactNode,
} from "react";

import type { Editor } from "@tiptap/react";
import { BubbleMenu as TiptapBubbleMenu } from "@tiptap/react/menus";

import { BubbleMenuProvider } from "./BubbleMenuContext";
import { useBubbleMenu } from "./useBubbleMenu";

interface BubbleMenuProps {

    editor: Editor;

    children: ReactNode;

}

function BubbleMenuEvents() {

    const {

        closeAll,

    } = useBubbleMenu();

    /**
     * ESC
     */
    useEffect(() => {

        const onKeyDown = (
            event: KeyboardEvent,
        ) => {

            if (event.key === "Escape") {

                closeAll();

            }

        };

        window.addEventListener(
            "keydown",
            onKeyDown,
        );

        return () => {

            window.removeEventListener(
                "keydown",
                onKeyDown,
            );

        };

    }, [closeAll]);

    /**
     * Click outside BubbleMenu
     */
    useEffect(() => {

        const onPointerDown = (
            event: PointerEvent,
        ) => {

            const target =
                event.target as HTMLElement;

            if (
                target.closest(
                    "[data-bubble-menu]",
                )
            ) {

                return;

            }

            closeAll();

        };

        window.addEventListener(
            "pointerdown",
            onPointerDown,
        );

        return () => {

            window.removeEventListener(
                "pointerdown",
                onPointerDown,
            );

        };

    }, [closeAll]);

    /**
     * BubbleMenu unmount
     */
    useEffect(() => {

        return () => {

            closeAll();

        };

    }, [closeAll]);

    return null;

}

export function BubbleMenu({

    editor,

    children,

}: BubbleMenuProps) {

    return (

        <TiptapBubbleMenu
            editor={editor}
            options={{
                placement: "right-start",
            }}
        >

            <BubbleMenuProvider>

                <div
                    data-bubble-menu
                >

                    <BubbleMenuEvents />

                    {children}

                </div>

            </BubbleMenuProvider>

        </TiptapBubbleMenu>

    );

}