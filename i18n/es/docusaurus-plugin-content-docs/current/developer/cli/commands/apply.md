---
title: apply
sidebar_label: apply
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/apply.ts @ 4f7248a (2026-07-06) -->

`cotctl apply` es el comando que realmente modifica un entorno de Cotalker. Toma tu YAML y hace que la plataforma coincida con él — creando recursos que no existen y actualizando los que sí. Es el verbo que más vas a usar, así que vale la pena entenderlo bien.

Hay dos formas de ejecutarlo, según si despliegas un archivo o una carpeta entera:

| Modo | Flag | Propósito |
|---|---|---|
| Archivo único | `-f <file>` | Aplica un YAML de cualquier kind soportado |
| Directorio | `--dir <path>` | Aplica todos los YAML de una carpeta, en el orden de dependencias correcto |

<div className="alert alert--primary">

**Siempre valida primero.** `apply` escribe en un entorno real. Haz de `cotctl validate` (y `--dry-run`) parte de tu memoria muscular antes de cada apply — especialmente contra producción.

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

**Crear vs. actualizar es automático.** `apply` busca el recurso por su `code` (o `name`). Si no existe, se crea; si existe, se actualiza. No eliges — solo describes el estado deseado.

## Modo archivo único

```bash
cotctl apply -f <file.yaml> -c <profile> [options]
```

### Opciones

El `apply` unificado es deliberadamente escueto — un núcleo común más algunos flags específicos por kind que solo surten efecto cuando el `kind` del archivo coincide:

| Opción | Aplica a | Descripción |
|---|---|---|
| `-f, --file <path>` | todos | **(requerido)** Ruta al archivo YAML |
| `-c, --company <profile>` | todos | **(requerido)** Perfil a usar |
| `--dry-run` | todos | Valida y muestra lo que *se enviaría*, sin aplicar |
| `-y, --yes` | todos | Salta las confirmaciones (los warnings igual se imprimen a stderr) |
| `--skip-semantic-validation` | solo Survey | Salta los checks semánticos — error fatal con cualquier otro kind |
| `--skip-remote-validation` | solo Survey | Salta los checks de identificadores remotos — error fatal con cualquier otro kind |
| `--allow-reactivate` | User, JobTitle | Permite `isActive: true` sobre un registro actualmente inactivo (de lo contrario, bloqueado) |
| `--notify-email` | solo User | Envía el correo de bienvenida al crear (incompatible con un `password` en el YAML) |
| `--lax-code` | solo JobTitle | Solo en *update*, degrada el check de formato de `code` a advertencia cuando el registro existente ya tiene un code no conforme |
| `--rollback` | solo Workflow | Ante un error a mitad del apply, desactiva los recursos creados durante el apply parcial |
| `--legacy-replace-workflows` | solo Workflow | Válvula de escape 0.7.x que restaura la semántica destructiva de reemplazo previa a 0.7.0. Imprime una advertencia a stderr; se eliminará en 0.8.0 |

Los flags `--skip-*` son solo para Survey por diseño: pasarlos con cualquier otro kind (o con un directorio que contenga archivos no-Survey) es un error fatal, no un no-op silencioso.

<div className="alert alert--secondary">

**Algunos flags viven en los apply por entidad, no aquí.** `--quiet`, `--diff`, `--json` y `--fail-on-destructive` **no** son opciones del `cotctl apply` unificado. Existen solo en `cotctl surveys apply`, `cotctl properties apply` y `cotctl workflows apply` — las formas por entidad pensadas para CI. Recurre a ellas cuando necesites salida legible por máquina o un gate de cambios destructivos; ver [CI/CD](../ci-cd.md).

</div>

### Ejemplos

```bash
# Crear o actualizar un formulario
cotctl apply -f my-survey.yaml -c acme

# Previsualizar lo que se enviaría — no cambia nada
cotctl apply -f my-survey.yaml -c acme --dry-run

# Un workflow, un rol, un tipo de propiedad — mismo comando, distinto kind
cotctl apply -f workflow.yaml -c acme
cotctl apply -f role.yaml -c acme
cotctl apply -f property-type.yaml -c acme
```

Un apply exitoso confirma lo que pasó, una línea por recurso:

```
Survey "my_survey" created successfully
```

Una actualización imprime `updated successfully` en su lugar. `cotctl` no muestra el `_id` generado — nunca gestionas IDs a mano (ver la nota siguiente).

<div className="alert alert--info">

**Nunca gestionas IDs a mano.** Al crear, no incluyes `_id`/`id` — el backend los genera. Al actualizar, `cotctl` recupera el recurso existente y resuelve los IDs correctos por ti (haciendo match de las preguntas del formulario por su `identifier`). Tu YAML se mantiene limpio y legible.

</div>

### Qué puedes cambiar al actualizar un formulario

Como las preguntas se matchean por `identifier`, no por posición, las ediciones se comportan de forma intuitiva:

| Quieres… | Haz esto | Resultado |
|---|---|---|
| Agregar una pregunta | Agrégala a `questions[]` | Creada |
| Quitar una pregunta | Bórrala de `questions[]` | Desactivada (no borrada), tras una confirmación |
| Editar una pregunta | Cambia sus campos, mantén el `identifier` | Actualizada, ID preservado |
| Reordenar preguntas | Reordena `questions[]` | Cambia el orden, IDs preservados |

