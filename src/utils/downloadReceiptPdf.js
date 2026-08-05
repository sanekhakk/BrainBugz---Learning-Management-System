import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Renders a DOM node (e.g. the ReceiptDocument component) to a paginated
 * A4 PDF and triggers a browser download.
 *
 * Requires: npm install jspdf html2canvas
 *
 * @param {HTMLElement} node - the element to capture (attach via ref)
 * @param {string} filename - e.g. "PearlX-Receipt-RCPT-A1B2C3D4.pdf"
 */
export async function downloadReceiptAsPdf(node, filename = "receipt.pdf") {
  if (!node) throw new Error("No receipt element to export");

  const canvas = await html2canvas(node, {
    scale: 2,
    backgroundColor: "#ffffff",
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(filename);
}