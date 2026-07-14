import React, { useState } from 'react';


const RichEditorDemo: React.FC = () => {
  const [html, setHtml] = useState('<p>Selamat datang di demo Rich Text Editor.</p>');

  return (
    <div style={{ padding: 20 }}>
      <h2>Rich Text Editor Demo</h2>
            <div style={{ marginTop: 16 }}>
        <h5>Raw Output</h5>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#f8f9fa', padding: 12 }}>{html}</pre>
      </div>
    </div>
  );
};

export default RichEditorDemo;
