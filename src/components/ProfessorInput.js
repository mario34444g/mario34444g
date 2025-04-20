import React, { useState } from 'react';

const ProfessorInput = ({ professor, setProfessor, title, setTitle }) => {
  const titles = ['Ing.', 'MSc.', 'Ph.D.', 'Lic.', 'Dr.'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
      <div className="md:col-span-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Título*</label>
        <select
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
        >
          {titles.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="md:col-span-4">
        <label htmlFor="professor" className="block text-sm font-medium text-gray-700 mb-1">Nombre del profesor*</label>
        <input
          type="text"
          id="professor"
          value={professor}
          onChange={(e) => setProfessor(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
          placeholder="Ej: Juan Pérez"
          required
        />
      </div>
    </div>
  );
};

export default ProfessorInput;