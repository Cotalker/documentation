---
title: Pipelines de CI/CD
sidebar_label: CI/CD
displayed_sidebar: developer
---

Todo lo que `cotctl` hace en tu laptop, lo puede hacer desatendido en un pipeline. Correrlo en CI/CD es lo que convierte "un partner despliega cambios a mano" en "los cambios se validan y despliegan automáticamente en cada merge" — repetible, revisable, y sin depender de que alguien recuerde los pasos. Esta página muestra la forma recomendada y, sobre todo, cómo manejar las credenciales con seguridad.

## La forma recomendada del pipeline

Un buen pipeline de `cotctl` refleja el flujo manual: **validar en cada cambio, aplicar en el merge.**

1. **En un pull request** — ejecutá `cotctl validate --dir` (offline, no requiere credenciales). Esto detecta errores de esquema y referencias cruzadas antes de la revisión.
2. **En el merge a tu rama principal** — ejecutá `cotctl apply --dir -c <profile>` contra el entorno destino, opcionalmente precedido por un `--dry-run`.

Como cada apply es idempotente, re-ejecutar el deploy siempre es seguro.

## Manejar las credenciales con seguridad

Esta es la parte a hacer bien. En un pipeline no hay navegador para iniciar sesión, así que te autenticás de forma no interactiva — pero **nunca ponés un token en tu repositorio**.

<div className="alert alert--primary">

**La regla: los secrets viven en tu proveedor de CI, nunca en el código.** Guardá las credenciales como secrets encriptados de CI (GitHub Actions secrets, variables de GitLab CI, etc.) y leelas desde variables de entorno en runtime. Nunca commitees un token, y nunca pegues uno en un YAML o script que esté versionado.

</div>

Tanto `cotctl login` (navegador) como `cotctl login --no-browser` (email/contraseña) son **interactivos** — abren un navegador o piden credenciales por prompt — así que por sí solos no sirven para un job desatendido. La forma confiable de autenticarte en CI es con un **API token pre-generado**.

**1. Generá el token una vez.** Un administrador emite un API token desde el panel de administración de Cotalker (o el Partner Platform) y guardás su valor como un secret encriptado de CI — por ejemplo `COTCTL_API_TOKEN`.

**2. Autenticate de forma no interactiva con `--paste-token`.** `cotctl login --paste-token` crea un perfil a partir de un token pre-generado en vez de pedir credenciales. En CI, pipeá el secret hacia él:

```bash
echo "$COTCTL_API_TOKEN" | cotctl login \
  --url https://web.cotalker.com \
  --subdomain acme \
  --profile acme \
  --paste-token
```

Nada queda hardcodeado, y no hay prompt interactivo que cuelgue el job.

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

Notá `cotctl apply ... -y` — el flag `-y` salta las confirmaciones interactivas, que es justo lo que querés en un job desatendido.

## Vida útil del token en CI

Los tokens expiran tras 7 días de inactividad. Para pipelines que corren regularmente esto rara vez es un problema, pero para deploys poco frecuentes, preferí una **cuenta de servicio** y reautenticarte al inicio de cada corrida en vez de cachear un token entre corridas.

## Usá `--continue-on-error` deliberadamente

Por defecto, un apply de directorio se detiene en la primera falla — normalmente lo que querés, así un deploy roto se detiene ruidosamente. Agregá `--continue-on-error` solo cuando intencionalmente quieras que las entidades restantes se apliquen a pesar de que una falle.

## Ver también

- [validate](./commands/validate.md) — el gate offline a correr en cada PR
- [apply](./commands/apply.md) — `--dir`, `--dry-run` y `-y`
- [Autenticación](./authentication.md) — cómo funcionan el login y los perfiles
