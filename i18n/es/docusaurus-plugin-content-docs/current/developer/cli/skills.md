---
title: Skills para Claude Code
sidebar_label: Skills
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/skills.ts, src/skills/index.ts @ 4f7248a (2026-07-06) -->

Un **Skill** es un paquete instalable que le da al agente de IA Claude Code conocimiento y herramientas especializadas para un área específica. `cotctl` trae un conjunto de Skills — uno por tipo de recurso — que convierten a un agente de propósito general en un especialista en authoring de Cotalker. Esta página es la referencia del comando `cotctl skills` que los gestiona. Para el panorama de cómo encajan los Skills con el RAG y el agente, mirá [Authoring asistido por IA](./ai-authoring.md).

## Listar lo disponible

```bash
cotctl skills list
```

Esto muestra cada Skill disponible y su estado de instalación, que puede ser `[not installed]`, `[local]`, `[global]` o `[local, global]`. Agrega `--json` para salida legible por máquina — una entrada por Skill disponible, cada una con su estado de instalación por scope.

## Instalar Skills

```bash
cotctl skills install [name] [options]
```

Ejecutalo **sin un nombre** para obtener un checklist interactivo y elegir lo que quieras. Pasá un nombre para instalar uno específico.

| Opción | Descripción |
|---|---|
| `--all` | Instala todos los Skills disponibles |
| `--local` | Instala en `.claude/skills/` (solo este proyecto) |
| `--global` | Instala en `~/.claude/skills/` (todos los proyectos) |
| `-y, --yes` | Salta el prompt interactivo de scope (usa `--local` por defecto) |
| `--no-mcp` | Salta el paso de configuración del RAG/MCP de Cotalker |

Si no pasás `--local` ni `--global`, `cotctl` te pregunta interactivamente qué scope usar — salvo que pases `-y`, que toma el default más seguro `--local` sin preguntar (útil en scripts).

<div className="alert alert--info">

**Instalar también ofrece conectar el RAG.** Después de instalar, `cotctl` ofrece configurar la conexión MCP al servicio de documentación de Cotalker — la mitad de "grounding en vivo" del setup. Salteala con `--no-mcp`, o configurala más tarde con [`cotctl mcp install`](./mcp-integration.md). Para la mayoría de los partners, aceptarla es lo correcto.

</div>

## Los Skills disponibles

Cada Skill especializa al agente en un área de recursos:

| Skill | Qué le da al agente |
|---|---|
| `cotctl-surveys` | Crear y modificar YAML de encuestas |
| `cotctl-workflows` | Crear, scaffoldear y modificar workflows y máquinas de estado |
| `cotctl-properties` | Generar tipos de propiedad y propiedades |
| `cotctl-roles` | Crear y gestionar roles de acceso y permisos |
| `cotctl-users` | Crear, gestionar, exportar y aplicar YAML de usuarios |
| `cotctl-jobtitles` | Crear, gestionar, exportar y aplicar YAML de cargos (Job titles) |
| `cotctl-routines` | Crear, editar, listar, exportar y aplicar rutinas (PBScripts) |
| `cotctl-bots` | Crear, gestionar, exportar y aplicar YAML de Bot admin (slash-commands) |
| `cotctl-apply` | Aplicar recursos a entornos de Cotalker |
| `cotctl-export` | Exportar y consultar recursos |
| `cotalker-docs` | Conocimiento general de la plataforma Cotalker |

Un punto de partida común es instalarlos todos:

```bash
cotctl skills install --all --local
```

## Scopes: local vs. global

Dónde se instala un Skill determina qué proyectos pueden usarlo:

| Scope | Directorio | Aplica a |
|---|---|---|
| Local | `.claude/skills/` | Solo el proyecto actual |
| Global | `~/.claude/skills/` | Todos tus proyectos |

Usá **local** cuando trabajás en el repositorio de un cliente específico y querés los Skills versionados junto a él; usá **global** cuando querés tenerlos disponibles en todos lados donde trabajás.

## Desinstalar

```bash
cotctl skills uninstall [name] [options]
```

| Opción | Descripción |
|---|---|
| `--all` | Desinstala todos los Skills del scope seleccionado |
| `--local` | Desinstala del proyecto actual |
| `--global` | Desinstala de la configuración global |

Cuando desinstalás con `--all`, `cotctl` también pregunta si querés quitar la configuración del RAG/MCP que se configuró junto a los Skills.

## Ver también

- [Authoring asistido por IA](./ai-authoring.md) — cómo trabajan juntos los Skills, el RAG y el agente
- [Integración MCP](./mcp-integration.md) — el RAG de documentación que los Skills ofrecen conectar
