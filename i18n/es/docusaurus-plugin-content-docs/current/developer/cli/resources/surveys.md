---
title: Formularios (YAML)
sidebar_label: Formularios
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/surveys.ts, src/schemas/survey.schema.ts, docs/surveys/yaml-structure.md @ 4f7248a (2026-07-06) -->

Un **formulario** (survey) es la forma en que Cotalker captura datos estructurados de las personas. Los formularios suelen ser el primer recurso que los partners aprenden a gestionar con `cotctl`, porque son autocontenidos y útiles de inmediato. Un formulario es un `code`, un `name` y una lista de `questions`, y todo lo demás — quién puede responder, visibilidad condicional, puntaje, hooks de automatización — se apoya sobre esa columna vertebral.

Esta página es el mapa. Cubre la estructura mínima que escribirás a diario y los cuatro comandos para gestionar formularios; las subpáginas profundizan en las partes que lo ameritan.

## La forma de un formulario

En su forma más simple, un formulario son tres cosas:

```yaml
kind: Survey
code: registro_empleado          # único por empresa, inmutable tras la creación
name: "Employee Registration"
questions:
  - type: textinput
    identifier: re_nombre         # único en toda la empresa, inmutable tras la creación
    label: "Name"
  - type: listquestion
    identifier: re_cargo
    label: "Role"
    options:
      - label: "Analyst"
        value: "analista"
```

### Campos raíz

| Campo | Requerido | Descripción |
|---|---|---|
| `kind` | Sí | Siempre `Survey` |
| `code` | Sí | Único por empresa. Debe cumplir `^[a-z][a-z0-9_]*$`. **Inmutable tras la creación** |
| `name` | Sí | Nombre visible |
| `isActive` | No | Por defecto `true` |
| `nameTranslations` | No | Traducciones del nombre en `es` / `en` / `pt` / `fr` |
| `permissions` | No | **Nombres** de AccessRole, resueltos a IDs al aplicar — quién puede responder |
| `bounds` | No | Mapea respuestas a campos de la tarea (ver [Lógica y validación](./surveys/logic-and-validation.md)) |
| `src` | No | Script de puntaje (ver [Lógica y validación](./surveys/logic-and-validation.md)) |

<div className="alert alert--primary">

**`code` es inmutable, y también lo es cada `identifier` de pregunta.** Una vez creado el formulario, no pueden cambiar — elígelos con cuidado. Para "renombrar" cualquiera de los dos, creas un recurso nuevo. Por eso una convención de nombres clara desde el inicio rinde frutos.

</div>

Más allá de estos, los formularios llevan muchos campos opcionales para visibilidad en canales, edición post-envío, filtros de quién responde y reasignación. Recurrirás a ellos según lo pida cada proyecto; exporta un formulario real para verlos todos.

## Preguntas

`questions` es un arreglo. Toda pregunta, sin importar su tipo, comparte un conjunto común de campos:

| Campo | Requerido | Descripción |
|---|---|---|
| `type` | Sí | El tipo de pregunta — uno de 13 (ver abajo) |
| `identifier` | Sí | ID único en toda la empresa. Debe cumplir `^[a-zA-Z][a-zA-Z0-9_]*$` |
| `label` | Sí | La etiqueta visible |
| `help` | No | Texto de ayuda secundario |
| `required` | No | Por defecto `false` |
| `isReadOnly` | No | Por defecto `false` |
| `twoColumns` | No | Diseño a dos columnas |
| `translations` | No | `label` y `help` por idioma |
| `conditionalDisplay` | No | Mostrar/ocultar según otra respuesta |
| `exec` | No | Hooks de automatización |

### Identificadores: la única regla que hay que internalizar

El `identifier` de una pregunta debe ser **único en toda la empresa**, no solo dentro de este formulario. La convención que te mantiene fuera de problemas es **prefijar cada identificador con el code del formulario**:

```yaml
# BIEN — prefijado, no colisiona
identifier: re_nombre

# MAL — genérico, colisionará con otros formularios
identifier: nombre
```

