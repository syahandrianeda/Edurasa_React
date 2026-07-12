import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: '<p>Hello World!</p>', 
    editorProps:{
        attributes: {
            class:'focus:outline-none focus:ring-1 focus:ring-blue-500 p-2 border-1 rounded-b-md'
        }
    }// initial content
  })
  
  return <EditorContent editor={editor} />
}

export default Tiptap