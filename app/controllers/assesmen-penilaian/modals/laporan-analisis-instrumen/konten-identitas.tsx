import type { ReactNode } from "node_modules/@types/react";

export default function KontentIdentitas ({keterangan, konten}:{keterangan:string, konten:ReactNode}){
    return (
        <div className='flex w-full justify-between border-b border-sky-600 border-dashed'>
            <div>{keterangan}</div>
            {konten}
        </div> 
    )
}