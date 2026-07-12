import { EditorCanvas } from "~/adapters/react/components/canvas/EditorCanvas";
import { WorkspaceLayout } from "~/adapters/react/components/layout/WorkspaceLayout";
import { WorkspaceSurface } from "~/adapters/react/components/surface/WorkspaceSurface";
import { WorkspaceTheme } from "~/adapters/react/components/theme/WorkspaceTheme";
import { EditorToolbar } from "~/adapters/react/components/toolbar/EditorToolbar";
import { FormattingToolbar } from "~/adapters/react/components/toolbar/FormattingToolbar";
import { EditorToolbarButton } from "~/adapters/react/components/toolbar/EditorToolbarButton";
import { WorkspaceViewport } from "~/adapters/react/components/viewport/WorkspaceViewport";
import { Workspace } from "~/adapters/react/components/workspace/Workspace";
import { ReactCompositionRoot } from "~/adapters/react/composition/ReactCompositionRoot";
import { createEditorPlatform } from "~/application/editor/bootstrap/createEditorPlatform";
import { DocumentRenderer } from "~/presentation/editor/renderer/DocumentRenderer";
import FormPageTiptap from "~/components/editor-tiptap/form-tiptap";

export default function CreateItemBankSoalPage(){
    const platform = createEditorPlatform();

    const handleToolbarCommand = (command: string, value?: string) => {
        if (command === "insert-equation") {
            const latex = value ?? window.prompt("Masukkan persamaan (LaTeX)");
            if (!latex) return;
            const html = `<span class="equation inline-block rounded px-1 py-0.5 bg-slate-100 border border-slate-200">$$${latex}$$</span>`;
            document.execCommand("insertHTML", false, html);
            return;
        }

        document.execCommand(command, false, value);
    };

    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">Editor Tiptap</h3>
            <FormPageTiptap/>
            <h3 className="text-lg font-semibold mb-2">Editor Platform v7.3</h3>
             <ReactCompositionRoot

                platform={platform}

                >
                <Workspace>

                    <WorkspaceLayout

                        header={

                            <EditorToolbar>

                                <FormattingToolbar 
                                    onCommand={handleToolbarCommand}
                                />
                                
                                {/* Utility Buttons */}
                                <div className="ml-auto flex gap-2">
                                    <EditorToolbarButton
                                        size="sm"
                                        title="Refresh Editor"
                                        onClick={() => window.location.reload()}
                                    >
                                        🔄
                                    </EditorToolbarButton>
                                    <EditorToolbarButton
                                        size="sm"
                                        title="Save Document"
                                        onClick={() => alert('Save functionality coming soon')}
                                    >
                                        💾
                                    </EditorToolbarButton>
                                    <EditorToolbarButton
                                        size="sm"
                                        title="Export as HTML"
                                        onClick={() => {
                                            const html = document.body.innerHTML;
                                            const element = document.createElement('a');
                                            element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(html));
                                            element.setAttribute('download', 'document.html');
                                            element.style.display = 'none';
                                            document.body.appendChild(element);
                                            element.click();
                                            document.body.removeChild(element);
                                        }}
                                    >
                                        📥
                                    </EditorToolbarButton>
                                </div>

                            </EditorToolbar>

                        }

                        footer={

                            <div className="border-t px-4 py-2 text-sm text-slate-600">

                                <span>Ready to edit • Editor Platform v7.3</span>

                            </div>

                        }

                    >

                        
                        
                            <WorkspaceSurface>

                            <WorkspaceViewport>

                                <EditorCanvas>

                                    <DocumentRenderer/>

                                </EditorCanvas>

                            </WorkspaceViewport>

                        </WorkspaceSurface>
                    </WorkspaceLayout>

                </Workspace>

            </ReactCompositionRoot>

        </div>

            

            
        
    )
}