import { Editor } from '@tiptap/react'
import { Button } from '~/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel } from '~/components/ui/dropdown-menu'
import { AlignCenterHorizontal, AlignCenterVertical, AlignEndHorizontal, AlignEndVertical, AlignHorizontalSpaceAround, AlignStartHorizontal, AlignStartVertical, AlignVerticalSpaceAround, Bold, Columns4, Italic, Merge, MergeIcon, PlusIcon, Rows4Icon, Split, Table2, TableCellsMerge, TableCellsSplit, Trash2 } from 'lucide-react'
import type { GroupSectionsMenuBubble } from '../type'
import { BubbleButton, BubbleGroupButton, BubbleMenu, BubbleToolbar } from '../bubble-menu'

export function BubbleMenuAsContextMenu({ editor, editorStateData }:{editor:Editor, editorStateData:any}) {
  return (
    <BubbleMenu editor={editor}>
        <BubbleToolbar>

                    <BubbleButton
                        icon={<Bold className="size-3" />}
                        onClick={() => editor .chain() .focus() .toggleBold() .run() }
                    >
                        Bold
                    </BubbleButton>

                    <BubbleButton
                        icon={<Italic className="size-3" />}
                        onClick={() => editor .chain() .focus() .toggleItalic() .run() }
                    >
                        Italic
                    </BubbleButton>
                    {
                        editorStateData.isTable && (
                            <BubbleGroupButton
                                id="table"
                                icon={<Table2 className="size-4"/>}
                            >
                                Tabel
                                <BubbleGroupButton.SubMenu>
                                    {/* saya tes submenu di dalam submenu */}
                                    <BubbleGroupButton
                                        id="rows"
                                        icon={<Rows4Icon className="size-3" />}
                                    >
                                        Baris
                                        <BubbleGroupButton.SubMenu>
                                            <BubbleButton
                                                icon={<PlusIcon className="size-3" />}
                                                onClick={() =>editor.chain().focus().addRowBefore().run()
                                                }
                                            >Tambah Baris di atas</BubbleButton>
                                            <BubbleButton
                                                icon={<PlusIcon className="size-3" />}
                                                onClick={() =>editor.chain().focus().addRowAfter().run()
                                                }
                                            >Tambah Baris di bawah</BubbleButton>
                                            <BubbleButton
                                                icon={<Trash2 className="size-3" />}
                                                onClick={() =>editor.chain().focus().deleteRow().run()
                                                }
                                            >Hapus Baris</BubbleButton>
                                            
                                        </BubbleGroupButton.SubMenu>
                                    </BubbleGroupButton>
                                    <BubbleGroupButton
                                        id="columns"
                                        icon={<Columns4 className="size-3" />}
                                    >
                                        Kolom
                                        <BubbleGroupButton.SubMenu>
                                            <BubbleButton
                                                icon={<PlusIcon className="size-3" />}
                                                onClick={() =>editor.chain().focus().addColumnBefore().run()
                                                }
                                            >Tambah Kolom di kiri</BubbleButton>
                                            <BubbleButton
                                                icon={<PlusIcon className="size-3" />}
                                                onClick={() =>editor.chain().focus().addColumnAfter().run()
                                                }
                                            >Tambah Kolom di kanan</BubbleButton>
                                            <BubbleButton
                                                icon={<Trash2 className="size-3" />}
                                                onClick={() =>editor.chain().focus().deleteColumn().run()
                                                }
                                            >Hapus Kolom</BubbleButton>
                                            
                                        </BubbleGroupButton.SubMenu>
                                    </BubbleGroupButton>
                                    {
                                        editorStateData.canMergeCells && (
                                            <BubbleButton
                                                icon={<TableCellsMerge className="size-3" />}
                                                onClick={() =>
                                                    editor
                                                        .chain()
                                                        .focus()
                                                        .mergeCells()
                                                        .run()
                                                }
                                            >Merge</BubbleButton>
                                        )
                                    }
                                    {
                                        editorStateData.canSplitCell && (
                                            <BubbleButton
                                                icon={<TableCellsSplit className="size-3" />}
                                                onClick={() =>
                                                    editor
                                                        .chain()
                                                        .focus()
                                                        .splitCell()
                                                        .run()
                                                }
                                            >Split</BubbleButton>
                                        )
                                    }
                                    

                                    <BubbleGroupButton
                                        id="align"
                                        icon={<AlignVerticalSpaceAround className="size-3" />}
                                    
                                    >
                                        Vertical Align
                                        <BubbleGroupButton.SubMenu>
                                            <BubbleButton
                                                icon={<AlignStartHorizontal className="size-3" />}
                                                onClick={() =>editor.chain().focus().setCellVerticalAlign("top").run()
                                                }
                                            >Atas</BubbleButton>
                                            <BubbleButton
                                                icon={<AlignCenterHorizontal className="size-3" />}
                                                onClick={() =>editor.chain().focus().setCellVerticalAlign("middle").run()
                                                }
                                            >Tengah</BubbleButton>
                                            <BubbleButton
                                                icon={<AlignEndHorizontal className="size-3" />}
                                                onClick={() =>editor.chain().focus().setCellVerticalAlign("bottom").run()
                                                }
                                            >Bawah</BubbleButton>
                                        </BubbleGroupButton.SubMenu>

                                    </BubbleGroupButton>
                                    <BubbleGroupButton
                                        id="cel-align-vertical"
                                        icon={<AlignHorizontalSpaceAround className="size-3" />}
                                    
                                    >
                                        Horizontal Align
                                        <BubbleGroupButton.SubMenu>
                                            <BubbleButton
                                                icon={<AlignStartVertical className="size-3" />}
                                                onClick={() =>editor.chain().focus().setTextAlign('left').run()
                                                }
                                            >Kiri</BubbleButton>
                                            <BubbleButton
                                                icon={<AlignCenterVertical className="size-3" />}
                                                onClick={() =>editor.chain().focus().setTextAlign('center').run()
                                                }
                                            >Tengah</BubbleButton>
                                            <BubbleButton
                                                icon={<AlignEndHorizontal className="size-3" />}
                                                onClick={() =>editor.chain().focus().setTextAlign('right').run()
                                                }
                                            >Kanan</BubbleButton>
                                        </BubbleGroupButton.SubMenu>

                                    </BubbleGroupButton>

                                </BubbleGroupButton.SubMenu>

                            </BubbleGroupButton>
                        )
                    }

                </BubbleToolbar>
    </BubbleMenu>
  )
}