import {
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from "docx";

export interface HeadingNode {
  type: "heading";
  level: number;
  text: string;
  classList?: string[];
}

// interface HeadingStyleResult {
//   alignment: typeof AlignmentType;
//   bold: boolean;
//   uppercase: boolean;
//   size: number;
// }
type DocxAlignment =
  (typeof AlignmentType)[keyof typeof AlignmentType];

interface HeadingStyleResult {
  alignment: DocxAlignment;
  bold: boolean;
  uppercase: boolean;
  size: number;
}
export function parseHeading(node: HeadingNode): Paragraph {
  const level: number = clampLevel(node.level);

  const style: HeadingStyleResult = mapHeadingStyles(
    node.classList ?? [],
    level
  );

  const textValue: string = style.uppercase
    ? node.text.toUpperCase()
    : node.text;

  return new Paragraph({
    heading: mapHeadingLevel(level),
    alignment: style.alignment,
    spacing: {
      after: 0,
    },
    children: [
      new TextRun({
        text: textValue,
        bold: style.bold,
        size: style.size,
      }),
    ],
  });
}

function clampLevel(level: number): number {
  if (level < 1) return 1;
  if (level > 6) return 6;
  return level;
}

function mapHeadingLevel(level: number) {
  switch (level) {
    case 1:
      return HeadingLevel.HEADING_1;
    case 2:
      return HeadingLevel.HEADING_2;
    case 3:
      return HeadingLevel.HEADING_3;
    case 4:
      return HeadingLevel.HEADING_4;
    case 5:
      return HeadingLevel.HEADING_5;
    case 6:
      return HeadingLevel.HEADING_6;
    default:
      return HeadingLevel.HEADING_1;
  }
}

function mapHeadingStyles(
  classList: string[],
  level: number
): HeadingStyleResult {
  // let alignment: typeof AlignmentType[keyof typeof AlignmentType] = AlignmentType.LEFT;
  let alignment: DocxAlignment = AlignmentType.LEFT;
  let bold = true;
  let uppercase = false;

  const defaultSizeMap: Record<number, number> = {
    1: 48,
    2: 40,
    3: 36,
    4: 32,
    5: 28,
    6: 24,
  };

  const fallbackSize = defaultSizeMap[level] ?? 36;
  let size: number = fallbackSize;

  for (const cls of classList) {
    switch (cls) {
      case "text-center":
        alignment = AlignmentType.CENTER;
        break;

      case "text-right":
        alignment = AlignmentType.RIGHT;
        break;

      case "text-left":
        alignment = AlignmentType.LEFT;
        break;

      case "uppercase":
        uppercase = true;
        break;

      case "font-extrabold":
      case "font-bold":
        bold = true;
        break;

      case "font-normal":
        bold = false;
        break;

      case "text-3xl":
        size = 36;
        break;

      case "text-4xl":
        size = 40;
        break;
    }
  }

  return { alignment, bold, uppercase, size };
}
