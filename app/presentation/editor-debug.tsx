import { useEditor } from "./editor/hooks/useEditor";

export function EditorDebug()
{
    const editor =
        useEditor();

    return (

        <pre>

            {
                JSON.stringify(

                    editor.state,

                    null,

                    2

                )
            }

        </pre>

    );
}