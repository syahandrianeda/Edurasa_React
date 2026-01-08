import { createContext, useCallback, useContext, useMemo, useState, type PropsWithChildren } from "react"
import { Button } from "../ui/button"
import { Eye, Trash } from "lucide-react"
import { Tooltip } from "../ui/tooltip"
import ButtonTooltip from "../ui_edura/button-tooltip"


interface FilePreviewContext{
    previewUrl: string | null
    setPreviewUrl: (fileId: string|null) => void
    currentId: string | null
    setCurrentId: (id: string|null) => void
    open: (fileId: string) => void
    close: () => void
    // zoom: number
    // zoomIn: () => void
    // zoomOut: () => void
    rotate: number,
    rotateLeft:()=>void;
    rotateRight:()=>void;
}

export const ContextFilePreview = createContext<FilePreviewContext|null>(null);

export const useFilePreview = ()=>{
    const cont = useContext(ContextFilePreview);
    if(!cont){
        throw new Error('Should Be use ContextFilePreview');
    }
    return cont;
}
export function FilePreviewProvider({
    
    children,
}: {
    children: React.ReactNode
}) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [currentId, setCurrentId] = useState<string | null>(null);
    // const [zoom, setZoom] = useState(1)
    const [rotate, setRotate] = useState(0);

    const open = useCallback(
        (fileId: string) => {
            setPreviewUrl(
            `https://drive.google.com/file/d/${fileId}/preview`
            )
           // setZoom(1)
            setRotate(0);
            setCurrentId(fileId)
       }

    ,[]);

    const close = () => {
        setPreviewUrl(null)
        // setZoom(1)
        setRotate(0);
        setCurrentId(null);
    }

    const value = useMemo(
        () => ({
        previewUrl,
        setPreviewUrl,
        // zoom,
        open,
        close,
        currentId,
        setCurrentId,
        // zoomIn: () => setZoom((z) => Math.min(z + 0.2, 3)),
        // zoomOut: () => setZoom((z) => Math.max(z - 0.2, 0.6)),
        rotate,
        rotateLeft:()=>setRotate((r) => (r - 90 + 360) % 360),
        rotateRight:()=>setRotate((r) => (r + 90) % 360)
        }),
        [previewUrl, rotate, currentId,setCurrentId]
    )

    return (
        <ContextFilePreview.Provider value={value}>
        {children}
        </ContextFilePreview.Provider>
    )
}

export function isValidFileId(value?: string | null): value is string {
    return typeof value === "string" && value.trim().length > 0
}

export function FileInputUpload({label, src, children}:PropsWithChildren<{label:string, src:string}>){
    const textUrl = isValidFileId(src)?src:''
    return (
        <div className="relative w-full mt-2">
            <div className="absolute rounded-t-xl text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-1 ps-2 z-10 origin-left bg-sky-300 dark:bg-gray-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-2 peer-placeholder-shown:w-[calc(100%-12px)] peer-focus:w-auto peer-focus:top-1 peer-focus:left-1 peer-focus:ps-1 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">{label}</div>
            <div >
                <input
                    className="block px-2.5 pb-2 pt-2 w-full text-sm text-gray-500 rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600  bg-sky-300 dark:bg-gray-700 peer"
                    readOnly
                    value={textUrl}
                    disabled
                    placeholder="Id Dokumen/ url Dokumen"
                    />
            </div>
            <div className="absolute w-fit top-1 right-1  text-xs">
                <div className="flex justify-center gap-2 pt-0">
                    {children}
                </div>
            </div>
        </div>
    )
}

export function ButtonPreviewFile({fileId}:{fileId:string}){
    if(!isValidFileId(fileId)) return null
    const {open} = useFilePreview();
    return (
        <ButtonTooltip asChild tooltip="Buka Preview" variant="default" className="bg-radial m-0 from-sky-500 to-sky-300 shadow-lg border border-sky-300 rounded-xl">
            <button onClick={(e)=>{
                e.preventDefault();
                open(fileId)
            }} ><Eye size={12}/></button>
        </ButtonTooltip>
    )
}

export function ButtonDeletePreview ({fileId, callBack}:{fileId:string, callBack:()=>void}){
    if(!isValidFileId(fileId)) return null;

    const {setPreviewUrl,close} = useFilePreview();
    return (
        <ButtonTooltip asChild tooltip="Hapus" variant="default" className="bg-radial m-0 from-sky-500 to-sky-300 shadow-lg border border-sky-300 rounded-xl">
            <button className="border border-black p-1 rounded-xl" onClick={(e)=>{
                    e.preventDefault();
                    close();
                    callBack();
                }}><Trash size={12}/></button>
            </ButtonTooltip>
    )
}
export function isRotatedVertical(rotation: number): boolean {
  return Math.abs(rotation % 180) === 90
}
export function FileIframeViewer() {
    const { previewUrl, rotate, rotateLeft, rotateRight, close } = useFilePreview();

    if (!previewUrl) return null
    console.log(isRotatedVertical(rotate));
    return (
        <div className="relative">
        
            <div className="absolute bottom-0 bg-amber-200 left-1/2 translate-y-1/2 z-10 flex gap-2 px-2">
            <button onClick={(e)=>{
                e.preventDefault();
                rotateLeft()
            }
            }>⟲</button>
            <button onClick={(e)=>{
                e.preventDefault();
                rotateRight()
            }}>⟳</button>
            
            </div>
            <iframe
            src={previewUrl}
            className={`${isRotatedVertical(rotate)?'w-50 h-50':'w-full h-full'}`}
            style={{
                transform: `rotate(${rotate}deg)`,
                // width: isRotatedVertical(rotate) ? "100%" : "50%",
                // height: isRotatedVertical(rotate) ? "100%" : "100%",
            }}
            />
        </div>
    )
}
