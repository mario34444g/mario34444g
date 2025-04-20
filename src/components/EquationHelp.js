import React from 'react';

const EquationHelp = () => {
  const examples = [
    "Ecuación cuadrática: $$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$",
    "Integral: $$\\int_{a}^{b} x^2 dx$$", 
    "Matriz: $$\\begin{matrix} a & b \\\\ c & d \\end{matrix}$$"
  ];

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="font-medium text-gray-800 mb-2">Cómo escribir ecuaciones:</h3>
      <p className="text-sm text-gray-600 mb-2">
        Escribe ecuaciones matemáticas usando notación LaTeX entre doble signo de dólar ($$). Ejemplos:
      </p>
      <div className="bg-white p-3 rounded border border-gray-200">
        {examples.map((example, index) => (
          <pre key={index} className="text-sm font-mono mb-2 overflow-x-auto">
            {example}
          </pre>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Copia exactamente estos ejemplos. Las ecuaciones se renderizarán correctamente en el PDF.
      </p>
    </div>
  );
};

export default EquationHelp;