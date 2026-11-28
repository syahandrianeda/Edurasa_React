export default function DivEditor({ initialContent }:{initialContent:string}) {
  // Use dangerouslySetInnerHTML to set initial content; 
  // React will no longer track the children of this div.
  return (
    <div
      contentEditable
      dangerouslySetInnerHTML={{ __html: initialContent }}
      onInput={(e) => {
        const newHtml = e.currentTarget.innerHTML;
        // Handle updates to your state here
      }}
    />
  );
}