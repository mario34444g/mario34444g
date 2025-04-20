import React from 'react';

const DownloadButton = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
        disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
      }`}
    >
      Generar Documento
    </button>
  );
};

export default DownloadButton;