import type { ThType } from "../tabels/table-interface"
import { useRef, type ReactNode } from "react"

type PreviewColumnProps<T> = {
  index: number
  header: ThType<T>
  setValueHeader: (fn: (draft: ThType<T>[]) => void) => void
  children: ReactNode
}

type ResizeArgs = {
  onResize: (width: number) => void
  onReset: () => void
  minWidth?: number
}

export function usePreviewColumnResize({
  onResize,
  onReset, 
  minWidth = 60,
}: ResizeArgs) {
  const startXRef = useRef(0)
  const startWidthRef = useRef(0)

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    startXRef.current = e.clientX

    const parent = e.currentTarget.parentElement as HTMLDivElement
    startWidthRef.current = parent.offsetWidth

    const onMouseMove = (ev: MouseEvent) => {
      const delta = ev.clientX - startXRef.current
      const nextWidth = Math.max(minWidth, startWidthRef.current + delta)
      onResize(nextWidth)
    }

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)
  }

  return { onMouseDown , onDoubleClick: onReset }
}

export function PreviewColumn<T>({ index, header, setValueHeader,children }: PreviewColumnProps<T>) {
  const { onMouseDown, onDoubleClick } = usePreviewColumnResize({
    onResize: (width) => {
      setValueHeader((draft) => {
        draft[index].width = {
          mode: "fixed",
          value: width,
        }
      })
    },
    onReset: () => {
      setValueHeader((draft) => {
        draft[index].width = { mode: "auto" }
      })
    },
    minWidth:32
  })

  const style =
    header?.width?.mode === "fixed"
      ? { width: `${header.width.value}px` }
      : { flex: 1 }

  return (
    <div
      className="flex flex-col w-full items-center border-e text-sm relative"
      style={style}
    >
      {/* konten kamu */}
      {/* <div className="border-t w-full flex flex-col items-center border-amber-300">
        <span className={`${header.className || ""} w-full text-center`}>
          {header.label}
        </span>
      </div> */}
      {children}
      {/* handle */}
      <div
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}
        title="Double click untuk reset lebar"
        className="absolute right-0 top-0 h-full w-4 cursor-col-resize"
      />
    </div>
  )
}

