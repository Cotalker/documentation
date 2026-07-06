---
title: Scripting con exec en encuestas
sidebar_label: Scripting con exec
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/surveys/exec-hooks.md, exec-contexts.md, exec-commands.md, exec-network-request.md, src/schemas/survey.schema.ts (~255-279) @ 4f7248a (2026-07-06) -->

El scripting con exec es cómo una encuesta hace cosas que un formulario estático no puede: precargar un campo desde el usuario actual, validar una respuesta contra una regla de negocio, llamar a una API externa cuando se presiona un botón. Cada pregunta puede llevar un bloque `exec` con pequeñas funciones JavaScript que se ejecutan en puntos definidos de su ciclo de vida.

El código corre en el **frontend, dentro de un Web Worker**, con un **timeout de 60 segundos**. Cada script es una `function run()` (o `async function run()`) que **siempre devuelve un arreglo de comandos** — aunque sea vacío.

## Los seis hooks de ciclo de vida

```yaml
- type: textinput
  identifier: re_email
  label: "Email"
  exec:
    preload:
      context: "user#me"
      src: |
        function run() {
          const email = context['user#me'].email;
          return [{ cmd: 'SET_RESPONSES', value: [email] }];
        }
```

| Hook | Se dispara | Uso típico |
|---|---|---|
| `preload` | Al crear/cargar la encuesta | Precargar campos, traer datos remotos |
| `onDisplay` | Al abrir la encuesta para editar | Ajustar la UI, marcar required/read-only según condición |
| `onPlay` | Al presionar un botón personalizado | Búsquedas, acciones lanzadas por el usuario |
| `validate` | Antes de enviar | Validación propia — **debe devolver un `RESULT`** |
| `postsave` | Después de guardar | Post-procesamiento, logging |
| `onSubmitSuccess` | Tras un envío exitoso | Webhooks, notificaciones externas |

El orden durante una sesión es: `preload` → (el usuario la abre) `onDisplay` → (botón) `onPlay` → (envío) `validate` → `postsave` → `onSubmitSuccess`.

Cada hook acepta tres campos:

- `src` — JavaScript inline, o una ruta `file://` relativa al YAML (`cotctl` la incrusta al aplicar). Debe definir `function run()`.
- `context` — un string separado por comas con los contexts a inyectar (ver abajo).
- `button` — **solo válido en `onPlay`** — configura el botón que lo dispara.

### El botón de `onPlay`

```yaml
    onPlay:
      context: "responses#self,user#me"
      src: "file://./scripts/lookup.js"
      button:
        label: "Search"
        type: flat          # flat | stroked | default
        theme: primary      # basic | primary | accent | warn | ...
        debounceTime: 2000  # milisegundos, mínimo 1000
```

## Contexts: qué puede leer un script

Un script solo ve los datos que declaras en su campo `context`. Declara los contexts como un string separado por comas y luego lee cada uno por su clave: `context['user#me']`.

