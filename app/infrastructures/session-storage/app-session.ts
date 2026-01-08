const KEY = "app";

/**
 * Encode string UTF-8 ke Base64
 */
function encodeBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

/**
 * Decode Base64 ke string UTF-8
 */
function decodeBase64(base64: string): string {
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function saveSessionApp<T>(data: T): void {
  try {
    const json = JSON.stringify(data);
    const encoded = encodeBase64(json);
    window.localStorage.setItem(KEY, encoded);
  } catch (err) {
    console.error("Failed to save session", err);
  }
}

export function getSessionApp<T = unknown>(): T | null {
  const encoded = window.localStorage.getItem(KEY);
  if (!encoded) return null;

  try {
    const json = decodeBase64(encoded);
    return JSON.parse(json) as T;
  } catch (err) {
    console.error("Invalid session data", err);
    return null;
  }
}

export function clearSessionApp(): void {
  window.localStorage.removeItem(KEY);
}

// ==== DEPRECATED
// const KEY = "app";

// export function saveSessionApp(user: unknown) {
//   const json = JSON.stringify(user);
//   const encoded = window.btoa(unescape(encodeURIComponent(json)));
//   localStorage.setItem(KEY, encoded);
// }

// export function getSessionApp<T = any>(): T | null {
//   const encoded = localStorage.getItem(KEY);
//   if (!encoded) return null;

//   try {
//     const json = decodeURIComponent(escape(window.atob(encoded)));
//     return JSON.parse(json) as T;
//   } catch (err) {
//     console.error("Invalid session data", err);
//     return null;
//   }
// }

// export function clearSessionApp() {
//   localStorage.removeItem(KEY);
// }

