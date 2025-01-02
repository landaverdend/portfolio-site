import { jsPDF } from 'jspdf';

export default function buildCoverLetter(name: string, content: string): jsPDF {
  // Default export is a4 paper, portrait, using millimeters for units
  const doc = new jsPDF();

  doc.setFont('Times New Roman');
  doc.setFontSize(13);

  addHeaderData(doc);
  addSalutation(doc, name);

  return doc;
}

function addHeaderData(doc: jsPDF) {
  doc.text('Nicodemus Landaverde\n\nnicodemus.landaverde98@gmail.com\n\n(919) 428-8578', 10, 15);

  const email = 'nicodemus.landaverde98@gmail.com';
  const emailLink = `mailto:${email}`;
  doc.setTextColor(0, 0, 255); // Blue for hyperlink
  doc.textWithLink(`\n\n${email}`, 10, 15, { url: emailLink });

  doc.setFillColor('0'); // Black color
  doc.rect(10, 42.5, 190, 1, 'F'); // x, y, width, height, mode ('F' for filled)
}

function addSalutation(doc: jsPDF, name: string) {
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setTextColor(0, 0, 0);
  const x = pageWidth * 0.425;

  doc.text(`Dear ${name},`, x, 55);
}
