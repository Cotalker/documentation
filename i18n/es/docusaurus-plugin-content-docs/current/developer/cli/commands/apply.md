---
title: apply
sidebar_label: apply
displayed_sidebar: developer
---

`cotctl apply` es el comando que realmente modifica un entorno de Cotalker. Toma tu YAML y hace que la plataforma coincida con él — creando recursos que no existen y actualizando los que sí. Es el verbo que más vas a usar, así que vale la pena entenderlo bien.

Hay dos formas de ejecutarlo, según si desplegás un archivo o una carpeta entera:

| Modo | Flag | Propósito |
|---|---|---|
| Archivo único | `-f <file>` | Aplica un YAML de cualquier kind soportado |
| Directorio | `--dir <path>` | Aplica todos los YAML de una carpeta, en el orden de dependencias correcto |

<div className="alert alert--primary">

**Siempre validá primero.** `apply` escribe en un entorno real. Hacé de `cotctl validate` (y `--dry-run`) parte de tu memoria muscular antes de cada apply — especialmente contra producción.

</div>

## Cómo apply decide qué hacer

`apply` lee el campo `kind:` al inicio de tu YAML y rutea al manejador correcto. Hay siete kinds soportados:

| `kind:` | Qué gestiona |
|---|---|
| `Survey` | Formularios |
| `AccessRole` | Permisos |
| `PropertyType` | Esquemas del modelo de datos |
| `Property` | Instancias del modelo de datos |
| `JobTitle` | Posiciones organizacionales (Cargos) |
| `Workflow` | Procesos y máquinas de estado |
| `User` | Personas |

Si `kind:` falta o no se reconoce, `apply` se detiene y lista las opciones válidas (más la forma con alcance de entidad de cada una, como `cotctl roles apply`). Nunca adivina.

**Crear vs. actualizar es automático.** `apply` busca el recurso por su `code` (o `name`). Si no existe, se crea; si existe, se actualiza. No elegís — solo describís el estado deseado.

## Modo archivo único

```bash
cotctl apply -f <file.yaml> -c <profile> [options]
```

### Opciones

| Opción | Descripción |
|---|---|
| `-f, --file <path>` | **(requerido)** Ruta al archivo YAML |
| `-c, --company <profile>` | **(requerido)** Perfil a usar |
| `--dry-run` | Valida y muestra lo que *se enviaría*, sin aplicar |
| `-y, --yes` | Salta las confirmaciones (los warnings igual se imprimen a stderr) |
| `--skip-semantic-validation` | **Solo Survey** — salta los checks semánticos |
| `--skip-remote-validation` | **Solo Survey** — salta los checks remotos |

### Ejemplos

```bash
# Crear o actualizar una encuesta
cotctl apply -f my-survey.yaml -c acme

# Previsualizar lo que se enviaría — no cambia nada
cotctl apply -f my-survey.yaml -c acme --dry-run

# Un workflow, un rol, un tipo de propiedad — mismo comando, distinto kind
cotctl apply -f workflow.yaml -c acme
cotctl apply -f role.yaml -c acme
cotctl apply -f property-type.yaml -c acme
```

Un apply exitoso confirma lo que pasó:

```
Survey "my_survey" created successfully (id: 507f1f77bcf86cd799439011)
```

<div className="alert alert--info">

**Nunca gestionás IDs a mano.** Al crear, no incluís `_id`/`id` — el backend los genera. Al actualizar, `cotctl` recupera el recurso existente y resuelve los IDs correctos por vos (haciendo match de las preguntas de la encuesta por su `identifier`). Tu YAML se mantiene limpio y legible.

</div>

### Qué podés cambiar al actualizar una encuesta

Como las preguntas se matchean por `identifier`, no por posición, las ediciones se comportan de forma intuitiva:

| Querés… | Hacé esto | Resultado |
|---|---|---|
| Agregar una pregunta | Agregala a `questions[]` | Creada |
| Quitar una pregunta | Borrala de `questions[]` | Desactivada (no borrada), tras una confirmación |
| Editar una pregunta | Cambiá sus campos, mantené el `identifier` | Actualizada, ID preservado |
| Reordenar preguntas | Reordená `questions[]` | Cambia el orden, IDs preservados |

