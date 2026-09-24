const legalDisclaimer = `DESCARGO LEGAL / DISCLAIMER OBLIGATORIO:
Trámite.IA.MIAMI.FL es una plataforma de software de autoayuda y asistencia mecanográfica administrativa en la preparación de documentos. Trámite.IA.MIAMI.FL NO es una firma de abogados ni de contadores públicos certificados (CPA), no presta asesoría legal, fiscal ni financiera personalizada, ni representa a usuarios ante organismos gubernamentales o buros de crédito. La plataforma funciona como una herramienta tecnológica bajo las leyes FCRA, CROA y las normas de preparadores documentales de Florida. El usuario es el único responsable de la verificación, firma y presentación final de todos los documentos generados.`;

const modules = [
  {
    id: 'tax-bookkeeping',
    title: 'Tax & Bookkeeping Agent',
    summary: 'Procesa recibos, W-2 y 1099 vía OCR/Vision y prepara expedientes con revisión CPA opcional.',
    tasks: [
      'Procesamiento OCR/Vision de recibos, W-2 y 1099.',
      'Categorización de ingresos, egresos y retenciones.',
      'Preparación del expediente con banderillas de verificación para revisión CPA / Contador.'
    ]
  },
  {
    id: 'credit-repair',
    title: 'Credit Repair Agent (FCRA § 609)',
    summary: 'Analiza reportes tri-buro y prepara paquetes de disputa listos para enviar.',
    tasks: [
      'Parseo de reportes Experian, Equifax y TransUnion.',
      'Detección de errores, duplicados y registros prescriptos.',
      'Generación autónoma del Dispute Pack en PDF listo para correo postal.'
    ]
  },
  {
    id: 'clerical-business',
    title: 'Clerical & Business Agent',
    summary: 'Asiste con LLCs en Florida, EINs ante el IRS y cartas administrativas estandarizadas.',
    tasks: [
      'Asistencia en la creación de LLCs en Florida (Sunbiz).',
      'Preparación de solicitudes EIN ante el IRS.',
      'Generación de cartas administrativas estandarizadas.'
    ]
  },
  {
    id: 'notification-dispatch',
    title: 'Motor de Notificación & PDF Dispatch',
    summary: 'Compila expedientes en PDF de alta resolución y notifica al cliente por correo electrónico.',
    tasks: [
      'Compilación del expediente final en PDF de alta resolución.',
      'Preparación del correo instantáneo al cliente para impresión y firma.',
      'Trazabilidad del despacho documental.'
    ]
  }
];

function buildCaseSummary(moduleId, clientName) {
  const module = modules.find((entry) => entry.id === moduleId) || modules[0];
  return {
    module,
    clientName,
    checklist: module.tasks,
    generatedAt: new Date().toLocaleString('es-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    })
  };
}

module.exports = {
  legalDisclaimer,
  modules,
  buildCaseSummary
};
