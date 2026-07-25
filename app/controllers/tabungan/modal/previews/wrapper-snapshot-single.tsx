import type { ReactNode } from "react";

export default function WrapperSnapshot({children}:{children:ReactNode}){
    return (
        <div className="flex gap-2 space-x-2 bg-linear-to-tl m-0 from-sky-300 to-sky-200 p-2  max-h-[calc(100vh-12.5rem)]  md:overflow-y-auto scrol-h-custom">
                <div className="border w-full mx-auto rounded-2xl bg-linear-to-tl from-sky-200 to-sky-100  border-sky-500 inset-shadow-sky-600 shadow-lg p-1 overflow-y-auto scrol-h-custom">
                {children}
                </div>
        </div>   
    )
}