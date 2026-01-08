import { clsx, type ClassValue } from "clsx"
import type { To } from "react-router";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function isSameUrl(url1: NonNullable<To>, url2: NonNullable<To>) {
  return resolveUrl(url1) === resolveUrl(url2);
}

export function resolveUrl(url: NonNullable<To>): string {
  return typeof url === 'string' ? url : JSON.stringify(url);
}