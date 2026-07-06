---
title: Authoring asistido por IA (Skills y RAG)
sidebar_label: Authoring con IA
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/bot-types.ts @ 4f7248a (2026-07-06) -->

Hasta acá esta guía trató a `cotctl` como una herramienta que *vos* manejás a mano. Pero `cotctl` es también la base de algo más grande: **crear configuraciones de Cotalker con la ayuda de un agente de IA.** Esta página explica cómo encaja ese ecosistema — y por qué te vuelve, como partner, dramáticamente más rápido.

## La idea en una imagen

Escribir el YAML de recursos a mano es preciso pero lento, y es fácil olvidar un campo o una convención de nombres. Un agente de IA como **Claude Code** puede escribir ese YAML por vos — *si* sabe dos cosas: cómo están estructurados los recursos de Cotalker, y qué existe realmente en la plataforma ahora mismo. `cotctl` provee exactamente esas dos cosas, a través de **Skills** y **RAG**:

```
              Claude Code  (el agente de IA)
                    │   escribe el YAML por vos
        ┌───────────┴────────────┐
        │                        │
     SKILLS                   RAG (vía MCP)
 cotctl skills install     cotctl mcp install
 → experticia de dominio:  → grounding en vivo:
   cómo se crea cada          documentación
   recurso                    actualizada de Cotalker
        └───────────┬────────────┘
                    ▼
   YAML correcto → cotctl validate → cotctl apply
```

- **Skills** le enseñan al agente *cómo* escribir cada tipo de recurso (un formulario, un workflow, un rol…), codificando las convenciones de Cotalker para que la salida esté bien formada.
- **RAG** (a través de un servidor MCP) groundea al agente en la documentación *actual* de Cotalker, así responde desde material de referencia real en vez de adivinar nombres de campos.

Juntos, vos describís lo que querés en lenguaje natural, el agente produce YAML groundeado, y terminás con el mismo ciclo confiable `validate` → `apply` que ya conocés.

## Las tres piezas

### 1. El agente

[Claude Code](https://claude.com/claude-code) es el asistente de IA que hace el authoring. Por sí solo es un generalista capaz; las dos piezas siguientes lo convierten en un especialista en Cotalker.

### 2. Skills — experticia de dominio, instalada

Un **Skill** es un paquete instalable que le da al agente conocimiento y herramientas especializadas para un área. `cotctl` trae un conjunto de ellos — uno por tipo de recurso — que instalás con un solo comando:

```bash
cotctl skills install
```

Una vez instalados, pedirle al agente "creá un workflow de órdenes de compra" produce YAML que sigue la estructura y las convenciones de nombres de Cotalker, porque el Skill correspondiente lo está guiando. La referencia completa del comando — listar, scopes, y los Skills disponibles — está en la página de [Skills](./skills.md).

### 3. RAG — grounding en documentación viva

**RAG** (Retrieval-Augmented Generation) le permite al agente consultar la documentación de Cotalker mientras trabaja, vía un servidor **MCP**. Esto es lo que evita que invente un campo que no existe: cuando duda, recupera la referencia real. Lo conectás con:

```bash
cotctl mcp install
```

Convenientemente, instalar los Skills ya ofrece configurar esto por vos. Los detalles completos — índices, scopes, múltiples servidores — están en la página de [Integración MCP](./mcp-integration.md).

### Grounding en las versiones de bot en vivo

Los Skills y el RAG le enseñan al agente *convenciones*, pero algunos datos son específicos de tu entorno en este momento — sobre todo, qué **versiones de bot** tiene registradas el backend. Cuando el agente (o tú) está por escribir YAML que conecta un bot, conviene revisar el catálogo en vivo primero, para que la `version` fijada sea real y no una suposición:

```bash
# ¿Qué versiones tiene realmente este tipo de bot, y cuál es la predeterminada?
cotctl bot-types versions PBCreateTask -c dev

# O todo el catálogo de una vez
cotctl bot-types list -c dev
```

Este es el mismo catálogo contra el que `cotctl` valida al aplicar, así que consultarlo de antemano convierte "el apply rechazó mi versión de bot" en una búsqueda de una línea antes de siquiera escribir el archivo. Es la contraparte manual del RAG: `bot-types` te ancla en el catálogo de versiones en vivo, el RAG te ancla en la documentación.

## El ciclo de authoring, de punta a punta

Así se ve trabajar de esta forma:

```bash
# 1. Setup único: instalar los Skills (esto también ofrece conectar el RAG/MCP)
cotctl skills install --all

# 2. En Claude Code, describí lo que querés en lenguaje natural, ej.:
#    "Scaffoldeá un workflow de órdenes de compra con estados borrador,
#     pendiente, aprobado y rechazado, y un rol manager con acceso total."
#    → el agente escribe el YAML, groundeado por los Skills + RAG.

# 3. Mantenés el control con el ciclo de seguridad de siempre:
cotctl validate --dir ordenes-compra/
cotctl apply    --dir ordenes-compra/ -c dev
cotctl validate --workflow ordenes_compra -c dev
```

<div className="alert alert--primary">

**Siempre sos el revisor.** El agente draftea; vos validás y aplicás. Nada llega a un entorno sin pasar por `cotctl validate` y tu `apply` explícito. La IA hace el authoring más rápido — no quita las barreras de seguridad.

</div>

## Por qué esto importa para los partners

Esta es la diferencia entre *configurar Cotalker* e *implementar sobre Cotalker con velocidad*. Los Skills cargan las convenciones para que no tengas que memorizarlas, el RAG mantiene todo actualizado a medida que la plataforma evoluciona, y `cotctl` sigue siendo la forma confiable de validar y publicar lo que el agente produce. El resultado es una entrega más rápida con la misma — o mejor — corrección.

## Próximos pasos

- [**Skills**](./skills.md) — instalá y gestioná los Skills de Cotalker para Claude Code
- [**Integración MCP**](./mcp-integration.md) — conectá el RAG de documentación
- [**Tutoriales**](./tutorials.md) — los flujos de recursos que el agente te ayuda a crear
