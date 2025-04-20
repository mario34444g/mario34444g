import React, { useState } from 'react';

const ContentEditor = ({ onContentChange }) => {
  const [content, setContent] = useState('');

  const handleContentChange = (e) => {
    setContent(e.target.value);
    onContentChange(e.target.value);
  };

  return (
    <div className="mb-6">
      <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Contenido del trabajo</label>
      <textarea
        id="content"
        value={content}
        onChange={handleContentChange}
        rows="10"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
        placeholder="Escribe aquí el contenido de tu trabajo..."
      ></textarea>
    </div>
  );
};

export default ContentEditor;