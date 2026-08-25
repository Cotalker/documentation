---
title: CLI de Cotalker (cotctl)
sidebar_label: Visión general
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/index.ts @ 4f7248a (2026-07-06) -->

<span className="hero__title">CLI de Cotalker — cotctl</span>
<br/>
<br/>

_¡Bienvenido! Esta guía te lleva desde cero hasta desplegar tu primera configuración de Cotalker desde la línea de comandos. Está escrita para **partners de implementación** — los consultores técnicos y desarrolladores que construyen soluciones sobre Cotalker — y no asume experiencia previa con la CLI._

## ¿Qué es cotctl y por qué usarlo?

Cuando configurás Cotalker desde el panel de administración web, hacés clic para crear formularios, workflows, roles, etc. Eso funciona bien para cambios puntuales, pero tiene límites: los cambios no quedan versionados, son difíciles de reproducir entre entornos y no se pueden automatizar.

`cotctl` resuelve eso. Es una **herramienta de línea de comandos que gestiona los recursos de Cotalker de forma declarativa a partir de archivos YAML** — muy parecido a cómo `kubectl` gestiona Kubernetes, o Terraform gestiona infraestructura. En vez de hacer clics, *describís* el recurso que querés en un archivo de texto, y `cotctl` hace que la plataforma coincida con esa descripción.

En la práctica, esto te da cuatro cosas que importan cuando entregás proyectos para clientes:

- **Declarativo.** Escribís *qué querés* (un formulario con estas preguntas, un workflow con estos estados) y `cotctl apply` decide si crearlo o actualizarlo. No gestionás el "cómo".
- **Versionable.** Tu YAML vive en tu propio repositorio Git. Cada cambio en la configuración de un cliente es revisable en un pull request y reversible con un `git revert`.
- **Reproducible.** Los mismos archivos se despliegan primero a staging y luego a producción, contra cualquier empresa a la que tengas acceso. Se acabó el "funcionaba en la demo".
- **Automatizable.** Al ser un comando, corre desatendido en un pipeline de CI/CD — los despliegues se vuelven repetibles y no dependen de que alguien recuerde los pasos.

<div className="alert alert--primary">

**El modelo mental.** Una empresa en Cotalker es un conjunto de *recursos* (formularios, workflows, propiedades, roles, usuarios…). Con `cotctl` mantenés una descripción YAML de esos recursos en Git y los aplicás (`apply`) a un entorno. El YAML es la fuente de verdad; el entorno es el resultado.

</div>

## Qué puedes gestionar

Casi todo bloque de construcción que se ensambla durante una implementación tiene su representación en `cotctl`. Los grupos de comandos de recursos son:

| Recurso | Qué es | Grupo de comandos |
|---|---|---|
| **Formularios** | Capturan datos estructurados de las personas | `cotctl surveys` |
| **Roles de acceso** | Permisos y qué puede ver/hacer cada rol | `cotctl roles` |
| **Tipos de propiedad** | Los esquemas del modelo de datos (la forma de las entidades) | `cotctl property-types` |
| **Propiedades** | Instancias del modelo de datos sobre esos esquemas | `cotctl properties` |
| **Workflows** | Procesos y sus máquinas de estado | `cotctl workflows` |
| **Cargos (Job titles)** | Posiciones organizacionales | `cotctl jobtitles` |
| **Usuarios** | Personas de la empresa, con su jerarquía | `cotctl users` |
| **Bots (slash-commands)** | Bots administrativos de tipo `/comando` que los usuarios invocan en el chat | `cotctl bots` |
| **Tipos de bot** | El catálogo de tipos de ParametrizedBot y sus versiones registradas (`PBMessage`, `PBCreateTask`, …) — solo lectura, resuelto en vivo desde el backend | `cotctl bot-types` |
| **SLAs** | Acuerdos de nivel de servicio asociados a máquinas de estado | `cotctl slas` |
| **Schedules** | Programaciones cron y de una sola vez | `cotctl schedules` |
| **Rutinas (PBScripts)** | Scripts reutilizables del lado del servidor | `cotctl routines` |

<div className="alert alert--secondary">

**`bots` y `bot-types` son dos cosas distintas.** `cotctl bot-types` es el *catálogo* de solo lectura de los tipos de ParametrizedBot y las versiones que el backend tiene registradas para cada uno — lo consultas mientras redactas YAML para fijar la versión correcta. `cotctl bots` es el CRUD de las entidades **Bot admin**: los slash-commands (`/comando`) que los usuarios ejecutan en el chat. Versiones anteriores agrupaban ambos bajo `bots`; el catálogo ahora vive en `bot-types` (ver la nota de migración en [Solución de problemas](./troubleshooting.md)).

