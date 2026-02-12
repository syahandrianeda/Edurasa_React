import type { ChangeEvent } from "react";
import { readExcelFileToJson } from "./import-excel";

export async function handleExcelImport(
  e: ChangeEvent<HTMLInputElement>,
  onSuccess: (data: any[]) => void,
  onError?: (error: Error) => void
) {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    const result = await readExcelFileToJson(file);
    onSuccess(result.data);
  } catch (error) {
    onError?.(error as Error);
  } finally {
    // reset input supaya file yang sama bisa dipilih ulang
    e.target.value = '';
  }
}
