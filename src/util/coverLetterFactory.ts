import { jsPDF } from 'jspdf';

const CONTENT_WIDTH = 190;
const MARGIN_LENGTH = 10; // Space on margins
const LINE_HEIGHT = 10; // Space between lines.

export default function buildCoverLetter(name: string, content: string): jsPDF {
  // Default export is a4 paper, portrait, using millimeters for units
  const doc = new jsPDF();

  doc.setFont('Times New Roman');
  doc.setFontSize(13);

  addHeaderData(doc);
  addSalutation(doc, name);
  addContent(doc, content);
  addFooters(doc);

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

function addContent(doc: jsPDF, content: string) {
  // doc.text('\n\n' + content, MARGIN_LENGTH, 55, { maxWidth: CONTENT_WIDTH });

  let cursorY = 70; // Starting Y position
  const pageHeight = doc.internal.pageSize.getHeight() - 10;

  const lines: Array<string> = doc.splitTextToSize(content, CONTENT_WIDTH);

  // Add content line by line
  lines.forEach((line) => {
    if (cursorY + LINE_HEIGHT > pageHeight - 10) {
      // Add new page if the text exceeds the current page
      cursorY = 12.5; // Reset Y position on new page
    }
    doc.text(line, 10, cursorY);
    cursorY += LINE_HEIGHT; // Move cursor down for the next line
  });
}

function addFooters(doc: jsPDF) {
  const pageHeight = doc.internal.pageSize.getHeight();

  const y = pageHeight - 21;
  doc.rect(MARGIN_LENGTH, y, CONTENT_WIDTH, 0.5, 'F');
}
