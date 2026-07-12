import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MathBlock, MathInline } from "./extension/math-node";
import { useEffect } from "react";
import Toolbar from "./toolbar-tiptap";
import { ResizableImage } from "./extension/resizable-image";
import PasteImage from "./extension/paste-image-extension";
import UploadGambarSoalService from "~/infrastructures/services/upload-gambar-soal-service-implements";
import Image from "@tiptap/extension-image";
import { Dropcursor } from '@tiptap/extensions'

type Props = {
  value?: string;
  onChange?: (html: string) => void;
};

export default function TipTapEditor({ value = "", onChange }: Props) {
    const editor = useEditor({
        extensions: [
        StarterKit,
                PasteImage.configure({
                    // Use client-side base64 upload flow via UploadGambarSoalService
                    upload: async (file: File, onProgress?: (p: number) => void) => {
                        try {
                            const svc = new UploadGambarSoalService();
                            const url = await svc.uploadFile(file, onProgress);
                            console.log(url);
                            return url;
                        } catch (err) {
                            console.error("upload error", err);
                            return "";
                        }
                    },
                }),
        ResizableImage.configure({
            inline: true,
            allowBase64: true,
            
            
        }),
        Dropcursor,
        MathBlock,
        MathInline,
        ],
        content: value,
        onUpdate({ editor }) {
            onChange?.(editor.getHTML());
        },
    });

    useEffect(() => {
        if (!editor) return;

        const handleTransaction = () => {
            const nextHtml = editor.getHTML();
            if (nextHtml !== value) {
                onChange?.(nextHtml);
            }
        };

        editor.on("transaction", handleTransaction);

        if (value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }

        return () => {
            editor.off("transaction", handleTransaction);
        };
    }, [editor, value, onChange]);

    if (!editor) return null;

    return (
        <div className="border rounded-md p-2">
        <Toolbar editor={editor} />
        <EditorContent editor={editor} className="min-h-50 p-2" />
        </div>
    );
}