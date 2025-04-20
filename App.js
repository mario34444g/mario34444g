import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFBuilder from './components/PDFBuilder';
import FontSelector from './components/FontSelector';
import EquationHelp from './components/EquationHelp';

function App() {
  const [relatedImage, setRelatedImage] = useState(null);
  const [universityLogo, setUniversityLogo] = useState(null);
  const [fontFamily, setFontFamily] = useState('Georgia');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [authors, setAuthors] = useState([]);
  const [authorInput, setAuthorInput] = useState('');
  const [faculty, setFaculty] = useState('');
  const [profTitle, setProfTitle] = useState('MSc.');
  const [professor, setProfessor] = useState('');
  const [location, setLocation] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [content, setContent] = useState('');
  const [equations, setEquations] = useState(['$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$']);

  const handleAddAuthor = () => {
    if (authorInput.trim()) {
      setAuthors([...authors, authorInput.trim()]);
      setAuthorInput('');
    }
  };

  const handleFile = (e, setter) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setter(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Generador de Portadas Académicas</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2">Imagen relacionada (optional)</label>
          <input type="file" accept=".png,.jpg" onChange={e => handleFile(e, setRelatedImage)} className="mb-4"/>
          <label className="block mb-2">Logo Universidad</label>
          <input type="file" accept=".png,.jpg" onChange={e => handleFile(e, setUniversityLogo)} className="mb-4"/>

          <FontSelector value={fontFamily} onChange={setFontFamily} />

          <label className="block mt-4">Título*</label>
          <input className="border p-2 w-full rounded" value={title} onChange={e => setTitle(e.target.value)} />

          <label className="block mt-4">Subtítulo</label>
          <input className="border p-2 w-full rounded" value={subtitle} onChange={e => setSubtitle(e.target.value)} />

          <label className="block mt-4">Autores*</label>
          <div className="flex gap-2">
            <input className="border p-2 flex-1 rounded" value={authorInput} onChange={e => setAuthorInput(e.target.value)} />
            <button onClick={handleAddAuthor} className="px-4 bg-blue-600 text-white rounded">Agregar</button>
          </div>
          <div className="mt-2">{authors.join(', ')}</div>

          <label className="block mt-4">Facultad</label>
          <input className="border p-2 w-full rounded" value={faculty} onChange={e => setFaculty(e.target.value)} />

          <label className="block mt-4">Título profesor*</label>
          <select className="border p-2 w-full rounded" value={profTitle} onChange={e => setProfTitle(e.target.value)}>
            <option>MSc.</option>
            <option>PhD.</option>
          </select>

          <label className="block mt-4">Nombre profesor*</label>
          <input className="border p-2 w-full rounded" value={professor} onChange={e => setProfessor(e.target.value)} />

          <label className="block mt-4">Ciudad/Departamento*</label>
          <input className="border p-2 w-full rounded" value={location} onChange={e => setLocation(e.target.value)} />

          <label className="block mt-4">Año*</label>
          <input className="border p-2 w-full rounded" type="number" value={year} onChange={e => setYear(e.target.value)} />

          <label className="block mt-4">Contenido</label>
          <textarea className="border p-2 w-full rounded h-40" value={content} onChange={e => setContent(e.target.value)} />

          <EquationHelp />

        </div>

        <div className="bg-white p-4 rounded shadow">
          <PDFDownloadLink
            document={
              <PDFBuilder
                fontFamily={fontFamily}
                relatedImage={relatedImage}
                universityLogo={universityLogo}
                title={title}
                subtitle={subtitle}
                authors={authors}
                faculty={faculty}
                professorTitle={profTitle}
                professor={professor}
                location={location}
                year={year}
                content={content}
                equations={equations}
              />
            }
            fileName="portada-academica.pdf"
          >
            {({ loading }) =>
              <button className={`w-full py-3 mt-4 rounded text-white ${loading ? 'bg-gray-400':'bg-green-600'}`}>
                {loading ? 'Generando...' : 'Descargar PDF Avanzado'}
              </button>
            }
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
}

export default App;
