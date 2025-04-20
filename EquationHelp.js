import React from 'react';

const EquationHelp = () => (
  <div className="mt-4 p-4 bg-white rounded border">
    <h2 className="font-bold mb-2">Cómo escribir ecuaciones</h2>
    <p>Usa notación LaTeX entre doble signo de dólar (<code>$$</code>).</p>
    <pre className="bg-gray-100 p-2 rounded">
Ecuación: $$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$
    </pre>
  </div>
);

export default EquationHelp;
