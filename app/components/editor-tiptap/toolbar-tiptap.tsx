import { Editor } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";

type Props = {
  editor: Editor;
};

export default function Toolbar({ editor }: Props) {
    const [showMathEditor, setShowMathEditor] = useState(false);
    const [editingNode, setEditingNode] = useState<null | { id?: string; type: 'block' | 'inline'; formula: string }>(null);
    const [formula, setFormula] = useState("");//useState('');
    const anchorRef = useRef<HTMLDivElement | null>(null);
    const mathfieldElRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const katexRef = useRef<any>(null);

    useEffect(() => {
        let mounted = true;
        import('katex').then((k) => {
            if (!mounted) return;
            katexRef.current = k;
        }).catch(() => {});
        return () => { mounted = false; };
    }, []);

    useEffect(() => {
        let mounted = true;
        if (!showMathEditor) return;

        // dynamically import MathLive and mount a <math-field> element
        import('mathlive').then((ml) => {
            if (!mounted) return;
            try {
                const mfEl = document.createElement('math-field') as any;
                mfEl.setAttribute('virtual-keyboard-mode', 'manual');
                mfEl.style.width = '360px';
                mfEl.style.minHeight = '120px';
                mfEl.style.fontSize = '16px';
                
                // set initial value
                if (formula) {
                    mfEl.setValue?.(formula);
                }
                containerRef.current?.appendChild(mfEl);
                mathfieldElRef.current = mfEl;
                // focus the mathfield
                mfEl.focus?.();
            } catch (err) {
                // ignore
            }
        }).catch(() => {});

        return () => {
            mounted = false;
            if (mathfieldElRef.current) {
                try { mathfieldElRef.current.remove(); } catch {}
                mathfieldElRef.current = null;
            }
        };
    }, [showMathEditor]);

    if (!editor) return null;

    function openInsert() {
        setEditingNode({ type: 'inline', formula: '' });
        setFormula("\\frac{}{}");
        setShowMathEditor(true);
    }

    function openEdit() {
        const { state } = editor;
        // attempt to get node under selection
        const { $from, node } = state.selection as any;
        let found = null as any;
        if (node && node.type && (node.type.name === 'math' || node.type.name === 'math_inline')) {
            found = { type: node.type.name === 'math' ? 'block' : 'inline', formula: node.attrs.formula };
        } else {
            // try to find node at $from
            const maybe = $from.nodeAfter;
            if (maybe && (maybe.type.name === 'math' || maybe.type.name === 'math_inline')) {
                found = { type: maybe.type.name === 'math' ? 'block' : 'inline', formula: maybe.attrs.formula };
            }
        }

        if (!found) {
            window.alert('Place the caret on a formula node to edit it.');
            return;
        }

        setEditingNode(found);
        setFormula(found.formula || '');
        setShowMathEditor(true);
    }

    function getLatexFromField() {
        return mathfieldElRef.current?.getValue?.() ?? formula;
    }

    function insertOrUpdate(type: 'block' | 'inline') {
        const latex = getLatexFromField();
        if (editingNode && editingNode.formula !== undefined) {
            const nodeName = editingNode.type === 'block' ? 'math' : 'math_inline';
            editor.chain().focus().updateAttributes(nodeName, { formula: latex }).run();
        } else {
            const nodeName = type === 'block' ? 'math' : 'math_inline';
            editor.chain().focus().insertContent({ type: nodeName, attrs: { formula: latex } }).run();
        }
        setShowMathEditor(false);
        setEditingNode(null);
    }

    function insertNew(type: 'block' | 'inline') {
        const latex = getLatexFromField();
        const nodeName = type === 'block' ? 'math' : 'math_inline';
        editor.chain().focus().insertContent({ type: nodeName, attrs: { formula: latex } }).run();
        setShowMathEditor(false);
    }

    return (
        <div>
        <div className="flex gap-2 border-b pb-2 mb-2">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
            Bold
        </button>

        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
            Italic
        </button>

        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
            List
        </button>

        <div ref={anchorRef}>
        <button
            onClick={() => {
            const url = window.prompt("Image URL");
            if (url) {
                editor.chain().focus().setImage({ src: url }).run();
            }
            }}
        >
            Image
        </button>
        </div>

        <button onClick={openInsert}>Insert Formula</button>

        <button onClick={openEdit}>Edit Formula</button>
        </div>

        {showMathEditor && (
            <div style={{ position: 'absolute', zIndex: 99, background: 'red', border: '1px solid #ddd', padding: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
                <div style={{ display: 'flex', gap: 8 }}>
                <div ref={containerRef} />
                <div style={{ minWidth: 200, minHeight: 120, borderLeft: '1px solid #eee', paddingLeft: 8 }}>
                    <div style={{ padding: 8 }}>
                        <strong>Preview</strong>
                    </div>
                    <div style={{ padding: 8 }} dangerouslySetInnerHTML={{ __html: (() => {
                        try {
                            const val = mathfieldElRef.current?.getValue?.() ?? formula;
                            try {
                                if (katexRef.current) {
                                    return katexRef.current.renderToString(val || '\\placeholder', { throwOnError: false });
                                }
                                return val;
                            } catch {
                                return val;
                            }
                        } catch {
                            return mathfieldElRef.current?.getValue?.() ?? formula;
                        }
                    })() }} />
                </div>
            </div>
            <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                <button onClick={() => insertNew('inline')}>Insert Inline</button>
                <button onClick={() => insertNew('block')}>Insert Block</button>
                <button onClick={() => {
                    // if editing existing node, update it
                    if (editingNode) {
                        const nodeName = editingNode.type === 'block' ? 'math' : 'math_inline';
                        editor.chain().focus().updateAttributes(nodeName, { formula }).run();
                    }
                    setShowMathEditor(false);
                    setEditingNode(null);
                }}>Save</button>
                <button onClick={() => { setShowMathEditor(false); setEditingNode(null); }}>Cancel</button>
            </div>
            </div>
        )}
        </div>
    );
}