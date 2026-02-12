import type { InputTypeEditor } from "./interface-title-description"

export type EditorSectionKey =
  | 'judul'
  | 'paragrafAtas'
  | 'paragrafBawah'
  | 'catatan'
  | 'alignHeader'
  | 'alignColumn'

export type EditorFormatState = {
  // [K in EditorSectionKey]?: InputTypeEditor
  judul?: InputTypeEditor[]
  paragrafAtas?: InputTypeEditor
  paragrafBawah?: InputTypeEditor
  catatan?: InputTypeEditor
  alignHeader?: InputTypeEditor
  alignColumn?: InputTypeEditor
}

