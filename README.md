# Trámite.IA.MIAMI.FL

Aplicación base containerizada para exponer los módulos autónomos de:

- Tax & Bookkeeping Agent
- Credit Repair Agent (FCRA § 609)
- Clerical & Business Agent
- Motor de Notificación & PDF Dispatch

## Requisitos de compliance implementados

El descargo legal obligatorio se muestra en:

1. Pantalla de registro / onboarding con checkbox obligatorio.
2. Pie de página persistente de la plataforma web.
3. Pie de página de todos los PDF generados.

## Ejecución

```bash
docker compose up --build -d
```

Luego abre `http://localhost:3000`.

## Desarrollo local

```bash
npm install
npm test
node src/app.js
```
