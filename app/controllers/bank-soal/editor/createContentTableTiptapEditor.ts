import { type JSONContent } from "@tiptap/react";
interface CreateTableOptions {
  rows: number;
  cols: number;
  createCell?: (row: number, col: number) => JSONContent;
}

export function createTableContent({
  rows,
  cols,
  createCell,
}: CreateTableOptions): JSONContent {
  return {
    type: "table",
    content: Array.from({ length: rows }, (_, row) => ({
      type: "tableRow",
      content: Array.from({ length: cols }, (_, col) => {
        return (
          createCell?.(row, col) ?? {
            type: "tableCell",
            content: [{ type: "paragraph" }],
          }
        );
      }),
    })),
  };
}