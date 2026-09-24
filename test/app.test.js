const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../src/app');

const disclaimerLead = 'DESCARGO LEGAL / DISCLAIMER OBLIGATORIO';
const disclaimerLeadHex = '444553434152474f204c4547414c202f20444953434c41494d4552204f424c494741';
const binaryParser = (res, callback) => {
  res.setEncoding('binary');
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    callback(null, Buffer.from(data, 'binary'));
  });
};

test('GET / renders onboarding with mandatory disclaimer', async () => {
  const response = await request(app).get('/');
  assert.equal(response.status, 200);
  assert.match(response.text, /He leído y acepto el descargo legal obligatorio/);
  assert.match(response.text, new RegExp(disclaimerLead));
});

test('POST /onboarding requires acceptance checkbox', async () => {
  const response = await request(app).post('/onboarding').type('form').send({});
  assert.equal(response.status, 400);
  assert.match(response.text, /Debes aceptar el descargo legal obligatorio/);
});

test('GET /dashboard lists autonomous modules', async () => {
  const response = await request(app).get('/dashboard');
  assert.equal(response.status, 200);
  assert.match(response.text, /Tax &amp; Bookkeeping Agent/);
  assert.match(response.text, /Credit Repair Agent/);
  assert.match(response.text, /Motor de Notificación &amp; PDF Dispatch/);
});

test('POST /documents/dispatch.pdf generates a PDF with the legal footer', async () => {
  const response = await request(app)
    .post('/documents/dispatch.pdf')
    .buffer(true)
    .parse(binaryParser)
    .type('form')
    .send({ moduleId: 'credit-repair', clientName: 'Ana Pérez' });

  assert.equal(response.status, 200);
  assert.equal(response.headers['content-type'], 'application/pdf');
  assert.match(response.headers['content-disposition'], /credit-repair-dispatch\.pdf/);
  const pdfText = response.body.toString('latin1');
  assert.match(pdfText, /%PDF-1\.3/);
  assert.match(pdfText, new RegExp(disclaimerLeadHex));
});
