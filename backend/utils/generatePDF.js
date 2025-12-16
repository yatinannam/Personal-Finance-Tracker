const PDFDocument = require("pdfkit");

const generatePDF = (res, transactions) => {
  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=finance-report.pdf");

  doc.pipe(res);

  doc.fontSize(18).text("Monthly Finance Report", { align: "center" });
  doc.moveDown();

  transactions.forEach((t) => {
    doc
      .fontSize(12)
      .text(
        `${t.date.toDateString()} | ${t.type.toUpperCase()} | ₹${t.amount} | ${t.category} | ${t.description || ""}`
      );
  });

  doc.end();
};

module.exports = generatePDF;
