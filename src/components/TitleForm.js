import React, { useState } from 'react';

const TitleForm = ({ onTitleChange, onSubtitleChange }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    onTitleChange(e.target.value);
  };

  const handleSubtitleChange = (e) => {
    setSubtitle(e.target.value);
    onSubtitleChange(e.target.value);
  };

  return (
    <div className="mb-6">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título del trabajo*</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
          placeholder="Ej: Análisis de sistemas distribuidos"
          required
        />
      </div>
      <div>
        <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">Subtítulo (opcional)</label>
        <input
          type="text"
          id="subtitle"
          value={subtitle}
          onChange={handleSubtitleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
          placeholder="Ej: Caso de estudio en empresas colombianas"
        />
      </div>
    </div>
  );
};

export default TitleForm;