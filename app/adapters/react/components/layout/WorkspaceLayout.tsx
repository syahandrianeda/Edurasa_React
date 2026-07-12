import { cn } from "~/lib/utils";

import type { WorkspaceLayoutProps }
from "./WorkspaceLayout.types";

export function WorkspaceLayout({

    header,

    footer,

    children,

    className

}:WorkspaceLayoutProps){

    return(

        <section

            className={cn(

                "flex",

                "flex-1",

                "flex-col",

                "overflow-hidden",

                className

            )}

        >

            {

                header &&

                (

                    <header

                        className="shrink-0"

                    >

                        {header}

                    </header>

                )

            }

            <main

                className="flex-1 overflow-hidden"

            >

                {children}

            </main>

            {

                footer &&

                (

                    <footer

                        className="shrink-0"

                    >

                        {footer}

                    </footer>

                )

            }

        </section>

    );

}