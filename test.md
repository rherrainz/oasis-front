# Suite de tests - Frontend

Este repositorio usa Vitest, React Testing Library, `@testing-library/jest-dom`, `@testing-library/user-event` y ambiente `jsdom`.

## Comando principal

```bash
npm run test:run
```

También existe:

```bash
npm run test
npm run test:coverage
```

## Archivos de test

- `src/App.test.jsx`: rutas principales de la aplicación.
- `src/pages/BlogPage.test.jsx`: lectura de filtros desde query params, búsqueda pública y llamadas filtradas a la API.
- `src/pages/AdminLoginPage.test.jsx`: envío de login con clave administrativa.
- `src/pages/AdminAuditLogsPage.test.jsx`: permisos de la pantalla de auditoría, render de logs y aplicación de filtros.
- `src/components/PostCard.test.jsx`: metadatos, categoría y tags en cards de posts.
- `src/components/Header.test.jsx`: navegación principal y persistencia de modo oscuro.
- `src/components/Footer.test.jsx`: información de copyright/proyecto.

## Cobertura funcional actual

La suite verifica:

- Render de la home y la página About.
- Filtros públicos del blog desde URL.
- Búsqueda pública y actualización de requests.
- Login administrativo con `ADMIN_KEY`.
- Bloqueo visual de auditoría para usuarios no-admin.
- Consulta y render de logs de auditoría para admin.
- Envío de filtros de auditoría al cliente API.
- Render de cards con autor, categoría y tags.
- Header, navegación y modo oscuro.
- Footer.

## Estrategia de mocks

Los tests mockean `src/services/api.js` cuando necesitan aislar componentes de la red. No se hacen requests reales al backend durante la suite.

`src/test/setup.js` configura:

- `@testing-library/jest-dom`
- fallback de `localStorage` cuando el runtime no lo expone

## Warnings conocidos

Durante la suite pueden aparecer warnings de Vite/Node relacionados con:

- opciones `esbuild` deprecadas por `vite:react-babel`
- `localStorage` experimental sin `--localstorage-file`

Actualmente esos warnings no fallan los tests.

