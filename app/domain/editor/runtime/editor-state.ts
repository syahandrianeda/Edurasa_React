import type { SelectionState } from "~/domain/editor-document/selection/SelectionState";
import type { QuestionBankDocument } from "../document/question-bank-document";
import type { ClipboardState } from "./clipboard";
import type { HistoryState } from "./history/HistoryState";
import type { EditorDocument } from "~/domain/editor-document/EditorDocument";
// import type { SelectionState } from "./selection-state";

export interface EditorState {

    // document: QuestionBankDocument;
    document: EditorDocument;

    selection: SelectionState | null;

    mode: EditorMode;

    clipboard: ClipboardState|null;

    history: HistoryState;

}