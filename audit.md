# Auditoría y logs - Frontend

El frontend no persiste auditoría propia. Consume la auditoría generada por el backend y ofrece una pantalla administrativa para consultarla.

## Ruta de auditoría

Ruta React:

```text
/admin/audit-logs
```

Archivo:

```text
src/pages/AdminAuditLogsPage.jsx
```

La ruta está protegida por `ProtectedRoute` en `src/App.jsx` y la pantalla además valida que la sesión tenga rol `admin`.

## Cliente API

La llamada está en `src/services/api.js`:

```js
api.listAuditLogs(params)
```

Endpoint consumido:

```http
GET /api/admin/audit-logs
```

El frontend envía el JWT guardado en `localStorage` usando:

```text
Authorization: Bearer TOKEN
```

## Filtros disponibles

La pantalla permite filtrar por:

- acción
- entidad
- usuario/email
- fecha desde
- fecha hasta

Las acciones listadas en el select son:

- `LOGIN_SUCCESS`
- `LOGIN_FAILED`
- `USER_CREATED`
- `POST_CREATED`
- `POST_UPDATED`
- `POST_DELETED`
- `POST_PUBLISHED`
- `POST_UNPUBLISHED`
- `CATEGORY_CREATED`
- `CATEGORY_UPDATED`
- `CATEGORY_DELETED`
- `IMAGE_UPLOADED`

## Datos renderizados

La tabla muestra:

- fecha
- usuario
- acción
- entidad e ID
- detalle

Si no hay usuario asociado, se muestra `Sistema`.

## Permisos

Solo usuarios con rol `admin` pueden ver la tabla. Para sesiones sin rol admin, la pantalla muestra un mensaje de bloqueo y no llama a la API.

El backend también valida permisos, por lo que la protección no depende solamente del frontend.

## Testing

La pantalla está cubierta por:

```text
src/pages/AdminAuditLogsPage.test.jsx
```

Ese test verifica:

- bloqueo para usuarios no-admin
- render de eventos para usuarios admin
- envío de filtros hacia `api.listAuditLogs`

