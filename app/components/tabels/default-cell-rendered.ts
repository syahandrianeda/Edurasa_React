import type { ReactNode } from "react";

export function defaultCellRenderer<T>(key: keyof T) {
  return (row: T): ReactNode => {
    const value = row[key];

    if (value instanceof Date) return value.toLocaleDateString();
    if (value === null || value === undefined) return "";

    return String(value);
  };
}
