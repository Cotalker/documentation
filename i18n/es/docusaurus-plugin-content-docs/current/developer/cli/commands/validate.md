---
title: validate
sidebar_label: validate
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/validate.ts @ 4f7248a (2026-07-06) -->

`cotctl validate` revisa tu YAML *antes* de desplegarlo. Tomar el hábito de validar primero es una de las cosas de mayor valor que podés hacer como partner: detecta errores en tu máquina, en segundos, en vez de como un cambio a medio aplicar en el entorno de un cliente.

Hay tres cosas que podrías querer validar, y `validate` tiene un modo para cada una:

| Modo | Flag | Red | Para qué sirve |
|---|---|---|---|
| Archivo | `-f <file>` | Offline | Revisar un único archivo YAML de cualquier kind soportado |
| Directorio | `--dir <path>` | Offline | Verificación cruzada de una carpeta entera antes de `apply --dir` |
| Workflow | `--workflow <nameCode>` | Online | Correr el checklist de preparación para producción contra un workflow en vivo |

## Modo archivo — un archivo, offline

La verificación más rápida. Valida un único archivo YAML contra el esquema de su `kind`, sin llamada a la API:

```bash
cotctl validate -f my-survey.yaml
```

```
✓ my-survey.yaml is valid
```

Si algo está mal, te dice qué y dónde:

```
✗ my-survey.yaml has validation errors:

  - code: code must start with a lowercase letter and contain only lowercase letters, numbers, and underscores
```

El modo archivo no es solo para formularios. Lee el campo `kind` y corre el esquema correspondiente, así que valida cualquiera de los siete kinds que soporta `apply` — `Survey`, `AccessRole`, `PropertyType`, `Property`, `JobTitle`, `Workflow`, `User`. (Un archivo sin `kind` se trata como Survey, por compatibilidad hacia atrás.)

Un mismo archivo puede contener **varios documentos** separados por `---`. `validate` revisa cada uno y **acumula** los errores — no se detiene en el primer documento con problemas — y luego reporta un recuento por kind como `2 Survey documents, 1 User document validated successfully`, para que arregles todo en una sola pasada.

Por debajo corren hasta tres capas de verificación — pero solo la primera aplica a todos los kinds:

| Capa | Qué revisa | Aplica a | Cómo saltarla |
|---|---|---|---|
| Estructura (Zod) | Tipos, campos requeridos, enums | **Todos los kinds** | Siempre activa |
| Semántica | `function run()` en exec hooks, botones en la etapa equivocada, campos deprecados | **Solo Survey** | `--skip-semantic-validation` |
| Remota | Unicidad de identificadores en la empresa, que las entidades referenciadas existan | **Solo Survey** | Requiere `--remote` + `-c <profile>` |

Los kinds distintos de Survey reciben solo la capa estructural (Zod). Las capas semántica y remota son específicas de Survey. Las verificaciones remotas llegan a la API, así que requieren un perfil — y `--remote` no se puede combinar con `--dir`:

```bash
cotctl validate -f my-survey.yaml --remote -c acme
```

## Modo directorio — una carpeta entera, offline

Este es el que más vas a usar al trabajar con workflows scaffoldeados. Valida cada archivo YAML de una carpeta **y** revisa que se referencien entre sí correctamente — todo offline. Ejecutalo justo antes de `apply --dir`:

```bash
cotctl validate --dir ordenes-compra/
```

Corre dos familias de checks. **Checks de esquema**, por archivo:

| ID | Check |
|---|---|
| S1 | El archivo parsea como YAML válido |
| S2 | `kind` está presente y es reconocido |
| S3 | El documento valida contra el esquema de su `kind` |

Y **checks de referencias cruzadas**, entre archivos — esto es lo que detecta una propiedad apuntando a un tipo de propiedad inexistente:

| ID | Severidad | Check |
|---|---|---|
| X1 | warn | Las cadenas de permiso (`name:action`) están definidas como AccessRoles |
| X2 | fail | `Property.propertyType` referencia un PropertyType existente |
| X3 | fail | Las referencias de `propertyType` de la máquina de estado del workflow resuelven |
| X4 | fail | `states[].property` del workflow referencia una Property existente |
| X5 | fail | El `initialState` de la máquina de estado referencia una Property existente |
| X6 | warn | Los permisos del workflow están definidos como AccessRoles |

Una corrida limpia termina con un veredicto claro:

```
Results: 11 PASS, 0 WARN, 0 FAIL — ready to apply
```

Agregá `--json` si querés consumir el resultado en un script.

## Modo workflow — preparación para producción, online

Una vez que un workflow está en vivo, este modo corre el checklist de **Marcha Blanca** (puesta en producción) contra él. Es un check online, así que necesita un perfil:

```bash
cotctl validate --workflow ordenes_compra -c prod
```

El checklist está organizado en tres secciones, y podés correr solo una con `--section`:

- **Nomenclatura** (`nomenclature`) — convenciones de nombres para códigos, formularios, propiedades y permisos.
- **Permisos** (`permissions`) — que exista un rol Manager con todos los permisos del flujo, conectado a los formularios vinculados.
- **Configuración** (`configuration`) — reglas técnicas, como que los campos de control sean de solo lectura y que exista un estado de error.

```bash
# solo los checks de nomenclatura
cotctl validate --workflow ordenes_compra --section nomenclature -c prod
```

```
Results: 13 PASS, 1 WARN, 0 FAIL — production ready
```

Los checks se califican **WARN** (una recomendación) o **FAIL** (un problema real). El comando sale con `0` cuando todo pasa o solo hay warnings, y con `1` cuando al menos un check falla — que es justo lo que querés como gate en un pipeline.

<div className="alert alert--info">

**Un par de límites conocidos.** Los checks profundos de calidad de código JavaScript sobre exec hooks no están implementados, y el check de estado de error (T3) busca la convención de nombres `_estado_error` — si tu implementación nombra su estado de error de otra forma, esperá un warning aunque exista un estado de error.

</div>

## Ver también

- [apply](./apply.md) — desplegá tus recursos una vez que la validación pasa
- [scaffolding](./scaffolding.md) — generá un esqueleto de workflow para validar y aplicar
