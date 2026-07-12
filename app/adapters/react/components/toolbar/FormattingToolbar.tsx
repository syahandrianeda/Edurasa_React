import React, { type ReactNode } from "react";
import { EditorToolbarButton } from "./EditorToolbarButton";

interface FormattingToolbarProps {
  onCommand?: (command: string, value?: string) => void;
  disabled?: boolean;
}

interface ToolbarGroupProps {
  children: ReactNode;
}

function ToolbarGroup({ children }: ToolbarGroupProps) {
  return (
    <div className="flex bg-white rounded border border-slate-200 p-0.5 shadow-sm">
      {children}
    </div>
  );
}

export function FormattingToolbar({
  onCommand,
  disabled = false,
}: FormattingToolbarProps) {
  const handleCommand = (command: string, value: string = "") => {
    if (disabled) return;
    
    if (onCommand) {
      onCommand(command, value);
    } else {
      // Default: use document.execCommand
      document.execCommand(command, false, value);
    }
  };

  return (
    <div className="flex flex-wrap gap-1 bg-slate-50 p-2 border-b border-slate-200 items-center select-none">
      {/* Text Formatting Group */}
      <ToolbarGroup>
        <EditorToolbarButton
          size="sm"
          onClick={() => handleCommand("bold")}
          title="Tebal (Ctrl+B)"
          disabled={disabled}
        >
          <strong>B</strong>
        </EditorToolbarButton>
        <EditorToolbarButton
          size="sm"
          onClick={() => handleCommand("italic")}
          title="Miring (Ctrl+I)"
          disabled={disabled}
        >
          <em>I</em>
        </EditorToolbarButton>
        <EditorToolbarButton
          size="sm"
          onClick={() => handleCommand("underline")}
          title="Garis Bawah (Ctrl+U)"
          disabled={disabled}
        >
          <u>U</u>
        </EditorToolbarButton>
        <EditorToolbarButton
          size="sm"
          onClick={() => handleCommand("strikeThrough")}
          title="Coret"
          disabled={disabled}
        >
          <s>S</s>
        </EditorToolbarButton>
      </ToolbarGroup>

      {/* Heading / Block Format Dropdown */}
      <select
        className="bg-white rounded border border-slate-200 px-2 py-1 text-xs text-slate-700 font-medium shadow-sm outline-none cursor-pointer hover:border-slate-300 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        onChange={(e) => {
          if (e.target.value) {
            handleCommand("formatBlock", e.target.value);
            e.target.value = "";
          }
        }}
        disabled={disabled}
        defaultValue=""
      >
        <option value="" disabled>
          Gaya Teks
        </option>
        <option value="<h1>">Judul Besar (H1)</option>
        <option value="<h2>">Judul Sedang (H2)</option>
        <option value="<h3>">Sub Judul (H3)</option>
        <option value="<p>">Paragraf Standar</option>
        <option value="<blockquote>">Quote</option>
        <option value="<pre>">Kode (Preformatted)</option>
      </select>

      {/* Lists Group */}
      <ToolbarGroup>
        <EditorToolbarButton
          size="sm"
          onClick={() => handleCommand("insertOrderedList")}
          title="Daftar Nomor"
          disabled={disabled}
        >
          1.
        </EditorToolbarButton>
        <EditorToolbarButton
          size="sm"
          onClick={() => handleCommand("insertUnorderedList")}
          title="Daftar Poin"
          disabled={disabled}
        >
          •
        </EditorToolbarButton>
      </ToolbarGroup>

      {/* Alignment Group */}
      <ToolbarGroup>
        <EditorToolbarButton
          size="sm"
          onClick={() => handleCommand("justifyLeft")}
          title="Rata Kiri"
          disabled={disabled}
        >
          ⬅
        </EditorToolbarButton>
        <EditorToolbarButton
          size="sm"
          onClick={() => handleCommand("justifyCenter")}
          title="Rata Tengah"
          disabled={disabled}
        >
          ⬆
        </EditorToolbarButton>
        <EditorToolbarButton
          size="sm"
          onClick={() => handleCommand("justifyRight")}
          title="Rata Kanan"
          disabled={disabled}
        >
          ➡
        </EditorToolbarButton>
      </ToolbarGroup>

      {/* Indent Group */}
      <ToolbarGroup>
        <EditorToolbarButton
          size="sm"
          onClick={() => handleCommand("outdent")}
          title="Kurangi Indentasi"
          disabled={disabled}
        >
          ⬅️↙️
        </EditorToolbarButton>
        <EditorToolbarButton
          size="sm"
          onClick={() => handleCommand("indent")}
          title="Tambah Indentasi"
          disabled={disabled}
        >
          ➡️↗️
        </EditorToolbarButton>
      </ToolbarGroup>

      {/* Insert Commands Group */}
      <ToolbarGroup>
        <EditorToolbarButton
          size="sm"
          title="Insert Horizontal Line"
          onClick={() => handleCommand("insertHorizontalRule")}
          disabled={disabled}
        >
          ——
        </EditorToolbarButton>
        <EditorToolbarButton
          size="sm"
          title="Insert Equation"
          onClick={() => {
            if (disabled) return;
            const latex = window.prompt("Masukkan persamaan (LaTeX)");
            if (!latex) return;
            if (onCommand) {
              onCommand("insert-equation", latex);
            } else {
              const html = `<span class=\"equation inline-block rounded px-1 py-0.5 bg-slate-100 border border-slate-200\">$$${latex}$$</span>`;
              document.execCommand("insertHTML", false, html);
            }
          }}
          disabled={disabled}
        >
          ∑
        </EditorToolbarButton>
      </ToolbarGroup>

      {/* Cleanup Button */}
      <EditorToolbarButton
        size="sm"
        variant="danger"
        onClick={() => handleCommand("removeFormat")}
        title="Hapus Semua Format"
        disabled={disabled}
      >
        🗑 Bersihkan
      </EditorToolbarButton>

      {/* Undo/Redo Group */}
      <ToolbarGroup>
        <EditorToolbarButton
          size="sm"
          onClick={() => handleCommand("undo")}
          title="Undo (Ctrl+Z)"
          disabled={disabled}
        >
          ↶
        </EditorToolbarButton>
        <EditorToolbarButton
          size="sm"
          onClick={() => handleCommand("redo")}
          title="Redo (Ctrl+Y)"
          disabled={disabled}
        >
          ↷
        </EditorToolbarButton>
      </ToolbarGroup>
    </div>
  );
}
