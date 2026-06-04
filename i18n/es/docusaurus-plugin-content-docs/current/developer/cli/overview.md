---
title: CLI de Cotalker (cotctl)
sidebar_label: Visión general
displayed_sidebar: developer
---

<span className="hero__title">CLI de Cotalker — cotctl</span>
<br/>
<br/>

_¡Bienvenido! Esta guía te lleva desde cero hasta desplegar tu primera configuración de Cotalker desde la línea de comandos. Está escrita para **partners de implementación** — los consultores técnicos y desarrolladores que construyen soluciones sobre Cotalker — y no asume experiencia previa con la CLI._

## ¿Qué es cotctl y por qué usarlo?

Cuando configurás Cotalker desde el panel de administración web, hacés clic en formularios para crear encuestas, workflows, roles, etc. Eso funciona bien para cambios puntuales, pero tiene límites: los cambios no quedan versionados, son difíciles de reproducir entre entornos y no se pueden automatizar.

`cotctl` resuelve eso. Es una **herramienta de línea de comandos que gestiona los recursos de Cotalker de forma declarativa a partir de archivos YAML** — muy parecido a cómo `kubectl` gestiona Kubernetes, o Terraform gestiona infraestructura. En vez de hacer clics, *describís* el recurso que querés en un archivo de texto, y `cotctl` hace que la plataforma coincida con esa descripción.

En la práctica, esto te da cuatro cosas que importan cuando entregás proyectos para clientes:

- **Declarativo.** Escribís *qué querés* (una encuesta con estas preguntas, un workflow con estos estados) y `cotctl apply` decide si crearlo o actualizarlo. No gestionás el "cómo".
- **Versionable.** Tu YAML vive en tu propio repositorio Git. Cada cambio en la configuración de un cliente es revisable en un pull request y reversible con un `git revert`.
- **Reproducible.** Los mismos archivos se despliegan primero a staging y luego a producción, contra cualquier empresa a la que tengas acceso. Se acabó el "funcionaba en la demo".
- **Automatizable.** Al ser un comando, corre desatendido en un pipeline de CI/CD — los despliegues se vuelven repetibles y no dependen de que alguien recuerde los pasos.

<div className="alert alert--primary">

**El modelo mental.** Una empresa en Cotalker es un conjunto de *recursos* (encuestas, workflows, propiedades, roles, usuarios…). Con `cotctl` mantenés una descripción YAML de esos recursos en Git y los aplicás (`apply`) a un entorno. El YAML es la fuente de verdad; el entorno es el resultado.

</div>

## Qué podés gestionar

Casi todo bloque de construcción que ensamblás durante una implementación tiene su representación en `cotctl`:

| Recurso | Qué es | Grupo de comandos |
|---|---|---|
| **Encuestas** | Formularios para capturar datos | `cotctl surveys`, `cotctl apply` |
| **Workflows** | Procesos y sus máquinas de estado | `cotctl workflows`, `cotctl workflows scaffold` |
| **Tipos de propiedad y propiedades** | El modelo de datos (entidades y sus campos) | `cotctl property-types`, `cotctl properties` |
| **Roles de acceso** | Permisos y qué puede ver/hacer cada rol | `cotctl roles` |
| **Usuarios** | Personas de la empresa, con su jerarquía | `cotctl users` |
| **Cargos (Job titles)** | Posiciones organizacionales | `cotctl jobtitles` |

No te preocupes por aprenderlos todos de una. La mayoría de los partners empieza con encuestas y workflows, y va sumando el resto según lo pidan los proyectos.

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

Después, recurrí a estas cuando las necesites:

- [**Referencia YAML de recursos**](./resources/surveys.md) — el esquema exacto de cada tipo de recurso.
- [**Tutoriales**](./tutorials.md) — recetas completas, de punta a punta, para seguir paso a paso.
- [**Solución de problemas**](./troubleshooting.md) — qué significan los errores comunes y cómo resolverlos.
- [**CI/CD**](./ci-cd.md) — correr `cotctl` en pipelines automatizados.

<div className="alert alert--secondary">

**Una nota sobre los códigos de salida.** `cotctl` devuelve `0` cuando todo salió bien y `1` ante cualquier error (un problema de validación, un error de API, un perfil inexistente o un archivo faltante). Todavía no lo necesitás, pero es lo que vuelve a `cotctl` seguro de usar en scripts y gates de CI más adelante.

</div>

¿Listo? Vamos a [instalarlo](./installation.md).