Unas pocas palabras están reservadas y no pueden usarse como identificadores: `survey`, `user`, `channel`, `_id`, `UUID`, `target`, `properties`.

## Qué cubren las subpáginas

El modelo de formulario tiene cuatro áreas lo bastante profundas como para merecer su propia página:

- **[Tipos de pregunta](./surveys/question-types.md)** — el catálogo de 13 tipos, con el YAML mínimo y los campos específicos que necesita cada uno (`options` para listas, `filters` para propiedades, `source` para selectores respaldados por API, etc.).
- **[Scripting con exec](./surveys/exec-scripting.md)** — los seis hooks de ciclo de vida que ejecutan JavaScript dentro de un formulario, los contexts que tu script puede leer, los comandos que devuelve y cómo hacer requests de red autenticados.
- **[Lógica y validación](./surveys/logic-and-validation.md)** — visibilidad condicional, puntaje, vincular respuestas a campos de la tarea (`bounds`) y las tres capas de validación que `cotctl` corre antes de que algo llegue al servidor.
- **[Ejemplo completo](./surveys/complete-example.md)** — un formulario completo y anotado que puedes leer de principio a fin.

## Gestionar formularios con `cotctl`

Los formularios tienen su propio grupo de comandos. Cada comando recibe un perfil con la flag global `-c <perfil>`.

| Comando | Qué hace |
|---|---|
| `cotctl surveys list` | Lista formularios (activos por defecto; `--all` incluye inactivos, `--code <code>` hace búsqueda exacta) |
| `cotctl surveys get <code>` | Muestra un formulario; `--populate` incluye la lista completa de preguntas (y cambia la salida por defecto a YAML) |
| `cotctl surveys export <code>` | Exporta un formulario como YAML o JSON |
| `cotctl surveys apply -f <archivo>` | Crea o actualiza un formulario desde un archivo YAML |
| `cotctl surveys deactivate <code>` | Borrado suave (nunca se elimina en duro) |

### Aplicar de forma segura

`apply` empareja preguntas por `identifier` y no por posición, así que puedes agregar, editar, quitar y reordenar preguntas libremente — los IDs se preservan. Quitar una pregunta la desactiva en vez de eliminarla en duro, y se te pedirá confirmación. Si aplicas un YAML de formulario sin su sección `questions`, las preguntas existentes quedan intactas.

Dos flags vuelven a `apply` seguro de correr en serio:

```bash
# Previsualiza sin tocar el servidor. --diff controla el detalle.
cotctl surveys apply -f survey.yaml -c acme --dry-run --diff verbose

# En CI: falla el build si el dry-run detecta un cambio destructivo.
cotctl surveys apply -f survey.yaml -c acme --dry-run --fail-on-destructive
```

- `--dry-run` valida e imprime exactamente qué se enviaría, sin aplicar.
- `--diff <off|compact|verbose>` fija cuánto del antes/después imprime el dry-run (por defecto `compact`).
- `--fail-on-destructive` sale con código `2` cuando el dry-run encuentra un cambio de severidad peligrosa — útil en un pipeline. (Requiere `--dry-run`.)
- `--yes` omite las confirmaciones; `--json` emite un objeto de resultado por línea para scripting.

### Un consejo práctico

La forma más rápida de aprender la estructura completa es exportar un formulario real y leerlo:

```bash
cotctl surveys export <algun_formulario> -c acme -o example.yaml
```

Agrega `--extract-scripts <dir>` para sacar los scripts exec inline a archivos `.js` separados referenciados con `file://` — mucho más cómodo de editar y de diferenciar.

## Ver también

- [apply](../commands/apply.md) — el pipeline de apply compartido y sus reglas de orden
- [Exportar e importar](../commands/export-import.md) — formatos de exportación y `--extract-scripts`
- [Workflows](./workflows.md) — los formularios se referencian desde transiciones y StartForms de workflows
- [Modelos de datos](../data-models.md) — las entidades que un formulario lee y escribe
