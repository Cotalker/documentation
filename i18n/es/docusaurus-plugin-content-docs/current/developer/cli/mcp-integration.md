---
title: MCP e integración con IA
sidebar_label: Integración MCP
displayed_sidebar: developer
---

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

**¿Dónde está el endpoint?** La URL del endpoint MCP es específica de tu entorno de Cotalker — tu contacto de Cotalker te la puede proveer. `cotctl mcp install` maneja los detalles de conexión por vos, así que el comando gestionado es la ruta recomendada.

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

## Ver también

- [Visión general](./overview.md) — qué es `cotctl` y cómo encajan las piezas
- [Referencia YAML de recursos](./resources/surveys.md) — la documentación que el servidor MCP hace consultable
