export type HeaderWidth =
  | { mode: "auto" }
  | { mode: "fixed"; value: number }

type HeaderPreview = {
    label: string
    className?: string
    width: HeaderWidth
}

