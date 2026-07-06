---
title: MCP e integración con IA
sidebar_label: Integración MCP
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/mcp.ts @ 4f7248a (2026-07-06) -->

`cotctl` puede conectar asistentes de IA — como Claude — a la documentación técnica de Cotalker, de modo que mientras creás recursos puedas hacer preguntas y obtener respuestas fundamentadas en la documentación real y actualizada. Esta página explica la idea y cómo configurarla.

## ¿Qué es MCP, y por qué le importaría a un partner?

**MCP** (Model Context Protocol) es una forma estándar de darle a un asistente de IA acceso a una fuente externa de conocimiento o herramientas. Cotalker expone un servidor MCP respaldado por su documentación, así un asistente conectado a él puede responder "¿cómo estructuro una transición de workflow?" o "¿qué campos toma un tipo de propiedad?" usando el material de referencia real en vez de adivinar.

Para un partner que crea YAML, eso significa ayuda más rápida y precisa dentro de tu editor o herramienta de IA — menos idas y vueltas a la documentación, menos nombres de campo inventados.

## Registrar el servidor

El camino más simple es el comando gestionado, que te guía en la conexión y te deja elegir qué conjuntos de documentación incluir:

```bash
cotctl mcp install
```

<div className="alert alert--info">

**La vía gestionada no necesita endpoint.** `cotctl mcp install` ya conoce el endpoint de documentación de Cotalker por defecto, así que no tienes que indicarlo — solo ejecútalo. Solo necesitas una URL explícita si registras el servidor manualmente con `claude mcp add` (abajo), o si quieres apuntar a un entorno distinto del predeterminado (puedes sobrescribirlo con la variable de entorno `COTCTL_MCP_URL`).

</div>

Si preferís registrarlo manualmente con un cliente compatible con MCP, la forma es un transporte HTTP que apunta al endpoint de documentación:

```bash
# Reemplazá la URL por el endpoint MCP de documentación de tu entorno
claude mcp add --transport http cotalker-docs https://<your-cotalker-docs-endpoint>/mcp
```

## Enfocarte en documentación específica

Un único endpoint puede servir varios conjuntos de documentación ("índices"). Podés acotar una conexión solo a los que te importan con un parámetro de query `?indices=` — por ejemplo, para consultar solo la documentación de la CLI:

```bash
claude mcp add --transport http cotalker-cli \
  "https://<your-cotalker-docs-endpoint>/mcp?indices=cotctl"
```

También podés registrar **múltiples** servidores, cada uno acotado a un conjunto distinto — uno para la CLI, otro para la API y los modelos de datos — de modo que el asistente rutee cada pregunta a la fuente más relevante:

```bash
claude mcp add --transport http cotalker-cli \
  "https://<your-cotalker-docs-endpoint>/mcp?indices=cotctl"
claude mcp add --transport http cotalker-api \
  "https://<your-cotalker-docs-endpoint>/mcp?indices=cot-api,cot-models"
```

Cada servidor registrado anuncia qué cubre, que es cómo el asistente decide dónde buscar.

## Instalar sin prompts

`cotctl mcp install` es interactivo por defecto, pero puedes manejarlo enteramente por flags — útil en scripts de setup o en un bootstrap de dotfiles. Pasar `--indices` salta el prompt de selección de índices, lo que vuelve no interactivo todo el comando:

| Flag | Descripción |
|---|---|
| `--name <name>` | Nombre del servidor (default `cotalker-rag`) |
| `--scope <local\|global>` | Dónde escribir la config, en vez de preguntar |
| `--indices <a,b,c>` | Nombres de índices separados por coma — salta el prompt de selección |
| `--url <url>` | URL personalizada del servidor MCP, sobrescribiendo el default del build |

```bash
cotctl mcp install --name cotalker-cli --scope local --indices cotctl
```

## Gestionar tus conexiones

Más allá de `install`, el grupo de comandos `mcp` te deja inspeccionar y ordenar lo configurado:

- **`cotctl mcp list`** — muestra cada servidor MCP configurado, agrupado por scope (local `.mcp.json` y global `~/.claude/settings.json`), con la URL de cada servidor y los índices a los que está acotado. Agrega `--scope` para filtrar.
- **`cotctl mcp indices`** — lista los índices que anuncia el servidor y muestra, por scope, cuáles de tus servidores configurados usan cada uno (y qué índices no se usan en ninguna parte). Agrega `--json` para salida legible por máquina, o `--url` para consultar un endpoint distinto del default.
- **`cotctl mcp remove [name]`** — quita un servidor configurado. Ejecútalo sin nombre para un selector interactivo; pasa un `name` (y `--scope` para desambiguar si existe en ambos) para apuntar a uno directamente. `-y` salta la confirmación.

```bash
cotctl mcp list
cotctl mcp indices
cotctl mcp remove cotalker-cli --scope local -y
```

## Ver también

- [Visión general](./overview.md) — qué es `cotctl` y cómo encajan las piezas
- [Referencia YAML de recursos](./resources/surveys.md) — la documentación que el servidor MCP hace consultable