</div>

Sobre los grupos de recursos están los comandos que operan sobre ellos y las herramientas que los rodean:

| Comando | Qué hace |
|---|---|
| `cotctl login` / `cotctl logout` / `cotctl profile` | Conectarse a un entorno, revocar el acceso y gestionar los perfiles guardados |
| `cotctl apply` | Crear o actualizar recursos desde YAML (un archivo o un directorio entero) |
| `cotctl validate` | Revisar el YAML — y los workflows en vivo — antes de desplegar |
| `cotctl skills` / `cotctl mcp` | Instalar las Skills de Claude Code y conectar el RAG de documentación para la [redacción asistida por IA](./ai-authoring.md) |

No hace falta aprenderlos todos de una. La mayoría de los partners empieza con formularios y workflows, y va sumando el resto según lo pidan los proyectos.

<div className="alert alert--primary">

**Dos funciones de seguridad insignia.** Cada apply admite `--dry-run`, que muestra un **diff campo por campo** de exactamente qué cambiaría sin tocar el entorno. Y los apply por entidad (`surveys apply`, `properties apply`, `workflows apply`) van más allá: **marcan los cambios destructivos** — una pregunta eliminada, un estado quitado, una desactivación — y pueden hacer fallar un pipeline ante ellos con `--fail-on-destructive`. Ves qué hace un cambio antes de que ocurra.

</div>

## Una probada de 60 segundos

Este es el camino más corto desde la nada hasta un cambio desplegado. Explicamos cada paso en detalle en las páginas siguientes — esto es solo para que veas la forma:

```bash
# 1. Instalar la herramienta (una vez por máquina)
npm install -g @cotctl/cli

# 2. Conectarla a un entorno. Esto guarda un "perfil" reutilizable llamado acme.
cotctl login --url https://web.cotalker.com --subdomain acme

# 3. Desplegar un recurso. El flag -c le dice a cotctl sobre qué empresa actuar.
cotctl apply -f my-survey.yaml -c acme
```

Ese es el ciclo completo: **instalar → login → apply.** Todo lo demás en esta guía hace cada uno de esos pasos más potente y más seguro.

## Cómo está organizada esta guía

Recomendamos leer las tres primeras páginas en orden — te dejan listo y productivo:

1. [**Instalación**](./installation.md) — poné `cotctl` en tu máquina y confirmá que funciona.
2. [**Autenticación**](./authentication.md) — conectate a un entorno y entendé los perfiles y el importantísimo flag `-c`.
3. [**Practicá en una compañía demo**](./demo-company.md) — armá un entorno seguro, no productivo, para que tu primer caso real no sea la compañía en vivo de un cliente.
4. [**Comandos**](./commands/apply.md) — los verbos del día a día: `apply`, `validate`, exportar/importar y scaffolding.

Después, recurre a estas cuando las necesites:

- [**Referencia YAML de recursos**](./resources/surveys.md) — el esquema exacto de cada tipo de recurso, incluidos [usuarios](./resources/users.md), [roles](./resources/roles.md), [cargos](./resources/jobtitles.md), bots, rutinas, schedules y SLAs.
- [**Tutoriales**](./tutorials.md) — recetas completas, de punta a punta, para seguir paso a paso.
- [**Solución de problemas**](./troubleshooting.md) — qué significan los errores comunes y cómo resolverlos.
- [**CI/CD**](./ci-cd.md) — correr `cotctl` en pipelines automatizados.

<div className="alert alert--secondary">

**Una nota sobre los códigos de salida.** `cotctl` devuelve `0` en caso de éxito y `1` ante un error de ejecución (un error de API, un perfil inexistente, un archivo faltante). Un tercer código, `2`, significa **fallo de validación** — el YAML fue rechazado antes de enviar nada — y es también lo que devuelve `--fail-on-destructive` cuando un dry-run detecta un cambio destructivo. Todavía no lo necesitas, pero es lo que vuelve a `cotctl` seguro de conectar a scripts y gates de CI más adelante. [CI/CD](./ci-cd.md) detalla de dónde sale exactamente cada código.

</div>

¿Listo? Vamos a [instalarlo](./installation.md).
