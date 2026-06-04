---
title: Gestionar perfiles
sidebar_label: profile
displayed_sidebar: developer
---

Un **perfil** es una conexión guardada a un entorno de Cotalker — creada cada vez que ejecutás [`cotctl login`](./login-logout.md). Como partner que trabaja entre staging, producción y varios clientes, vas a acumular unos cuantos. El comando `cotctl profile` es cómo los ves y ordenás.

## `cotctl profile list`

Muestra cada perfil que guardaste, con el entorno y el usuario detrás de cada uno:

```bash
cotctl profile list
```

```
NAME          URL                              SUBDOMAIN    USER
acme          https://www.cotalker.com         acme         admin@acme.com
devteam       https://staging.cotalker.com     devteam      dev@cotalker.com
```

Este es el comando al que recurrir cuando no estés seguro de qué nombre de perfil pasarle a `-c`, o quieras confirmar como qué usuario está autenticado un perfil.

## `cotctl profile delete`

Quita un perfil de tu archivo de configuración local:

```bash
cotctl profile delete <name>
```

<div className="alert alert--secondary">

**Solo local — esto *no* revoca el token.** Eliminar un perfil lo quita de `~/.cotctl/config.json` pero deja cualquier token válido en el servidor. Es distinto de [`cotctl logout`](./login-logout.md), que revoca el ApiToken en el servidor (para perfiles API-token) antes de quitar el perfil. Usá `profile delete` cuando solo querés olvidar un perfil; usá `logout` cuando también querés invalidar su token.

</div>

## El flag `-c`, una vez más

Todo comando que habla con la API requiere `-c <profile>` para seleccionar sobre qué entorno actuar — no hay default, a propósito. `cotctl profile list` es cómo encontrás el nombre exacto a usar:

```bash
cotctl apply -f survey.yaml -c staging
cotctl surveys list -c production
cotctl surveys export my_survey -c staging
```

Si alguna vez ves `Error: --company/-c is required`, ejecutá `cotctl profile list` para elegir el nombre correcto.
