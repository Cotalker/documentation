---
title: Autenticación
sidebar_label: Autenticación
displayed_sidebar: developer
---

Ahora que `cotctl` está instalado, necesita saber *con qué entorno de Cotalker hablar* y *quién sos vos*. Esta página explica cómo funciona la autenticación, te guía en tu primer login, e introduce los **perfiles** — el concepto que te permite manejar varios entornos con seguridad.

## Cómo piensa cotctl la autenticación: perfiles

`cotctl` guarda tus credenciales en un sistema de **perfiles**, en un archivo en `~/.cotctl/config.json`. Cada perfil contiene los datos de conexión y el token de un entorno o empresa.

Esto importa porque, como partner, vas a trabajar seguido con más de una empresa — un entorno de staging, uno de producción, varios clientes. En vez de hacer login y logout constantemente, te logueás *una vez por entorno*, cada login se vuelve un perfil con nombre, y de ahí en más simplemente le decís a cada comando qué perfil usar.

<div className="alert alert--primary">

**Bueno saberlo.** No hay archivo `.env` ni token hardcodeado para andar copiando. Todo vive en el archivo de perfiles gestionado, que `cotctl` crea con permisos restrictivos. Nunca pegás un token a mano.

</div>

## Tu primer login

Para conectarte a un entorno, usá `cotctl login`. El detalle más importante: el flag `--url` toma la **URL del webclient** — la dirección que abrirías en un navegador para usar Cotalker — *no* una URL de API. `cotctl` descubre la dirección de la API automáticamente a partir de eso.

```bash
cotctl login --url https://web.cotalker.com --subdomain acme
```

Por defecto esto abre tu navegador para iniciar sesión. Esto es lo que pasa, paso a paso:

1. `cotctl` abre tu navegador en la página de autorización del entorno.
2. Iniciás sesión (si no lo estabas) y aprobás el acceso.
3. El token se transfiere de vuelta a la CLI automáticamente.
4. Se guarda un perfil en `~/.cotctl/config.json` — llamado `acme` en este ejemplo, según el `--subdomain`.

Si el navegador no se abre solo, `cotctl` imprime la URL en la terminal para que la abras manualmente.

### Iniciar sesión sin navegador

En un servidor, en CI, o cualquier entorno headless donde no haya navegador, agregá `--no-browser` para iniciar sesión con email y contraseña:

```bash
cotctl login --url https://web.cotalker.com --subdomain acme --no-browser
```

```
Email: admin@acme.com
Password: ********

Logged in as admin@acme.com (company: 64a1b2c3...)
Profile saved as "acme"
Use with: cotctl surveys list -c acme
```

### Todas las opciones de login

| Opción | Descripción |
|---|---|
| `--url <url>` | **(requerido)** URL del webclient del entorno |
| `--subdomain <name>` | **(requerido)** Subdominio o nombre de empresa |
| `--api-url <url>` | URL de la API, si necesitás sobrescribir el autodescubrimiento |
| `--no-browser` | Usa email/contraseña en vez del flujo de navegador |
| `--profile <name>` | Nombre de perfil personalizado (por defecto, el valor de `--subdomain`) |

## El flag `-c`: decirle a los comandos sobre qué empresa actuar

Este es el hábito más importante a construir. **Todo comando que toca la API requiere un flag `-c` (o `--company`)** que nombre el perfil a usar. A propósito no hay default — esto evita que ejecutes un comando contra el entorno equivocado de un cliente.

```bash
cotctl surveys list -c acme
cotctl apply -f survey.yaml -c acme
cotctl surveys export my_survey -c acme
```

Si lo olvidás, `cotctl` se detiene y te avisa:

```
Error: --company/-c is required. Use 'cotctl profile list' to see available profiles.
```

Ese error es una función, no una molestia: es la barrera que evita que un cambio de staging termine en producción.

## Trabajar con múltiples entornos

Como cada login es su propio perfil, soportar varios entornos es simplemente varios logins:

```bash
cotctl login --url https://web.cotalker.com --subdomain acme
cotctl login --url https://web.staging.cotalker.com --subdomain devteam
cotctl login --url https://www.cotalkercoopeuch.com --subdomain coopeuch
```

Después, cambiar de entorno es solo cambiar el valor de `-c`:

```bash
cotctl surveys list -c acme
cotctl surveys list -c devteam
cotctl apply -f survey.yaml -c coopeuch
```

## Gestionar tus perfiles

**Ver lo que tenés.** Para listar todos los perfiles guardados:

```bash
cotctl profile list
```

```
NAME          URL                              SUBDOMAIN    USER
acme          https://www.cotalker.com         acme         admin@acme.com
devteam       https://staging.cotalker.com     devteam      dev@cotalker.com
```

**Eliminar uno.** Cuando ya no necesitás un entorno, cerrá sesión en él. Para los perfiles modernos de tipo API-token esto **revoca el token en el servidor** y luego quita el perfil local:

```bash
cotctl logout acme
# Remote ApiToken revoked.
# Logged out from profile "acme".
```

Si solo querés olvidar un perfil localmente **sin** revocar su token, usá `cotctl profile delete <name>`.

## No tenés que preocuparte por la renovación del token

Los tokens expiran, pero `cotctl` se encarga de renovarlos antes de cada llamada a la API, así que en uso normal rara vez te logueás más de una vez por semana:

- **Menos de 50 minutos de antigüedad:** se usa tal cual.
- **Entre 50 minutos y 7 días:** se renueva silenciosamente en segundo plano.
- **Más de 7 días:** la sesión expiró y se te pedirá iniciar sesión de nuevo.

Si no se puede renovar, `cotctl` te dice exactamente qué ejecutar:

```
Error: Session expired for profile "acme". Run: cotctl login --url https://web.cotalker.com --subdomain acme
```

## Próximo paso

Estás conectado. Ahora pongámoslo a trabajar — andá a [**Comandos**](./commands/apply.md) para aprender `apply`, el verbo que más vas a usar.
