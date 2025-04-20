import React, { useState } from 'react';

const LogoUploader = ({ label, position, onImageUpload }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageUpload(reader.result, position);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`mb-4 ${position === 'right' ? 'text-right' : 'text-left'}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex items-center">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          {preview ? (
            <img src={preview} alt="Preview" className="h-full object-contain p-2" />
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="text-xs text-gray-500">PNG, JPG (Max. 800x400px)</p>
            </div>
          )}
          <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
        </label>
      </div>
    </div>
  );
};

export default LogoUploader;