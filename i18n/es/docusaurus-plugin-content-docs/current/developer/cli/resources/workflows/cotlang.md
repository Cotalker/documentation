---
title: COTLang en workflows
sidebar_label: COTLang
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/docs/workflows/cotlang.md @ 4f7248a (2026-07-06) -->

**COTLang** es el pequeño lenguaje de expresiones que Cotalker usa para interpolar valores en tiempo de ejecución dentro de la configuración de un bot. Cuando un bot se dispara dentro de un workflow, los strings de su bloque `data` se parsean como expresiones COTLang y se resuelven contra el contexto en vivo — así `{{task._id}}` se vuelve el ID de la tarea actual, `{{user.company}}` se vuelve la empresa, y así.

Te encontrarás con COTLang principalmente en los valores `data` de los bots que adjuntas a transiciones, StartForms y survey triggers. La mayoría de las veces simplemente funciona. Esta página trata sobre la única forma en que sorprende a la gente.

## Caracteres reservados

COTLang parsea los valores `data` como expresiones, y unos pocos caracteres están **reservados por la gramática**. Los dos con los que realmente te toparás son:

- `=` (igual)
- `#` (numeral)

Pon cualquiera de los dos dentro de un valor string plano y el parser falla con `Unexpected end of input`. **No hay sintaxis de escape** ni **literal de string crudo** — no puedes escribir `\=` ni envolver el valor en comillas para eximirlo. La gramática también reserva `|`, `(`, `)`, `[` y `]`, pero esos rara vez aparecen por accidente; `=` y `#` son los culpables habituales.

### El quiebre clásico: una URL con query string

```yaml
data:
  # Esto FALLA al parsear — el `=` del query string es reservado.
  url: "https://example.com/api?company={{user.company}}&token=abc"
```

Nota que `?` y `&` están bien — lo que rompe es el `=`.

## Cómo evitarlo

Como no puedes escapar el caracter, ensamblas el string problemático dentro de un bot de script (`CCJS` / `ESMCode`) y pasas el valor terminado, o usas los campos estructurados de un bot cuando los ofrece.

| Necesitas | Haz esto |
|---|---|
| Una URL con `?foo=bar` | Construye la URL dentro de una etapa `CCJS`/`ESMCode` usando `String.fromCharCode(61)` para `=`, y devuelve el string ensamblado |
| Un literal `#tag` | Ensámblalo en un script y pásalo vía `data` |
| Un header como `Bearer token=...` | Pasa las piezas por separado en `data` y concaténalas dentro del script antes del request |

Cuando un bot expone campos estructurados `query` o `headers`, prefiérelos sobre construir la URL a mano — esquivan el parser por completo.

## Consejo de depuración

Si un bot se detiene misteriosamente antes de una etapa, sospecha de un caracter reservado. Reemplaza temporalmente el valor sospechoso por un `"ok"` hardcodeado; si el bot entonces alcanza la siguiente etapa, el parser estaba rechazando tu string original — mueve su construcción a un script.

## Ver también

- [Workflows](../workflows.md) — dónde se adjuntan los bots
- [Semántica de merge](./merge-semantics.md) — cómo se preserva el `data` de los bots entre applies
