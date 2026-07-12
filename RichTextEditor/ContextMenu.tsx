import React from 'react';

interface Props {
  x: number;
  y: number;
  visible: boolean;
  onClose: () => void;
  onConvertFraction: () => void;
  onTagData: (value: string) => void;
  selectionText: string;
}

const ContextMenu: React.FC<Props> = ({ x, y, visible, onClose, onConvertFraction, onTagData, selectionText }) => {
  if (!visible) return null;

  const handleTag = () => {
    const value = prompt('Masukkan nilai data untuk tag (data-value):', selectionText) || '';
    onTagData(value);
    onClose();
  };

  return (
    <div style={{ position: 'absolute', left: x, top: y, zIndex: 9999 }} onMouseLeave={onClose}>
      <div className="card flex flex-col bg-amber-200" style={{ minWidth: 160 }}>
        <div className="list-group list-group-flush">
          <button className="list-group-item list-group-item-action" onClick={() => { onConvertFraction(); onClose(); }}>
            Convert Pecahan
          </button>
          <button className="list-group-item list-group-item-action" onClick={handleTag}>
            Tag Data (Inline)
          </button>
          <button className="list-group-item list-group-item-action" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContextMenu;
