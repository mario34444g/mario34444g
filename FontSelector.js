import React from 'react';

const FontSelector = ({ value, onChange }) => (
  <>
    <label className="block mt-4">Fuente</label>
    <select value={value} onChange={e => onChange(e.target.value)} className="border p-2 w-full rounded">
      <option>Georgia</option>
      <option>Times New Roman</option>
    </select>
  </>
);

export default FontSelector;
