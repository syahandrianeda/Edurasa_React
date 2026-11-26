import { Paragraph, TextRun } from "docx";
import type { paragraphEdura, spacingEdura } from "../parser/common-comps/type-comp";
import AlignMapper from "./alignment-docx";

export type MapParagraphOptions = {
  numbering?: { reference: string; level: number };
  indent?: { left: number; hanging?: number };
  spacing?: spacingEdura;
};

export default function MapParagraphEdura(
  parse: paragraphEdura,
  options: MapParagraphOptions = {}
) {
  const children = parse.runs?.length
    ? parse.runs.map(
        (run) =>
          new TextRun({
            text: run.text,
            bold: run.isBold,
            italics: run.isItalic,
            underline: run.isUnderline ? {} : undefined,
            allCaps: run.isUppercase,
            size: run.fontSize,
            font: run.fontFamily,
            color: run.color,
            ...(run.break ? { break: run.break } : {}),
          })
      )
    : [
        new TextRun({
          text: parse.text,
          bold: parse.isBold,
          italics: parse.isItalic,
          underline: parse.isUnderline ? {} : undefined,
          allCaps: parse.isUppercase,
          size: parse.fontSize,
          font: parse.fontFamily,
        }),
      ];

  return new Paragraph({
    alignment: AlignMapper(parse.align),
    numbering: options.numbering,
    indent: options.indent,
    spacing: options.spacing ?? parse.spacing,
    children,
  });
}
