import type { EditorCommandHandler } from "../EditorCommandHandler";
import type { EditorCommand } from "../EditorCommand";
import type { EditorCommandResult } from "../EditorCommandResult";
import type { UpdateTextCommand } from "./UpdateTextCommand";
import type { EditorEngine } from "../../EditorEngine";

/**
 * Handler untuk UpdateTextCommand
 * 
 * Milestone: Command Pipeline
 * Status: Recording command untuk engine processing
 * 
 * Note: Saat ini handler hanya validate dan record command.
 * Actual document mutation akan dilakukan di application layer
 * oleh EditorStore atau mutation service di masa depan.
 */
export class UpdateTextCommandHandler implements EditorCommandHandler {
    
    constructor(private engine: EditorEngine) {}

    handle(command: EditorCommand): EditorCommandResult {
        try {
            const updateTextCmd = command as UpdateTextCommand;
            
            if (!updateTextCmd.nodeId || updateTextCmd.text === undefined) {
                return {
                    success: false,
                    message: "nodeId dan text harus disediakan"
                };
            }

            if (typeof updateTextCmd.nodeId !== 'string') {
                return {
                    success: false,
                    message: "nodeId harus string"
                };
            }

            if (typeof updateTextCmd.text !== 'string') {
                return {
                    success: false,
                    message: "text harus string"
                };
            }

            // Command valid - record it for history/undo
            // Actual document update akan dilakukan di EditorStore.updateDocument()
            return {
                success: true,
                message: `Command untuk update node "${updateTextCmd.nodeId}" berhasil dicatat`
            };

        } catch (error) {
            return {
                success: false,
                message: `Error: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }
}
