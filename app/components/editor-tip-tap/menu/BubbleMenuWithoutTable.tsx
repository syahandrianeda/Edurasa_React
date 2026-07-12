
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
                    
                </BubbleToolbar>
    </BubbleMenu>
  )
}