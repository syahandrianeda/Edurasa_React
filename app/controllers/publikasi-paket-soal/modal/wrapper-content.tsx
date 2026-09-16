import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

export default function WrapperContent({className, children}:{className:string, children:ReactNode}){
    return (
        <div className="flex justify-center p-4 h-full overflow-y-auto scrol-h-custom bg-linear-to-br from-sky-300 via-purple-300 to-amber-300">
            <div className={cn(" mx-auto p-4 border h-[calc(100vh-13rem)]  bg-sky-100 rounded-2xl shadow-lg shadow-sky-600 overflow-y-auto scrol-h-custom", className)}>
                {children}
            </div>
        </div>
    )
}