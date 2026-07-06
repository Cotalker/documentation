---
title: 'Bots de workflow: red y código'
sidebar_label: Red y código
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/workflows/bots/nw-request.md, nw-bot-v2-v3.md, ccjs.md, esm-code.md, pb-script.md @ 4f7248a (2026-07-06) -->

Esta familia es la conexión del workflow con el mundo exterior y su vía de escape cuando ningún bot de primera línea encaja:

- **`NW*` — bots de red**: hacer una petición HTTP (`NWRequest`) o hacer de puente hacia un bot v2 legado (`NWBotV2V3`).
- **Bots que ejecutan código** (`CCJS`, `ESMCode`, `PBScript`): ejecutan JavaScript arbitrario. Están **bloqueados**: la CLI impide `apply` salvo que pases `--allow-script-bots`, y el webclient no los renderiza ni ejecuta de otro modo.

:::warning Bots bloqueados
`CCJS`, `ESMCode` y `PBScript` ejecutan código arbitrario y pueden romper límites de seguridad. Úsalos solo cuando ningún bot de primera línea pueda hacer el trabajo, y aplica con el flag:

```bash
cotctl workflows apply -f workflow.yaml -c <profile> --allow-script-bots
```
:::

## NWRequest

Petición HTTP genérica (GET/POST/PATCH/PUT/DELETE/OPTIONS) con auth interna de Cotalker opcional, query strings, cuerpo JSON y un modo de simulación (dry-run).

Parámetros clave: `url`, `method`, `headers` (opcional), `defaultAuth` (adjunta el token de Cotalker del llamador), `queryString` (objeto agregado a la URL), `body` **o** `sbody` (cuerpo JSON / JSON en string, mutuamente excluyentes), `simulation` (omite la llamada real y devuelve `{ statusCode: 999, data: <config> }`).

Ramas: `SUCCESS` (estado < 400), `ERROR` (≥ 400 tras reintentos, o error de transporte).

```yaml
- key: s1
  name: NWRequest
  version: "2.0.0"
  data:
    url: "https://api.example.com/sync"
    method: "POST"
    defaultAuth: false
    headers:
      Authorization: "Bearer {{secret.token}}"
      Content-Type: "application/json"
    body:
      taskId: "{{task._id}}"
      status: "{{task.status1.code}}"
    simulation: false
  next:
    SUCCESS: ""
    ERROR: ""
```

Detalles a cuidar:

- Reintenta automáticamente ante `ECONNRESET`, HTTP 429 (respetando `Retry-After`, hasta 30 s) y HTTP 502 al host externo configurado.
- El timeout total de la petición es 600 s (10 min).
- `body` y `sbody` no se pueden usar juntos.
- `simulation: true` es la forma de probar el YAML sin efectos secundarios.

## NWBotV2V3

Adaptador interno que envuelve un endpoint de bot v2 legado para llamarlo desde el motor v3. Publica el contexto del canal, el último mensaje y el payload `me` del llamador al servicio de bots v2.

Parámetros clave: `process` (nombre del proceso del bot v2), `channel`, `messages` (solo se reenvía el ÚLTIMO), `uri` (override opcional; por defecto `http://<USERVICES_HOST>:<UXPORT>/bots/process/<process>`).

Ramas: `SUCCESS`, `ERROR`.

```yaml
- key: s1
  name: NWBotV2V3
  data:
    process: "legacy-classifier"
    channel: "{{task.channel}}"
    messages:
      - "{{lastMessage}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Detalles a cuidar:

- Requiere las variables de entorno `USERVICES_HOST` y `UXPORT` salvo que se provea `uri`.
- Rara vez se usa en workflows modernos: conviene migrar el bot v2 subyacente.

## CCJS

Envía JavaScript arbitrario (`src`) más `data`, el `input` del workflow y el `output` previo al Lambda `faas-native-products` y devuelve su salida. La vía de escape cuando ningún bot de primera línea cubre tu caso. **Bloqueado por `--allow-script-bots`.**

Parámetros clave: `src` (el JS; el handler recibe `{ input, output, data, env, useDefaultCotalkerAuth, defaultCotalkerAuthToken }`), `data` (objeto pasado al script), `useDefaultCotalkerAuth` (inyecta un token de Cotalker), `hideOutput` (no reenviar el historial de resultados, potencialmente grande).

Ramas: `SUCCESS` (Lambda `status=success`), `ERROR`.

```yaml
# Aplicar con: --allow-script-bots
- key: s1
  name: CCJS
  version: "2.0.3"
  isCritical: true
  risks: "Ejecuta JS arbitrario en un Lambda FaaS"
  data:
    useDefaultCotalkerAuth: true
    data:
      taskId: "{{task._id}}"
    src: |
      const computed = data.taskId.length;
      return { computed };
  next:
    SUCCESS: ""
    ERROR: ""
