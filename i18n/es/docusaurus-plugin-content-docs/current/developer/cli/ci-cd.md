---
title: Pipelines de CI/CD
sidebar_label: CI/CD
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/{apply,surveys,properties,workflows}.ts @ 4f7248a (2026-07-06) -->

Todo lo que `cotctl` hace en tu laptop, lo puede hacer desatendido en un pipeline. Correrlo en CI/CD es lo que convierte "un partner despliega cambios a mano" en "los cambios se validan y despliegan automáticamente en cada merge" — repetible, revisable, y sin depender de que alguien recuerde los pasos. Esta página muestra la forma recomendada y, sobre todo, cómo manejar las credenciales con seguridad.

## La forma recomendada del pipeline

Un buen pipeline de `cotctl` refleja el flujo manual: **validar en cada cambio, aplicar en el merge.**

1. **En un pull request** — ejecuta `cotctl validate --dir` (offline, no requiere credenciales). Esto detecta errores de esquema y referencias cruzadas antes de la revisión.
2. **En el merge a tu rama principal** — ejecuta `cotctl apply --dir -c <profile>` contra el entorno destino, opcionalmente precedido por un `--dry-run`.

Como cada apply es idempotente, re-ejecutar el deploy siempre es seguro.

## Manejar las credenciales con seguridad

Esta es la parte a hacer bien. En un pipeline no hay navegador para iniciar sesión, así que te autenticas de forma no interactiva — pero **nunca pones un token en tu repositorio**.

<div className="alert alert--primary">

**La regla: los secrets viven en tu proveedor de CI, nunca en el código.** Guarda las credenciales como secrets encriptados de CI (GitHub Actions secrets, variables de GitLab CI, etc.) y léelas desde variables de entorno en runtime. Nunca commitees un token, y nunca pegues uno en un YAML o script que esté versionado.

</div>

Tanto `cotctl login` (navegador) como `cotctl login --no-browser` (email/contraseña) son **interactivos** — abren un navegador o piden credenciales por prompt — así que por sí solos no sirven para un job desatendido. La forma confiable de autenticarte en CI es con un **API token pre-generado**.

**1. Genera el token una vez.** Un administrador emite un API token desde el panel de administración de Cotalker (o el Partner Platform) y guardas su valor como un secret encriptado de CI — por ejemplo `COTCTL_API_TOKEN`.

**2. Autentícate de forma no interactiva con `--paste-token`.** `cotctl login --paste-token` crea un perfil a partir de un token pre-generado en vez de pedir credenciales. En CI, canaliza el secreto hacia él con un pipe:

```bash
echo "$COTCTL_API_TOKEN" | cotctl login \
  --url https://web.cotalker.com \
  --subdomain acme \
  --profile acme \
  --paste-token
```

Nada queda codificado a mano. El comando muestra un prompt de pegado, pero lee el valor canalizado desde stdin, así que el job nunca se cuelga.

## Un ejemplo trabajado (GitHub Actions)

Este workflow valida en los pull requests y despliega en los pushes a `main`. Las credenciales vienen enteramente de secrets del repositorio:

```yaml
name: Deploy Cotalker config

on:
  pull_request:
  push:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: npm install -g @cotctl/cli
      # Offline — no requiere credenciales
      - run: cotctl validate --dir config/

  deploy:
    if: github.ref == 'refs/heads/main'
    needs: validate
    runs-on: ubuntu-latest
    env:
      COTCTL_API_TOKEN: ${{ secrets.COTCTL_API_TOKEN }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: npm install -g @cotctl/cli
      - run: echo "$COTCTL_API_TOKEN" | cotctl login --url https://web.cotalker.com --subdomain acme --profile acme --paste-token
      - run: cotctl apply --dir config/ -c acme -y
```

Nota `cotctl apply ... -y` — el flag `-y` salta las confirmaciones interactivas, que es justo lo que quieres en un job desatendido.

## Los flags orientados a CI viven en los apply por entidad

