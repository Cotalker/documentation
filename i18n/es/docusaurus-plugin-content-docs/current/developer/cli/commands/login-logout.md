---
title: login y logout
sidebar_label: login y logout
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/src/commands/login.ts, src/commands/logout.ts @ 4f7248a (2026-07-06) -->

Estos dos comandos abren y cierran tu conexión con un entorno de Cotalker. Si ya leíste la página de [Autenticación](../authentication.md), ya conociste `login` — esta página es la referencia completa de ambos comandos, incluyendo cada opción y los casos menos comunes, como los entornos on-premise.

## `cotctl login`

`login` te autentica contra un entorno de Cotalker y guarda el resultado como un **perfil** reutilizable en `~/.cotctl/config.json`. Normalmente lo ejecutás una vez por entorno.

```bash
cotctl login --url <webclient-url> --subdomain <subdomain> [options]
```

Lo clave a recordar: `--url` es la dirección del **webclient** (lo que escribirías en un navegador), no una URL de API. `cotctl` descubre la API automáticamente a partir de eso.

### Opciones

| Opción | Requerido | Default | Descripción |
|---|---|---|---|
| `--url` | Sí | — | URL del webclient del entorno |
| `--subdomain` | Sí | — | Subdominio de la empresa |
| `--api-url` | No | Autodetectada | Sobrescritura manual de la URL de API |
| `--no-browser` | No | `false` | Usa email/contraseña en vez del navegador |
| `--profile` | No | Valor de `--subdomain` | Nombre de perfil personalizado |
| `--machine-id` | No | Hostname saneado | Identificador incrustado en el code del ApiToken, para distinguir tokens por máquina |
| `--paste-token` | No | `false` | Pega un ApiToken pre-generado en vez de autenticarte (ver abajo) |

### Flujo con navegador (el predeterminado)

```bash
cotctl login --url https://web.cotalker.com --subdomain acme
```

Esto abre tu navegador en la página de autenticación de Cotalker, aprobás el acceso, y el token se devuelve a la CLI. El flujo expira a los 5 minutos si no lo completás.

### Login con email/contraseña

Cuando no hay navegador disponible — un servidor, un runner de CI — agregá `--no-browser` y se te pedirán las credenciales en la terminal:

```bash
cotctl login --url https://web.cotalker.com --subdomain acme --no-browser
```

### Entornos on-premise

La mayoría de los entornos exponen un archivo de variables que le permite a `cotctl` autodescubrir la URL de la API. Si un cliente corre Cotalker en su propia infraestructura y ese descubrimiento falla, apuntá `cotctl` a la API explícitamente con `--api-url`:

```bash
cotctl login \
  --url https://cotalker.empresa.com \
  --subdomain emp \
  --api-url https://api.empresa.com
```

### Pegar un token pre-generado

Los dos flujos anteriores **acuñan** un ApiToken por ti, lo que requiere el permiso `admin-apitokens-write`. Si tu usuario no lo tiene, hay una tercera vía: un administrador emite un ApiToken para ti desde el panel de administración del webclient, y lo registras con `--paste-token`:

```bash
cotctl login --url https://web.cotalker.com --subdomain acme --paste-token
```

`cotctl` te pide pegar el token (enmascarado), lo valida contra el backend y guarda el perfil — sin email/contraseña y sin navegador. Este es también el flujo que usan los pipelines de CI; ver [CI/CD](../ci-cd.md).

### Distinguir tokens con `--machine-id`

Cada ApiToken lleva un `code` que incluye un identificador de máquina — por defecto tu hostname saneado — para que reconozcas de qué máquina vino un token en el panel de administración. Sobrescríbelo con `--machine-id <id>` cuando el valor predeterminado no sea distintivo (por ejemplo, varios runners de CI efímeros que comparten hostname).

<div className="alert alert--info">

**Dónde viven las credenciales.** El perfil se escribe en `~/.cotctl/config.json` con permisos de archivo restrictivos (`0600`). No hay token que copiar ni guardar tú mismo.

</div>

### Una nota sobre permisos

Para aplicar recursos (formularios, workflows, etc.) necesitás permisos de administración en Cotalker. Si más adelante un comando devuelve un `403`, es la plataforma diciéndote que el usuario logueado no tiene el permiso requerido — pedile al administrador de la empresa que lo otorgue.

## `cotctl logout`

`logout` quita las credenciales de un perfil de tu archivo de configuración local.

```bash
cotctl logout <profile>
# o, equivalentemente:
cotctl logout -c <profile>
```

El argumento posicional `<profile>` es opcional si en su lugar pasás `-c <profile>`.

<div className="alert alert--secondary">

**`logout` revoca tu token en el servidor.** Para los perfiles modernos de tipo API-token, `cotctl logout` **revoca el ApiToken en el servidor de Cotalker** y luego quita el perfil local, así el token ya no puede usarse. La revocación es **best-effort**: si no se puede alcanzar el servidor, `cotctl` igual quita el perfil local y te advierte que revoques el token a mano en el panel de administración — así un logout nunca te deja sin poder volver a entrar. (Los perfiles JWT legacy no tienen nada que revocar — simplemente expiran — así que solo se quitan localmente.) Esta es la diferencia clave con [`cotctl profile delete`](./profiles.md), que quita el perfil **solo localmente** y deja cualquier token válido.

</div>

## Ver también

- [Autenticación](../authentication.md) — el recorrido conceptual de perfiles y el flag `-c`
- [Gestionar perfiles](./profiles.md) — listar y eliminar perfiles guardados
