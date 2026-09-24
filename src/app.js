const express = require('express');
const path = require('path');
const PDFDocument = require('pdfkit');
const { legalDisclaimer, modules, buildCaseSummary } = require('./data/agents');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

function addPdfFooter(doc) {
  const bottom = doc.page.height - 72;
  doc.fontSize(8)
    .fillColor('#4b5563')
    .text(legalDisclaimer, 50, bottom, {
      width: doc.page.width - 100,
      align: 'center'
    });
}

app.get('/', (_req, res) => {
  res.render('onboarding', { legalDisclaimer });
});

app.post('/onboarding', (req, res) => {
  if (req.body.acceptDisclaimer !== 'on') {
    return res.status(400).render('onboarding', {
      legalDisclaimer,
      error: 'Debes aceptar el descargo legal obligatorio para continuar.'
    });
  }

  return res.redirect('/dashboard');
});

app.get('/dashboard', (_req, res) => {
  res.render('dashboard', { legalDisclaimer, modules });
});

app.get('/api/modules', (_req, res) => {
  res.json({ legalDisclaimer, modules });
});

app.post('/documents/dispatch.pdf', (req, res) => {
  const clientName = (req.body.clientName || 'Cliente').trim();
  const moduleId = req.body.moduleId;
  const summary = buildCaseSummary(moduleId, clientName);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${summary.module.id}-dispatch.pdf"`
  );

  const doc = new PDFDocument({ margin: 50, size: 'LETTER', compress: false });
  doc.on('pageAdded', () => addPdfFooter(doc));
  doc.pipe(res);

  doc.fontSize(20).fillColor('#111827').text('Expediente Autogenerado', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).fillColor('#111827').text(`Cliente: ${summary.clientName}`);
  doc.text(`Módulo: ${summary.module.title}`);
  doc.text(`Generado: ${summary.generatedAt}`);
  doc.moveDown();
  doc.fontSize(14).text('Resumen operacional');
  doc.moveDown(0.5);
  doc.fontSize(11).text(summary.module.summary);
  doc.moveDown();
  doc.fontSize(14).text('Checklist del expediente');
  summary.checklist.forEach((item) => {
    doc.fontSize(11).text(`• ${item}`, { indent: 12 });
  });
  doc.moveDown();
  doc.fontSize(14).text('Ruta de despacho');
  doc.fontSize(11).text('El expediente queda listo para revisión, impresión, firma y envío según el flujo seleccionado por el cliente.');
  addPdfFooter(doc);
  doc.end();
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Trámite.IA.MIAMI.FL listening on port ${port}`);
  });
}

module.exports = app;