Este es el detalle que atrapa a quien arma su primer pipeline. Los flags que hacen un apply *apto para pipeline* — salida legible por máquina, modo silencioso, control del diff y el gate de cambios destructivos — **no** son opciones del `cotctl apply` unificado (ni de `apply --dir`). Viven solo en los apply **por entidad**:

| Flag | En | Qué hace |
|---|---|---|
| `--json` | `surveys apply`, `properties apply`, `workflows apply` | Emite los resultados como JSON, un objeto por línea, a stdout |
| `--quiet` / `-q` | esos tres, más `bots`/`routines`/`schedules apply` | Suprime el ruido de `would-create`/`would-update`; los errores igual aparecen |
| `--diff <off\|compact\|verbose>` | `surveys apply`, `properties apply`, `workflows apply` | Controla cuánto detalle de diff campo por campo se imprime (default `compact`) |
| `--fail-on-destructive` | `surveys apply`, `properties apply`, `workflows apply` | Sale con `2` cuando un `--dry-run` detecta un cambio destructivo |

Así que un gate estricto por recurso usa la forma por entidad:

```bash
# Falla el job si desplegar este workflow destruiría algo
cotctl workflows apply -f workflow.yaml -c acme --dry-run --fail-on-destructive
```

`cotctl apply --dir` sigue siendo la herramienta correcta para desplegar un directorio **mixto** en orden de dependencias — solo que no lleva esos cuatro flags. Un patrón común es: hacer de gate a cada kind sensible con un check por entidad `--dry-run --fail-on-destructive`, y luego desplegar todo el conjunto con `apply --dir`.

## Códigos de salida

`cotctl` mapea los resultados a tres códigos de salida, y un buen pipeline ramifica según ellos:

| Código | Significado |
|---|---|
| `0` | Éxito — incluye un `--dry-run` limpio y un prompt cancelado por el usuario |
| `1` | Error de ejecución — fallo de red, un `4xx`/`5xx` de la API, un archivo o perfil faltante |
| `2` | Fallo de validación (el YAML fue rechazado antes de enviar nada) — **o**, en un apply por entidad con `--fail-on-destructive`, se detectó un cambio destructivo |

Como `2` es distinto de `1`, puedes tratar "cambio destructivo / YAML inválido" de forma diferente a "la API estaba caída". El `apply` unificado usa `0`/`1`/`2` para éxito/ejecución/validación; el significado de `2` como "destructivo" es específico de los apply por entidad con `--fail-on-destructive`.

## stdout vs. stderr

`cotctl` mantiene disciplinados los dos flujos para que tu pipeline pueda parsear la salida de forma confiable:

- **stdout** lleva el resultado — la tabla legible, o, bajo `--json`, el payload JSON-Lines y nada más. Cuando pasas `--json`, el banner legible se suprime para que stdout siga siendo parseable por máquina.
- **stderr** lleva las advertencias, las notas de progreso y los prompts.

Así que el patrón seguro en CI es **capturar stdout para parsear y dejar que stderr fluya al log**:

```bash
cotctl workflows apply -f workflow.yaml -c acme --dry-run --json > result.jsonl
# parsea result.jsonl; las advertencias y el progreso ya fueron a stderr, al log del job
```

## Vida útil del token en CI

Los tokens expiran tras 7 días de inactividad. Para pipelines que corren regularmente esto rara vez es un problema, pero para deploys poco frecuentes, prefiere una **cuenta de servicio** y reautenticarte al inicio de cada corrida en vez de cachear un token entre corridas.

## Usa `--continue-on-error` deliberadamente

Por defecto, un apply de directorio se detiene en la primera falla — normalmente lo que quieres, así un deploy roto se detiene ruidosamente. Agrega `--continue-on-error` solo cuando intencionalmente quieras que las entidades restantes se apliquen a pesar de que una falle.

## Ver también

- [validate](./commands/validate.md) — el gate offline a correr en cada PR
- [apply](./commands/apply.md) — `--dir`, `--dry-run` y `-y`
- [Autenticación](./authentication.md) — cómo funcionan el login y los perfiles
