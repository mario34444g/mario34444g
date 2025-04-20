import React from 'react';

const FontSelector = ({ selectedFont, onFontChange }) => {
  const fonts = [
    { name: 'Times New Roman', class: 'font-serif' },
    { name: 'Arial', class: 'font-sans' },
    { name: 'Calibri', class: 'font-calibri' },
    { name: 'Georgia', class: 'font-georgia' },
    { name: 'Courier New', class: 'font-mono' }
  ];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Estilo de fuente</label>
      <select
        value={selectedFont}
        onChange={(e) => onFontChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
      >
        {fonts.map((font) => (
          <option key={font.class} value={font.class}>{font.name}</option>
        ))}
      </select>
    </div>
  );
};

export default FontSelector;