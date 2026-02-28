import colors from "tailwindcss/colors";

export function resolveTailwindColor(className: string): string | null {
  const match = className.match(/bg-([a-z]+)-(\d+)/);
  if (!match) return null;

  const colorName = match[1]; // red
  const shade = match[2];     // 500

  const color = (colors as any)[colorName]?.[shade];
  if (!color) return null;

  return color.replace("#", "").toUpperCase();
}
