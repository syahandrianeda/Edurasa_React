import { useEditor, EditorContent,  useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit'
import MenuBarTiptap from './tiptap-menubar';
import TextAlign from '@tiptap/extension-text-align';
import { Mathematics } from '@tiptap/extension-mathematics'


export default function RteTiptap(){
    const editor = useEditor({
            extensions: [
                StarterKit,
                TextAlign.configure({
                    types: ['heading', 'paragraph'],
                }),
                
            ], 
            // define your extension array
            content: '<p>Hello World!</p>', 
            editorProps:{
                attributes: {
                    class:'focus:outline-none focus:ring-1 bg-white focus:ring-blue-500 p-2 border-s border-b border-e border-t-none rounded-b-md'
                }
            },
            immediatelyRender: true,
        })
        console.log('editor state', editor.getJSON())
    return (
        <div className="border border-slate-400 bg-slate-300 rounded-md p-0 w-full">
            <MenuBarTiptap editor={editor}/>
            <EditorContent editor={editor} />
        </div>
    
    )
}