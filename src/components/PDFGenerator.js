import React from 'react';
import { jsPDF } from 'jspdf';

const PDFGenerator = ({ 
  universityLogo,
  relatedImage,
  title, 
  subtitle, 
  authors, 
  faculty, 
  professorTitle, 
  professor, 
  location, 
  year,
  disabled 
}) => {
  const generatePDF = async () => {
    try {
      const doc = new jsPDF();
      
      // Configuración inicial
      doc.setFont('helvetica');
      doc.setFontSize(12);
      
      // Margen superior
      let yPosition = 30;
      
      // Logo Universidad (derecha)
      if (universityLogo) {
        // En una implementación real necesitarías procesar la imagen
        doc.text('Logo Universidad', 160, 20);
      }
      
      // Título
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text(title, 105, yPosition, { align: 'center' });
      yPosition += 10;
      
      // Subtítulo
      if (subtitle) {
        doc.setFontSize(16);
        doc.setFont('helvetica', 'normal');
        doc.text(subtitle, 105, yPosition, { align: 'center' });
        yPosition += 10;
      }
      
      // Espacio
      yPosition += 40;
      
      // Autores
      doc.setFontSize(14);
      doc.text('Presentado por:', 105, yPosition, { align: 'center' });
      yPosition += 10;
      
      authors.forEach((author) => {
        doc.text(author, 105, yPosition, { align: 'center' });
        yPosition += 10;
      });
      
      // Espacio
      yPosition += 20;
      
      // Profesor
      doc.text(`Presentado a: ${professorTitle} ${professor}`, 105, yPosition, { align: 'center' });
      yPosition += 10;
      
      // Facultad (opcional)
      if (faculty) {
        doc.text(faculty, 105, yPosition, { align: 'center' });
        yPosition += 10;
      }
      
      // Ubicación y año
      yPosition += 20;
      doc.text(location, 105, yPosition, { align: 'center' });
      yPosition += 10;
      doc.text(year.toString(), 105, yPosition, { align: 'center' });
      
      // Guardar el PDF
      doc.save(`portada-academica-${title.substring(0, 20).replace(/\s+/g, '-').toLowerCase()}.pdf`);
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Ocurrió un error al generar el PDF. Por favor inténtalo nuevamente.');
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={disabled}
      className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
        disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
      }`}
    >
      Descargar PDF
    </button>
  );
};

export default PDFGenerator;

// DONE