```

La disponibilidad de `fetch` depende de la versión: **`2.0.0`+ (FaaS)** tiene `fetch`; **`default` (`isolated-vm` legado)** **no** (`ReferenceError: fetch is not defined`). Si estás fijado a `default` y necesitas HTTP, pasa a `2.0.0`+ o haz la llamada con `NWRequest` y realimenta la respuesta vía `data`.

El script recibe un objeto `env` con los hosts internos de Cotalker: elige el correcto.

| Variable | Apunta a | Usar para |
|----------|----------|-----------|
| `BASEURL` | host de API interno (red privada) | llamadas servidor-a-servidor dentro del clúster (no alcanzable desde un navegador) |
| `EXTERNAL_API_URL` | host de API público | llamadas cuyo resultado llega a un navegador o a un llamador externo |
| `EXTERNAL_APP_URL` | host público del webclient | URLs que hará clic el usuario final (correos, notificaciones) |
| `FAASURL` / `FAAS_PRODUCTS_URL` | gateway FaaS interno / endpoint de products | llamar a otros endpoints FaaS |

Para imports ESM modernos y sandboxing con `isolated-vm`, prefiere `ESMCode`.

## ESMCode

Ejecuta JavaScript moderno de módulos ES (ESM) en un sandbox `isolated-vm` vía el Lambda `esmcode-runner`. Soporta dependencias dinámicas obtenidas de CDNs, fijadas a versiones exactas. **Bloqueado por `--allow-script-bots`.**

Parámetros clave: `src` (debe hacer `export default async function main({ fetch, console, env, input, data, output }) { … }`), `deps` (`{ "<pkg>": "<versión-exacta>" }`: los rangos semver se rechazan), `data`, `useDefaultCotalkerAuth`, `hideOutput`.

Ramas: `SUCCESS`, `ERROR`.

```yaml
# Aplicar con: --allow-script-bots
- key: s1
  name: ESMCode
  version: "1.0.0"
  isCritical: true
  risks: "Ejecuta JS ESM en un sandbox isolated-vm"
  data:
    deps:
      papaparse: "5.4.1"
    src: |
      import Papa from 'papaparse';
      export default async function main({ data }) {
        const parsed = Papa.parse(data.csv, { header: true });
        return { rows: parsed.data.length };
      }
    data:
      csv: "{{stages.s_fetch.body}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Detalles a cuidar:

- `axios` está **bloqueado** por el sandbox: usa el `fetch` provisto.
- Los bundles se cachean por 7 días y se reconstruyen ante fallo de caché.
- Para el sandbox legado solo-CommonJS, usa `CCJS`.

## PBScript

Carga un `COTPBScript` empaquetado por `code` y corre su cuerpo `parametrizedBot` a través del controlador, con tu `data` como entrada. Devuelve un diccionario `{ key → result }` armado desde cada etapa del script envuelto. **Bloqueado por `--allow-script-bots`.**

Parámetros clave: `code` (el código del pbscript a buscar), `data` (entrada reenviada al script envuelto).

Ramas: `SUCCESS` (el script envuelto produjo al menos un resultado de etapa), `ERROR` (no encontrado, error de ejecución o resultado vacío).

```yaml
# Aplicar con: --allow-script-bots
- key: s1
  name: PBScript
  version: "2.0.0"
  isCritical: true
  risks: "Corre un script PB empaquetado arbitrario"
  data:
    code: "my-custom-pbscript"
    data:
      taskId: "{{task._id}}"
  next:
    SUCCESS: ""
    ERROR: ""
```

Detalles a cuidar:

- Un resultado vacío enruta a `ERROR`: el script envuelto debe producir resultados de etapa.
- `PBScript` es para paquetes de bots **reutilizables y con nombre**. Para JavaScript puntual prefiere `CCJS` o `ESMCode` (también bloqueados).
