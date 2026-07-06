---
title: Scaffolding de un workflow
sidebar_label: Scaffolding
displayed_sidebar: developer
---

Construir un workflow desde un archivo en blanco es mucho boilerplate: necesitas roles, tipos de propiedad, propiedades de estado y el workflow en sí, todo nombrado consistentemente y conectado entre sí. `cotctl workflows scaffold` genera ese esqueleto por ti — correctamente nombrado y listo para personalizar — así arrancas desde una estructura que funciona en vez de una página en blanco.

Es un comando offline. No se toca ningún entorno hasta que haces `apply` más tarde.

## El comando

```bash
cotctl workflows scaffold --name <flow-name> --code <prefix> [options]
```

Dos entradas son requeridas:

- `--name` — el nombre del flujo en kebab-case, ej. `ordenes-compra`.
- `--code` — un prefijo corto de 2–4 letras usado en todos los códigos generados, ej. `oc`.

```bash
cotctl workflows scaffold --name ordenes-compra --code oc
```

### Opciones

| Opción | Descripción |
|---|---|
| `--name <name>` | **(requerido)** Nombre del flujo, kebab-case |
| `--code <prefix>` | **(requerido)** 2–4 letras minúsculas |
| `--display <name>` | Nombre legible (default: `--name` con mayúsculas iniciales) |
| `--output-dir <dir>` | Dónde escribir (default: `./<name>/`) |
| `--states <list>` | Estados cerrados extra más allá de los tres base, separados por coma |
| `--no-technical` | Omite los permisos técnicos (`form-bypass`, `force-state`) |

## Qué genera

Un scaffold es una pequeña carpeta de YAML, organizada por concern:

```
ordenes-compra/
├── README.md                  # Definición del flujo, convenciones de nombres, orden de apply
├── workflow.yaml              # Workflow + máquina de estado + transiciones
├── access/
│   ├── permissions.yaml       # Un AccessRole por permiso
│   └── manager-role.yaml      # Rol Manager que agrega todos los permisos
└── data-model/
    ├── property-types.yaml    # transaccion, maestro, estados
    └── states.yaml            # estados base: borrador, pendiente, error
```

De fábrica obtienes seis roles de acceso (cuatro con `--no-technical`), un rol Manager, tres tipos de propiedad, tres estados base (un estado *nuevo*, uno *en progreso* y uno *de error*) y un workflow con su máquina de estado. Todo sigue las convenciones de nombres de implementación de Cotalker, así que el resultado pasa los checks de nomenclatura de [`cotctl validate --workflow`](./validate.md#modo-workflow--preparación-para-producción-online) desde el principio.

### Agregar tus propios estados

La mayoría de los flujos reales necesita más de los tres estados base. Pásalos con `--states` y `cotctl` genera las propiedades de estado y conecta transiciones desde `pendiente` a cada uno:

```bash
cotctl workflows scaffold --name ordenes-compra --code oc \
  --display "Órdenes de Compra" \
  --states aprobado,rechazado,cerrado
```

## El pipeline en el que encaja

El scaffolding es el paso 1 de un ciclo de cinco pasos. Los pasos 2–5 se repiten con seguridad a medida que iteras, porque cada apply es idempotente:

```
1. scaffold   →  cotctl workflows scaffold --name ordenes-compra --code oc
2. customize  →  edita el YAML — agrega propiedades, formularios, lógica de negocio
3. validate   →  cotctl validate --dir ordenes-compra/
4. apply      →  cotctl apply --dir ordenes-compra/ -c dev
5. validate   →  cotctl validate --workflow ordenes_compra -c dev
```

<div className="alert alert--primary">

**El modelo mental.** Scaffold te da un *esqueleto correcto*. Después lo completas (paso 2), lo revisas offline (paso 3), lo despliegas (paso 4) y confirmas que está listo para producción contra el entorno en vivo (paso 5) — iterando sobre 2–5 hasta quedar conforme.

</div>

## Un par de reglas de entrada

`cotctl` valida tus entradas de antemano para que los nombres generados sean siempre válidos:

- `--name` debe ser kebab-case (ej. `ordenes-compra`).
- `--code` debe ser de 2–4 letras minúsculas.
- `--output-dir` no debe existir ya (así nunca sobrescribes trabajo).

## Ver también

- [validate](./validate.md) — revisa el scaffold offline, luego contra el workflow en vivo
- [apply](./apply.md) — despliega la carpeta entera con `--dir`
- [Referencia YAML de workflows](../resources/workflows.md) — entiende lo que estás personalizando
