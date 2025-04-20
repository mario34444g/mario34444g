import React, { useState } from 'react';

const AuthorInfo = ({ onAuthorChange, onDegreeChange, onLocationChange, onYearChange }) => {
  const [author, setAuthor] = useState('');
  const [degree, setDegree] = useState('Ing.');
  const [location, setLocation] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
    onAuthorChange(e.target.value);
  };

  const handleDegreeChange = (e) => {
    setDegree(e.target.value);
    onDegreeChange(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    onLocationChange(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    onYearChange(e.target.value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Presentado por*</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={handleAuthorChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
          placeholder="Nombre del autor"
          required
        />
      </div>
      <div>
        <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">Título*</label>
        <select
          id="degree"
          value={degree}
          onChange={handleDegreeChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
        >
          <option value="Ing.">Ingeniería</option>
          <option value="Msc.">Maestría</option>
          <option value="Ph.D.">Doctorado</option>
          <option value="Lic.">Licenciatura</option>
        </select>
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Ciudad/Departamento*</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={handleLocationChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
          placeholder="Ej: Montería, Córdoba"
          required
        />
      </div>
      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Año*</label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={handleYearChange}
          min="2000"
          max="2100"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
          required
        />
      </div>
    </div>
  );
};

export default AuthorInfo;