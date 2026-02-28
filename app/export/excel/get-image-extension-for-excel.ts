export default function getImageExtension(src: string): "png" | "jpeg" {
  if (src.startsWith("data:image/jpeg")) return "jpeg";
  if (src.startsWith("data:image/png")) return "png";

  if (src.endsWith(".jpg") || src.endsWith(".jpeg")) return "jpeg";
  return "png";
}