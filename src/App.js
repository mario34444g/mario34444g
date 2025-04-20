import React, { useState } from 'react';
import LogoUploader from './components/LogoUploader';
import TitleForm from './components/TitleForm';
import FacultyInput from './components/FacultyInput';
import AuthorInput from './components/AuthorInput';
import ProfessorInput from './components/ProfessorInput';
import ContentEditor from './components/ContentEditor';
import Preview from './components/Preview';
import PDFGenerator from './components/PDFGenerator';
import FontSelector from './components/FontSelector';
import EquationHelp from './components/EquationHelp';

const App = () => {
  const [universityLogo, setUniversityLogo] = useState(null);
  const [relatedImage, setRelatedImage] = useState(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [authors, setAuthors] = useState([]);
  const [faculty, setFaculty] = useState('');
  const [professor, setProfessor] = useState('');
  const [professorTitle, setProfessorTitle] = useState('MSc.');
  const [location, setLocation] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [content, setContent] = useState('');
  const [selectedFont, setSelectedFont] = useState('font-serif');

  const isFormValid = universityLogo && title && authors.length > 0 && professor && location && year;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Generador de Portadas Académicas</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LogoUploader 
                label="Imagen relacionada (opcional - izquierda)" 
                position="left" 
                onImageUpload={setRelatedImage} 
              />
              
              <LogoUploader 
                label="Logo Universidad (obligatorio - derecha)" 
                position="right" 
                onImageUpload={setUniversityLogo} 
                required
              />
            </div>
            
            <FontSelector 
              selectedFont={selectedFont} 
              onFontChange={setSelectedFont} 
            />
            
            <TitleForm 
              onTitleChange={setTitle} 
              onSubtitleChange={setSubtitle} 
            />
            
            <AuthorInput 
              authors={authors} 
              setAuthors={setAuthors} 
            />
            
            <FacultyInput 
              faculty={faculty} 
              setFaculty={setFaculty} 
            />
            
            <ProfessorInput 
              professor={professor} 
              setProfessor={setProfessor} 
              title={professorTitle} 
              setTitle={setProfessorTitle} 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Ciudad/Departamento*</label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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
                  onChange={(e) => setYear(e.target.value)}
                  min="2000"
                  max="2100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
                  required
                />
              </div>
            </div>
            
            <ContentEditor onContentChange={setContent} />
            
            <EquationHelp />
            
            <PDFGenerator 
              disabled={!isFormValid} 
            />
          </div>
          
          <div className="sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Vista previa de portada</h2>
            <Preview 
              universityLogo={universityLogo} 
              relatedImage={relatedImage} 
              title={title} 
              subtitle={subtitle} 
              authors={authors}
              faculty={faculty}
              location={location} 
              year={year} 
              professorTitle={professorTitle}
              professor={professor}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

// DONE