import React, { useState } from 'react';
import RichTextEditor from '../../RichTextEditor';

const RichEditorDemo: React.FC = () => {
  const [html, setHtml] = useState('<p>Selamat datang di demo Rich Text Editor.</p>');

  return (
    <div style={{ padding: 20 }}>
      <h2>Rich Text Editor Demo</h2>
      <RichTextEditor initialValue={html} onChange={(h) => { setHtml(h); console.log('Editor HTML:', h); }} appScriptUrl={"/api/upload-image"} />

      <div style={{ marginTop: 16 }}>
        <h5>Raw Output</h5>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#f8f9fa', padding: 12 }}>{html}</pre>
      </div>
    </div>
  );
};

export default RichEditorDemo;
