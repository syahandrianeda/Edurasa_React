import React from 'react';

interface Props {
  mode: 'wysiwyg' | 'raw';
  onToggleMode: () => void;
}

const Toolbar: React.FC<Props> = ({ mode, onToggleMode }) => {
  return (
    <div className="flex align-items-center mb-2">
      <div className="btn-group" role="group">
        <button className="btn btn-sm btn-outline-primary" onClick={onToggleMode}>
          {mode === 'wysiwyg' ? 'Switch to Raw HTML' : 'Switch to WYSIWYG'}
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
