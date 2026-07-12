import { Editor, useEditorState, type EditorStateSnapshot, type JSONContent, type UseEditorStateOptions } from "@tiptap/react";
import type { ButtonMenuTiptap, GroupSectionsMenu, GroupSectionsMenuBubble, GroupToolbarTiptap, OptionsMenu } from "../type";
import { 
    BoldIcon, 
    Heading1Icon, 
    Heading2Icon, 
    Heading3Icon, 
    ItalicIcon, 
    List, 
    ListOrdered, 
    TextAlignCenter, 
    TextAlignEndIcon, 
    TextAlignJustify, 
    TextAlignStartIcon, 
    UnderlineIcon, 
    ArrowUpToLine,
    ArrowDownToLine,
    ArrowLeftToLine,
    ArrowRightToLine,
    Trash2,
    TableCellsMerge,
    SplitSquareVertical,
    Heading1,
    Heading2,
    Heading3,
    Maximize,
    Minimize,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    } from "lucide-react"; 
import { groupToolbarOptions, groupToolbarOptionsBubble } from "../utils/ut-group-by";
import { CellSelection } from "@tiptap/pm/tables";

interface CreateOptionsToggleMenuTiptapReturn {
    opsiToolbar: GroupSectionsMenu[],
    editorStateData: any,
    bubbleForTable:GroupSectionsMenuBubble[]
}

