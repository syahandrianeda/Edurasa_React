import type { HistorySnapshot } from "./HistorySnapshot";

export interface HistoryState {

    undoStack:
        HistorySnapshot[];

    redoStack:
        HistorySnapshot[];

}