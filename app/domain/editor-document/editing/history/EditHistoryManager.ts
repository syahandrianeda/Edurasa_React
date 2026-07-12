import type { EditHistory } from "./EditHistory";
import type { EditHistoryEntry } from "./EditHistoryEntry";
import type { EditHistoryResult } from "./EditHistoryResult";

export class EditHistoryManager {
    append(
        history: EditHistory,
        entry: EditHistoryEntry
    ): EditHistoryResult {

        return {
            history:{
                entries:[
                    ...history.entries,
                    entry
                ]
            }
        };
    }
    latest( history: EditHistory ): EditHistoryEntry | undefined {
            return history
                .entries
                .at(-1);
        }
}