Dos cosas son inmutables una vez creadas: el `code` de un formulario, y el `identifier` de una pregunta. `apply` se negará a renombrar cualquiera de los dos — para "renombrar", creas un recurso nuevo. Y si aplicas un YAML de formulario sin su sección `questions` (por ejemplo, para cambiar `isActive`), las preguntas existentes se preservan automáticamente.

## Previsualiza primero: `--dry-run`

`--dry-run` valida el archivo e imprime lo que *pasaría* sin enviar nada. Sobre el `apply` unificado reporta la acción prevista por recurso:

```
--- DRY RUN ---

  Would CREATE Survey: my_survey
```

Los apply por entidad (`surveys apply`, `properties apply`, `workflows apply`) muestran además un **diff campo por campo** sobre esto, y marcan cualquier cambio **destructivo** — una pregunta eliminada, un estado quitado, una desactivación — para que lo detectes antes de que ocurra. En CI puedes convertir esa señal en un gate estricto con `--fail-on-destructive`, que sale con `2` cuando un dry-run encuentra un cambio destructivo. Esos flags de diff y de gating están documentados en [CI/CD](../ci-cd.md); el `apply` unificado que se muestra aquí conserva la previsualización simple.

## Apply de workflows: semántica de merge

Desde 0.7.0, aplicar un `Workflow` es un **merge**, no un reemplazo total. `cotctl` obtiene el workflow actual, fusiona tu YAML sobre él y escribe el resultado de vuelta (un GET-merge-PUT). Las consecuencias prácticas:

- **Un campo que omites se preserva.** Deja una sección fuera de tu YAML y el valor en vivo se mantiene — puedes aplicar un workflow parcial para tocar una sola cosa con seguridad.
- **Un arreglo vacío explícito borra.** Escribir `someList: []` es un "déjalo vacío" deliberado, y *sí* limpiará el valor en vivo. Omitir la clave y escribir `[]` significan cosas distintas.
- **Los estados no pueden desaparecer en silencio.** Quitar un estado del YAML no lo borra; los estados faltantes se rechazan para que no pierdas uno por accidente.

<div className="alert alert--secondary">

**Omite para conservar, `[]` para vaciar.** Esta es la única regla que suele confundir. Si no quieres cambiar una lista, deja la clave fuera por completo. El comportamiento completo campo por campo está en [Semántica de merge de workflows](../resources/workflows/merge-semantics.md).

</div>

El flag `--legacy-replace-workflows` restaura el comportamiento antiguo previo a 0.7.0, donde los campos omitidos se borraban. Existe solo como válvula de escape temporal para 0.7.x, imprime una advertencia a stderr al usarse y se eliminará en 0.8.0 — no deberías necesitarlo.

## Modo directorio

Para cualquier cosa más allá de un solo archivo — y especialmente para un workflow scaffoldeado, que abarca roles, tipos de propiedad, propiedades y el workflow en sí — apunta `apply` a la carpeta y deja que maneje el orden:

```bash
cotctl apply --dir <path> -c <profile> [options]
```

### Por qué importa el orden (y por qué no tienes que pensarlo)

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

Antes de aplicar, `cotctl` muestra lo que encontró y pide confirmación; luego reporta una línea por recurso y un recuento final:

```
Applying directory: ordenes-compra/
Profile: dev

Found 10 YAML files:
  6 AccessRole files (6 documents)
  3 PropertyType files (3 documents)
  1 Workflow file (1 document)

Apply 10 resources to dev? (Y/n)
  [created] roles.yaml — AccessRole: ordenes-compra:start-form
  [created] property-types.yaml — PropertyType: oc_transaccion
  [created] workflow.yaml — Workflow: ordenes_compra

Applied directory "ordenes-compra/": 13 created, 0 updated, 0 error(s), 0 skipped
```

Bajo `--dry-run` las líneas por recurso muestran `[CREATE]` / `[UPDATE]` en vez de `[created]` / `[updated]`, y un archivo con error muestra `[error] <file> — <entity> <identifier>: <message>`.

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

El backend limita la tasa de escrituras (aproximadamente 20 por ventana de 5 segundos). En scripts de batch grandes, espacia tus llamadas o maneja las respuestas `429`. Y si algún apply devuelve `403`, el usuario logueado no tiene el permiso de administración requerido — eso es un tema de permisos de Cotalker, no de la CLI.

## El ciclo estándar

En la práctica, desplegar un workflow se ve así:

```bash
cotctl validate --dir ordenes-compra/            # 1. detectar errores offline
cotctl apply    --dir ordenes-compra/ -c dev     # 2. desplegar
cotctl validate --workflow ordenes_compra -c dev # 3. check de preparación para producción
```

## Ver también

- [validate](./validate.md) — siempre antes de apply
- [scaffolding](./scaffolding.md) — genera la carpeta que consume `apply --dir`
- [Referencia YAML de recursos](../resources/surveys.md) — el esquema de cada kind
