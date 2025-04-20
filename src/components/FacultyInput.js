import React, { useState } from 'react';

const FacultyInput = ({ faculty, setFaculty }) => {
  return (
    <div className="mb-4">
      <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-1">Facultad (opcional)</label>
      <input
        type="text"
        id="faculty"
        value={faculty}
        onChange={(e) => setFaculty(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
        placeholder="Ej: Facultad de Ingenierías"
      />
    </div>
  );
};

export default FacultyInput;