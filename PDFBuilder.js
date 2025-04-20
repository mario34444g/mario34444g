import React from 'react';
import {
  Document, Page, Text, View, Image, Font, StyleSheet
} from '@react-pdf/renderer';

// Registra fuentes (debes colocar los .ttf en public/fonts)
Font.register({ family: 'Georgia', src: '/fonts/Georgia.ttf' });
Font.register({ family: 'Times New Roman', src: '/fonts/TimesNewRoman.ttf' });

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12 },
  headerRow:  { flexDirection: 'row', justifyContent: 'space-between' },
  logo:       { width: 80, height: 40 },
  relatedImg: { width: 80, height: 40 },
  title:      { fontSize: 24, textAlign: 'center', margin: 20 },
  section:    { marginVertical: 10 }
});

const eqToSvgDataUrl = (latex) => {
  // TODO: Implementar renderizado MathJax => SVG dataURL
  return '';
};

const PDFBuilder = ({
  fontFamily,
  relatedImage,
  universityLogo,
  title, subtitle,
  authors, faculty,
  professorTitle, professor,
  location, year,
  content,
  equations
}) => {
  styles.page.fontFamily = fontFamily;

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.headerRow}>
          {relatedImage && <Image src={relatedImage} style={styles.relatedImg} />}
          {universityLogo && <Image src={universityLogo} style={styles.logo} />}
        </View>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={{ textAlign:'center', fontStyle:'italic' }}>{subtitle}</Text>}
        <View style={styles.section}>
          <Text>Autores: {authors.join(', ')}</Text>
          {faculty && <Text>Facultad: {faculty}</Text>}
          <Text>{professorTitle} {professor}</Text>
          <Text>{location}, {year}</Text>
        </View>
        <View style={styles.section}>
          <Text>{content}</Text>
        </View>
        {equations.map((eq, i) => (
          <Image key={i} src={eqToSvgDataUrl(eq)} style={{ width:200, margin:10 }}/>
        ))}
      </Page>
    </Document>
  );
};

export default PDFBuilder;
