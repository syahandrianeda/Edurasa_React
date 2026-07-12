import {
    Children,
    isValidElement,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import { ChevronRight } from "lucide-react";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

import { BubbleGroupContext } from "./BubbleMenuContext";
import { BubbleGroupScopeContext } from "./BubbleGroupScope";
import { BubbleSubMenu } from "./BubbleSubMenu";
import { useBubbleMenu } from "./useBubbleMenu";

interface BubbleGroupButtonProps {

    id: string;

    icon?: ReactNode;

    children?: ReactNode;

    className?: string;

}

function BubbleGroupButtonComponent({

    id,

    icon,

    children,

    className,

}: BubbleGroupButtonProps) {

    const {
        closeVersion,
    } = useBubbleMenu();

    const scope = useContext(
        BubbleGroupScopeContext,
    );

    const [
        open,
        setOpen,
    ] = useState(false);

    const openMenu = useCallback(() => {

        setOpen(true);

        scope?.open(id);

    }, [

        id,

        scope,

    ]);

    const closeMenu = useCallback(() => {

        setOpen(false);

    }, []);

    const toggleMenu = useCallback(() => {

            if (open) {

                setOpen(false);

                return;

            }

            setOpen(true);

            scope?.open(id);

        }, [

            open,

            id,

            scope,

        ]);

    /**
     * Close seluruh menu.
     */
    useEffect(() => {

        setOpen(false);

    }, [

        closeVersion,

    ]);

    /**
     * Jika sibling menjadi active,
     * maka submenu ini harus ditutup.
     */
    useEffect(() => {

        if (!scope) {

            return;

        }

        if (

            scope.activeId &&
            scope.activeId !== id

        ) {

            setOpen(false);

        }

    }, [

        id,

        // scope,

        scope?.activeId,

    ]);

    const value = useMemo(() => ({

        id,

        open,

        openMenu,

        closeMenu,

        toggleMenu,

    }), [

        id,

        open,

        openMenu,

        closeMenu,

        toggleMenu,

    ]);

    const buttonChildren: ReactNode[] = [];

    let subMenu: ReactNode = null;

    Children.forEach(children, child => {

        if (

            isValidElement(child) &&
            child.type === BubbleSubMenu

        ) {

            subMenu = child;

            return;

        }

        buttonChildren.push(child);

    });

    return (

        <BubbleGroupContext.Provider
            value={value}
        >

            <div
                className="
                    relative
                    flex
                    flex-col
                "
            >

                <Button
                    type="button"
                    variant={
                        open
                            ? "default"
                            : "ghost"
                    }
                    className={cn(

                        "h-8",

                        "justify-between",

                        "gap-2",

                        className,

                    )}
                    onClick={toggleMenu}
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >

                        {icon}

                        {buttonChildren}

                    </div>

                    <ChevronRight
                        className="size-3"
                    />

                </Button>

                {subMenu}

            </div>

        </BubbleGroupContext.Provider>

    );

}

export const BubbleGroupButton = Object.assign(

    BubbleGroupButtonComponent,

    {

        SubMenu: BubbleSubMenu,

    },

);