export function createOptionsToggleMenuTiptap(editor: Editor): CreateOptionsToggleMenuTiptapReturn {
    const editorState = useEditorState({
        editor,
        selector: ({ editor }) => {

        const selection = editor.state.selection;

        const isTableSelection = selection instanceof CellSelection;

        const selectedCells = isTableSelection ? selection.ranges.length : 0;

            return {
                // Text formatting
                isBold: editor.isActive('bold') ?? false,
                isItalic: editor.isActive('italic') ?? false,
                isUnderline: editor.isActive('underline') ?? false,
                isStrike: editor.isActive('strike') ?? false,
                isHighlight: editor.isActive('highlight') ?? false,

                // Text alignment
                isAlignLeft: editor.isActive({ textAlign: 'left' }) ?? false,
                isAlignCenter: editor.isActive({ textAlign: 'center' }) ?? false,
                isAlignRight: editor.isActive({ textAlign: 'right' }) ?? false,
                isAlignJustify: editor.isActive({ textAlign: 'justify' }) ?? false,

                // Block types
                isParagraph: editor.isActive('paragraph') ?? false,
                isHeading1: editor.isActive('heading', { level: 1 }) ?? false,
                isHeading2: editor.isActive('heading', { level: 2 }) ?? false,
                isHeading3: editor.isActive('heading', { level: 3 }) ?? false,
                // isPecahanBiasa: editor.$nodes
                isFocused: editor.isFocused,
                isBulletList: editor.isActive('bulletList'),
                isOrderedList: editor.isActive('orderedList'),
                // ===========================
                // Table
                // ===========================

                isTable: editor.isActive("table"),
                isTableHeader: editor.isActive("tableHeader"),
                isTableCell: editor.isActive("tableCell"),
                isTableRow: editor.isActive("tableRow"),
                isTableSelection,
                selectedCells,
                isSingleCell: isTableSelection && selectedCells === 1,
                isMultipleCells: isTableSelection && selectedCells > 1,
                canMergeCells: editor.can().mergeCells(),
                canSplitCell: editor.can().splitCell(),
                canAddColumnBefore: editor.can().addColumnBefore(),
                canAddColumnAfter: editor.can().addColumnAfter(),
                canDeleteColumn: editor.can().deleteColumn(),
                canAddRowBefore: editor.can().addRowBefore(),
                canAddRowAfter: editor.can().addRowAfter(),
                canDeleteRow: editor.can().deleteRow(),
                canDeleteTable: editor.can().deleteTable(),
                canToggleHeaderRow: editor.can().toggleHeaderRow(),
                canToggleHeaderColumn: editor.can().toggleHeaderColumn(),
                canToggleHeaderCell: editor.can().toggleHeaderCell(),
                

                // ===========================
                // Insert
                // ===========================

                canInsertTable: editor.can().insertTable(),

                // ===========================
                // Navigation
                // ===========================

                canGoToNextCell: editor.can().goToNextCell(),
                canGoToPreviousCell: editor.can().goToPreviousCell(),

                // ===========================
                // Cell
                // ===========================

                canMergeOrSplit: editor.can().mergeCells() || editor.can().splitCell(),
                //----------------
                // has property
                //-------------
                hasTable: editor.isActive("table"),

                hasCellSelection: selection instanceof CellSelection,

                hasTextSelection: !selection.empty,

                isCursorInTable: editor.isActive("table"),
                
                
            }
        },
    });
    const optionsMenu: OptionsMenu[] = [
            //formating fonts: bold, italic, underline:
            {
                id: 'bold',
                icon: BoldIcon,
                onClick: () => editor.chain().focus().toggleBold().run(),
                pressed: editorState.isBold,
                group: 'huruf'
            },
            {
                id: 'italic',
                icon: ItalicIcon,
                onClick: () => editor.chain().focus().toggleItalic().run(),
                pressed: editorState.isItalic,  
                group: 'huruf'
            },
            {
                id:'underline',
                icon: UnderlineIcon,
                onClick: () => editor.chain().focus().toggleUnderline().run(),
                pressed: editorState.isUnderline,
                group: 'huruf'
            },
            //formating style: heading
            // {
            //     id:'h1',
            //     icon: Heading1Icon,
            //     onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            //     pressed: editorState.isHeading1,
            //     group: 'paragraf'
            // },
            // {
            //     id:'h2',
            //     icon: Heading2Icon,
            //     onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            //     pressed: editorState.isHeading2,
            //     group: 'paragraf'
            // },
            // {
            //     id:'h3',
            //     icon: Heading3Icon,
            //     onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            //     pressed: editorState.isHeading3,  
            //     group: 'paragraf'  
            // },
            // // alignment: left, center, right, justify
            // {
            //     id:'left-text-align',
            //     icon: TextAlignStartIcon,
            //     onClick: () => editor.chain().focus().setTextAlign('left').run(),
            //     pressed: editorState.isAlignLeft,
            //     group: 'paragraf'
            // },
            // {
            //     id:'center-text-align',
            //     icon: TextAlignCenter,
            //     onClick: () => editor.chain().focus().setTextAlign('center').run(),
            //     pressed: editorState.isAlignCenter,
            //     group: 'paragraf'
            // },
            // {
            //     id:'right-text-align',
            //     icon: TextAlignEndIcon,
            //     onClick: () => editor.chain().focus().setTextAlign('right').run(),
            //     pressed: editorState.isAlignRight,  
            //     group: 'paragraf'
            // },
            // {
            //     id:'justify-text-align',
            //     icon: TextAlignJustify,
            //     onClick: () => editor.chain().focus().setTextAlign('justify').run(),
            //     pressed: editorState.isAlignJustify,
            //     group: 'paragraf'
            // },
            // // list
            // {
            //     id:'list',
            //     icon: List,
            //     onClick: ()=> editor.chain().focus().toggleBulletList().run(),
            //     pressed: editorState.isBulletList,
            //     group: 'paragraf'
            // },
            // {
            //     id:'list-ordered',
            //     icon: ListOrdered,
            //     onClick: ()=> editor.chain().focus().toggleOrderedList().run(),
            //     pressed: editorState.isOrderedList,
            //     group: 'paragraf'
            // }

        ];
    const opsiBubbleTable: ButtonMenuTiptap[] = [
        // ========================
        // Rows & Columns
        // ========================

        {
            id: "addRowBefore",
            icon: ArrowUpToLine,
            group: "rows-columns",
            isShow: editorState.isTable,
            onClick: () => editor.chain().focus().addRowBefore().run(),
        },

        {
            id: "addRowAfter",
            icon: ArrowDownToLine,
            group: "rows-columns",
            isShow: editorState.isTable,
            onClick: () => editor.chain().focus().addRowAfter().run(),
        },

        {
            id: "deleteRow",
            icon: Trash2,
            group: "rows-columns",
            isShow: editorState.canDeleteRow,
            onClick: () => editor.chain().focus().deleteRow().run(),
        },

        {
            id: "addColumnBefore",
            icon: ArrowLeftToLine,
            group: "rows-columns",
            isShow: editorState.isTable,
            onClick: () => editor.chain().focus().addColumnBefore().run(),
        },

        {
            id: "addColumnAfter",
            icon: ArrowRightToLine,
            group: "rows-columns",
            isShow: editorState.isTable,
            onClick: () => editor.chain().focus().addColumnAfter().run(),
        },

        {
            id: "deleteColumn",
            icon: Trash2,
            group: "rows-columns",
            isShow: editorState.canDeleteColumn,
            onClick: () => editor.chain().focus().deleteColumn().run(),
        },

        // ========================
        // Merge
        // ========================

        {
            id: "mergeCells",
            icon: TableCellsMerge,
            group: "merge",
            isShow: editorState.canMergeCells,
            onClick: () => editor.chain().focus().mergeCells().run(),
        },

        {
            id: "splitCell",
            icon: SplitSquareVertical,
            group: "merge",
            isShow: editorState.canSplitCell,
            onClick: () => editor.chain().focus().splitCell().run(),
        },

        // ========================
        // Header
        // ========================

        {
            id: "toggleHeaderRow",
            icon: Heading1,
            group: "header",
            isShow: editorState.canToggleHeaderRow,
            onClick: () => editor.chain().focus().toggleHeaderRow().run(),
        },

        {
            id: "toggleHeaderColumn",
            icon: Heading2,
            group: "header",
            isShow: editorState.canToggleHeaderColumn,
            onClick: () => editor.chain().focus().toggleHeaderColumn().run(),
        },

        {
            id: "toggleHeaderCell",
            icon: Heading3,
            group: "header",
            isShow: editorState.canToggleHeaderCell,
            onClick: () => editor.chain().focus().toggleHeaderCell().run(),
        },

        // ========================
        // Cell Size (custom)
        // ========================

        {
            id: "increaseCellWidth",
            icon: Maximize,
            group: "cell-size",
            isShow: editorState.isTable,
            onClick: () => {},
        },

        {
            id: "decreaseCellWidth",
            icon: Minimize,
            group: "cell-size",
            isShow: editorState.isTable,
            onClick: () => {},
        },

        // ========================
        // Cell Alignment (custom)
        // ========================

        {
            id: "alignLeft",
            icon: AlignLeft,
            group: "cell-alignment",
            isShow: editorState.isTable,
            onClick: () => {},
        },

        {
            id: "alignCenter",
            icon: AlignCenter,
            group: "cell-alignment",
            isShow: editorState.isTable,
            onClick: () => {},
        },

        {
            id: "alignRight",
            icon: AlignRight,
            group: "cell-alignment",
            isShow: editorState.isTable,
            onClick: () => {},
        },

        {
            id: "alignJustify",
            icon: AlignJustify,
            group: "cell-alignment",
            isShow: editorState.isTable,
            onClick: () => {},
        },

    ];

    const opsiToolbar: GroupSectionsMenu[] = groupToolbarOptions(optionsMenu);
    const bubble:GroupSectionsMenuBubble[]=groupToolbarOptionsBubble(opsiBubbleTable)
    return {
        opsiToolbar,
        editorStateData: editorState,
        bubbleForTable: bubble
    }
}
