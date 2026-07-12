export interface ToolbarHook{

    readonly canUndo:boolean;

    readonly canRedo:boolean;

    readonly hasSelection:boolean;

    readonly hasClipboard:boolean;

}