Dos cosas son inmutables una vez creadas: el `code` de una encuesta, y el `identifier` de una pregunta. `apply` se negará a renombrar cualquiera de los dos — para "renombrar", creás un recurso nuevo. Y si aplicás un YAML de encuesta sin su sección `questions` (por ejemplo, para cambiar `isActive`), las preguntas existentes se preservan automáticamente.

## Modo directorio

Para cualquier cosa más allá de un solo archivo — y especialmente para un workflow scaffoldeado, que abarca roles, tipos de propiedad, propiedades y el workflow en sí — apuntá `apply` a la carpeta y dejá que maneje el orden:

```bash
cotctl apply --dir <path> -c <profile> [options]
```

### Por qué importa el orden (y por qué no tenés que pensarlo)

Los recursos dependen entre sí: un workflow referencia roles y tipos de propiedad, que deben existir antes. `apply --dir` agrupa los documentos por kind y los aplica en este orden canónico automáticamente:

| # | Entidad | Va primero porque… |
|---|---|---|
| 1 | AccessRole | Todo lo demás referencia permisos |
| 2 | PropertyType | Fundamento del modelo de datos |
| 3 | Property | Depende de PropertyType |
| 4 | JobTitle | Depende de roles y el modelo de datos |
| 5 | Workflow | Referencia roles, tipos de propiedad y propiedades |
| 6 | Survey | Referenciada por transiciones del workflow |
| 7 | User | Depende de cargos y roles |

### Opciones

| Opción | Descripción |
|---|---|
| `--dir <path>` | **(requerido)** Carpeta con archivos YAML |
| `-c, --company <profile>` | **(requerido)** Perfil a usar |
| `--dry-run` | Previsualiza cada payload sin aplicar |
| `-y, --yes` | Salta todas las confirmaciones |
| `--continue-on-error` | Sigue si una entidad falla (default: detenerse en el primer error) |

### Ejemplo

```bash
# Previsualizar, luego aplicar
cotctl apply --dir ordenes-compra/ -c dev --dry-run
cotctl apply --dir ordenes-compra/ -c dev
```

```
Applying directory: ordenes-compra/ → dev

AccessRole (6 documents)
  ✓ created  ordenes-compra:start-form
  ...
PropertyType (3 documents)
  ✓ created  oc_transaccion
  ...
Workflow (1 document)
  ✓ created  ordenes_compra

─────────────────────────────────────────────────────────────────
13 created, 0 updated, 0 errors
```

### Es seguro correrlo dos veces

El apply de directorio es **idempotente** — re-ejecutarlo es esperado y seguro:

| Escenario | Comportamiento |
|---|---|
| Entorno nuevo | Todo creado |
| Re-apply, sin cambios | Todo actualizado (un no-op en la práctica) |
| Re-apply con archivos nuevos | Lo existente actualizado, lo nuevo creado |
| Estado quitado de un YAML de workflow | **Bloqueado** — se rechazan los estados faltantes |
| Campo inmutable cambiado | **Bloqueado** — se aplica la inmutabilidad de `code`/`nameCode` |

## Una palabra sobre rate limits y permisos

El backend limita la tasa de escrituras (aproximadamente 20 por ventana de 5 segundos). En scripts de batch grandes, espaciá tus llamadas o manejá las respuestas `429`. Y si algún apply devuelve `403`, el usuario logueado no tiene el permiso de administración requerido — eso es un tema de permisos de Cotalker, no de la CLI.

## El ciclo estándar

En la práctica, desplegar un workflow se ve así:

```bash
cotctl validate --dir ordenes-compra/            # 1. detectar errores offline
cotctl apply    --dir ordenes-compra/ -c dev     # 2. desplegar
cotctl validate --workflow ordenes_compra -c dev # 3. check de preparación para producción
```

## Ver también

- [validate](./validate.md) — siempre antes de apply
- [scaffolding](./scaffolding.md) — generá la carpeta que consume `apply --dir`
- [Referencia YAML de recursos](../resources/surveys.md) — el esquema de cada kind
