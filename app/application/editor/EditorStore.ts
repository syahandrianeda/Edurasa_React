
import type { EditorState } from "~/domain/editor/runtime/editor-state";
import type { EditorStoreListener } from "./EditorStoreListener";
import type { CommandBus } from "~/domain/editor/runtime/command/CommandBus";
// import type { EditorCommand } from "~/domain/editor/runtime/command/EditorCommand";
import { UndoCommand } from "~/domain/editor/runtime/history/UndoCommand";
import { RedoCommand } from "~/domain/editor/runtime/history/RedoCommand";
import type { EditorApplication } from "~/domain/editor-document/application/EditorApplication";
import type { EditorApplicationService } from "~/domain/editor-document/application/service/EditorApplicationService";
import type { EditorCommand } from "~/domain/editor-document/engine/command/EditorCommand";
import type { UpdateTextCommand } from "~/domain/editor-document/engine/command/text/UpdateTextCommand";

export class EditorStore {

    private listeners =
        new Set<
            EditorStoreListener
        >();

    constructor(

        private readonly application:EditorApplication,

        private readonly service:EditorApplicationService

    ){}

    getDocument(){

        return this.application.workspace.document;

    }
    execute(

        command:EditorCommand

    ):void{

        this.service.execute(command);

        // Apply command to document state
        this.applyCommand(command);

        this.notify();

    }

    private applyCommand(command: EditorCommand): void {
        // Handle UpdateTextCommand
        if (command.type === "update-text") {
            const updateTextCmd = command as UpdateTextCommand;
            this.updateNodeText(
                this.application.workspace.document,
                updateTextCmd.nodeId,
                updateTextCmd.text
            );
        }
    }

    private updateNodeText(node: any, nodeId: string, text: string): boolean {
        if (!node || !node.children || !Array.isArray(node.children)) {
            return false;
        }

        // Search through children
        for (const child of node.children) {
            if (child.id === nodeId) {
                // Update node text based on type
                if (child.type === "paragraph" && Array.isArray(child.children)) {
                    // For paragraph nodes, update the first inline child
                    if (child.children.length > 0) {
                        child.children[0].text = text;
                        return true;
                    } else {
                        // Create first inline child if doesn't exist
                        child.children.push({ type: "text", text });
                        return true;
                    }
                } else {
                    // For other types, update text directly
                    child.text = text;
                    return true;
                }
            }

            // Recursively search nested children
            if (child.children && Array.isArray(child.children)) {
                if (this.updateNodeText(child, nodeId, text)) {
                    return true;
                }
            }
        }

        return false;
    }

    subscribe(
        listener:
            EditorStoreListener
    ): () => void {

        this.listeners
            .add(
                listener
            );

        return () => {

            this.listeners
                .delete(
                    listener
                );

        };

    }

    private notify()
    {
        for (
            const listener
            of this.listeners
        ) {

            listener();

        }
    }
    
    undo():void{

    /**
     * TODO
     * Akan dihubungkan ke History Application Service.
     */

    }

    redo():void{

        /**
         * TODO
         * Akan dihubungkan ke History Application Service.
         */

    }
}