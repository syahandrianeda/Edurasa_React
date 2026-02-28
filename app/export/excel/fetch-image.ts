export default async function fetchImage(src: string): Promise<ArrayBuffer> {
  const res = await fetch(src);
  return await res.arrayBuffer();
}