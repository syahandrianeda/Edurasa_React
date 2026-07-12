
import { useCallback, useState } from "react";
import RichTextEditor from "RichTextEditor";
import { EditorCanvas } from "~/adapters/react/components/canvas/EditorCanvas";
import { WorkspaceLayout } from "~/adapters/react/components/layout/WorkspaceLayout";
import { WorkspaceSurface } from "~/adapters/react/components/surface/WorkspaceSurface";
import { WorkspaceTheme } from "~/adapters/react/components/theme/WorkspaceTheme";
import { EditorToolbar } from "~/adapters/react/components/toolbar/EditorToolbar";
import { WorkspaceViewport } from "~/adapters/react/components/viewport/WorkspaceViewport";
import { Workspace } from "~/adapters/react/components/workspace/Workspace";
import { EditorStore } from "~/application/editor/EditorStore";
import { EditorStoreFactory } from "~/application/editor/EditorStoreFactory";
import TipTapEditor from "~/components/editor-tiptap/editor-tip-tap";
import FormPageTiptap from "~/components/editor-tiptap/form-tiptap";
import Tiptap from "~/components/editor-tiptap/tip-tap";
import { useFilterContext } from "~/components/toolbars/state-toolbar/state-toolbar"
import { useAppSelector } from "~/context-reduct/hook"
import ImportSoalPage from "~/controllers/bank-soal/import-soal/page/import-soal";
import TEeditor from "~/controllers/bank-soal/text-editor-bank-soal/text-editor";
import { EditorStateFactory } from "~/domain/editor/engine/factories/editor-state-factory";
import { EditorDebug } from "~/presentation/editor-debug";
import { EditorSmokeTest } from "~/presentation/editor/dev/EditorSmokeTest";
import { useEditor } from "~/presentation/editor/hooks/useEditor";
import { EditorProvider } from "~/presentation/editor/provider/EditorProvider";
import type { ListBentukSoalType } from "~/types/bank-soal/bentuk-soal-type";
import type { AtpAsOrm } from "~/types/kurikulum/prota-orm";

export default function CreateItemBankSoalPage(){
    const {value}=useFilterContext();
    const [testTiptap, setTestTiptap] = useState('<p>Selamat datang di demo Rich Text Editor.</p>');
    const onChangeTiptap = useCallback((value:string)=>{
         setTestTiptap(value)   
    },[testTiptap])
    return (
        <div>
            Anda akan membuat item soal dengan data:
            <p>Bentuk Soal</p>
            {
                (value?.extra?.fokusBentukSoal as ListBentukSoalType | undefined)?.name
            }
            <p>ATP</p>

            {
                (value?.extra?.fokusAtp as  AtpAsOrm | undefined)?.atp_as_tp_description
            }
            
            <ImportSoalPage/>
            <EditorSmokeTest />
            <FormPageTiptap/>
            <EditorProvider>
                <Workspace>

                <WorkspaceTheme>

                    <WorkspaceLayout

                        header={

                            <EditorToolbar>

                                Playground Toolbar

                            </EditorToolbar>

                        }

                    >

                        <WorkspaceSurface>

                            <WorkspaceViewport>

                                <EditorCanvas>

                                    <div
                                        className="
                                            flex
                                            min-h-[900px]
                                            items-center
                                            justify-center
                                            text-muted-foreground
                                        "
                                    >

                                        Editor Canvas Ready

                                    </div>

                                </EditorCanvas>

                            </WorkspaceViewport>

                        </WorkspaceSurface>

                    </WorkspaceLayout>

                </WorkspaceTheme>

            </Workspace>

            </EditorProvider>

            
        </div>
    )
}