import React, { useState } from 'react';

const AuthorInput = ({ authors, setAuthors }) => {
  const [newAuthor, setNewAuthor] = useState('');

  const addAuthor = () => {
    if (newAuthor.trim() && !authors.includes(newAuthor.trim())) {
      setAuthors([...authors, newAuthor.trim()]);
      setNewAuthor('');
    }
  };

  const removeAuthor = (index) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Autores*</label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
          placeholder="Nombre del autor"
        />
        <button
          type="button"
          onClick={addAuthor}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
        >
          Agregar
        </button>
      </div>
      
      {authors.length > 0 && (
        <div className="space-y-2">
          {authors.map((author, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <span>{author}</span>
              <button
                type="button"
                onClick={() => removeAuthor(index)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorInput;