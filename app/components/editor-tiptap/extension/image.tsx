import Image from "@tiptap/extension-image";

// coba import community extension kalau ada
let ResizeExtension: any = null;

try {
  ResizeExtension = require("tiptap-extension-resize-image").default;
} catch (e) {
  ResizeExtension = null;
}