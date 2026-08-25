---
title: 'Bots de workflow: control de flujo'
sidebar_label: Control de flujo
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/workflows/bots/fc-*.md @ 4f7248a (2026-07-06) -->

Los bots de control de flujo (`FC*`) no tocan tareas ni canales: dan forma a cómo corre el workflow mismo, iterando arreglos, ramificando según un valor y pausando. Úsalos en vez de JavaScript propio siempre que se pueda; el motor los entiende de forma nativa y generan subcontextos correctos.

Una nota sobre **subcontextos**: `FCEach`, `FCEachBulk` y `FCSwitchAll` generan un contexto hijo nuevo por iteración/coincidencia. Dentro de un subcontexto, la variable del bucle está disponible y los resultados se combinan de vuelta con el padre al terminar.

## FCEach

Itera un arreglo y ejecuta la rama `STEP` una vez por ítem, cada una en su propio subcontexto donde la variable del bucle resuelve al ítem actual. `DONE` corre una sola vez al final, en el contexto padre.

Parámetros clave: `control` (el arreglo), `target` (el nombre de la variable; dentro de cada subcontexto `{{target}}` es el ítem actual).

```yaml
- key: s1
  name: FCEach
  version: "4.1.0"
  data:
    control:
      - "5d23a26435513c1230fc671d"
      - "5d23a26435513c1230fc671e"
    target: recipient
  next:
    STEP: s_send      # corre una vez por ítem
    DONE: ""          # corre una vez, tras todos los ítems
```

Detalles a cuidar:

- Las iteraciones corren **en serie** (`async.eachOfSeries`). Para lotes en paralelo usa `FCEachBulk`.
- El subcontexto hereda el `externalData` del padre y agrega `target → ítemActual`.

## FCEachBulk

Divide `sourceArray` en lotes y ejecuta la rama `BATCH` una vez por lote (no por ítem). Pensado para alimentar bots masivos como `PBBulkTaskUpdate` → `PBBulkMessage`.

Parámetros clave: `sourceArray`, `targetVariable` (dentro del subcontexto resuelve al arreglo del lote), `batchSize` (1–100, default 10), `concurrency` (1–10, default 1), `interBatchDelay` (ms entre lotes, default 300).

```yaml
- key: s_each
  name: FCEachBulk
  data:
    sourceArray: "{{tasks}}"
    targetVariable: "tasks"
    batchSize: 20
    interBatchDelay: 500
  next:
    BATCH: s_update   # corre una vez por lote
    DONE: ""
    ERROR: ""
```

Detalles a cuidar:

- Los errores **a nivel de ítem** (una fila que falla dentro del bot del lote) **no** disparan `ERROR`. Solo lo hace una falla **a nivel de workflow** (un subcontexto de lote que no pudo ejecutarse).
- `batchSize` se recorta automáticamente a ≤ 100 y `concurrency` a ≤ 10. La implementación actual procesa los lotes de forma secuencial aun con `concurrency > 1`.
- Las métricas de lote se escriben en `externalData.bulkMetrics`.

## FCIfElse

Compara `left` y `right` con `operator` y enruta a `IF` (verdadero) o `ELSE` (falso). Los valores se convierten automáticamente (coerción string/número/fecha).

Parámetros clave: `left`, `right`, `operator` (`eq` por defecto, `neq`, `gt`, `lt`, `gte`, `lte`).

```yaml
- key: s1
  name: FCIfElse
  data:
    left: "{{answer.amount}}"
    right: 100000
    operator: "gte"
  next:
    IF: s_high_value
    ELSE: s_normal
```

Detalles a cuidar:

- El comportamiento de coerción para tipos mixtos depende del helper interno `compare`: prueba los casos límite.
- Para más de dos ramas, usa `FCSwitchOne` o `FCSwitchAll`.

## FCSleep

Pausa durante `milliseconds` (default 1000) y luego continúa a `DEFAULT`.

```yaml
- key: s1
  name: FCSleep
  data:
    milliseconds: 2000
  next:
    DEFAULT: ""
```

Detalles a cuidar:

- La pausa es un `setTimeout` real que **bloquea el worker** durante ese tiempo. Evita pausas largas dentro de pipelines de alto rendimiento.
- Prefiérelo antes que un `CCJS setTimeout`.

## FCSwitchAll

Evalúa cada caso `rcaseA…rcaseE` contra `lexpression` y ejecuta **todos** los casos que coincidan, cada uno en su subcontexto. Tras todas las coincidencias, corre `DONE`. Si nada coincide, corre `DEFAULT` (también como subcontexto).

Parámetros clave: `lexpression`, `rcaseA`…`rcaseE`, `operator` (`eq` por defecto, `neq`, `gt`, `lt`).

```yaml
- key: s1
  name: FCSwitchAll
  data:
    lexpression: "{{answer.tags}}"
    rcaseA: "billing"
    rcaseB: "legal"
    rcaseC: "ops"
    operator: "eq"
  next:
    CASE_A: s_billing
    CASE_B: s_legal
    CASE_C: s_ops
    DEFAULT: s_default
    DONE: s_audit
```

Detalles a cuidar:

- Los casos que coinciden corren **en serie**, un subcontexto a la vez.
- Solo se evalúan los casos presentes en `next`: declara siempre `DEFAULT`.

## FCSwitchOne

Como `FCSwitchAll`, pero ejecuta solo el **primer** caso que coincida y **no** genera subcontextos ni etapa `DONE`. Recurre a `DEFAULT`.

Parámetros clave: `lexpression`, `rcaseA`…`rcaseE`, `operator` (`eq` por defecto, `neq`, `gt`, `lt`).

```yaml
- key: s1
  name: FCSwitchOne
  data:
    lexpression: "{{answer.priority}}"
    rcaseA: "high"
    rcaseB: "medium"
    rcaseC: "low"
    operator: "eq"
  next:
    CASE_A: s_high
    CASE_B: s_medium
    CASE_C: s_low
    DEFAULT: s_unknown
```

Detalles a cuidar:

- Los casos se evalúan A → B → C → D → E; gana la primera coincidencia.
- Solo se consideran los casos presentes en `next`: declara cada caso que quieras evaluar.
