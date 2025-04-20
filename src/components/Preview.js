import React from 'react';

const Preview = ({ universityLogo, relatedImage, title, subtitle, authors, faculty, location, year, professorTitle, professor }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-8 bg-white shadow-sm font-serif min-h-[80vh] flex flex-col">
      <div className="flex justify-between items-start mb-12">
        {relatedImage && (
          <div className="w-32 h-32 flex items-center">
            <img src={relatedImage} alt="Imagen relacionada" className="max-h-full max-w-full" />
          </div>
        )}
        {universityLogo && (
          <div className="w-32 h-32 flex items-center justify-end">
            <img src={universityLogo} alt="Logo Universidad" className="max-h-full max-w-full" />
          </div>
        )}
      </div>
      
      <div className="text-center mb-24 flex-grow">
        <h1 className="text-3xl font-bold mb-2">{title || 'Título del trabajo'}</h1>
        {subtitle && <h2 className="text-xl text-gray-600">{subtitle}</h2>}
      </div>
      
      <div className="text-center space-y-8">
        <div>
          <p className="text-lg">Presentado por:</p>
          <div className="mt-2 space-y-1">
            {authors.length > 0 ? (
              authors.map((author, index) => (
                <p key={index} className="text-xl font-medium">{author}</p>
              ))
            ) : (
              <p className="text-xl font-medium">Nombre del autor</p>
            )}
          </div>
        </div>
        
        <div>
          <p className="text-lg">Presentado a:</p>
          <p className="text-xl font-medium mt-2">{professorTitle} {professor || 'Nombre del profesor'}</p>
        </div>
        
        {faculty && (
          <div>
            <p className="text-lg">{faculty}</p>
          </div>
        )}
        
        <div>
          <p className="text-lg">{location || 'Ciudad, Departamento'}</p>
          <p className="text-lg">{year || new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default Preview;

// Los demás componentes (LogoUploader, TitleForm, etc.) se mantienen igual
// Solo actualizamos App.js para integrar los nuevos componentes