| Context | Te entrega |
|---|---|
| `user#me` | El objeto [User](../../data-models.md#user) que responde |
| `user#company` | El ID de la empresa como **string** (`user.company._id`) |
| `channel#self` | El [Channel](../../data-models.md#channel) que corre la encuesta |
| `task#self` | La [Task](../../data-models.md#task) vinculada al canal |
| `message#self` | El [Message](../../data-models.md#message) que disparó la encuesta |
| `property#channel` | Las properties del canal (un **arreglo**) |
| `property#user` | Las properties del usuario (un **arreglo**) |
| `responses#self` | La respuesta actual de esta pregunta |

También puedes leer otras respuestas de la misma encuesta con `responses#<identifier>`, las respuestas de una encuesta padre con `responses#parent#<identifier>` y las de una subencuesta con `responses#<identifier>@<code_subencuesta>`.

<div className="alert alert--secondary">

**En una encuesta de transición, `task#self` no viene poblada.** Cuando una encuesta se abre desde una transición de cambio de estado (`canChange: survey`), solo los contexts del lado del canal (`channel#self`, `property#channel`) traen datos — la tarea aún no está adjunta. Lee lo que necesites desde esos o desde `responses#self`.

</div>

## Comandos: qué devuelve un script

`run()` devuelve un arreglo de objetos comando que le indican a la encuesta qué hacer.

| Comando | Forma | Efecto |
|---|---|---|
| `SET_RESPONSES` | `{ cmd: 'SET_RESPONSES', value: [...], target?: 'self' \| <identifier> }` | Fija la respuesta guardada (de esta pregunta, o de otra vía `target`) |
| `SET_READONLY` | `{ cmd: 'SET_READONLY', value: 'true' \| 'false' }` | Bloquea/desbloquea la edición |
| `SET_REQUIRED` | `{ cmd: 'SET_REQUIRED', value: 'true' \| 'false' }` | Alterna el required |
| `RESULT` | `{ cmd: 'RESULT', result: true \| false, value: 'mensaje' }` | Controla la validez (ver abajo) |

Nota que `SET_READONLY` y `SET_REQUIRED` reciben los **strings** `'true'`/`'false'`, no booleanos.

### Validación con `RESULT`

En un hook `validate`, `RESULT` es **obligatorio**. Si tu arreglo no contiene uno, la encuesta trata la pregunta como inválida y bloquea el envío. Un `result: false` bloquea el envío y muestra `value` como mensaje — y corta la ejecución, así que ningún otro comando del arreglo corre. Un `result: true` deja continuar el envío.

```yaml
    validate:
      context: "responses#self"
      src: |
        function run() {
          const value = context['responses#self'];
          if (!value || Number(value) < 0) {
            return [{ cmd: 'RESULT', result: false, value: 'Must be zero or greater' }];
          }
          return [{ cmd: 'RESULT', result: true }];
        }
```

En los demás hooks `RESULT` es opcional y no hay corte — los comandos restantes siempre corren.

## Requests de red

Todo script tiene una global `networkRequest` para llamadas HTTP autenticadas, más `baseURL` para construir URLs internas.

```javascript
async function run() {
  const data = await networkRequest(
    `${baseURL}/api/users`,
    { method: 'GET', headers: { 'Content-Type': 'application/json' } },
    { token: true }   // inyecta el Bearer token del usuario actual
  );
  if (!data) return [];                       // undefined ante una falla — chequea siempre
  const name = data.data?.[0]?.name?.names ?? 'No data';
  return [{ cmd: 'SET_RESPONSES', value: [name] }];
}
```

Comportamientos clave:

- **Nunca lanza excepción.** Ante cualquier falla — error de red, 4xx, 5xx — devuelve `undefined`. Protégete con `if (!data) return [];`.
- Pasa `{ token: true }` para adjuntar el JWT del usuario actual. **Nunca hardcodees un token.**
- Un objeto `body` se serializa automáticamente con `JSON.stringify` — no lo pre-serialices.
- No hay reintento automático ni límite de requests, pero el timeout de 60 segundos del worker sigue vigente.

## Editar scripts como archivos

Escribir JavaScript inline dentro de YAML es incómodo de escribir y revisar. Exporta con `--extract-scripts` para sacar cada script a su propio archivo `.js`, referenciado con `file://`:

```bash
cotctl surveys export my_survey -c acme --extract-scripts ./scripts/
```

En el siguiente `apply`, `cotctl` vuelve a incrustar el contenido del archivo — así obtienes herramientas de editor reales y diffs limpios mientras la encuesta sigue siendo un único recurso portable.

## Ver también

- [Encuestas](../surveys.md) — la página de inicio
- [Lógica y validación](./logic-and-validation.md) — alternativas declarativas (visibilidad condicional, puntaje)
- [Modelos de datos](../../data-models.md) — la forma de los objetos de context que leen tus scripts
