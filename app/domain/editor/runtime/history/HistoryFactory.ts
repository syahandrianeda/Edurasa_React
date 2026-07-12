import type { HistoryState } from "./HistoryState";

export class HistoryFactory {

    static create():
        HistoryState
    {

        return {

            undoStack:[],

            redoStack:[]

        };

    }

}