---
title: Instalación
sidebar_label: Instalación
displayed_sidebar: developer
---

<!-- source: repositories/cotctl/package.json @ 4f7248a (2026-07-06) -->

En esta página vas a instalar `cotctl` en tu máquina y confirmar que funciona. Toma unos dos minutos. Si alguna vez instalaste un paquete global de npm, esto te va a resultar familiar.

## Antes de empezar: los requisitos

Hay dos cosas que necesitas tener:

- **Node.js versión 22.0.0 o superior.** `cotctl` se distribuye como paquete npm y corre sobre Node. Para verificar si lo tienes — y qué versión — ejecuta:

  ```bash
  node --version
  ```

  Si el comando no se encuentra, o el número es menor a `22`, instala o actualiza Node primero desde [nodejs.org](https://nodejs.org). Recomendamos la versión LTS.

- **Acceso de administrador a la empresa de Cotalker que quieres gestionar.** La mayoría de los comandos de `cotctl` leen y escriben configuración, lo que requiere permisos de administrador en el entorno destino.

<div className="alert alert--info">

**¿Todavía no tienes acceso de administrador?** Está bien para instalar la herramienta — todo lo de esta página lo puedes hacer sin eso. Pero lo vas a necesitar antes del paso de [Autenticación](./authentication.md), así que conviene pedirlo al administrador de Cotalker de la empresa desde ya.

</div>

## Instalar la herramienta

La forma recomendada es instalarla **globalmente**, lo que deja el comando `cotctl` disponible en toda tu máquina:

```bash
npm install -g @cotctl/cli
```

El flag `-g` es lo que la hace global. Cuando termine, puedes ejecutar `cotctl` desde cualquier carpeta.

### ¿Prefieres no instalarla globalmente?

Si solo la necesitas ocasionalmente, o quieres fijar una versión por proyecto, puedes ejecutarla bajo demanda con `npx` — esto la descarga y ejecuta sin instalación permanente:

```bash
npx @cotctl/cli <command> [options]
```

A lo largo de esta guía escribimos los comandos como `cotctl ...`. Si usas `npx`, simplemente reemplaza eso por `npx @cotctl/cli ...`.

## Confirmar que funcionó

Asegurémonos de que la instalación fue exitosa. Pídele a la herramienta su versión:

```bash
cotctl --version
```

Deberías ver un número de versión, por ejemplo:

```
0.11.0
```

Si ves una versión, listo — la herramienta está instalada correctamente. Si en cambio obtienes un error "command not found", puede que el directorio de binarios globales de npm no esté en tu `PATH`; la página de [Solución de problemas](./troubleshooting.md) explica cómo resolverlo.

## Orientándote

Hay dos comandos que conviene conocer desde el principio. La forma general de toda invocación de `cotctl` es:

```bash
cotctl <command> [options]
```

Y cada vez que no sepas qué hay disponible o qué espera un comando, agrega `--help`:

```bash
cotctl --help            # lista todos los comandos
cotctl apply --help      # opciones de un comando específico
```

## Próximo paso

`cotctl` está instalado, pero todavía no conoce ningún entorno de Cotalker. Arreglemos eso en [**Autenticación**](./authentication.md), donde lo vas a conectar a una empresa y aprender cómo funcionan los perfiles.
